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


export const updateCourse = async (id, fields) => {

  const allowedFields = {
    title: "title",
    description: "description",
    type: "type",
    price: "price",
    thumbnail: "thumbnail",
    promoVideo: "promo_video",
    isActive: "is_active"
  };


  const updates = [];
  const values = [];


  for (const [key, value] of Object.entries(fields)) {

    if (value !== undefined && allowedFields[key]) {

      updates.push(
        `${allowedFields[key]} = $${values.length + 1}`
      );

      values.push(value);

    }

  }


  if (updates.length === 0) {
    return null;
  }


  values.push(id);


  const result = await pool.query(
    `
    UPDATE courses
    SET ${updates.join(", ")}
    WHERE id = $${values.length}
    RETURNING *
    `,
    values
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