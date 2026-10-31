"use client";

import { useMemo } from "react";
import type { Company } from "@/types/company";
import { mockCompanies } from "@/data/companies";
import { mockInternships } from "@/data/internships";
import { mockApplications } from "@/data/applications";
import { mockAllocations } from "@/data/allocations";
import { useAuthStore } from "@/store/authStore";

export function useCompany() {
  const user = useAuthStore((s) => s.user);

  const company = useMemo<Company | null>(() => {
    if (!user) return null;
    if (typeof window !== "undefined") {
      try {
        const custom = JSON.parse(localStorage.getItem("internai_custom_companies") || "[]");
        const found = custom.find(
          (c: any) => c.userId === user.id || c.email?.toLowerCase() === user.email?.toLowerCase()
        );
        if (found) return found as Company;
      } catch {}
    }
    const foundMock = mockCompanies.find(
      (c) => c.userId === user.id || c.email?.toLowerCase() === user.email?.toLowerCase()
    );
    if (foundMock) return foundMock;

    if (user.role === "company") {
      return {
        ...mockCompanies[0],
        id: `c_${user.id}`,
        userId: user.id,
        companyName: user.name || "Company",
        email: user.email,
      } as Company;
    }
    return null;
  }, [user]);

  const internships = useMemo(() => {
    const list = mockInternships.filter((i) => i.companyId === company?.id);
    return list.length > 0 ? list : mockInternships.slice(0, 3);
  }, [company?.id]);

  const applications = useMemo(() => {
    const list = mockApplications.filter((a) => a.companyId === company?.id);
    return list.length > 0 ? list : mockApplications.slice(0, 5);
  }, [company?.id]);

  const allocations = useMemo(() => {
    const list = mockAllocations.filter((a) => a.companyId === company?.id);
    return list.length > 0 ? list : mockAllocations.slice(0, 3);
  }, [company?.id]);

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
