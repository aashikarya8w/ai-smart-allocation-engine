import { Request, Response } from "express";
import { asyncHandler, AppError } from "../middleware/errorMiddleware";
import { Assessment }       from "../models/Assessment";
import { AssessmentAttempt } from "../models/AssessmentAttempt";
import { Company }           from "../models/Company";
import { Student }           from "../models/Student";
import { sendSuccess, sendCreated } from "../utils/apiResponse";

export const createAssessment = asyncHandler(async (req: Request, res: Response) => {
  const company = await Company.findOne({ userId: req.user!.userId }).lean();
  if (!company) throw new AppError("Company not found", 404, "NOT_FOUND");
  const assessment = await Assessment.create({ ...req.body, companyId: company._id });
  sendCreated(res, assessment, "Assessment created");
});

// Returns assessment WITHOUT correct answers
export const getAssessmentById = asyncHandler(async (req: Request, res: Response) => {
  const assessment = await Assessment.findById(req.params.id)
    .select("-questions.correctAnswer").lean();
  if (!assessment) throw new AppError("Assessment not found", 404, "NOT_FOUND");
  sendSuccess(res, assessment);
});

export const updateAssessment = asyncHandler(async (req: Request, res: Response) => {
  const company = await Company.findOne({ userId: req.user!.userId }).lean();
  if (!company) throw new AppError("Company not found", 404, "NOT_FOUND");
  const assessment = await Assessment.findOneAndUpdate(
    { _id: req.params.id, companyId: company._id },
    req.body, { new: true }
  );
  if (!assessment) throw new AppError("Assessment not found", 404, "NOT_FOUND");
  sendSuccess(res, assessment, "Assessment updated");
});

export const deleteAssessment = asyncHandler(async (req: Request, res: Response) => {
  const company = await Company.findOne({ userId: req.user!.userId }).lean();
  if (!company) throw new AppError("Company not found", 404, "NOT_FOUND");
  await Assessment.findOneAndDelete({ _id: req.params.id, companyId: company._id });
  sendSuccess(res, null, "Assessment deleted");
});

export const startAssessment = asyncHandler(async (req: Request, res: Response) => {
  const student = await Student.findOne({ userId: req.user!.userId }).lean();
  if (!student) throw new AppError("Profile not found", 404, "NOT_FOUND");

  const assessment = await Assessment.findById(req.params.id).lean();
  if (!assessment) throw new AppError("Assessment not found", 404, "NOT_FOUND");
  if (assessment.status !== "Published") throw new AppError("Assessment not available", 400, "NOT_AVAILABLE");

  const existing = await AssessmentAttempt.findOne({
    assessmentId: assessment._id, studentId: student._id,
  });
  if (existing && existing.status === "Submitted") {
    throw new AppError("You have already submitted this assessment", 409, "DUPLICATE");
  }

  const attempt = existing ?? await AssessmentAttempt.create({
    assessmentId: assessment._id,
    studentId:    student._id,
    internshipId: assessment.internshipId,
    totalMarks:   assessment.totalMarks,
    passingMarks: assessment.passingMarks,
    startedAt:    new Date(),
    status:       "In Progress",
  });

  // Return questions WITHOUT correct answers
  const questions = assessment.questions.map(q => ({
    _id:     q._id,
    question:q.question,
    type:    q.type,
    options: q.options,
    marks:   q.marks,
  }));

  sendSuccess(res, { attempt, questions, duration: assessment.duration });
});

export const submitAssessment = asyncHandler(async (req: Request, res: Response) => {
  const student = await Student.findOne({ userId: req.user!.userId }).lean();
  if (!student) throw new AppError("Profile not found", 404, "NOT_FOUND");

  const attempt = await AssessmentAttempt.findOne({
    _id: req.params.id, studentId: student._id, status: "In Progress",
  });
  if (!attempt) throw new AppError("Active attempt not found", 404, "NOT_FOUND");

  const assessment = await Assessment.findById(attempt.assessmentId);
  if (!assessment) throw new AppError("Assessment not found", 404, "NOT_FOUND");

  const { answers } = req.body as { answers: { questionId: string; answer: string | string[] }[] };

  // Score calculation
  let score = 0;
  for (const q of assessment.questions) {
    const submitted = answers.find(a => String(a.questionId) === String(q._id));
    if (!submitted) continue;
    const correct = q.correctAnswer;
    const given   = submitted.answer;
    if (Array.isArray(correct)) {
      const correctSet = new Set(correct.map(String));
      const givenArr   = Array.isArray(given) ? given : [given];
      if (givenArr.length === correct.length && givenArr.every(g => correctSet.has(g))) {
        score += q.marks;
      }
    } else if (String(given) === String(correct)) {
      score += q.marks;
    }
  }

  const percentage  = Math.round((score / assessment.totalMarks) * 100);
  const passed      = score >= assessment.passingMarks;
  const submittedAt = new Date();
  const timeTaken   = Math.round((submittedAt.getTime() - attempt.startedAt.getTime()) / 60000);

  attempt.answers     = answers.map(a => ({ questionId: a.questionId as unknown as import("mongoose").Types.ObjectId, answer: a.answer }));
  attempt.score       = score;
  attempt.percentage  = percentage;
  attempt.passed      = passed;
  attempt.submittedAt = submittedAt;
  attempt.timeTaken   = timeTaken;
  attempt.status      = "Submitted";
  await attempt.save();

  sendSuccess(res, { score, percentage, passed, totalMarks: assessment.totalMarks, timeTaken });
});

export const getAssessmentResult = asyncHandler(async (req: Request, res: Response) => {
  const student = await Student.findOne({ userId: req.user!.userId }).lean();
  if (!student) throw new AppError("Profile not found", 404, "NOT_FOUND");
  const attempt = await AssessmentAttempt.findOne({
    assessmentId: req.params.id, studentId: student._id, status: "Submitted",
  }).lean();
  if (!attempt) throw new AppError("No submitted attempt found", 404, "NOT_FOUND");
  sendSuccess(res, attempt);
});

export const getMyAssessmentResults = asyncHandler(async (req: Request, res: Response) => {
  const student = await Student.findOne({ userId: req.user!.userId }).lean();
  if (!student) throw new AppError("Profile not found", 404, "NOT_FOUND");
  const attempts = await AssessmentAttempt.find({ studentId: student._id, status: "Submitted" })
    .sort({ submittedAt: -1 }).lean();
  sendSuccess(res, attempts);
});
