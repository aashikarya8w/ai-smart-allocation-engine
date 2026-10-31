import { Router } from "express";
import * as ctrl from "../controllers/auditLogController";
import { authenticate, requireAdmin } from "../middleware/authMiddleware";

const router = Router();

router.use(authenticate, requireAdmin);

router.get("/",     ctrl.getAuditLogs);
router.get("/:id",  ctrl.getAuditLogById);

export default router;
