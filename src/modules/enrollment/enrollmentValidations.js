const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const validateEnrollment = ({ userId, groupId }) => {
  const errors = [];

  if (!userId) {
    errors.push("User ID is required");
  } else if (
    typeof userId !== "string" ||
    !UUID_REGEX.test(userId)
  ) {
    errors.push("User ID must be a valid UUID");
  }

  if (!groupId) {
    errors.push("Group ID is required");
  } else if (
    typeof groupId !== "string" ||
    !UUID_REGEX.test(groupId)
  ) {
    errors.push("Group ID must be a valid UUID");
  }

  if (errors.length > 0) {
    throw new Error(errors.join(", "));
  }
};
