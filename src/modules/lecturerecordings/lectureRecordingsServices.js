import pool from "../../config/db.js";

export const createLectureRecording = async (
  group_id,
  title,
  video_url,
  lesson_date
) => {
  const result = await pool.query(
    `INSERT INTO lecture_recordings
     (group_id, title, video_url, lesson_date)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [group_id, title, video_url ?? null, lesson_date ?? null]
  );

  return result.rows[0];
};

export const getAllLectureRecordings = async () => {
  const result = await pool.query(
    `SELECT * FROM lecture_recordings
     ORDER BY lesson_date`
  );

  return result.rows;
};

export const getLectureRecordingById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM lecture_recordings
     WHERE id = $1`,
    [id]
  );

  return result.rows[0];
};

export const getLectureRecordingsByGroupId = async (group_id) => {
  const result = await pool.query(
    `SELECT * FROM lecture_recordings
     WHERE group_id = $1
     ORDER BY lesson_date`,
    [group_id]
  );

  return result.rows;
};

export const updateLectureRecording = async (
  id,
  group_id,
  title,
  video_url,
  lesson_date
) => {
  const result = await pool.query(
    `UPDATE lecture_recordings
     SET group_id = $1,
         title = $2,
         video_url = $3,
         lesson_date = $4
     WHERE id = $5
     RETURNING *`,
    [
      group_id,
      title,
      video_url ?? null,
      lesson_date ?? null,
      id
    ]
  );

  return result.rows[0];
};

export const deleteLectureRecording = async (id) => {
  const result = await pool.query(
    `DELETE FROM lecture_recordings
     WHERE id = $1
     RETURNING *`,
    [id]
  );

  return result.rows[0];
};