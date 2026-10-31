import { Router } from "express";
import * as ctrl from "../controllers/intelligenceController";
import { authenticate, requireStudent, requireCompany, requireAdmin } from "../middleware/authMiddleware";

const router = Router();

/* ── Skill Gap ───────────────────────────────────────────── */
router.get("/skill-gap",                              authenticate, requireStudent, ctrl.getStudentSkillGap);
router.get("/skill-gap/internship/:internshipId",     authenticate, requireStudent, ctrl.getSkillGapForInternship);
router.get("/skill-gap/admin/:studentId",             authenticate, requireAdmin,   ctrl.getSkillGapByStudentId);

/* ── Suitability ─────────────────────────────────────────── */
router.get("/suitability/:studentId/:internshipId",   authenticate, ctrl.getSuitability);
router.get("/suitability/application/:applicationId", authenticate, ctrl.getSuitabilityByApplication);

/* ── Readiness ───────────────────────────────────────────── */
router.get("/readiness",                              authenticate, requireStudent, ctrl.getReadiness);

/* ── What-If Simulator ───────────────────────────────────── */
router.post("/simulator",                             authenticate, requireStudent, ctrl.runSimulator);

/* ── Career Roadmap ──────────────────────────────────────── */
router.get( "/career-roadmap",          authenticate, requireStudent, ctrl.getRoadmap);
router.post("/career-roadmap/generate", authenticate, requireStudent, ctrl.generateRoadmap);
router.put( "/career-roadmap/:id",      authenticate, requireStudent, ctrl.updateRoadmapProgress);

/* ── Verification ────────────────────────────────────────── */
router.post("/verification/generate-qr",  authenticate, requireStudent, ctrl.generateQR);
router.post("/verification/verify-qr",    authenticate, ctrl.verifyQR);
router.post("/verification/rfid",         authenticate, ctrl.verifyHardware);
router.post("/verification/fingerprint",  authenticate, ctrl.verifyHardware);
router.post("/verification/face",         authenticate, ctrl.verifyHardware);

/* ── Check-In ────────────────────────────────────────────── */
router.post("/check-in",                  authenticate, requireStudent, ctrl.checkIn);
router.post("/check-out",                 authenticate, requireStudent, ctrl.checkOut);
router.get( "/check-in/student",          authenticate, requireStudent, ctrl.getStudentCheckIns);
router.get( "/check-in/company",          authenticate, requireCompany, ctrl.getCompanyCheckIns);
router.get( "/check-in/admin",            authenticate, requireAdmin,   ctrl.getAllCheckIns);

/* ── Swaps ───────────────────────────────────────────────── */
router.post("/swaps/request",             authenticate, requireStudent, ctrl.requestSwap);
router.get( "/swaps",                     authenticate, requireAdmin,   ctrl.getSwaps);
router.get( "/swaps/:id",                 authenticate, ctrl.getSwapById);
router.post("/swaps/:id/approve",         authenticate, requireAdmin,   ctrl.approveSwap);
router.post("/swaps/:id/reject",          authenticate, requireAdmin,   ctrl.rejectSwap);

/* ── Outcomes & Insights ──────────────────────────────────── */
router.get( "/outcomes/me",              authenticate, requireStudent, ctrl.getStudentOutcomes);
router.get( "/outcomes/:id",             authenticate, ctrl.getStudentOutcomes);
router.post("/outcomes/generate",        authenticate, requireAdmin,   ctrl.generateOutcome);
router.get( "/insights/me",             authenticate, requireStudent, ctrl.getPerformanceInsights);
router.get( "/insights/:id",            authenticate, ctrl.getPerformanceInsights);

/* ── Fairness ────────────────────────────────────────────── */
router.get("/fairness",                   authenticate, requireAdmin, ctrl.getFairnessDashboard);
router.get("/fairness/:internshipId",     authenticate, requireAdmin, ctrl.getFairnessDashboard);

export default router;
