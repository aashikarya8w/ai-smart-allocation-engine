import request  from "supertest";
import mongoose from "mongoose";
import app      from "../src/app";
import { User }    from "../src/models/User";
import { Student } from "../src/models/Student";
import { Company } from "../src/models/Company";

const S_EMAIL = "auth_s@test.sih";
const C_EMAIL = "auth_c@test.sih";

beforeAll(async () => {
  await User.deleteMany({    email: { $in: [S_EMAIL, C_EMAIL] } });
  await Student.deleteMany({ email: S_EMAIL });
  await Company.deleteMany({ email: C_EMAIL });
});

afterAll(async () => {
  await User.deleteMany({    email: { $in: [S_EMAIL, C_EMAIL] } });
  await Student.deleteMany({ email: S_EMAIL });
  await Company.deleteMany({ email: C_EMAIL });
  // Do NOT close connection — shared across test suite
});

describe("Auth — Registration", () => {
  it("registers a student", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Auth Student", email: S_EMAIL, password: "Test@12345", role: "student",
    });
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
  });

  it("registers a company", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Auth Company", email: C_EMAIL, password: "Test@12345", role: "company",
    });
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
  });

  it("rejects duplicate email", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Dup", email: S_EMAIL, password: "Test@12345", role: "student",
    });
    expect(res.status).toBe(409);
  });

  it("rejects invalid email format", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Bad", email: "not-an-email", password: "Test@12345", role: "student",
    });
    expect(res.status).toBe(400);
  });

  it("rejects short password", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Bad", email: "short@test.sih", password: "abc", role: "student",
    });
    expect(res.status).toBe(400);
  });
});

describe("Auth — Login", () => {
  it("logs in with valid credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: S_EMAIL, password: "Test@12345", role: "student",
    });
    expect(res.status).toBe(200);
    expect(res.body.data.accessToken).toBeDefined();
    expect(res.body.data.refreshToken).toBeDefined();
  });

  it("rejects wrong password", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: S_EMAIL, password: "Wrong@999", role: "student",
    });
    expect(res.status).toBe(401);
  });

  it("rejects wrong role", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: S_EMAIL, password: "Test@12345", role: "admin",
    });
    expect(res.status).toBe(401);
  });

  it("rejects non-existent email", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "nobody_xyz@test.sih", password: "Test@12345", role: "student",
    });
    expect(res.status).toBe(401);
  });
});

describe("Auth — Protected routes", () => {
  let token = "";

  beforeAll(async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: S_EMAIL, password: "Test@12345", role: "student",
    });
    token = res.body.data.accessToken;
  });

  it("returns current user with valid token", async () => {
    const res = await request(app).get("/api/auth/me")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.data.user.email).toBe(S_EMAIL);
  });

  it("rejects request without token", async () => {
    const res = await request(app).get("/api/auth/me");
    expect(res.status).toBe(401);
  });

  it("rejects invalid token", async () => {
    const res = await request(app).get("/api/auth/me")
      .set("Authorization", "Bearer invalid.token.here");
    expect(res.status).toBe(401);
  });
});

describe("Auth — Role protection", () => {
  let sToken = "";
  let cToken = "";

  beforeAll(async () => {
    const [s, c] = await Promise.all([
      request(app).post("/api/auth/login").send({ email: S_EMAIL, password: "Test@12345", role: "student" }),
      request(app).post("/api/auth/login").send({ email: C_EMAIL, password: "Test@12345", role: "company" }),
    ]);
    sToken = s.body.data.accessToken;
    cToken = c.body.data.accessToken;
  });

  it("student cannot access admin routes",    async () => { const r = await request(app).get("/api/admin/students").set("Authorization", `Bearer ${sToken}`); expect(r.status).toBe(403); });
  it("company cannot access admin routes",    async () => { const r = await request(app).get("/api/admin/students").set("Authorization", `Bearer ${cToken}`); expect(r.status).toBe(403); });
  it("company cannot access student profile", async () => { const r = await request(app).get("/api/students/profile").set("Authorization", `Bearer ${cToken}`); expect(r.status).toBe(403); });
  it("student cannot access company profile", async () => { const r = await request(app).get("/api/companies/profile").set("Authorization", `Bearer ${sToken}`); expect(r.status).toBe(403); });
});

describe("Auth — Refresh token", () => {
  it("refreshes tokens with valid refresh token", async () => {
    const login = await request(app).post("/api/auth/login").send({
      email: S_EMAIL, password: "Test@12345", role: "student",
    });
    const { refreshToken } = login.body.data;
    const res = await request(app).post("/api/auth/refresh").send({ refreshToken });
    expect(res.status).toBe(200);
    expect(res.body.data.accessToken).toBeDefined();
  });

  it("rejects invalid refresh token", async () => {
    const res = await request(app).post("/api/auth/refresh").send({ refreshToken: "bad.token" });
    expect(res.status).toBe(401);
  });
});
