import {
  createGalleryItem,
  getAllGalleryItems,
  getGalleryItemById,
  updateGalleryItem,
  deleteGalleryItem
} from "./galleryServices.js";

export const createGalleryItemController = async (req, res) => {
  try {
    const { title, media_type, file_url } = req.body;

    if (!title || !media_type || !file_url) {
      return res.status(400).json({
        message: "title, media_type and file_url are required"
      });
    }

    if (!["photo", "video"].includes(media_type)) {
      return res.status(400).json({
        message: "media_type must be photo or video"
      });
    }

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

    res.status(500).json({
      message: "Failed to create gallery item"
    });
  }
};

export const getAllGalleryItemsController = async (req, res) => {
  try {
    const items = await getAllGalleryItems();

    res.status(200).json({
      items
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to get gallery items"
    });
  }
};

export const getGalleryItemByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await getGalleryItemById(id);

    if (!item) {
      return res.status(404).json({
        message: "Gallery item not found"
      });
    }

    res.status(200).json({
      item
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to get gallery item"
    });
  }
};

export const updateGalleryItemController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, media_type, file_url } = req.body;

    if (!title || !media_type || !file_url) {
      return res.status(400).json({
        message: "title, media_type and file_url are required"
      });
    }

    if (!["photo", "video"].includes(media_type)) {
      return res.status(400).json({
        message: "media_type must be photo or video"
      });
    }

    const item = await updateGalleryItem(
      id,
      title,
      media_type,
      file_url
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

    res.status(500).json({
      message: "Failed to update gallery item"
    });
  }
};

export const deleteGalleryItemController = async (req, res) => {
  try {
    const { id } = req.params;

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

    res.status(500).json({
      message: "Failed to delete gallery item"
    });
  }
};