import pool from "../../config/db.js";

export const createSyllabus = async (
  course_id,
  title,
  description,
  sort_order
) => {
  const result = await pool.query(
    `
    INSERT INTO syllabus
    (course_id, title, description, sort_order)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
    [
      course_id,
      title,
      description || null,
      sort_order
    ]
  );

  return result.rows[0];
};


export const getAllSyllabus = async () => {
  const result = await pool.query(
    `
    SELECT *
    FROM syllabus
    ORDER BY course_id, sort_order
    `
  );

  return result.rows;
};


export const getSyllabusById = async (id) => {
  const result = await pool.query(
    `
    SELECT *
    FROM syllabus
    WHERE id = $1
    `,
    [id]
  );

  if (result.rows.length === 0) {
    throw new Error("Syllabus not found");
  }

  return result.rows[0];
};


export const getSyllabusByCourseId = async (course_id) => {
  const result = await pool.query(
    `
    SELECT *
    FROM syllabus
    WHERE course_id = $1
    ORDER BY sort_order
    `,
    [course_id]
  );

  return result.rows;
};


export const updateSyllabus = async (
  id,
  course_id,
  title,
  description,
  sort_order
) => {
  const result = await pool.query(
    `
    UPDATE syllabus
    SET
      course_id = $1,
      title = $2,
      description = $3,
      sort_order = $4
    WHERE id = $5
    RETURNING *
    `,
    [
      course_id,
      title,
      description || null,
      sort_order,
      id
    ]
  );

  if (result.rows.length === 0) {
    throw new Error("Syllabus not found");
  }

  return result.rows[0];
};


export const deleteSyllabus = async (id) => {
  const result = await pool.query(
    `
    DELETE FROM syllabus
    WHERE id = $1
    RETURNING *
    `,
    [id]
  );

  if (result.rows.length === 0) {
    throw new Error("Syllabus not found");
  }

  return result.rows[0];
};