export interface Recommendation {
  id: string;
  studentId: string;
  internshipId: string;
  internshipTitle: string;
  companyId: string;
  companyName: string;
  companyLogo?: string;
  sector: string;
  location: string;
  workMode: string;
  stipendMin: number;
  stipendMax: number;
  duration: string;

  matchScore: number;
  scoreBreakdown: RecommendationScoreBreakdown;
  matchReasons: string[];
  whyThisMatch: string;

  isSaved: boolean;
  isApplied: boolean;
  createdAt: string;
}

export interface RecommendationScoreBreakdown {
  skillMatch: number;
  qualification: number;
  location: number;
  interest: number;
  experience: number;
}
