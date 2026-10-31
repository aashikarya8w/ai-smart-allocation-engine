import { Request, Response } from "express";
import { asyncHandler, AppError } from "../middleware/errorMiddleware";
import * as auditService from "../services/auditLogService";
import { sendSuccess, sendList } from "../utils/apiResponse";
import { getPagination, buildPaginationMeta } from "../utils/pagination";
import { AuditLog } from "../models/AuditLog";

export const getAuditLogs = asyncHandler(async (req: Request, res: Response) => {
  const { page, limit } = getPagination(req);
  const { search, action, entity, role } = req.query as Record<string, string>;
  const { data, total } = await auditService.getAuditLogs({ page, limit, search, action, entity, role });
  sendList(res, data, buildPaginationMeta(page, limit, total));
});

export const getAuditLogById = asyncHandler(async (req: Request, res: Response) => {
  const log = await AuditLog.findById(req.params.id).lean();
  if (!log) throw new AppError("Audit log not found", 404, "NOT_FOUND");
  sendSuccess(res, log);
});
