export const validateAddMember = ({
  groupId,
  userId
}) => {

  const errors = [];

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


  if (errors.length > 0) {
    throw new Error(errors.join(", "));
  }
};


export const validateLiveGroupMemberId = ({
  id
}) => {

  const errors = [];

  if (
    id === undefined ||
    id === null ||
    id === ""
  ) {
    errors.push("Group member ID is required");
  } else if (
    !Number.isInteger(Number(id)) ||
    Number(id) <= 0
  ) {
    errors.push(
      "Group member ID must be a valid positive integer"
    );
  }


  if (errors.length > 0) {
    throw new Error(errors.join(", "));
  }
};


export const validateGroupId = ({
  groupId
}) => {

  const errors = [];

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
    errors.push(
      "Group ID must be a valid positive integer"
    );
  }


  if (errors.length > 0) {
    throw new Error(errors.join(", "));
  }
};