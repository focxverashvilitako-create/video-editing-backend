const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const validateCreateContactMessage = ({
  name,
  email,
  phone,
  message
}) => {
  const errors = [];

  if (typeof name !== "string" || name.trim().length < 2) {
    errors.push("Name must contain at least 2 characters");
  }

  if (
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  ) {
    errors.push("Email must be a valid email address");
  }

  if (
    phone !== undefined &&
    phone !== null &&
    typeof phone !== "string"
  ) {
    errors.push("Phone must be a string");
  }

  if (
    typeof phone === "string" &&
    phone.trim().length > 30
  ) {
    errors.push("Phone must not exceed 30 characters");
  }

  if (
    typeof message !== "string" ||
    message.trim().length === 0
  ) {
    errors.push("Message is required");
  }

  if (errors.length > 0) {
    throw new Error(errors.join(", "));
  }
};

export const validateContactMessageId = ({ id }) => {
  if (typeof id !== "string" || !UUID_REGEX.test(id)) {
    throw new Error("Contact message ID must be a valid UUID");
  }
};

export const validateUpdateContactMessageStatus = ({ status }) => {
  const allowedStatuses = ["new", "answered"];

  if (
    typeof status !== "string" ||
    !allowedStatuses.includes(status)
  ) {
    throw new Error("Status must be either new or answered");
  }
};