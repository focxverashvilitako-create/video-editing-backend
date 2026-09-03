import express from "express";

import {
  createLectureRecordingController,
  getAllLectureRecordingsController,
  getLectureRecordingByIdController,
  getLectureRecordingsByGroupIdController,
  updateLectureRecordingController,
  deleteLectureRecordingController
} from "./lectureRecordingsControllers.js";

const router = express.Router();

router.post("/", createLectureRecordingController);

router.get("/", getAllLectureRecordingsController);

router.get("/group/:groupId", getLectureRecordingsByGroupIdController);

router.get("/:id", getLectureRecordingByIdController);

router.put("/:id", updateLectureRecordingController);

router.delete("/:id", deleteLectureRecordingController);

export default router;