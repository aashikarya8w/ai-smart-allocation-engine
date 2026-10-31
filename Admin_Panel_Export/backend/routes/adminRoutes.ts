import { Router } from "express";
import * as adminCtrl    from "../controllers/adminController";
import * as studentCtrl  from "../controllers/studentController";
import * as companyCtrl  from "../controllers/companyController";
import * as internshipCtrl from "../controllers/internshipController";
import * as appCtrl      from "../controllers/applicationController";
import * as allocCtrl    from "../controllers/allocationController";
import * as analyticsCtrl from "../controllers/analyticsController";
import * as auditCtrl    from "../controllers/auditLogController";
import * as reportCtrl   from "../controllers/reportController";
import * as intelCtrl    from "../controllers/intelligenceController";
import { authenticate, requireAdmin } from "../middleware/authMiddleware";

const router = Router();
router.use(authenticate, requireAdmin);

// Dashboard
router.get("/dashboard",              adminCtrl.getAdminDashboard);

// Students
router.get("/students",               studentCtrl.listStudents);
router.get("/students/:id",           studentCtrl.getStudentById);
router.put("/students/:id/verify",    adminCtrl.adminVerifyStudent);

// Companies
router.get("/companies",              companyCtrl.listCompanies);
router.get("/companies/:id",          companyCtrl.getCompanyById);
router.put("/companies/:id/verify",   adminCtrl.adminVerifyCompany);

// Internships
router.get("/internships",            internshipCtrl.getInternships);
router.get("/internships/pending",    internshipCtrl.getPendingInternships);
router.get("/internships/:id",        internshipCtrl.getInternshipById);
router.put("/internships/:id/approve",internshipCtrl.approveInternship);
router.put("/internships/:id/reject", internshipCtrl.rejectInternship);

// Applications
router.get("/applications",           appCtrl.listApplications);
router.get("/applications/:id",       appCtrl.getApplicationById);

// Allocations
router.post("/allocations/run",       allocCtrl.runAllocation);
router.get( "/allocations",           allocCtrl.getAllocations);
router.get( "/allocations/:id",       allocCtrl.getAllocationById);
router.post("/allocations/:id/approve", allocCtrl.approveAllocation);
router.post("/allocations/:id/reject",  allocCtrl.rejectAllocation);

// Analytics
router.get("/analytics",              analyticsCtrl.getAdminAnalytics);
router.get("/analytics/students",     analyticsCtrl.getAdminStudentsAnalytics);
router.get("/analytics/companies",    analyticsCtrl.getAdminCompaniesAnalytics);
router.get("/analytics/internships",  analyticsCtrl.getAdminInternshipsAnalytics);
router.get("/analytics/applications", analyticsCtrl.getAdminApplicationsAnalytics);
router.get("/analytics/allocations",  analyticsCtrl.getAdminAllocationsAnalytics);

// Audit logs
router.get("/audit-logs",             auditCtrl.getAuditLogs);
router.get("/audit-logs/:id",         auditCtrl.getAuditLogById);

// Reports
router.get("/reports",                reportCtrl.getReports);
router.post("/reports/generate",      reportCtrl.generateReport);
router.get("/reports/students",       reportCtrl.getStudentReport);
router.get("/reports/internships",    reportCtrl.getInternshipReport);
router.get("/reports/applications",   reportCtrl.getApplicationReport);
router.get("/reports/allocations",    reportCtrl.getAllocationReport);

// Administrators
router.get("/administrators",         adminCtrl.listAdmins);
router.post("/administrators",        adminCtrl.createAdmin);

// User management
router.post("/users/suspend",         adminCtrl.suspendUser);
router.put( "/users/:id/activate",    adminCtrl.activateUser);

// AI Matching
router.post("/matching/run",          async (req, res, next) => {
  const { matchingService } = await import("../services/matchingService");
  try {
    const result = await matchingService.runForAll();
    const { sendSuccess } = await import("../utils/apiResponse");
    sendSuccess(res, result, "AI Matching completed");
  } catch (err) { next(err); }
});
router.get("/matching/results", async (req, res, next) => {
  try {
    const { Recommendation } = await import("../models/Recommendation");
    const { sendSuccess } = await import("../utils/apiResponse");
    const total  = await Recommendation.countDocuments();
    const recent = await Recommendation.find().sort({ generatedAt: -1 }).limit(50).lean();
    sendSuccess(res, { total, recent });
  } catch (err) { next(err); }
});

// Allocation simulator
router.post("/allocation-simulator", async (req, res, next) => {
  try {
    const { runAllocationSimulation } = await import("../services/allocationSimulatorService");
    const { sendSuccess } = await import("../utils/apiResponse");
    const result = await runAllocationSimulation(req.body);
    sendSuccess(res, result, "Simulation complete — no production data modified");
  } catch (err) { next(err); }
});

// Reallocation (simplified — uses allocation engine on waitlisted candidates)
router.post("/reallocation/run", async (req, res, next) => {
  try {
    const { runSmartAllocation } = await import("../services/allocationService");
    const { sendSuccess }        = await import("../utils/apiResponse");
    const result = await runSmartAllocation(
      (req as Express.Request).user!.userId,
      (req as Express.Request).user!.name,
      req.body.cycle
    );
    sendSuccess(res, result, "Reallocation run complete");
  } catch (err) { next(err); }
});
router.get("/reallocation", async (req, res, next) => {
  try {
    const { getAllocations }  = await import("../services/allocationService");
    const { sendList }        = await import("../utils/apiResponse");
    const { getPagination, buildPaginationMeta } = await import("../utils/pagination");
    const { page, limit }     = getPagination(req as import("express").Request);
    const { data, total }     = await getAllocations({ page, limit, status: "Recommended" });
    sendList(res, data, buildPaginationMeta(page, limit, total));
  } catch (err) { next(err); }
});
// Reallocation approve/reject (reuse allocation approve/reject)
router.post("/reallocation/:id/approve", allocCtrl.approveAllocation);
router.post("/reallocation/:id/reject",  allocCtrl.rejectAllocation);

// Fairness
router.get("/fairness",              intelCtrl.getFairnessDashboard);
router.get("/fairness/:internshipId",intelCtrl.getFairnessDashboard);

// Swaps management
router.get("/swaps",              intelCtrl.getSwaps);
router.get("/swaps/:id",          intelCtrl.getSwapById);
router.post("/swaps/:id/approve", intelCtrl.approveSwap);
router.post("/swaps/:id/reject",  intelCtrl.rejectSwap);

// Capacity & allocation simulator  
router.post("/capacity-simulator", async (req, res, next) => {
  try {
    const { runAllocationSimulation } = await import("../services/allocationSimulatorService");
    const { sendSuccess } = await import("../utils/apiResponse");
    const result = await runAllocationSimulation(req.body);
    sendSuccess(res, result, "Capacity simulation complete — no production data modified");
  } catch (err) { next(err); }
});

// Check-ins
router.get("/check-ins",          intelCtrl.getAllCheckIns);

export default router;
