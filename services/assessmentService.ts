import { mockAssessments, mockAssessmentResults } from "@/data/assessments";
import type { Assessment, AssessmentResult } from "@/types/assessment";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function getAssessmentsForStudent(studentId: string): Promise<Assessment[]> {
  await delay(400);
  const resultIds = new Set(
    mockAssessmentResults.filter((r) => r.studentId === studentId).map((r) => r.assessmentId)
  );
  return mockAssessments.filter((a) => !resultIds.has(a.id));
}

export async function getAssessmentById(id: string): Promise<Assessment | null> {
  await delay(300);
  return mockAssessments.find((a) => a.id === id) ?? null;
}

export async function getResultsForStudent(studentId: string): Promise<AssessmentResult[]> {
  await delay(300);
  return mockAssessmentResults.filter((r) => r.studentId === studentId);
}

export async function submitAssessment(
  assessmentId: string,
  studentId: string,
  answers: Record<string, number>,
  timeTaken: number
): Promise<AssessmentResult> {
  await delay(800);
  const assessment = mockAssessments.find((a) => a.id === assessmentId);
  if (!assessment) throw new Error("Assessment not found");

  let earnedMarks = 0;
  let totalMarks  = 0;
  let correct     = 0;

  assessment.questions.forEach((q) => {
    totalMarks += q.marks;
    if (answers[q.id] === q.correctOption) {
      earnedMarks += q.marks;
      correct++;
    }
  });

  const percentage = Math.round((earnedMarks / totalMarks) * 100);

  const result: AssessmentResult = {
    id: `ar_${Date.now()}`,
    assessmentId,
    assessmentTitle:  assessment.title,
    internshipId:     assessment.internshipId,
    internshipTitle:  assessment.internshipTitle,
    companyName:      assessment.companyName,
    studentId,
    score:            earnedMarks,
    percentage,
    passed:           percentage >= assessment.passingScore,
    totalQuestions:   assessment.totalQuestions,
    attempted:        Object.keys(answers).length,
    correct,
    timeTaken,
    completedAt:      new Date().toISOString(),
  };

  return result;
}
