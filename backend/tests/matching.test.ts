import request  from "supertest";
import mongoose from "mongoose";
import app      from "../src/app";
import { connectDatabase }    from "../src/config/database";
import { User }           from "../src/models/User";
import { Student }        from "../src/models/Student";
import { Company }        from "../src/models/Company";
import { Internship }     from "../src/models/Internship";
import { Recommendation } from "../src/models/Recommendation";

let studentToken = "";
let adminToken   = "";
let studentId    = "";
let internshipId = "";

const cleanup = async () => {
  await User.deleteMany({       email: { $regex: /^test_match_/ } });
  await Student.deleteMany({    email: { $regex: /^test_match_/ } });
  await Company.deleteMany({    email: { $regex: /^test_match_/ } });
  await Internship.deleteMany({ title: { $regex: /^TEST MATCH/ } });
  if (studentId) await Recommendation.deleteMany({ studentId });
};

beforeAll(async () => {
  await cleanup();

  const { hashPassword } = await import("../src/utils/password");

  // Admin
  await User.create({
    name: "Match Admin", email: "test_match_admin@sih.com",
    password: await hashPassword("Test@12345"),
    role: "admin", isEmailVerified: true, isActive: true,
  });

  // Student with known skills
  const sUser = await User.create({
    name: "Match Student", email: "test_match_student@sih.com",
    password: await hashPassword("Test@12345"),
    role: "student", isEmailVerified: true, isActive: true,
  });
  const student = await Student.create({
    userId: sUser._id, fullName: "Match Student",
    email: "test_match_student@sih.com",
    university: "Test Univ", branch: "Computer Science",
    degree: "B.Tech", cgpa: 8.5, graduationYear: 2025,
    city: "Bengaluru", state: "Karnataka",
    skills: [
      { name: "React",      level: "Advanced",     yearsOfExperience: 2 },
      { name: "Node.js",    level: "Intermediate", yearsOfExperience: 1 },
      { name: "TypeScript", level: "Intermediate", yearsOfExperience: 1 },
    ],
    interests: ["Web Development", "Full Stack"],
    preferredLocations: ["Bengaluru", "Pune"],
    preferredSectors: ["Software Development"],
    preferredWorkMode: "Remote",
    profileCompletion: 85, verificationStatus: "Verified", isActive: true,
  });
  studentId = String(student._id);

  // Company
  const cUser = await User.create({
    name: "Match Corp", email: "test_match_company@sih.com",
    password: await hashPassword("Test@12345"),
    role: "company", isEmailVerified: true, isActive: true,
  });
  const company = await Company.create({
    userId: cUser._id, companyName: "Match Corp",
    email: "test_match_company@sih.com",
    industry: "Software Development",
    city: "Bengaluru", state: "Karnataka",
    verificationStatus: "Verified", isActive: true,
  });

  // Internship requiring exact student skills
  const intern = await Internship.create({
    companyId: company._id, companyName: "Match Corp",
    title: "TEST MATCH React Developer Intern",
    description: "React developer internship to test matching engine accuracy.",
    sector: "Software Development",
    requiredSkills: ["React", "Node.js", "TypeScript"],
    qualification: "B.Tech",
    eligibleBranches: ["Computer Science"],
    minimumCGPA: 7.0,
    state: "Karnataka", city: "Bengaluru",
    workMode: "Remote", duration: "3 Months",
    stipendMin: 15000, stipendMax: 25000,
    totalSeats: 5, availableSeats: 5,
    startDate: new Date("2027-08-01"),
    endDate:   new Date("2027-10-31"),
    applicationDeadline: new Date("2027-07-25"),
    status: "Active", isPublished: true,
  });
  internshipId = String(intern._id);

  // Login
  const [s, a] = await Promise.all([
    request(app).post("/api/auth/login").send({ email: "test_match_student@sih.com", password: "Test@12345", role: "student" }),
    request(app).post("/api/auth/login").send({ email: "test_match_admin@sih.com",   password: "Test@12345", role: "admin"   }),
  ]);
  studentToken = s.body.data.accessToken;
  adminToken   = a.body.data.accessToken;
}, 20_000);

afterAll(async () => {
  await cleanup();
  // Do NOT close — connection is shared across the test suite
});

/* ── Score calculation ───────────────────────────────────── */
describe("Matching — Score", () => {
  it("returns score between 0 and 100", async () => {
    const res = await request(app)
      .get(`/api/matching/score/${studentId}/${internshipId}`)
      .set("Authorization", `Bearer ${studentToken}`);
    expect(res.status).toBe(200);
    expect(res.body.data.matchScore).toBeGreaterThanOrEqual(0);
    expect(res.body.data.matchScore).toBeLessThanOrEqual(100);
  });

  it("has all 5 breakdown components", async () => {
    const res = await request(app)
      .get(`/api/matching/score/${studentId}/${internshipId}`)
      .set("Authorization", `Bearer ${studentToken}`);
    const { breakdown } = res.body.data;
    expect(breakdown.skills).toBeDefined();
    expect(breakdown.qualification).toBeDefined();
    expect(breakdown.location).toBeDefined();
    expect(breakdown.interest).toBeDefined();
    expect(breakdown.experience).toBeDefined();
  });

  it("returns matched and missing skills arrays", async () => {
    const res = await request(app)
      .get(`/api/matching/score/${studentId}/${internshipId}`)
      .set("Authorization", `Bearer ${studentToken}`);
    expect(Array.isArray(res.body.data.matchedSkills)).toBe(true);
    expect(Array.isArray(res.body.data.missingSkills)).toBe(true);
  });

  it("skill score is high when student has all required skills", async () => {
    const res = await request(app)
      .get(`/api/matching/score/${studentId}/${internshipId}`)
      .set("Authorization", `Bearer ${studentToken}`);
    // Student has React, Node.js, TypeScript — internship requires all three
    expect(res.body.data.breakdown.skills).toBeGreaterThanOrEqual(80);
  });

  it("returns eligibility boolean", async () => {
    const res = await request(app)
      .get(`/api/matching/score/${studentId}/${internshipId}`)
      .set("Authorization", `Bearer ${studentToken}`);
    expect(typeof res.body.data.isEligible).toBe("boolean");
    // CGPA 8.5 ≥ min 7.0, CS branch is eligible
    expect(res.body.data.isEligible).toBe(true);
  });

  it("returns non-empty reasons array", async () => {
    const res = await request(app)
      .get(`/api/matching/score/${studentId}/${internshipId}`)
      .set("Authorization", `Bearer ${studentToken}`);
    expect(Array.isArray(res.body.data.reasons)).toBe(true);
    expect(res.body.data.reasons.length).toBeGreaterThan(0);
  });
});

/* ── Recommendations ─────────────────────────────────────── */
describe("Matching — Recommendations", () => {
  it("generates recommendations for student", async () => {
    const res = await request(app)
      .post("/api/matching/recommendations/generate")
      .set("Authorization", `Bearer ${studentToken}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("gets student recommendations", async () => {
    const res = await request(app)
      .get("/api/matching/recommendations")
      .set("Authorization", `Bearer ${studentToken}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("all recommendation scores are valid", async () => {
    const res = await request(app)
      .get("/api/matching/recommendations")
      .set("Authorization", `Bearer ${studentToken}`);
    for (const rec of res.body.data) {
      expect(rec.matchScore).toBeGreaterThanOrEqual(0);
      expect(rec.matchScore).toBeLessThanOrEqual(100);
    }
  });

  it("recommendations are sorted descending by score", async () => {
    const res = await request(app)
      .get("/api/matching/recommendations")
      .set("Authorization", `Bearer ${studentToken}`);
    const scores: number[] = res.body.data.map((r: { matchScore: number }) => r.matchScore);
    for (let i = 0; i < scores.length - 1; i++) {
      expect(scores[i]).toBeGreaterThanOrEqual(scores[i + 1]);
    }
  });
});

/* ── Admin matching ──────────────────────────────────────── */
describe("Matching — Admin controls", () => {
  it("admin can run AI matching for all students", async () => {
    const res = await request(app)
      .post("/api/matching/run")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(typeof res.body.data.processed).toBe("number");
  });

  it("admin can view matching results", async () => {
    const res = await request(app)
      .get("/api/matching/results")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(typeof res.body.data.total).toBe("number");
  });

  it("student cannot run AI matching", async () => {
    const res = await request(app)
      .post("/api/matching/run")
      .set("Authorization", `Bearer ${studentToken}`);
    expect(res.status).toBe(403);
  });
});

/* ── Skill Gap ───────────────────────────────────────────── */
describe("Skill Gap", () => {
  it("returns readiness score", async () => {
    const res = await request(app)
      .get("/api/skill-gap")
      .set("Authorization", `Bearer ${studentToken}`);
    expect(res.status).toBe(200);
    expect(typeof res.body.data.readiness).toBe("number");
    expect(res.body.data.readiness).toBeGreaterThanOrEqual(0);
    expect(res.body.data.readiness).toBeLessThanOrEqual(100);
  });

  it("for specific internship returns skill arrays", async () => {
    const res = await request(app)
      .get(`/api/skill-gap/internship/${internshipId}`)
      .set("Authorization", `Bearer ${studentToken}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data.matchedSkills)).toBe(true);
    expect(Array.isArray(res.body.data.missingSkills)).toBe(true);
  });
});

/* ── Readiness Twin ──────────────────────────────────────── */
describe("Readiness Twin", () => {
  it("returns overall readiness 0-100", async () => {
    const res = await request(app)
      .get("/api/readiness")
      .set("Authorization", `Bearer ${studentToken}`);
    expect(res.status).toBe(200);
    expect(res.body.data.overall).toBeGreaterThanOrEqual(0);
    expect(res.body.data.overall).toBeLessThanOrEqual(100);
  });

  it("has all required dimensions", async () => {
    const res = await request(app)
      .get("/api/readiness")
      .set("Authorization", `Bearer ${studentToken}`);
    const d = res.body.data;
    expect(d.skills).toBeDefined();
    expect(d.assessment).toBeDefined();
    expect(d.projects).toBeDefined();
    expect(d.qualification).toBeDefined();
    expect(d.preferences).toBeDefined();
  });
});

/* ── What-If Simulator ───────────────────────────────────── */
describe("What-If Simulator", () => {
  it("RULE 6 — does NOT modify student profile", async () => {
    const before = await Student.findById(studentId).lean();

    await request(app)
      .post("/api/simulator")
      .set("Authorization", `Bearer ${studentToken}`)
      .send({
        internshipId,
        changes: { skills: ["Kubernetes", "GraphQL"], cgpa: 9.9, city: "Mumbai" },
      });

    const after = await Student.findById(studentId).lean();
    expect(after?.cgpa).toBe(before?.cgpa);
    expect(after?.city).toBe(before?.city);
    expect(after?.skills.length).toBe(before?.skills.length);
  });

  it("returns both current and simulated scores", async () => {
    const res = await request(app)
      .post("/api/simulator")
      .set("Authorization", `Bearer ${studentToken}`)
      .send({ internshipId, changes: { skills: ["Docker", "AWS"] } });
    expect(res.status).toBe(200);
    expect(res.body.data.current.matchScore).toBeDefined();
    expect(res.body.data.simulated.matchScore).toBeDefined();
    expect(res.body.data.improvement).toBeDefined();
  });

  it("adding required skills improves or maintains score", async () => {
    const res = await request(app)
      .post("/api/simulator")
      .set("Authorization", `Bearer ${studentToken}`)
      .send({
        internshipId,
        changes: { skills: ["React", "Node.js", "TypeScript", "Docker", "AWS"] },
      });
    expect(res.body.data.simulated.matchScore).toBeGreaterThanOrEqual(
      res.body.data.current.matchScore
    );
  });

  it("includes disclaimer note", async () => {
    const res = await request(app)
      .post("/api/simulator")
      .set("Authorization", `Bearer ${studentToken}`)
      .send({ internshipId, changes: {} });
    expect(res.body.data.note).toContain("no actual profile data was modified");
  });
});
