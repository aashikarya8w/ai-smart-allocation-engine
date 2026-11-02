import { Request, Response } from "express";
import { asyncHandler } from "../middleware/errorMiddleware";
import * as authService from "../services/authService";
import { sendSuccess, sendCreated } from "../utils/apiResponse";
import { User } from "../models/User";
import { Student } from "../models/Student";
import { Company }  from "../models/Company";
import { AppError } from "../middleware/errorMiddleware";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const data = await authService.register(req.body);
  sendCreated(res, data, "Registration successful. Please verify your email.");
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, role } = req.body;
  const data = await authService.login(email, password, role);
  sendSuccess(res, data, "Login successful");
});

export const googleAuth = asyncHandler(async (req: Request, res: Response) => {
  const data = await authService.googleAuth(req.body);
  sendSuccess(res, data, "Google authentication successful");
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  await authService.logout(req.user!.userId);
  sendSuccess(res, null, "Logged out successfully");
});

export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  const tokens = await authService.refreshTokens(refreshToken);
  sendSuccess(res, tokens, "Tokens refreshed");
});

export const verifyEmail = asyncHandler(async (req: Request, res: Response) => {
  const { token } = req.body;
  await authService.verifyEmail(token);
  sendSuccess(res, null, "Email verified successfully");
});

export const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
  await authService.forgotPassword(req.body.email);
  sendSuccess(res, null, "If the email exists, a reset link has been sent");
});

export const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  const { token, password } = req.body;
  await authService.resetPassword(token, password);
  sendSuccess(res, null, "Password reset successfully");
});

export const changePassword = asyncHandler(async (req: Request, res: Response) => {
  const { currentPassword, newPassword } = req.body;
  await authService.changePassword(req.user!.userId, currentPassword, newPassword);
  sendSuccess(res, null, "Password changed successfully");
});

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.user!.userId).lean();
  if (!user) throw new AppError("User not found", 404, "NOT_FOUND");

  let profile = null;
  if (user.role === "student") {
    profile = await Student.findOne({ userId: user._id }).lean();
  } else if (user.role === "company") {
    profile = await Company.findOne({ userId: user._id }).lean();
  }

  sendSuccess(res, { user, profile });
});
