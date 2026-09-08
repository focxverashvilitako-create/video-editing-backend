import {
  getLessonProgress,
  updateLessonProgress,
  checkLessonAccess
} from "./progressServices.js";

import {
  validateLessonProgressParams,
  validateUpdateLessonProgress
} from "./progressValidations.js";


export const getLessonProgressController = async (req, res) => {

  try {

    const { userId, lessonId } = req.params;

    validateLessonProgressParams({
      userId,
      lessonId
    });

    const progress = await getLessonProgress(
      userId,
      lessonId
    );

    if (!progress) {
      return res.status(404).json({
        message: "Lesson progress not found"
      });
    }

    res.status(200).json({
      message: "Lesson progress fetched successfully",
      progress
    });

  } catch (error) {

    console.log(error);

    res.status(400).json({
      message: error.message
    });

  }
};


export const updateLessonProgressController = async (req, res) => {

  try {

    const { userId, lessonId } = req.params;

    const {
      lastPosition,
      watchedPercent
    } = req.body;

    validateUpdateLessonProgress({
      userId,
      lessonId,
      lastPosition,
      watchedPercent
    });

    const progress = await updateLessonProgress(
      userId,
      lessonId,
      lastPosition,
      watchedPercent
    );

    res.status(200).json({
      message: "Lesson progress updated successfully",
      progress
    });

  } catch (error) {

    console.log(error);

    res.status(400).json({
      message: error.message
    });

  }
};


export const checkLessonAccessController = async (req, res) => {

  try {

    const { userId, lessonId } = req.params;

    validateLessonProgressParams({
      userId,
      lessonId
    });

    const hasAccess = await checkLessonAccess(
      userId,
      lessonId
    );

    res.status(200).json({
      lessonId,
      hasAccess
    });

  } catch (error) {

    console.log(error);

    res.status(400).json({
      message: error.message
    });

  }
};