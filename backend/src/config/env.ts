import dotenv from "dotenv";
import path from "path";

// Load .env from backend root
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

function required(key: string): string {
  const val = process.env[key];
  if (!val) throw new Error(`Missing required environment variable: ${key}`);
  return val;
}

function optional(key: string, fallback: string): string {
  return process.env[key] ?? fallback;
}

export const env = {
  port: parseInt(optional("PORT", "5001"), 10),
  nodeEnv: optional("NODE_ENV", "development"),
  isDev: optional("NODE_ENV", "development") === "development",
  isProd: optional("NODE_ENV", "development") === "production",

  // Read at call-time so test setupFiles can override MONGO_URI before app imports
  get mongoUri(): string {
    return process.env["MONGO_URI"] ?? required("MONGO_URI");
  },

  jwt: {
    accessSecret: required("JWT_ACCESS_SECRET"),
    refreshSecret: required("JWT_REFRESH_SECRET"),
    accessExpiresIn: optional("JWT_ACCESS_EXPIRES_IN", "15m"),
    refreshExpiresIn: optional("JWT_REFRESH_EXPIRES_IN", "7d"),
  },

  clientUrl: optional("CLIENT_URL", "http://localhost:3000"),

  smtp: {
    host: optional("SMTP_HOST", "smtp.gmail.com"),
    port: parseInt(optional("SMTP_PORT", "587"), 10),
    user: optional("SMTP_USER", ""),
    password: optional("SMTP_PASSWORD", ""),
    from: optional("SMTP_FROM", "InternAI <noreply@sih25033.com>"),
  },

  upload: {
    dir: optional("UPLOAD_DIR", "uploads"),
    maxFileSize: parseInt(optional("MAX_FILE_SIZE", "5242880"), 10),
  },

  rateLimit: {
    windowMs: parseInt(optional("RATE_LIMIT_WINDOW_MS", "900000"), 10),
    max: parseInt(optional("RATE_LIMIT_MAX", "100"), 10),
  },
} as const;
