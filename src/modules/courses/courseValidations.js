export const validateCreateCourse = ({
  title,
  description,
  type,
  price,
  thumbnail,
  promoVideo,
  isActive
}) => {
  const errors = [];

  if (!title || typeof title !== "string" || title.trim().length < 2) {
    errors.push("Title must contain at least 2 characters");
  }

  if (!type || !["ondemand", "live"].includes(type)) {
    errors.push("Type must be ondemand or live");
  }

  if (
    price === undefined ||
    typeof price !== "number" ||
    !Number.isFinite(price) ||
    price < 0
  ) {
    errors.push("Price must be a valid non-negative number");
  }

  if (description !== undefined && typeof description !== "string") {
    errors.push("Description must be a string");
  }

  if (thumbnail !== undefined && typeof thumbnail !== "string") {
    errors.push("Thumbnail must be a string");
  }

  if (promoVideo !== undefined && typeof promoVideo !== "string") {
    errors.push("Promo video must be a string");
  }

  if (isActive !== undefined && typeof isActive !== "boolean") {
    errors.push("isActive must be a boolean");
  }

  if (errors.length > 0) {
    throw new Error(errors.join(", "));
  }
};


export const validateUpdateCourse = ({
  title,
  description,
  type,
  price,
  thumbnail,
  promoVideo,
  isActive
}) => {
  const errors = [];

  if (title !== undefined) {
    if (typeof title !== "string" || title.trim().length < 2) {
      errors.push("Title must contain at least 2 characters");
    }
  }

  if (type !== undefined) {
    if (!["ondemand", "live"].includes(type)) {
      errors.push("Type must be ondemand or live");
    }
  }

  if (price !== undefined) {
    if (
      typeof price !== "number" ||
      !Number.isFinite(price) ||
      price < 0
    ) {
      errors.push("Price must be a valid non-negative number");
    }
  }

  if (description !== undefined && typeof description !== "string") {
    errors.push("Description must be a string");
  }

  if (thumbnail !== undefined && typeof thumbnail !== "string") {
    errors.push("Thumbnail must be a string");
  }

  if (promoVideo !== undefined && typeof promoVideo !== "string") {
    errors.push("Promo video must be a string");
  }

  if (isActive !== undefined && typeof isActive !== "boolean") {
    errors.push("isActive must be a boolean");
  }

  const hasNoFields =
    title === undefined &&
    description === undefined &&
    type === undefined &&
    price === undefined &&
    thumbnail === undefined &&
    promoVideo === undefined &&
    isActive === undefined;

  if (hasNoFields) {
    errors.push("At least one field is required");
  }

  if (errors.length > 0) {
    throw new Error(errors.join(", "));
  }
};