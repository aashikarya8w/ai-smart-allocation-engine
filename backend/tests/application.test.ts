import request  from "supertest";
import mongoose from "mongoose";
import app      from "../src/app";
import { User }        from "../src/models/User";
import { Student }     from "../src/models/Student";
import { Company }     from "../src/models/Company";
import { Internship }  from "../src/models/Internship";
import { Application } from "../src/models/Application";
import { hashPassword } from "../src/utils/password";

const A = "app_admin@sih25033.test";
const C = "app_company@sih25033.test";
const S = "app_student@sih25033.test";

let studentToken  = "";
let companyToken  = "";
let adminToken    = "";
let internshipId  = "";
let applicationId = "";

beforeAll(async () => {
  await User.deleteMany({       email: { $in: [A, C, S] } });
  await Student.deleteMany({    email: S });
  await Company.deleteMany({    email: C });
  await Internship.deleteMany({ title: { $regex: /^TEST_APP/ } });

  const pwd = await hashPassword("Test@12345");

  const [aU, cU, sU] = await Promise.all([
    User.create({ name:"App Admin", email: A, password: pwd, role:"admin",   isEmailVerified:true, isActive:true }),
    User.create({ name:"App Corp",  email: C, password: pwd, role:"company", isEmailVerified:true, isActive:true }),
    User.create({ name:"App Stud",  email: S, password: pwd, role:"student", isEmailVerified:true, isActive:true }),
  ]);

  await Company.create({ userId:cU._id, companyName:"App Corp", email: C, industry:"Software Development", city:"Bengaluru", state:"Karnataka", verificationStatus:"Verified", isActive:true });
  await Student.create({ userId:sU._id, fullName:"App Stud", email: S, university:"Test Univ", branch:"Computer Science", degree:"B.Tech", cgpa:8.0, graduationYear:2025, city:"Bengaluru", state:"Karnataka", skills:[{name:"React",level:"Advanced",yearsOfExperience:2},{name:"Node.js",level:"Intermediate",yearsOfExperience:1}], interests:["Web Development"], preferredLocations:["Bengaluru"], preferredSectors:["Software Development"], preferredWorkMode:"Remote", profileCompletion:80, verificationStatus:"Verified", isActive:true });

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

  const iRes = await request(app).post("/api/internships").set("Authorization",`Bearer ${companyToken}`).send({
    title:"TEST_APP Full Stack Intern",
    description:"Full stack application test internship for apply withdraw duplicate scenarios.",
    sector:"Software Development", requiredSkills:["React","Node.js"],
    qualification:"B.Tech", eligibleBranches:["Computer Science"], minimumCGPA:6.0,
    state:"Karnataka", city:"Bengaluru", workMode:"Remote", duration:"3 Months",
    stipendMin:10000, stipendMax:20000, totalSeats:10,
    startDate:"2027-08-01", endDate:"2027-10-31", applicationDeadline:"2027-07-25",
  });
  if (iRes.status !== 201) throw new Error(`Internship create failed: ${JSON.stringify(iRes.body)}`);
  if (!iRes.body.data?._id) throw new Error(`Internship data missing _id: ${JSON.stringify(iRes.body)}`);
  internshipId = iRes.body.data._id;

  const approveRes = await request(app).put(`/api/internships/${internshipId}/approve`).set("Authorization",`Bearer ${adminToken}`);
  if (approveRes.status !== 200) throw new Error(`Internship approve failed: ${JSON.stringify(approveRes.body)}`);
}, 25_000);

afterAll(async () => {
  if (internshipId) await Application.deleteMany({ internshipId });
  await User.deleteMany({       email: { $in: [A, C, S] } });
  await Student.deleteMany({    email: S });
  await Company.deleteMany({    email: C });
  await Internship.deleteMany({ title: { $regex: /^TEST_APP/ } });
});

describe("Application — Apply", () => {
  it("student applies successfully", async () => {
    const r = await request(app).post("/api/applications").set("Authorization",`Bearer ${studentToken}`).send({ internshipId });
    expect(r.status).toBe(201);
    expect(r.body.data.matchScore).toBeGreaterThanOrEqual(0);
    expect(r.body.data.matchScore).toBeLessThanOrEqual(100);
    applicationId = r.body.data._id;
  });

  it("RULE 1 — cannot apply twice", async () => {
    const r = await request(app).post("/api/applications").set("Authorization",`Bearer ${studentToken}`).send({ internshipId });
    expect(r.status).toBe(409);
  });

  it("company cannot apply", async () => {
    const r = await request(app).post("/api/applications").set("Authorization",`Bearer ${companyToken}`).send({ internshipId });
    expect(r.status).toBe(403);
  });

  it("unauthenticated user cannot apply", async () => {
    const r = await request(app).post("/api/applications").send({ internshipId });
    expect(r.status).toBe(401);
  });

  it("non-existent internship returns 404", async () => {
    const r = await request(app).post("/api/applications").set("Authorization",`Bearer ${studentToken}`).send({ internshipId:"000000000000000000000000" });
    expect(r.status).toBe(404);
  });
});

describe("Application — View", () => {
  it("student sees own applications", async () => {
    const r = await request(app).get("/api/applications/my").set("Authorization",`Bearer ${studentToken}`);
    expect(r.status).toBe(200);
    expect(r.body.data.length).toBeGreaterThanOrEqual(1);
  });

  it("admin lists all applications", async () => {
    const r = await request(app).get("/api/applications").set("Authorization",`Bearer ${adminToken}`);
    expect(r.status).toBe(200);
    expect(Array.isArray(r.body.data)).toBe(true);
  });

  it("company views their applications", async () => {
    const r = await request(app).get("/api/applications/company").set("Authorization",`Bearer ${companyToken}`);
    expect(r.status).toBe(200);
  });

  it("application has score breakdown", async () => {
    const r = await request(app).get(`/api/applications/${applicationId}`).set("Authorization",`Bearer ${studentToken}`);
    expect(r.status).toBe(200);
    expect(r.body.data.scoreBreakdown).toBeDefined();
  });
});

describe("Application — Status update", () => {
  it("company shortlists application", async () => {
    const r = await request(app).put(`/api/applications/${applicationId}/status`).set("Authorization",`Bearer ${companyToken}`).send({ status:"Shortlisted" });
    expect(r.status).toBe(200);
    expect(r.body.data.status).toBe("Shortlisted");
  });

  it("student cannot update status", async () => {
    const r = await request(app).put(`/api/applications/${applicationId}/status`).set("Authorization",`Bearer ${studentToken}`).send({ status:"Rejected" });
    expect(r.status).toBe(403);
  });
});

describe("Application — Withdraw", () => {
  it("student withdraws an application", async () => {
    const i2 = await request(app).post("/api/internships").set("Authorization",`Bearer ${companyToken}`).send({
      title:"TEST_APP Withdraw Intern",
      description:"Second internship created for withdrawal test scenario only.",
      sector:"Software Development", requiredSkills:["React"], qualification:"B.Tech",
      eligibleBranches:[], minimumCGPA:5.0, state:"Delhi", city:"New Delhi",
      workMode:"Remote", duration:"1 Month", stipendMin:5000, stipendMax:10000,
      totalSeats:5, startDate:"2027-08-01", endDate:"2027-09-01",
      applicationDeadline:"2027-07-25",
    });
    const id2 = i2.body.data._id;
    await request(app).put(`/api/internships/${id2}/approve`).set("Authorization",`Bearer ${adminToken}`);
    const applyRes = await request(app).post("/api/applications").set("Authorization",`Bearer ${studentToken}`).send({ internshipId:id2 });
    const appId2 = applyRes.body.data._id;
    const r = await request(app).put(`/api/applications/${appId2}/withdraw`).set("Authorization",`Bearer ${studentToken}`);
    expect(r.status).toBe(200);
    expect(r.body.data.status).toBe("Withdrawn");
  });
});
