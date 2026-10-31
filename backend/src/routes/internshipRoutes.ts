import { Router } from "express";
import * as ctrl from "../controllers/internshipController";
import { authenticate, requireCompany, requireAdmin } from "../middleware/authMiddleware";
import { validate } from "../middleware/validationMiddleware";
import { createInternshipSchema, updateInternshipSchema } from "../validators/internshipValidator";

const router = Router();

// Public — browse active internships
router.get("/",     ctrl.getInternships);
router.get("/:id",  ctrl.getInternshipById);

// Company — manage own internships
router.post(   "/",           authenticate, requireCompany, validate(createInternshipSchema), ctrl.createInternship);
router.put(    "/:id",        authenticate, requireCompany, validate(updateInternshipSchema), ctrl.updateInternship);
router.delete( "/:id",        authenticate, requireCompany, ctrl.deleteInternship);
router.get(    "/my/list",    authenticate, requireCompany, ctrl.getMyInternships);

// Admin — approval workflow
router.get(  "/admin/pending",      authenticate, requireAdmin, ctrl.getPendingInternships);
router.put(  "/:id/approve",        authenticate, requireAdmin, ctrl.approveInternship);
router.put(  "/:id/reject",         authenticate, requireAdmin, ctrl.rejectInternship);

export default router;
