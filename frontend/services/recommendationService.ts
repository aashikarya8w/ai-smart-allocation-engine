import { mockRecommendations } from "@/data/recommendations";
import type { Recommendation } from "@/types/recommendation";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getStudentRecommendations(
  studentId: string
): Promise<Recommendation[]> {
  await delay(500);
  return mockRecommendations
    .filter((r) => r.studentId === studentId)
    .sort((a, b) => b.matchScore - a.matchScore);
}
