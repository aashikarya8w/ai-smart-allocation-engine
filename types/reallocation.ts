export type ReallocationTrigger =
  | "StudentRejection"
  | "CompanyCancellation"
  | "VacantSeat"
  | "RequirementChange";

export type ReallocationStatus = "Pending" | "Approved" | "Rejected";

export type SwapStatus = "Requested" | "UnderReview" | "Approved" | "Rejected";

export interface Reallocation {
  id: string;
  originalAllocationId: string;
  vacatedStudentId: string;
  vacatedStudentName: string;
  internshipId: string;
  internshipTitle: string;
  companyId: string;
  companyName: string;
  trigger: ReallocationTrigger;
  recommendedStudentId: string;
  recommendedStudentName: string;
  recommendedSuitabilityScore: number;
  status: ReallocationStatus;
  adminNotes?: string;
  createdAt: string;
  resolvedAt?: string;
}

export interface SwapRequest {
  id: string;
  requestedBy: string; // studentId
  studentAId: string;
  studentAName: string;
  internshipAId: string;
  internshipATitle: string;
  companyAName: string;

  studentBId: string;
  studentBName: string;
  internshipBId: string;
  internshipBTitle: string;
  companyBName: string;

  // compatibility checks
  aEligibleForB: boolean;
  bEligibleForA: boolean;
  suitabilityAfterSwapA: number;
  suitabilityAfterSwapB: number;
  preferenceImprovement: boolean;
  seatConstraintsSatisfied: boolean;

  status: SwapStatus;
  adminNotes?: string;
  createdAt: string;
  resolvedAt?: string;
}

export interface CapacityScenario {
  id: string;
  name: string;
  description: string;
  // base values
  baseApplicants: number;
  baseSeats: number;
  baseCompanies: number;
  // adjustments
  applicantChangePercent: number; // e.g. +30 means 30% more
  seatChangePercent: number;      // e.g. -20 means 20% fewer
  newCompanies: number;
  // results
  expectedEligible: number;
  expectedAllocated: number;
  expectedWaitlisted: number;
  expectedUnallocated: number;
  seatUtilization: number;
  preferenceSatisfaction: number;
  createdAt: string;
}
