import { Router } from "express";
import * as ctrl from "../controllers/reportController";
import { authenticate, requireAdmin } from "../middleware/authMiddleware";

const router = Router();

router.use(authenticate, requireAdmin);

router.get( "/",               ctrl.getReports);
router.post("/generate",       ctrl.generateReport);
router.get( "/students",       ctrl.getStudentReport);
router.get( "/internships",    ctrl.getInternshipReport);
router.get( "/applications",   ctrl.getApplicationReport);
router.get( "/allocations",    ctrl.getAllocationReport);

export default router;
