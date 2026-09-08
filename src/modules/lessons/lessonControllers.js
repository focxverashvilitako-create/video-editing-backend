import {
  createLesson,
  getAllLessons,
  getLessonById,
  updateLesson,
  deleteLesson
} from "./lessonServices.js";

import {
  validateCreateLesson,
  validateUpdateLesson
} from "./lessonValidations.js";

export const createLessonController = async (req, res) => {
  try {
    const {
      section_id,
      title,
      description,
      video_url,
      duration,
      provider,
      is_preview,
      sort_order
    } = req.body;

    validateCreateLesson({
      section_id,
      title,
      description,
      video_url,
      duration,
      provider,
      is_preview,
      sort_order
    });

    const lesson = await createLesson({
      section_id,
      title,
      description,
      video_url,
      duration,
      provider,
      is_preview,
      sort_order
    });

    res.status(201).json({
      message: "Lesson created successfully",
      lesson
    });

  } catch (error) {
    console.log(error);

    res.status(400).json({
      message: error.message
    });
  }
};


export const getAllLessonsController = async (req, res) => {
  try {
    const lessons = await getAllLessons();

    res.status(200).json({
      lessons
    });

  } catch (error) {
    console.log(error);

    res.status(400).json({
      message: error.message
    });
  }
};


export const getLessonByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const lesson = await getLessonById(id);

    if (!lesson) {
      return res.status(404).json({
        message: "Lesson not found"
      });
    }

    res.status(200).json({
      message: "Lesson fetched successfully",
      lesson
    });

  } catch (error) {
    console.log(error);

    res.status(400).json({
      message: error.message
    });
  }
};


export const updateLessonController = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      section_id,
      title,
      description,
      video_url,
      duration,
      provider,
      is_preview,
      sort_order
    } = req.body;

    validateUpdateLesson({
      section_id,
      title,
      description,
      video_url,
      duration,
      provider,
      is_preview,
      sort_order
    });

    const lesson = await updateLesson(id, {
      section_id,
      title,
      description,
      video_url,
      duration,
      provider,
      is_preview,
      sort_order
    });

    if (!lesson) {
      return res.status(404).json({
        message: "Lesson not found"
      });
    }

    res.status(200).json({
      message: "Lesson updated successfully",
      lesson
    });

  } catch (error) {
    console.log(error);

    res.status(400).json({
      message: error.message
    });
  }
};


export const deleteLessonController = async (req, res) => {
  try {
    const { id } = req.params;

    const lesson = await deleteLesson(id);

    if (!lesson) {
      return res.status(404).json({
        message: "Lesson not found"
      });
    }

    res.status(200).json({
      message: "Lesson deleted successfully"
    });

  } catch (error) {
    console.log(error);

    res.status(400).json({
      message: error.message
    });
  }
};