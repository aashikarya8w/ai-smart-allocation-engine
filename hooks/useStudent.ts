"use client";

import { useMemo } from "react";
import { mockStudents } from "@/data/students";
import { mockApplications } from "@/data/applications";
import { mockRecommendations } from "@/data/recommendations";
import { mockAllocations } from "@/data/allocations";
import { useAuthStore } from "@/store/authStore";

export function useStudent() {
  const user = useAuthStore((s) => s.user);

  const student = useMemo(
    () => mockStudents.find((s) => s.userId === user?.id) ?? null,
    [user?.id]
  );

  const applications = useMemo(
    () => mockApplications.filter((a) => a.studentId === student?.id),
    [student?.id]
  );

  const recommendations = useMemo(
    () => mockRecommendations.filter((r) => r.studentId === student?.id),
    [student?.id]
  );

  const allocations = useMemo(
    () => mockAllocations.filter((a) => a.studentId === student?.id),
    [student?.id]
  );

  const activeAllocation = useMemo(
    () => allocations.find((a) => a.status === "Approved") ?? null,
    [allocations]
  );

  return {
    student,
    applications,
    recommendations,
    allocations,
    activeAllocation,
    stats: {
      applicationsCount: applications.length,
      recommendationsCount: recommendations.length,
      shortlistedCount: applications.filter((a) => a.status === "Shortlisted").length,
      allocationsCount: allocations.filter((a) => a.status === "Approved").length,
      topMatchScore: recommendations[0]?.matchScore ?? 0,
    },
  };
}
