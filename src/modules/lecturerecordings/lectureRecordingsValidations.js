const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const isValidUUID = (value) =>
  typeof value === "string" && UUID_REGEX.test(value);

const isValidDate = (value) => {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00Z`);

  return (
    !Number.isNaN(date.getTime()) &&
    date.toISOString().slice(0, 10) === value
  );
};

export const validateCreateLectureRecording = ({
  group_id,
  title,
  video_url,
  lesson_date
}) => {
  const errors = [];

  if (!isValidUUID(group_id)) {
    errors.push("Group ID must be a valid UUID");
  }

  if (typeof title !== "string" || title.trim().length < 2) {
    errors.push("Title must contain at least 2 characters");
  }

  if (
    video_url !== undefined &&
    video_url !== null &&
    typeof video_url !== "string"
  ) {
    errors.push("Video URL must be a string");
  }

  if (
    lesson_date !== undefined &&
    lesson_date !== null &&
    !isValidDate(lesson_date)
  ) {
    errors.push("Lesson date must be a valid date in YYYY-MM-DD format");
  }

  if (errors.length > 0) {
    throw new Error(errors.join(", "));
  }
};

export const validateUpdateLectureRecording = ({
  group_id,
  title,
  video_url,
  lesson_date
}) => {
  const errors = [];

  if (group_id !== undefined && !isValidUUID(group_id)) {
    errors.push("Group ID must be a valid UUID");
  }

  if (
    title !== undefined &&
    (typeof title !== "string" || title.trim().length < 2)
  ) {
    errors.push("Title must contain at least 2 characters");
  }

  if (
    video_url !== undefined &&
    video_url !== null &&
    typeof video_url !== "string"
  ) {
    errors.push("Video URL must be a string");
  }

  if (
    lesson_date !== undefined &&
    lesson_date !== null &&
    !isValidDate(lesson_date)
  ) {
    errors.push("Lesson date must be a valid date in YYYY-MM-DD format");
  }

  const hasNoFields =
    group_id === undefined &&
    title === undefined &&
    video_url === undefined &&
    lesson_date === undefined;

  if (hasNoFields) {
    errors.push("At least one field is required");
  }

  if (errors.length > 0) {
    throw new Error(errors.join(", "));
  }
};