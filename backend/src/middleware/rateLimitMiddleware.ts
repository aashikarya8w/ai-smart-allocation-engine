import rateLimit from "express-rate-limit";
import { env } from "../config/env";

export const globalRateLimiter = rateLimit({
  windowMs: env.rateLimit.windowMs,
  max:      env.rateLimit.max,
  standardHeaders: true,
  legacyHeaders:   false,
  message: {
    success: false,
    message: "Too many requests, please try again later.",
    error: { code: "RATE_LIMIT_EXCEEDED" },
  },
});

export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 min
  max: 20,
  message: {
    success: false,
    message: "Too many auth attempts, please try again after 15 minutes.",
    error: { code: "AUTH_RATE_LIMIT" },
  },
});
