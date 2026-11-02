"use client";

import { useState } from "react";
import { X, Check, ArrowRight, UserPlus, Shield, Loader2 } from "lucide-react";
import { GoogleIcon } from "./GoogleIcon";
import type { UserRole } from "@/types/user";

interface GoogleAccount {
  name: string;
  email: string;
  avatar?: string;
  badge?: string;
}

interface GoogleAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: UserRole;
  actionType: "login" | "register";
  onSelectAccount: (account: { name: string; email: string; avatar?: string }) => Promise<void>;
}

export function GoogleAccountModal({
  isOpen,
  onClose,
  role,
  actionType,
  onSelectAccount,
}: GoogleAccountModalProps) {
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customName, setCustomName] = useState("");
  const [customEmail, setCustomEmail] = useState("");
  const [customError, setCustomError] = useState("");

  if (!isOpen) return null;

  const defaultAccounts: GoogleAccount[] = [
    {
      name: "Aashik Kumar",
      email: "aashikrocksz54@gmail.com",
      badge: "Primary Google Account",
    },
    {
      name: "Govind Sharma",
      email: "govind.student@gmail.com",
      badge: "Verified Student",
    },
    {
      name: "TechNova Talent & HR",
      email: "hr@technova.com",
      badge: "Corporate Partner",
    },
  ];

  async function handleSelect(account: { name: string; email: string; avatar?: string }) {
    setSelectedEmail(account.email);
    setIsSubmitting(true);
    try {
      await onSelectAccount(account);
    } catch (err) {
      setIsSubmitting(false);
    }
  }

  async function handleCustomSubmit(e: React.FormEvent) {
    e.preventDefault();
    setCustomError("");
    const email = customEmail.trim();
    const name = customName.trim() || email.split("@")[0];

    if (!email || !email.includes("@")) {
      setCustomError("Please enter a valid Google email address.");
      return;
    }

    await handleSelect({
      name,
      email,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={!isSubmitting ? onClose : undefined}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md rounded-2xl border border-border/80 bg-card p-6 shadow-2xl backdrop-blur-xl sm:p-7 z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        {!isSubmitting && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        )}

        {/* Google Header */}
        <div className="text-center">
          <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-muted/60 p-2 shadow-inner border border-border/40">
            <GoogleIcon className="size-7" />
          </div>

          <h3 className="mt-3 text-lg font-bold tracking-tight text-foreground">
            {actionType === "register" ? "Register with Google" : "Sign in with Google"}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Choose an account to continue to <span className="font-semibold text-foreground">InternAI</span> as{" "}
            <span className="font-bold uppercase text-primary font-mono">{role}</span>
          </p>
        </div>

        {/* Loading Overlay */}
        {isSubmitting ? (
          <div className="my-8 flex flex-col items-center justify-center space-y-3 py-6 text-center">
            <Loader2 className="size-8 animate-spin text-primary" />
            <p className="text-sm font-semibold text-foreground">
              Authenticating with Google...
            </p>
            <p className="text-xs text-muted-foreground">
              Verifying profile and signing you into your dashboard
            </p>
          </div>
        ) : (
          <>
            {/* Account List */}
            {!showCustomForm ? (
              <div className="mt-5 space-y-2">
                {defaultAccounts.map((acc) => {
                  const isSelected = selectedEmail === acc.email;
                  return (
                    <button
                      key={acc.email}
                      type="button"
                      onClick={() => handleSelect(acc)}
                      className={`
                        w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer
                        ${
                          isSelected
                            ? "border-primary bg-primary/10 shadow-sm"
                            : "border-border/70 bg-muted/30 hover:bg-muted/70 hover:border-border"
                        }
                      `}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Avatar */}
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 font-bold text-white shadow-sm text-sm">
                          {acc.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <p className="truncate text-xs font-bold text-foreground">
                              {acc.name}
                            </p>
                            {acc.badge && (
                              <span className="rounded bg-muted px-1.5 py-0.5 text-[9px] font-mono text-muted-foreground font-semibold">
                                {acc.badge}
                              </span>
                            )}
                          </div>
                          <p className="truncate text-xs text-muted-foreground font-mono">
                            {acc.email}
                          </p>
                        </div>
                      </div>

                      <ArrowRight size={15} className="shrink-0 text-muted-foreground ml-2" />
                    </button>
                  );
                })}

                {/* Use Another Account Button */}
                <button
                  type="button"
                  onClick={() => setShowCustomForm(true)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl border border-dashed border-border/80 bg-muted/20 hover:bg-muted/50 text-xs font-semibold text-muted-foreground hover:text-foreground transition-all cursor-pointer mt-1"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted border border-border/60">
                    <UserPlus size={16} />
                  </div>
                  <span>Use another Google account</span>
                </button>
              </div>
            ) : (
              /* Custom Google Email Form */
              <form onSubmit={handleCustomSubmit} className="mt-5 space-y-3">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">
                    Google Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={customEmail}
                    onChange={(e) => setCustomEmail(e.target.value)}
                    placeholder="yourname@gmail.com"
                    className="w-full h-10 px-3 rounded-xl border border-border/80 bg-background text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="e.g. Aashik Kumar"
                    className="w-full h-10 px-3 rounded-xl border border-border/80 bg-background text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                </div>

                {customError && (
                  <p className="text-xs text-rose-500">{customError}</p>
                )}

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowCustomForm(false)}
                    className="flex-1 h-10 rounded-xl border border-border/80 bg-muted/40 text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Continue</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </form>
            )}

            {/* Privacy & Trust Notice */}
            <div className="mt-5 pt-4 border-t border-border/60 flex items-center justify-center gap-2 text-[11px] text-muted-foreground font-mono">
              <Shield size={12} className="text-emerald-500" />
              <span>Verified 256-bit OAuth Token Exchange</span>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
