import pool from "../../config/db.js";


// SIMULATE PAYMENT
export const simulatePayment = async (
  userId,
  courseId
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
    SELECT id, price
    FROM courses
    WHERE id = $1
    `,
    [courseId]
  );

  if (courseResult.rows.length === 0) {
    throw new Error("Course not found");
  }

  const course = courseResult.rows[0];


  // Check if user already has an active purchase
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


  // Create simulated payment
  const transactionId =
    `SIM-${Date.now()}`;


  const paymentResult = await pool.query(
    `
    INSERT INTO payments
    (
      user_id,
      gateway,
      amount,
      transaction_id,
      status,
      created_at
    )
    VALUES
    (
      $1,
      'PayPal',
      $2,
      $3,
      'success',
      NOW()
    )
    RETURNING *
    `,
    [
      userId,
      course.price,
      transactionId
    ]
  );

  const payment = paymentResult.rows[0];


  // Create purchase
  const purchaseDate = new Date();

  const expiresAt = new Date(
    purchaseDate
  );

  expiresAt.setDate(
    expiresAt.getDate() + 365
  );


  const purchaseResult = await pool.query(
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
    (
      $1,
      $2,
      $3,
      $4,
      $5,
      'active'
    )
    RETURNING *
    `,
    [
      userId,
      courseId,
      payment.id,
      purchaseDate,
      expiresAt
    ]
  );


  return {
    payment: paymentResult.rows[0],
    purchase: purchaseResult.rows[0]
  };
};