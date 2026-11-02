import { z } from "zod";

export const registerSchema = z.object({
  name:     z.string().min(2).max(100),
  email:    z.string().email(),
  password: z.string().min(8).max(100),
  role:     z.enum(["student", "company", "admin"]),
  phone:    z.string().optional(),
});

export const loginSchema = z.object({
  email:    z.string().email(),
  password: z.string().min(1),
  role:     z.enum(["student", "company", "admin"]),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordSchema = z.object({
  token:    z.string().min(1),
  password: z.string().min(8).max(100),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword:     z.string().min(8).max(100),
});

export const verifyEmailSchema = z.object({
  token: z.string().min(1),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1),
});

export const googleAuthSchema = z.object({
  email:    z.string().email(),
  name:     z.string().min(1).max(100),
  role:     z.enum(["student", "company", "admin"]).default("student"),
  avatar:   z.string().optional(),
  googleId: z.string().optional(),
});
