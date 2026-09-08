export const validateCreateSyllabus = ({
  course_id,
  title,
  description,
  sort_order
}) => {
  const errors = [];

  if (
    course_id === undefined ||
    course_id === null ||
    course_id === ""
  ) {
    errors.push("Course ID is required");
  } else if (
    !Number.isInteger(Number(course_id)) ||
    Number(course_id) <= 0
  ) {
    errors.push("Course ID must be a valid positive integer");
  }

  if (
    !title ||
    typeof title !== "string" ||
    title.trim().length < 2
  ) {
    errors.push("Title must contain at least 2 characters");
  }

  if (
    description !== undefined &&
    description !== null &&
    typeof description !== "string"
  ) {
    errors.push("Description must be a string");
  }

  if (
    sort_order === undefined ||
    sort_order === null ||
    !Number.isInteger(Number(sort_order)) ||
    Number(sort_order) < 0
  ) {
    errors.push("Sort order must be a valid non-negative integer");
  }

  if (errors.length > 0) {
    throw new Error(errors.join(", "));
  }
};


export const validateUpdateSyllabus = ({
  course_id,
  title,
  description,
  sort_order
}) => {
  const errors = [];

  if (course_id !== undefined) {
    if (
      !Number.isInteger(Number(course_id)) ||
      Number(course_id) <= 0
    ) {
      errors.push("Course ID must be a valid positive integer");
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
    description !== undefined &&
    description !== null &&
    typeof description !== "string"
  ) {
    errors.push("Description must be a string");
  }

  if (sort_order !== undefined) {
    if (
      !Number.isInteger(Number(sort_order)) ||
      Number(sort_order) < 0
    ) {
      errors.push("Sort order must be a valid non-negative integer");
    }
  }

  const hasNoFields =
    course_id === undefined &&
    title === undefined &&
    description === undefined &&
    sort_order === undefined;

  if (hasNoFields) {
    errors.push("At least one field is required");
  }

  if (errors.length > 0) {
    throw new Error(errors.join(", "));
  }
};