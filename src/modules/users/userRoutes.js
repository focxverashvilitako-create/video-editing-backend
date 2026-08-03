import express from "express";
import authMiddleware from "../../middleware/authMiddleware.js";
import roleMiddleware from "../../middleware/roleMiddleware.js";
import {
 profile,
 dashboard
} from "./userControllers.js";
import { auth } from "google-auth-library";

const router = express.Router();

router.get("/profile", authMiddleware,roleMiddleware("student", "admin"), profile);
router.get("/dashboard", authMiddleware, roleMiddleware("student", "admin"), dashboard);

export default router;












