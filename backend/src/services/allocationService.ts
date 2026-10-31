import mongoose from "mongoose";
import { Allocation }  from "../models/Allocation";
import { Application } from "../models/Application";
import { Internship }  from "../models/Internship";
import { Student }     from "../models/Student";
import { Rule }        from "../models/Rule";
import { calculateScore, ScoreWeights } from "../utils/scoreCalculator";
import { createNotification } from "./notificationService";
import { createAuditLog }     from "./auditLogService";
import { AppError }           from "../middleware/errorMiddleware";

async function getWeights(): Promise<ScoreWeights> {
  const rule = await Rule.findOne({ type: "matching", isActive: true }).lean();
  if (rule?.weights) return rule.weights as ScoreWeights;
  return { skillMatch: 40, qualification: 20, location: 15, interest: 15, experience: 10 };
}

async function getEligibilityCriteria() {
  const rule = await Rule.findOne({ type: "eligibility", isActive: true }).lean();
  return rule?.eligibilityCriteria ?? {
    minimumCGPA: 6.0, minimumSkills: 2,
    requireResume: false, requireVerification: false, allowedBranches: [],
  };
}

function buildStudentProfile(s: InstanceType<typeof Student>) {
  return {
    skills: s.skills.map((sk: { name: string }) => sk.name),
    interests: s.interests, preferredLocations: s.preferredLocations,
    preferredSectors: s.preferredSectors, preferredWorkMode: s.preferredWorkMode,
    cgpa: s.cgpa, graduationYear: s.graduationYear, branch: s.branch,
    degree: s.degree, city: s.city ?? "", state: s.state ?? "",
    experienceCount: (s.projects?.length ?? 0) + (s.previousInternships?.length ?? 0),
  };
}

function buildInternshipProfile(i: InstanceType<typeof Internship>) {
  return {
    requiredSkills: i.requiredSkills, sector: i.sector,
    location: `${i.city}, ${i.state}`, city: i.city, state: i.state,
    workMode: i.workMode, minimumCGPA: i.minimumCGPA,
    eligibleBranches: i.eligibleBranches, qualification: i.qualification,
  };
}

export async function runSmartAllocation(adminId: string, adminName: string, cycle?: string) {
  const allocationCycle = cycle ?? `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`;
  const weights         = await getWeights();
  const eligibility     = await getEligibilityCriteria();

  // Fetch active internships with seats
  const internships = await Internship.find({ status: "Active", availableSeats: { $gt: 0 } });
  const results: { allocated: number; waitlisted: number; notAllocated: number } =
    { allocated: 0, waitlisted: 0, notAllocated: 0 };

  const desc = (mongoose.connection as any).client?.topology?.description;
  const supportsTransactions = Boolean(desc?.setName || desc?.type === "ReplicaSetWithPrimary" || desc?.type === "Sharded");

  for (const internship of internships) {
    let session: import("mongoose").ClientSession | null = null;
    if (supportsTransactions) {
      try {
        session = await mongoose.startSession();
        session.startTransaction();
      } catch {
        session = null;
      }
    }
    try {
      // Get applied applications (not yet allocated/rejected/withdrawn)
      const applications = await Application.find({
        internshipId: internship._id,
        status: { $in: ["Applied", "Shortlisted"] },
      }).sort({ appliedAt: 1 }).lean();

      if (applications.length === 0) {
        if (session) { await session.abortTransaction(); session.endSession(); }
        continue;
      }

      // Score each candidate
      const scored: Array<{
        app: (typeof applications)[0];
        student: InstanceType<typeof Student>;
        score: ReturnType<typeof calculateScore>;
        isEligible: boolean;
      }> = [];

      for (const app of applications) {
        const student = await Student.findById(app.studentId);
        if (!student) continue;

        // Eligibility checks
        let eligible = true;
        if (student.cgpa < eligibility.minimumCGPA) eligible = false;
        if (student.skills.length < eligibility.minimumSkills) eligible = false;
        if (eligibility.requireVerification && student.verificationStatus !== "Verified") eligible = false;

        const score = calculateScore(buildStudentProfile(student), buildInternshipProfile(internship), weights);
        if (!score.isEligible) eligible = false;

        scored.push({ app, student, score, isEligible: eligible });
      }

      // Sort: eligible first, then by totalScore desc, then by cgpa, then by appliedAt
      scored.sort((a, b) => {
        if (a.isEligible !== b.isEligible) return a.isEligible ? -1 : 1;
        if (b.score.totalScore !== a.score.totalScore) return b.score.totalScore - a.score.totalScore;
        if (b.student.cgpa !== a.student.cgpa) return b.student.cgpa - a.student.cgpa;
        return new Date(a.app.appliedAt).getTime() - new Date(b.app.appliedAt).getTime();
      });

      let availableSeats = internship.availableSeats;
      let rank           = 1;

      for (const { app, student, score, isEligible } of scored) {
        // Check existing allocation for this cycle
        const existingAlloc = await Allocation.findOne({
          studentId: student._id, allocationCycle,
          status: { $in: ["Approved", "Recommended", "Pending"] },
        }).session(session ?? null);
        if (existingAlloc) continue;

        let status: "Recommended" | "Waitlisted" | "Cancelled" = "Cancelled";
        const decisionReasons: string[] = [];

        if (!isEligible) {
          status = "Cancelled";
          decisionReasons.push("Candidate did not meet eligibility criteria");
          if (score.reasons.length) decisionReasons.push(...score.reasons.filter(r => r.startsWith("CGPA") || r.startsWith("Branch")));
          results.notAllocated++;
        } else if (availableSeats > 0) {
          status = "Recommended";
          availableSeats--;
          decisionReasons.push(`Eligible candidate — rank ${rank}`);
          decisionReasons.push(`Suitability score: ${score.totalScore}`);
          decisionReasons.push(`Skills matched: ${score.matchedSkills.join(", ") || "none"}`);
          if (score.reasons.length) decisionReasons.push(...score.reasons);
          results.allocated++;
        } else {
          status = "Waitlisted";
          decisionReasons.push("Candidate was eligible");
          decisionReasons.push(`Suitability score: ${score.totalScore}`);
          decisionReasons.push("Internship seats were full");
          decisionReasons.push("Higher-ranked eligible candidates occupied available seats");
          results.waitlisted++;
        }

        // Upsert allocation
        await Allocation.findOneAndUpdate(
          { studentId: student._id, internshipId: internship._id, allocationCycle },
          {
            studentId:       student._id,
            internshipId:    internship._id,
            companyId:       internship.companyId,
            studentName:     student.fullName,
            internshipTitle: internship.title,
            companyName:     internship.companyName,
            location:        `${internship.city}, ${internship.state}`,
            workMode:        internship.workMode,
            startDate:       internship.startDate,
            endDate:         internship.endDate,
            stipend:         internship.stipendMin,
            matchScore:      score.totalScore,
            scoreBreakdown: {
              skillMatch:    score.skillScore,
              qualification: score.qualificationScore,
              location:      score.locationScore,
              interest:      score.interestScore,
              experience:    score.experienceScore,
            },
            allocationRank:   rank,
            selectionReasons: decisionReasons,
            status,
            allocationCycle,
          },
          { upsert: true, new: true, ...(session ? { session } : {}) }
        );

        if (status === "Recommended") {
          await Application.findByIdAndUpdate(
            app._id, { status: "Allocated", allocatedAt: new Date() },
            session ? { session } : {}
          );
          rank++;
        }

        // Notify student
        if (status !== "Cancelled") {
          const userId = student.userId;
          const notifType = status === "Recommended" ? "ALLOCATION" : "ALLOCATION";
          await createNotification({
            userId,
            title:   status === "Recommended" ? "Internship Allocated!" : "Waitlisted",
            message: status === "Recommended"
              ? `Congratulations! You have been allocated to ${internship.title} at ${internship.companyName}.`
              : `You are on the waitlist for ${internship.title} at ${internship.companyName}.`,
            type: notifType,
            relatedId: internship._id as unknown as string,
          });
        }
      }

      // Atomic seat update
      await Internship.findByIdAndUpdate(
        internship._id,
        { availableSeats: Math.max(0, internship.availableSeats - results.allocated) },
        session ? { session } : {}
      );

      if (session) await session.commitTransaction();
    } catch (err) {
      if (session) {
        try { await session.abortTransaction(); } catch { /* ignore abort error */ }
      }
      // Log but don't rethrow — allow other internships to process
      const { logger } = await import("../utils/logger");
      logger.warn(`Allocation failed for internship ${String(internship._id)}:`, err);
    } finally {
      if (session) {
        try { session.endSession(); } catch { /* ignore */ }
      }
    }
  }

  await createAuditLog({
    actorId:     adminId,
    actorName:   adminName,
    actorRole:   "admin",
    action:      "RUN_ALLOCATION",
    entity:      "Allocation",
    description: `Smart allocation run for cycle ${allocationCycle}. Allocated: ${results.allocated}, Waitlisted: ${results.waitlisted}, Not allocated: ${results.notAllocated}`,
    status:      "Success",
  });

  return { allocationCycle, ...results };
}

export async function approveAllocation(id: string, adminId: string, adminName: string, notes?: string) {
  const alloc = await Allocation.findById(id);
  if (!alloc) throw new AppError("Allocation not found", 404, "NOT_FOUND");
  if (alloc.status !== "Recommended" && alloc.status !== "Pending") {
    throw new AppError("Allocation cannot be approved in current state", 400, "INVALID_STATUS");
  }
  alloc.status     = "Approved";
  alloc.approvedAt = new Date();
  alloc.reviewedBy = adminName;
  alloc.reviewedAt = new Date();
  if (notes) alloc.reviewNotes = notes;
  await alloc.save();

  await createAuditLog({
    actorId: adminId, actorName: adminName, actorRole: "admin",
    action: "APPROVE", entity: "Allocation", entityId: id,
    description: `Allocation approved for ${alloc.studentName} → ${alloc.internshipTitle}`,
  });

  await createNotification({
    userId: (await Student.findById(alloc.studentId))?.userId ?? alloc.studentId,
    title: "Allocation Approved",
    message: `Your allocation to ${alloc.internshipTitle} at ${alloc.companyName} has been approved.`,
    type: "ALLOCATION",
  });

  return alloc;
}

export async function rejectAllocation(id: string, adminId: string, adminName: string, notes?: string) {
  const alloc = await Allocation.findById(id);
  if (!alloc) throw new AppError("Allocation not found", 404, "NOT_FOUND");
  alloc.status     = "Rejected";
  alloc.reviewedBy = adminName;
  alloc.reviewedAt = new Date();
  if (notes) alloc.reviewNotes = notes;
  await alloc.save();

  await createAuditLog({
    actorId: adminId, actorName: adminName, actorRole: "admin",
    action: "REJECT", entity: "Allocation", entityId: id,
    description: `Allocation rejected for ${alloc.studentName}`,
  });
  return alloc;
}

export async function getAllocations(filters: {
  page: number; limit: number; status?: string; cycle?: string; search?: string;
}) {
  const { page, limit, status, cycle, search } = filters;
  const query: Record<string, unknown> = {};
  if (status) query.status = status;
  if (cycle)  query.allocationCycle = cycle;
  if (search) query.$or = [
    { studentName:    { $regex: search, $options: "i" } },
    { internshipTitle:{ $regex: search, $options: "i" } },
    { companyName:    { $regex: search, $options: "i" } },
  ];
  const skip  = (page - 1) * limit;
  const total = await Allocation.countDocuments(query);
  const data  = await Allocation.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean();
  return { data, total };
}
