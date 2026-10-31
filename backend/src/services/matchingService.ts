import { IStudent }    from "../models/Student";
import { IInternship } from "../models/Internship";
import { Rule }        from "../models/Rule";
import { Recommendation } from "../models/Recommendation";
import { Application }    from "../models/Application";
import { Student }        from "../models/Student";
import { Internship }     from "../models/Internship";
import { calculateScore, ScoreWeights } from "../utils/scoreCalculator";
import { DEFAULT_WEIGHTS } from "../utils/constants";

async function getWeights(): Promise<ScoreWeights> {
  const rule = await Rule.findOne({ type: "matching", isActive: true }).lean();
  if (rule?.weights) return rule.weights as ScoreWeights;
  return {
    skillMatch:    DEFAULT_WEIGHTS.skillMatch,
    qualification: DEFAULT_WEIGHTS.qualification,
    location:      DEFAULT_WEIGHTS.location,
    interest:      DEFAULT_WEIGHTS.interest,
    experience:    DEFAULT_WEIGHTS.experience,
  };
}

function buildStudentProfile(s: IStudent) {
  return {
    skills:             s.skills.map((sk) => sk.name),
    interests:          s.interests,
    preferredLocations: s.preferredLocations,
    preferredSectors:   s.preferredSectors,
    preferredWorkMode:  s.preferredWorkMode,
    cgpa:               s.cgpa,
    graduationYear:     s.graduationYear,
    branch:             s.branch,
    degree:             s.degree,
    city:               s.city ?? "",
    state:              s.state ?? "",
    experienceCount:    (s.projects?.length ?? 0) + (s.previousInternships?.length ?? 0),
  };
}

function buildInternshipProfile(i: IInternship) {
  return {
    requiredSkills:   i.requiredSkills,
    sector:           i.sector,
    location:         `${i.city}, ${i.state}`,
    city:             i.city,
    state:            i.state,
    workMode:         i.workMode,
    minimumCGPA:      i.minimumCGPA,
    eligibleBranches: i.eligibleBranches,
    qualification:    i.qualification,
  };
}

export const matchingService = {
  async score(student: IStudent, internship: IInternship) {
    const weights = await getWeights();
    return calculateScore(
      buildStudentProfile(student),
      buildInternshipProfile(internship),
      weights
    );
  },

  async generateRecommendations(studentId: string) {
    const student = await Student.findById(studentId);
    if (!student) return [];

    const internships = await Internship.find({ status: "Active", availableSeats: { $gt: 0 } }).lean();
    const weights     = await getWeights();
    const applied     = await Application.find({ studentId }).distinct("internshipId");
    const appliedSet  = new Set(applied.map(String));

    const results = [];
    for (const intern of internships) {
      const score = calculateScore(
        buildStudentProfile(student),
        buildInternshipProfile(intern as unknown as IInternship),
        weights
      );
      if (!score.isEligible) continue;
      results.push({ intern, score });
    }

    results.sort((a, b) => b.score.totalScore - a.score.totalScore);
    const top = results.slice(0, 20);

    // Upsert recommendations
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const docs = top.map(({ intern, score }) => ({
      studentId:          studentId,
      internshipId:       intern._id,
      companyId:          intern.companyId,
      internshipTitle:    intern.title,
      companyName:        intern.companyName,
      sector:             intern.sector,
      location:           `${intern.city}, ${intern.state}`,
      city:               intern.city,
      state:              intern.state,
      workMode:           intern.workMode,
      duration:           intern.duration,
      stipendMin:         intern.stipendMin,
      stipendMax:         intern.stipendMax,
      matchScore:         score.totalScore,
      skillScore:         score.skillScore,
      qualificationScore: score.qualificationScore,
      locationScore:      score.locationScore,
      interestScore:      score.interestScore,
      experienceScore:    score.experienceScore,
      matchedSkills:      score.matchedSkills,
      missingSkills:      score.missingSkills,
      reasons:            score.reasons,
      whyThisMatch:       score.reasons.slice(0, 3).join(". "),
      isEligible:         score.isEligible,
      isApplied:          appliedSet.has(String(intern._id)),
      isSaved:            false,
      expiresAt:          expires,
      generatedAt:        new Date(),
    }));

    // Delete old then insert fresh
    await Recommendation.deleteMany({ studentId });
    if (docs.length) await Recommendation.insertMany(docs);
    return docs;
  },

  async runForAll() {
    const students = await Student.find({ isActive: true }).lean();
    let processed  = 0;
    for (const s of students) {
      await matchingService.generateRecommendations(String(s._id));
      processed++;
    }
    return { processed, total: students.length };
  },
};
