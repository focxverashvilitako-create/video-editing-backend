import * as syllabusService from "./syllabusServices.js";


export const createSyllabusController = async (req, res) => {
  try {
    const {
      course_id,
      title,
      description,
      sort_order
    } = req.body;

    const syllabus = await syllabusService.createSyllabus(
      course_id,
      title,
      description,
      sort_order
    );

    res.status(201).json({
      message: "Syllabus created successfully",
      syllabus
    });

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};


export const getAllSyllabusController = async (req, res) => {
  try {
    const syllabus = await syllabusService.getAllSyllabus();

    res.json(syllabus);

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};


export const getSyllabusByIdController = async (req, res) => {
  try {
    const syllabus = await syllabusService.getSyllabusById(
      req.params.id
    );

    res.json(syllabus);

  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
};


export const getSyllabusByCourseIdController = async (req, res) => {
  try {
    const syllabus = await syllabusService.getSyllabusByCourseId(
      req.params.courseId
    );

    res.json(syllabus);

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};


export const updateSyllabusController = async (req, res) => {
  try {
    const {
      course_id,
      title,
      description,
      sort_order
    } = req.body;

    const syllabus = await syllabusService.updateSyllabus(
      req.params.id,
      course_id,
      title,
      description,
      sort_order
    );

    res.json({
      message: "Syllabus updated successfully",
      syllabus
    });

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};


export const deleteSyllabusController = async (req, res) => {
  try {
    const syllabus = await syllabusService.deleteSyllabus(
      req.params.id
    );

    res.json({
      message: "Syllabus deleted successfully",
      syllabus
    });

  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
};