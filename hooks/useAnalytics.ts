"use client";

import {
  mockAnalyticsSummary,
  mockApplicationAnalytics,
  mockAllocationAnalytics,
  mockSectorDistribution,
  mockSkillDemand,
  mockStateWiseStudents,
  mockSectorData,
  mockApplicationsOverTime,
  mockAllocationsOverTime,
  mockAllocationStatusData,
  mockApplicationStatusData,
} from "@/data/analytics";

export function useAnalytics() {
  return {
    summary: mockAnalyticsSummary,
    applicationAnalytics: mockApplicationAnalytics,
    allocationAnalytics: mockAllocationAnalytics,
    sectorDistribution: mockSectorDistribution,
    skillDemand: mockSkillDemand,
    stateData: mockStateWiseStudents,
    sectorData: mockSectorData,
    applicationsOverTime: mockApplicationsOverTime,
    allocationsOverTime: mockAllocationsOverTime,
    allocationStatusData: mockAllocationStatusData,
    applicationStatusData: mockApplicationStatusData,
  };
}
