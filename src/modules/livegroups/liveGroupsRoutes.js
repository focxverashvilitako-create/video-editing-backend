import express from "express";

import {
  createLiveGroupController,
  getAllLiveGroupsController,
  getLiveGroupByIdController,
  updateLiveGroupController,
  deleteLiveGroupController
} from "./liveGroupsControllers.js";

const router = express.Router();



router.post(
  "/",
  createLiveGroupController
);


router.get(
  "/",
  getAllLiveGroupsController
);


router.get(
  "/:id",
  getLiveGroupByIdController
);



router.put(
  "/:id",
  updateLiveGroupController
);


router.delete(
  "/:id",
  deleteLiveGroupController
);


export default router;