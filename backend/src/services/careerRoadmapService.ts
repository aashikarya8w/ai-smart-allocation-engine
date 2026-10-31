import { Student }       from "../models/Student";
import { CareerRoadmap } from "../models/CareerRoadmap";
import { AppError }      from "../middleware/errorMiddleware";
import { getSkillGapForInternship } from "./skillGapService";
import { Internship }    from "../models/Internship";

const SKILL_RESOURCES: Record<string, string[]> = {
  "React":          ["React Official Docs", "Full Stack Open", "Scrimba React Course"],
  "Node.js":        ["Node.js Docs", "The Odin Project", "NodeJS Bootcamp"],
  "Python":         ["Python.org Tutorials", "CS50P", "Real Python"],
  "TypeScript":     ["TypeScript Handbook", "Total TypeScript", "Execute Program"],
  "Machine Learning":["Fast.ai", "Coursera ML by Andrew Ng", "Kaggle Learn"],
  "System Design":  ["System Design Primer", "ByteByteGo", "Grokking System Design"],
  "Docker":         ["Play with Docker", "Docker Mastery on Udemy", "KodeKloud"],
};

function getResourcesForSkill(skill: string) {
  const sources = SKILL_RESOURCES[skill] ?? [`Learn ${skill} on freeCodeCamp`, `${skill} Docs`];
  return sources.map((title, i) => ({
    title,
    type: i === 0 ? "Documentation" : "Course",
    url:  "",
  }));
}

export async function generateRoadmap(studentId: string, internshipId?: string) {
  const student = await Student.findById(studentId);
  if (!student) throw new AppError("Student not found", 404, "NOT_FOUND");

  let missingSkills: string[] = [];
  let targetRole = "Software Developer Intern";

  if (internshipId) {
    const internship = await Internship.findById(internshipId).lean();
    if (internship) {
      targetRole    = internship.title;
      const gapData = await getSkillGapForInternship(studentId, internshipId);
      missingSkills = gapData.missingSkills;
    }
  } else {
    // Use top missing market skills
    const skillNames = student.skills.map((s: { name: string }) => s.name);
    const topSkills  = ["React","Node.js","Python","TypeScript","System Design","Docker","AWS"];
    missingSkills    = topSkills.filter(s => !skillNames.includes(s)).slice(0, 4);
  }

  const hasResume  = !!student.resumeUrl;
  const hasProfile = student.profileCompletion >= 80;
  const hasProjects= (student.projects?.length ?? 0) > 0;

  const steps = [];
  let order = 1;

  // Step: Complete profile
  if (!hasProfile) {
    steps.push({
      order: order++, title: "Complete Your Profile",
      description: "A complete profile improves your match score by up to 30%.",
      skills: [], timeframe: "1 Week",
      status: "Pending" as const,
      resources: [{ title: "Profile Guide", url: "/student/profile", type: "Guide" }],
    });
  }

  // Step: Learn missing skills
  for (const skill of missingSkills.slice(0, 3)) {
    steps.push({
      order: order++, title: `Learn ${skill}`,
      description: `${skill} is required for ${targetRole} and is in high demand.`,
      skills: [skill], timeframe: "2-4 Weeks",
      status: "Pending" as const,
      resources: getResourcesForSkill(skill),
    });
  }

  // Step: Build project
  if (!hasProjects) {
    steps.push({
      order: order++, title: "Build a Portfolio Project",
      description: "A real project demonstrates your skills to companies.",
      skills: missingSkills.slice(0, 2), timeframe: "3-4 Weeks",
      status: "Pending" as const,
      resources: [
        { title: "GitHub Student Pack", url: "https://education.github.com", type: "Tool" },
        { title: "Project Ideas for Beginners", url: "", type: "Article" },
      ],
    });
  }

  // Step: Upload resume
  if (!hasResume) {
    steps.push({
      order: order++, title: "Upload Your Resume",
      description: "A strong resume increases your chances of being shortlisted.",
      skills: [], timeframe: "1 Day",
      status: "Pending" as const,
      resources: [
        { title: "Resume Templates", url: "", type: "Template" },
        { title: "How to write a Tech Resume", url: "", type: "Article" },
      ],
    });
  }

  // Step: Apply
  steps.push({
    order: order++, title: "Apply for Internships",
    description: `Apply for ${targetRole} opportunities matching your skills and preferences.`,
    skills: [], timeframe: "Ongoing",
    status: "Pending" as const,
    resources: [{ title: "Browse Internships", url: "/student/internships", type: "Platform" }],
  });

  const completedCount = steps.filter(s => (s.status as string) === "Completed").length;
  const progress = Math.round((completedCount / steps.length) * 100);

  const roadmap = await CareerRoadmap.findOneAndUpdate(
    { studentId: student._id },
    { studentId: student._id, targetRole, steps, progress, generatedAt: new Date() },
    { new: true, upsert: true }
  );

  return roadmap;
}

export async function getRoadmap(studentId: string) {
  const student = await Student.findById(studentId).lean();
  if (!student) throw new AppError("Student not found", 404, "NOT_FOUND");
  return CareerRoadmap.findOne({ studentId: student._id }).lean();
}

export async function updateStepProgress(
  roadmapId: string, stepId: string, status: "Pending" | "In Progress" | "Completed"
) {
  const roadmap = await CareerRoadmap.findById(roadmapId);
  if (!roadmap) throw new AppError("Roadmap not found", 404, "NOT_FOUND");

  const step = roadmap.steps.find(s => String(s._id) === stepId);
  if (!step) throw new AppError("Step not found", 404, "NOT_FOUND");
  step.status = status;

  const completedCount = roadmap.steps.filter(s => s.status === "Completed").length;
  roadmap.progress     = Math.round((completedCount / roadmap.steps.length) * 100);

  return roadmap.save();
}
