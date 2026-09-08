import pool from "../../config/db.js";


export const createLectureRecording = async (
  group_id,
  title,
  video_url,
  lesson_date
) => {

  const groupResult = await pool.query(
    `
    SELECT id
    FROM live_groups
    WHERE id = $1
    `,
    [group_id]
  );

  if (groupResult.rows.length === 0) {
    throw new Error("Live group not found");
  }

  const result = await pool.query(
    `
    INSERT INTO lecture_recordings
    (
      group_id,
      title,
      video_url,
      lesson_date
    )
    VALUES
    ($1, $2, $3, $4)
    RETURNING *
    `,
    [
      group_id,
      title.trim(),
      video_url ?? null,
      lesson_date ?? null
    ]
  );

  return result.rows[0];
};


export const getAllLectureRecordings = async () => {
  const result = await pool.query(
    `
    SELECT *
    FROM lecture_recordings
    ORDER BY lesson_date ASC, id ASC
    `
  );

  return result.rows;
};


export const getLectureRecordingById = async (id) => {
  const result = await pool.query(
    `
    SELECT *
    FROM lecture_recordings
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0];
};


export const getLectureRecordingsByGroupId = async (group_id) => {
  const result = await pool.query(
    `
    SELECT *
    FROM lecture_recordings
    WHERE group_id = $1
    ORDER BY lesson_date ASC, id ASC
    `,
    [group_id]
  );

  return result.rows;
};


export const updateLectureRecording = async (id, fields) => {
  const allowedFields = {
    group_id: "group_id",
    title: "title",
    video_url: "video_url",
    lesson_date: "lesson_date"
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


  
  if (fields.group_id !== undefined) {
    const groupResult = await pool.query(
      `
      SELECT id
      FROM live_groups
      WHERE id = $1
      `,
      [fields.group_id]
    );

    if (groupResult.rows.length === 0) {
      throw new Error("Live group not found");
    }
  }


  values.push(id);

  const result = await pool.query(
    `
    UPDATE lecture_recordings
    SET ${updates.join(", ")}
    WHERE id = $${values.length}
    RETURNING *
    `,
    values
  );

  return result.rows[0];
};


export const deleteLectureRecording = async (id) => {
  const result = await pool.query(
    `
    DELETE FROM lecture_recordings
    WHERE id = $1
    RETURNING *
    `,
    [id]
  );

  return result.rows[0];
};