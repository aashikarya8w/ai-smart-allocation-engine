"use client";

import { useMemo } from "react";
import { mockRecommendations } from "@/data/recommendations";
import { mockStudents } from "@/data/students";
import { useAuthStore } from "@/store/authStore";

export function useRecommendations() {
  const user = useAuthStore((s) => s.user);
  const student = mockStudents.find((s) => s.userId === user?.id);

  const recommendations = useMemo(
    () =>
      mockRecommendations
        .filter((r) => r.studentId === student?.id)
        .sort((a, b) => b.matchScore - a.matchScore),
    [student?.id]
  );

  return {
    recommendations,
    topRecommendations: recommendations.slice(0, 5),
    total: recommendations.length,
  };
}
