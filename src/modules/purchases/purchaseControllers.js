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
    const { userId, courseId, paymentId } = req.body;

    validateCreatePurchase({ userId, courseId, paymentId });

    const purchase = await createPurchase(
      userId,
      courseId,
      paymentId
    );

    res.status(201).json({
      message: "Purchase created successfully",
      purchase
    });

  } catch (error) {
    console.log(error);

    res.status(400).json({
      message: error.message
    });
  }
};


export const getUserPurchasesController = async (req, res) => {
  try {
    const { userId } = req.params;
    validateUserPurchases({ userId });

    const purchases = await getUserPurchases(userId);

    res.status(200).json({
      message: "Purchases fetched successfully",
      purchases
    });

  } catch (error) {
    console.log(error);

    res.status(400).json({
      message: error.message
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

    res.status(200).json({
      message: "Purchase fetched successfully",
      purchase
    });

  } catch (error) {
    console.log(error);

    res.status(400).json({
      message: error.message
    });
  }
};


export const checkCourseAccessController = async (req, res) => {
  try {
    const { userId, courseId } = req.params;

    validateCourseAccess({ userId, courseId });

    const hasAccess = await checkCourseAccess(
      userId,
      courseId
    );

    res.status(200).json({
      hasAccess
    });

  } catch (error) {
    console.log(error);

    res.status(400).json({
      message: error.message
    });
  }
};