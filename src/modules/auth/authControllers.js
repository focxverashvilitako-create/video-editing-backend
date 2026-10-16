
import * as authService from "./authServices.js";

import {
  validateRegister,
  validateLogin,
  validateForgotPassword,
  validateResetPassword,
  validateVerifyEmail,
  validateResendVerification
} from "./authValidations.js";

export const register = async (req, res) => {
  try {
    validateRegister(req.body);

    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      avatar
    } = req.body;

    const result = await authService.register(
      firstName,
      lastName,
      email,
      password,
      phone,
      avatar
    );

    return res.status(201).json(result);
  } catch (error) {
    console.error("Register error:", error);

    const knownErrors = [
      "An account with this email already exists",
      "Invalid first name",
      "Invalid last name",
      "Invalid email address",
      "Invalid email",
      "Phone must contain 9 digits"
    ];

    if (
      knownErrors.includes(error.message) ||
      error.message.startsWith("Password must") ||
      error.message.includes("must contain")
    ) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({
      message: "Registration failed. Please try again."
    });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    validateVerifyEmail(req.body);

    const { email, code } = req.body;
    const result = await authService.verifyEmail(email, code);

    return res.status(200).json({
      message: "Email verified successfully",
      token: result.token,
      user: result.user
    });
  } catch (error) {
    console.error("Email verification error:", error);

    const clientErrors = [
      "Invalid or expired verification code",
      "Email is already verified. Please log in."
    ];

    if (clientErrors.includes(error.message)) {
      return res.status(400).json({ message: error.message });
    }

    if (
      error.message === "Invalid email address" ||
      error.message === "Verification code must contain 6 digits"
    ) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({
      message: "Email verification failed"
    });
  }
};

export const resendVerificationCode = async (req, res) => {
  try {
    validateResendVerification(req.body);

    await authService.resendVerificationCode(req.body.email);

    return res.status(200).json({
      message: "If the account exists and is not verified, a new code will be sent."
    });
  } catch (error) {
    console.error("Resend verification code error:", error);

    if (error.message === "Invalid email address") {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({
      message: "Could not resend verification code"
    });
  }
};

export const login = async (req, res) => {
  try {
    validateLogin(req.body);

    const result = await authService.login(
      req.body.email,
      req.body.password
    );

    return res.status(200).json({
      message: "Login successful",
      token: result.token,
      user: result.user
    });
  } catch (error) {
    console.error("Login error:", error);

    if (
      error.message === "Invalid email or password" ||
      error.message === "Please verify your email before logging in" ||
      error.message === "Email is required" ||
      error.message === "Password is required"
    ) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({
      message: "Login failed. Please try again."
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    validateForgotPassword(req.body);
    await authService.forgotPassword(req.body.email);

    return res.status(200).json({
      message: "If an account exists for this email, password reset instructions will be sent."
    });
  } catch (error) {
    console.error("Forgot password error:", error);

    if (error.message === "Invalid email address") {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({
      message: "Could not process password reset request"
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    validateResetPassword(req.body);

    await authService.resetPassword(
      req.body.token,
      req.body.newPassword
    );

    return res.status(200).json({
      message: "Password changed successfully"
    });
  } catch (error) {
    console.error("Reset password error:", error);

    if (
      error.message === "Invalid or expired token" ||
      error.message === "Reset token is required" ||
      error.message.startsWith("Password must")
    ) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({
      message: "Could not reset password"
    });
  }
};
