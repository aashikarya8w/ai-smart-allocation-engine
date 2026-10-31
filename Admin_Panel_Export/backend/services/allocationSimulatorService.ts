/**
 * Admin What-If Allocation Simulator
 * IMPORTANT: Does NOT modify any production allocation data.
 */

import { Student }    from "../models/Student";
import { Internship } from "../models/Internship";
import { Application }from "../models/Application";
import { calculateScore, ScoreWeights } from "../utils/scoreCalculator";
import { AppError }   from "../middleware/errorMiddleware";

interface SimulatorConfig {
  weights?: Partial<ScoreWeights>;
  overrideSeats?: Record<string, number>;  // internshipId → seats
  eligibilityCriteria?: {
    minimumCGPA?:   number;
    minimumSkills?: number;
  };
}

function buildSP(s: InstanceType<typeof Student>) {
  return {
    skills:             s.skills.map((sk: { name: string }) => sk.name),
    interests:          s.interests, preferredLocations: s.preferredLocations,
    preferredSectors:   s.preferredSectors, preferredWorkMode: s.preferredWorkMode,
    cgpa:               s.cgpa, graduationYear: s.graduationYear, branch: s.branch,
    degree:             s.degree, city: s.city ?? "", state: s.state ?? "",
    experienceCount:    (s.projects?.length ?? 0) + (s.previousInternships?.length ?? 0),
  };
}

function buildIP(i: InstanceType<typeof Internship>) {
  return {
    requiredSkills: i.requiredSkills, sector: i.sector,
    location: `${i.city}, ${i.state}`, city: i.city, state: i.state,
    workMode: i.workMode, minimumCGPA: i.minimumCGPA,
    eligibleBranches: i.eligibleBranches, qualification: i.qualification,
  };
}

export async function runAllocationSimulation(config: SimulatorConfig) {
  const weights: ScoreWeights = {
    skillMatch:    config.weights?.skillMatch    ?? 40,
    qualification: config.weights?.qualification ?? 20,
    location:      config.weights?.location      ?? 15,
    interest:      config.weights?.interest      ?? 15,
    experience:    config.weights?.experience    ?? 10,
  };

  const minCGPA    = config.eligibilityCriteria?.minimumCGPA    ?? 6.0;
  const minSkills  = config.eligibilityCriteria?.minimumSkills  ?? 1;

  const internships = await Internship.find({ status: "Active" });
  const applications= await Application.find({ status: { $in: ["Applied","Shortlisted"] } }).lean();
  const studentIds  = [...new Set(applications.map(a => String(a.studentId)))];
  const students    = await Student.find({ _id: { $in: studentIds } });
  const studentMap  = new Map(students.map(s => [String(s._id), s]));

  const simulatedAllocations: {
    studentId:       string;
    studentName:     string;
    internshipId:    string;
    internshipTitle: string;
    matchScore:      number;
    status:          "Simulated-Allocated" | "Simulated-Waitlisted" | "Simulated-Ineligible";
    rank:            number;
    reason:          string;
  }[] = [];

  let totalAllocated  = 0;
  let totalWaitlisted = 0;
  let totalIneligible = 0;

  for (const internship of internships) {
    const seats = config.overrideSeats?.[String(internship._id)] ?? internship.availableSeats;
    const apps  = applications.filter(a => String(a.internshipId) === String(internship._id));

    const scored: Array<{ studentId: string; studentName: string; score: number; eligible: boolean }> = [];

    for (const app of apps) {
      const student = studentMap.get(String(app.studentId));
      if (!student) continue;

      const eligible = student.cgpa >= minCGPA && student.skills.length >= minSkills;
      const result   = calculateScore(buildSP(student), buildIP(internship), weights);

      scored.push({
        studentId:   String(student._id),
        studentName: student.fullName,
        score:       result.totalScore,
        eligible:    eligible && result.isEligible,
      });
    }

    scored.sort((a, b) => {
      if (a.eligible !== b.eligible) return a.eligible ? -1 : 1;
      return b.score - a.score;
    });

    let remaining = seats;
    let rank      = 1;

    for (const c of scored) {
      if (!c.eligible) {
        simulatedAllocations.push({
          ...c, internshipId: String(internship._id), internshipTitle: internship.title,
          matchScore: c.score, rank,
          status: "Simulated-Ineligible",
          reason: "Did not meet eligibility criteria",
        });
        totalIneligible++;
      } else if (remaining > 0) {
        simulatedAllocations.push({
          ...c, internshipId: String(internship._id), internshipTitle: internship.title,
          matchScore: c.score, rank,
          status: "Simulated-Allocated",
          reason: `Rank ${rank} — score ${c.score}`,
        });
        remaining--;
        rank++;
        totalAllocated++;
      } else {
        simulatedAllocations.push({
          ...c, internshipId: String(internship._id), internshipTitle: internship.title,
          matchScore: c.score, rank,
          status: "Simulated-Waitlisted",
          reason: "Seats were filled by higher-ranked candidates",
        });
        totalWaitlisted++;
      }
    }
  }

  const totalSeats = internships.reduce((s, i) =>
    s + (config.overrideSeats?.[String(i._id)] ?? i.availableSeats), 0
  );

  return {
    simulatedAllocations,
    summary: {
      totalApplications: applications.length,
      totalAllocated,
      totalWaitlisted,
      totalIneligible,
      totalSeats,
      seatUtilization: totalSeats > 0 ? Math.round((totalAllocated / totalSeats) * 100) : 0,
    },
    configUsed: { weights, minCGPA, minSkills },
    note: "This is a simulation only. No actual allocation data was modified.",
  };
}
