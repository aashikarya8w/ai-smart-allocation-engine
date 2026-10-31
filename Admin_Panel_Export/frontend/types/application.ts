export type ApplicationStatus =
  | "Applied"
  | "Shortlisted"
  | "Rejected"
  | "Waitlisted"
  | "Allocated"
  | "Withdrawn";

export interface Application {
  id: string;
  studentId: string;
  studentName: string;
  studentAvatar?: string;
  internshipId: string;
  internshipTitle: string;
  companyId: string;
  companyName: string;

  status: ApplicationStatus;
  appliedAt: string;
  updatedAt: string;

  coverLetter?: string;
  matchScore: number;

  // Score breakdown
  scoreBreakdown: ScoreBreakdown;
}

export interface ScoreBreakdown {
  skillMatch: number;
  qualification: number;
  location: number;
  interest: number;
  experience: number;
  overall: number;
}
