import { Student }          from "../models/Student";
import { Internship }        from "../models/Internship";
import { Application }       from "../models/Application";
import { AssessmentAttempt } from "../models/AssessmentAttempt";
import { AppError }          from "../middleware/errorMiddleware";
import { calculateScore }    from "../utils/scoreCalculator";
import { Rule }              from "../models/Rule";

/**
 * Suitability score is SEPARATE from match score.
 * It combines match score + assessment performance + project depth.
 */
export async function getSuitabilityScore(studentId: string, internshipId: string) {
  const [student, internship] = await Promise.all([
    Student.findById(studentId),
    Internship.findById(internshipId),
  ]);
  if (!student)    throw new AppError("Student not found",    404, "NOT_FOUND");
  if (!internship) throw new AppError("Internship not found", 404, "NOT_FOUND");

  const rule    = await Rule.findOne({ type: "matching", isActive: true }).lean();
  const weights = rule?.weights ?? { skillMatch:40, qualification:20, location:15, interest:15, experience:10 };

  const matchResult = calculateScore(
    {
      skills:             student.skills.map((s: { name: string }) => s.name),
      interests:          student.interests,
      preferredLocations: student.preferredLocations,
      preferredSectors:   student.preferredSectors,
      preferredWorkMode:  student.preferredWorkMode,
      cgpa:               student.cgpa,
      graduationYear:     student.graduationYear,
      branch:             student.branch,
      degree:             student.degree,
      city:               student.city ?? "",
      state:              student.state ?? "",
      experienceCount:    (student.projects?.length ?? 0) + (student.previousInternships?.length ?? 0),
    },
    {
      requiredSkills:   internship.requiredSkills,
      sector:           internship.sector,
      location:         `${internship.city}, ${internship.state}`,
      city:             internship.city,
      state:            internship.state,
      workMode:         internship.workMode,
      minimumCGPA:      internship.minimumCGPA,
      eligibleBranches: internship.eligibleBranches,
      qualification:    internship.qualification,
    },
    weights as { skillMatch:number; qualification:number; location:number; interest:number; experience:number }
  );

  // Assessment bonus
  const attempt = await AssessmentAttempt.findOne({
    studentId: student._id, internshipId: internship._id, status: "Submitted",
  }).lean();
  const assessmentScore = attempt?.percentage ?? 0;

  // Suitability = 70% match + 20% assessment + 10% project richness
  const projectScore   = Math.min(100, ((student.projects?.length ?? 0) * 20));
  const suitabilityScore = Math.round(
    matchResult.totalScore * 0.70 +
    assessmentScore        * 0.20 +
    projectScore           * 0.10
  );

  return {
    studentId,
    internshipId,
    matchScore:       matchResult.totalScore,
    assessmentScore,
    projectScore,
    suitabilityScore: Math.min(100, suitabilityScore),
    breakdown: {
      skillMatch:    matchResult.skillScore,
      qualification: matchResult.qualificationScore,
      location:      matchResult.locationScore,
      interest:      matchResult.interestScore,
      experience:    matchResult.experienceScore,
      assessment:    assessmentScore,
      projects:      projectScore,
    },
    isEligible:   matchResult.isEligible,
    matchedSkills:matchResult.matchedSkills,
    missingSkills:matchResult.missingSkills,
    reasons:      matchResult.reasons,
  };
}

export async function getSuitabilityByApplication(applicationId: string) {
  const app = await Application.findById(applicationId).lean();
  if (!app) throw new AppError("Application not found", 404, "NOT_FOUND");
  return getSuitabilityScore(String(app.studentId), String(app.internshipId));
}
