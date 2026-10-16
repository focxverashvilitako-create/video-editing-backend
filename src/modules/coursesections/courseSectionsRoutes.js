
import express from "express";
import authMiddleware from "../../middleware/authMiddleware.js";
import roleMiddleware from "../../middleware/roleMiddleware.js";

import {
  createCourseSectionController,
  getAllCourseSectionsController,
  getCourseSectionByIdController,
  getCourseSectionsByCourseIdController,
  updateCourseSectionController,
  deleteCourseSectionController
} from "./courseSectionsControllers.js";

const router = express.Router();

router.get("/", getAllCourseSectionsController);

router.get("/course/:course_id", getCourseSectionsByCourseIdController);

router.get("/:id", getCourseSectionByIdController);

router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  createCourseSectionController
);

router.patch(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateCourseSectionController
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteCourseSectionController
);

export default router;
