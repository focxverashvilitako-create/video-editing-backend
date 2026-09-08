import pool from "../../config/db.js";


// CREATE
export const createGalleryItem = async (
  title,
  media_type,
  file_url
) => {

  const result = await pool.query(
    `
    INSERT INTO gallery
    (
      title,
      media_type,
      file_url
    )
    VALUES
    ($1, $2, $3)
    RETURNING *
    `,
    [
      title.trim(),
      media_type,
      file_url.trim()
    ]
  );


  return result.rows[0];
};


// GET ALL
export const getAllGalleryItems = async () => {

  const result = await pool.query(
    `
    SELECT *
    FROM gallery
    ORDER BY id ASC
    `
  );


  return result.rows;
};


// GET BY ID
export const getGalleryItemById = async (
  id
) => {

  const result = await pool.query(
    `
    SELECT *
    FROM gallery
    WHERE id = $1
    `,
    [id]
  );


  return result.rows[0];
};


// UPDATE
export const updateGalleryItem = async (
  id,
  fields
) => {

  const allowedFields = {
    title: "title",
    media_type: "media_type",
    file_url: "file_url"
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
        typeof value === "string"
          ? value.trim()
          : value
      );
    }
  }


  if (updates.length === 0) {
    return null;
  }


  values.push(id);


  const result = await pool.query(
    `
    UPDATE gallery
    SET ${updates.join(", ")}
    WHERE id = $${values.length}
    RETURNING *
    `,
    values
  );


  return result.rows[0];
};


// DELETE
export const deleteGalleryItem = async (
  id
) => {

  const result = await pool.query(
    `
    DELETE FROM gallery
    WHERE id = $1
    RETURNING *
    `,
    [id]
  );


  return result.rows[0];
};