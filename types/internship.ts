export type InternshipStatus =
  | "Draft"
  | "Pending"
  | "Active"
  | "Closed"
  | "Rejected";

export type WorkMode = "Remote" | "Hybrid" | "On-site";

export interface Internship {
  id: string;
  companyId: string;
  companyName: string;
  companyLogo?: string;

  title: string;
  description: string;
  sector: string;
  requiredSkills: string[];
  qualification: string;
  eligibleBranches: string[];
  minimumCGPA: number;

  state: string;
  city: string;
  workMode: WorkMode;

  duration: string;
  stipendMin: number;
  stipendMax: number;
  seats: number;
  availableSeats: number;
  startDate: string;
  endDate: string;

  status: InternshipStatus;
  isVerified: boolean;

  totalApplications: number;
  shortlistedCount: number;

  createdAt: string;
  updatedAt: string;
}
