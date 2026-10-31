import express from "express";
import cors    from "cors";
import helmet  from "helmet";
import morgan  from "morgan";
import path    from "path";
import swaggerUi from "swagger-ui-express";

import { env }                  from "./config/env";
import { swaggerSpec }          from "./config/swagger";
import { globalRateLimiter }    from "./middleware/rateLimitMiddleware";
import { notFound, errorHandler } from "./middleware/errorMiddleware";

// Routes
import authRoutes         from "./routes/authRoutes";
import studentRoutes      from "./routes/studentRoutes";
import companyRoutes      from "./routes/companyRoutes";
import internshipRoutes   from "./routes/internshipRoutes";
import applicationRoutes  from "./routes/applicationRoutes";
import allocationRoutes   from "./routes/allocationRoutes";
import matchingRoutes     from "./routes/matchingRoutes";
import assessmentRoutes   from "./routes/assessmentRoutes";
import notificationRoutes from "./routes/notificationRoutes";
import skillRoutes        from "./routes/skillRoutes";
import ruleRoutes         from "./routes/ruleRoutes";
import auditLogRoutes     from "./routes/auditLogRoutes";
import reportRoutes       from "./routes/reportRoutes";
import feedbackRoutes     from "./routes/feedbackRoutes";
import resumeRoutes       from "./routes/resumeRoutes";
import adminRoutes        from "./routes/adminRoutes";
import intelligenceRoutes from "./routes/intelligenceRoutes";
import skillEvidenceRoutes from "./routes/skillEvidenceRoutes";

const app = express();

/* ── Security ────────────────────────────────────────────── */
app.use(helmet());
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (
      env.isDev ||
      origin === env.clientUrl ||
      origin.includes("localhost") ||
      origin.includes("127.0.0.1") ||
      origin.includes("vercel.app") ||
      origin.includes("netlify.app") ||
      /^http:\/\/192\.168\.\d+\.\d+(:\d+)?$/.test(origin) ||
      /^http:\/\/10\.\d+\.\d+\.\d+(:\d+)?$/.test(origin)
    ) {
      return callback(null, true);
    }
    const allowed = env.clientUrl.split(",").map((s) => s.trim());
    if (allowed.includes(origin)) return callback(null, true);
    return callback(null, true);
  },
  credentials: true,
  methods:     ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"],
}));
app.use(globalRateLimiter);

/* ── Parsing ─────────────────────────────────────────────── */
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

/* ── Logging ─────────────────────────────────────────────── */
if (env.isDev) app.use(morgan("dev"));

/* ── Static uploads ──────────────────────────────────────── */
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

/* ── Health check ────────────────────────────────────────── */
app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "SIH25033 Backend is running",
    environment: env.nodeEnv,
    timestamp:   new Date().toISOString(),
  });
});

/* ── Swagger docs ────────────────────────────────────────── */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customSiteTitle: "SIH25033 API Docs",
  customCss: ".swagger-ui .topbar { background-color: #1e1b4b; }",
}));
app.get("/api-docs.json", (_req, res) => res.json(swaggerSpec));

/* ── API Routes ──────────────────────────────────────────── */
app.use("/api/auth",          authRoutes);
app.use("/api/students",      studentRoutes);
app.use("/api/companies",     companyRoutes);
app.use("/api/internships",   internshipRoutes);
app.use("/api/applications",  applicationRoutes);
app.use("/api/allocations",   allocationRoutes);
app.use("/api/matching",      matchingRoutes);
app.use("/api/assessments",   assessmentRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api",               skillRoutes);        // /api/skills, /api/sectors, /api/locations
app.use("/api/rules",         ruleRoutes);
app.use("/api/audit-logs",    auditLogRoutes);
app.use("/api/reports",       reportRoutes);
app.use("/api/feedback",      feedbackRoutes);
app.use("/api/resumes",       resumeRoutes);
app.use("/api/admin",         adminRoutes);
app.use("/api",              intelligenceRoutes);
app.use("/api/skill-evidence", skillEvidenceRoutes);

/* ── 404 + Error handler ─────────────────────────────────── */
app.use(notFound);
app.use(errorHandler);

export default app;
