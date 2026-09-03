import express from "express";

import {
  createPurchaseController,
  getUserPurchasesController,
  getPurchaseByIdController,
  checkCourseAccessController
} from "./purchaseControllers.js";

const router = express.Router();


// CREATE PURCHASE
router.post(
  "/",
  createPurchaseController
);

router.get(
  "/user/:userId/course/:courseId/access",
  checkCourseAccessController
);


// GET USER PURCHASES
router.get(
  "/user/:userId",
  getUserPurchasesController
);


// GET PURCHASE BY ID
router.get(
  "/:id",
  getPurchaseByIdController
);


// CHECK COURSE ACCESS


export default router;