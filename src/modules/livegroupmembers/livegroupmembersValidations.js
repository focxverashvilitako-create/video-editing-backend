const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const isValidUUID = (value) =>
  typeof value === "string" && UUID_REGEX.test(value);

export const validateAddMember = ({ groupId, userId }) => {
  const errors = [];

  if (!groupId) {
    errors.push("Group ID is required");
  } else if (!isValidUUID(groupId)) {
    errors.push("Group ID must be a valid UUID");
  }

  if (!userId) {
    errors.push("User ID is required");
  } else if (!isValidUUID(userId)) {
    errors.push("User ID must be a valid UUID");
  }

  if (errors.length > 0) {
    throw new Error(errors.join(", "));
  }
};

export const validateLiveGroupMemberId = ({ id }) => {
  if (!id) {
    throw new Error("Group member ID is required");
  }

  if (!isValidUUID(id)) {
    throw new Error("Group member ID must be a valid UUID");
  }
};

export const validateGroupId = ({ groupId }) => {
  if (!groupId) {
    throw new Error("Group ID is required");
  }

  if (!isValidUUID(groupId)) {
    throw new Error("Group ID must be a valid UUID");
  }
};