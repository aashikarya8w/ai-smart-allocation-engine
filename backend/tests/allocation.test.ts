import request  from "supertest";
import mongoose from "mongoose";
import app      from "../src/app";
import { User }        from "../src/models/User";
import { Student }     from "../src/models/Student";
import { Company }     from "../src/models/Company";
import { Internship }  from "../src/models/Internship";
import { Application } from "../src/models/Application";
import { Allocation }  from "../src/models/Allocation";
import { hashPassword } from "../src/utils/password";

const AA = "alloc_admin@sih25033.test";
const AC = "alloc_company@sih25033.test";

const SEATS = 3;
let adminToken   = "";
let companyToken = "";
let internshipId = "";

beforeAll(async () => {
  // Cleanup by email pattern
  await User.deleteMany({    email: { $regex: /alloc.*@sih25033\.test/ } });
  await Student.deleteMany({ email: { $regex: /alloc_s\d+@sih25033\.test/ } });
  await Company.deleteMany({ email: AC });
  await Internship.deleteMany({ title: { $regex: /^TEST_ALLOC/ } });

  const pwd = await hashPassword("Test@12345");

  const [aU, cU] = await Promise.all([
    User.create({ name:"Alloc Admin", email: AA, password: pwd, role:"admin",   isEmailVerified:true, isActive:true }),
    User.create({ name:"Alloc Corp",  email: AC, password: pwd, role:"company", isEmailVerified:true, isActive:true }),
  ]);
  const company = await Company.create({ userId:cU._id, companyName:"Alloc Corp", email: AC, industry:"Software Development", city:"Bengaluru", state:"Karnataka", verificationStatus:"Verified", isActive:true });

  const [aRes, cRes] = await Promise.all([
    request(app).post("/api/auth/login").send({ email: AA, password:"Test@12345", role:"admin"   }),
    request(app).post("/api/auth/login").send({ email: AC, password:"Test@12345", role:"company" }),
  ]);
  adminToken   = aRes.body.data?.accessToken ?? "";
  companyToken = cRes.body.data?.accessToken ?? "";

  if (!adminToken)   throw new Error(`Admin login failed: ${JSON.stringify(aRes.body)}`);
  if (!companyToken) throw new Error(`Company login failed: ${JSON.stringify(cRes.body)}`);

  const iRes = await request(app).post("/api/internships").set("Authorization",`Bearer ${companyToken}`).send({
    title:"TEST_ALLOC Seat Constraint",
    description:"Allocation seat constraint internship for testing three seat limit.",
    sector:"Software Development", requiredSkills:["React","Node.js"],
    qualification:"B.Tech", eligibleBranches:["Computer Science"], minimumCGPA:6.0,
    state:"Karnataka", city:"Bengaluru", workMode:"Remote", duration:"3 Months",
    stipendMin:10000, stipendMax:20000, totalSeats:SEATS,
    startDate:"2027-08-01", endDate:"2027-10-31", applicationDeadline:"2027-07-25",
  });
  internshipId = iRes.body.data._id;
  await request(app).put(`/api/internships/${internshipId}/approve`).set("Authorization",`Bearer ${adminToken}`);

  // Create 8 students + direct applications
  for (let i = 1; i <= 8; i++) {
    const email = `alloc_s${i}@sih25033.test`;
    const sU = await User.create({ name:`AS${i}`, email, password: pwd, role:"student", isEmailVerified:true, isActive:true });
    const student = await Student.create({
      userId:sU._id, fullName:`AS${i}`, email,
      university:"Test Univ", branch:"Computer Science", degree:"B.Tech",
      cgpa: 6.0 + i * 0.3, graduationYear:2025,
      city:"Bengaluru", state:"Karnataka",
      skills:[{name:"React",level:"Intermediate",yearsOfExperience:1},{name:"Node.js",level:"Beginner",yearsOfExperience:0}],
      interests:["Web Development"], preferredLocations:["Bengaluru"],
      preferredSectors:["Software Development"], preferredWorkMode:"Remote",
      profileCompletion:70, verificationStatus:"Verified", isActive:true,
    });
    await Application.create({
      studentId:student._id, internshipId, companyId:company._id,
      studentName:`AS${i}`, internshipTitle:"TEST_ALLOC Seat Constraint", companyName:"Alloc Corp",
      matchScore:50 + i * 5,
      scoreBreakdown:{ skillMatch:60, qualification:80, location:90, interest:70, experience:40 },
      status:"Applied",
      appliedAt: new Date(Date.now() - (8 - i) * 60_000),
    });
  }
}, 30_000);

afterAll(async () => {
  if (internshipId) {
    await Application.deleteMany({ internshipId });
    await Allocation.deleteMany({ internshipId });
  }
  await User.deleteMany({    email: { $regex: /alloc.*@sih25033\.test/ } });
  await Student.deleteMany({ email: { $regex: /alloc_s\d+@sih25033\.test/ } });
  await Company.deleteMany({ email: AC });
  await Internship.deleteMany({ title: { $regex: /^TEST_ALLOC/ } });
});

describe("Allocation — Seat constraints", () => {
  it("runs smart allocation", async () => {
    const r = await request(app).post("/api/allocations/run").set("Authorization",`Bearer ${adminToken}`).send({ cycle:"test-cycle-1" });
    expect(r.status).toBe(200);
    expect(r.body.success).toBe(true);
  });

  it("RULE 3 — allocated ≤ available seats", async () => {
    const count = await Allocation.countDocuments({ internshipId, allocationCycle:"test-cycle-1", status:"Recommended" });
    expect(count).toBeLessThanOrEqual(SEATS);
  });

  it("every allocation has reasons", async () => {
    const allocs = await Allocation.find({ internshipId, allocationCycle:"test-cycle-1" });
    for (const a of allocs) {
      expect(Array.isArray(a.selectionReasons)).toBe(true);
      expect(a.selectionReasons.length).toBeGreaterThan(0);
    }
  });

  it("scores are valid (0-100)", async () => {
    const allocs = await Allocation.find({ internshipId, status:"Recommended" });
    for (const a of allocs) {
      expect(a.matchScore).toBeGreaterThanOrEqual(0);
      expect(a.matchScore).toBeLessThanOrEqual(100);
    }
  });

  it("ranks ordered by score descending", async () => {
    const allocs = await Allocation.find({ internshipId, status:"Recommended" }).sort({ allocationRank:1 });
    for (let i = 0; i < allocs.length - 1; i++) {
      expect(allocs[i].matchScore).toBeGreaterThanOrEqual(allocs[i + 1].matchScore);
    }
  });
});

describe("Allocation — Admin workflow", () => {
  let allocId = "";

  beforeAll(async () => {
    const a = await Allocation.findOne({ internshipId, status:"Recommended" });
    allocId = String(a?._id ?? "");
  });

  it("admin approves allocation", async () => {
    if (!allocId) return;
    const r = await request(app).post(`/api/allocations/${allocId}/approve`).set("Authorization",`Bearer ${adminToken}`).send({ notes:"Test approve" });
    expect(r.status).toBe(200);
    expect(r.body.data.status).toBe("Approved");
  });

  it("admin rejects allocation", async () => {
    const a = await Allocation.findOne({ internshipId, status:"Recommended" });
    if (!a) return;
    const r = await request(app).post(`/api/allocations/${String(a._id)}/reject`).set("Authorization",`Bearer ${adminToken}`).send({ notes:"Test reject" });
    expect(r.status).toBe(200);
    expect(r.body.data.status).toBe("Rejected");
  });

  it("pagination works on list", async () => {
    const r = await request(app).get("/api/allocations?page=1&limit=5").set("Authorization",`Bearer ${adminToken}`);
    expect(r.status).toBe(200);
    expect(r.body.pagination.limit).toBe(5);
  });

  it("student cannot run allocation", async () => {
    const sEmail = "alloc_s1@sih25033.test";
    const sLogin = await request(app).post("/api/auth/login").send({ email:sEmail, password:"Test@12345", role:"student" });
    const sToken = sLogin.body.data?.accessToken ?? "";
    if (!sToken) return;
    const r = await request(app).post("/api/allocations/run").set("Authorization",`Bearer ${sToken}`).send({ cycle:"test-cycle-2" });
    expect(r.status).toBe(403);
  });
});

describe("Allocation — Duplicate prevention", () => {
  it("same cycle reruns do not create extra records", async () => {
    const before = await Allocation.countDocuments({ internshipId, allocationCycle:"test-cycle-1" });
    await request(app).post("/api/allocations/run").set("Authorization",`Bearer ${adminToken}`).send({ cycle:"test-cycle-1" });
    const after = await Allocation.countDocuments({ internshipId, allocationCycle:"test-cycle-1" });
    expect(after).toBe(before);
  });
});
