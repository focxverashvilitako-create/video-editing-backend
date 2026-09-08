export const validateCreateLessonResource = ({
  lesson_id,
  title,
  file_url
}) => {
  const errors = [];

  if (
    lesson_id === undefined ||
    lesson_id === null ||
    lesson_id === ""
  ) {
    errors.push("Lesson ID is required");
  } else if (
    !Number.isInteger(Number(lesson_id)) ||
    Number(lesson_id) <= 0
  ) {
    errors.push("Lesson ID must be a valid positive integer");
  }

  if (
    !title ||
    typeof title !== "string" ||
    title.trim().length < 2
  ) {
    errors.push("Title must contain at least 2 characters");
  }

  if (
    file_url !== undefined &&
    file_url !== null &&
    typeof file_url !== "string"
  ) {
    errors.push("File URL must be a string");
  }

  if (errors.length > 0) {
    throw new Error(errors.join(", "));
  }
};


export const validateUpdateLessonResource = ({
  lesson_id,
  title,
  file_url
}) => {
  const errors = [];

  if (lesson_id !== undefined) {
    if (
      !Number.isInteger(Number(lesson_id)) ||
      Number(lesson_id) <= 0
    ) {
      errors.push("Lesson ID must be a valid positive integer");
    }
  }

  if (title !== undefined) {
    if (
      typeof title !== "string" ||
      title.trim().length < 2
    ) {
      errors.push("Title must contain at least 2 characters");
    }
  }

  if (
    file_url !== undefined &&
    file_url !== null &&
    typeof file_url !== "string"
  ) {
    errors.push("File URL must be a string");
  }

  const hasNoFields =
    lesson_id === undefined &&
    title === undefined &&
    file_url === undefined;

  if (hasNoFields) {
    errors.push("At least one field is required");
  }

  if (errors.length > 0) {
    throw new Error(errors.join(", "));
  }
};