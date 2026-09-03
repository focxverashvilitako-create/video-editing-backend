import pool from "../../config/db.js";


// CREATE PURCHASE AFTER SUCCESSFUL PAYMENT
export const createPurchase = async (userId, courseId, paymentId) => {

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

  // PAYMENT MUST BE SUCCESSFUL
  if (payment.status !== "success") {
    throw new Error("Purchase cannot be created because payment was not successful");
  }

  // PAYMENT MUST BELONG TO SAME USER
  if (payment.user_id !== userId) {
    throw new Error("Payment does not belong to this user");
  }

  const purchaseDate = new Date();

  const expiresAt = new Date(purchaseDate);
  expiresAt.setDate(expiresAt.getDate() + 365);

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
    ORDER BY purchase_date DESC
    `,
    [userId]
  );

  return result.rows;
};


// GET PURCHASE BY ID
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
export const checkCourseAccess = async (userId, courseId) => {

  // Mark expired purchases as expired
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

  const result = await pool.query(
    `
    SELECT *
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