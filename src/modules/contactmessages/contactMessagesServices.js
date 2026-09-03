import pool from "../../config/db.js";

export const createContactMessage = async ({
  name,
  email,
  phone,
  message,
}) => {
  const result = await pool.query(
    `INSERT INTO contact_messages
      (name, email, phone, message)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [name, email, phone || null, message]
  );

  return result.rows[0];
};

export const getAllContactMessages = async () => {
  const result = await pool.query(
    `SELECT *
     FROM contact_messages
     ORDER BY id DESC`
  );

  return result.rows;
};

export const getContactMessageById = async (id) => {
  const result = await pool.query(
    `SELECT *
     FROM contact_messages
     WHERE id = $1`,
    [id]
  );

  return result.rows[0];
};

export const updateContactMessageStatus = async (id, status) => {
  const result = await pool.query(
    `UPDATE contact_messages
     SET status = $1
     WHERE id = $2
     RETURNING *`,
    [status, id]
  );

  return result.rows[0];
};

export const deleteContactMessage = async (id) => {
  const result = await pool.query(
    `DELETE FROM contact_messages
     WHERE id = $1
     RETURNING *`,
    [id]
  );

  return result.rows[0];
};