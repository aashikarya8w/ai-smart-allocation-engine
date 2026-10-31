import { Student }          from "../models/Student";
import { Allocation }        from "../models/Allocation";
import { Feedback }          from "../models/Feedback";
import { Evaluation }        from "../models/Evaluation";
import { AssessmentAttempt } from "../models/AssessmentAttempt";
import { AppError }          from "../middleware/errorMiddleware";

export async function generateOutcome(studentId: string, internshipId: string) {
  const [allocation, feedback, evaluation, attempts] = await Promise.all([
    Allocation.findOne({ studentId, internshipId, status: "Approved" }).lean(),
    Feedback.findOne({ studentId, internshipId }).lean(),
    Evaluation.findOne({ studentId, internshipId }).lean(),
    AssessmentAttempt.find({ studentId, internshipId, status: "Submitted" }).lean(),
  ]);

  if (!allocation) throw new AppError("No approved allocation found", 404, "NOT_FOUND");

  const assessmentAvg = attempts.length > 0
    ? Math.round(attempts.reduce((s, a) => s + a.percentage, 0) / attempts.length)
    : 0;

  const companyRating = evaluation
    ? Math.round(
        (evaluation.technicalRating + evaluation.projectRating +
         evaluation.communicationRating + evaluation.disciplineRating +
         evaluation.overallRating) / 5 * 20
      )
    : 0;

  const studentSatisfaction = feedback?.overallRating
    ? Math.round(feedback.overallRating * 20)
    : 0;

  const overallScore = Math.round(
    allocation.matchScore   * 0.30 +
    assessmentAvg           * 0.25 +
    companyRating           * 0.30 +
    studentSatisfaction     * 0.15
  );

  const strengths:    string[] = evaluation?.strengths    ?? [];
  const improvements: string[] = evaluation?.improvements ?? [];

  return {
    studentId,
    internshipId,
    allocationId:       String(allocation._id),
    internshipTitle:    allocation.internshipTitle,
    companyName:        allocation.companyName,
    overallScore,
    matchScore:         allocation.matchScore,
    assessmentAverage:  assessmentAvg,
    companyRating,
    studentSatisfaction,
    strengths,
    improvements,
    feedback: feedback ? {
      learning:    feedback.learningRating,
      experience:  feedback.experienceRating,
      mentorship:  feedback.mentorshipRating,
      workEnv:     feedback.workEnvRating,
      overall:     feedback.overallRating,
      comments:    feedback.comments,
      wouldRecommend: feedback.wouldRecommend,
    } : null,
    evaluation: evaluation ? {
      technical:     evaluation.technicalRating,
      project:       evaluation.projectRating,
      communication: evaluation.communicationRating,
      discipline:    evaluation.disciplineRating,
      overall:       evaluation.overallRating,
      comments:      evaluation.comments,
      wouldRehire:   evaluation.wouldRehire,
    } : null,
    completedAt:  new Date(),
    note: "Subjective feedback does not automatically affect future allocation decisions.",
  };
}

export async function getStudentOutcomes(studentId: string) {
  const allocations = await Allocation.find({ studentId, status: "Approved" }).lean();
  const outcomes    = await Promise.all(
    allocations.map(a => generateOutcome(studentId, String(a.internshipId)).catch(() => null))
  );
  return outcomes.filter(Boolean);
}

export async function getPerformanceInsights(studentId: string) {
  const student = await Student.findById(studentId).lean();
  if (!student) throw new AppError("Student not found", 404, "NOT_FOUND");

  const evaluations = await Evaluation.find({ studentId }).lean();
  const attempts    = await AssessmentAttempt.find({ studentId, status: "Submitted" }).lean();

  const avgEvaluation = evaluations.length > 0
    ? {
        technical:     Math.round(evaluations.reduce((s, e) => s + e.technicalRating, 0)     / evaluations.length * 20),
        project:       Math.round(evaluations.reduce((s, e) => s + e.projectRating, 0)       / evaluations.length * 20),
        communication: Math.round(evaluations.reduce((s, e) => s + e.communicationRating, 0) / evaluations.length * 20),
        discipline:    Math.round(evaluations.reduce((s, e) => s + e.disciplineRating, 0)    / evaluations.length * 20),
      }
    : null;

  const avgAssessment = attempts.length > 0
    ? Math.round(attempts.reduce((s, a) => s + a.percentage, 0) / attempts.length)
    : null;

  const allStrengths    = evaluations.flatMap(e => e.strengths);
  const allImprovements = evaluations.flatMap(e => e.improvements);

  // Frequency count
  const freq = (arr: string[]) => {
    const map: Record<string, number> = {};
    arr.forEach(s => { map[s] = (map[s] ?? 0) + 1; });
    return Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([s]) => s);
  };

  return {
    studentId,
    skills:           student.skills.map((s: { name: string }) => s.name),
    averageAssessment: avgAssessment,
    averageEvaluation: avgEvaluation,
    topStrengths:      freq(allStrengths),
    areasToImprove:    freq(allImprovements),
    internshipsCompleted: evaluations.length,
    assessmentsTaken:     attempts.length,
    assessmentPassRate:   attempts.length > 0
      ? Math.round(attempts.filter(a => a.passed).length / attempts.length * 100)
      : null,
  };
}
