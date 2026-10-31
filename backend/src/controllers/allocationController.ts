import { Request, Response } from "express";
import { asyncHandler, AppError } from "../middleware/errorMiddleware";
import * as allocService from "../services/allocationService";
import { sendSuccess, sendList } from "../utils/apiResponse";
import { getPagination, buildPaginationMeta } from "../utils/pagination";
import { Allocation } from "../models/Allocation";
import { Student }    from "../models/Student";

export const runAllocation = asyncHandler(async (req: Request, res: Response) => {
  const { cycle } = req.body;
  const result = await allocService.runSmartAllocation(
    req.user!.userId, req.user!.name, cycle
  );
  sendSuccess(res, result, "Smart allocation completed");
});

export const getAllocations = asyncHandler(async (req: Request, res: Response) => {
  const { page, limit } = getPagination(req);
  const { status, cycle, search } = req.query as Record<string, string>;
  const { data, total } = await allocService.getAllocations({ page, limit, status, cycle, search });
  sendList(res, data, buildPaginationMeta(page, limit, total));
});

export const getAllocationById = asyncHandler(async (req: Request, res: Response) => {
  const alloc = await Allocation.findById(req.params.id).lean();
  if (!alloc) throw new AppError("Allocation not found", 404, "NOT_FOUND");
  sendSuccess(res, alloc);
});

export const approveAllocation = asyncHandler(async (req: Request, res: Response) => {
  const alloc = await allocService.approveAllocation(
    req.params.id, req.user!.userId, req.user!.name, req.body.notes
  );
  sendSuccess(res, alloc, "Allocation approved");
});

export const rejectAllocation = asyncHandler(async (req: Request, res: Response) => {
  const alloc = await allocService.rejectAllocation(
    req.params.id, req.user!.userId, req.user!.name, req.body.notes
  );
  sendSuccess(res, alloc, "Allocation rejected");
});

export const getMyAllocation = asyncHandler(async (req: Request, res: Response) => {
  const student = await Student.findOne({ userId: req.user!.userId }).lean();
  if (!student) throw new AppError("Profile not found", 404, "NOT_FOUND");
  const allocations = await Allocation.find({ studentId: student._id })
    .sort({ createdAt: -1 }).lean();
  sendSuccess(res, allocations);
});

export const getCompanyAllocations = asyncHandler(async (req: Request, res: Response) => {
  const { Company } = await import("../models/Company");
  const company = await Company.findOne({ userId: req.user!.userId }).lean();
  if (!company) throw new AppError("Company not found", 404, "NOT_FOUND");
  const allocations = await Allocation.find({ companyId: company._id })
    .sort({ createdAt: -1 }).lean();
  sendSuccess(res, allocations);
});
