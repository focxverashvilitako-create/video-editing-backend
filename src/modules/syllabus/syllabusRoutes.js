import express from "express";
import authMiddleware from "../../middleware/authMiddleware.js";
import roleMiddleware from "../../middleware/roleMiddleware.js";

import {
  createSyllabusController,
  getAllSyllabusController,
  getSyllabusByIdController,
  getSyllabusByCourseIdController,
  updateSyllabusController,
  deleteSyllabusController
} from "./syllabusControllers.js";

const router = express.Router();

router.get("/", getAllSyllabusController);
router.get("/course/:courseId", getSyllabusByCourseIdController);
router.get("/:id", getSyllabusByIdController);


router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  createSyllabusController
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateSyllabusController
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteSyllabusController
);

export default router;
