
import {
  createLessonResource,
  getAllLessonResources,
  getLessonResourceById,
  getResourcesByLessonId,
  updateLessonResource,
  deleteLessonResource
} from "./lessonResourcesServices.js";

import {
  validateCreateLessonResource,
  validateUpdateLessonResource
} from "./lessonRecourcesValidations.js";

export const createLessonResourceController = async (req, res) => {
  try {
    const { lesson_id, title, file_url } = req.body;

    validateCreateLessonResource({
      lesson_id,
      title,
      file_url
    });

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

    if (error.message?.includes("required") ||
        error.message?.includes("characters") ||
        error.message?.includes("valid UUID") ||
        error.message?.includes("must be a string")) {
      return res.status(400).json({
        message: error.message
      });
    }

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

    if (
      typeof lessonId !== "string" ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(lessonId)
    ) {
      return res.status(400).json({
        message: "Lesson ID must be a valid UUID"
      });
    }

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

    validateUpdateLessonResource({
      lesson_id,
      title,
      file_url
    });

    const resource = await updateLessonResource(id, {
      lesson_id,
      title,
      file_url
    });

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

    if (error.message?.includes("required") ||
        error.message?.includes("characters") ||
        error.message?.includes("valid UUID") ||
        error.message?.includes("must be a string") ||
        error.message?.includes("At least one field")) {
      return res.status(400).json({
        message: error.message
      });
    }

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
