import { api } from "./apiClient";

export const companyApiService = {
  getProfile: () =>
    api.get("/companies/profile"),

  updateProfile: (data: Record<string, unknown>) =>
    api.put("/companies/profile", data),

  getDashboard: () =>
    api.get("/companies/dashboard"),

  // Internships
  getMyInternships: (params?: { page?: number; limit?: number; status?: string }) =>
    api.get("/internships/my/list", params),

  createInternship: (data: Record<string, unknown>) =>
    api.post("/internships", data),

  updateInternship: (id: string, data: Record<string, unknown>) =>
    api.put(`/internships/${id}`, data),

  deleteInternship: (id: string) =>
    api.delete(`/internships/${id}`),

  getInternshipById: (id: string) =>
    api.get(`/internships/${id}`),

  // Applications
  getApplications: (params?: { page?: number; limit?: number; status?: string }) =>
    api.get("/applications/company", params),

  getApplicationById: (id: string) =>
    api.get(`/applications/${id}`),

  updateApplicationStatus: (id: string, status: string, notes?: string) =>
    api.put(`/applications/${id}/status`, { status, notes }),

  // Allocations
  getMyAllocations: () =>
    api.get("/allocations/company/my"),

  // Analytics
  getAnalytics: () =>
    api.get("/companies/analytics"),

  // Notifications
  getNotifications: () =>
    api.get("/notifications"),

  // Evaluations
  submitEvaluation: (data: Record<string, unknown>) =>
    api.post("/feedback/evaluations", data),

  getInternshipEvaluations: (internshipId: string) =>
    api.get(`/feedback/evaluations/internship/${internshipId}`),

  // Check-ins
  getCheckIns: () =>
    api.get("/check-in/company"),
};
