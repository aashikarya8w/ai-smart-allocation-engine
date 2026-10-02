/**
 * Base API client — replaces all mock services.
 * Set NEXT_PUBLIC_API_URL in frontend/.env.local to point to the backend.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    // Zustand authStore persists to localStorage under key "auth-storage"
    const raw = localStorage.getItem("auth-storage");
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.state?.accessToken ?? null;
  } catch {
    return null;
  }
}

interface RequestOptions {
  method?:  "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?:    unknown;
  params?:  Record<string, string | number | boolean | undefined>;
  headers?: Record<string, string>;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code?: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiRequest<T = unknown>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { method = "GET", body, params, headers = {} } = options;

  let url = `${API_BASE}${endpoint}`;
  if (params) {
    const qs = Object.entries(params)
      .filter(([, v]) => v !== undefined && v !== "")
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
      .join("&");
    if (qs) url += `?${qs}`;
  }

  const token = getToken();
  const reqHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...headers,
  };
  if (token) reqHeaders["Authorization"] = `Bearer ${token}`;

  const res = await fetch(url, {
    method,
    headers: reqHeaders,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({ success: false, message: "Invalid JSON response" }));

  if (!res.ok || !data.success) {
    throw new ApiError(
      data.message ?? "Request failed",
      res.status,
      data.error?.code
    );
  }

  return data as T;
}

// Convenience wrappers
export const api = {
  get:    <T>(url: string, params?: RequestOptions["params"]) =>
    apiRequest<T>(url, { method: "GET", params }),
  post:   <T>(url: string, body?: unknown) =>
    apiRequest<T>(url, { method: "POST", body }),
  put:    <T>(url: string, body?: unknown) =>
    apiRequest<T>(url, { method: "PUT", body }),
  patch:  <T>(url: string, body?: unknown) =>
    apiRequest<T>(url, { method: "PATCH", body }),
  delete: <T>(url: string) =>
    apiRequest<T>(url, { method: "DELETE" }),
};
