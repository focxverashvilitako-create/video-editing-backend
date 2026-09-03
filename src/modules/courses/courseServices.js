import pool from "../../config/db.js";


export const createCourse = async ({
  title,
  description,
  type,
  price,
  thumbnail,
  promoVideo,
  isActive = true
}) => {

  const result = await pool.query(
    `
    INSERT INTO courses
    (
      title,
      description,
      type,
      price,
      thumbnail,
      promo_video,
      is_active
    )
    VALUES
    ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
    `,
    [
      title,
      description,
      type,
      price,
      thumbnail,
      promoVideo,
      isActive
    ]
  );

  return result.rows[0];
};


export const getAllCourses = async () => {

  const result = await pool.query(
    `
    SELECT *
    FROM courses
    ORDER BY title ASC
    `
  );

  return result.rows;
};


export const getCourseById = async (id) => {

  const result = await pool.query(
    `
    SELECT *
    FROM courses
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0];
};


export const updateCourse = async (
  id,
  {
    title,
    description,
    type,
    price,
    thumbnail,
    promoVideo,
    isActive
  }
) => {

  const result = await pool.query(
    `
    UPDATE courses
    SET
      title = $1,
      description = $2,
      type = $3,
      price = $4,
      thumbnail = $5,
      promo_video = $6,
      is_active = $7
    WHERE id = $8
    RETURNING *
    `,
    [
      title,
      description,
      type,
      price,
      thumbnail,
      promoVideo,
      isActive,
      id
    ]
  );

  return result.rows[0];
};


export const deleteCourse = async (id) => {

  const result = await pool.query(
    `
    DELETE FROM courses
    WHERE id = $1
    RETURNING *
    `,
    [id]
  );

  return result.rows[0];
};