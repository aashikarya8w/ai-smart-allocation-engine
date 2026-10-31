import { Router } from "express";
import * as ctrl        from "../controllers/companyController";
import * as analyticsCtrl from "../controllers/analyticsController";
import { authenticate, requireCompany } from "../middleware/authMiddleware";

const router = Router();
router.use(authenticate);

router.get("/profile",   requireCompany, ctrl.getMyProfile);
router.put("/profile",   requireCompany, ctrl.updateMyProfile);
router.get("/dashboard", requireCompany, ctrl.getDashboard);
router.get("/analytics", requireCompany, analyticsCtrl.getCompanyAnalytics);
router.get("/:id",       ctrl.getCompanyById);

export default router;
