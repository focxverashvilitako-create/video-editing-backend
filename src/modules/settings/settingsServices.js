import pool from "../../config/db.js";

export const createSettings = async (
  site_name,
  phone,
  email,
  address,
  facebook,
  instagram,
  youtube
) => {
  const result = await pool.query(
    `
    INSERT INTO settings
    (
      site_name,
      phone,
      email,
      address,
      facebook,
      instagram,
      youtube
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7)
    RETURNING *
    `,
    [
      site_name,
      phone,
      email,
      address,
      facebook,
      instagram,
      youtube
    ]
  );

  return result.rows[0];
};


export const getSettings = async () => {
  const result = await pool.query(
    "SELECT * FROM settings ORDER BY id"
  );

  return result.rows;
};


export const updateSettings = async (
  id,
  site_name,
  phone,
  email,
  address,
  facebook,
  instagram,
  youtube
) => {
  const result = await pool.query(
    `
    UPDATE settings
    SET
      site_name = $1,
      phone = $2,
      email = $3,
      address = $4,
      facebook = $5,
      instagram = $6,
      youtube = $7
    WHERE id = $8
    RETURNING *
    `,
    [
      site_name,
      phone,
      email,
      address,
      facebook,
      instagram,
      youtube,
      id
    ]
  );

  if (result.rows.length === 0) {
    throw new Error("Settings not found");
  }

  return result.rows[0];
};


export const deleteSettings = async (id) => {
  const result = await pool.query(
    `
    DELETE FROM settings
    WHERE id = $1
    RETURNING *
    `,
    [id]
  );

  if (result.rows.length === 0) {
    throw new Error("Settings not found");
  }

  return result.rows[0];
};