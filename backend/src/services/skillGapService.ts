import { Student }   from "../models/Student";
import { Internship } from "../models/Internship";
import { AppError }   from "../middleware/errorMiddleware";

export interface SkillGapResult {
  requiredSkills: string[];
  matchedSkills:  string[];
  missingSkills:  string[];
  weakSkills:     string[];
  readiness:      number;
  recommendations: { skill: string; resources: { title: string; type: string; isFree: boolean }[] }[];
}

const LEARNING_RESOURCES: Record<string, { title: string; type: string; isFree: boolean }[]> = {
  "React":        [{ title: "React Official Docs",             type: "Documentation", isFree: true  }, { title: "React - The Complete Guide", type: "Course", isFree: false }],
  "Node.js":      [{ title: "Node.js Official Docs",           type: "Documentation", isFree: true  }, { title: "Node.js Bootcamp",           type: "Course", isFree: false }],
  "Python":       [{ title: "Python for Everybody - Coursera", type: "Course",        isFree: true  }, { title: "Automate Boring Stuff",       type: "Book",   isFree: true  }],
  "TypeScript":   [{ title: "TypeScript Deep Dive",            type: "Book",          isFree: true  }, { title: "Total TypeScript",            type: "Course", isFree: false }],
  "MongoDB":      [{ title: "MongoDB University M001",         type: "Course",        isFree: true  }, { title: "MongoDB Docs",                type: "Documentation", isFree: true }],
  "Docker":       [{ title: "Docker Official Get Started",     type: "Documentation", isFree: true  }, { title: "Docker & K8s Bootcamp",       type: "Course", isFree: false }],
  "AWS":          [{ title: "AWS Free Tier + Docs",            type: "Documentation", isFree: true  }, { title: "AWS Certified Solutions Arch",type: "Course", isFree: false }],
  "Machine Learning":[{ title: "ML Course - Andrew Ng",        type: "Course",        isFree: true  }, { title: "Hands-On ML with Scikit",     type: "Book",   isFree: false }],
  "System Design":[{ title: "System Design Primer - GitHub",   type: "Article",       isFree: true  }, { title: "Grokking System Design",      type: "Course", isFree: false }],
};

function getResources(skill: string) {
  return LEARNING_RESOURCES[skill] ?? [
    { title: `Learn ${skill} - freeCodeCamp`, type: "Course", isFree: true },
    { title: `${skill} Documentation`,        type: "Documentation", isFree: true },
  ];
}

export async function getStudentSkillGap(studentId: string): Promise<SkillGapResult> {
  const student = await Student.findById(studentId).lean();
  if (!student) throw new AppError("Student not found", 404, "NOT_FOUND");

  // Get top active internships to determine market-required skills
  const internships = await Internship.find({ status: "Active" }).limit(20).lean();
  const skillFreq: Record<string, number> = {};
  for (const i of internships) {
    for (const s of i.requiredSkills) {
      skillFreq[s] = (skillFreq[s] ?? 0) + 1;
    }
  }

  const requiredSkills  = Object.entries(skillFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([s]) => s);

  const studentSkillNames = student.skills.map((s: { name: string; level?: string }) => s.name.toLowerCase());
  const matchedSkills = requiredSkills.filter(s => studentSkillNames.includes(s.toLowerCase()));
  const missingSkills = requiredSkills.filter(s => !studentSkillNames.includes(s.toLowerCase()));
  const weakSkills    = student.skills
    .filter((s: { name: string; level: string }) => s.level === "Beginner")
    .map((s: { name: string }) => s.name)
    .filter((n: string) => requiredSkills.some(r => r.toLowerCase() === n.toLowerCase()));

  const readiness = requiredSkills.length > 0
    ? Math.round((matchedSkills.length / requiredSkills.length) * 100)
    : 100;

  const recommendations = missingSkills.slice(0, 5).map(skill => ({
    skill,
    resources: getResources(skill),
  }));

  return { requiredSkills, matchedSkills, missingSkills, weakSkills, readiness, recommendations };
}

export async function getSkillGapForInternship(
  studentId: string, internshipId: string
): Promise<SkillGapResult> {
  const [student, internship] = await Promise.all([
    Student.findById(studentId).lean(),
    Internship.findById(internshipId).lean(),
  ]);
  if (!student)    throw new AppError("Student not found",    404, "NOT_FOUND");
  if (!internship) throw new AppError("Internship not found", 404, "NOT_FOUND");

  const requiredSkills  = internship.requiredSkills;
  const studentSkillMap = new Map(
    student.skills.map((s: { name: string; level: string }) => [s.name.toLowerCase(), s.level])
  );

  const matchedSkills = requiredSkills.filter(s => studentSkillMap.has(s.toLowerCase()));
  const missingSkills = requiredSkills.filter(s => !studentSkillMap.has(s.toLowerCase()));
  const weakSkills    = requiredSkills.filter(s => studentSkillMap.get(s.toLowerCase()) === "Beginner");

  const readiness = requiredSkills.length > 0
    ? Math.round((matchedSkills.length / requiredSkills.length) * 100)
    : 100;

  const recommendations = missingSkills.map(skill => ({
    skill,
    resources: getResources(skill),
  }));

  return { requiredSkills, matchedSkills, missingSkills, weakSkills, readiness, recommendations };
}
