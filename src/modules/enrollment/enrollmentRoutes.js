import express from "express";

import {
  enrollUserInGroupController
} from "./enrollmentControllers.js";

const router = express.Router();


router.post(
  "/enroll",
  enrollUserInGroupController
);


export default router;