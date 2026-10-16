import express from "express";
import authMiddleware from "../../middleware/authMiddleware.js";
import roleMiddleware from "../../middleware/roleMiddleware.js";

import {
  createGalleryItemController,
  getAllGalleryItemsController,
  getGalleryItemByIdController,
  updateGalleryItemController,
  deleteGalleryItemController
} from "./galleryControllers.js";

const router = express.Router();

// Public gallery viewing
router.get("/", getAllGalleryItemsController);
router.get("/:id", getGalleryItemByIdController);

// Admin-only gallery management
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  createGalleryItemController
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateGalleryItemController
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteGalleryItemController
);

export default router;
