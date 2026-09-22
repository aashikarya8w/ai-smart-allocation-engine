"use client";

import { useMemo } from "react";
import { mockCompanies } from "@/data/companies";
import { mockInternships } from "@/data/internships";
import { mockApplications } from "@/data/applications";
import { mockAllocations } from "@/data/allocations";
import { useAuthStore } from "@/store/authStore";

export function useCompany() {
  const user = useAuthStore((s) => s.user);

  const company = useMemo(
    () => mockCompanies.find((c) => c.userId === user?.id) ?? null,
    [user?.id]
  );

  const internships = useMemo(
    () => mockInternships.filter((i) => i.companyId === company?.id),
    [company?.id]
  );

  const applications = useMemo(
    () => mockApplications.filter((a) => a.companyId === company?.id),
    [company?.id]
  );

  const allocations = useMemo(
    () => mockAllocations.filter((a) => a.companyId === company?.id),
    [company?.id]
  );

  return {
    company,
    internships,
    applications,
    allocations,
    stats: {
      activeInternships: internships.filter((i) => i.status === "Active").length,
      totalApplications: applications.length,
      shortlistedCount: applications.filter((a) => a.status === "Shortlisted").length,
      allocatedCount: allocations.filter((a) => a.status === "Approved").length,
      availableSeats: internships.reduce((sum, i) => sum + i.availableSeats, 0),
    },
  };
}
