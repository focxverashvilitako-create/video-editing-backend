export const validateSimulatePayment = ({
  userId,
  courseId
}) => {
  const errors = [];

  if (
    userId === undefined ||
    userId === null ||
    userId === ""
  ) {
    errors.push("User ID is required");
  } else if (
    typeof userId !== "string" ||
    userId.trim().length === 0
  ) {
    errors.push("User ID must be a valid UUID");
  }

  if (
    courseId === undefined ||
    courseId === null ||
    courseId === ""
  ) {
    errors.push("Course ID is required");
  } else if (
    typeof courseId !== "string" ||
    courseId.trim().length === 0
  ) {
    errors.push("Course ID must be a valid UUID");
  }

  if (errors.length > 0) {
    throw new Error(errors.join(", "));
  }
};