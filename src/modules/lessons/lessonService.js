import pool from "../../config/db.js";

export const createLesson = async (
  sectionid,
  title,
  description,
  videourl,
  duration,
  provider,
  ispreview,
  sortorder
) => {

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
      sectionid,
      title,
      description,
      videourl,
      duration,
      provider,
      ispreview,
      sortorder
    ]
  );

  return result.rows[0];
};

  export const getAllLessons = async () => {
  const result = await pool.query(
    `
    SELECT *
    FROM lessons
    ORDER BY sort_order ASC
    `
  );

  return result.rows;
}
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



export const updateLesson = async (
  id,
  section_id,
  title,
  description,
  video_url,
  duration,
  provider,
  is_preview,
  sort_order
) => {

  const result = await pool.query(
    `
    UPDATE lessons
    SET
      section_id = $1,
      title = $2,
      description = $3,
      video_url = $4,
      duration = $5,
      provider = $6,
      is_preview = $7,
      sort_order = $8

    WHERE id = $9

    RETURNING *
    `,
    [
      section_id,
      title,
      description,
      video_url,
      duration,
      provider,
      is_preview,
      sort_order,
      id
    ]
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

  
