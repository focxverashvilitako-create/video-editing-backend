export const validateCreateSettings = ({
  site_name,
  phone,
  email,
  address,
  facebook,
  instagram,
  youtube
}) => {

  const errors = [];

  if (
    !site_name ||
    typeof site_name !== "string" ||
    site_name.trim().length < 2
  ) {
    errors.push("Site name must contain at least 2 characters");
  }

  if (
    !phone ||
    typeof phone !== "string" ||
    phone.trim().length === 0
  ) {
    errors.push("Phone is required");
  }

  if (
    !email ||
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    errors.push("Email must be a valid email address");
  }

  if (
    !address ||
    typeof address !== "string" ||
    address.trim().length === 0
  ) {
    errors.push("Address is required");
  }

  if (
    facebook !== undefined &&
    facebook !== null &&
    typeof facebook !== "string"
  ) {
    errors.push("Facebook must be a string");
  }

  if (
    instagram !== undefined &&
    instagram !== null &&
    typeof instagram !== "string"
  ) {
    errors.push("Instagram must be a string");
  }

  if (
    youtube !== undefined &&
    youtube !== null &&
    typeof youtube !== "string"
  ) {
    errors.push("YouTube must be a string");
  }

  if (errors.length > 0) {
    throw new Error(errors.join(", "));
  }
};


export const validateUpdateSettings = ({
  site_name,
  phone,
  email,
  address,
  facebook,
  instagram,
  youtube
}) => {

  const errors = [];

  if (site_name !== undefined) {
    if (
      typeof site_name !== "string" ||
      site_name.trim().length < 2
    ) {
      errors.push("Site name must contain at least 2 characters");
    }
  }

  if (phone !== undefined) {
    if (
      typeof phone !== "string" ||
      phone.trim().length === 0
    ) {
      errors.push("Phone must be a non-empty string");
    }
  }

  if (email !== undefined) {
    if (
      typeof email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      errors.push("Email must be a valid email address");
    }
  }

  if (address !== undefined) {
    if (
      typeof address !== "string" ||
      address.trim().length === 0
    ) {
      errors.push("Address must be a non-empty string");
    }
  }

  if (
    facebook !== undefined &&
    facebook !== null &&
    typeof facebook !== "string"
  ) {
    errors.push("Facebook must be a string");
  }

  if (
    instagram !== undefined &&
    instagram !== null &&
    typeof instagram !== "string"
  ) {
    errors.push("Instagram must be a string");
  }

  if (
    youtube !== undefined &&
    youtube !== null &&
    typeof youtube !== "string"
  ) {
    errors.push("YouTube must be a string");
  }

  const hasNoFields =
    site_name === undefined &&
    phone === undefined &&
    email === undefined &&
    address === undefined &&
    facebook === undefined &&
    instagram === undefined &&
    youtube === undefined;

  if (hasNoFields) {
    errors.push("At least one field is required");
  }

  if (errors.length > 0) {
    throw new Error(errors.join(", "));
  }
};


export const validateSettingsId = ({
  id
}) => {

  const errors = [];

  if (
    id === undefined ||
    id === null ||
    id === ""
  ) {
    errors.push("Settings ID is required");
  } else if (
    !Number.isInteger(Number(id)) ||
    Number(id) <= 0
  ) {
    errors.push(
      "Settings ID must be a valid positive integer"
    );
  }

  if (errors.length > 0) {
    throw new Error(errors.join(", "));
  }
};