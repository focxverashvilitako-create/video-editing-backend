import pool from "../../config/db.js";

export const createGalleryItem = async (title, media_type, file_url) => {
  const result = await pool.query(
    `INSERT INTO gallery (title, media_type, file_url)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [title, media_type, file_url]
  );

  return result.rows[0];
};

export const getAllGalleryItems = async () => {
  const result = await pool.query(
    `SELECT * FROM gallery
     ORDER BY id`
  );

  return result.rows;
};

export const getGalleryItemById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM gallery
     WHERE id = $1`,
    [id]
  );

  return result.rows[0];
};

export const updateGalleryItem = async (
  id,
  title,
  media_type,
  file_url
) => {
  const result = await pool.query(
    `UPDATE gallery
     SET title = $1,
         media_type = $2,
         file_url = $3
     WHERE id = $4
     RETURNING *`,
    [title, media_type, file_url, id]
  );

  return result.rows[0];
};

export const deleteGalleryItem = async (id) => {
  const result = await pool.query(
    `DELETE FROM gallery
     WHERE id = $1
     RETURNING *`,
    [id]
  );

  return result.rows[0];
};