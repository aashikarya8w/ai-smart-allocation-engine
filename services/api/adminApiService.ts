import { api } from "./apiClient";

export const adminApiService = {
  getDashboard: () =>
    api.get("/admin/dashboard"),

  getAnalytics: () =>
    api.get("/admin/analytics"),

  // Students
  getStudents: (params?: { page?: number; limit?: number; search?: string; status?: string }) =>
    api.get("/admin/students", params),

  getStudentById: (id: string) =>
    api.get(`/admin/students/${id}`),

  verifyStudent: (id: string, status: "Verified" | "Rejected") =>
    api.put(`/admin/students/${id}/verify`, { status }),

  // Companies
  getCompanies: (params?: { page?: number; limit?: number; search?: string; status?: string }) =>
    api.get("/admin/companies", params),

  getCompanyById: (id: string) =>
    api.get(`/admin/companies/${id}`),

  verifyCompany: (id: string, status: "Verified" | "Rejected") =>
    api.put(`/admin/companies/${id}/verify`, { status }),

  // Internships
  getInternships: (params?: { page?: number; limit?: number; search?: string; status?: string }) =>
    api.get("/admin/internships", params),

  getPendingInternships: () =>
    api.get("/admin/internships/pending"),

  approveInternship: (id: string) =>
    api.put(`/admin/internships/${id}/approve`),

  rejectInternship: (id: string, reason: string) =>
    api.put(`/admin/internships/${id}/reject`, { reason }),

  // Applications
  getApplications: (params?: { page?: number; limit?: number; search?: string; status?: string }) =>
    api.get("/admin/applications", params),

  getApplicationById: (id: string) =>
    api.get(`/admin/applications/${id}`),

  // AI Matching
  runAIMatching: () =>
    api.post("/admin/matching/run"),

  getMatchingResults: () =>
    api.get("/admin/matching/results"),

  // Allocations
  runAllocation: (cycle?: string) =>
    api.post("/admin/allocations/run", cycle ? { cycle } : {}),

  getAllocations: (params?: { page?: number; limit?: number; status?: string; cycle?: string }) =>
    api.get("/admin/allocations", params),

  getAllocationById: (id: string) =>
    api.get(`/admin/allocations/${id}`),

  approveAllocation: (id: string, notes?: string) =>
    api.post(`/admin/allocations/${id}/approve`, { notes }),

  rejectAllocation: (id: string, notes?: string) =>
    api.post(`/admin/allocations/${id}/reject`, { notes }),

  // Rules
  getRules: () =>
    api.get("/rules"),

  updateMatchingRules: (weights: Record<string, number>) =>
    api.put("/rules/matching", weights),

  updateAllocationRules: (data: Record<string, unknown>) =>
    api.put("/rules/allocation", data),

  updateEligibilityRules: (data: Record<string, unknown>) =>
    api.put("/rules/eligibility", data),

  // Audit logs
  getAuditLogs: (params?: { page?: number; limit?: number; search?: string; action?: string }) =>
    api.get("/admin/audit-logs", params),

  getAuditLogById: (id: string) =>
    api.get(`/admin/audit-logs/${id}`),

  // Reports
  getReports: () =>
    api.get("/admin/reports"),

  generateReport: (type: string, format?: string) =>
    api.post("/admin/reports/generate", { type, format }),

  // Notifications
  getNotifications: () =>
    api.get("/notifications"),

  // Administrators
  getAdministrators: () =>
    api.get("/admin/administrators"),

  createAdministrator: (data: Record<string, unknown>) =>
    api.post("/admin/administrators", data),

  // Allocation simulator
  runAllocationSimulator: (config: Record<string, unknown>) =>
    api.post("/admin/allocation-simulator", config),

  // Fairness
  getFairness: (internshipId?: string) =>
    internshipId
      ? api.get(`/admin/fairness/${internshipId}`)
      : api.get("/admin/fairness"),

  // Swaps
  getSwaps: (params?: { page?: number; status?: string }) =>
    api.get("/admin/swaps", params),

  approveSwap: (id: string, notes?: string) =>
    api.post(`/admin/swaps/${id}/approve`, { notes }),

  rejectSwap: (id: string, notes?: string) =>
    api.post(`/admin/swaps/${id}/reject`, { notes }),

  // Check-ins
  getCheckIns: (params?: { page?: number; date?: string }) =>
    api.get("/admin/check-ins", params),

  // Reallocation
  runReallocation: (cycle?: string) =>
    api.post("/admin/reallocation/run", { cycle }),

  getReallocation: (params?: { page?: number }) =>
    api.get("/admin/reallocation", params),

  // Suspend/activate user
  suspendUser: (userId: string, reason?: string) =>
    api.post("/admin/users/suspend", { userId, reason }),

  activateUser: (id: string) =>
    api.put(`/admin/users/${id}/activate`),

  // Settings
  updateSettings: (data: Record<string, unknown>) =>
    api.put("/admin/settings", data),
};
