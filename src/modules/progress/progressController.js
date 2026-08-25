import {
  getLessonProgress,
  updateLessonProgress,
  checkLessonAccess
} from "./progressService.js";


// GET LESSON PROGRESS
export const getLessonProgressController = async (req, res) => {

  try {

    const { userId, lessonId } = req.params;

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


// UPDATE LESSON PROGRESS
export const updateLessonProgressController = async (req, res) => {

  try {

    const { userId, lessonId } = req.params;

    const {
      lastPosition,
      watchedPercent
    } = req.body;

    if (
      lastPosition === undefined ||
      watchedPercent === undefined
    ) {
      return res.status(400).json({
        message: "lastPosition and watchedPercent are required"
      });
    }

    if (lastPosition < 0) {
      return res.status(400).json({
        message: "lastPosition cannot be negative"
      });
    }

    if (watchedPercent < 0 || watchedPercent > 100) {
      return res.status(400).json({
        message: "watchedPercent must be between 0 and 100"
      });
    }

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