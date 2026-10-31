export type QuestionType = "MCQ" | "MultipleChoice" | "TrueFalse";
export type AssessmentStatus = "NotStarted" | "InProgress" | "Completed" | "Expired";
export type DifficultyLevel = "Easy" | "Medium" | "Hard";

export interface AssessmentQuestion {
  id: string;
  questionText: string;
  type: QuestionType;
  options: string[];
  correctOption: number; // index
  difficulty: DifficultyLevel;
  marks: number;
}

export interface Assessment {
  id: string;
  internshipId: string;
  internshipTitle: string;
  companyId: string;
  companyName: string;
  title: string;
  description: string;
  duration: number; // in minutes
  totalQuestions: number;
  passingScore: number; // percentage
  questions: AssessmentQuestion[];
  isRequired: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AssessmentAttempt {
  id: string;
  assessmentId: string;
  internshipId: string;
  studentId: string;
  answers: Record<string, number>; // questionId -> selectedOption index
  score: number; // raw score
  percentage: number; // 0-100
  passed: boolean;
  timeTaken: number; // in seconds
  status: AssessmentStatus;
  startedAt: string;
  completedAt?: string;
}

export interface AssessmentResult {
  id: string;
  assessmentId: string;
  assessmentTitle: string;
  internshipId: string;
  internshipTitle: string;
  companyName: string;
  studentId: string;
  score: number;
  percentage: number;
  passed: boolean;
  totalQuestions: number;
  attempted: number;
  correct: number;
  timeTaken: number;
  completedAt: string;
}
