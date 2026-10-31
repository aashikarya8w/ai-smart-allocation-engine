import { mockStudents } from "@/data/students";
import { mockCompanies } from "@/data/companies";
import { mockInternships } from "@/data/internships";
import { mockAuditLogs } from "@/data/auditLogs";
import { mockReports } from "@/data/reports";
import { mockRules } from "@/data/rules";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getAdminDashboardData() {
  await delay(500);
  return {
    students: mockStudents,
    companies: mockCompanies,
    internships: mockInternships,
  };
}

export async function getAuditLogs() {
  await delay(400);
  return [...mockAuditLogs].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getReports() {
  await delay(400);
  return mockReports;
}

export async function getMatchingRules() {
  await delay(300);
  return mockRules;
}

// Mock AI matching run — returns simulated steps
export async function runAIMatching(
  onStep: (step: string, progress: number) => void
): Promise<void> {
  const steps = [
    { label: "Eligibility Check",          progress: 15 },
    { label: "Skill Matching",             progress: 32 },
    { label: "Qualification Matching",     progress: 50 },
    { label: "Location Matching",          progress: 65 },
    { label: "Preference Matching",        progress: 80 },
    { label: "Match Score Generation",     progress: 100 },
  ];

  for (const step of steps) {
    await delay(700);
    onStep(step.label, step.progress);
  }
}
