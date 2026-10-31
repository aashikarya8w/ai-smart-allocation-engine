import mongoose from "mongoose";
import { Application } from "../models/Application";
import { Internship }  from "../models/Internship";
import { Student }     from "../models/Student";
import { AppError }    from "../middleware/errorMiddleware";
import { matchingService } from "./matchingService";

export async function applyForInternship(
  studentUserId: string,
  internshipId: string,
  resumeId?: string
) {
  const student = await Student.findOne({ userId: studentUserId });
  if (!student) throw new AppError("Student profile not found", 404, "NOT_FOUND");

  const internship = await Internship.findById(internshipId);
  if (!internship) throw new AppError("Internship not found", 404, "NOT_FOUND");
  if (internship.status !== "Active") throw new AppError("Internship is not open for applications", 400, "CLOSED");
  if (internship.availableSeats <= 0)  throw new AppError("No seats available", 400, "NO_SEATS");
  if (internship.applicationDeadline < new Date()) {
    throw new AppError("Application deadline has passed", 400, "DEADLINE_PASSED");
  }

  // Duplicate check
  const exists = await Application.findOne({ studentId: student._id, internshipId });
  if (exists) throw new AppError("You have already applied for this internship", 409, "DUPLICATE");

  // Calculate match score
  const score = await matchingService.score(student, internship);

  const app = await Application.create({
    studentId:      student._id,
    internshipId:   internship._id,
    companyId:      internship.companyId,
    studentName:    student.fullName,
    internshipTitle:internship.title,
    companyName:    internship.companyName,
    resumeId:       resumeId ? new mongoose.Types.ObjectId(resumeId) : undefined,
    matchScore:     score.totalScore,
    scoreBreakdown: {
      skillMatch:    score.skillScore,
      qualification: score.qualificationScore,
      location:      score.locationScore,
      interest:      score.interestScore,
      experience:    score.experienceScore,
    },
    matchedSkills: score.matchedSkills,
    missingSkills: score.missingSkills,
    appliedAt:     new Date(),
  });

  await Internship.findByIdAndUpdate(internshipId, {
    $inc: { totalApplications: 1 },
  });

  return app;
}

export async function withdrawApplication(studentUserId: string, applicationId: string) {
  const student = await Student.findOne({ userId: studentUserId });
  if (!student) throw new AppError("Profile not found", 404, "NOT_FOUND");

  const app = await Application.findOne({ _id: applicationId, studentId: student._id });
  if (!app) throw new AppError("Application not found", 404, "NOT_FOUND");
  if (["Allocated","Rejected","Withdrawn"].includes(app.status)) {
    throw new AppError("Cannot withdraw this application", 400, "INVALID_STATUS");
  }

  app.status      = "Withdrawn";
  app.withdrawnAt = new Date();
  return app.save();
}

export async function getMyApplications(studentUserId: string, filters: {
  page: number; limit: number; status?: string;
}) {
  const student = await Student.findOne({ userId: studentUserId }).lean();
  if (!student) throw new AppError("Profile not found", 404, "NOT_FOUND");

  const query: Record<string, unknown> = { studentId: student._id };
  if (filters.status) query.status = filters.status;

  const skip  = (filters.page - 1) * filters.limit;
  const total = await Application.countDocuments(query);
  const data  = await Application.find(query)
    .sort({ appliedAt: -1 })
    .skip(skip)
    .limit(filters.limit)
    .lean();
  return { data, total };
}

export async function updateApplicationStatus(
  applicationId: string,
  status: string,
  notes?: string
) {
  const app = await Application.findById(applicationId);
  if (!app) throw new AppError("Application not found", 404, "NOT_FOUND");

  const prev = app.status;
  app.status = status as "Applied" | "Shortlisted" | "Rejected" | "Waitlisted" | "Allocated" | "Withdrawn";
  if (status === "Shortlisted") app.shortlistedAt = new Date();
  if (status === "Rejected")    app.rejectedAt    = new Date();
  if (notes) app.notes = notes;

  await app.save();

  if (status === "Shortlisted") {
    await Internship.findByIdAndUpdate(app.internshipId, { $inc: { shortlistedCount: 1 } });
  }
  return { app, prev };
}

export async function getApplicationsList(filters: {
  page: number; limit: number; search?: string;
  status?: string; companyId?: string; internshipId?: string;
}) {
  const { page, limit, search, status, companyId, internshipId } = filters;
  const query: Record<string, unknown> = {};
  if (status)       query.status       = status;
  if (companyId)    query.companyId    = new mongoose.Types.ObjectId(companyId);
  if (internshipId) query.internshipId = new mongoose.Types.ObjectId(internshipId);
  if (search) {
    query.$or = [
      { studentName:    { $regex: search, $options: "i" } },
      { internshipTitle:{ $regex: search, $options: "i" } },
      { companyName:    { $regex: search, $options: "i" } },
    ];
  }
  const skip  = (page - 1) * limit;
  const total = await Application.countDocuments(query);
  const data  = await Application.find(query)
    .sort({ appliedAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();
  return { data, total };
}
