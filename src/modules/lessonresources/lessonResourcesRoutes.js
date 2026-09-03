import express from "express";

import {
  createLessonResourceController,
  getAllLessonResourcesController,
  getLessonResourceByIdController,
  getResourcesByLessonIdController,
  updateLessonResourceController,
  deleteLessonResourceController
} from "./lessonResourcesControllers.js";

const router = express.Router();

router.post("/", createLessonResourceController);
router.get("/", getAllLessonResourcesController);
router.get("/:id", getLessonResourceByIdController);
router.get("/lesson/:lessonId", getResourcesByLessonIdController);
router.put("/:id", updateLessonResourceController);
router.delete("/:id", deleteLessonResourceController);

export default router; 