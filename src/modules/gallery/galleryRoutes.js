import express from "express";

import {
  createGalleryItemController,
  getAllGalleryItemsController,
  getGalleryItemByIdController,
  updateGalleryItemController,
  deleteGalleryItemController
} from "./galleryControllers.js";

const router = express.Router();

router.post("/", createGalleryItemController);

router.get("/", getAllGalleryItemsController);

router.get("/:id", getGalleryItemByIdController);

router.put("/:id", updateGalleryItemController);

router.delete("/:id", deleteGalleryItemController);

export default router;