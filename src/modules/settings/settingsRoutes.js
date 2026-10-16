import express from "express";

import authMiddleware from "../../middleware/authMiddleware.js";
import roleMiddleware from "../../middleware/roleMiddleware.js";

import {
  createSettingsController,
  getSettingsController,
  updateSettingsController,
  deleteSettingsController
} from "./settingsControllers.js";

const router = express.Router();

router.get("/", getSettingsController);

router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  createSettingsController
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateSettingsController
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteSettingsController
);

export default router;
