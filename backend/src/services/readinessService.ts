/**
 * Readiness Twin — backend scoring/simulation system.
 * NOT a real digital twin or ML model.
 * Calculates a student's readiness profile for a given internship.
 */
import { Student }          from "../models/Student";
import { Internship }       from "../models/Internship";
import { AssessmentAttempt }from "../models/AssessmentAttempt";
import { AppError }         from "../middleware/errorMiddleware";

export interface ReadinessProfile {
  overall:       number;
  skills:        number;
  assessment:    number;
  projects:      number;
  qualification: number;
  preferences:   number;
  breakdown: {
    skillsMatched:    number;
    skillsRequired:   number;
    cgpaScore:        number;
    projectCount:     number;
    assessmentPassed: boolean;
    locationMatch:    boolean;
    sectorMatch:      boolean;
  };
}

export async function getReadiness(studentId: string, internshipId?: string): Promise<ReadinessProfile> {
  const student = await Student.findById(studentId);
  if (!student) throw new AppError("Student not found", 404, "NOT_FOUND");

  let internship = internshipId
    ? await Internship.findById(internshipId).lean()
    : null;

  // Skills readiness
  const studentSkills = student.skills.map((s: { name: string }) => s.name.toLowerCase());
  let skillsMatched = studentSkills.length;
  let skillsRequired = studentSkills.length;
  let skillsScore = Math.min(100, studentSkills.length * 10);

  if (internship) {
    const required = internship.requiredSkills.map(s => s.toLowerCase());
    skillsRequired = required.length;
    skillsMatched  = required.filter(s => studentSkills.includes(s)).length;
    skillsScore    = required.length > 0
      ? Math.round((skillsMatched / required.length) * 100)
      : 100;
  }

  // Assessment readiness
  let assessmentScore = 50; // baseline if no assessment
  let assessmentPassed = false;
  if (internshipId) {
    const attempt = await AssessmentAttempt.findOne({
      studentId: student._id, internshipId, status: "Submitted",
    }).lean();
    if (attempt) {
      assessmentScore  = attempt.percentage;
      assessmentPassed = attempt.passed;
    }
  }

  // Project readiness
  const projectCount = (student.projects?.length ?? 0) + (student.previousInternships?.length ?? 0);
  const projectScore = Math.min(100, projectCount * 25);

  // Qualification readiness
  const minCGPA = internship?.minimumCGPA ?? 6.0;
  const cgpaScore = student.cgpa >= minCGPA
    ? Math.min(100, Math.round(((student.cgpa - minCGPA) / (10 - minCGPA)) * 100 + 60))
    : Math.round((student.cgpa / minCGPA) * 50);
  const qualificationScore = Math.min(100, cgpaScore);

  // Preference readiness
  let locationMatch = true;
  let sectorMatch   = true;
  if (internship) {
    const prefLoc = student.preferredLocations.map((l: string) => l.toLowerCase());
    locationMatch = prefLoc.some((l: string) =>
      l.includes(internship!.city.toLowerCase()) || internship!.state.toLowerCase().includes(l)
    ) || internship.workMode === "Remote";
    sectorMatch = student.preferredSectors.some((s: string) =>
      s.toLowerCase().includes(internship!.sector.toLowerCase()) ||
      internship!.sector.toLowerCase().includes(s.toLowerCase())
    );
  }
  const preferenceScore = Math.round(
    (locationMatch ? 50 : 20) + (sectorMatch ? 50 : 20)
  );

  const overall = Math.round(
    skillsScore      * 0.30 +
    assessmentScore  * 0.20 +
    projectScore     * 0.20 +
    qualificationScore * 0.20 +
    preferenceScore  * 0.10
  );

  return {
    overall:       Math.min(100, overall),
    skills:        skillsScore,
    assessment:    assessmentScore,
    projects:      projectScore,
    qualification: qualificationScore,
    preferences:   preferenceScore,
    breakdown: {
      skillsMatched, skillsRequired,
      cgpaScore:        student.cgpa,
      projectCount,
      assessmentPassed,
      locationMatch,
      sectorMatch,
    },
  };
}
