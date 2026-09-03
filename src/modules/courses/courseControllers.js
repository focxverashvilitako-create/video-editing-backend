import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse
} from "./courseServices.js";


export const createCourseController = async (req, res) => {

  try {

    const {
      title,
      description,
      type,
      price,
      thumbnail,
      promoVideo,
      isActive
    } = req.body;


    if (!title || !type || price === undefined) {

      return res.status(400).json({
        message: "Title, type and price are required"
      });

    }


    if (!["ondemand", "live"].includes(type)) {

      return res.status(400).json({
        message: "Type must be ondemand or live"
      });

    }


    const course = await createCourse({
      title,
      description,
      type,
      price,
      thumbnail,
      promoVideo,
      isActive
    });


    res.status(201).json({
      message: "Course created successfully",
      course
    });


  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};


export const getCoursesController = async (req, res) => {

  try {

    const courses = await getAllCourses();

    res.json({
      courses
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};


export const getCourseController = async (req, res) => {

  try {

    const { id } = req.params;

    const course = await getCourseById(id);


    if (!course) {

      return res.status(404).json({
        message: "Course not found"
      });

    }


    res.json({
      course
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};


export const updateCourseController = async (req, res) => {

  try {

    const { id } = req.params;

    const {
      title,
      description,
      type,
      price,
      thumbnail,
      promoVideo,
      isActive
    } = req.body;


    if (!["ondemand", "live"].includes(type)) {

      return res.status(400).json({
        message: "Type must be ondemand or live"
      });

    }


    const course = await updateCourse(
      id,
      {
        title,
        description,
        type,
        price,
        thumbnail,
        promoVideo,
        isActive
      }
    );


    if (!course) {

      return res.status(404).json({
        message: "Course not found"
      });

    }


    res.json({
      message: "Course updated successfully",
      course
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};


export const deleteCourseController = async (req, res) => {

  try {

    const { id } = req.params;

    const course = await deleteCourse(id);


    if (!course) {

      return res.status(404).json({
        message: "Course not found"
      });

    }


    res.json({
      message: "Course deleted successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};