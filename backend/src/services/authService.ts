import crypto from "crypto";
import { User }          from "../models/User";
import { Student }       from "../models/Student";
import { Company }       from "../models/Company";
import { hashPassword, comparePassword } from "../utils/password";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/jwt";
import { AppError }      from "../middleware/errorMiddleware";
import { sendMail }      from "../config/mail";
import { env }           from "../config/env";

/* ── Register ─────────────────────────────────────────────── */
export async function register(body: {
  name: string; email: string; password: string;
  role: "student" | "company" | "admin"; phone?: string;
}) {
  const existing = await User.findOne({ email: body.email.toLowerCase() });
  if (existing) throw new AppError("Email already registered", 409, "DUPLICATE_EMAIL");

  const hashed = await hashPassword(body.password);
  const token  = crypto.randomBytes(32).toString("hex");

  const user = await User.create({
    name:             body.name,
    email:            body.email.toLowerCase(),
    password:         hashed,
    role:             body.role,
    phone:            body.phone,
    emailVerifyToken: token,
    isEmailVerified:  false,
  });

  // Create role profile
  if (body.role === "student") {
    await Student.create({
      userId:        user._id,
      fullName:      body.name,
      email:         user.email,
      phone:         body.phone,
      university:    "",
      branch:        "",
      degree:        "",
      cgpa:          0,
      graduationYear: new Date().getFullYear() + 2,
    });
  } else if (body.role === "company") {
    await Company.create({
      userId:      user._id,
      companyName: body.name,
      email:       user.email,
      phone:       body.phone,
      industry:    "",
    });
  }

  // Send verification email
  const verifyUrl = `${env.clientUrl}/verify-email?token=${token}`;
  await sendMail({
    to:      user.email,
    subject: "Verify your InternAI account",
    html:    `<p>Hi ${user.name},</p><p>Click <a href="${verifyUrl}">here</a> to verify your email.</p>`,
    text:    `Verify your email: ${verifyUrl}`,
  });

  return { id: user._id, name: user.name, email: user.email, role: user.role };
}

/* ── Login ────────────────────────────────────────────────── */
export async function login(email: string, password: string, role: string) {
  const user = await User.findOne({ email: email.toLowerCase(), role })
    .select("+password +refreshToken");
  if (!user) throw new AppError("Invalid credentials", 401, "INVALID_CREDENTIALS");
  if (!user.isActive) throw new AppError("Account deactivated", 403, "ACCOUNT_INACTIVE");

  const valid = await comparePassword(password, user.password);
  if (!valid) throw new AppError("Invalid credentials", 401, "INVALID_CREDENTIALS");

  const payload   = { userId: String(user._id), role: user.role, email: user.email };
  const access    = signAccessToken(payload);
  const refresh   = signRefreshToken(payload);

  user.refreshToken = refresh;
  user.lastLogin    = new Date();
  await user.save();

  return { accessToken: access, refreshToken: refresh, user: { id: user._id, name: user.name, email: user.email, role: user.role } };
}

/* ── Refresh ──────────────────────────────────────────────── */
export async function refreshTokens(token: string) {
  const payload = verifyRefreshToken(token);
  const user    = await User.findById(payload.userId).select("+refreshToken");
  if (!user || user.refreshToken !== token) {
    throw new AppError("Invalid refresh token", 401, "INVALID_TOKEN");
  }
  const pl      = { userId: String(user._id), role: user.role, email: user.email };
  const access  = signAccessToken(pl);
  const refresh = signRefreshToken(pl);
  user.refreshToken = refresh;
  await user.save();
  return { accessToken: access, refreshToken: refresh };
}

/* ── Logout ───────────────────────────────────────────────── */
export async function logout(userId: string): Promise<void> {
  await User.findByIdAndUpdate(userId, { refreshToken: null });
}

/* ── Verify email ─────────────────────────────────────────── */
export async function verifyEmail(token: string): Promise<void> {
  const user = await User.findOne({ emailVerifyToken: token }).select("+emailVerifyToken");
  if (!user) throw new AppError("Invalid or expired token", 400, "INVALID_TOKEN");
  user.isEmailVerified  = true;
  user.emailVerifyToken = undefined;
  await user.save();
}

/* ── Forgot password ──────────────────────────────────────── */
export async function forgotPassword(email: string): Promise<void> {
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) return; // silently succeed to prevent enumeration

  const token   = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hr

  user.passwordResetToken   = token;
  user.passwordResetExpires = expires;
  await user.save();

  const resetUrl = `${env.clientUrl}/reset-password?token=${token}`;
  await sendMail({
    to:      user.email,
    subject: "Reset your InternAI password",
    html:    `<p>Click <a href="${resetUrl}">here</a> to reset your password. Link expires in 1 hour.</p>`,
    text:    `Reset password: ${resetUrl}`,
  });
}

/* ── Reset password ───────────────────────────────────────── */
export async function resetPassword(token: string, newPassword: string): Promise<void> {
  const user = await User.findOne({
    passwordResetToken:   token,
    passwordResetExpires: { $gt: new Date() },
  }).select("+passwordResetToken +passwordResetExpires");
  if (!user) throw new AppError("Invalid or expired token", 400, "INVALID_TOKEN");

  user.password             = await hashPassword(newPassword);
  user.passwordResetToken   = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
}

/* ── Change password ──────────────────────────────────────── */
export async function changePassword(userId: string, current: string, next: string): Promise<void> {
  const user = await User.findById(userId).select("+password");
  if (!user) throw new AppError("User not found", 404, "NOT_FOUND");
  const valid = await comparePassword(current, user.password);
  if (!valid) throw new AppError("Current password is incorrect", 400, "INVALID_PASSWORD");
  user.password = await hashPassword(next);
  await user.save();
}
