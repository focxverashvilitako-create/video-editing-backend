import {
  createLiveGroup,
  getAllLiveGroups,
  getLiveGroupById,
  updateLiveGroup,
  deleteLiveGroup
} from "./liveGroupsServices.js";


// CREATE
export const createLiveGroupController = async (req, res) => {
  try {
    const {
      course_id,
      title,
      max_students,
      start_date,
      schedule,
      location,
      status,
      start_time,
      end_time
    } = req.body;

    const group = await createLiveGroup({
      course_id,
      title,
      max_students,
      start_date,
      schedule,
      location,
      status,
      start_time,
      end_time
    });

    res.status(201).json({
      message: "Live group created successfully",
      group
    });

  } catch (error) {
    console.log(error);

    res.status(400).json({
      message: error.message
    });
  }
};


// GET ALL
export const getAllLiveGroupsController = async (req, res) => {
  try {
    const groups = await getAllLiveGroups();

    res.status(200).json({
      message: "Live groups fetched successfully",
      groups
    });

  } catch (error) {
    console.log(error);

    res.status(400).json({
      message: error.message
    });
  }
};


// GET BY ID
export const getLiveGroupByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const group = await getLiveGroupById(id);

    if (!group) {
      return res.status(404).json({
        message: "Live group not found"
      });
    }

    res.status(200).json({
      message: "Live group fetched successfully",
      group
    });

  } catch (error) {
    console.log(error);

    res.status(400).json({
      message: error.message
    });
  }
};


// UPDATE
export const updateLiveGroupController = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      course_id,
      title,
      max_students,
      start_date,
      schedule,
      location,
      status,
      start_time,
      end_time
    } = req.body;

    const group = await updateLiveGroup(id, {
      course_id,
      title,
      max_students,
      start_date,
      schedule,
      location,
      status,
      start_time,
      end_time
    });

    if (!group) {
      return res.status(404).json({
        message: "Live group not found"
      });
    }

    res.status(200).json({
      message: "Live group updated successfully",
      group
    });

  } catch (error) {
    console.log(error);

    res.status(400).json({
      message: error.message
    });
  }
};


// DELETE
export const deleteLiveGroupController = async (req, res) => {
  try {
    const { id } = req.params;

    const group = await deleteLiveGroup(id);

    if (!group) {
      return res.status(404).json({
        message: "Live group not found"
      });
    }

    res.status(200).json({
      message: "Live group deleted successfully",
      group
    });

  } catch (error) {
    console.log(error);

    res.status(400).json({
      message: error.message
    });
  }
};