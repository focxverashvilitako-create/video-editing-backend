import express from "express";
import authMiddleware from "../../middleware/authMiddleware.js";

import {
  getLessonProgressController,
  updateLessonProgressController,
  checkLessonAccessController
} from "./progressControllers.js";

const router = express.Router();

router.use(authMiddleware);

router.get(
  "/lesson/:lessonId",
  getLessonProgressController
);

router.put(
  "/lesson/:lessonId",
  updateLessonProgressController
);

router.get(
  "/lesson/:lessonId/access",
  checkLessonAccessController
);

export default router;