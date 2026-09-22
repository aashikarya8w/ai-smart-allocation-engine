"use client";

import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { ROLE_HOME } from "@/lib/permissions";
import type { AuthUser } from "@/types/auth";
import type { UserRole } from "@/types/user";

export function useAuth() {
  const { user, isAuthenticated, login, logout } = useAuthStore();
  const router = useRouter();

  function signIn(user: AuthUser) {
    login(user);
    router.push(ROLE_HOME[user.role]);
  }

  function signOut() {
    logout();
    router.push("/login");
  }

  function requireRole(role: UserRole): boolean {
    return user?.role === role;
  }

  return {
    user,
    isAuthenticated,
    signIn,
    signOut,
    requireRole,
    isStudent: user?.role === "student",
    isCompany: user?.role === "company",
    isAdmin: user?.role === "admin",
  };
}
