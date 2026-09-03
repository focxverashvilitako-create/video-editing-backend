import pool from "../../config/db.js";

export const createLessonResource = async (
  lesson_id,
  title,
  file_url
) => {
  const result = await pool.query(
    `INSERT INTO lesson_resources (lesson_id, title, file_url)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [lesson_id, title, file_url]
  );

  return result.rows[0];
};

export const getAllLessonResources = async () => {
  const result = await pool.query(
    `SELECT * FROM lesson_resources
     ORDER BY id`
  );

  return result.rows;
};

export const getLessonResourceById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM lesson_resources
     WHERE id = $1`,
    [id]
  );

  return result.rows[0];
};

export const getResourcesByLessonId = async (lesson_id) => {
  const result = await pool.query(
    `SELECT * FROM lesson_resources
     WHERE lesson_id = $1
     ORDER BY id`,
    [lesson_id]
  );

  return result.rows;
};

export const updateLessonResource = async (
  id,
  lesson_id,
  title,
  file_url
) => {
  const result = await pool.query(
    `UPDATE lesson_resources
     SET lesson_id = $1,
         title = $2,
         file_url = $3
     WHERE id = $4
     RETURNING *`,
    [lesson_id, title, file_url, id]
  );

  return result.rows[0];
};

export const deleteLessonResource = async (id) => {
  const result = await pool.query(
    `DELETE FROM lesson_resources
     WHERE id = $1
     RETURNING *`,
    [id]
  );

  return result.rows[0];
};