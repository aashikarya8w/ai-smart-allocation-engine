import { Request, Response } from "express";
import { asyncHandler, AppError } from "../middleware/errorMiddleware";
import * as internshipService from "../services/internshipService";
import { sendSuccess, sendCreated, sendList } from "../utils/apiResponse";
import { getPagination, buildPaginationMeta } from "../utils/pagination";
import { Internship } from "../models/Internship";
import { createAuditLog } from "../services/auditLogService";

export const createInternship = asyncHandler(async (req: Request, res: Response) => {
  const internship = await internshipService.createInternship(req.user!.userId, req.body);
  sendCreated(res, internship, "Internship created and submitted for approval");
});

export const updateInternship = asyncHandler(async (req: Request, res: Response) => {
  const internship = await internshipService.updateInternship(req.user!.userId, req.params.id, req.body);
  sendSuccess(res, internship, "Internship updated");
});

export const deleteInternship = asyncHandler(async (req: Request, res: Response) => {
  await internshipService.deleteInternship(req.user!.userId, req.params.id);
  sendSuccess(res, null, "Internship deleted");
});

export const getInternships = asyncHandler(async (req: Request, res: Response) => {
  const { page, limit } = getPagination(req);
  const q = req.query as Record<string, string>;
  const { data, total } = await internshipService.getInternships({ page, limit, ...q });
  sendList(res, data, buildPaginationMeta(page, limit, total));
});

export const getInternshipById = asyncHandler(async (req: Request, res: Response) => {
  const internship = await Internship.findById(req.params.id).lean();
  if (!internship) throw new AppError("Internship not found", 404, "NOT_FOUND");
  sendSuccess(res, internship);
});

export const getMyInternships = asyncHandler(async (req: Request, res: Response) => {
  const { page, limit } = getPagination(req);
  const q = req.query as Record<string, string>;
  // find company first to get companyId
  const { Company } = await import("../models/Company");
  const company = await Company.findOne({ userId: req.user!.userId }).lean();
  if (!company) throw new AppError("Company profile not found", 404, "NOT_FOUND");
  const { data, total } = await internshipService.getInternships({
    page, limit, companyId: String(company._id), ...q,
  });
  sendList(res, data, buildPaginationMeta(page, limit, total));
});

export const approveInternship = asyncHandler(async (req: Request, res: Response) => {
  const internship = await internshipService.approveInternship(req.params.id, req.user!.userId);
  await createAuditLog({
    actorId: req.user!.userId, actorName: req.user!.name, actorRole: "admin",
    action: "APPROVE", entity: "Internship", entityId: req.params.id,
    entityLabel: internship.title,
    description: `Internship '${internship.title}' approved`,
  });
  sendSuccess(res, internship, "Internship approved");
});

export const rejectInternship = asyncHandler(async (req: Request, res: Response) => {
  const { reason } = req.body;
  const internship = await internshipService.rejectInternship(req.params.id, reason ?? "");
  await createAuditLog({
    actorId: req.user!.userId, actorName: req.user!.name, actorRole: "admin",
    action: "REJECT", entity: "Internship", entityId: req.params.id,
    description: `Internship rejected: ${reason}`,
  });
  sendSuccess(res, internship, "Internship rejected");
});

export const getPendingInternships = asyncHandler(async (req: Request, res: Response) => {
  const { page, limit } = getPagination(req);
  const { data, total } = await internshipService.getInternships({ page, limit, status: "Pending" });
  sendList(res, data, buildPaginationMeta(page, limit, total));
});
