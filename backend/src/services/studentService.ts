import { Student, IStudent } from "../models/Student";
import { Application }       from "../models/Application";
import { Allocation }        from "../models/Allocation";
import { Recommendation }    from "../models/Recommendation";
import { AppError }          from "../middleware/errorMiddleware";

function calcCompletion(s: Partial<IStudent>): number {
  let score = 0;
  if (s.fullName)              score += 10;
  if (s.phone)                 score += 5;
  if (s.dateOfBirth)           score += 5;
  if (s.state && s.city)       score += 5;
  if (s.university)            score += 10;
  if (s.branch)                score += 10;
  if (s.cgpa)                  score += 5;
  if (s.education?.length)     score += 10;
  if ((s.skills?.length ?? 0) >= 3) score += 15;
  if (s.interests?.length)     score += 5;
  if (s.preferredLocations?.length) score += 5;
  if (s.resumeUrl)             score += 10;
  if (s.linkedinUrl)           score += 5;
  return Math.min(100, score);
}

export async function getStudentByUserId(userId: string) {
  const s = await Student.findOne({ userId }).lean();
  if (!s) throw new AppError("Student profile not found", 404, "NOT_FOUND");
  return s;
}

export async function updateStudentProfile(userId: string, data: Partial<IStudent>) {
  const student = await Student.findOne({ userId });
  if (!student) throw new AppError("Student profile not found", 404, "NOT_FOUND");
  Object.assign(student, data);
  student.profileCompletion = calcCompletion(student);
  return student.save();
}

export async function updateSkills(userId: string, skills: IStudent["skills"]) {
  return Student.findOneAndUpdate(
    { userId },
    { $set: { skills } },
    { new: true }
  );
}

export async function updateEducation(userId: string, education: IStudent["education"]) {
  return Student.findOneAndUpdate(
    { userId },
    { $set: { education } },
    { new: true }
  );
}

export async function getDashboard(userId: string) {
  const student = await Student.findOne({ userId }).lean();
  if (!student) throw new AppError("Profile not found", 404, "NOT_FOUND");

  const [apps, allocs, recs] = await Promise.all([
    Application.find({ studentId: student._id }).sort({ appliedAt: -1 }).limit(5).lean(),
    Allocation.find({ studentId: student._id }).sort({ createdAt: -1 }).lean(),
    Recommendation.find({ studentId: student._id }).sort({ matchScore: -1 }).limit(5).lean(),
  ]);

  const active = allocs.find((a) => a.status === "Approved");

  return {
    student,
    stats: {
      applicationsCount:   apps.length,
      shortlistedCount:    apps.filter((a) => a.status === "Shortlisted").length,
      allocationsCount:    allocs.filter((a) => a.status === "Approved").length,
      recommendationsCount:recs.length,
      topMatchScore:       recs[0]?.matchScore ?? 0,
    },
    recentApplications: apps,
    topRecommendations: recs,
    activeAllocation:   active ?? null,
  };
}

export async function getStudentsList(filters: {
  page: number; limit: number; search?: string;
  status?: string; branch?: string;
}) {
  const { page, limit, search, status, branch } = filters;
  const query: Record<string, unknown> = {};
  if (status) query.verificationStatus = status;
  if (branch) query.branch = branch;
  if (search) {
    query.$or = [
      { fullName:   { $regex: search, $options: "i" } },
      { email:      { $regex: search, $options: "i" } },
      { university: { $regex: search, $options: "i" } },
    ];
  }
  const skip  = (page - 1) * limit;
  const total = await Student.countDocuments(query);
  const data  = await Student.find(query).skip(skip).limit(limit).lean();
  return { data, total };
}
