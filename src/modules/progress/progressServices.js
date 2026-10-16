import pool from "../../config/db.js";

const getLessonDetails = async (lessonId) => {
  const result = await pool.query(
    `
    SELECT
      l.id,
      l.section_id,
      l.sort_order,
      l.is_preview,
      cs.course_id,
      cs.sort_order AS section_sort_order,
      c.type AS course_type
    FROM lessons l
    JOIN course_sections cs
      ON cs.id = l.section_id
    JOIN courses c
      ON c.id = cs.course_id
    WHERE l.id = $1
    `,
    [lessonId]
  );

  return result.rows[0] || null;
};

const hasActiveCoursePurchase = async (userId, courseId) => {
  const result = await pool.query(
    `
    SELECT p.id
    FROM purchases p
    JOIN payments pay
      ON pay.id = p.payment_id
    WHERE p.user_id = $1
      AND p.course_id = $2
      AND p.status = 'active'
      AND p.expires_at > NOW()
      AND pay.status = 'success'
    LIMIT 1
    `,
    [userId, courseId]
  );

  return result.rows.length > 0;
};

export const getLessonProgress = async (userId, lessonId) => {
  const result = await pool.query(
    `
    SELECT *
    FROM course_progress
    WHERE user_id = $1
      AND lesson_id = $2
    LIMIT 1
    `,
    [userId, lessonId]
  );

  return result.rows[0] || null;
};

export const checkLessonAccess = async (userId, lessonId) => {
  const lesson = await getLessonDetails(lessonId);

  if (!lesson) {
    throw new Error("Lesson not found");
  }

  if (lesson.is_preview === true) {
    return true;
  }

  const purchaseIsActive = await hasActiveCoursePurchase(
    userId,
    lesson.course_id
  );

  if (!purchaseIsActive) {
    return false;
  }

  const lessonsResult = await pool.query(
    `
    SELECT
      l.id,
      l.sort_order,
      cs.sort_order AS section_sort_order
    FROM lessons l
    JOIN course_sections cs
      ON cs.id = l.section_id
    WHERE cs.course_id = $1
    ORDER BY
      cs.sort_order ASC,
      l.sort_order ASC,
      l.id ASC
    `,
    [lesson.course_id]
  );

  const lessons = lessonsResult.rows;

  const currentIndex = lessons.findIndex(
    (item) => item.id === lesson.id
  );

  if (currentIndex === -1) {
    throw new Error("Lesson not found in course");
  }

  if (currentIndex === 0) {
    return true;
  }

  const previousLesson = lessons[currentIndex - 1];

  const progressResult = await pool.query(
    `
    SELECT completed
    FROM course_progress
    WHERE user_id = $1
      AND lesson_id = $2
    LIMIT 1
    `,
    [userId, previousLesson.id]
  );

  return progressResult.rows[0]?.completed === true;
};

export const updateLessonProgress = async (
  userId,
  lessonId,
  lastPosition,
  watchedPercent
) => {
  const lesson = await getLessonDetails(lessonId);

  if (!lesson) {
    throw new Error("Lesson not found");
  }

  const hasAccess = await checkLessonAccess(userId, lessonId);

  if (!hasAccess) {
    throw new Error("You do not have access to this lesson");
  }

  const completed = watchedPercent >= 100;

  const result = await pool.query(
    `
    INSERT INTO course_progress (
      user_id,
      lesson_id,
      last_position,
      watched_percent,
      completed
    )
    VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT (user_id, lesson_id)
    DO UPDATE SET
      last_position = EXCLUDED.last_position,
      watched_percent = EXCLUDED.watched_percent,
      completed = EXCLUDED.completed
    RETURNING *
    `,
    [
      userId,
      lessonId,
      lastPosition,
      watchedPercent,
      completed
    ]
  );

  return result.rows[0];
};
