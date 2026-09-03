import pool from "../../config/db.js";


// GET LESSON PROGRESS
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


// UPDATE LESSON PROGRESS
export const updateLessonProgress = async (
  userId,
  lessonId,
  lastPosition,
  watchedPercent
) => {

  const completed = watchedPercent >= 100;

  const result = await pool.query(
    `
    INSERT INTO course_progress
    (
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

export const checkLessonAccess = async (userId, lessonId) => {

  const lessonResult = await pool.query(
    `
    SELECT section_id, sort_order
    FROM lessons
    WHERE id = $1
    `,
    [lessonId]
  );

  const lesson = lessonResult.rows[0];

  if (!lesson) {
    return false;
  }

  // First lesson is always unlocked
  if (lesson.sort_order === 1) {
    return true;
  }

  // Find previous lesson
  const previousLessonResult = await pool.query(
    `
    SELECT id
    FROM lessons
    WHERE section_id = $1
      AND sort_order = $2
    `,
    [
      lesson.section_id,
      lesson.sort_order - 1
    ]
  );

  const previousLesson = previousLessonResult.rows[0];

  if (!previousLesson) {
    return false;
  }

  // Check if previous lesson is completed
  const progressResult = await pool.query(
    `
    SELECT completed
    FROM course_progress
    WHERE user_id = $1
      AND lesson_id = $2
    `,
    [
      userId,
      previousLesson.id
    ]
  );

  return progressResult.rows[0]?.completed === true;
};