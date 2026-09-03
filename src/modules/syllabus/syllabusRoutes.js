import express from "express";

import {
  createSyllabusController,
  getAllSyllabusController,
  getSyllabusByIdController,
  getSyllabusByCourseIdController,
  updateSyllabusController,
  deleteSyllabusController
} from "./syllabusControllers.js";

const router = express.Router();

router.post("/", createSyllabusController);

router.get("/", getAllSyllabusController);

router.get("/course/:courseId", getSyllabusByCourseIdController);

router.get("/:id", getSyllabusByIdController);

router.put("/:id", updateSyllabusController);

router.delete("/:id", deleteSyllabusController);

export default router;