import pool from "../../config/db.js";

export const createSyllabus = async ({
  course_id,
  title,
  description,
  sort_order
}) => {

  const courseResult = await pool.query(
    `
    SELECT id
    FROM courses
    WHERE id = $1
    `,
    [course_id]
  );

  if (courseResult.rows.length === 0) {
    throw new Error("Course not found");
  }

  const result = await pool.query(
    `
    INSERT INTO syllabus
    (
      course_id,
      title,
      description,
      sort_order
    )
    VALUES
    ($1, $2, $3, $4)
    RETURNING *
    `,
    [
      course_id,
      title.trim(),
      description ?? null,
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
    ORDER BY course_id ASC, sort_order ASC, id ASC
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

  return result.rows[0];
};


export const getSyllabusByCourseId = async (course_id) => {
  const result = await pool.query(
    `
    SELECT *
    FROM syllabus
    WHERE course_id = $1
    ORDER BY sort_order ASC, id ASC
    `,
    [course_id]
  );

  return result.rows;
};



export const updateSyllabus = async (id, fields) => {
  const allowedFields = {
    course_id: "course_id",
    title: "title",
    description: "description",
    sort_order: "sort_order"
  };

  const updates = [];
  const values = [];

  for (const [key, value] of Object.entries(fields)) {
    if (
      value !== undefined &&
      allowedFields[key]
    ) {
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


  if (fields.course_id !== undefined) {
    const courseResult = await pool.query(
      `
      SELECT id
      FROM courses
      WHERE id = $1
      `,
      [fields.course_id]
    );

    if (courseResult.rows.length === 0) {
      throw new Error("Course not found");
    }
  }


  values.push(id);

  const result = await pool.query(
    `
    UPDATE syllabus
    SET ${updates.join(", ")}
    WHERE id = $${values.length}
    RETURNING *
    `,
    values
  );

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

  return result.rows[0];
};