import { api } from "./apiClient";

export const internshipApiService = {
  getAll: (params?: {
    page?: number; limit?: number; search?: string;
    sector?: string; city?: string; workMode?: string; duration?: string;
  }) => api.get("/internships", params),

  getById: (id: string) =>
    api.get(`/internships/${id}`),

  // Matching
  getMatchScore: (studentId: string, internshipId: string) =>
    api.get(`/matching/score/${studentId}/${internshipId}`),

  getSuitability: (studentId: string, internshipId: string) =>
    api.get(`/suitability/${studentId}/${internshipId}`),

  getSkillGap: (internshipId: string) =>
    api.get(`/skill-gap/internship/${internshipId}`),

  // Public data
  getSkills: () => api.get("/skills"),
  getSectors: () => api.get("/sectors"),
  getLocations: () => api.get("/locations"),
  getStates: () => api.get("/locations/states"),
  getCities: (state?: string) => api.get("/locations/cities", state ? { state } : undefined),
};
