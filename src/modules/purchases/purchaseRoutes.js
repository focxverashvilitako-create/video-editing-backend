import express from "express";
import authMiddleware from "../../middleware/authMiddleware.js";
import {
  createPurchaseController,
  getUserPurchasesController,
  getPurchaseByIdController,
  checkCourseAccessController
} from "./purchaseControllers.js";

const router = express.Router();

// All purchase routes require authentication
router.use(authMiddleware);

// Create a purchase
router.post("/", createPurchaseController);

// Check access to a course
router.get(
  "/user/:userId/course/:courseId/access",
  checkCourseAccessController
);

// Get purchases for a user
router.get(
  "/user/:userId",
  getUserPurchasesController
);

// Get a purchase by ID
router.get("/:id", getPurchaseByIdController);

export default router;
