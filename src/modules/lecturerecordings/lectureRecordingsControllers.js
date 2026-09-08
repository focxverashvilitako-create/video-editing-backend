import {
  createLectureRecording,
  getAllLectureRecordings,
  getLectureRecordingById,
  getLectureRecordingsByGroupId,
  updateLectureRecording,
  deleteLectureRecording
} from "./lectureRecordingsServices.js";

import {
  validateCreateLectureRecording,
  validateUpdateLectureRecording
} from "./lectureRecordingsValidations.js";

export const createLectureRecordingController = async (req, res) => {
  try {
    const {
      group_id,
      title,
      video_url,
      lesson_date
    } = req.body;

    validateCreateLectureRecording({
      group_id,
      title,
      video_url,
      lesson_date
    });

    const recording = await createLectureRecording(
      group_id,
      title,
      video_url,
      lesson_date
    );

    res.status(201).json({
      message: "Lecture recording created successfully",
      recording
    });
  } catch (error) {
    console.error(error);

    if (error.code === "23503") {
      return res.status(404).json({
        message: "Live group not found"
      });
    }

    res.status(500).json({
      message: "Failed to create lecture recording"
    });
  }
};

export const getAllLectureRecordingsController = async (req, res) => {
  try {
    const recordings = await getAllLectureRecordings();

    res.status(200).json({
      recordings
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to get lecture recordings"
    });
  }
};

export const getLectureRecordingByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const recording = await getLectureRecordingById(id);

    if (!recording) {
      return res.status(404).json({
        message: "Lecture recording not found"
      });
    }

    res.status(200).json({
      recording
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to get lecture recording"
    });
  }
};

export const getLectureRecordingsByGroupIdController = async (req, res) => {
  try {
    const { groupId } = req.params;

    const recordings = await getLectureRecordingsByGroupId(groupId);

    res.status(200).json({
      recordings
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to get recordings for group"
    });
  }
};

export const updateLectureRecordingController = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      group_id,
      title,
      video_url,
      lesson_date
    } = req.body;

    validateUpdateLectureRecording({
      group_id,
      title,
      video_url,
      lesson_date
    });

    const recording = await updateLectureRecording(
      id,
      group_id,
      title,
      video_url,
      lesson_date
    );

    if (!recording) {
      return res.status(404).json({
        message: "Lecture recording not found"
      });
    }

    res.status(200).json({
      message: "Lecture recording updated successfully",
      recording
    });
  } catch (error) {
    console.error(error);

    if (error.code === "23503") {
      return res.status(404).json({
        message: "Live group not found"
      });
    }

    res.status(500).json({
      message: "Failed to update lecture recording"
    });
  }
};

export const deleteLectureRecordingController = async (req, res) => {
  try {
    const { id } = req.params;

    const recording = await deleteLectureRecording(id);

    if (!recording) {
      return res.status(404).json({
        message: "Lecture recording not found"
      });
    }

    res.status(200).json({
      message: "Lecture recording deleted successfully",
      recording
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete lecture recording"
    });
  }
};