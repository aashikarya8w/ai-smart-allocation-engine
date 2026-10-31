export interface MatchingRule {
  id: string;
  name: string;
  weights: ScoreWeights;
  constraints: AllocationConstraint[];
  eligibilityCriteria: EligibilityCriteria;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ScoreWeights {
  skillMatch: number; // 0-100, sum must be 100
  qualification: number;
  location: number;
  interest: number;
  experience: number;
}

export interface AllocationConstraint {
  id: string;
  type: "seat_limit" | "cgpa_minimum" | "branch_restriction" | "location_priority";
  label: string;
  value: string | number;
  isEnabled: boolean;
}

export interface EligibilityCriteria {
  minimumCGPA: number;
  allowedBranches: string[];
  minimumSkills: number;
  requireResume: boolean;
  requireVerification: boolean;
}
