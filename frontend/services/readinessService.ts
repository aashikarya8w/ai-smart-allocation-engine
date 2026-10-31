import { mockReadinessProfiles, mockWhatIfSimulations } from "@/data/readiness";
import type { ReadinessProfile, WhatIfSimulation } from "@/types/readiness";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function getReadinessForStudent(studentId: string): Promise<ReadinessProfile[]> {
  await delay(400);
  return mockReadinessProfiles.filter((r) => r.studentId === studentId);
}

export async function getReadinessForInternship(
  studentId: string,
  internshipId: string
): Promise<ReadinessProfile | null> {
  await delay(400);
  return (
    mockReadinessProfiles.find(
      (r) => r.studentId === studentId && r.internshipId === internshipId
    ) ?? null
  );
}

export async function runWhatIfSimulation(
  studentId: string,
  params: Partial<WhatIfSimulation>
): Promise<WhatIfSimulation> {
  await delay(900);
  const existing = mockWhatIfSimulations.find((s) => s.studentId === studentId);
  return (
    existing ?? {
      id:                    `wis_${Date.now()}`,
      studentId,
      addedSkills:           params.addedSkills ?? [],
      removedSkills:         params.removedSkills ?? [],
      currentMatchScore:     72,
      simulatedMatchScore:   86,
      currentSuitability:    74,
      simulatedSuitability:  88,
      currentReadiness:      72,
      simulatedReadiness:    85,
      currentEligibleCount:  8,
      simulatedEligibleCount:14,
      currentStrongMatches:  3,
      simulatedStrongMatches:7,
      simulatedAt:           new Date().toISOString(),
    }
  );
}
