import pool from "../../config/db.js";


export const createLesson = async ({
  section_id,
  title,
  description,
  video_url,
  duration,
  provider,
  is_preview,
  sort_order
}) => {

  
  const sectionResult = await pool.query(
    `
    SELECT id
    FROM course_sections
    WHERE id = $1
    `,
    [section_id]
  );

  if (sectionResult.rows.length === 0) {
    throw new Error("Course section not found");
  }

  const result = await pool.query(
    `
    INSERT INTO lessons
    (
      section_id,
      title,
      description,
      video_url,
      duration,
      provider,
      is_preview,
      sort_order
    )
    VALUES
    ($1,$2,$3,$4,$5,$6,$7,$8)
    RETURNING *
    `,
    [
      section_id,
      title.trim(),
      description,
      video_url,
      duration,
      provider,
      is_preview,
      sort_order
    ]
  );

  return result.rows[0];
};



export const getAllLessons = async () => {
  const result = await pool.query(
    `
    SELECT *
    FROM lessons
    ORDER BY sort_order ASC, id ASC
    `
  );

  return result.rows;
};



export const getLessonById = async (id) => {
  const result = await pool.query(
    `
    SELECT *
    FROM lessons
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0];
};



export const updateLesson = async (id, fields) => {
  const allowedFields = {
    section_id: "section_id",
    title: "title",
    description: "description",
    video_url: "video_url",
    duration: "duration",
    provider: "provider",
    is_preview: "is_preview",
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

  
  if (fields.section_id !== undefined) {
    const sectionResult = await pool.query(
      `
      SELECT id
      FROM course_sections
      WHERE id = $1
      `,
      [fields.section_id]
    );

    if (sectionResult.rows.length === 0) {
      throw new Error("Course section not found");
    }
  }

  values.push(id);

  const result = await pool.query(
    `
    UPDATE lessons
    SET ${updates.join(", ")}
    WHERE id = $${values.length}
    RETURNING *
    `,
    values
  );

  return result.rows[0];
};


export const deleteLesson = async (id) => {
  const result = await pool.query(
    `
    DELETE FROM lessons
    WHERE id = $1
    RETURNING *
    `,
    [id]
  );

  return result.rows[0];
};