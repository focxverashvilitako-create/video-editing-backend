import express from "express";

import {
  addMemberToGroupController,
  getAllGroupMembersController,
  getGroupMemberByIdController,
  getMembersByGroupIdController,
  removeMemberFromGroupController,
} from "./liveGroupMembersControllers.js";

const router = express.Router();


router.post("/", addMemberToGroupController);

router.get("/", getAllGroupMembersController);

router.get("/group/:groupId", getMembersByGroupIdController);

router.get("/:id", getGroupMemberByIdController);

router.delete("/:id", removeMemberFromGroupController);


export default router;