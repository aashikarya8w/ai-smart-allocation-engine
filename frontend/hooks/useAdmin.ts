"use client";

import { useMemo } from "react";
import { mockStudents } from "@/data/students";
import { mockCompanies } from "@/data/companies";
import { mockInternships } from "@/data/internships";
import { mockApplications } from "@/data/applications";
import { mockAllocations } from "@/data/allocations";
import { mockAnalyticsSummary } from "@/data/analytics";
import { mockVerifications, mockCheckIns } from "@/data/verification";
import { mockReallocations, mockSwapRequests } from "@/data/reallocation";
import { mockCompanyEvaluations, mockStudentFeedback, mockInternshipOutcomes } from "@/data/evaluations";
import { mockAssessmentResults } from "@/data/assessments";

export function useAdmin() {
  const students     = useMemo(() => mockStudents, []);
  const companies    = useMemo(() => mockCompanies, []);
  const internships  = useMemo(() => mockInternships, []);
  const applications = useMemo(() => mockApplications, []);
  const allocations  = useMemo(() => mockAllocations, []);
  const verifications = useMemo(() => mockVerifications, []);
  const checkIns     = useMemo(() => mockCheckIns, []);
  const reallocations = useMemo(() => mockReallocations, []);
  const swapRequests = useMemo(() => mockSwapRequests, []);
  const evaluations  = useMemo(() => mockCompanyEvaluations, []);
  const feedbacks    = useMemo(() => mockStudentFeedback, []);
  const outcomes     = useMemo(() => mockInternshipOutcomes, []);
  const assessmentResults = useMemo(() => mockAssessmentResults, []);

  const stats = useMemo(
    () => ({
      totalStudents:            students.length,
      verifiedStudents:         students.filter((s) => s.verificationStatus === "Verified").length,
      pendingStudents:          students.filter((s) => s.verificationStatus === "Pending").length,
      totalCompanies:           companies.length,
      verifiedCompanies:        companies.filter((c) => c.verificationStatus === "Verified").length,
      pendingCompanies:         companies.filter((c) => c.verificationStatus === "Pending").length,
      totalInternships:         internships.length,
      activeInternships:        internships.filter((i) => i.status === "Active").length,
      pendingInternships:       internships.filter((i) => i.status === "Pending").length,
      totalApplications:        applications.length,
      shortlistedApplications:  applications.filter((a) => a.status === "Shortlisted").length,
      totalAllocations:         allocations.length,
      approvedAllocations:      allocations.filter((a) => a.status === "Approved").length,
      pendingAllocations:       allocations.filter((a) => a.status === "Pending").length,
      totalSeats:               internships.reduce((sum, i) => sum + i.seats, 0),
      availableSeats:           internships.reduce((sum, i) => sum + i.availableSeats, 0),
      allocationRate:           mockAnalyticsSummary.allocationRate,
      averageMatchScore:        mockAnalyticsSummary.averageMatchScore,
      pendingVerifications:     verifications.filter((v) => v.status === "Pending").length,
      pendingReallocations:     reallocations.filter((r) => r.status === "Pending").length,
      pendingSwaps:             swapRequests.filter((s) => s.status === "UnderReview" || s.status === "Requested").length,
      totalOutcomes:            outcomes.length,
    }),
    [students, companies, internships, applications, allocations, verifications, reallocations, swapRequests, outcomes]
  );

  return {
    students, companies, internships, applications, allocations,
    verifications, checkIns, reallocations, swapRequests,
    evaluations, feedbacks, outcomes, assessmentResults,
    stats,
  };
}
