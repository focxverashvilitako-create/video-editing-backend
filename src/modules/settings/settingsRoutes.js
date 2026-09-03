import express from "express";

import {
  createSettingsController,
  getSettingsController,
  updateSettingsController,
  deleteSettingsController
} from "./settingsControllers.js";

const router = express.Router();

router.post("/", createSettingsController);

router.get("/", getSettingsController);

router.put("/:id", updateSettingsController);

router.delete("/:id", deleteSettingsController);

export default router;