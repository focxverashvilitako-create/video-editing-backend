export const validateCreateGalleryItem = ({
  title,
  media_type,
  file_url
}) => {

  const errors = [];


  if (
    !title ||
    typeof title !== "string" ||
    title.trim().length < 2
  ) {
    errors.push("Title must contain at least 2 characters");
  }


  if (
    !media_type ||
    !["photo", "video"].includes(media_type)
  ) {
    errors.push("Media type must be photo or video");
  }


  if (
    !file_url ||
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
    if (!["photo", "video"].includes(media_type)) {
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


export const validateGalleryItemId = ({
  id
}) => {

  const errors = [];


  if (
    id === undefined ||
    id === null ||
    id === ""
  ) {
    errors.push("Gallery item ID is required");
  } else if (
    !Number.isInteger(Number(id)) ||
    Number(id) <= 0
  ) {
    errors.push(
      "Gallery item ID must be a valid positive integer"
    );
  }


  if (errors.length > 0) {
    throw new Error(errors.join(", "));
  }
};