import pool from "../../config/db.js";


// CREATE
export const createSettings = async (
  site_name,
  phone,
  email,
  address,
  facebook,
  instagram,
  youtube
) => {

  const result = await pool.query(
    `
    INSERT INTO settings
    (
      site_name,
      phone,
      email,
      address,
      facebook,
      instagram,
      youtube
    )
    VALUES
    ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
    `,
    [
      site_name.trim(),
      phone.trim(),
      email.trim(),
      address.trim(),
      facebook ?? null,
      instagram ?? null,
      youtube ?? null
    ]
  );


  return result.rows[0];
};


// GET ALL
export const getSettings = async () => {

  const result = await pool.query(
    `
    SELECT *
    FROM settings
    ORDER BY id ASC
    `
  );


  return result.rows;
};


// UPDATE
export const updateSettings = async (
  id,
  fields
) => {

  const allowedFields = {
    site_name: "site_name",
    phone: "phone",
    email: "email",
    address: "address",
    facebook: "facebook",
    instagram: "instagram",
    youtube: "youtube"
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
    UPDATE settings
    SET ${updates.join(", ")}
    WHERE id = $${values.length}
    RETURNING *
    `,
    values
  );


  return result.rows[0];
};


// DELETE
export const deleteSettings = async (
  id
) => {

  const result = await pool.query(
    `
    DELETE FROM settings
    WHERE id = $1
    RETURNING *
    `,
    [id]
  );


  return result.rows[0];
};