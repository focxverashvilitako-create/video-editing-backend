import express from "express";
import authMiddleware from "../../middleware/authMiddleware.js";
import roleMiddleware from "../../middleware/roleMiddleware.js";

import {
  createLectureRecordingController,
  getAllLectureRecordingsController,
  getLectureRecordingByIdController,
  getLectureRecordingsByGroupIdController,
  updateLectureRecordingController,
  deleteLectureRecordingController
} from "./lectureRecordingsControllers.js";

const router = express.Router();

// Authenticated users: view lecture recordings
router.get("/", authMiddleware, getAllLectureRecordingsController);

router.get(
  "/group/:groupId",
  authMiddleware,
  getLectureRecordingsByGroupIdController
);

router.get(
  "/:id",
  authMiddleware,
  getLectureRecordingByIdController
);

// Admin only: manage lecture recordings
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  createLectureRecordingController
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateLectureRecordingController
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteLectureRecordingController
);

export default router;