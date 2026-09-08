export const validateEnrollment = ({
  userId,
  groupId
}) => {
  const errors = [];

  if (
    userId === undefined ||
    userId === null ||
    userId === ""
  ) {
    errors.push("User ID is required");
  } else if (
    !Number.isInteger(Number(userId)) ||
    Number(userId) <= 0
  ) {
    errors.push("User ID must be a valid positive integer");
  }

  if (
    groupId === undefined ||
    groupId === null ||
    groupId === ""
  ) {
    errors.push("Group ID is required");
  } else if (
    !Number.isInteger(Number(groupId)) ||
    Number(groupId) <= 0
  ) {
    errors.push("Group ID must be a valid positive integer");
  }

  if (errors.length > 0) {
    throw new Error(errors.join(", "));
  }
};