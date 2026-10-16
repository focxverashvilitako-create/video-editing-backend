const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const isValidUUID = (value) =>
  typeof value === "string" && UUID_REGEX.test(value);

const isValidDate = (value) =>
  typeof value === "string" &&
  /^\d{4}-\d{2}-\d{2}$/.test(value) &&
  !Number.isNaN(Date.parse(`${value}T00:00:00Z`)) &&
  new Date(`${value}T00:00:00Z`).toISOString().slice(0, 10) === value;

const isValidDateTime = (value) =>
  typeof value === "string" &&
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d{1,6})?)?$/.test(value) &&
  !Number.isNaN(Date.parse(value));

export const validateCreateLiveGroup = ({
  course_id,
  title,
  max_students,
  start_date,
  schedule,
  location,
  status,
  start_time,
  end_time
}) => {
  if (!isValidUUID(course_id)) {
    throw new Error("A valid course_id UUID is required");
  }

  if (typeof title !== "string" || title.trim().length < 2) {
    throw new Error("Title must contain at least 2 characters");
  }

  if (
    !Number.isInteger(max_students) ||
    max_students <= 0
  ) {
    throw new Error("max_students must be a positive integer");
  }

  if (!isValidDate(start_date)) {
    throw new Error("start_date must be a valid date in YYYY-MM-DD format");
  }

  if (
    !schedule ||
    typeof schedule !== "object" ||
    Array.isArray(schedule)
  ) {
    throw new Error("schedule must be a valid object");
  }

  if (
    location !== undefined &&
    location !== null &&
    typeof location !== "string"
  ) {
    throw new Error("location must be a string");
  }

  if (typeof status !== "string" || !status.trim()) {
    throw new Error("status is required");
  }

  if (
    start_time !== undefined &&
    start_time !== null &&
    !isValidDateTime(start_time)
  ) {
    throw new Error(
      "start_time must be a datetime in YYYY-MM-DDTHH:mm:ss format"
    );
  }

  if (
    end_time !== undefined &&
    end_time !== null &&
    !isValidDateTime(end_time)
  ) {
    throw new Error(
      "end_time must be a datetime in YYYY-MM-DDTHH:mm:ss format"
    );
  }

  if (start_time && end_time && Date.parse(end_time) <= Date.parse(start_time)) {
    throw new Error("end_time must be later than start_time");
  }
};

export const validateUpdateLiveGroup = ({
  course_id,
  title,
  max_students,
  start_date,
  schedule,
  location,
  status,
  start_time,
  end_time
}) => {
  const hasField = [
    course_id,
    title,
    max_students,
    start_date,
    schedule,
    location,
    status,
    start_time,
    end_time
  ].some((value) => value !== undefined);

  if (!hasField) {
    throw new Error("At least one field is required for update");
  }

  if (course_id !== undefined && !isValidUUID(course_id)) {
    throw new Error("course_id must be a valid UUID");
  }

  if (
    title !== undefined &&
    (typeof title !== "string" || title.trim().length < 2)
  ) {
    throw new Error("Title must contain at least 2 characters");
  }

  if (
    max_students !== undefined &&
    (!Number.isInteger(max_students) || max_students <= 0)
  ) {
    throw new Error("max_students must be a positive integer");
  }

  if (start_date !== undefined && !isValidDate(start_date)) {
    throw new Error("start_date must be a valid date in YYYY-MM-DD format");
  }

  if (
    schedule !== undefined &&
    (!schedule || typeof schedule !== "object" || Array.isArray(schedule))
  ) {
    throw new Error("schedule must be a valid object");
  }

  if (
    location !== undefined &&
    location !== null &&
    typeof location !== "string"
  ) {
    throw new Error("location must be a string");
  }

  if (
    status !== undefined &&
    (typeof status !== "string" || !status.trim())
  ) {
    throw new Error("status must be a non-empty string");
  }

  if (
    start_time !== undefined &&
    start_time !== null &&
    !isValidDateTime(start_time)
  ) {
    throw new Error(
      "start_time must be a datetime in YYYY-MM-DDTHH:mm:ss format"
    );
  }

  if (
    end_time !== undefined &&
    end_time !== null &&
    !isValidDateTime(end_time)
  ) {
    throw new Error(
      "end_time must be a datetime in YYYY-MM-DDTHH:mm:ss format"
    );
  }

  if (
    start_time &&
    end_time &&
    Date.parse(end_time) <= Date.parse(start_time)
  ) {
    throw new Error("end_time must be later than start_time");
  }
};

export const validateLiveGroupId = ({ id }) => {
  if (!isValidUUID(id)) {
    throw new Error("id must be a valid UUID");
  }
};