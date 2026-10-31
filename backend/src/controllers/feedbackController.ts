import { Request, Response } from "express";
import { asyncHandler, AppError } from "../middleware/errorMiddleware";
import { Feedback }    from "../models/Feedback";
import { Evaluation }  from "../models/Evaluation";
import { Student }     from "../models/Student";
import { Company }     from "../models/Company";
import { Allocation }  from "../models/Allocation";
import { sendSuccess, sendCreated } from "../utils/apiResponse";

/* ── Student Feedback ────────────────────────────────────── */
export const submitFeedback = asyncHandler(async (req: Request, res: Response) => {
  const student = await Student.findOne({ userId: req.user!.userId }).lean();
  if (!student) throw new AppError("Profile not found", 404, "NOT_FOUND");

  const { allocationId } = req.body;
  const allocation = await Allocation.findOne({ _id: allocationId, studentId: student._id }).lean();
  if (!allocation) throw new AppError("Allocation not found", 404, "NOT_FOUND");

  const existing = await Feedback.findOne({ studentId: student._id, internshipId: allocation.internshipId });
  if (existing) throw new AppError("Feedback already submitted", 409, "DUPLICATE");

  const feedback = await Feedback.create({
    ...req.body,
    studentId:    student._id,
    internshipId: allocation.internshipId,
    companyId:    allocation.companyId,
    allocationId: allocation._id,
  });
  sendCreated(res, feedback, "Feedback submitted successfully");
});

export const getMyFeedback = asyncHandler(async (req: Request, res: Response) => {
  const student = await Student.findOne({ userId: req.user!.userId }).lean();
  if (!student) throw new AppError("Profile not found", 404, "NOT_FOUND");
  const feedback = await Feedback.find({ studentId: student._id }).lean();
  sendSuccess(res, feedback);
});

export const getInternshipFeedback = asyncHandler(async (req: Request, res: Response) => {
  const feedback = await Feedback.find({ internshipId: req.params.id }).lean();
  sendSuccess(res, feedback);
});

/* ── Company Evaluation ──────────────────────────────────── */
export const submitEvaluation = asyncHandler(async (req: Request, res: Response) => {
  const company = await Company.findOne({ userId: req.user!.userId }).lean();
  if (!company) throw new AppError("Company not found", 404, "NOT_FOUND");

  const { allocationId } = req.body;
  const allocation = await Allocation.findOne({ _id: allocationId, companyId: company._id }).lean();
  if (!allocation) throw new AppError("Allocation not found", 404, "NOT_FOUND");

  const existing = await Evaluation.findOne({
    studentId: allocation.studentId, internshipId: allocation.internshipId,
  });
  if (existing) throw new AppError("Evaluation already submitted", 409, "DUPLICATE");

  const evaluation = await Evaluation.create({
    ...req.body,
    studentId:    allocation.studentId,
    internshipId: allocation.internshipId,
    companyId:    company._id,
    allocationId: allocation._id,
    submittedBy:  req.user!.userId,
  });
  sendCreated(res, evaluation, "Evaluation submitted");
});

export const getStudentEvaluations = asyncHandler(async (req: Request, res: Response) => {
  const evaluations = await Evaluation.find({ studentId: req.params.id }).lean();
  sendSuccess(res, evaluations);
});

export const getInternshipEvaluations = asyncHandler(async (req: Request, res: Response) => {
  const company = await Company.findOne({ userId: req.user!.userId }).lean();
  if (!company) throw new AppError("Company not found", 404, "NOT_FOUND");
  const evaluations = await Evaluation.find({
    internshipId: req.params.id, companyId: company._id,
  }).lean();
  sendSuccess(res, evaluations);
});
