"use client";

import { useMemo } from "react";
import { mockStudents } from "@/data/students";
import { mockCompanies } from "@/data/companies";
import { mockInternships } from "@/data/internships";
import { mockApplications } from "@/data/applications";
import { mockAllocations } from "@/data/allocations";
import { mockAnalyticsSummary } from "@/data/analytics";

export function useAdmin() {
  const students = useMemo(() => mockStudents, []);
  const companies = useMemo(() => mockCompanies, []);
  const internships = useMemo(() => mockInternships, []);
  const applications = useMemo(() => mockApplications, []);
  const allocations = useMemo(() => mockAllocations, []);

  const stats = useMemo(
    () => ({
      totalStudents: students.length,
      verifiedStudents: students.filter((s) => s.verificationStatus === "Verified").length,
      pendingStudents: students.filter((s) => s.verificationStatus === "Pending").length,
      totalCompanies: companies.length,
      verifiedCompanies: companies.filter((c) => c.verificationStatus === "Verified").length,
      pendingCompanies: companies.filter((c) => c.verificationStatus === "Pending").length,
      totalInternships: internships.length,
      activeInternships: internships.filter((i) => i.status === "Active").length,
      pendingInternships: internships.filter((i) => i.status === "Pending").length,
      totalApplications: applications.length,
      shortlistedApplications: applications.filter((a) => a.status === "Shortlisted").length,
      totalAllocations: allocations.length,
      approvedAllocations: allocations.filter((a) => a.status === "Approved").length,
      pendingAllocations: allocations.filter((a) => a.status === "Pending").length,
      totalSeats: internships.reduce((sum, i) => sum + i.seats, 0),
      availableSeats: internships.reduce((sum, i) => sum + i.availableSeats, 0),
      allocationRate: mockAnalyticsSummary.allocationRate,
      averageMatchScore: mockAnalyticsSummary.averageMatchScore,
    }),
    [students, companies, internships, applications, allocations]
  );

  return { students, companies, internships, applications, allocations, stats };
}
