
import pool from "../../config/db.js";

export const createLessonResource = async (
  lesson_id,
  title,
  file_url
) => {
  const result = await pool.query(
    `
    INSERT INTO lesson_resources
      (lesson_id, title, file_url)
    VALUES ($1, $2, $3)
    RETURNING *
    `,
    [lesson_id, title.trim(), file_url]
  );

  return result.rows[0];
};

export const getAllLessonResources = async () => {
  const result = await pool.query(
    `
    SELECT *
    FROM lesson_resources
    ORDER BY id
    `
  );

  return result.rows;
};

export const getLessonResourceById = async (id) => {
  const result = await pool.query(
    `
    SELECT *
    FROM lesson_resources
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0];
};

export const getResourcesByLessonId = async (lesson_id) => {
  const result = await pool.query(
    `
    SELECT *
    FROM lesson_resources
    WHERE lesson_id = $1
    ORDER BY id
    `,
    [lesson_id]
  );

  return result.rows;
};

export const updateLessonResource = async (id, fields) => {
  const allowedFields = {
    lesson_id: "lesson_id",
    title: "title",
    file_url: "file_url"
  };

  const updates = [];
  const values = [];

  for (const [key, value] of Object.entries(fields)) {
    if (value !== undefined && allowedFields[key]) {
      updates.push(
        `${allowedFields[key]} = $${values.length + 1}`
      );

      values.push(
        key === "title" && typeof value === "string"
          ? value.trim()
          : value
      );
    }
  }

  if (updates.length === 0) {
    return null;
  }

  if (fields.lesson_id !== undefined) {
    const lessonResult = await pool.query(
      `
      SELECT id
      FROM lessons
      WHERE id = $1
      `,
      [fields.lesson_id]
    );

    if (lessonResult.rows.length === 0) {
      const error = new Error("Lesson not found");
      error.code = "23503";
      throw error;
    }
  }

  values.push(id);

  const result = await pool.query(
    `
    UPDATE lesson_resources
    SET ${updates.join(", ")}
    WHERE id = $${values.length}
    RETURNING *
    `,
    values
  );

  return result.rows[0];
};

export const deleteLessonResource = async (id) => {
  const result = await pool.query(
    `
    DELETE FROM lesson_resources
    WHERE id = $1
    RETURNING *
    `,
    [id]
  );

  return result.rows[0];
};
