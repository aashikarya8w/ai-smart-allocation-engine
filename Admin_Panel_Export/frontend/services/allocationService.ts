import { mockAllocations } from "@/data/allocations";
import type { Allocation } from "@/types/allocation";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getAllocations(): Promise<Allocation[]> {
  await delay(400);
  return mockAllocations;
}

export async function getStudentAllocation(studentId: string): Promise<Allocation | null> {
  await delay(300);
  return mockAllocations.find(
    (a) => a.studentId === studentId && a.status === "Approved"
  ) ?? null;
}

export async function getAllocationById(id: string): Promise<Allocation | null> {
  await delay(300);
  return mockAllocations.find((a) => a.id === id) ?? null;
}

// Mock smart allocation run — returns simulated progress steps
export async function runSmartAllocation(
  onStep: (step: string, progress: number) => void
): Promise<Allocation[]> {
  const steps = [
    { label: "Preparing data",            progress: 10 },
    { label: "Checking eligibility",      progress: 25 },
    { label: "Calculating match scores",  progress: 45 },
    { label: "Applying constraints",      progress: 65 },
    { label: "Optimising allocation",     progress: 82 },
    { label: "Generating results",        progress: 100 },
  ];

  for (const step of steps) {
    await delay(700);
    onStep(step.label, step.progress);
  }

  return mockAllocations;
}
