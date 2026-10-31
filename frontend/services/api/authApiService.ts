import { api } from "./apiClient";

export const authApiService = {
  register: (data: { name: string; email: string; password: string; role: string }) =>
    api.post("/auth/register", data),

  login: (data: { email: string; password: string; role: string }) =>
    api.post<{ data: { accessToken: string; refreshToken: string; user: unknown } }>("/auth/login", data),

  logout: () =>
    api.post("/auth/logout"),

  refresh: (refreshToken: string) =>
    api.post<{ data: { accessToken: string; refreshToken: string } }>("/auth/refresh", { refreshToken }),

  me: () =>
    api.get<{ data: { user: unknown; profile: unknown } }>("/auth/me"),

  verifyEmail: (token: string) =>
    api.post("/auth/verify-email", { token }),

  forgotPassword: (email: string) =>
    api.post("/auth/forgot-password", { email }),

  resetPassword: (token: string, password: string) =>
    api.post("/auth/reset-password", { token, password }),

  changePassword: (currentPassword: string, newPassword: string) =>
    api.post("/auth/change-password", { currentPassword, newPassword }),
};
