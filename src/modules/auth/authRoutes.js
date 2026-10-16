
import express from "express";

import {
  register,
  verifyEmail,
  resendVerificationCode,
  login,
  forgotPassword,
  resetPassword
} from "./authControllers.js";

import {
  googleLogin,
  googleCallback,
  completeGoogleRegister
} from "./oauthControllers.js";

import {
  facebookLogin,
  facebookCallback,
  completeFacebookRegister
} from "./facebookControllers.js";

const router = express.Router();

router.post("/register", register);
router.post("/verify-email", verifyEmail);
router.post("/resend-verification", resendVerificationCode);

router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

router.get("/google", googleLogin);
router.get("/google/callback", googleCallback);
router.post("/google/complete", completeGoogleRegister);

router.get("/facebook", facebookLogin);
router.get("/facebook/callback", facebookCallback);
router.post("/facebook/complete", completeFacebookRegister);

export default router;
