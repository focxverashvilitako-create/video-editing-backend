import express from "express";
import authMiddleware from "../../middleware/authMiddleware.js";
import {
 profile,
 dashboard
} from "./userControllers.js";

const router = express.Router();

router.get("/profile", authMiddleware, profile);
router.get("/dashboard", authMiddleware, dashboard);

export default router;












