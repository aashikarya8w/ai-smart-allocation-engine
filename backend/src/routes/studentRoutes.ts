import { Router } from "express";
import * as ctrl          from "../controllers/studentController";
import * as analyticsCtrl from "../controllers/analyticsController";
import { authenticate, requireStudent } from "../middleware/authMiddleware";
import { validate } from "../middleware/validationMiddleware";
import { updateProfileSchema, updateSkillsSchema, updateEducationSchema } from "../validators/studentValidator";

const router = Router();
router.use(authenticate);

router.get("/profile",    requireStudent, ctrl.getMyProfile);
router.put("/profile",    requireStudent, validate(updateProfileSchema), ctrl.updateMyProfile);
router.put("/skills",     requireStudent, validate(updateSkillsSchema),  ctrl.updateSkills);
router.put("/education",  requireStudent, validate(updateEducationSchema), ctrl.updateEducation);
router.get("/dashboard",  requireStudent, ctrl.getDashboard);
router.get("/analytics",  requireStudent, analyticsCtrl.getStudentAnalytics);
router.get("/:id",        ctrl.getStudentById);

export default router;
