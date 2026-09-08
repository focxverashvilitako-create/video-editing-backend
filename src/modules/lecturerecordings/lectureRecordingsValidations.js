export const validateCreateLectureRecording = ({
  group_id,
  title,
  video_url,
  lesson_date
}) => {
  const errors = [];

  if (
    group_id === undefined ||
    group_id === null ||
    group_id === ""
  ) {
    errors.push("Group ID is required");
  } else if (
    !Number.isInteger(Number(group_id)) ||
    Number(group_id) <= 0
  ) {
    errors.push("Group ID must be a valid positive integer");
  }

  if (
    !title ||
    typeof title !== "string" ||
    title.trim().length < 2
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
    Number.isNaN(Date.parse(lesson_date))
  ) {
    errors.push("Lesson date must be a valid date");
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

  if (group_id !== undefined) {
    if (
      !Number.isInteger(Number(group_id)) ||
      Number(group_id) <= 0
    ) {
      errors.push("Group ID must be a valid positive integer");
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
    video_url !== undefined &&
    video_url !== null &&
    typeof video_url !== "string"
  ) {
    errors.push("Video URL must be a string");
  }

  if (
    lesson_date !== undefined &&
    lesson_date !== null &&
    Number.isNaN(Date.parse(lesson_date))
  ) {
    errors.push("Lesson date must be a valid date");
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