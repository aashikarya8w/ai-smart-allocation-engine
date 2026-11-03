"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, AlertCircle, CheckCircle, ArrowRight } from "lucide-react";
import { googleAuthService } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";
import { ROLE_HOME } from "@/lib/permissions";
import { GoogleIcon } from "@/components/auth/GoogleIcon";
import type { UserRole } from "@/types/user";

function CallbackHandler() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [statusText, setStatusText] = useState("Connecting to Google Account...");
  const [userName, setUserName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function processCallback() {
      try {
        // Read hash or search params
        const hash = window.location.hash.startsWith("#")
          ? window.location.hash.substring(1)
          : "";
        const search = window.location.search.startsWith("?")
          ? window.location.search.substring(1)
          : "";
        
        const params = new URLSearchParams(hash || search);

        const accessToken = params.get("access_token");
        const idToken = params.get("id_token");
        const error = params.get("error");
        const errorDescription = params.get("error_description");
        const stateRaw = params.get("state");

        if (error) {
          throw new Error(errorDescription || `Google authentication error: ${error}`);
        }

        // Determine user role
        let role: UserRole = "student";
        if (stateRaw) {
          try {
            const parsed = JSON.parse(decodeURIComponent(stateRaw));
            if (parsed.role) role = parsed.role;
          } catch {}
        }
        if (!stateRaw) {
          const stored = sessionStorage.getItem("internai_google_auth_role");
          if (stored) role = stored as UserRole;
        }

        setStatusText("Fetching your Google profile details...");

        let email = "";
        let name = "";
        let avatar = "";
        let googleId = "";

        // 1. Fetch profile from official Google userinfo endpoint
        if (accessToken) {
          try {
            const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
              headers: { Authorization: `Bearer ${accessToken}` },
            });
            if (res.ok) {
              const data = await res.json();
              email = data.email || "";
              name = data.name || data.given_name || (data.email ? data.email.split("@")[0] : "");
              avatar = data.picture || "";
              googleId = data.sub || "";
            }
          } catch (e) {
            console.warn("Google userinfo fetch error:", e);
          }
        }

        // 2. Fallback to decoding JWT id_token if email not found
        if (!email && idToken) {
          try {
            const base64Url = idToken.split(".")[1];
            const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
            const jsonPayload = decodeURIComponent(
              atob(base64)
                .split("")
                .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                .join("")
            );
            const decoded = JSON.parse(jsonPayload);
            email = decoded.email || "";
            name = decoded.name || (email ? email.split("@")[0] : "");
            avatar = decoded.picture || "";
            googleId = decoded.sub || "";
          } catch (e) {
            console.warn("Google idToken decoding error:", e);
          }
        }

        if (!email) {
          throw new Error("Could not retrieve Google profile or email. Please ensure permissions are granted.");
        }

        setStatusText(`Signing in as ${name} (${email})...`);
        setUserName(name);

        // Authenticate with InternAI backend
        const user = await googleAuthService({
          email,
          name,
          role,
          avatar,
          googleId,
        });

        login(user);
        setStatus("success");
        setStatusText("Authentication successful! Redirecting to dashboard...");

        const destination = ROLE_HOME[user.role] || "/student/dashboard";
        setTimeout(() => {
          router.push(destination);
        }, 1000);
      } catch (err: any) {
        setStatus("error");
        setErrorMessage(
          err?.message || "Google authentication failed. Please verify your connection or Google settings."
        );
      }
    }

    processCallback();
  }, [login, router]);

  return (
    <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-2xl text-center">
      {/* Brand Icon */}
      <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-inner">
        <GoogleIcon className="size-8" />
      </div>

      <h1 className="mt-4 text-xl font-bold tracking-tight text-white">
        Official Google Sign-In
      </h1>
      <p className="mt-1 text-xs text-slate-400 font-mono">
        accounts.google.com · OAuth 2.0
      </p>

      {/* States */}
      {status === "loading" && (
        <div className="my-8 flex flex-col items-center justify-center space-y-3">
          <Loader2 className="size-8 animate-spin text-orange-500" />
          <p className="text-sm font-medium text-slate-200">{statusText}</p>
        </div>
      )}

      {status === "success" && (
        <div className="my-8 flex flex-col items-center justify-center space-y-3">
          <div className="flex size-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
            <CheckCircle className="size-7" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">Welcome, {userName}!</p>
            <p className="text-xs text-slate-400 mt-0.5">{statusText}</p>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="my-6 space-y-4 text-left">
          <div className="flex items-start gap-3 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-rose-300">
            <AlertCircle className="size-5 shrink-0 mt-0.5 text-rose-400" />
            <div className="text-xs space-y-1">
              <p className="font-semibold text-rose-200">Authentication Issue</p>
              <p className="leading-relaxed opacity-90">{errorMessage}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="flex-1 h-11 flex items-center justify-center rounded-xl bg-white/10 text-xs font-semibold text-white hover:bg-white/15 transition-all"
            >
              Return to Login
            </Link>
            <Link
              href="/register"
              className="flex-1 h-11 flex items-center justify-center rounded-xl bg-orange-500 text-xs font-bold text-white hover:bg-orange-600 transition-all"
            >
              Go to Register
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function GoogleCallbackPage() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-[#07090e] p-4 text-white relative overflow-hidden">
      {/* Background Ambient Orbs */}
      <div className="pointer-events-none absolute -top-40 -left-40 size-[500px] rounded-full bg-orange-500/20 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 size-[500px] rounded-full bg-blue-600/20 blur-[130px]" />
      
      <Suspense
        fallback={
          <div className="text-center text-slate-400 flex items-center gap-2">
            <Loader2 className="size-5 animate-spin text-orange-500" />
            <span>Loading authentication...</span>
          </div>
        }
      >
        <CallbackHandler />
      </Suspense>
    </main>
  );
}
