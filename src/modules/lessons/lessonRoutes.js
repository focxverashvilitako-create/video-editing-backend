import express from "express";
import authMiddleware from "../../middleware/authMiddleware.js";
import roleMiddleware from "../../middleware/roleMiddleware.js";

import {
  createLessonController,
  getAllLessonsController,
  getLessonByIdController,
  updateLessonController,
  deleteLessonController
} from "./lessonControllers.js";

const router = express.Router();

// Public: view lessons
router.get("/", getAllLessonsController);
router.get("/:id", getLessonByIdController);

// Admin only: manage lessons
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  createLessonController
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateLessonController
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteLessonController
);

export default router;