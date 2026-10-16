import express from "express";
import authMiddleware from "../../middleware/authMiddleware.js";
import roleMiddleware from "../../middleware/roleMiddleware.js";

import {
  createCourseController,
  getCoursesController,
  getCourseController,
  updateCourseController,
  deleteCourseController
} from "./courseControllers.js";

const router = express.Router();

router.get("/", getCoursesController);
router.get("/:id", getCourseController);

router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  createCourseController
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateCourseController
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteCourseController
);

export default router;
