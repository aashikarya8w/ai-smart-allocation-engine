/**
 * What-If Simulator
 * IMPORTANT: Does NOT modify the student's actual profile.
 * Runs scoring on a temporary merged profile only.
 */
import { Student }    from "../models/Student";
import { Internship } from "../models/Internship";
import { Rule }       from "../models/Rule";
import { AppError }   from "../middleware/errorMiddleware";
import { calculateScore } from "../utils/scoreCalculator";
import { getReadiness }   from "./readinessService";

interface SimulatorChanges {
  skills?:          string[];
  cgpa?:            number;
  city?:            string;
  state?:           string;
  preferredWorkMode?: string;
  interests?:       string[];
  preferredLocations?: string[];
  preferredSectors?: string[];
  projectCount?:    number;
  experienceCount?: number;
}

export async function runSimulation(params: {
  studentId:    string;
  internshipId: string;
  changes:      SimulatorChanges;
}) {
  const { studentId, internshipId, changes } = params;

  const [student, internship] = await Promise.all([
    Student.findById(studentId),
    Internship.findById(internshipId),
  ]);
  if (!student)    throw new AppError("Student not found",    404, "NOT_FOUND");
  if (!internship) throw new AppError("Internship not found", 404, "NOT_FOUND");

  const rule    = await Rule.findOne({ type: "matching", isActive: true }).lean();
  const weights = (rule?.weights as { skillMatch:number; qualification:number; location:number; interest:number; experience:number } | undefined)
    ?? { skillMatch:40, qualification:20, location:15, interest:15, experience:10 };

  const internshipProfile = {
    requiredSkills:   internship.requiredSkills,
    sector:           internship.sector,
    location:         `${internship.city}, ${internship.state}`,
    city:             internship.city,
    state:            internship.state,
    workMode:         internship.workMode,
    minimumCGPA:      internship.minimumCGPA,
    eligibleBranches: internship.eligibleBranches,
    qualification:    internship.qualification,
  };

  // Current profile
  const currentProfile = {
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
  };

  // Simulated profile — merge changes WITHOUT saving
  const simulatedProfile = {
    ...currentProfile,
    skills:             changes.skills
      ? [...new Set([...currentProfile.skills, ...changes.skills])]
      : currentProfile.skills,
    cgpa:               changes.cgpa            ?? currentProfile.cgpa,
    city:               changes.city            ?? currentProfile.city,
    state:              changes.state           ?? currentProfile.state,
    preferredWorkMode:  changes.preferredWorkMode ?? currentProfile.preferredWorkMode,
    interests:          changes.interests        ?? currentProfile.interests,
    preferredLocations: changes.preferredLocations ?? currentProfile.preferredLocations,
    preferredSectors:   changes.preferredSectors   ?? currentProfile.preferredSectors,
    experienceCount:    changes.experienceCount  ?? changes.projectCount
      ?? currentProfile.experienceCount,
  };

  const currentScore   = calculateScore(currentProfile,   internshipProfile, weights);
  const simulatedScore = calculateScore(simulatedProfile, internshipProfile, weights);

  const [currentReadiness, simulatedReadiness] = await Promise.all([
    getReadiness(studentId, internshipId),
    Promise.resolve({
      overall:       Math.min(100, Math.round(simulatedScore.totalScore * 0.8)),
      skills:        simulatedScore.skillScore,
      assessment:    currentProfile.cgpa >= internship.minimumCGPA ? 70 : 40,
      projects:      Math.min(100, simulatedProfile.experienceCount * 25),
      qualification: simulatedProfile.cgpa >= internship.minimumCGPA ? 100 : 50,
      preferences:   simulatedScore.interestScore,
    }),
  ]);

  return {
    internshipId,
    studentId,
    current: {
      matchScore:     currentScore.totalScore,
      suitability:    currentScore.totalScore,
      readiness:      currentReadiness.overall,
      isEligible:     currentScore.isEligible,
      matchedSkills:  currentScore.matchedSkills,
      missingSkills:  currentScore.missingSkills,
      breakdown: {
        skills:        currentScore.skillScore,
        qualification: currentScore.qualificationScore,
        location:      currentScore.locationScore,
        interest:      currentScore.interestScore,
        experience:    currentScore.experienceScore,
      },
    },
    simulated: {
      matchScore:     simulatedScore.totalScore,
      suitability:    simulatedScore.totalScore,
      readiness:      simulatedReadiness.overall,
      isEligible:     simulatedScore.isEligible,
      matchedSkills:  simulatedScore.matchedSkills,
      missingSkills:  simulatedScore.missingSkills,
      breakdown: {
        skills:        simulatedScore.skillScore,
        qualification: simulatedScore.qualificationScore,
        location:      simulatedScore.locationScore,
        interest:      simulatedScore.interestScore,
        experience:    simulatedScore.experienceScore,
      },
    },
    improvement: {
      matchScore:  simulatedScore.totalScore - currentScore.totalScore,
      readiness:   simulatedReadiness.overall - currentReadiness.overall,
    },
    appliedChanges: changes,
    note: "Simulation only — no actual profile data was modified.",
  };
}
