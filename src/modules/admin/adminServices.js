
import pool from "../../config/db.js";

export const getStudentGrowth = async () => {
  const result = await pool.query(
    `
    SELECT
      (
        SELECT COUNT(*)
        FROM users
        WHERE role = 'student'
          AND created_at >= date_trunc('month', CURRENT_DATE)
      ) AS current_month,

      (
        SELECT COUNT(*)
        FROM users
        WHERE role = 'student'
          AND created_at >= date_trunc(
            'month',
            CURRENT_DATE - INTERVAL '1 month'
          )
          AND created_at < date_trunc('month', CURRENT_DATE)
      ) AS previous_month
    `
  );

  const current = Number(result.rows[0].current_month);
  const previous = Number(result.rows[0].previous_month);

  if (previous === 0) {
    return 0;
  }

  return Math.round(
    ((current - previous) / previous) * 100
  );
};

export const getAdminDashboardData = async () => {
  const totalStudents = await pool.query(
    `
    SELECT COUNT(*)::int AS count
    FROM users
    WHERE role = 'student'
    `
  );

  const studentGrowth = await getStudentGrowth();

  const courseStats = await pool.query(
    `
    SELECT
      COUNT(*)::int AS total,
      COUNT(
        CASE
          WHEN is_active = true THEN 1
        END
      )::int AS active
    FROM courses
    `
  );

  const currentGroups = await pool.query(
    `
    SELECT COUNT(*)::int AS count
    FROM live_groups
    `
  );

  const nowGroups = await pool.query(
    `
    SELECT COUNT(*)::int AS count
    FROM live_groups
    WHERE status = 'active'
      AND start_time <= NOW()
      AND end_time >= NOW()
    `
  );

  const monthlyRevenue = await pool.query(
    `
    SELECT COALESCE(SUM(amount), 0) AS revenue
    FROM payments
    WHERE status = 'success'
      AND created_at >= date_trunc('month', CURRENT_DATE)
    `
  );

  const addedUsers = await pool.query(
    `
    SELECT
      users.id,
      users.first_name || ' ' || users.last_name AS name,
      users.email,
      courses.title AS course,
      latest_purchase.status
    FROM users

    LEFT JOIN LATERAL (
      SELECT
        purchases.course_id,
        purchases.status
      FROM purchases
      WHERE purchases.user_id = users.id
      ORDER BY purchases.purchase_date DESC, purchases.id DESC
      LIMIT 1
    ) AS latest_purchase ON TRUE

    LEFT JOIN courses
      ON latest_purchase.course_id = courses.id

    WHERE users.role = 'student'
    ORDER BY users.created_at DESC, users.id DESC
    LIMIT 5
    `
  );

  return {
    totalStudents: totalStudents.rows[0].count,
    studentGrowth,
    totalCourses: courseStats.rows[0].total,
    activeCourses: courseStats.rows[0].active,
    currentGroups: currentGroups.rows[0].count,
    nowGroups: nowGroups.rows[0].count,
    monthlyRevenue: monthlyRevenue.rows[0].revenue || 0,
    addedUsers: addedUsers.rows
  };
};
