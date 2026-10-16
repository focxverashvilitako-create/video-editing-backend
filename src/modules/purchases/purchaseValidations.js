const uuidRegex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;


// CREATE PURCHASE
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
    typeof userId !== "string" ||
    !uuidRegex.test(userId)
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
    !uuidRegex.test(courseId)
  ) {
    errors.push("Course ID must be a valid UUID");
  }

  if (
    paymentId === undefined ||
    paymentId === null ||
    paymentId === ""
  ) {
    errors.push("Payment ID is required");
  } else if (
    typeof paymentId !== "string" ||
    !uuidRegex.test(paymentId)
  ) {
    errors.push("Payment ID must be a valid UUID");
  }

  if (errors.length > 0) {
    throw new Error(errors.join(", "));
  }
};


// GET USER PURCHASES
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
    typeof userId !== "string" ||
    !uuidRegex.test(userId)
  ) {
    errors.push("User ID must be a valid UUID");
  }

  if (errors.length > 0) {
    throw new Error(errors.join(", "));
  }
};


// GET PURCHASE BY ID
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
    typeof id !== "string" ||
    !uuidRegex.test(id)
  ) {
    errors.push("Purchase ID must be a valid UUID");
  }

  if (errors.length > 0) {
    throw new Error(errors.join(", "));
  }
};


// CHECK COURSE ACCESS
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
    typeof userId !== "string" ||
    !uuidRegex.test(userId)
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
    !uuidRegex.test(courseId)
  ) {
    errors.push("Course ID must be a valid UUID");
  }

  if (errors.length > 0) {
    throw new Error(errors.join(", "));
  }
};