import { Router } from "express";
import * as ctrl from "../controllers/applicationController";
import { authenticate, requireStudent, requireCompany, requireAdmin } from "../middleware/authMiddleware";
import { validate } from "../middleware/validationMiddleware";
import { createApplicationSchema, updateStatusSchema } from "../validators/applicationValidator";

const router = Router();

router.use(authenticate);

// Student
router.post("/",              requireStudent, validate(createApplicationSchema), ctrl.applyForInternship);
router.get( "/my",            requireStudent, ctrl.getMyApplications);
router.put( "/:id/withdraw",  requireStudent, ctrl.withdrawApplication);

// Company
router.get( "/company",                  requireCompany, ctrl.getCompanyApplications);
router.put( "/:id/status",               requireCompany, validate(updateStatusSchema), ctrl.updateApplicationStatus);

// Admin
router.get( "/",              requireAdmin, ctrl.listApplications);
router.get( "/:id",           ctrl.getApplicationById);

export default router;
