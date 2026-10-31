import { Router } from "express";
import * as ctrl from "../controllers/authController";
import { authenticate } from "../middleware/authMiddleware";
import { validate } from "../middleware/validationMiddleware";
import { authRateLimiter } from "../middleware/rateLimitMiddleware";
import {
  registerSchema, loginSchema, forgotPasswordSchema,
  resetPasswordSchema, changePasswordSchema, verifyEmailSchema, refreshTokenSchema,
} from "../validators/authValidator";

const router = Router();

router.post("/register",    authRateLimiter, validate(registerSchema),       ctrl.register);
router.post("/login",       authRateLimiter, validate(loginSchema),          ctrl.login);
router.post("/logout",      authenticate,                                     ctrl.logout);
router.post("/refresh",     validate(refreshTokenSchema),                    ctrl.refresh);
router.post("/verify-email",validate(verifyEmailSchema),                     ctrl.verifyEmail);
router.post("/forgot-password", authRateLimiter, validate(forgotPasswordSchema), ctrl.forgotPassword);
router.post("/reset-password",  authRateLimiter, validate(resetPasswordSchema),  ctrl.resetPassword);
router.post("/change-password", authenticate, validate(changePasswordSchema), ctrl.changePassword);
router.get("/me",           authenticate,                                     ctrl.getMe);

export default router;
