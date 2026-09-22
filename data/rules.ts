import type { MatchingRule } from "@/types/rule";

export const mockRules: MatchingRule[] = [
  {
    id: "rule1",
    name: "Default Matching Rule",
    weights: {
      skillMatch: 40,
      qualification: 20,
      location: 15,
      interest: 15,
      experience: 10,
    },
    constraints: [
      {
        id: "con1",
        type: "cgpa_minimum",
        label: "Minimum CGPA",
        value: 6.0,
        isEnabled: true,
      },
      {
        id: "con2",
        type: "seat_limit",
        label: "Max Allocations per Student",
        value: 1,
        isEnabled: true,
      },
      {
        id: "con3",
        type: "location_priority",
        label: "Prefer Same State",
        value: "enabled",
        isEnabled: true,
      },
      {
        id: "con4",
        type: "branch_restriction",
        label: "Enforce Branch Eligibility",
        value: "strict",
        isEnabled: true,
      },
    ],
    eligibilityCriteria: {
      minimumCGPA: 6.0,
      allowedBranches: [],
      minimumSkills: 2,
      requireResume: false,
      requireVerification: false,
    },
    isActive: true,
    createdAt: "2025-01-01T08:00:00Z",
    updatedAt: "2025-06-01T10:00:00Z",
  },
  {
    id: "rule2",
    name: "Premium Placement Rule",
    weights: {
      skillMatch: 50,
      qualification: 20,
      location: 10,
      interest: 10,
      experience: 10,
    },
    constraints: [
      {
        id: "con5",
        type: "cgpa_minimum",
        label: "Minimum CGPA",
        value: 8.0,
        isEnabled: true,
      },
      {
        id: "con6",
        type: "seat_limit",
        label: "Max Allocations per Student",
        value: 1,
        isEnabled: true,
      },
      {
        id: "con7",
        type: "branch_restriction",
        label: "Enforce Branch Eligibility",
        value: "strict",
        isEnabled: true,
      },
    ],
    eligibilityCriteria: {
      minimumCGPA: 8.0,
      allowedBranches: ["Computer Science", "Information Technology"],
      minimumSkills: 4,
      requireResume: true,
      requireVerification: true,
    },
    isActive: false,
    createdAt: "2025-02-01T08:00:00Z",
    updatedAt: "2025-05-15T10:00:00Z",
  },
];
