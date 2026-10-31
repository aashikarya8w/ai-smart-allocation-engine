import { Request, Response } from "express";
import { asyncHandler, AppError } from "../middleware/errorMiddleware";
import { sendSuccess, sendCreated } from "../utils/apiResponse";
import * as skillGapService   from "../services/skillGapService";
import * as suitabilityService from "../services/suitabilityService";
import * as readinessService  from "../services/readinessService";
import * as simulatorService  from "../services/simulatorService";
import * as roadmapService    from "../services/careerRoadmapService";
import * as verificationService from "../services/verificationService";
import * as checkInService    from "../services/checkInService";
import * as swapService       from "../services/swapService";
import * as outcomeService    from "../services/outcomeService";
import { Student }            from "../models/Student";
import { getPagination, buildPaginationMeta } from "../utils/pagination";
import { sendList } from "../utils/apiResponse";

/* ── Skill Gap ───────────────────────────────────────────── */
export const getStudentSkillGap = asyncHandler(async (req: Request, res: Response) => {
  const student = await Student.findOne({ userId: req.user!.userId }).lean();
  if (!student) throw new AppError("Profile not found", 404, "NOT_FOUND");
  const data = await skillGapService.getStudentSkillGap(String(student._id));
  sendSuccess(res, data);
});

export const getSkillGapForInternship = asyncHandler(async (req: Request, res: Response) => {
  const student = await Student.findOne({ userId: req.user!.userId }).lean();
  if (!student) throw new AppError("Profile not found", 404, "NOT_FOUND");
  const data = await skillGapService.getSkillGapForInternship(String(student._id), req.params.internshipId);
  sendSuccess(res, data);
});

export const getSkillGapByStudentId = asyncHandler(async (req: Request, res: Response) => {
  const data = await skillGapService.getStudentSkillGap(req.params.studentId);
  sendSuccess(res, data);
});

/* ── Suitability ─────────────────────────────────────────── */
export const getSuitability = asyncHandler(async (req: Request, res: Response) => {
  const data = await suitabilityService.getSuitabilityScore(req.params.studentId, req.params.internshipId);
  sendSuccess(res, data);
});

export const getSuitabilityByApplication = asyncHandler(async (req: Request, res: Response) => {
  const data = await suitabilityService.getSuitabilityByApplication(req.params.applicationId);
  sendSuccess(res, data);
});

/* ── Readiness ───────────────────────────────────────────── */
export const getReadiness = asyncHandler(async (req: Request, res: Response) => {
  const student = await Student.findOne({ userId: req.user!.userId }).lean();
  if (!student) throw new AppError("Profile not found", 404, "NOT_FOUND");
  const internshipId = req.query.internshipId as string | undefined;
  const data = await readinessService.getReadiness(String(student._id), internshipId);
  sendSuccess(res, data);
});

/* ── Simulator ───────────────────────────────────────────── */
export const runSimulator = asyncHandler(async (req: Request, res: Response) => {
  const student = await Student.findOne({ userId: req.user!.userId }).lean();
  if (!student) throw new AppError("Profile not found", 404, "NOT_FOUND");
  const { internshipId, changes } = req.body;
  const data = await simulatorService.runSimulation({ studentId: String(student._id), internshipId, changes });
  sendSuccess(res, data);
});

/* ── Career Roadmap ──────────────────────────────────────── */
export const getRoadmap = asyncHandler(async (req: Request, res: Response) => {
  const student = await Student.findOne({ userId: req.user!.userId }).lean();
  if (!student) throw new AppError("Profile not found", 404, "NOT_FOUND");
  const roadmap = await roadmapService.getRoadmap(String(student._id));
  sendSuccess(res, roadmap);
});

export const generateRoadmap = asyncHandler(async (req: Request, res: Response) => {
  const student = await Student.findOne({ userId: req.user!.userId }).lean();
  if (!student) throw new AppError("Profile not found", 404, "NOT_FOUND");
  const { internshipId } = req.body;
  const roadmap = await roadmapService.generateRoadmap(String(student._id), internshipId);
  sendCreated(res, roadmap, "Career roadmap generated");
});

export const updateRoadmapProgress = asyncHandler(async (req: Request, res: Response) => {
  const { stepId, status } = req.body;
  const roadmap = await roadmapService.updateStepProgress(req.params.id, stepId, status);
  sendSuccess(res, roadmap, "Progress updated");
});

/* ── Verification ────────────────────────────────────────── */
export const generateQR = asyncHandler(async (req: Request, res: Response) => {
  const data = await verificationService.generateQR(req.user!.userId);
  sendSuccess(res, data);
});

export const verifyQR = asyncHandler(async (req: Request, res: Response) => {
  const { token } = req.body;
  const data = await verificationService.verifyQR(token);
  sendSuccess(res, data, data.verified ? "Verified" : "Verification failed");
});

export const verifyHardware = asyncHandler(async (req: Request, res: Response) => {
  const method = req.path.split("/").pop()?.toUpperCase() as "RFID" | "FINGERPRINT" | "FACE";
  const data = await verificationService.simulateHardwareVerification(method, req.user!.userId);
  sendSuccess(res, data);
});

/* ── Check-In ────────────────────────────────────────────── */
export const checkIn = asyncHandler(async (req: Request, res: Response) => {
  const { method, token } = req.body;
  const record = await checkInService.checkIn({ studentUserId: req.user!.userId, method, token });
  sendCreated(res, record, "Checked in successfully");
});

export const checkOut = asyncHandler(async (req: Request, res: Response) => {
  const record = await checkInService.checkOut(req.user!.userId);
  sendSuccess(res, record, "Checked out successfully");
});

export const getStudentCheckIns = asyncHandler(async (req: Request, res: Response) => {
  const data = await checkInService.getStudentCheckIns(req.user!.userId);
  sendSuccess(res, data);
});

export const getCompanyCheckIns = asyncHandler(async (req: Request, res: Response) => {
  const data = await checkInService.getCompanyCheckIns(req.user!.userId);
  sendSuccess(res, data);
});

export const getAllCheckIns = asyncHandler(async (req: Request, res: Response) => {
  const { page, limit } = getPagination(req);
  const { date } = req.query as { date?: string };
  const { data, total } = await checkInService.getAllCheckIns({ page, limit, date });
  sendList(res, data, buildPaginationMeta(page, limit, total));
});

/* ── Swaps ───────────────────────────────────────────────── */
export const requestSwap = asyncHandler(async (req: Request, res: Response) => {
  const { targetStudentId, reason } = req.body;
  const data = await swapService.requestSwap({
    requestingStudentUserId: req.user!.userId, targetStudentId, reason,
  });
  sendCreated(res, data, "Swap request submitted");
});

export const getSwaps = asyncHandler(async (req: Request, res: Response) => {
  const { page, limit } = getPagination(req);
  const { status } = req.query as { status?: string };
  const { data, total } = await swapService.getSwaps({ page, limit, status });
  sendList(res, data, buildPaginationMeta(page, limit, total));
});

export const getSwapById = asyncHandler(async (req: Request, res: Response) => {
  const { Swap } = await import("../models/Swap");
  const swap = await Swap.findById(req.params.id).lean();
  if (!swap) throw new AppError("Swap not found", 404, "NOT_FOUND");
  sendSuccess(res, swap);
});

export const approveSwap = asyncHandler(async (req: Request, res: Response) => {
  const swap = await swapService.approveSwap(req.params.id, req.user!.userId, req.user!.name, req.body.notes);
  sendSuccess(res, swap, "Swap approved");
});

export const rejectSwap = asyncHandler(async (req: Request, res: Response) => {
  const swap = await swapService.rejectSwap(req.params.id, req.user!.userId, req.user!.name, req.body.notes);
  sendSuccess(res, swap, "Swap rejected");
});

/* ── Outcomes & Insights ──────────────────────────────────── */
export const getStudentOutcomes = asyncHandler(async (req: Request, res: Response) => {
  const student = req.params.id
    ? await Student.findById(req.params.id).lean()
    : await Student.findOne({ userId: req.user!.userId }).lean();
  if (!student) throw new AppError("Student not found", 404, "NOT_FOUND");
  const outcomes = await outcomeService.getStudentOutcomes(String(student._id));
  sendSuccess(res, outcomes);
});

export const generateOutcome = asyncHandler(async (req: Request, res: Response) => {
  const { studentId, internshipId } = req.body;
  const outcome = await outcomeService.generateOutcome(studentId, internshipId);
  sendCreated(res, outcome, "Outcome generated");
});

export const getPerformanceInsights = asyncHandler(async (req: Request, res: Response) => {
  const studentId = req.params.id ??
    String((await Student.findOne({ userId: req.user!.userId }).lean())?._id);
  const insights = await outcomeService.getPerformanceInsights(studentId);
  sendSuccess(res, insights);
});

/* ── Admin Fairness ──────────────────────────────────────── */
export const getFairnessDashboard = asyncHandler(async (req: Request, res: Response) => {
  const { Allocation }  = await import("../models/Allocation");
  const { Application } = await import("../models/Application");
  const { Internship }  = await import("../models/Internship");

  const internshipId = req.params.internshipId;
  const appQuery: Record<string, unknown>   = internshipId ? { internshipId } : {};
  const allocQuery: Record<string, unknown> = internshipId ? { internshipId } : {};

  const [totalApplicants, allocations, internships] = await Promise.all([
    Application.countDocuments(appQuery),
    Allocation.find(allocQuery).lean(),
    internshipId ? Internship.find({ _id: internshipId }).lean() : Internship.find({ status: "Active" }).lean(),
  ]);

  const allocated   = allocations.filter(a => a.status === "Approved").length;
  const waitlisted  = allocations.filter(a => ["Waitlisted","Recommended"].includes(a.status)).length;
  const notAlloc    = totalApplicants - allocated - waitlisted;
  const totalSeats  = internships.reduce((s, i) => s + i.totalSeats, 0);
  const seatUtil    = totalSeats > 0 ? Math.round((allocated / totalSeats) * 100) : 0;
  const avgScore    = allocations.length > 0
    ? Math.round(allocations.reduce((s, a) => s + a.matchScore, 0) / allocations.length)
    : 0;

  sendSuccess(res, {
    totalApplicants, allocated, waitlisted, notAllocated: Math.max(0, notAlloc),
    totalSeats, seatUtilization: seatUtil, averageMatchScore: avgScore,
    scoreDist: [
      { range: "90-100", count: allocations.filter(a => a.matchScore >= 90).length },
      { range: "80-89",  count: allocations.filter(a => a.matchScore >= 80 && a.matchScore < 90).length },
      { range: "70-79",  count: allocations.filter(a => a.matchScore >= 70 && a.matchScore < 80).length },
      { range: "<70",    count: allocations.filter(a => a.matchScore < 70).length },
    ],
    note: "Fairness data is informational only. Manual review is recommended for edge cases.",
  });
});
