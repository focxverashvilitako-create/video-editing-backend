import express from "express";

import authMiddleware from "../../middleware/authMiddleware.js";
import roleMiddleware from "../../middleware/roleMiddleware.js";

import {
  createContactMessageController,
  getAllContactMessagesController,
  getContactMessageByIdController,
  updateContactMessageStatusController,
  deleteContactMessageController
} from "./contactMessagesControllers.js";

const router = express.Router();

// Public: visitors can submit contact messages
router.post("/", createContactMessageController);

// Admin only: view and manage submitted messages
router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  getAllContactMessagesController
);

router.get(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  getContactMessageByIdController
);

router.patch(
  "/:id/status",
  authMiddleware,
  roleMiddleware("admin"),
  updateContactMessageStatusController
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteContactMessageController
);

export default router;