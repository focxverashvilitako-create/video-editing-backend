
const isValidUUID = (value) => {
  return (
    typeof value === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
  );
};

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
  } else if (!isValidUUID(lesson_id)) {
    errors.push("Lesson ID must be a valid UUID");
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
    if (!isValidUUID(lesson_id)) {
      errors.push("Lesson ID must be a valid UUID");
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
