"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { GoogleIcon } from "./GoogleIcon";
import { GoogleAccountModal } from "./GoogleAccountModal";
import { googleAuthService } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";
import { ROLE_HOME } from "@/lib/permissions";
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
  onError,
  className = "",
}: GoogleAuthButtonProps) {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSelectAccount(account: { name: string; email: string; avatar?: string }) {
    setLoading(true);
    try {
      const user = await googleAuthService({
        email: account.email,
        name: account.name,
        role: role,
        avatar: account.avatar,
      });

      login(user);
      setIsModalOpen(false);
      router.push(ROLE_HOME[user.role]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Google authentication failed";
      if (onError) onError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Google Sign-in / Register Button */}
      <button
        type="button"
        disabled={loading}
        onClick={() => setIsModalOpen(true)}
        className="w-full h-11 flex items-center justify-center gap-3 rounded-xl border border-border/80 bg-background/80 hover:bg-muted/60 text-foreground font-semibold text-xs transition-all shadow-sm cursor-pointer hover:border-primary/50 hover:shadow-[0_0_15px_rgba(66,133,244,0.15)] group"
      >
        {loading ? (
          <Loader2 className="size-4 animate-spin text-primary" />
        ) : (
          <GoogleIcon className="size-4.5 transition-transform group-hover:scale-110" />
        )}
        <span>
          {actionType === "register" ? "Register with Google" : "Continue with Google"}
        </span>
      </button>

      {/* Styled Divider */}
      <div className="relative my-4 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border/70" />
        </div>
        <span className="relative bg-card px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground font-mono">
          {dividerText}
        </span>
      </div>

      {/* Account Picker Modal */}
      <GoogleAccountModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        role={role}
        actionType={actionType}
        onSelectAccount={handleSelectAccount}
      />
    </div>
  );
}
