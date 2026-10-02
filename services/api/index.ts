/**
 * Central export for all API services.
 * Replace mock service imports with these to connect the frontend to the backend.
 *
 * Usage:
 *   import { authApiService } from "@/services/api";
 *   const data = await authApiService.login({ email, password, role });
 */

export { api, apiRequest, ApiError } from "./apiClient";
export { authApiService }            from "./authApiService";
export { studentApiService }         from "./studentApiService";
export { companyApiService }         from "./companyApiService";
export { adminApiService }           from "./adminApiService";
export { internshipApiService }      from "./internshipApiService";
