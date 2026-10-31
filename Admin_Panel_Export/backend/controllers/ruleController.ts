import { Request, Response } from "express";
import { asyncHandler, AppError } from "../middleware/errorMiddleware";
import { Rule } from "../models/Rule";
import { sendSuccess } from "../utils/apiResponse";
import { createAuditLog } from "../services/auditLogService";

export const getRules = asyncHandler(async (_req: Request, res: Response) => {
  const rules = await Rule.find({ isActive: true }).lean();
  sendSuccess(res, rules);
});

export const getMatchingRules = asyncHandler(async (_req: Request, res: Response) => {
  const rule = await Rule.findOne({ type: "matching", isActive: true }).lean();
  sendSuccess(res, rule);
});

export const getAllocationRules = asyncHandler(async (_req: Request, res: Response) => {
  const rule = await Rule.findOne({ type: "allocation", isActive: true }).lean();
  sendSuccess(res, rule);
});

export const getEligibilityRules = asyncHandler(async (_req: Request, res: Response) => {
  const rule = await Rule.findOne({ type: "eligibility", isActive: true }).lean();
  sendSuccess(res, rule);
});

export const updateMatchingRules = asyncHandler(async (req: Request, res: Response) => {
  const prev = await Rule.findOne({ type: "matching", isActive: true }).lean();
  const rule = await Rule.findOneAndUpdate(
    { type: "matching" },
    { $set: { weights: req.body, updatedBy: req.user!.name } },
    { new: true, upsert: true }
  );
  await createAuditLog({
    actorId: req.user!.userId, actorName: req.user!.name, actorRole: "admin",
    action: "UPDATE", entity: "Rule", entityId: String(rule._id),
    entityLabel: "Matching Weights",
    description: "Matching rule weights updated",
    previousValue: prev?.weights as Record<string, unknown> | undefined,
    newValue: req.body,
  });
  sendSuccess(res, rule, "Matching rules updated");
});

export const updateAllocationRules = asyncHandler(async (req: Request, res: Response) => {
  const rule = await Rule.findOneAndUpdate(
    { type: "allocation" },
    { $set: { ...req.body, updatedBy: req.user!.name } },
    { new: true, upsert: true }
  );
  await createAuditLog({
    actorId: req.user!.userId, actorName: req.user!.name, actorRole: "admin",
    action: "UPDATE", entity: "Rule", description: "Allocation rules updated",
  });
  sendSuccess(res, rule, "Allocation rules updated");
});

export const updateEligibilityRules = asyncHandler(async (req: Request, res: Response) => {
  const rule = await Rule.findOneAndUpdate(
    { type: "eligibility" },
    { $set: { eligibilityCriteria: req.body, updatedBy: req.user!.name } },
    { new: true, upsert: true }
  );
  await createAuditLog({
    actorId: req.user!.userId, actorName: req.user!.name, actorRole: "admin",
    action: "UPDATE", entity: "Rule", description: "Eligibility rules updated",
  });
  sendSuccess(res, rule, "Eligibility rules updated");
});
