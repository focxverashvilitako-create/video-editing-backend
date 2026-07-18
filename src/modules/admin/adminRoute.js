import { Router } from "express";
import { adminDashboard } from "./adminController.js";
import authMiddleware from "../../middleware/authMiddleware.js";

const router = Router();

router.get(
  "/dashboard",
  authMiddleware,
  adminDashboard
);

export default router;

export default router;