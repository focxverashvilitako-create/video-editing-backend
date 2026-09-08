export const validateCreateContactMessage = ({
  name,
  email,
  phone,
  message
}) => {
  const errors = [];

  if (
    !name ||
    typeof name !== "string" ||
    name.trim().length < 2
  ) {
    errors.push("Name must contain at least 2 characters");
  }

  if (
    !email ||
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
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
    !message ||
    typeof message !== "string" ||
    message.trim().length === 0
  ) {
    errors.push("Message is required");
  }

  if (errors.length > 0) {
    throw new Error(errors.join(", "));
  }
};


export const validateContactMessageId = ({
  id
}) => {
  const errors = [];

  if (
    id === undefined ||
    id === null ||
    id === ""
  ) {
    errors.push("Contact message ID is required");
  } else if (
    !Number.isInteger(Number(id)) ||
    Number(id) <= 0
  ) {
    errors.push(
      "Contact message ID must be a valid positive integer"
    );
  }

  if (errors.length > 0) {
    throw new Error(errors.join(", "));
  }
};


export const validateUpdateContactMessageStatus = ({
  status
}) => {
  const errors = [];

  if (
    status === undefined ||
    status === null ||
    status === ""
  ) {
    errors.push("Status is required");
  } else if (
    !["new", "answered"].includes(status)
  ) {
    errors.push(
      "Status must be either new or answered"
    );
  }

  if (errors.length > 0) {
    throw new Error(errors.join(", "));
  }
};