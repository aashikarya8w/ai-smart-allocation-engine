import { mockReallocations, mockSwapRequests, mockCapacityScenarios } from "@/data/reallocation";
import type { Reallocation, SwapRequest, CapacityScenario } from "@/types/reallocation";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function getAllReallocations(): Promise<Reallocation[]> {
  await delay(400);
  return mockReallocations;
}

export async function approveReallocation(id: string): Promise<Reallocation> {
  await delay(600);
  const r = mockReallocations.find((r) => r.id === id);
  if (!r) throw new Error("Reallocation not found");
  return { ...r, status: "Approved", resolvedAt: new Date().toISOString() };
}

export async function rejectReallocation(id: string, notes: string): Promise<Reallocation> {
  await delay(600);
  const r = mockReallocations.find((r) => r.id === id);
  if (!r) throw new Error("Reallocation not found");
  return { ...r, status: "Rejected", adminNotes: notes, resolvedAt: new Date().toISOString() };
}

export async function getAllSwapRequests(): Promise<SwapRequest[]> {
  await delay(400);
  return mockSwapRequests;
}

export async function approveSwap(id: string): Promise<SwapRequest> {
  await delay(600);
  const s = mockSwapRequests.find((s) => s.id === id);
  if (!s) throw new Error("Swap not found");
  return { ...s, status: "Approved", resolvedAt: new Date().toISOString() };
}

export async function rejectSwap(id: string, notes: string): Promise<SwapRequest> {
  await delay(600);
  const s = mockSwapRequests.find((s) => s.id === id);
  if (!s) throw new Error("Swap not found");
  return { ...s, status: "Rejected", adminNotes: notes, resolvedAt: new Date().toISOString() };
}

export async function getCapacityScenarios(): Promise<CapacityScenario[]> {
  await delay(300);
  return mockCapacityScenarios;
}

export async function runCapacitySimulation(
  params: Partial<CapacityScenario>
): Promise<CapacityScenario> {
  await delay(800);
  return {
    id:                    `cs_${Date.now()}`,
    name:                  params.name ?? "New Scenario",
    description:           params.description ?? "",
    baseApplicants:        params.baseApplicants ?? 100,
    baseSeats:             params.baseSeats ?? 30,
    baseCompanies:         params.baseCompanies ?? 10,
    applicantChangePercent:params.applicantChangePercent ?? 0,
    seatChangePercent:     params.seatChangePercent ?? 0,
    newCompanies:          params.newCompanies ?? 0,
    expectedEligible:      Math.round((params.baseApplicants ?? 100) * 0.72),
    expectedAllocated:     Math.min(params.baseSeats ?? 30, Math.round((params.baseApplicants ?? 100) * 0.72)),
    expectedWaitlisted:    8,
    expectedUnallocated:   17,
    seatUtilization:       95,
    preferenceSatisfaction:78,
    createdAt:             new Date().toISOString(),
  };
}
