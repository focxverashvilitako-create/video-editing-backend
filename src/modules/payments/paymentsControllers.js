import {
  simulatePayment
} from "./paymentsServices.js";

import {
  validateSimulatePayment
} from "./paymentsValidations.js";


export const simulatePaymentController = async (
  req,
  res
) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    validateSimulatePayment({
      userId,
      courseId
    });

    const result = await simulatePayment(
      userId,
      courseId
    );

    return res.status(201).json({
      message: "Payment simulated successfully",
      ...result
    });

  } catch (error) {
    console.error("Simulate payment error:", error);

    if (
      error.message === "User not found" ||
      error.message === "Course not found"
    ) {
      return res.status(404).json({
        message: error.message
      });
    }

    if (
      error.message ===
      "User already has an active purchase for this course"
    ) {
      return res.status(409).json({
        message: error.message
      });
    }

    return res.status(400).json({
      message: error.message || "Payment simulation failed"
    });
  }
};