import { Education } from "./education";

export type WorkMode = "Remote" | "Hybrid" | "On-site" | "Any";
export type Gender = "Male" | "Female" | "Other" | "Prefer not to say";
export type VerificationStatus = "Pending" | "Verified" | "Rejected";

export interface Student {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  avatar?: string;
  dateOfBirth: string;
  gender: Gender;
  state: string;
  city: string;

  // Education
  education: Education[];
  university: string;
  branch: string;
  degree: string;
  cgpa: number;
  graduationYear: number;

  // Skills & Preferences
  skills: string[];
  interests: string[];
  preferredLocations: string[];
  preferredSectors: string[];
  workMode: WorkMode;

  // Previous experience
  previousInternships: PreviousInternship[];

  // Platform
  profileCompletion: number; // 0-100
  verificationStatus: VerificationStatus;
  isActive: boolean;
  resumeUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;

  createdAt: string;
  updatedAt: string;
}

export interface PreviousInternship {
  id: string;
  company: string;
  role: string;
  duration: string;
  year: number;
  description?: string;
}
