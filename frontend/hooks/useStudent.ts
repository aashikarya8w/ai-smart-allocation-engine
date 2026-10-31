"use client";

import { useMemo } from "react";
import type { Student } from "@/types/student";
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

  const student = useMemo<Student | null>(() => {
    if (!user) return null;
    if (typeof window !== "undefined") {
      try {
        const custom = JSON.parse(localStorage.getItem("internai_custom_students") || "[]");
        const found = custom.find(
          (s: any) => s.userId === user.id || s.email?.toLowerCase() === user.email?.toLowerCase()
        );
        if (found) return found as Student;
      } catch {}
    }
    const foundMock = mockStudents.find(
      (s) => s.userId === user.id || s.email?.toLowerCase() === user.email?.toLowerCase()
    );
    if (foundMock) return foundMock;

    if (user.role === "student") {
      return {
        ...mockStudents[0],
        id: `s_${user.id}`,
        userId: user.id,
        fullName: user.name || "Student",
        email: user.email,
      } as Student;
    }
    return null;
  }, [user]);

  const applications = useMemo(() => {
    const list = mockApplications.filter((a) => a.studentId === student?.id);
    return list.length > 0 ? list : mockApplications.slice(0, 4);
  }, [student?.id]);

  const recommendations = useMemo(() => {
    const list = mockRecommendations.filter((r) => r.studentId === student?.id);
    return list.length > 0 ? list : mockRecommendations.slice(0, 5);
  }, [student?.id]);

  const allocations = useMemo(() => {
    const list = mockAllocations.filter((a) => a.studentId === student?.id);
    return list.length > 0 ? list : mockAllocations.slice(0, 2);
  }, [student?.id]);

  const activeAllocation = useMemo(
    () => allocations.find((a) => a.status === "Approved") ?? allocations[0] ?? null,
    [allocations]
  );

  const assessmentResults = useMemo(() => {
    const list = mockAssessmentResults.filter((r) => r.studentId === student?.id);
    return list.length > 0 ? list : mockAssessmentResults;
  }, [student?.id]);

  const suitabilityResults = useMemo(() => {
    const list = mockSuitabilityResults.filter((r) => r.studentId === student?.id);
    return list.length > 0 ? list : mockSuitabilityResults.slice(0, 3);
  }, [student?.id]);

  const readinessProfiles = useMemo(() => {
    const list = mockReadinessProfiles.filter((r) => r.studentId === student?.id);
    return list.length > 0 ? list : mockReadinessProfiles.slice(0, 1);
  }, [student?.id]);

  const checkIns = useMemo(() => {
    const list = mockCheckIns.filter((c) => c.studentId === student?.id);
    return list.length > 0 ? list : mockCheckIns.slice(0, 3);
  }, [student?.id]);

  const feedbacks = useMemo(() => {
    const list = mockStudentFeedback.filter((f) => f.studentId === student?.id);
    return list.length > 0 ? list : mockStudentFeedback.slice(0, 2);
  }, [student?.id]);

  const outcomes = useMemo(() => {
    const list = mockInternshipOutcomes.filter((o) => o.studentId === student?.id);
    return list.length > 0 ? list : mockInternshipOutcomes.slice(0, 1);
  }, [student?.id]);

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
