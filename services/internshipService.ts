import { mockInternships } from "@/data/internships";
import type { Internship } from "@/types/internship";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getInternshipById(id: string): Promise<Internship | null> {
  await delay(300);
  return mockInternships.find((i) => i.id === id) ?? null;
}

export async function getAllInternships(): Promise<Internship[]> {
  await delay(400);
  return mockInternships;
}

export async function getActiveInternships(): Promise<Internship[]> {
  await delay(400);
  return mockInternships.filter((i) => i.status === "Active");
}

export async function getCompanyInternships(companyId: string): Promise<Internship[]> {
  await delay(300);
  return mockInternships.filter((i) => i.companyId === companyId);
}
