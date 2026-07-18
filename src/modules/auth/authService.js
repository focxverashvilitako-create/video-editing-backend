import pool from "../../config/db.js";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


import crypto from "crypto";

export const register = async (
  firstName,
  lastName,
  email,
  password,
  phone,
  avatar
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
    (first_name, last_name, email, password_hash, phone, avatar)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id, first_name, last_name, email, phone, avatar, role
    `,
    [
      firstName,
      lastName,
      email,
      hashedPassword,
      phone,
      avatar || null
    ]
  );


  const user = result.rows[0];


  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d"
    }
  );


  return {
    token,
    user
  };

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
    user.password_hash
  );


  if (!isMatch) {
    throw new Error("Wrong password");
  }


  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d"
    }
  );


  return {
    token,
    user: {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar,
      role: user.role
    }
  };
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


  const expires = new Date(
    Date.now() + 15 * 60 * 1000
  );


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
    SET password_hash = $1,
        updated_at = CURRENT_TIMESTAMP
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
    [
      reset.id
    ]
  );


  return true;
};

