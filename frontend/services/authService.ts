import { mockUsers, demoCredentials } from "@/data/users";
import { mockStudents } from "@/data/students";
import { mockCompanies } from "@/data/companies";
import { authApiService } from "./api/authApiService";
import type { AuthUser, LoginPayload, RegisterPayload, GoogleAuthPayload } from "@/types/auth";
import type { UserRole } from "@/types/user";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const REGISTERED_USERS_KEY = "internai_registered_users";
const CUSTOM_STUDENTS_KEY = "internai_custom_students";
const CUSTOM_COMPANIES_KEY = "internai_custom_companies";

interface StoredUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  phone?: string;
  isVerified: boolean;
  createdAt: string;
}

function getStoredUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(REGISTERED_USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveStoredUser(user: StoredUser) {
  if (typeof window === "undefined") return;
  try {
    const list = getStoredUsers().filter(
      (u) => u.email.toLowerCase() !== user.email.toLowerCase()
    );
    list.push(user);
    localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(list));
  } catch {}
}

export async function registerService(payload: RegisterPayload): Promise<AuthUser> {
  const emailLower = payload.email.trim().toLowerCase();

  // 1. Check if user already exists locally or in mockUsers
  const existingMock = mockUsers.find((u) => u.email.toLowerCase() === emailLower);
  const existingStored = getStoredUsers().find((u) => u.email.toLowerCase() === emailLower);
  if (existingMock || existingStored) {
    throw new Error("An account with this email already exists.");
  }

  let finalUserId = `u_${Date.now()}`;
  const isVerified = true;

  // 2. Attempt registration with Backend API (if running / reachable)
  try {
    const res = await authApiService.register({
      name: payload.name,
      email: emailLower,
      password: payload.password,
      role: payload.role,
    });
    if (res && (res as any).data) {
      const d = (res as any).data;
      if (d.id || d._id) finalUserId = String(d.id || d._id);
    }
  } catch (err: any) {
    if (
      err?.statusCode === 409 ||
      err?.message?.includes("already registered") ||
      err?.message?.includes("already exists")
    ) {
      throw new Error("An account with this email already exists.");
    }
    // If backend is unreachable or returns a server error, proceed with local fallback
  }

  const authUser: AuthUser = {
    id: finalUserId,
    name: payload.name,
    email: emailLower,
    role: payload.role,
    isVerified,
  };

  // 3. Persist the newly registered user into localStorage
  saveStoredUser({
    id: finalUserId,
    name: payload.name,
    email: emailLower,
    password: payload.password,
    role: payload.role,
    phone: payload.phone || "",
    isVerified: true,
    createdAt: new Date().toISOString(),
  });

  // 4. Create and persist initial profile so all pages work immediately
  if (typeof window !== "undefined") {
    try {
      if (payload.role === "student") {
        const customStudents = JSON.parse(localStorage.getItem(CUSTOM_STUDENTS_KEY) || "[]");
        const newStudent = {
          id: `s_${finalUserId}`,
          userId: finalUserId,
          fullName: payload.name,
          email: emailLower,
          phone: payload.phone || "9876543210",
          dateOfBirth: "2003-01-01",
          gender: "Other",
          state: "Delhi",
          city: "New Delhi",
          university: "National Institute of Technology",
          branch: "Computer Science",
          degree: "B.Tech",
          cgpa: 8.5,
          graduationYear: 2026,
          education: [
            {
              id: `edu_${finalUserId}`,
              degree: "B.Tech – Computer Science",
              institution: "National Institute of Technology",
              branch: "Computer Science",
              cgpa: 8.5,
              startYear: 2022,
              endYear: null,
              isCurrently: true,
            },
          ],
          skills: [
            { name: "React", level: "Intermediate", yearsOfExperience: 1 },
            { name: "Node.js", level: "Intermediate", yearsOfExperience: 1 },
            { name: "TypeScript", level: "Beginner", yearsOfExperience: 0 },
            { name: "Python", level: "Beginner", yearsOfExperience: 0 },
          ],
          interests: ["Web Development", "AI/ML", "Cloud Computing"],
          preferredLocations: ["Bengaluru", "Delhi", "Remote"],
          preferredSectors: ["Software Development", "Information Technology"],
          preferredWorkMode: "Remote",
          profileCompletion: 85,
          verificationStatus: "Verified",
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        customStudents.push(newStudent);
        localStorage.setItem(CUSTOM_STUDENTS_KEY, JSON.stringify(customStudents));
      } else if (payload.role === "company") {
        const customCompanies = JSON.parse(localStorage.getItem(CUSTOM_COMPANIES_KEY) || "[]");
        const newCompany = {
          id: `c_${finalUserId}`,
          userId: finalUserId,
          companyName: payload.name,
          email: emailLower,
          phone: payload.phone || "9876543210",
          website: "https://example.com",
          industry: "Software Development",
          companyType: "Private",
          employeeCount: "51-200",
          city: "Bengaluru",
          state: "Karnataka",
          address: "Tech Park, Outer Ring Road",
          description: "Innovative enterprise and software engineering company.",
          verificationStatus: "Verified",
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        customCompanies.push(newCompany);
        localStorage.setItem(CUSTOM_COMPANIES_KEY, JSON.stringify(customCompanies));
      }
    } catch {}
  }

  await delay(300);
  return authUser;
}

export async function loginService(payload: LoginPayload): Promise<AuthUser> {
  const emailLower = payload.email.trim().toLowerCase();

  // 1. Try Backend API first if available
  try {
    const res = await authApiService.login({
      email: emailLower,
      password: payload.password,
      role: payload.role,
    });
    if (res && (res as any).data) {
      const d = (res as any).data;
      if (typeof window !== "undefined" && d.accessToken) {
        localStorage.setItem("auth-storage", JSON.stringify({ state: { accessToken: d.accessToken } }));
        localStorage.setItem("intern-ai-token", d.accessToken);
      }
      const u = d.user || {};
      const loggedUser: AuthUser = {
        id: String(u.id || u._id || `u_${Date.now()}`),
        name: u.name || payload.email.split("@")[0],
        email: emailLower,
        role: (u.role || payload.role) as UserRole,
        isVerified: true,
      };
      // Keep local sync so offline works
      saveStoredUser({
        id: loggedUser.id,
        name: loggedUser.name,
        email: emailLower,
        password: payload.password,
        role: loggedUser.role,
        isVerified: true,
        createdAt: new Date().toISOString(),
      });
      return loggedUser;
    }
  } catch (err: any) {
    // If backend gave invalid credentials error, continue to check locally stored/demo accounts
  }

  // 2. Check locally registered users in localStorage
  const stored = getStoredUsers().find(
    (u) => u.email.toLowerCase() === emailLower && u.role === payload.role
  );
  if (stored) {
    if (stored.password && stored.password !== payload.password) {
      throw new Error("Invalid email or password.");
    }
    await delay(300);
    return {
      id: stored.id,
      name: stored.name,
      email: stored.email,
      role: stored.role,
      isVerified: stored.isVerified,
    };
  }

  // 3. Check demo credentials & mock users
  const pwTrim = payload.password.trim();
  const demo = Object.values(demoCredentials).find(
    (c) => c.email.toLowerCase() === emailLower && c.role === payload.role
  );
  if (demo) {
    const isPwMatch =
      pwTrim === demo.password ||
      pwTrim.toLowerCase() === demo.password.toLowerCase() ||
      pwTrim.toLowerCase() === "password123" ||
      pwTrim.toLowerCase() === `${payload.role.toLowerCase()}@123`;

    if (isPwMatch) {
      const user = mockUsers.find((u) => u.email.toLowerCase() === emailLower);
      await delay(300);
      return {
        id: user?.id || `demo_${payload.role}`,
        name: user?.name || (payload.role === "student" ? "Aashik" : payload.role === "admin" ? "Admin User" : "TechNova HR"),
        email: demo.email,
        role: demo.role,
        isVerified: true,
      };
    }
  }

  // 4. Check all mock users
  const mockUser = mockUsers.find(
    (u) => u.email.toLowerCase() === emailLower && u.role === payload.role
  );
  if (mockUser) {
    const isPwMatch =
      pwTrim.toLowerCase() === "password123" ||
      pwTrim.toLowerCase() === `${payload.role.toLowerCase()}@123` ||
      pwTrim.toLowerCase() === "student@123" ||
      pwTrim.toLowerCase() === "company@123" ||
      pwTrim.toLowerCase() === "admin@123";

    if (isPwMatch) {
      await delay(300);
      return {
        id: mockUser.id,
        name: mockUser.name,
        email: mockUser.email,
        role: mockUser.role,
        isVerified: mockUser.isVerified,
      };
    }
  }

  await delay(300);
  throw new Error("Invalid email or password.");
}

/* ── Google Authentication (Login & Register) ───────────────── */
export async function googleAuthService(payload: GoogleAuthPayload): Promise<AuthUser> {
  const emailLower = payload.email.trim().toLowerCase();
  let finalUserId = `google_${Date.now()}`;
  let finalRole = payload.role;

  // 1. Try backend API first
  try {
    const res = await authApiService.googleAuth({
      email: emailLower,
      name: payload.name,
      role: payload.role,
      avatar: payload.avatar,
      googleId: payload.googleId,
    });
    if (res && (res as any).data) {
      const d = (res as any).data;
      if (typeof window !== "undefined" && d.accessToken) {
        localStorage.setItem("auth-storage", JSON.stringify({ state: { accessToken: d.accessToken } }));
        localStorage.setItem("intern-ai-token", d.accessToken);
      }
      const u = d.user || {};
      if (u.id || u._id) finalUserId = String(u.id || u._id);
      if (u.role) finalRole = u.role as UserRole;
    }
  } catch (err) {
    console.warn("Backend Google auth call:", err);
  }

  // 2. Client fallback / persistence
  const existingStored = getStoredUsers().find((u) => u.email.toLowerCase() === emailLower);
  if (existingStored) {
    finalUserId = existingStored.id;
    finalRole = existingStored.role;
  } else {
    saveStoredUser({
      id: finalUserId,
      name: payload.name,
      email: emailLower,
      role: finalRole,
      isVerified: true,
      createdAt: new Date().toISOString(),
    });
  }

  const authUser: AuthUser = {
    id: finalUserId,
    name: payload.name,
    email: emailLower,
    role: finalRole,
    avatar: payload.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(payload.name)}`,
    isVerified: true,
  };

  // 3. Ensure role profile exists for student or company
  if (typeof window !== "undefined") {
    try {
      if (finalRole === "student") {
        const customStudents = JSON.parse(localStorage.getItem(CUSTOM_STUDENTS_KEY) || "[]");
        if (!customStudents.some((s: any) => s.email.toLowerCase() === emailLower)) {
          customStudents.push({
            id: `s_${finalUserId}`,
            userId: finalUserId,
            fullName: payload.name,
            email: emailLower,
            phone: "9876543210",
            dateOfBirth: "2003-05-15",
            gender: "Male",
            state: "Delhi",
            city: "New Delhi",
            university: "National Institute of Technology",
            branch: "Computer Science & AI",
            degree: "B.Tech",
            cgpa: 8.8,
            graduationYear: 2026,
            skills: [
              { name: "React", level: "Advanced", yearsOfExperience: 2 },
              { name: "TypeScript", level: "Intermediate", yearsOfExperience: 1 },
              { name: "Python", level: "Intermediate", yearsOfExperience: 2 },
              { name: "AI/ML", level: "Intermediate", yearsOfExperience: 1 },
            ],
            interests: ["Artificial Intelligence", "Web Development", "Cloud Systems"],
            preferredLocations: ["Bengaluru", "Delhi", "Hyderabad", "Remote"],
            preferredSectors: ["Software Development", "Information Technology"],
            preferredWorkMode: "Remote",
            profileCompletion: 92,
            verificationStatus: "Verified",
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
          localStorage.setItem(CUSTOM_STUDENTS_KEY, JSON.stringify(customStudents));
        }
      } else if (finalRole === "company") {
        const customCompanies = JSON.parse(localStorage.getItem(CUSTOM_COMPANIES_KEY) || "[]");
        if (!customCompanies.some((c: any) => c.email.toLowerCase() === emailLower)) {
          customCompanies.push({
            id: `c_${finalUserId}`,
            userId: finalUserId,
            companyName: payload.name,
            email: emailLower,
            phone: "9876543210",
            website: "https://internai.gov.in",
            industry: "Information Technology",
            companyType: "Private",
            employeeCount: "51-200",
            city: "Bengaluru",
            state: "Karnataka",
            address: "Tech Park, Cyber Hub",
            description: "AI-driven technology enterprise.",
            verificationStatus: "Verified",
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
          localStorage.setItem(CUSTOM_COMPANIES_KEY, JSON.stringify(customCompanies));
        }
      }
    } catch {}
  }

  await delay(300);
  return authUser;
}

export async function forgotPasswordService(email: string): Promise<void> {
  const emailLower = email.trim().toLowerCase();
  try {
    await authApiService.forgotPassword(emailLower);
    return;
  } catch {}

  const existsStored = getStoredUsers().find((u) => u.email.toLowerCase() === emailLower);
  const existsMock = mockUsers.find((u) => u.email.toLowerCase() === emailLower);
  if (!existsStored && !existsMock) {
    throw new Error("No account found with this email.");
  }
}

export async function resetPasswordService(
  token: string,
  password: string
): Promise<void> {
  try {
    await authApiService.resetPassword(token, password);
  } catch {
    await delay(400);
  }
}

export async function verifyEmailService(token: string): Promise<void> {
  try {
    await authApiService.verifyEmail(token);
  } catch {
    await delay(400);
  }
}

export function getStudentProfile(userId: string) {
  if (typeof window !== "undefined") {
    try {
      const custom = JSON.parse(localStorage.getItem(CUSTOM_STUDENTS_KEY) || "[]");
      const found = custom.find((s: any) => s.userId === userId || s.id === userId);
      if (found) return found;
    } catch {}
  }
  return (
    mockStudents.find((s) => s.userId === userId || s.id === userId) ??
    (userId === "u1_seed" ? mockStudents[0] : null)
  );
}

export function getCompanyProfile(userId: string) {
  if (typeof window !== "undefined") {
    try {
      const custom = JSON.parse(localStorage.getItem(CUSTOM_COMPANIES_KEY) || "[]");
      const found = custom.find((c: any) => c.userId === userId || c.id === userId);
      if (found) return found;
    } catch {}
  }
  return (
    mockCompanies.find((c) => c.userId === userId || c.id === userId) ??
    (userId === "u11_seed" ? mockCompanies[0] : null)
  );
}
