
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
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/google/callback", googleCallback);
router.post("/google/complete", completeGoogleRegister);

export default router;












