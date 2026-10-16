import pool from "../../config/db.js";

// CREATE
export const createCourseSection = async ({
  course_id,
  title,
  sort_order
}) => {
  const courseResult = await pool.query(
    `SELECT id FROM courses WHERE id = $1`,
    [course_id]
  );

  if (courseResult.rows.length === 0) {
    throw new Error("Course not found");
  }

  const result = await pool.query(
    `
    INSERT INTO course_sections (
      course_id,
      title,
      sort_order
    )
    VALUES ($1, $2, $3)
    RETURNING *
    `,
    [course_id, title.trim(), sort_order]
  );

  return result.rows[0];
};

// GET ALL
export const getAllCourseSections = async () => {
  const result = await pool.query(
    `
    SELECT *
    FROM course_sections
    ORDER BY course_id ASC, sort_order ASC, id ASC
    `
  );

  return result.rows;
};

// GET BY ID
export const getCourseSectionById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM course_sections WHERE id = $1`,
    [id]
  );

  return result.rows[0];
};

// GET BY COURSE ID
export const getCourseSectionsByCourseId = async (course_id) => {
  const result = await pool.query(
    `
    SELECT *
    FROM course_sections
    WHERE course_id = $1
    ORDER BY sort_order ASC, id ASC
    `,
    [course_id]
  );

  return result.rows;
};

// UPDATE
export const updateCourseSection = async (id, fields) => {
  const allowedFields = {
    course_id: "course_id",
    title: "title",
    sort_order: "sort_order"
  };

  const updates = [];
  const values = [];

  for (const [key, value] of Object.entries(fields)) {
    if (value !== undefined && allowedFields[key]) {
      updates.push(`${allowedFields[key]} = $${values.length + 1}`);

      values.push(
        key === "title" ? value.trim() : value
      );
    }
  }

  if (updates.length === 0) {
    return null;
  }

  if (fields.course_id !== undefined) {
    const courseResult = await pool.query(
      `SELECT id FROM courses WHERE id = $1`,
      [fields.course_id]
    );

    if (courseResult.rows.length === 0) {
      throw new Error("Course not found");
    }
  }

  values.push(id);

  const result = await pool.query(
    `
    UPDATE course_sections
    SET ${updates.join(", ")}
    WHERE id = $${values.length}
    RETURNING *
    `,
    values
  );

  return result.rows[0];
};

// DELETE
export const deleteCourseSection = async (id) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Lock the section while checking and deleting it.
    const sectionResult = await client.query(
      `
      SELECT id
      FROM course_sections
      WHERE id = $1
      FOR UPDATE
      `,
      [id]
    );

    if (sectionResult.rows.length === 0) {
      await client.query("ROLLBACK");
      return null;
    }

    const lessonsResult = await client.query(
      `
      SELECT id
      FROM lessons
      WHERE section_id = $1
      LIMIT 1
      `,
      [id]
    );

    if (lessonsResult.rows.length > 0) {
      await client.query("ROLLBACK");

      throw new Error(
        "Cannot delete course section because it contains lessons"
      );
    }

    const result = await client.query(
      `
      DELETE FROM course_sections
      WHERE id = $1
      RETURNING *
      `,
      [id]
    );

    await client.query("COMMIT");

    return result.rows[0];
  } catch (error) {
    await client.query("ROLLBACK").catch(() => {});
    throw error;
  } finally {
    client.release();
  }
};