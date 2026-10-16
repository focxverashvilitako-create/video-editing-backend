
import pool from "../../config/db.js";


// CREATE
export const createPurchase = async (
  userId,
  courseId,
  paymentId
) => {

  // Check if user exists
  const userResult = await pool.query(
    `
    SELECT id
    FROM users
    WHERE id = $1
    `,
    [userId]
  );

  if (userResult.rows.length === 0) {
    throw new Error("User not found");
  }


  // Check if course exists
  const courseResult = await pool.query(
    `
    SELECT id
    FROM courses
    WHERE id = $1
    `,
    [courseId]
  );

  if (courseResult.rows.length === 0) {
    throw new Error("Course not found");
  }


  // Check if payment exists
  const paymentResult = await pool.query(
    `
    SELECT *
    FROM payments
    WHERE id = $1
    `,
    [paymentId]
  );

  if (paymentResult.rows.length === 0) {
    throw new Error("Payment not found");
  }

  const payment = paymentResult.rows[0];


  // Payment must be successful
  if (payment.status !== "success") {
    throw new Error(
      "Purchase cannot be created because payment was not successful"
    );
  }


  // Payment must belong to the same user
  if (
    String(payment.user_id).toLowerCase() !==
    String(userId).toLowerCase()
  ) {
    throw new Error(
      "Payment does not belong to this user"
    );
  }


  // Prevent duplicate purchase
  const existingPurchase = await pool.query(
    `
    SELECT id
    FROM purchases
    WHERE user_id = $1
      AND course_id = $2
      AND status = 'active'
      AND expires_at > NOW()
    LIMIT 1
    `,
    [userId, courseId]
  );

  if (existingPurchase.rows.length > 0) {
    throw new Error(
      "User already has an active purchase for this course"
    );
  }


  const purchaseDate = new Date();

  const expiresAt = new Date(purchaseDate);

  expiresAt.setDate(
    expiresAt.getDate() + 365
  );


  const result = await pool.query(
    `
    INSERT INTO purchases
    (
      user_id,
      course_id,
      payment_id,
      purchase_date,
      expires_at,
      status
    )
    VALUES
    ($1, $2, $3, $4, $5, 'active')
    RETURNING *
    `,
    [
      userId,
      courseId,
      paymentId,
      purchaseDate,
      expiresAt
    ]
  );

  return result.rows[0];
};


// GET USER PURCHASES
export const getUserPurchases = async (userId) => {

  const result = await pool.query(
    `
    SELECT *
    FROM purchases
    WHERE user_id = $1
    ORDER BY purchase_date DESC, id DESC
    `,
    [userId]
  );

  return result.rows;
};


// GET BY ID
export const getPurchaseById = async (id) => {

  const result = await pool.query(
    `
    SELECT *
    FROM purchases
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0];
};


// CHECK COURSE ACCESS
export const checkCourseAccess = async (
  userId,
  courseId
) => {

  // Expire old purchases
  await pool.query(
    `
    UPDATE purchases
    SET status = 'expired'
    WHERE user_id = $1
      AND course_id = $2
      AND status = 'active'
      AND expires_at <= NOW()
    `,
    [userId, courseId]
  );


  // Check active purchase
  const result = await pool.query(
    `
    SELECT id
    FROM purchases
    WHERE user_id = $1
      AND course_id = $2
      AND status = 'active'
      AND expires_at > NOW()
    ORDER BY expires_at DESC
    LIMIT 1
    `,
    [userId, courseId]
  );

  return result.rows.length > 0;
};
