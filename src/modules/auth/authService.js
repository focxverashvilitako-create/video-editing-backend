import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import pool from "../../config/db.js";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();


export const register = async (
  username,
  email,
  password
) => {

  const exists = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );


  if (exists.rows.length > 0) {
    throw new Error("User already exists");
  }


  const hashedPassword = await bcrypt.hash(
    password,
    10
  );


  const result = await pool.query(
    `
    INSERT INTO users 
    (username, email, password)
    VALUES($1,$2,$3)
    RETURNING id, username, email
    `,
    [
      username,
      email,
      hashedPassword
    ]
  );


  return result.rows[0];
};



export const login = async (
  email,
  password
) => {


  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );


  const user = result.rows[0];


  if (!user) {
    throw new Error("User not found");
  }


  const isMatch = await bcrypt.compare(
    password,
    user.password
  );


  if (!isMatch) {
    throw new Error("Wrong password");
  }


  const token = jwt.sign(
    {
      id: user.id,
      email: user.email
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d"
    }
  );


  return token;
};


export const forgotPassword = async (email) => {

  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  const user = result.rows[0];

  if (!user) {
    throw new Error("User not found");
  }

  const token = crypto.randomBytes(32).toString("hex");

  const tokenHash = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const expires = new Date(Date.now() + 15 * 60 * 1000);

  await pool.query(
    `
    INSERT INTO password_reset_tokens
    (user_id, token_hash, expires_at, used)
    VALUES ($1,$2,$3,false)
    `,
    [
      user.id,
      tokenHash,
      expires
    ]
  );

  return token;
};

export const resetPassword = async (
  token,
  newPassword
) => {

  const tokenHash = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const result = await pool.query(
    `
    SELECT *
    FROM password_reset_tokens
    WHERE token_hash = $1
      AND used = false
      AND expires_at > NOW()
    `,
    [tokenHash]
  );


  const reset = result.rows[0];

  if (!reset) {
    throw new Error("Invalid or expired token");
  }

  const hashedPassword = await bcrypt.hash(
    newPassword,
    10
  );

  await pool.query(
    `
    UPDATE users
    SET password = $1
    WHERE id = $2
    `,
    [
      hashedPassword,
      reset.user_id
    ]
  );

  await pool.query(
    `
    UPDATE password_reset_tokens
    SET used = true
    WHERE id = $1
    `,
    [reset.id]
  );

  return true;
};