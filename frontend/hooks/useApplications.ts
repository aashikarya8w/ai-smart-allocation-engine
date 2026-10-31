"use client";

import { useState, useMemo } from "react";
import { mockApplications } from "@/data/applications";
import { useAuthStore } from "@/store/authStore";
import { mockStudents } from "@/data/students";
import type { ApplicationStatus } from "@/types/application";

export function useApplications() {
  const user = useAuthStore((s) => s.user);
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | "all">("all");

  const student = mockStudents.find((s) => s.userId === user?.id);

  const all = useMemo(
    () => mockApplications.filter((a) => a.studentId === student?.id),
    [student?.id]
  );

  const filtered = useMemo(() => {
    if (statusFilter === "all") return all;
    return all.filter((a) => a.status === statusFilter);
  }, [all, statusFilter]);

  return {
    applications: filtered,
    allApplications: all,
    statusFilter,
    setStatusFilter,
    counts: {
      all: all.length,
      Applied: all.filter((a) => a.status === "Applied").length,
      Shortlisted: all.filter((a) => a.status === "Shortlisted").length,
      Rejected: all.filter((a) => a.status === "Rejected").length,
      Waitlisted: all.filter((a) => a.status === "Waitlisted").length,
      Allocated: all.filter((a) => a.status === "Allocated").length,
      Withdrawn: all.filter((a) => a.status === "Withdrawn").length,
    },
  };
}
