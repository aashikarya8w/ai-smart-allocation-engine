import { Request, Response } from "express";
import { asyncHandler, AppError } from "../middleware/errorMiddleware";
import { matchingService } from "../services/matchingService";
import { sendSuccess } from "../utils/apiResponse";
import { Recommendation } from "../models/Recommendation";
import { Student } from "../models/Student";
import { Internship } from "../models/Internship";

export const getMyRecommendations = asyncHandler(async (req: Request, res: Response) => {
  const student = await Student.findOne({ userId: req.user!.userId }).lean();
  if (!student) throw new AppError("Profile not found", 404, "NOT_FOUND");
  const recs = await Recommendation.find({ studentId: student._id })
    .sort({ matchScore: -1 }).lean();
  sendSuccess(res, recs);
});

export const generateMyRecommendations = asyncHandler(async (req: Request, res: Response) => {
  const student = await Student.findOne({ userId: req.user!.userId }).lean();
  if (!student) throw new AppError("Profile not found", 404, "NOT_FOUND");
  const recs = await matchingService.generateRecommendations(String(student._id));
  sendSuccess(res, recs, "Recommendations generated");
});

export const runAIMatching = asyncHandler(async (req: Request, res: Response) => {
  const result = await matchingService.runForAll();
  sendSuccess(res, result, "AI Matching completed");
});

export const getMatchingResults = asyncHandler(async (req: Request, res: Response) => {
  const total = await Recommendation.countDocuments();
  const recent = await Recommendation.find()
    .sort({ generatedAt: -1 }).limit(50).lean();
  sendSuccess(res, { total, recent });
});

export const scoreStudentForInternship = asyncHandler(async (req: Request, res: Response) => {
  const { studentId, internshipId } = req.params;
  const student    = await Student.findById(studentId);
  const internship = await Internship.findById(internshipId);
  if (!student || !internship) throw new AppError("Not found", 404, "NOT_FOUND");
  const score = await matchingService.score(student, internship);
  sendSuccess(res, {
    studentId, internshipId,
    matchScore: score.totalScore,
    breakdown: {
      skills:        score.skillScore,
      qualification: score.qualificationScore,
      location:      score.locationScore,
      interest:      score.interestScore,
      experience:    score.experienceScore,
    },
    matchedSkills: score.matchedSkills,
    missingSkills: score.missingSkills,
    isEligible:    score.isEligible,
    reasons:       score.reasons,
  });
});
