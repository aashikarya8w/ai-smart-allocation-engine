import { Router } from "express";
import * as ctrl from "../controllers/ruleController";
import { authenticate, requireAdmin } from "../middleware/authMiddleware";
import { validate } from "../middleware/validationMiddleware";
import { updateWeightsSchema, updateEligibilitySchema } from "../validators/ruleValidator";

const router = Router();

// Public read
router.get("/",              ctrl.getRules);
router.get("/matching",      ctrl.getMatchingRules);
router.get("/allocation",    ctrl.getAllocationRules);
router.get("/eligibility",   ctrl.getEligibilityRules);

// Admin update
router.put("/matching",    authenticate, requireAdmin, validate(updateWeightsSchema),     ctrl.updateMatchingRules);
router.put("/allocation",  authenticate, requireAdmin,                                     ctrl.updateAllocationRules);
router.put("/eligibility", authenticate, requireAdmin, validate(updateEligibilitySchema),  ctrl.updateEligibilityRules);

export default router;
