import {
  createPurchase,
  getUserPurchases,
  getPurchaseById,
  checkCourseAccess
} from "./purchaseServices.js";

import {
  validateCreatePurchase,
  validateUserPurchases,
  validatePurchaseId,
  validateCourseAccess
} from "./purchaseValidations.js";


export const createPurchaseController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId, paymentId } = req.body;

    validateCreatePurchase({
      userId,
      courseId,
      paymentId
    });

    const purchase = await createPurchase(
      userId,
      courseId,
      paymentId
    );

    return res.status(201).json({
      message: "Purchase created successfully",
      purchase
    });

  } catch (error) {
    console.error("Create purchase error:", error);

    if (
      error.message === "User not found" ||
      error.message === "Course not found" ||
      error.message === "Payment not found"
    ) {
      return res.status(404).json({
        message: error.message
      });
    }

    if (
      error.message === "Payment was not successful" ||
      error.message === "Payment does not belong to this user" ||
      error.message === "Payment does not belong to this course"
    ) {
      return res.status(403).json({
        message: error.message
      });
    }

    return res.status(400).json({
      message: error.message || "Failed to create purchase"
    });
  }
};


export const getUserPurchasesController = async (req, res) => {
  try {
    const userId = req.user.id;

    validateUserPurchases({ userId });

    const purchases = await getUserPurchases(userId);

    return res.status(200).json({
      message: "Purchases fetched successfully",
      purchases
    });

  } catch (error) {
    console.error("Get user purchases error:", error);

    return res.status(400).json({
      message: error.message || "Failed to fetch purchases"
    });
  }
};


export const getPurchaseByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    validatePurchaseId({ id });

    const purchase = await getPurchaseById(id);

    if (!purchase) {
      return res.status(404).json({
        message: "Purchase not found"
      });
    }

    if (purchase.user_id !== req.user.id) {
      return res.status(403).json({
        message: "You are not allowed to access this purchase"
      });
    }

    return res.status(200).json({
      message: "Purchase fetched successfully",
      purchase
    });

  } catch (error) {
    console.error("Get purchase error:", error);

    return res.status(400).json({
      message: error.message || "Failed to fetch purchase"
    });
  }
};


export const checkCourseAccessController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.params;

    validateCourseAccess({
      userId,
      courseId
    });

    const hasAccess = await checkCourseAccess(
      userId,
      courseId
    );

    return res.status(200).json({
      courseId,
      hasAccess
    });

  } catch (error) {
    console.error("Check course access error:", error);

    return res.status(400).json({
      message: error.message || "Failed to check course access"
    });
  }
};