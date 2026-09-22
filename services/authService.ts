import { mockUsers, demoCredentials } from "@/data/users";
import { mockStudents } from "@/data/students";
import { mockCompanies } from "@/data/companies";
import type { AuthUser, LoginPayload, RegisterPayload } from "@/types/auth";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function loginService(payload: LoginPayload): Promise<AuthUser> {
  await delay(800);

  const demo = Object.values(demoCredentials).find(
    (c) => c.email === payload.email && c.role === payload.role
  );

  if (!demo || payload.password !== demo.password) {
    throw new Error("Invalid email or password.");
  }

  const user = mockUsers.find((u) => u.email === payload.email);
  if (!user) throw new Error("User not found.");

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    isVerified: user.isVerified,
  };
}

export async function registerService(payload: RegisterPayload): Promise<AuthUser> {
  await delay(1000);

  const exists = mockUsers.find((u) => u.email === payload.email);
  if (exists) throw new Error("An account with this email already exists.");

  return {
    id: `u_new_${Date.now()}`,
    name: payload.name,
    email: payload.email,
    role: payload.role,
    isVerified: false,
  };
}

export async function forgotPasswordService(email: string): Promise<void> {
  await delay(800);
  const user = mockUsers.find((u) => u.email === email);
  if (!user) throw new Error("No account found with this email.");
}

export async function resetPasswordService(
  _token: string,
  _password: string
): Promise<void> {
  await delay(800);
}

export async function verifyEmailService(_token: string): Promise<void> {
  await delay(800);
}

export function getStudentProfile(userId: string) {
  return mockStudents.find((s) => s.userId === userId) ?? null;
}

export function getCompanyProfile(userId: string) {
  return mockCompanies.find((c) => c.userId === userId) ?? null;
}
