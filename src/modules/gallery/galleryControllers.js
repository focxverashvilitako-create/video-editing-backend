import {
  createGalleryItem,
  getAllGalleryItems,
  getGalleryItemById,
  updateGalleryItem,
  deleteGalleryItem
} from "./galleryServices.js";

import {
  validateCreateGalleryItem,
  validateUpdateGalleryItem,
  validateGalleryItemId
} from "./galleryValidations.js";


// CREATE
export const createGalleryItemController = async (req, res) => {

  try {

    const {
      title,
      media_type,
      file_url
    } = req.body;


    validateCreateGalleryItem({
      title,
      media_type,
      file_url
    });


    const item = await createGalleryItem(
      title,
      media_type,
      file_url
    );


    res.status(201).json({
      message: "Gallery item created successfully",
      item
    });

  } catch (error) {

    console.error(error);

    res.status(400).json({
      message: error.message
    });

  }
};


// GET ALL
export const getAllGalleryItemsController = async (
  req,
  res
) => {

  try {

    const items = await getAllGalleryItems();


    res.status(200).json({
      message: "Gallery items fetched successfully",
      items
    });

  } catch (error) {

    console.error(error);

    res.status(400).json({
      message: error.message
    });

  }
};


// GET BY ID
export const getGalleryItemByIdController = async (
  req,
  res
) => {

  try {

    const { id } = req.params;


    validateGalleryItemId({
      id
    });


    const item = await getGalleryItemById(id);


    if (!item) {
      return res.status(404).json({
        message: "Gallery item not found"
      });
    }


    res.status(200).json({
      message: "Gallery item fetched successfully",
      item
    });

  } catch (error) {

    console.error(error);

    res.status(400).json({
      message: error.message
    });

  }
};


// UPDATE
export const updateGalleryItemController = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    const {
      title,
      media_type,
      file_url
    } = req.body;


    validateGalleryItemId({
      id
    });


    validateUpdateGalleryItem({
      title,
      media_type,
      file_url
    });


    const item = await updateGalleryItem(
      id,
      {
        title,
        media_type,
        file_url
      }
    );


    if (!item) {
      return res.status(404).json({
        message: "Gallery item not found"
      });
    }


    res.status(200).json({
      message: "Gallery item updated successfully",
      item
    });

  } catch (error) {

    console.error(error);

    res.status(400).json({
      message: error.message
    });

  }
};


// DELETE
export const deleteGalleryItemController = async (
  req,
  res
) => {

  try {

    const { id } = req.params;


    validateGalleryItemId({
      id
    });


    const item = await deleteGalleryItem(id);


    if (!item) {
      return res.status(404).json({
        message: "Gallery item not found"
      });
    }


    res.status(200).json({
      message: "Gallery item deleted successfully",
      item
    });

  } catch (error) {

    console.error(error);

    res.status(400).json({
      message: error.message
    });

  }
};