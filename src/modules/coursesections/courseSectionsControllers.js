import {
  createCourseSection,
  getAllCourseSections,
  getCourseSectionById,
  getCourseSectionsByCourseId,
  updateCourseSection,
  deleteCourseSection
} from "./courseSectionsServices.js";

import {
  validateCreateCourseSection,
  validateUpdateCourseSection,
  validateCourseSectionId
} from "./courseSectionsValidations.js";

// CREATE
export const createCourseSectionController = async (req, res) => {
  try {
    const { course_id, title, sort_order } = req.body;

    validateCreateCourseSection({
      course_id,
      title,
      sort_order
    });

    const section = await createCourseSection({
      course_id,
      title,
      sort_order
    });

    return res.status(201).json({
      message: "Course section created successfully",
      section
    });
  } catch (error) {
    console.error("Create course section error:", error);

    if (error.message === "Course not found") {
      return res.status(404).json({
        message: error.message
      });
    }

    if (
      error.message.includes("must be") ||
      error.message.includes("required") ||
      error.message.includes("at least") ||
      error.message.includes("Sort order")
    ) {
      return res.status(400).json({
        message: error.message
      });
    }

    return res.status(500).json({
      message: "Failed to create course section"
    });
  }
};

// GET ALL
export const getAllCourseSectionsController = async (req, res) => {
  try {
    const sections = await getAllCourseSections();

    return res.status(200).json({
      sections
    });
  } catch (error) {
    console.error("Get all course sections error:", error);

    return res.status(500).json({
      message: "Failed to fetch course sections"
    });
  }
};

// GET BY ID
export const getCourseSectionByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    validateCourseSectionId(id);

    const section = await getCourseSectionById(id);

    if (!section) {
      return res.status(404).json({
        message: "Course section not found"
      });
    }

    return res.status(200).json({
      message: "Course section fetched successfully",
      section
    });
  } catch (error) {
    console.error("Get course section by ID error:", error);

    if (error.message === "Course section ID must be a valid UUID") {
      return res.status(400).json({
        message: error.message
      });
    }

    return res.status(500).json({
      message: "Failed to fetch course section"
    });
  }
};

// GET BY COURSE ID
export const getCourseSectionsByCourseIdController = async (req, res) => {
  try {
    const { course_id } = req.params;

    if (
      typeof course_id !== "string" ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(course_id)
    ) {
      return res.status(400).json({
        message: "Course ID must be a valid UUID"
      });
    }

    const sections = await getCourseSectionsByCourseId(course_id);

    return res.status(200).json({
      sections
    });
  } catch (error) {
    console.error("Get course sections by course ID error:", error);

    return res.status(500).json({
      message: "Failed to fetch course sections"
    });
  }
};

// UPDATE
export const updateCourseSectionController = async (req, res) => {
  try {
    const { id } = req.params;
    const { course_id, title, sort_order } = req.body;

    validateCourseSectionId(id);

    validateUpdateCourseSection({
      course_id,
      title,
      sort_order
    });

    const section = await updateCourseSection(id, {
      course_id,
      title,
      sort_order
    });

    if (!section) {
      return res.status(404).json({
        message: "Course section not found"
      });
    }

    return res.status(200).json({
      message: "Course section updated successfully",
      section
    });
  } catch (error) {
    console.error("Update course section error:", error);

    if (
      error.message === "Course section ID must be a valid UUID" ||
      error.message === "Course ID must be a valid UUID" ||
      error.message.includes("must contain") ||
      error.message.includes("non-negative integer") ||
      error.message.includes("At least one field is required")
    ) {
      return res.status(400).json({
        message: error.message
      });
    }

    if (error.message === "Course not found") {
      return res.status(404).json({
        message: error.message
      });
    }

    return res.status(500).json({
      message: "Failed to update course section"
    });
  }
};

// DELETE
export const deleteCourseSectionController = async (req, res) => {
  try {
    const { id } = req.params;

    validateCourseSectionId(id);

    const section = await deleteCourseSection(id);

    if (!section) {
      return res.status(404).json({
        message: "Course section not found"
      });
    }

    return res.status(200).json({
      message: "Course section deleted successfully"
    });
  } catch (error) {
    console.error("Delete course section error:", error);

    if (error.message === "Course section ID must be a valid UUID") {
      return res.status(400).json({
        message: error.message
      });
    }

    if (
      error.message ===
      "Cannot delete course section because it contains lessons"
    ) {
      return res.status(409).json({
        message: error.message
      });
    }

    return res.status(500).json({
      message: "Failed to delete course section"
    });
  }
};