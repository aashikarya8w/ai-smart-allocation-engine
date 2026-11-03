"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { GoogleIcon } from "./GoogleIcon";
import { GoogleOAuthModal } from "./GoogleOAuthModal";
import { getGoogleClientId, redirectToGoogleAuth } from "@/lib/googleAuth";
import type { UserRole } from "@/types/user";

interface GoogleAuthButtonProps {
  role: UserRole;
  actionType: "login" | "register";
  dividerText?: string;
  onError?: (err: string) => void;
  className?: string;
}

export function GoogleAuthButton({
  role,
  actionType,
  dividerText = "Or continue with email",
  className = "",
}: GoogleAuthButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  function handleClick() {
    const clientId = getGoogleClientId();
    if (clientId) {
      setIsRedirecting(true);
      redirectToGoogleAuth({ role, actionType });
    } else {
      setIsModalOpen(true);
    }
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Official Google Button */}
      <button
        type="button"
        disabled={isRedirecting}
        onClick={handleClick}
        className="w-full h-11 flex items-center justify-center gap-3 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs transition-all shadow-sm cursor-pointer hover:border-white/30 hover:shadow-[0_0_20px_rgba(66,133,244,0.2)] group"
      >
        {isRedirecting ? (
          <Loader2 className="size-4 animate-spin text-primary" />
        ) : (
          <GoogleIcon className="size-4.5 transition-transform group-hover:scale-110" />
        )}
        <span>
          {isRedirecting
            ? "Redirecting to accounts.google.com..."
            : actionType === "register"
            ? "Register with Google"
            : "Continue with Google"}
        </span>
      </button>

      {/* Styled Divider */}
      <div className="relative my-4 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10" />
        </div>
        <span className="relative bg-background/90 px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground font-mono">
          {dividerText}
        </span>
      </div>

      {/* Google OAuth Modal (if Client ID not yet configured) */}
      <GoogleOAuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        role={role}
        actionType={actionType}
      />
    </div>
  );
}
