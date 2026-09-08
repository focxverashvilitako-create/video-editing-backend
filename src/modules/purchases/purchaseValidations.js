export const validateCreatePurchase = ({
  userId,
  courseId,
  paymentId
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
    courseId === undefined ||
    courseId === null ||
    courseId === ""
  ) {
    errors.push("Course ID is required");
  } else if (
    !Number.isInteger(Number(courseId)) ||
    Number(courseId) <= 0
  ) {
    errors.push("Course ID must be a valid positive integer");
  }

  if (
    paymentId === undefined ||
    paymentId === null ||
    paymentId === ""
  ) {
    errors.push("Payment ID is required");
  } else if (
    !Number.isInteger(Number(paymentId)) ||
    Number(paymentId) <= 0
  ) {
    errors.push("Payment ID must be a valid positive integer");
  }

  if (errors.length > 0) {
    throw new Error(errors.join(", "));
  }
};


export const validateUserPurchases = ({
  userId
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

  if (errors.length > 0) {
    throw new Error(errors.join(", "));
  }
};


export const validatePurchaseId = ({
  id
}) => {
  const errors = [];

  if (
    id === undefined ||
    id === null ||
    id === ""
  ) {
    errors.push("Purchase ID is required");
  } else if (
    !Number.isInteger(Number(id)) ||
    Number(id) <= 0
  ) {
    errors.push("Purchase ID must be a valid positive integer");
  }

  if (errors.length > 0) {
    throw new Error(errors.join(", "));
  }
};


export const validateCourseAccess = ({
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
    !Number.isInteger(Number(userId)) ||
    Number(userId) <= 0
  ) {
    errors.push("User ID must be a valid positive integer");
  }

  if (
    courseId === undefined ||
    courseId === null ||
    courseId === ""
  ) {
    errors.push("Course ID is required");
  } else if (
    !Number.isInteger(Number(courseId)) ||
    Number(courseId) <= 0
  ) {
    errors.push("Course ID must be a valid positive integer");
  }

  if (errors.length > 0) {
    throw new Error(errors.join(", "));
  }
};