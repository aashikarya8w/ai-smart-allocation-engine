import mongoose        from "mongoose";
import { Swap }        from "../models/Swap";
import { Allocation }  from "../models/Allocation";
import { Student }     from "../models/Student";
import { Internship }  from "../models/Internship";
import { AppError }    from "../middleware/errorMiddleware";
import { createAuditLog } from "./auditLogService";
import { createNotification } from "./notificationService";
import { calculateScore }     from "../utils/scoreCalculator";
import { Rule }               from "../models/Rule";

export async function requestSwap(params: {
  requestingStudentUserId: string;
  targetStudentId:          string;
  reason:                   string;
}) {
  const { requestingStudentUserId, targetStudentId, reason } = params;

  const studentA = await Student.findOne({ userId: requestingStudentUserId });
  const studentB = await Student.findById(targetStudentId);
  if (!studentA || !studentB) throw new AppError("Student not found", 404, "NOT_FOUND");

  const [allocA, allocB] = await Promise.all([
    Allocation.findOne({ studentId: studentA._id, status: "Approved" }).lean(),
    Allocation.findOne({ studentId: studentB._id, status: "Approved" }).lean(),
  ]);
  if (!allocA) throw new AppError("You do not have an approved allocation", 400, "NO_ALLOCATION");
  if (!allocB) throw new AppError("Target student does not have an approved allocation", 400, "NO_ALLOCATION");

  // Check cross-eligibility
  const rule    = await Rule.findOne({ type: "matching", isActive: true }).lean();
  const weights = (rule?.weights as { skillMatch:number; qualification:number; location:number; interest:number; experience:number } | undefined)
    ?? { skillMatch:40, qualification:20, location:15, interest:15, experience:10 };

  const internshipA = await Internship.findById(allocA.internshipId).lean();
  const internshipB = await Internship.findById(allocB.internshipId).lean();

  if (!internshipA || !internshipB) throw new AppError("Internship not found", 404, "NOT_FOUND");

  const buildSP = (s: InstanceType<typeof Student>) => ({
    skills: s.skills.map((sk: { name: string }) => sk.name),
    interests: s.interests, preferredLocations: s.preferredLocations,
    preferredSectors: s.preferredSectors, preferredWorkMode: s.preferredWorkMode,
    cgpa: s.cgpa, graduationYear: s.graduationYear, branch: s.branch,
    degree: s.degree, city: s.city ?? "", state: s.state ?? "",
    experienceCount: (s.projects?.length ?? 0) + (s.previousInternships?.length ?? 0),
  });
  const buildIP = (i: NonNullable<typeof internshipA>) => ({
    requiredSkills: i.requiredSkills, sector: i.sector,
    location: `${i.city}, ${i.state}`, city: i.city, state: i.state,
    workMode: i.workMode, minimumCGPA: i.minimumCGPA,
    eligibleBranches: i.eligibleBranches, qualification: i.qualification,
  });

  const scoreAForB = calculateScore(buildSP(studentA), buildIP(internshipB), weights);
  const scoreBForA = calculateScore(buildSP(studentB), buildIP(internshipA), weights);

  const bothEligible = scoreAForB.isEligible && scoreBForA.isEligible;
  const details = bothEligible
    ? `Student A eligible for Internship B (score ${scoreAForB.totalScore}). Student B eligible for Internship A (score ${scoreBForA.totalScore}).`
    : `Eligibility check failed. A→B: ${scoreAForB.isEligible}, B→A: ${scoreBForA.isEligible}`;

  const swap = await Swap.create({
    requestedBy:   studentA._id,
    studentAId:    studentA._id,
    studentBId:    studentB._id,
    internshipAId: allocA.internshipId,
    internshipBId: allocB.internshipId,
    allocationAId: allocA._id,
    allocationBId: allocB._id,
    reason,
    eligibilityCheck: { studentAEligible: scoreAForB.isEligible, studentBEligible: scoreBForA.isEligible, details },
    status: "Pending",
  });

  return { swap, eligibilityCheck: { bothEligible, details } };
}

export async function approveSwap(swapId: string, adminId: string, adminName: string, notes?: string) {
  const swap = await Swap.findById(swapId);
  if (!swap) throw new AppError("Swap not found", 404, "NOT_FOUND");
  if (swap.status !== "Pending") throw new AppError("Swap is not pending", 400, "INVALID_STATUS");
  if (!swap.eligibilityCheck.studentAEligible || !swap.eligibilityCheck.studentBEligible) {
    throw new AppError("Cannot approve — eligibility check failed", 400, "NOT_ELIGIBLE");
  }

  const desc = (mongoose.connection as any).client?.topology?.description;
  const supportsTransactions = Boolean(desc?.setName || desc?.type === "ReplicaSetWithPrimary" || desc?.type === "Sharded");
  const session = supportsTransactions ? await mongoose.startSession().catch(() => null) : null;
  if (session) session.startTransaction();
  try {
    await Allocation.findByIdAndUpdate(swap.allocationAId,
      { internshipId: swap.internshipBId }, session ? { session } : {});
    await Allocation.findByIdAndUpdate(swap.allocationBId,
      { internshipId: swap.internshipAId }, session ? { session } : {});

    swap.status     = "Approved";
    swap.reviewedBy = new mongoose.Types.ObjectId(adminId);
    swap.reviewNotes= notes;
    swap.reviewedAt = new Date();
    await swap.save(session ? { session } : {});

    if (session) await session.commitTransaction();
  } catch (err) {
    if (session) await session.abortTransaction();
    throw err;
  } finally {
    if (session) session.endSession();
  }

  await createAuditLog({
    actorId: adminId, actorName: adminName, actorRole: "admin",
    action: "APPROVE", entity: "Swap", entityId: swapId,
    description: `Swap approved between students`,
  });

  return swap;
}

export async function rejectSwap(swapId: string, adminId: string, adminName: string, notes?: string) {
  const swap = await Swap.findById(swapId);
  if (!swap) throw new AppError("Swap not found", 404, "NOT_FOUND");
  swap.status     = "Rejected";
  swap.reviewedBy = new mongoose.Types.ObjectId(adminId);
  swap.reviewNotes= notes;
  swap.reviewedAt = new Date();
  return swap.save();
}

export async function getSwaps(filters: { page: number; limit: number; status?: string }) {
  const { page, limit, status } = filters;
  const query: Record<string, unknown> = {};
  if (status) query.status = status;
  const skip  = (page - 1) * limit;
  const total = await Swap.countDocuments(query);
  const data  = await Swap.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean();
  return { data, total };
}
