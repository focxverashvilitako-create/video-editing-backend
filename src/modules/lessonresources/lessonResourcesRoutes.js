import express from "express";
import authMiddleware from "../../middleware/authMiddleware.js";
import roleMiddleware from "../../middleware/roleMiddleware.js";

import {
  createLessonResourceController,
  getAllLessonResourcesController,
  getLessonResourceByIdController,
  getResourcesByLessonIdController,
  updateLessonResourceController,
  deleteLessonResourceController
} from "./lessonResourcesControllers.js";

const router = express.Router();

// Authenticated users: view lesson resources
router.get("/", authMiddleware, getAllLessonResourcesController);

router.get(
  "/lesson/:lessonId",
  authMiddleware,
  getResourcesByLessonIdController
);

router.get(
  "/:id",
  authMiddleware,
  getLessonResourceByIdController
);

// Admin only: manage lesson resources
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  createLessonResourceController
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateLessonResourceController
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteLessonResourceController
);

export default router;