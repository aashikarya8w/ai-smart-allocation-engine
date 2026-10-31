import { Request, Response } from "express";
import { asyncHandler, AppError } from "../middleware/errorMiddleware";
import { SkillEvidence } from "../models/SkillEvidence";
import { Student }       from "../models/Student";
import { sendSuccess, sendCreated } from "../utils/apiResponse";

export const addEvidence = asyncHandler(async (req: Request, res: Response) => {
  const student = await Student.findOne({ userId: req.user!.userId }).lean();
  if (!student) throw new AppError("Profile not found", 404, "NOT_FOUND");

  const evidence = await SkillEvidence.create({ ...req.body, studentId: student._id });
  sendCreated(res, evidence, "Skill evidence added");
});

export const getMyEvidence = asyncHandler(async (req: Request, res: Response) => {
  const student = await Student.findOne({ userId: req.user!.userId }).lean();
  if (!student) throw new AppError("Profile not found", 404, "NOT_FOUND");
  const evidence = await SkillEvidence.find({ studentId: student._id }).sort({ createdAt: -1 }).lean();
  sendSuccess(res, evidence);
});

export const getStudentEvidence = asyncHandler(async (req: Request, res: Response) => {
  const evidence = await SkillEvidence.find({ studentId: req.params.id }).lean();
  sendSuccess(res, evidence);
});

export const updateEvidence = asyncHandler(async (req: Request, res: Response) => {
  const student = await Student.findOne({ userId: req.user!.userId }).lean();
  if (!student) throw new AppError("Profile not found", 404, "NOT_FOUND");

  const evidence = await SkillEvidence.findOneAndUpdate(
    { _id: req.params.id, studentId: student._id },
    req.body, { new: true }
  );
  if (!evidence) throw new AppError("Evidence not found", 404, "NOT_FOUND");
  sendSuccess(res, evidence, "Evidence updated");
});

export const deleteEvidence = asyncHandler(async (req: Request, res: Response) => {
  const student = await Student.findOne({ userId: req.user!.userId }).lean();
  if (!student) throw new AppError("Profile not found", 404, "NOT_FOUND");

  await SkillEvidence.findOneAndDelete({ _id: req.params.id, studentId: student._id });
  sendSuccess(res, null, "Evidence deleted");
});
