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
    const userId = req.user.id;
    const { lessonId } = req.params;

    validateLessonProgressParams({ userId, lessonId });

    const progress = await getLessonProgress(userId, lessonId);

    if (!progress) {
      return res.status(404).json({
        message: "Lesson progress not found"
      });
    }

    return res.status(200).json({
      message: "Lesson progress fetched successfully",
      progress
    });
  } catch (error) {
    console.error("Get lesson progress error:", error);

    return res.status(400).json({
      message: error.message || "Failed to fetch lesson progress"
    });
  }
};

export const updateLessonProgressController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { lessonId } = req.params;
    const { lastPosition, watchedPercent } = req.body;

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

    return res.status(200).json({
      message: "Lesson progress updated successfully",
      progress
    });
  } catch (error) {
    console.error("Update lesson progress error:", error);

    return res.status(400).json({
      message: error.message || "Failed to update lesson progress"
    });
  }
};

export const checkLessonAccessController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { lessonId } = req.params;

    validateLessonProgressParams({ userId, lessonId });

    const hasAccess = await checkLessonAccess(userId, lessonId);

    return res.status(200).json({
      lessonId,
      hasAccess
    });
  } catch (error) {
    console.error("Check lesson access error:", error);

    return res.status(400).json({
      message: error.message || "Failed to check lesson access"
    });
  }
};