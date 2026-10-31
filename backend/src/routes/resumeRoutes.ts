import { Router } from "express";
import * as ctrl from "../controllers/resumeController";
import { authenticate, requireStudent } from "../middleware/authMiddleware";
import { uploadResume } from "../middleware/uploadMiddleware";

const router = Router();

router.use(authenticate, requireStudent);

router.post("/upload",   uploadResume, ctrl.uploadResume);
router.get( "/",                       ctrl.getMyResumes);
router.delete("/:id",                  ctrl.deleteResume);

export default router;
