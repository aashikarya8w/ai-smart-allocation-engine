export interface CompanyEvaluation {
  id: string;
  allocationId: string;
  internshipId: string;
  internshipTitle: string;
  companyId: string;
  companyName: string;
  studentId: string;
  studentName: string;

  // Ratings 1-5
  technicalPerformance: number;
  projectPerformance: number;
  communication: number;
  discipline: number;
  overallPerformance: number;

  comments: string;
  wouldRecommend: boolean;
  submittedAt: string;
}

export interface StudentFeedback {
  id: string;
  allocationId: string;
  internshipId: string;
  internshipTitle: string;
  companyId: string;
  companyName: string;
  studentId: string;

  // Ratings 1-5
  learningExperience: number;
  mentorship: number;
  workEnvironment: number;
  overallExperience: number;

  suggestions: string;
  wouldRecommend: boolean;
  submittedAt: string;
}

export interface InternshipOutcome {
  id: string;
  allocationId: string;
  internshipId: string;
  internshipTitle: string;
  companyId: string;
  companyName: string;
  studentId: string;

  skillsGained: string[];
  skillGrowthPercent: number;
  overallPerformance: number; // avg of company eval
  learningOutcome: number;    // from student feedback
  satisfaction: number;       // from student feedback
  projectsCompleted: number;

  futureRecommendations: string[];
  strengths: string[];
  areasForImprovement: string[];

  completedAt: string;
}
