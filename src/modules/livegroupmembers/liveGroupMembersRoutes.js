import express from "express";
import authMiddleware from "../../middleware/authMiddleware.js";
import roleMiddleware from "../../middleware/roleMiddleware.js";

import {
  addMemberToGroupController,
  getAllGroupMembersController,
  getGroupMemberByIdController,
  getMembersByGroupIdController,
  removeMemberFromGroupController
} from "./liveGroupMembersControllers.js";

const router = express.Router();

// All routes require admin authorization
router.use(authMiddleware);
router.use(roleMiddleware("admin"));

router.post("/", addMemberToGroupController);

router.get("/", getAllGroupMembersController);

router.get("/group/:groupId", getMembersByGroupIdController);

router.get("/:id", getGroupMemberByIdController);

router.delete("/:id", removeMemberFromGroupController);

export default router;