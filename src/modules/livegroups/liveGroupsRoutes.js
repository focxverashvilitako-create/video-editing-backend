import express from "express";

import {
  createLiveGroupController,
  getAllLiveGroupsController,
  getLiveGroupByIdController,
  updateLiveGroupController,
  deleteLiveGroupController
} from "./liveGroupsController.js";

const router = express.Router();


// CREATE
router.post(
  "/",
  createLiveGroupController
);


// GET ALL
router.get(
  "/",
  getAllLiveGroupsController
);


// GET BY ID
router.get(
  "/:id",
  getLiveGroupByIdController
);


// UPDATE
router.put(
  "/:id",
  updateLiveGroupController
);


// DELETE
router.delete(
  "/:id",
  deleteLiveGroupController
);


export default router;