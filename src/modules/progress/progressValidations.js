export const validateLessonProgressParams = ({
  userId,
  lessonId
}) => {
  const errors = [];

  if (
    userId === undefined ||
    userId === null ||
    userId === ""
  ) {
    errors.push("User ID is required");
  } else if (
    !Number.isInteger(Number(userId)) ||
    Number(userId) <= 0
  ) {
    errors.push("User ID must be a valid positive integer");
  }

  if (
    lessonId === undefined ||
    lessonId === null ||
    lessonId === ""
  ) {
    errors.push("Lesson ID is required");
  } else if (
    !Number.isInteger(Number(lessonId)) ||
    Number(lessonId) <= 0
  ) {
    errors.push("Lesson ID must be a valid positive integer");
  }

  if (errors.length > 0) {
    throw new Error(errors.join(", "));
  }
};


export const validateUpdateLessonProgress = ({
  userId,
  lessonId,
  lastPosition,
  watchedPercent
}) => {
  const errors = [];

  if (
    userId === undefined ||
    userId === null ||
    userId === ""
  ) {
    errors.push("User ID is required");
  } else if (
    !Number.isInteger(Number(userId)) ||
    Number(userId) <= 0
  ) {
    errors.push("User ID must be a valid positive integer");
  }

  if (
    lessonId === undefined ||
    lessonId === null ||
    lessonId === ""
  ) {
    errors.push("Lesson ID is required");
  } else if (
    !Number.isInteger(Number(lessonId)) ||
    Number(lessonId) <= 0
  ) {
    errors.push("Lesson ID must be a valid positive integer");
  }

  if (
    lastPosition === undefined ||
    lastPosition === null
  ) {
    errors.push("Last position is required");
  } else if (
    typeof lastPosition !== "number" ||
    !Number.isFinite(lastPosition)
  ) {
    errors.push("Last position must be a valid number");
  } else if (
    lastPosition < 0
  ) {
    errors.push("Last position cannot be negative");
  }

  if (
    watchedPercent === undefined ||
    watchedPercent === null
  ) {
    errors.push("Watched percent is required");
  } else if (
    typeof watchedPercent !== "number" ||
    !Number.isFinite(watchedPercent)
  ) {
    errors.push("Watched percent must be a valid number");
  } else if (
    watchedPercent < 0 ||
    watchedPercent > 100
  ) {
    errors.push("Watched percent must be between 0 and 100");
  }

  if (errors.length > 0) {
    throw new Error(errors.join(", "));
  }
};