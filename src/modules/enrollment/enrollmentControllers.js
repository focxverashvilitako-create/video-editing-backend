import {
  enrollUserInGroup
} from "./enrollmentServices.js";


export const enrollUserInGroupController = async (req, res) => {
  try {

    const { userId, groupId } = req.body;

    if (!userId || !groupId) {
      return res.status(400).json({
        message: "userId and groupId are required"
      });
    }

    const enrollment = await enrollUserInGroup(
      userId,
      groupId
    );

    res.status(201).json({
      message: "User enrolled successfully",
      enrollment
    });

  } catch (error) {

    console.log(error);

    if (error.message === "Live group not found") {
      return res.status(404).json({
        message: error.message
      });
    }

    if (
      error.message ===
      "User is already enrolled in this group"
    ) {
      return res.status(409).json({
        message: error.message
      });
    }

    if (error.message === "Live group is full") {
      return res.status(409).json({
        message: error.message
      });
    }

    if (
      error.message ===
      "Enrollment is not available for this group"
    ) {
      return res.status(400).json({
        message: error.message
      });
    }

    res.status(400).json({
      message: error.message
    });
  }
};