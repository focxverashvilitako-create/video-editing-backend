import express from "express";
import authMiddleware from "../../middleware/authMiddleware.js";
import roleMiddleware from "../../middleware/roleMiddleware.js";

import {
  createLiveGroupController,
  getAllLiveGroupsController,
  getLiveGroupByIdController,
  updateLiveGroupController,
  deleteLiveGroupController
} from "./liveGroupsControllers.js";

const router = express.Router();

// Public: view live groups and schedules
router.get("/", getAllLiveGroupsController);
router.get("/:id", getLiveGroupByIdController);

// Admin only: manage live groups
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  createLiveGroupController
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateLiveGroupController
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteLiveGroupController
);

export default router;