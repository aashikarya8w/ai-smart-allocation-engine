import { mockSuitabilityResults } from "@/data/suitability";
import type { SuitabilityResult } from "@/types/suitability";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function getSuitabilityForStudent(studentId: string): Promise<SuitabilityResult[]> {
  await delay(400);
  return mockSuitabilityResults.filter((r) => r.studentId === studentId);
}

export async function getSuitabilityForInternship(internshipId: string): Promise<SuitabilityResult[]> {
  await delay(400);
  return mockSuitabilityResults.filter((r) => r.internshipId === internshipId);
}

export async function calculateSuitability(
  studentId: string,
  internshipId: string
): Promise<SuitabilityResult | null> {
  await delay(800);
  return (
    mockSuitabilityResults.find(
      (r) => r.studentId === studentId && r.internshipId === internshipId
    ) ?? null
  );
}
