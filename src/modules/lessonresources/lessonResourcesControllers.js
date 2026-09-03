import {
  createLessonResource,
  getAllLessonResources,
  getLessonResourceById,
  getResourcesByLessonId,
  updateLessonResource,
  deleteLessonResource
} from "./lessonResourcesServices.js";

export const createLessonResourceController = async (req, res) => {
  try {
    const { lesson_id, title, file_url } = req.body;

    if (!lesson_id || !title) {
      return res.status(400).json({
        message: "lesson_id and title are required"
      });
    }

    const resource = await createLessonResource(
      lesson_id,
      title,
      file_url ?? null
    );

    res.status(201).json({
      message: "Lesson resource created successfully",
      resource
    });
  } catch (error) {
    console.error(error);

    if (error.code === "23503") {
      return res.status(404).json({
        message: "Lesson not found"
      });
    }

    res.status(500).json({
      message: "Failed to create lesson resource"
    });
  }
};

export const getAllLessonResourcesController = async (req, res) => {
  try {
    const resources = await getAllLessonResources();

    res.status(200).json({
      resources
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to get lesson resources"
    });
  }
};

export const getLessonResourceByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const resource = await getLessonResourceById(id);

    if (!resource) {
      return res.status(404).json({
        message: "Lesson resource not found"
      });
    }

    res.status(200).json({
      resource
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to get lesson resource"
    });
  }
};

export const getResourcesByLessonIdController = async (req, res) => {
  try {
    const { lessonId } = req.params;

    const resources = await getResourcesByLessonId(lessonId);

    res.status(200).json({
      resources
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to get resources for lesson"
    });
  }
};

export const updateLessonResourceController = async (req, res) => {
  try {
    const { id } = req.params;
    const { lesson_id, title, file_url } = req.body;

    if (!lesson_id || !title) {
      return res.status(400).json({
        message: "lesson_id and title are required"
      });
    }

    const resource = await updateLessonResource(
      id,
      lesson_id,
      title,
      file_url ?? null
    );

    if (!resource) {
      return res.status(404).json({
        message: "Lesson resource not found"
      });
    }

    res.status(200).json({
      message: "Lesson resource updated successfully",
      resource
    });
  } catch (error) {
    console.error(error);

    if (error.code === "23503") {
      return res.status(404).json({
        message: "Lesson not found"
      });
    }

    res.status(500).json({
      message: "Failed to update lesson resource"
    });
  }
};

export const deleteLessonResourceController = async (req, res) => {
  try {
    const { id } = req.params;

    const resource = await deleteLessonResource(id);

    if (!resource) {
      return res.status(404).json({
        message: "Lesson resource not found"
      });
    }

    res.status(200).json({
      message: "Lesson resource deleted successfully",
      resource
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete lesson resource"
    });
  }
};