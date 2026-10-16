const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const isValidSortOrder = (value) =>
  Number.isInteger(value) && value >= 0;

export const validateCreateCourseSection = ({
  course_id,
  title,
  sort_order
}) => {
  const errors = [];

  if (typeof course_id !== "string" || !UUID_REGEX.test(course_id)) {
    errors.push("Course ID must be a valid UUID");
  }

  if (typeof title !== "string" || title.trim().length < 2) {
    errors.push("Title must contain at least 2 characters");
  }

  if (!isValidSortOrder(sort_order)) {
    errors.push("Sort order must be a non-negative integer");
  }

  if (errors.length > 0) {
    throw new Error(errors.join(", "));
  }
};

export const validateUpdateCourseSection = ({
  course_id,
  title,
  sort_order
}) => {
  const errors = [];

  if (course_id !== undefined) {
    if (typeof course_id !== "string" || !UUID_REGEX.test(course_id)) {
      errors.push("Course ID must be a valid UUID");
    }
  }

  if (title !== undefined) {
    if (typeof title !== "string" || title.trim().length < 2) {
      errors.push("Title must contain at least 2 characters");
    }
  }

  if (sort_order !== undefined) {
    if (!isValidSortOrder(sort_order)) {
      errors.push("Sort order must be a non-negative integer");
    }
  }

  const hasNoFields =
    course_id === undefined &&
    title === undefined &&
    sort_order === undefined;

  if (hasNoFields) {
    errors.push("At least one field is required");
  }

  if (errors.length > 0) {
    throw new Error(errors.join(", "));
  }
};

export const validateCourseSectionId = (id) => {
  if (typeof id !== "string" || !UUID_REGEX.test(id)) {
    throw new Error("Course section ID must be a valid UUID");
  }
};