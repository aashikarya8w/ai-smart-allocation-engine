import { mockCompanies } from "@/data/companies";
import type { Company } from "@/types/company";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getCompanyById(id: string): Promise<Company | null> {
  await delay(300);
  return mockCompanies.find((c) => c.id === id) ?? null;
}

export async function getAllCompanies(): Promise<Company[]> {
  await delay(400);
  return mockCompanies;
}

export async function updateCompanyProfile(
  id: string,
  updates: Partial<Company>
): Promise<Company> {
  await delay(600);
  const company = mockCompanies.find((c) => c.id === id);
  if (!company) throw new Error("Company not found.");
  return { ...company, ...updates, updatedAt: new Date().toISOString() };
}
