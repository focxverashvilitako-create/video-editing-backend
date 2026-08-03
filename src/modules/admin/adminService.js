import pool from "../../config/db.js";


// სტუდენტების ზრდა ამ თვეში %
const getStudentGrowth = async () => {

  const result = await pool.query(
    `
    SELECT

    (
      SELECT COUNT(*)
      FROM users
      WHERE role='student'
      AND created_at >= date_trunc('month', CURRENT_DATE)
    ) AS current_month,


    (
      SELECT COUNT(*)
      FROM users
      WHERE role='student'
      AND created_at >= date_trunc(
        'month',
        CURRENT_DATE - INTERVAL '1 month'
      )
      AND created_at < date_trunc(
        'month',
        CURRENT_DATE
      )
    ) AS previous_month

    `
  );


  const current = Number(
    result.rows[0].current_month
  );


  const previous = Number(
    result.rows[0].previous_month
  );


  if(previous === 0){
    return 0;
  }


  return Math.round(
    ((current - previous) / previous) * 100
  );

};





export const getAdminDashboardData = async () => {


  // სულ სტუდენტები

  const totalStudents = await pool.query(
    `
    SELECT COUNT(*)::int AS count
    FROM users
    WHERE role='student'
    `
  );



  // სტუდენტების ზრდა

  const studentGrowth = await getStudentGrowth();




  // კურსების სტატისტიკა

  const CourseStats = await pool.query(
    `
    SELECT 
      COUNT(*)::int AS total,
      COUNT(
        CASE 
          WHEN is_active = true 
          THEN 1 
        END
      )::int AS active

    FROM courses
    `
  );




  // ყველა live ჯგუფი

  const currentGroups = await pool.query(
    `
    SELECT COUNT(*)::int AS count
    FROM live_groups
    `
  );




  // ამ მომენტში მიმდინარე ჯგუფები

  const nowGroups = await pool.query(
    `
    SELECT COUNT(*)::int AS count
    FROM live_groups
    WHERE status='active'
    AND start_time <= NOW()
    AND end_time >= NOW()
    `
  );




  // ამ თვის შემოსავალი

  const monthlyRevenue = await pool.query(
    `
    SELECT 
      COALESCE(SUM(amount),0) AS revenue

    FROM payments

    WHERE status='success'
    AND created_at >= date_trunc(
      'month',
      CURRENT_DATE
    )
    `
  );





  // ბოლო დამატებული მომხმარებლები

  const addedUsers = await pool.query(
    `
    SELECT

      users.id,

      users.first_name || ' ' || users.last_name 
      AS name,

      users.email,

      courses.title 
      AS course,

      purchases.status


    FROM users


    LEFT JOIN purchases
    ON users.id = purchases.user_id


    LEFT JOIN courses
    ON purchases.course_id = courses.id


    WHERE users.role='student'


    ORDER BY users.created_at DESC


    LIMIT 5

    `
  );





  return {

    totalStudents:
      totalStudents.rows[0].count,


    studentGrowth,


    totalCourses:
      CourseStats.rows[0].total,


    activeCourses:
      CourseStats.rows[0].active,


    currentGroups:
      currentGroups.rows[0].count,


    nowGroups:
      nowGroups.rows[0].count,


    monthlyRevenue:
      monthlyRevenue.rows[0].revenue || 0,


    addedUsers:
      addedUsers.rows

  };


};