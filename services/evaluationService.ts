import {
  mockCompanyEvaluations,
  mockStudentFeedback,
  mockInternshipOutcomes,
} from "@/data/evaluations";
import type { CompanyEvaluation, StudentFeedback, InternshipOutcome } from "@/types/evaluation";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function getEvaluationsForCompany(companyId: string): Promise<CompanyEvaluation[]> {
  await delay(300);
  return mockCompanyEvaluations.filter((e) => e.companyId === companyId);
}

export async function getEvaluationsForStudent(studentId: string): Promise<CompanyEvaluation[]> {
  await delay(300);
  return mockCompanyEvaluations.filter((e) => e.studentId === studentId);
}

export async function submitCompanyEvaluation(
  data: Omit<CompanyEvaluation, "id" | "submittedAt">
): Promise<CompanyEvaluation> {
  await delay(700);
  return { ...data, id: `eval_${Date.now()}`, submittedAt: new Date().toISOString() };
}

export async function getFeedbackForStudent(studentId: string): Promise<StudentFeedback[]> {
  await delay(300);
  return mockStudentFeedback.filter((f) => f.studentId === studentId);
}

export async function submitStudentFeedback(
  data: Omit<StudentFeedback, "id" | "submittedAt">
): Promise<StudentFeedback> {
  await delay(700);
  return { ...data, id: `sf_${Date.now()}`, submittedAt: new Date().toISOString() };
}

export async function getOutcomesForStudent(studentId: string): Promise<InternshipOutcome[]> {
  await delay(300);
  return mockInternshipOutcomes.filter((o) => o.studentId === studentId);
}

export async function getAllOutcomes(): Promise<InternshipOutcome[]> {
  await delay(400);
  return mockInternshipOutcomes;
}
