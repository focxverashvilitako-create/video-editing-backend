import pool from "../../config/db.js";

// CREATE
export const createLiveGroup = async ({
  course_id,
  title,
  max_students,
  start_date,
  schedule,
  location,
  status,
  start_time,
  end_time
}) => {
  const result = await pool.query(
    `
    INSERT INTO live_groups (
      course_id,
      title,
      max_students,
      current_students,
      start_date,
      schedule,
      location,
      status,
      start_time,
      end_time
    )
    VALUES (
      $1,$2,$3, 0, $4, $5,$6, $7,$8,$9
    )
    RETURNING *
    `,
    [
      course_id,
      title,
      max_students,
      start_date,
      JSON.stringify(schedule),
      location,
      status,
      start_time,
      end_time
    ]
  );

  return result.rows[0];
};


// GET ALL
export const getAllLiveGroups = async () => {
  const result = await pool.query(
    `
    SELECT *
    FROM live_groups
    ORDER BY start_date ASC
    `
  );

  return result.rows;
};


// GET BY ID
export const getLiveGroupById = async (id) => {
  const result = await pool.query(
    `
    SELECT *
    FROM live_groups
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0];
};


// UPDATE
export const updateLiveGroup = async (
  id,
  {
    course_id,
    title,
    max_students,
    start_date,
    schedule,
    location,
    status,
    start_time,
    end_time
  }
) => {
  const result = await pool.query(
    `
    UPDATE live_groups
    SET
      course_id = $1,
      title = $2,
      max_students = $3,
      start_date = $4,
      schedule = $5,
      location = $6,
      status = $7,
      start_time = $8,
      end_time = $9
    WHERE id = $10
    RETURNING *
    `,
    [
      course_id,
      title,
      max_students,
      start_date,
      JSON.stringify(schedule),
      location,
      status,
      start_time,
      end_time,
      id
    ]
  );

  return result.rows[0];
};


// DELETE
export const deleteLiveGroup = async (id) => {
  const result = await pool.query(
    `
    DELETE FROM live_groups
    WHERE id = $1
    RETURNING *
    `,
    [id]
  );

  return result.rows[0];
};