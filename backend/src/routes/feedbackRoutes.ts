import { Router } from "express";
import * as ctrl from "../controllers/feedbackController";
import { authenticate, requireStudent, requireCompany } from "../middleware/authMiddleware";

const router = Router();

router.use(authenticate);

// Feedback (student → company)
router.post("/",                      requireStudent, ctrl.submitFeedback);
router.get( "/my",                    requireStudent, ctrl.getMyFeedback);
router.get( "/internship/:id",        ctrl.getInternshipFeedback);

// Evaluation (company → student)
router.post("/evaluations",                       requireCompany, ctrl.submitEvaluation);
router.get( "/evaluations/student/:id",           ctrl.getStudentEvaluations);
router.get( "/evaluations/internship/:id",        requireCompany, ctrl.getInternshipEvaluations);

export default router;
