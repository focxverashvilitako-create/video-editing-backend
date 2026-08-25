import express from "express";
import { createLessonController, 
    getAllLessonsController,
    getLessonByIdController,
    updateLessonController,
    deleteLessonController
} from "./lessonController.js";

const router = express.Router();

router.post("/", createLessonController);
router.get("/", getAllLessonsController);
router.get("/:id", getLessonByIdController);
router.put("/:id", updateLessonController);
router.delete("/:id", deleteLessonController);


export default router;