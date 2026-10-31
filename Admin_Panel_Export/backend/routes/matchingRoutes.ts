import { Router } from "express";
import * as ctrl from "../controllers/matchingController";
import { authenticate, requireStudent, requireAdmin } from "../middleware/authMiddleware";

const router = Router();

router.use(authenticate);

// Student
router.get( "/recommendations",           requireStudent, ctrl.getMyRecommendations);
router.post("/recommendations/generate",  requireStudent, ctrl.generateMyRecommendations);

// Admin
router.post("/run",           requireAdmin, ctrl.runAIMatching);
router.get( "/results",       requireAdmin, ctrl.getMatchingResults);

// Score specific pair
router.get( "/score/:studentId/:internshipId", ctrl.scoreStudentForInternship);

export default router;
