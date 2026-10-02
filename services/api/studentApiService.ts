import { api } from "./apiClient";

export const studentApiService = {
  getProfile: () =>
    api.get("/students/profile"),

  updateProfile: (data: Record<string, unknown>) =>
    api.put("/students/profile", data),

  updateSkills: (skills: unknown[]) =>
    api.put("/students/skills", { skills }),

  updateEducation: (education: unknown[]) =>
    api.put("/students/education", { education }),

  getDashboard: () =>
    api.get("/students/dashboard"),

  getById: (id: string) =>
    api.get(`/students/${id}`),

  // Applications
  getMyApplications: (params?: { page?: number; limit?: number; status?: string }) =>
    api.get("/applications/my", params),

  applyForInternship: (internshipId: string, resumeId?: string) =>
    api.post("/applications", { internshipId, resumeId }),

  withdrawApplication: (id: string) =>
    api.put(`/applications/${id}/withdraw`),

  getApplicationById: (id: string) =>
    api.get(`/applications/${id}`),

  // Allocations
  getMyAllocations: () =>
    api.get("/allocations/student/my"),

  // Recommendations
  getRecommendations: () =>
    api.get("/matching/recommendations"),

  generateRecommendations: () =>
    api.post("/matching/recommendations/generate"),

  // Notifications
  getNotifications: (params?: { page?: number; limit?: number }) =>
    api.get("/notifications", params),

  getUnreadCount: () =>
    api.get("/notifications/unread-count"),

  markNotificationRead: (id: string) =>
    api.patch(`/notifications/${id}/read`),

  markAllRead: () =>
    api.patch("/notifications/read-all"),

  // Skill gap & intelligence
  getSkillGap: () =>
    api.get("/skill-gap"),

  getSkillGapForInternship: (internshipId: string) =>
    api.get(`/skill-gap/internship/${internshipId}`),

  getReadiness: (internshipId?: string) =>
    api.get("/readiness", internshipId ? { internshipId } : undefined),

  runSimulator: (internshipId: string, changes: Record<string, unknown>) =>
    api.post("/simulator", { internshipId, changes }),

  getRoadmap: () =>
    api.get("/career-roadmap"),

  generateRoadmap: (internshipId?: string) =>
    api.post("/career-roadmap/generate", internshipId ? { internshipId } : {}),

  updateRoadmapProgress: (id: string, stepId: string, status: string) =>
    api.put(`/career-roadmap/${id}`, { stepId, status }),

  // Resume
  uploadResume: async (file: File) => {
    const { getToken } = await import("./apiClient").then(m => ({ getToken: () => {
      try {
        const raw = localStorage.getItem("auth-storage");
        if (!raw) return null;
        return JSON.parse(raw)?.state?.accessToken ?? null;
      } catch { return null; }
    }}));
    const form = new FormData();
    form.append("resume", file);
    const token = getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api"}/resumes/upload`, {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: form,
    });
    return res.json();
  },

  getResumes: () =>
    api.get("/resumes"),

  deleteResume: (id: string) =>
    api.delete(`/resumes/${id}`),

  // Verification & check-in
  generateQR: () =>
    api.post("/verification/generate-qr"),

  checkIn: (method: string, token?: string) =>
    api.post("/check-in", { method, token }),

  checkOut: () =>
    api.post("/check-out"),

  getCheckIns: () =>
    api.get("/check-in/student"),

  // Feedback
  submitFeedback: (data: Record<string, unknown>) =>
    api.post("/feedback", data),

  getMyFeedback: () =>
    api.get("/feedback/my"),

  // Outcomes & insights
  getOutcomes: () =>
    api.get("/outcomes/me"),

  getInsights: () =>
    api.get("/insights/me"),

  // Swap
  requestSwap: (targetStudentId: string, reason: string) =>
    api.post("/swaps/request", { targetStudentId, reason }),
};
