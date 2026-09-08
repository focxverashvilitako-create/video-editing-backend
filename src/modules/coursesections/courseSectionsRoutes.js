import express from "express";

import {
  createCourseSectionController,
  getAllCourseSectionsController,
  getCourseSectionByIdController,
  getCourseSectionsByCourseIdController,
  updateCourseSectionController,
  deleteCourseSectionController
} from "./courseSectionsControllers.js";

const router = express.Router();



router.post(
  "/",
  createCourseSectionController
);


router.get(
  "/",
  getAllCourseSectionsController
);



router.get(
  "/course/:course_id",
  getCourseSectionsByCourseIdController
);



router.get(
  "/:id",
  getCourseSectionByIdController
);



router.patch(
  "/:id",
  updateCourseSectionController
);


router.delete(
  "/:id",
  deleteCourseSectionController
);


export default router;