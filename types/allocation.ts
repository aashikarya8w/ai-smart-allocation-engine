export type AllocationStatus =
  | "Recommended"
  | "Pending"
  | "Approved"
  | "Rejected"
  | "Completed";

export interface Allocation {
  id: string;
  studentId: string;
  studentName: string;
  studentAvatar?: string;
  internshipId: string;
  internshipTitle: string;
  companyId: string;
  companyName: string;
  companyLogo?: string;

  status: AllocationStatus;
  matchScore: number;
  scoreBreakdown: AllocationScoreBreakdown;
  selectionReasons: string[];

  startDate: string;
  endDate: string;
  stipend: number;
  location: string;
  workMode: string;

  allocationLetterUrl?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  reviewNotes?: string;

  createdAt: string;
  updatedAt: string;
}

export interface AllocationScoreBreakdown {
  skillMatch: number;
  qualification: number;
  location: number;
  interest: number;
  experience: number;
  overall: number;
}
