
import express from "express";
import {
  register,
  login,
  forgotPassword,
  resetPassword
} from "./authControllers.js";
import {
  googleCallback,
  completeGoogleRegister
} from "./oauthController.js";
import { facebookCallback } from "./facebookController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/google/callback", googleCallback);
router.post("/google/complete", completeGoogleRegister);
router.get("/facebook/callback", facebookCallback);

export default router;












