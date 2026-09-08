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
  validateUpdateCourseSection
} from "./courseSectionsValidations.js";


// CREATE
export const createCourseSectionController = async (req, res) => {
  try {
    const {
      course_id,
      title,
      sort_order
    } = req.body;

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

    res.status(201).json({
      message: "Course section created successfully",
      section
    });

  } catch (error) {
    console.log(error);

    res.status(400).json({
      message: error.message
    });
  }
};


// GET ALL
export const getAllCourseSectionsController = async (req, res) => {
  try {
    const sections = await getAllCourseSections();

    res.status(200).json({
      sections
    });

  } catch (error) {
    console.log(error);

    res.status(400).json({
      message: error.message
    });
  }
};


// GET BY ID
export const getCourseSectionByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const section = await getCourseSectionById(id);

    if (!section) {
      return res.status(404).json({
        message: "Course section not found"
      });
    }

    res.status(200).json({
      message: "Course section fetched successfully",
      section
    });

  } catch (error) {
    console.log(error);

    res.status(400).json({
      message: error.message
    });
  }
};


// GET BY COURSE ID
export const getCourseSectionsByCourseIdController = async (req, res) => {
  try {
    const { course_id } = req.params;

    if (
      !Number.isInteger(Number(course_id)) ||
      Number(course_id) <= 0
    ) {
      return res.status(400).json({
        message: "Course ID must be a valid positive integer"
      });
    }

    const sections = await getCourseSectionsByCourseId(course_id);

    res.status(200).json({
      sections
    });

  } catch (error) {
    console.log(error);

    res.status(400).json({
      message: error.message
    });
  }
};


// UPDATE
export const updateCourseSectionController = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      course_id,
      title,
      sort_order
    } = req.body;

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

    res.status(200).json({
      message: "Course section updated successfully",
      section
    });

  } catch (error) {
    console.log(error);

    res.status(400).json({
      message: error.message
    });
  }
};


// DELETE
export const deleteCourseSectionController = async (req, res) => {
  try {
    const { id } = req.params;

    const section = await deleteCourseSection(id);

    if (!section) {
      return res.status(404).json({
        message: "Course section not found"
      });
    }

    res.status(200).json({
      message: "Course section deleted successfully"
    });

  } catch (error) {
    console.log(error);

    if (
      error.message ===
      "Cannot delete course section because it contains lessons"
    ) {
      return res.status(409).json({
        message: error.message
      });
    }

    res.status(400).json({
      message: error.message
    });
  }
};