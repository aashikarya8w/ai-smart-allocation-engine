import { UserRole } from "@/types/user";

export const ROLE_HOME: Record<UserRole, string> = {
  student: "/student/dashboard",
  company: "/company/dashboard",
  admin: "/admin/dashboard",
};

export const PROTECTED_PREFIXES: Record<UserRole, string[]> = {
  student: ["/student"],
  company: ["/company"],
  admin: ["/admin"],
};

export function canAccess(role: UserRole, pathname: string): boolean {
  const allowed = PROTECTED_PREFIXES[role];
  return allowed.some((prefix) => pathname.startsWith(prefix));
}

export function getRedirectForRole(role: UserRole): string {
  return ROLE_HOME[role];
}
