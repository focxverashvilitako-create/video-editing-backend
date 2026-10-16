import express from "express";
import authMiddleware from "../../middleware/authMiddleware.js";
import {
  simulatePaymentController
} from "./paymentsControllers.js";

const router = express.Router();

// Only authenticated users can simulate a payment
router.post(
  "/simulate",
  authMiddleware,
  simulatePaymentController
);

export default router;
