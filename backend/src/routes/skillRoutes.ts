import { Router } from "express";
import * as ctrl from "../controllers/skillController";
import { authenticate, requireAdmin } from "../middleware/authMiddleware";

const router = Router();

// Public
router.get("/skills",           ctrl.getSkills);
router.get("/sectors",          ctrl.getSectors);
router.get("/locations",        ctrl.getLocations);
router.get("/locations/states", ctrl.getStates);
router.get("/locations/cities", ctrl.getCities);

// Admin
router.post(  "/skills",         authenticate, requireAdmin, ctrl.createSkill);
router.put(   "/skills/:id",     authenticate, requireAdmin, ctrl.updateSkill);
router.delete("/skills/:id",     authenticate, requireAdmin, ctrl.deleteSkill);

router.post(  "/sectors",        authenticate, requireAdmin, ctrl.createSector);
router.put(   "/sectors/:id",    authenticate, requireAdmin, ctrl.updateSector);
router.delete("/sectors/:id",    authenticate, requireAdmin, ctrl.deleteSector);

export default router;
