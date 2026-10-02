"use client";

import { useMemo } from "react";
import { mockStudents } from "@/data/students";
import { mockApplications } from "@/data/applications";
import { mockRecommendations } from "@/data/recommendations";
import { mockAllocations } from "@/data/allocations";
import { mockAssessmentResults } from "@/data/assessments";
import { mockSuitabilityResults } from "@/data/suitability";
import { mockReadinessProfiles } from "@/data/readiness";
import { mockCheckIns } from "@/data/verification";
import { mockStudentFeedback, mockInternshipOutcomes } from "@/data/evaluations";
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

  const assessmentResults = useMemo(
    () => mockAssessmentResults.filter((r) => r.studentId === student?.id),
    [student?.id]
  );

  const suitabilityResults = useMemo(
    () => mockSuitabilityResults.filter((r) => r.studentId === student?.id),
    [student?.id]
  );

  const readinessProfiles = useMemo(
    () => mockReadinessProfiles.filter((r) => r.studentId === student?.id),
    [student?.id]
  );

  const checkIns = useMemo(
    () => mockCheckIns.filter((c) => c.studentId === student?.id),
    [student?.id]
  );

  const feedbacks = useMemo(
    () => mockStudentFeedback.filter((f) => f.studentId === student?.id),
    [student?.id]
  );

  const outcomes = useMemo(
    () => mockInternshipOutcomes.filter((o) => o.studentId === student?.id),
    [student?.id]
  );

  return {
    student,
    applications,
    recommendations,
    allocations,
    activeAllocation,
    assessmentResults,
    suitabilityResults,
    readinessProfiles,
    checkIns,
    feedbacks,
    outcomes,
    stats: {
      applicationsCount:    applications.length,
      recommendationsCount: recommendations.length,
      shortlistedCount:     applications.filter((a) => a.status === "Shortlisted").length,
      allocationsCount:     allocations.filter((a) => a.status === "Approved").length,
      topMatchScore:        recommendations[0]?.matchScore ?? 0,
      topSuitability:       suitabilityResults[0]?.overallScore ?? 0,
      currentReadiness:     readinessProfiles[0]?.currentReadiness ?? 0,
      assessmentsPassed:    assessmentResults.filter((r) => r.passed).length,
    },
  };
}
