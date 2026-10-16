const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const validateCreateGalleryItem = ({
  title,
  media_type,
  file_url
}) => {
  const errors = [];

  if (
    typeof title !== "string" ||
    title.trim().length < 2
  ) {
    errors.push("Title must contain at least 2 characters");
  }

  if (
    typeof media_type !== "string" ||
    !["photo", "video"].includes(media_type)
  ) {
    errors.push("Media type must be photo or video");
  }

  if (
    typeof file_url !== "string" ||
    file_url.trim().length === 0
  ) {
    errors.push("File URL is required");
  }

  if (errors.length > 0) {
    throw new Error(errors.join(", "));
  }
};

export const validateUpdateGalleryItem = ({
  title,
  media_type,
  file_url
}) => {
  const errors = [];

  if (title !== undefined) {
    if (
      typeof title !== "string" ||
      title.trim().length < 2
    ) {
      errors.push("Title must contain at least 2 characters");
    }
  }

  if (media_type !== undefined) {
    if (
      typeof media_type !== "string" ||
      !["photo", "video"].includes(media_type)
    ) {
      errors.push("Media type must be photo or video");
    }
  }

  if (file_url !== undefined) {
    if (
      typeof file_url !== "string" ||
      file_url.trim().length === 0
    ) {
      errors.push("File URL must be a non-empty string");
    }
  }

  const hasNoFields =
    title === undefined &&
    media_type === undefined &&
    file_url === undefined;

  if (hasNoFields) {
    errors.push("At least one field is required");
  }

  if (errors.length > 0) {
    throw new Error(errors.join(", "));
  }
};

export const validateGalleryItemId = ({ id }) => {
  if (
    typeof id !== "string" ||
    !UUID_REGEX.test(id)
  ) {
    throw new Error("Gallery item ID must be a valid UUID");
  }
};
