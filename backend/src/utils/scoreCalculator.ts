/**
 * Rule-based matching engine.
 * Weights are injected at call time (read from DB via matchingService).
 * Designed so a Python ML service can replace this later.
 */

export interface ScoreWeights {
  skillMatch:    number; // 0-100 (sum = 100)
  qualification: number;
  location:      number;
  interest:      number;
  experience:    number;
}

export interface StudentProfile {
  skills:             string[];
  interests:          string[];
  preferredLocations: string[];
  preferredSectors:   string[];
  preferredWorkMode:  string;
  cgpa:               number;
  graduationYear:     number;
  branch:             string;
  degree:             string;
  city:               string;
  state:              string;
  experienceCount:    number; // projects + prev internships
}

export interface InternshipProfile {
  requiredSkills:   string[];
  sector:           string;
  location:         string;
  city:             string;
  state:            string;
  workMode:         string;
  minimumCGPA:      number;
  eligibleBranches: string[];
  qualification:    string;
}

export interface ScoreResult {
  totalScore:        number;
  skillScore:        number;
  qualificationScore:number;
  locationScore:     number;
  interestScore:     number;
  experienceScore:   number;
  matchedSkills:     string[];
  missingSkills:     string[];
  isEligible:        boolean;
  reasons:           string[];
}

function clamp(v: number): number {
  return Math.min(100, Math.max(0, Math.round(v)));
}

function normalize(arr: string[]): string[] {
  return arr.map((s) => s.trim().toLowerCase());
}

export function calculateScore(
  student: StudentProfile,
  internship: InternshipProfile,
  weights: ScoreWeights
): ScoreResult {
  const reasons: string[] = [];

  /* ── Eligibility ──────────────────────────────────────── */
  let isEligible = true;

  if (student.cgpa < internship.minimumCGPA) {
    isEligible = false;
    reasons.push(`CGPA ${student.cgpa} below minimum ${internship.minimumCGPA}`);
  }

  const studentBranchLower = student.branch.toLowerCase();
  const eligibleLower = normalize(internship.eligibleBranches);
  if (
    internship.eligibleBranches.length > 0 &&
    !eligibleLower.some(
      (b) => studentBranchLower.includes(b) || b.includes(studentBranchLower)
    )
  ) {
    isEligible = false;
    reasons.push(`Branch '${student.branch}' not in eligible branches`);
  }

  /* ── Skill Score ──────────────────────────────────────── */
  const required = normalize(internship.requiredSkills);
  const studentSkills = normalize(student.skills);
  const matchedSkillsLower: string[] = [];
  const missingSkillsLower: string[] = [];

  for (const req of required) {
    const matched = studentSkills.some(
      (s) => s.includes(req) || req.includes(s)
    );
    if (matched) matchedSkillsLower.push(req);
    else missingSkillsLower.push(req);
  }

  const skillScore =
    required.length > 0
      ? clamp((matchedSkillsLower.length / required.length) * 100)
      : 100;

  // Restore original casing for output
  const matchedSkills = internship.requiredSkills.filter((s) =>
    matchedSkillsLower.includes(s.toLowerCase())
  );
  const missingSkills = internship.requiredSkills.filter((s) =>
    missingSkillsLower.includes(s.toLowerCase())
  );

  if (skillScore >= 80) reasons.push("Strong skill match");
  else if (skillScore >= 50) reasons.push("Partial skill match");
  else reasons.push("Low skill match");

  /* ── Qualification Score ──────────────────────────────── */
  let qualificationScore = 0;

  // CGPA component (60% of qualification score)
  const cgpaScore = Math.min(100, ((student.cgpa - internship.minimumCGPA) / (10 - internship.minimumCGPA)) * 100);
  qualificationScore += Math.max(0, cgpaScore) * 0.6;

  // Branch match (40% of qualification score)
  const branchMatch = eligibleLower.length === 0 ||
    eligibleLower.some((b) => studentBranchLower.includes(b) || b.includes(studentBranchLower));
  if (branchMatch) {
    qualificationScore += 40;
    reasons.push("Qualification matched");
  }

  qualificationScore = clamp(qualificationScore);

  /* ── Location Score ───────────────────────────────────── */
  let locationScore = 0;

  if (internship.workMode === "Remote") {
    locationScore = 100;
    reasons.push("Remote internship — location flexible");
  } else {
    const preferredLower = normalize(student.preferredLocations);
    const internshipCity  = internship.city.toLowerCase();
    const internshipState = internship.state.toLowerCase();

    const cityMatch  = preferredLower.some((l) => l.includes(internshipCity) || internshipCity.includes(l));
    const stateMatch = preferredLower.some((l) => l.includes(internshipState) || internshipState.includes(l));
    const currentCity  = student.city.toLowerCase() === internshipCity;
    const currentState = student.state.toLowerCase() === internshipState;

    if (cityMatch || currentCity)        { locationScore = 100; reasons.push("Preferred city matched"); }
    else if (stateMatch || currentState) { locationScore = 70;  reasons.push("Same state matched");     }
    else                                 { locationScore = 20;  }

    // Work mode bonus
    if (student.preferredWorkMode === internship.workMode) {
      locationScore = clamp(locationScore + 10);
      reasons.push("Work mode preference matched");
    }
  }
  locationScore = clamp(locationScore);

  /* ── Interest Score ───────────────────────────────────── */
  const interestsLower = normalize(student.interests);
  const sectorLower    = internship.sector.toLowerCase();
  const prefSectorsLow = normalize(student.preferredSectors);

  let interestScore = 0;
  if (prefSectorsLow.some((s) => s.includes(sectorLower) || sectorLower.includes(s))) {
    interestScore = 100;
    reasons.push("Preferred sector matched");
  } else if (interestsLower.some((i) => sectorLower.includes(i) || i.includes(sectorLower))) {
    interestScore = 80;
    reasons.push("Interest aligned with sector");
  } else {
    interestScore = 30;
  }
  interestScore = clamp(interestScore);

  /* ── Experience Score ─────────────────────────────────── */
  let experienceScore = 0;
  if (student.experienceCount >= 3)      experienceScore = 100;
  else if (student.experienceCount === 2) experienceScore = 75;
  else if (student.experienceCount === 1) experienceScore = 50;
  else                                    experienceScore = 20;
  experienceScore = clamp(experienceScore);

  /* ── Weighted Total ───────────────────────────────────── */
  const w = weights;
  const totalScore = clamp(
    skillScore        * (w.skillMatch    / 100) +
    qualificationScore * (w.qualification / 100) +
    locationScore     * (w.location      / 100) +
    interestScore     * (w.interest      / 100) +
    experienceScore   * (w.experience    / 100)
  );

  return {
    totalScore,
    skillScore,
    qualificationScore,
    locationScore,
    interestScore,
    experienceScore,
    matchedSkills,
    missingSkills,
    isEligible,
    reasons,
  };
}
