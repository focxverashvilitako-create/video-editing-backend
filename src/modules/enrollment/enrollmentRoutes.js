import express from "express";
import authMiddleware from "../../middleware/authMiddleware.js";

import {
  enrollUserInGroupController
} from "./enrollmentControllers.js";

const router = express.Router();

router.post(
  "/enroll",
  authMiddleware,
  enrollUserInGroupController
);

export default router;
