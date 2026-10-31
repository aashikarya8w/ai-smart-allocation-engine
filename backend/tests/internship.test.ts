import request  from "supertest";
import mongoose from "mongoose";
import app      from "../src/app";
import { User }       from "../src/models/User";
import { Student }    from "../src/models/Student";
import { Company }    from "../src/models/Company";
import { Internship } from "../src/models/Internship";
import { hashPassword } from "../src/utils/password";

let companyToken = "";
let studentToken = "";
let adminToken   = "";
let internshipId = "";

const A = "intern_admin@sih25033.test";
const C = "intern_company@sih25033.test";
const S = "intern_student@sih25033.test";

beforeAll(async () => {
  await User.deleteMany({       email: { $in: [A, C, S] } });
  await Student.deleteMany({    email: { $in: [S] } });
  await Company.deleteMany({    email: { $in: [C] } });
  await Internship.deleteMany({ title: { $regex: /^TEST_INTERN/ } });

  const pwd = await hashPassword("Test@12345");

  const [aU, cU, sU] = await Promise.all([
    User.create({ name:"I Admin", email: A, password: pwd, role:"admin",   isEmailVerified:true, isActive:true }),
    User.create({ name:"I Corp",  email: C, password: pwd, role:"company", isEmailVerified:true, isActive:true }),
    User.create({ name:"I Stud",  email: S, password: pwd, role:"student", isEmailVerified:true, isActive:true }),
  ]);

  await Company.create({ userId:cU._id, companyName:"I Corp", email: C, industry:"Software Development", city:"Bengaluru", state:"Karnataka", verificationStatus:"Verified", isActive:true });
  await Student.create({ userId:sU._id, fullName:"I Stud", email: S, university:"Test Univ", branch:"Computer Science", degree:"B.Tech", cgpa:7.5, graduationYear:2025, city:"Bengaluru", state:"Karnataka", skills:[{name:"React",level:"Intermediate",yearsOfExperience:1}], interests:["Web Development"], preferredLocations:["Bengaluru"], preferredSectors:["Software Development"], preferredWorkMode:"Remote", profileCompletion:70, verificationStatus:"Verified", isActive:true });

  const [c, s, a] = await Promise.all([
    request(app).post("/api/auth/login").send({ email: C, password:"Test@12345", role:"company" }),
    request(app).post("/api/auth/login").send({ email: S, password:"Test@12345", role:"student" }),
    request(app).post("/api/auth/login").send({ email: A, password:"Test@12345", role:"admin"   }),
  ]);

  companyToken = c.body.data?.accessToken ?? "";
  studentToken = s.body.data?.accessToken ?? "";
  adminToken   = a.body.data?.accessToken ?? "";

  if (!companyToken) throw new Error(`Company login failed: ${JSON.stringify(c.body)}`);
  if (!studentToken) throw new Error(`Student login failed: ${JSON.stringify(s.body)}`);
  if (!adminToken)   throw new Error(`Admin login failed: ${JSON.stringify(a.body)}`);
}, 20_000);

afterAll(async () => {
  await User.deleteMany({       email: { $in: [A, C, S] } });
  await Student.deleteMany({    email: { $in: [S] } });
  await Company.deleteMany({    email: { $in: [C] } });
  await Internship.deleteMany({ title: { $regex: /^TEST_INTERN/ } });
});

const PAYLOAD = {
  title: "TEST_INTERN React Dev",
  sector: "Software Development",
  description: "Test internship for create approve search filter scenarios.",
  requiredSkills: ["React","Node.js"],
  qualification: "B.Tech",
  eligibleBranches: ["Computer Science"],
  minimumCGPA: 7.0,
  state: "Karnataka", city: "Bengaluru",
  workMode: "Remote", duration: "3 Months",
  stipendMin: 10000, stipendMax: 20000, totalSeats: 10,
  startDate: "2027-08-01", endDate: "2027-10-31",
  applicationDeadline: "2027-07-25",
};

describe("Internship — Create", () => {
  it("company creates internship", async () => {
    const r = await request(app).post("/api/internships").set("Authorization",`Bearer ${companyToken}`).send(PAYLOAD);
    expect(r.status).toBe(201);
    internshipId = r.body.data._id;
  });
  it("student cannot create", async () => {
    const r = await request(app).post("/api/internships").set("Authorization",`Bearer ${studentToken}`).send(PAYLOAD);
    expect(r.status).toBe(403);
  });
  it("missing fields returns 400", async () => {
    const r = await request(app).post("/api/internships").set("Authorization",`Bearer ${companyToken}`).send({ title:"inc" });
    expect(r.status).toBe(400);
  });
});

describe("Internship — Read (public)", () => {
  it("lists internships without auth", async () => {
    const r = await request(app).get("/api/internships");
    expect(r.status).toBe(200);
    expect(Array.isArray(r.body.data)).toBe(true);
    expect(r.body.pagination).toBeDefined();
  });
  it("returns 404 for invalid id", async () => {
    const r = await request(app).get("/api/internships/000000000000000000000000");
    expect(r.status).toBe(404);
  });
});

describe("Internship — Admin approval", () => {
  it("admin approves internship", async () => {
    if (!internshipId) return;
    const r = await request(app).put(`/api/internships/${internshipId}/approve`).set("Authorization",`Bearer ${adminToken}`);
    expect(r.status).toBe(200);
    expect(r.body.data.status).toBe("Active");
  });
  it("student cannot approve", async () => {
    if (!internshipId) return;
    const r = await request(app).put(`/api/internships/${internshipId}/approve`).set("Authorization",`Bearer ${studentToken}`);
    expect(r.status).toBe(403);
  });
  it("can fetch by id after approval", async () => {
    if (!internshipId) return;
    const r = await request(app).get(`/api/internships/${internshipId}`);
    expect(r.status).toBe(200);
  });
});

describe("Internship — Search & Filter", () => {
  it("searches by keyword", async () => {
    const r = await request(app).get("/api/internships?search=React");
    expect(r.status).toBe(200);
  });
  it("paginates correctly", async () => {
    const r = await request(app).get("/api/internships?page=1&limit=3");
    expect(r.body.pagination.limit).toBe(3);
  });
  it("filters by workMode=Remote", async () => {
    const r = await request(app).get("/api/internships?workMode=Remote");
    expect(r.status).toBe(200);
    for (const i of r.body.data) expect(i.workMode).toBe("Remote");
  });
});
