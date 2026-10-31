import { Request, Response } from "express";
import { asyncHandler } from "../middleware/errorMiddleware";
import * as companyService from "../services/companyService";
import { sendSuccess, sendList } from "../utils/apiResponse";
import { getPagination, buildPaginationMeta } from "../utils/pagination";
import { Company } from "../models/Company";
import { AppError } from "../middleware/errorMiddleware";

export const getMyProfile = asyncHandler(async (req: Request, res: Response) => {
  const company = await companyService.getCompanyByUserId(req.user!.userId);
  sendSuccess(res, company);
});

export const updateMyProfile = asyncHandler(async (req: Request, res: Response) => {
  const company = await companyService.updateCompanyProfile(req.user!.userId, req.body);
  sendSuccess(res, company, "Profile updated");
});

export const getDashboard = asyncHandler(async (req: Request, res: Response) => {
  const data = await companyService.getCompanyDashboard(req.user!.userId);
  sendSuccess(res, data);
});

export const getCompanyById = asyncHandler(async (req: Request, res: Response) => {
  const company = await Company.findById(req.params.id).lean();
  if (!company) throw new AppError("Company not found", 404, "NOT_FOUND");
  sendSuccess(res, company);
});

export const listCompanies = asyncHandler(async (req: Request, res: Response) => {
  const { page, limit } = getPagination(req);
  const { search, status, industry } = req.query as Record<string, string>;
  const { data, total } = await companyService.getCompaniesList({ page, limit, search, status, industry });
  sendList(res, data, buildPaginationMeta(page, limit, total));
});

export const verifyCompany = asyncHandler(async (req: Request, res: Response) => {
  const { status } = req.body as { status: "Verified" | "Rejected" };
  const company = await Company.findByIdAndUpdate(
    req.params.id,
    { verificationStatus: status },
    { new: true }
  );
  if (!company) throw new AppError("Company not found", 404, "NOT_FOUND");
  sendSuccess(res, company, `Company ${status.toLowerCase()}`);
});
