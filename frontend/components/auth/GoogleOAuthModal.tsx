"use client";

import { useState } from "react";
import { X, ExternalLink, KeyRound, Check, ShieldCheck, ArrowRight } from "lucide-react";
import { GoogleIcon } from "./GoogleIcon";
import { setGoogleClientId, redirectToGoogleAuth, buildGoogleAuthUrl } from "@/lib/googleAuth";
import type { UserRole } from "@/types/user";

interface GoogleOAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: UserRole;
  actionType: "login" | "register";
}

export function GoogleOAuthModal({
  isOpen,
  onClose,
  role,
  actionType,
}: GoogleOAuthModalProps) {
  const [clientIdInput, setClientIdInput] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  function handleSaveAndRedirect(e: React.FormEvent) {
    e.preventDefault();
    const cleaned = clientIdInput.trim();
    if (!cleaned) {
      setError("Please paste a valid Google OAuth Client ID.");
      return;
    }

    setGoogleClientId(cleaned);
    redirectToGoogleAuth({ role, actionType, clientIdOverride: cleaned });
  }

  function handleDirectGoogleSite() {
    // Open Google accounts site directly
    const fallbackUrl = buildGoogleAuthUrl({
      role,
      actionType,
      clientIdOverride: clientIdInput.trim() || "DEMO_GOOGLE_CLIENT_ID.apps.googleusercontent.com",
    });
    window.location.href = fallbackUrl;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg rounded-3xl border border-white/15 bg-[#0b0f19] p-6 sm:p-8 shadow-2xl z-10 text-white animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 rounded-xl p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-inner">
            <GoogleIcon className="size-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-tight text-white">
              Official Google Sign-In Setup
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              Redirect to accounts.google.com
            </p>
          </div>
        </div>

        <p className="text-xs leading-relaxed text-slate-300 mb-5">
          Original Google site (<span className="text-sky-400 font-mono font-semibold">accounts.google.com</span>) par user authentication ke liye Google Cloud Console ka **OAuth 2.0 Client ID** zaroorat hota hai.
        </p>

        {/* Input Form */}
        <form onSubmit={handleSaveAndRedirect} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-200 mb-1.5 flex items-center gap-1.5">
              <KeyRound size={14} className="text-orange-400" />
              <span>Google OAuth 2.0 Client ID</span>
            </label>
            <input
              type="text"
              required
              value={clientIdInput}
              onChange={(e) => {
                setClientIdInput(e.target.value);
                setError("");
              }}
              placeholder="e.g. 123456789-abcdef.apps.googleusercontent.com"
              className="w-full h-11 px-3.5 rounded-xl border border-white/15 bg-white/5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 font-mono"
            />
            {error && <p className="mt-1.5 text-xs text-rose-400">{error}</p>}
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
            <button
              type="submit"
              className="flex-1 h-11 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] transition-all cursor-pointer"
            >
              <span>Save & Go to accounts.google.com</span>
              <ArrowRight size={14} />
            </button>
            <button
              type="button"
              onClick={handleDirectGoogleSite}
              className="h-11 px-4 flex items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 text-xs font-semibold transition-all cursor-pointer"
            >
              <ExternalLink size={13} />
              <span>Test Google Site</span>
            </button>
          </div>
        </form>

        {/* Quick Instructions */}
        <div className="mt-6 pt-5 border-t border-white/10 space-y-2.5 text-[11px] text-slate-400">
          <p className="font-bold text-slate-200 uppercase tracking-wider text-[10px] font-mono">
            How to get your free Google Client ID (2 Minutes):
          </p>
          <ol className="list-decimal list-inside space-y-1.5 leading-relaxed text-slate-300">
            <li>
              Open{" "}
              <a
                href="https://console.cloud.google.com/apis/credentials"
                target="_blank"
                rel="noreferrer"
                className="text-sky-400 hover:underline inline-flex items-center gap-0.5"
              >
                Google Cloud Console <ExternalLink size={11} />
              </a>
            </li>
            <li>Click <strong>&quot;Create Credentials&quot;</strong> → <strong>&quot;OAuth client ID&quot;</strong> (Web Application).</li>
            <li>
              Authorized redirect URI add karein:{" "}
              <code className="text-orange-400 bg-white/5 px-1 py-0.5 rounded font-mono">
                http://localhost:3000/auth/callback
              </code>
            </li>
            <li>Client ID copy karke yahan paste karein ya <code className="text-orange-400">frontend/.env.local</code> mein save karein!</li>
          </ol>
        </div>

        <div className="mt-5 flex items-center justify-center gap-2 text-[11px] text-slate-500 font-mono">
          <ShieldCheck size={13} className="text-emerald-400" />
          <span>Official OAuth 2.0 Web Client Specification</span>
        </div>

      </div>
    </div>
  );
}
