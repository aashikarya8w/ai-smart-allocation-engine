import { Router } from "express";
import * as ctrl from "../controllers/assessmentController";
import { authenticate, requireStudent, requireCompany } from "../middleware/authMiddleware";

const router = Router();

router.use(authenticate);

// Company — create & manage
router.post("/",          requireCompany, ctrl.createAssessment);
router.put( "/:id",       requireCompany, ctrl.updateAssessment);
router.delete("/:id",     requireCompany, ctrl.deleteAssessment);

// Student — take assessment
router.post("/:id/start",  requireStudent, ctrl.startAssessment);
router.post("/:id/submit", requireStudent, ctrl.submitAssessment);

// Results
router.get("/:id/result",               requireStudent, ctrl.getAssessmentResult);
router.get("/student/my-results",       requireStudent, ctrl.getMyAssessmentResults);

// Get assessment (no correct answers)
router.get("/:id",         ctrl.getAssessmentById);

export default router;
