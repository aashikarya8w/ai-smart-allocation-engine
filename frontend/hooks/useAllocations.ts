"use client";

import { useMemo } from "react";
import { mockAllocations } from "@/data/allocations";
import { mockStudents } from "@/data/students";
import { useAuthStore } from "@/store/authStore";

export function useAllocations() {
  const user = useAuthStore((s) => s.user);
  const student = mockStudents.find((s) => s.userId === user?.id);

  const allocations = useMemo(
    () => mockAllocations.filter((a) => a.studentId === student?.id),
    [student?.id]
  );

  const activeAllocation = useMemo(
    () => allocations.find((a) => a.status === "Approved") ?? null,
    [allocations]
  );

  return { allocations, activeAllocation };
}

export function useAllAlllocations() {
  return mockAllocations;
}
