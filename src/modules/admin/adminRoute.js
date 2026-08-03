import { Router } from "express";
import { adminDashboard } from "./adminController.js";
import authMiddleware from "../../middleware/authMiddleware.js";
import roleMiddleware from "../../middleware/roleMiddleware.js";

const router = Router();

router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("admin"),
  adminDashboard
);

export default router;

