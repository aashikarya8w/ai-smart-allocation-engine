import { Request, Response } from "express";
import { asyncHandler, AppError } from "../middleware/errorMiddleware";
import { User }       from "../models/User";
import { Student }    from "../models/Student";
import { Company }    from "../models/Company";
import { sendSuccess } from "../utils/apiResponse";
import { createAuditLog } from "../services/auditLogService";

export const getAdminDashboard = asyncHandler(async (_req: Request, res: Response) => {
  const { getAdminAnalytics } = await import("../services/analyticsService");
  const analytics = await getAdminAnalytics();
  sendSuccess(res, analytics);
});

export const getAdminById = asyncHandler(async (req: Request, res: Response) => {
  const admin = await User.findOne({ _id: req.params.id, role: "admin" }).lean();
  if (!admin) throw new AppError("Admin not found", 404, "NOT_FOUND");
  sendSuccess(res, admin);
});

export const listAdmins = asyncHandler(async (_req: Request, res: Response) => {
  const admins = await User.find({ role: "admin" }).lean();
  sendSuccess(res, admins);
});

export const createAdmin = asyncHandler(async (req: Request, res: Response) => {
  const { hashPassword } = await import("../utils/password");
  const { name, email, password, phone } = req.body;
  const existing = await User.findOne({ email });
  if (existing) throw new AppError("Email already registered", 409, "DUPLICATE");
  const hashed = await hashPassword(password);
  const admin  = await User.create({ name, email, password: hashed, role: "admin", phone, isEmailVerified: true });
  await createAuditLog({
    actorId: req.user!.userId, actorName: req.user!.name, actorRole: "admin",
    action: "CREATE", entity: "Admin", entityLabel: name,
    description: `Admin account created for ${email}`,
  });
  sendSuccess(res, { id: admin._id, name: admin.name, email: admin.email }, "Admin created");
});

export const suspendUser = asyncHandler(async (req: Request, res: Response) => {
  const { userId, reason } = req.body;
  const user = await User.findByIdAndUpdate(userId, { isActive: false }, { new: true });
  if (!user) throw new AppError("User not found", 404, "NOT_FOUND");
  await createAuditLog({
    actorId: req.user!.userId, actorName: req.user!.name, actorRole: "admin",
    action: "SUSPEND", entity: "User", entityId: userId,
    description: `User ${user.email} suspended. Reason: ${reason ?? "N/A"}`,
  });
  sendSuccess(res, null, "User suspended");
});

export const activateUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findByIdAndUpdate(req.params.id, { isActive: true }, { new: true });
  if (!user) throw new AppError("User not found", 404, "NOT_FOUND");
  sendSuccess(res, null, "User activated");
});

// Admin verify company
export const adminVerifyCompany = asyncHandler(async (req: Request, res: Response) => {
  const { status } = req.body as { status: "Verified" | "Rejected" };
  const company = await Company.findByIdAndUpdate(
    req.params.id, { verificationStatus: status }, { new: true }
  );
  if (!company) throw new AppError("Company not found", 404, "NOT_FOUND");
  await createAuditLog({
    actorId: req.user!.userId, actorName: req.user!.name, actorRole: "admin",
    action: "VERIFY", entity: "Company", entityId: req.params.id,
    entityLabel: company.companyName,
    description: `Company ${company.companyName} ${status.toLowerCase()}`,
  });
  sendSuccess(res, company, `Company ${status.toLowerCase()}`);
});

// Admin verify student
export const adminVerifyStudent = asyncHandler(async (req: Request, res: Response) => {
  const { status } = req.body as { status: "Verified" | "Rejected" };
  const student = await Student.findByIdAndUpdate(
    req.params.id, { verificationStatus: status }, { new: true }
  );
  if (!student) throw new AppError("Student not found", 404, "NOT_FOUND");
  await createAuditLog({
    actorId: req.user!.userId, actorName: req.user!.name, actorRole: "admin",
    action: "VERIFY", entity: "Student", entityId: req.params.id,
    entityLabel: student.fullName,
    description: `Student ${student.fullName} ${status.toLowerCase()}`,
  });
  sendSuccess(res, student, `Student ${status.toLowerCase()}`);
});
