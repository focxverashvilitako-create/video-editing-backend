export const validateCreateLesson = ({
  section_id,
  title,
  description,
  video_url,
  duration,
  provider,
  is_preview,
  sort_order
}) => {
  const errors = [];

  if (
    section_id === undefined ||
    section_id === null ||
    section_id === ""
  ) {
    errors.push("Section ID is required");
  } else if (
    !Number.isInteger(Number(section_id)) ||
    Number(section_id) <= 0
  ) {
    errors.push("Section ID must be a valid positive integer");
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
    video_url !== undefined &&
    video_url !== null &&
    typeof video_url !== "string"
  ) {
    errors.push("Video URL must be a string");
  }

  if (
    duration === undefined ||
    duration === null
  ) {
    errors.push("Duration is required");
  } else if (
    !Number.isInteger(Number(duration)) ||
    Number(duration) < 0
  ) {
    errors.push("Duration must be a non-negative integer");
  }

  if (
    provider !== undefined &&
    provider !== null &&
    typeof provider !== "string"
  ) {
    errors.push("Provider must be a string");
  }

  if (
    is_preview === undefined ||
    is_preview === null
  ) {
    errors.push("is_preview is required");
  } else if (typeof is_preview !== "boolean") {
    errors.push("is_preview must be a boolean");
  }

  if (
    sort_order === undefined ||
    sort_order === null
  ) {
    errors.push("Sort order is required");
  } else if (
    !Number.isInteger(Number(sort_order)) ||
    Number(sort_order) < 0
  ) {
    errors.push("Sort order must be a non-negative integer");
  }

  if (errors.length > 0) {
    throw new Error(errors.join(", "));
  }
};


export const validateUpdateLesson = ({
  section_id,
  title,
  description,
  video_url,
  duration,
  provider,
  is_preview,
  sort_order
}) => {
  const errors = [];

  if (section_id !== undefined) {
    if (
      !Number.isInteger(Number(section_id)) ||
      Number(section_id) <= 0
    ) {
      errors.push("Section ID must be a valid positive integer");
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

  if (
    video_url !== undefined &&
    video_url !== null &&
    typeof video_url !== "string"
  ) {
    errors.push("Video URL must be a string");
  }

  if (duration !== undefined) {
    if (
      !Number.isInteger(Number(duration)) ||
      Number(duration) < 0
    ) {
      errors.push("Duration must be a non-negative integer");
    }
  }

  if (
    provider !== undefined &&
    provider !== null &&
    typeof provider !== "string"
  ) {
    errors.push("Provider must be a string");
  }

  if (is_preview !== undefined) {
    if (typeof is_preview !== "boolean") {
      errors.push("is_preview must be a boolean");
    }
  }

  if (sort_order !== undefined) {
    if (
      !Number.isInteger(Number(sort_order)) ||
      Number(sort_order) < 0
    ) {
      errors.push("Sort order must be a non-negative integer");
    }
  }

  const hasNoFields =
    section_id === undefined &&
    title === undefined &&
    description === undefined &&
    video_url === undefined &&
    duration === undefined &&
    provider === undefined &&
    is_preview === undefined &&
    sort_order === undefined;

  if (hasNoFields) {
    errors.push("At least one field is required");
  }

  if (errors.length > 0) {
    throw new Error(errors.join(", "));
  }
};