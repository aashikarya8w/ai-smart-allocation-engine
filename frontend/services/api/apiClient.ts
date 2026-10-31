/**
 * Base API client — replaces all mock services.
 * Set NEXT_PUBLIC_API_URL in frontend/.env.local to point to the backend.
 */

export function getApiBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    // If accessing via local network IP (e.g. mobile on same WiFi), connect to that host's port 5001
    if (
      host &&
      host !== "localhost" &&
      host !== "127.0.0.1" &&
      !host.includes("vercel.app") &&
      !host.includes("netlify.app")
    ) {
      return `http://${host}:5001/api`;
    }
  }

  return "http://localhost:5001/api";
}

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const direct = localStorage.getItem("intern-ai-token");
    if (direct) return direct;
    const raw = localStorage.getItem("auth-storage") || localStorage.getItem("intern-ai-auth");
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.state?.accessToken ?? parsed?.accessToken ?? null;
  } catch {
    return null;
  }
}

interface RequestOptions {
  method?:  "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?:    unknown;
  params?:  Record<string, string | number | boolean | undefined>;
  headers?: Record<string, string>;
  timeoutMs?: number;
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
  const { method = "GET", body, params, headers = {}, timeoutMs = 3500 } = options;

  let url = `${getApiBaseUrl()}${endpoint}`;
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

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      method,
      headers: reqHeaders,
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
    clearTimeout(timer);

    const data = await res.json().catch(() => ({ success: false, message: "Invalid JSON response" }));

    if (!res.ok || !data.success) {
      throw new ApiError(
        data.message ?? "Request failed",
        res.status,
        data.error?.code
      );
    }

    return data as T;
  } catch (err: any) {
    clearTimeout(timer);
    if (err instanceof ApiError) throw err;
    throw new ApiError(
      "Backend server is offline or unreachable",
      503,
      "NETWORK_ERROR"
    );
  }
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
