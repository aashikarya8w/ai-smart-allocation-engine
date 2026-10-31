import { Router } from "express";
import * as ctrl from "../controllers/allocationController";
import { authenticate, requireAdmin, requireStudent, requireCompany } from "../middleware/authMiddleware";

const router = Router();

router.use(authenticate);

// Admin
router.post("/run",           requireAdmin, ctrl.runAllocation);
router.get( "/",              requireAdmin, ctrl.getAllocations);
router.get( "/:id",           requireAdmin, ctrl.getAllocationById);
router.post("/:id/approve",   requireAdmin, ctrl.approveAllocation);
router.post("/:id/reject",    requireAdmin, ctrl.rejectAllocation);

// Student
router.get( "/student/my",    requireStudent, ctrl.getMyAllocation);

// Company
router.get( "/company/my",    requireCompany, ctrl.getCompanyAllocations);

export default router;
