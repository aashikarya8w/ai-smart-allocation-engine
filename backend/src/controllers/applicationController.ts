import { Request, Response } from "express";
import { asyncHandler, AppError } from "../middleware/errorMiddleware";
import * as appService from "../services/applicationService";
import { sendSuccess, sendCreated, sendList } from "../utils/apiResponse";
import { getPagination, buildPaginationMeta } from "../utils/pagination";
import { Application } from "../models/Application";
import { createNotification } from "../services/notificationService";
import { Student } from "../models/Student";

export const applyForInternship = asyncHandler(async (req: Request, res: Response) => {
  const { internshipId, resumeId } = req.body;
  const application = await appService.applyForInternship(req.user!.userId, internshipId, resumeId);
  sendCreated(res, application, "Application submitted successfully");
});

export const withdrawApplication = asyncHandler(async (req: Request, res: Response) => {
  const app = await appService.withdrawApplication(req.user!.userId, req.params.id);
  sendSuccess(res, app, "Application withdrawn");
});

export const getMyApplications = asyncHandler(async (req: Request, res: Response) => {
  const { page, limit } = getPagination(req);
  const { status } = req.query as { status?: string };
  const { data, total } = await appService.getMyApplications(req.user!.userId, { page, limit, status });
  sendList(res, data, buildPaginationMeta(page, limit, total));
});

export const getApplicationById = asyncHandler(async (req: Request, res: Response) => {
  const app = await Application.findById(req.params.id).lean();
  if (!app) throw new AppError("Application not found", 404, "NOT_FOUND");
  sendSuccess(res, app);
});

export const listApplications = asyncHandler(async (req: Request, res: Response) => {
  const { page, limit } = getPagination(req);
  const q = req.query as Record<string, string>;
  const { data, total } = await appService.getApplicationsList({ page, limit, ...q });
  sendList(res, data, buildPaginationMeta(page, limit, total));
});

export const getCompanyApplications = asyncHandler(async (req: Request, res: Response) => {
  const { Company } = await import("../models/Company");
  const company = await Company.findOne({ userId: req.user!.userId }).lean();
  if (!company) throw new AppError("Company not found", 404, "NOT_FOUND");
  const { page, limit } = getPagination(req);
  const { status } = req.query as { status?: string };
  const { data, total } = await appService.getApplicationsList({
    page, limit, companyId: String(company._id), status,
  });
  sendList(res, data, buildPaginationMeta(page, limit, total));
});

export const updateApplicationStatus = asyncHandler(async (req: Request, res: Response) => {
  const { status, notes } = req.body;
  const { app } = await appService.updateApplicationStatus(req.params.id, status, notes);

  // Notify student
  const student = await Student.findById(app.studentId).lean();
  if (student) {
    const msgs: Record<string, string> = {
      Shortlisted: `Great news! Your application for ${app.internshipTitle} has been shortlisted.`,
      Rejected:    `Your application for ${app.internshipTitle} was not selected.`,
      Allocated:   `Congratulations! You have been allocated to ${app.internshipTitle}.`,
    };
    if (msgs[status]) {
      await createNotification({
        userId: student.userId,
        title:  status,
        message: msgs[status],
        type:   status === "Shortlisted" ? "SHORTLIST" : "APPLICATION",
      });
    }
  }

  sendSuccess(res, app, "Application status updated");
});
