import express from "express";

import {
  createContactMessageController,
  getAllContactMessagesController,
  getContactMessageByIdController,
  updateContactMessageStatusController,
  deleteContactMessageController,
} from "./contactMessagesControllers.js";

const router = express.Router();

router.post("/", createContactMessageController);

router.get("/", getAllContactMessagesController);

router.get("/:id", getContactMessageByIdController);

router.patch("/:id/status", updateContactMessageStatusController);

router.delete("/:id", deleteContactMessageController);

export default router;