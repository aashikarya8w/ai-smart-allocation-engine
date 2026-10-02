export interface SuitabilityBreakdown {
  skillMatch: number;
  assessmentScore: number;
  qualification: number;
  cgpa: number;
  projects: number;
  experience: number;
  interests: number;
  preferences: number;
  location: number;
  workMode: number;
}

export interface SuitabilityResult {
  id: string;
  studentId: string;
  internshipId: string;
  internshipTitle: string;
  companyId: string;
  companyName: string;
  overallScore: number; // 0-100
  breakdown: SuitabilityBreakdown;
  strengths: string[];
  improvements: string[];
  calculatedAt: string;
}
