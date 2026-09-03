import express from "express";

import {
  getLessonProgressController,
  updateLessonProgressController,
    checkLessonAccessController
} from "./progressControllers.js";

const router = express.Router();


// GET LESSON PROGRESS
router.get(
  "/user/:userId/lesson/:lessonId",
  getLessonProgressController
);


// UPDATE LESSON PROGRESS
router.put(
  "/user/:userId/lesson/:lessonId",
  updateLessonProgressController
);


// CHECK LESSON ACCESS
router.get(
  "/user/:userId/lesson/:lessonId/access",
  checkLessonAccessController
);


export default router;