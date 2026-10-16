
import pool from "../../config/db.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
import transporter from "../../config/mail.js";

dotenv.config();

const createToken = (user) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

const hashValue = (value) =>
  crypto.createHash("sha256").update(value).digest("hex");

const sendVerificationCode = async (user) => {
  const code = String(crypto.randomInt(100000, 1000000));
  const codeHash = hashValue(code);

  await pool.query(
    `INSERT INTO email_verification_codes
       (user_id, code_hash, expires_at, attempts, created_at)
     VALUES ($1, $2, NOW() + INTERVAL '10 minutes', 0, NOW())
     ON CONFLICT (user_id)
     DO UPDATE SET
       code_hash = EXCLUDED.code_hash,
       expires_at = EXCLUDED.expires_at,
       attempts = 0,
       created_at = NOW()`,
    [user.id, codeHash]
  );

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: "Verify your email",
    text: `Your verification code is ${code}. It expires in 10 minutes.`,
    html: `
      <h2>Verify your email</h2>
      <p>Your verification code is:</p>
      <h1 style="letter-spacing: 5px">${code}</h1>
      <p>This code expires in 10 minutes.</p>
      <p>If you did not request this, you can ignore this email.</p>
    `
  });
};

export const register = async (
  firstName,
  lastName,
  email,
  password,
  phone,
  avatar
) => {
  const normalizedEmail = email.trim().toLowerCase();

  const existing = await pool.query(
    "SELECT id FROM users WHERE LOWER(email) = $1",
    [normalizedEmail]
  );

  if (existing.rows.length > 0) {
    throw new Error("An account with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const result = await pool.query(
    `INSERT INTO users
       (first_name, last_name, email, password_hash, phone, avatar)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id, first_name, last_name, email, phone, avatar, role,
               email_verified_at`,
    [
      firstName.trim(),
      lastName.trim(),
      normalizedEmail,
      hashedPassword,
      phone.trim(),
      avatar || null
    ]
  );

  const user = result.rows[0];

  // The account is not authenticated until the email is verified.
  await sendVerificationCode(user);

  return {
    message: "Verification code sent to your email",
    email: user.email
  };
};

export const verifyEmail = async (email, code) => {
  const normalizedEmail = email.trim().toLowerCase();
  const codeHash = hashValue(code.trim());
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const userResult = await client.query(
      `SELECT id, first_name, last_name, email, phone, avatar, role,
              email_verified_at
       FROM users
       WHERE LOWER(email) = $1
       FOR UPDATE`,
      [normalizedEmail]
    );

    const user = userResult.rows[0];

    if (!user) {
      throw new Error("Invalid or expired verification code");
    }

    if (user.email_verified_at) {
      throw new Error("Email is already verified. Please log in.");
    }

    const codeResult = await client.query(
      `SELECT id, code_hash, expires_at, attempts
       FROM email_verification_codes
       WHERE user_id = $1
       FOR UPDATE`,
      [user.id]
    );

    const verification = codeResult.rows[0];

    if (
      !verification ||
      new Date(verification.expires_at) <= new Date() ||
      verification.attempts >= 5
    ) {
      throw new Error("Invalid or expired verification code");
    }

    if (verification.code_hash !== codeHash) {
      await client.query(
        `UPDATE email_verification_codes
         SET attempts = attempts + 1
         WHERE id = $1`,
        [verification.id]
      );

      await client.query("COMMIT");
      throw new Error("Invalid or expired verification code");
    }

    await client.query(
      `UPDATE users
       SET email_verified_at = CURRENT_TIMESTAMP,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $1`,
      [user.id]
    );

    await client.query(
      "DELETE FROM email_verification_codes WHERE user_id = $1",
      [user.id]
    );

    await client.query("COMMIT");

    const token = createToken(user);

    return {
      token,
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        role: user.role,
        email_verified_at: new Date().toISOString()
      }
    };
  } catch (error) {
    await client.query("ROLLBACK").catch(() => {});
    throw error;
  } finally {
    client.release();
  }
};

export const resendVerificationCode = async (email) => {
  const normalizedEmail = email.trim().toLowerCase();

  const result = await pool.query(
    `SELECT id, email, email_verified_at
     FROM users
     WHERE LOWER(email) = $1`,
    [normalizedEmail]
  );

  const user = result.rows[0];

  // Use the same public response whether or not the account exists.
  if (!user || user.email_verified_at) {
    return true;
  }

  await sendVerificationCode(user);
  return true;
};

export const login = async (email, password) => {
  const normalizedEmail = email.trim().toLowerCase();

  const result = await pool.query(
    `SELECT id, first_name, last_name, email, password_hash,
            phone, avatar, role, email_verified_at
     FROM users
     WHERE LOWER(email) = $1`,
    [normalizedEmail]
  );

  const user = result.rows[0];

  if (!user || !user.password_hash) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  if (!user.email_verified_at) {
    throw new Error("Please verify your email before logging in");
  }

  return {
    token: createToken(user),
    user: {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar,
      role: user.role
    }
  };
};

export const forgotPassword = async (email) => {
  const normalizedEmail = email.trim().toLowerCase();

  const result = await pool.query(
    `SELECT id, email FROM users WHERE LOWER(email) = $1`,
    [normalizedEmail]
  );

  const user = result.rows[0];

  // Do not reveal whether an email is registered.
  if (!user) {
    return true;
  }

  const token = crypto.randomBytes(32).toString("hex");
  const tokenHash = hashValue(token);
  const expires = new Date(Date.now() + 15 * 60 * 1000);

  await pool.query(
    `INSERT INTO password_reset_tokens
       (user_id, token_hash, expires_at, used)
     VALUES ($1, $2, $3, false)`,
    [user.id, tokenHash, expires]
  );

  const resetLink =
    `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: "Reset your password",
    html: `
      <h2>Password Reset</h2>
      <p>Use the link below to reset your password.</p>
      <p><a href="${resetLink}">Reset your password</a></p>
      <p>This link expires in 15 minutes.</p>
    `
  });

  return true;
};

export const resetPassword = async (token, newPassword) => {
  const tokenHash = hashValue(token);
  const hashedPassword = await bcrypt.hash(newPassword, 12);
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const result = await client.query(
      `SELECT id, user_id
       FROM password_reset_tokens
       WHERE token_hash = $1
         AND used = false
         AND expires_at > NOW()
       FOR UPDATE`,
      [tokenHash]
    );

    const reset = result.rows[0];

    if (!reset) {
      throw new Error("Invalid or expired token");
    }

    await client.query(
      `UPDATE users
       SET password_hash = $1,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $2`,
      [hashedPassword, reset.user_id]
    );

    await client.query(
      `UPDATE password_reset_tokens
       SET used = true
       WHERE id = $1`,
      [reset.id]
    );

    await client.query("COMMIT");
    return true;
  } catch (error) {
    await client.query("ROLLBACK").catch(() => {});
    throw error;
  } finally {
    client.release();
  }
};
