import type { UserRole } from "@/types/user";

export function getGoogleClientId(): string {
  if (typeof window !== "undefined") {
    const local = localStorage.getItem("internai_google_client_id");
    if (local && local.trim()) return local.trim();
  }
  return (
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID?.trim() ||
    "884210984712-internai-auth.apps.googleusercontent.com"
  );
}

export function setGoogleClientId(id: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem("internai_google_client_id", id.trim());
  }
}

export function buildGoogleAuthUrl(options: {
  role: UserRole;
  actionType: "login" | "register";
  clientIdOverride?: string;
}): string {
  const clientId = options.clientIdOverride || getGoogleClientId();
  const redirectUri =
    typeof window !== "undefined"
      ? `${window.location.origin}/auth/callback`
      : "http://localhost:3000/auth/callback";

  const stateObj = {
    role: options.role,
    actionType: options.actionType,
    ts: Date.now(),
  };

  const state = encodeURIComponent(JSON.stringify(stateObj));
  const nonce = Math.random().toString(36).substring(2) + Date.now().toString(36);

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "token id_token",
    scope: "openid profile email",
    prompt: "select_account",
    nonce: nonce,
    state: state,
  });

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

export function redirectToGoogleAuth(options: {
  role: UserRole;
  actionType: "login" | "register";
  clientIdOverride?: string;
}) {
  if (typeof window === "undefined") return;

  sessionStorage.setItem("internai_google_auth_role", options.role);
  sessionStorage.setItem("internai_google_auth_action", options.actionType);

  const url = buildGoogleAuthUrl(options);
  // Directly navigate to Google's official site
  window.location.href = url;
}
