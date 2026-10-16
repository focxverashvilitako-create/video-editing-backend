
const uuidRegex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const validateUuid = (value, fieldName, errors) => {
  if (
    value === undefined ||
    value === null ||
    value === ""
  ) {
    errors.push(`${fieldName} is required`);
  } else if (
    typeof value !== "string" ||
    !uuidRegex.test(value)
  ) {
    errors.push(`${fieldName} must be a valid UUID`);
  }
};

export const validateLessonProgressParams = ({
  userId,
  lessonId
}) => {
  const errors = [];

  validateUuid(userId, "User ID", errors);
  validateUuid(lessonId, "Lesson ID", errors);

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

  validateUuid(userId, "User ID", errors);
  validateUuid(lessonId, "Lesson ID", errors);

  if (
    lastPosition === undefined ||
    lastPosition === null
  ) {
    errors.push("Last position is required");
  } else if (
    !Number.isInteger(lastPosition) ||
    lastPosition < 0
  ) {
    errors.push("Last position must be a non-negative integer");
  }

  if (
    watchedPercent === undefined ||
    watchedPercent === null
  ) {
    errors.push("Watched percent is required");
  } else if (
    typeof watchedPercent !== "number" ||
    !Number.isFinite(watchedPercent) ||
    watchedPercent < 0 ||
    watchedPercent > 100
  ) {
    errors.push("Watched percent must be a number between 0 and 100");
  }

  if (errors.length > 0) {
    throw new Error(errors.join(", "));
  }
};
