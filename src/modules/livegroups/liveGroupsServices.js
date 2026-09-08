import pool from "../../config/db.js";



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
    INSERT INTO live_groups
    (
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
    VALUES
    (
      $1,
      $2,
      $3,
      0,
      $4,
      $5,
      $6,
      $7,
      $8,
      $9
    )
    RETURNING *
    `,
    [
      course_id,
      title.trim(),
      max_students,
      start_date,
      JSON.stringify(schedule),
      location ?? null,
      status,
      start_time ?? null,
      end_time ?? null
    ]
  );

  return result.rows[0];
};

export const getAllLiveGroups = async () => {

  const result = await pool.query(
    `
    SELECT *
    FROM live_groups
    ORDER BY start_date ASC, id ASC
    `
  );

  return result.rows;
};


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

export const updateLiveGroup = async (
  id,
  fields
) => {

  const allowedFields = {
    course_id: "course_id",
    title: "title",
    max_students: "max_students",
    start_date: "start_date",
    schedule: "schedule",
    location: "location",
    status: "status",
    start_time: "start_time",
    end_time: "end_time"
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
          : key === "schedule"
            ? JSON.stringify(value)
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
    UPDATE live_groups
    SET ${updates.join(", ")}
    WHERE id = $${values.length}
    RETURNING *
    `,
    values
  );


  return result.rows[0];
};



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