import { mockApplications } from "@/data/applications";
import type { Application } from "@/types/application";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getApplicationById(id: string): Promise<Application | null> {
  await delay(300);
  return mockApplications.find((a) => a.id === id) ?? null;
}

export async function getStudentApplications(studentId: string): Promise<Application[]> {
  await delay(400);
  return mockApplications.filter((a) => a.studentId === studentId);
}

export async function getCompanyApplications(companyId: string): Promise<Application[]> {
  await delay(400);
  return mockApplications.filter((a) => a.companyId === companyId);
}

export async function getAllApplications(): Promise<Application[]> {
  await delay(400);
  return mockApplications;
}
