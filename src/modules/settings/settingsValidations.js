
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
    typeof site_name !== "string" ||
    site_name.trim().length < 2
  ) {
    errors.push("Site name must contain at least 2 characters");
  }

  if (
    typeof phone !== "string" ||
    phone.trim().length === 0
  ) {
    errors.push("Phone is required");
  }

  if (
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  ) {
    errors.push("Email must be a valid email address");
  }

  if (
    typeof address !== "string" ||
    address.trim().length === 0
  ) {
    errors.push("Address is required");
  }

  const optionalFields = {
    facebook: facebook,
    instagram: instagram,
    youtube: youtube
  };

  for (const [key, value] of Object.entries(optionalFields)) {
    if (
      value !== undefined &&
      value !== null &&
      typeof value !== "string"
    ) {
      errors.push(`${key} must be a string`);
    }
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
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
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

  const optionalFields = {
    facebook: facebook,
    instagram: instagram,
    youtube: youtube
  };

  for (const [key, value] of Object.entries(optionalFields)) {
    if (
      value !== undefined &&
      value !== null &&
      typeof value !== "string"
    ) {
      errors.push(`${key} must be a string`);
    }
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

export const validateSettingsId = ({ id }) => {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  if (typeof id !== "string" || !uuidRegex.test(id)) {
    throw new Error("Settings ID must be a valid UUID");
  }
};
