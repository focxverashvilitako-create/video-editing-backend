
const isValidUUID = (value) => {
  return (
    typeof value === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
  );
};

const validateSectionId = (section_id, errors) => {
  if (
    section_id === undefined ||
    section_id === null ||
    section_id === ""
  ) {
    errors.push("Section ID is required");
  } else if (!isValidUUID(section_id)) {
    errors.push("Section ID must be a valid UUID");
  }
};

const validateProvider = (provider, errors) => {
  if (
    provider !== undefined &&
    provider !== null &&
    !["vimeo", "aws"].includes(provider)
  ) {
    errors.push("Provider must be either vimeo or aws");
  }
};

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

  validateSectionId(section_id, errors);

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
    duration !== undefined &&
    duration !== null &&
    (
      !Number.isInteger(Number(duration)) ||
      Number(duration) < 0
    )
  ) {
    errors.push("Duration must be a non-negative integer");
  }

  validateProvider(provider, errors);

  if (
    is_preview !== undefined &&
    is_preview !== null &&
    typeof is_preview !== "boolean"
  ) {
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
    if (!isValidUUID(section_id)) {
      errors.push("Section ID must be a valid UUID");
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

  if (
    duration !== undefined &&
    duration !== null &&
    (
      !Number.isInteger(Number(duration)) ||
      Number(duration) < 0
    )
  ) {
    errors.push("Duration must be a non-negative integer");
  }

  validateProvider(provider, errors);

  if (
    is_preview !== undefined &&
    is_preview !== null &&
    typeof is_preview !== "boolean"
  ) {
    errors.push("is_preview must be a boolean");
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
