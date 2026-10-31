import { Request, Response } from "express";
import { asyncHandler, AppError } from "../middleware/errorMiddleware";
import * as analyticsService from "../services/analyticsService";
import { sendSuccess } from "../utils/apiResponse";
import { Company } from "../models/Company";

export const getAdminAnalytics = asyncHandler(async (_req: Request, res: Response) => {
  const data = await analyticsService.getAdminAnalytics();
  sendSuccess(res, data);
});

export const getAdminStudentsAnalytics = asyncHandler(async (_req: Request, res: Response) => {
  const { Student } = await import("../models/Student");
  const [total, verified, pending, active] = await Promise.all([
    Student.countDocuments(),
    Student.countDocuments({ verificationStatus: "Verified" }),
    Student.countDocuments({ verificationStatus: "Pending" }),
    Student.countDocuments({ isActive: true }),
  ]);
  const byBranch = await Student.aggregate([
    { $group: { _id: "$branch", count: { $sum: 1 } } },
    { $sort: { count: -1 } }, { $limit: 10 },
  ]);
  const byState = await Student.aggregate([
    { $group: { _id: "$state", count: { $sum: 1 } } },
    { $sort: { count: -1 } }, { $limit: 15 },
  ]);
  sendSuccess(res, { total, verified, pending, active, byBranch, byState });
});

export const getAdminCompaniesAnalytics = asyncHandler(async (_req: Request, res: Response) => {
  const { Company }   = await import("../models/Company");
  const { Internship }= await import("../models/Internship");
  const [total, verified, active] = await Promise.all([
    Company.countDocuments(),
    Company.countDocuments({ verificationStatus: "Verified" }),
    Company.countDocuments({ isActive: true }),
  ]);
  const byIndustry = await Company.aggregate([
    { $group: { _id: "$industry", count: { $sum: 1 } } },
    { $sort: { count: -1 } }, { $limit: 10 },
  ]);
  const internshipsPerCompany = await Internship.aggregate([
    { $group: { _id: "$companyId", total: { $sum: 1 } } },
    { $group: { _id: null, avg: { $avg: "$total" } } },
  ]);
  sendSuccess(res, { total, verified, active, byIndustry, avgInternshipsPerCompany: internshipsPerCompany[0]?.avg ?? 0 });
});

export const getAdminInternshipsAnalytics = asyncHandler(async (_req: Request, res: Response) => {
  const { Internship } = await import("../models/Internship");
  const [total, active, pending, closed] = await Promise.all([
    Internship.countDocuments(),
    Internship.countDocuments({ status: "Active" }),
    Internship.countDocuments({ status: "Pending" }),
    Internship.countDocuments({ status: "Closed" }),
  ]);
  const bySector = await Internship.aggregate([
    { $group: { _id: "$sector", count: { $sum: 1 }, totalSeats: { $sum: "$totalSeats" } } },
    { $sort: { count: -1 } }, { $limit: 10 },
  ]);
  const byWorkMode = await Internship.aggregate([
    { $group: { _id: "$workMode", count: { $sum: 1 } } },
  ]);
  sendSuccess(res, { total, active, pending, closed, bySector, byWorkMode });
});

export const getAdminApplicationsAnalytics = asyncHandler(async (_req: Request, res: Response) => {
  const { Application } = await import("../models/Application");
  const statuses = ["Applied","Shortlisted","Rejected","Waitlisted","Allocated","Withdrawn"];
  const counts   = await Promise.all(statuses.map(s => Application.countDocuments({ status: s })));
  const total    = await Application.countDocuments();
  const avgScore = await Application.aggregate([{ $group: { _id: null, avg: { $avg: "$matchScore" } } }]);
  const byStatus = statuses.map((s, i) => ({ status: s, count: counts[i] }));
  sendSuccess(res, { total, byStatus, averageMatchScore: Math.round(avgScore[0]?.avg ?? 0) });
});

export const getAdminAllocationsAnalytics = asyncHandler(async (_req: Request, res: Response) => {
  const { Allocation } = await import("../models/Allocation");
  const { Internship } = await import("../models/Internship");
  const statuses = ["Pending","Recommended","Approved","Rejected","Cancelled"];
  const counts   = await Promise.all(statuses.map(s => Allocation.countDocuments({ status: s })));
  const total    = await Allocation.countDocuments();
  const seats    = await Internship.aggregate([{ $group: { _id: null, total: { $sum: "$totalSeats" }, avail: { $sum: "$availableSeats" } } }]);
  const approved = counts[statuses.indexOf("Approved")];
  const seatData = seats[0] ?? { total: 0, avail: 0 };
  sendSuccess(res, {
    total,
    byStatus: statuses.map((s, i) => ({ status: s, count: counts[i] })),
    totalSeats: seatData.total,
    allocatedSeats: seatData.total - seatData.avail,
    seatUtilization: seatData.total > 0 ? Math.round(((seatData.total - seatData.avail) / seatData.total) * 100) : 0,
    allocationRate:  seatData.total > 0 ? Math.round((approved / seatData.total) * 100) : 0,
  });
});

export const getCompanyAnalytics = asyncHandler(async (req: Request, res: Response) => {
  const company = await Company.findOne({ userId: req.user!.userId }).lean();
  if (!company) throw new AppError("Company not found", 404, "NOT_FOUND");
  const data = await analyticsService.getCompanyAnalytics(String(company._id));
  sendSuccess(res, data);
});

export const getStudentAnalytics = asyncHandler(async (req: Request, res: Response) => {
  const { Student }     = await import("../models/Student");
  const { Application } = await import("../models/Application");
  const { Allocation }  = await import("../models/Allocation");
  const { Recommendation } = await import("../models/Recommendation");
  const student = await Student.findOne({ userId: req.user!.userId }).lean();
  if (!student) throw new AppError("Profile not found", 404, "NOT_FOUND");
  const [apps, allocs, recs] = await Promise.all([
    Application.find({ studentId: student._id }).lean(),
    Allocation.find({ studentId: student._id }).lean(),
    Recommendation.find({ studentId: student._id }).lean(),
  ]);
  const byStatus = ["Applied","Shortlisted","Rejected","Waitlisted","Allocated","Withdrawn"]
    .map(s => ({ status: s, count: apps.filter(a => a.status === s).length }));
  sendSuccess(res, {
    totalApplications:   apps.length,
    totalAllocations:    allocs.filter(a => a.status === "Approved").length,
    totalRecommendations:recs.length,
    topMatchScore:       recs.length ? Math.max(...recs.map(r => r.matchScore)) : 0,
    profileCompletion:   student.profileCompletion,
    byStatus,
  });
});
