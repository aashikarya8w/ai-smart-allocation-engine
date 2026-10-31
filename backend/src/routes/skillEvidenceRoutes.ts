import { Router } from "express";
import * as ctrl from "../controllers/skillEvidenceController";
import { authenticate, requireStudent } from "../middleware/authMiddleware";

const router = Router();
router.use(authenticate, requireStudent);

router.post("/",         ctrl.addEvidence);
router.get("/my",        ctrl.getMyEvidence);
router.get("/:id",       ctrl.getStudentEvidence);
router.put("/:id",       ctrl.updateEvidence);
router.delete("/:id",    ctrl.deleteEvidence);

export default router;
