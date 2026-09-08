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
    max_students === undefined ||
    max_students === null
  ) {
    errors.push("Max students is required");
  } else if (
    !Number.isInteger(Number(max_students)) ||
    Number(max_students) <= 0
  ) {
    errors.push("Max students must be a valid positive integer");
  }


  if (
    start_date === undefined ||
    start_date === null ||
    start_date === ""
  ) {
    errors.push("Start date is required");
  } else if (
    Number.isNaN(Date.parse(start_date))
  ) {
    errors.push("Start date must be a valid date");
  }


  if (
    schedule === undefined ||
    schedule === null
  ) {
    errors.push("Schedule is required");
  } else if (
    typeof schedule !== "object" ||
    Array.isArray(schedule)
  ) {
    errors.push("Schedule must be an object");
  }


  if (
    location !== undefined &&
    location !== null &&
    typeof location !== "string"
  ) {
    errors.push("Location must be a string");
  }


  if (
    status === undefined ||
    status === null ||
    status === ""
  ) {
    errors.push("Status is required");
  } else if (
    typeof status !== "string"
  ) {
    errors.push("Status must be a string");
  }


  if (
    start_time !== undefined &&
    start_time !== null &&
    typeof start_time !== "string"
  ) {
    errors.push("Start time must be a string");
  }


  if (
    end_time !== undefined &&
    end_time !== null &&
    typeof end_time !== "string"
  ) {
    errors.push("End time must be a string");
  }


  if (errors.length > 0) {
    throw new Error(errors.join(", "));
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


  if (max_students !== undefined) {
    if (
      !Number.isInteger(Number(max_students)) ||
      Number(max_students) <= 0
    ) {
      errors.push("Max students must be a valid positive integer");
    }
  }


  if (start_date !== undefined) {
    if (
      start_date === null ||
      Number.isNaN(Date.parse(start_date))
    ) {
      errors.push("Start date must be a valid date");
    }
  }


  if (schedule !== undefined) {
    if (
      schedule === null ||
      typeof schedule !== "object" ||
      Array.isArray(schedule)
    ) {
      errors.push("Schedule must be an object");
    }
  }


  if (
    location !== undefined &&
    location !== null &&
    typeof location !== "string"
  ) {
    errors.push("Location must be a string");
  }


  if (status !== undefined) {
    if (
      status === null ||
      typeof status !== "string" ||
      status.trim().length === 0
    ) {
      errors.push("Status must be a non-empty string");
    }
  }


  if (
    start_time !== undefined &&
    start_time !== null &&
    typeof start_time !== "string"
  ) {
    errors.push("Start time must be a string");
  }


  if (
    end_time !== undefined &&
    end_time !== null &&
    typeof end_time !== "string"
  ) {
    errors.push("End time must be a string");
  }


  const hasNoFields =
    course_id === undefined &&
    title === undefined &&
    max_students === undefined &&
    start_date === undefined &&
    schedule === undefined &&
    location === undefined &&
    status === undefined &&
    start_time === undefined &&
    end_time === undefined;


  if (hasNoFields) {
    errors.push("At least one field is required");
  }


  if (errors.length > 0) {
    throw new Error(errors.join(", "));
  }
};


export const validateLiveGroupId = ({
  id
}) => {

  const errors = [];


  if (
    id === undefined ||
    id === null ||
    id === ""
  ) {
    errors.push("Live group ID is required");
  } else if (
    !Number.isInteger(Number(id)) ||
    Number(id) <= 0
  ) {
    errors.push("Live group ID must be a valid positive integer");
  }


  if (errors.length > 0) {
    throw new Error(errors.join(", "));
  }
};