import {
  mockAnalyticsSummary,
  mockApplicationAnalytics,
  mockAllocationAnalytics,
  mockSectorDistribution,
  mockSkillDemand,
  mockStateWiseStudents,
} from "@/data/analytics";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getAnalyticsSummary() {
  await delay(400);
  return mockAnalyticsSummary;
}

export async function getApplicationAnalytics() {
  await delay(400);
  return mockApplicationAnalytics;
}

export async function getAllocationAnalytics() {
  await delay(400);
  return mockAllocationAnalytics;
}

export async function getSectorDistribution() {
  await delay(300);
  return mockSectorDistribution;
}

export async function getSkillDemand() {
  await delay(300);
  return mockSkillDemand;
}

export async function getStateData() {
  await delay(300);
  return mockStateWiseStudents;
}
