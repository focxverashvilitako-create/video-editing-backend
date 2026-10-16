import {
  enrollUserInGroup
} from "./enrollmentServices.js";

import {
  validateEnrollment
} from "./enrollmentValidations.js";

export const enrollUserInGroupController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { groupId } = req.body;

    validateEnrollment({
      userId,
      groupId
    });

    const enrollment = await enrollUserInGroup(
      userId,
      groupId
    );

    return res.status(201).json({
      message: "User enrolled successfully",
      enrollment
    });
  } catch (error) {
    console.error("Enroll user in group error:", error);

    if (error.message === "Live group not found") {
      return res.status(404).json({
        message: error.message
      });
    }

    if (
      error.message === "User is already enrolled in this group" ||
      error.message === "Live group is full"
    ) {
      return res.status(409).json({
        message: error.message
      });
    }

    if (
      error.message === "Enrollment is not available for this group"
    ) {
      return res.status(400).json({
        message: error.message
      });
    }

    return res.status(400).json({
      message: error.message
    });
  }
};
