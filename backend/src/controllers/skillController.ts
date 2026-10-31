import { Request, Response } from "express";
import { asyncHandler, AppError } from "../middleware/errorMiddleware";
import { Skill }  from "../models/Skill";
import { Sector } from "../models/Sector";
import { Location } from "../models/Location";
import { sendSuccess, sendCreated } from "../utils/apiResponse";

/* ── Skills ─────────────────────────────────────────────── */
export const getSkills = asyncHandler(async (req: Request, res: Response) => {
  const { category, search } = req.query as Record<string, string>;
  const query: Record<string, unknown> = { isActive: true };
  if (category) query.category = category;
  if (search)   query.name = { $regex: search, $options: "i" };
  const skills = await Skill.find(query).sort({ name: 1 }).lean();
  sendSuccess(res, skills);
});

export const createSkill = asyncHandler(async (req: Request, res: Response) => {
  const skill = await Skill.create(req.body);
  sendCreated(res, skill, "Skill created");
});

export const updateSkill = asyncHandler(async (req: Request, res: Response) => {
  const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!skill) throw new AppError("Skill not found", 404, "NOT_FOUND");
  sendSuccess(res, skill, "Skill updated");
});

export const deleteSkill = asyncHandler(async (req: Request, res: Response) => {
  await Skill.findByIdAndUpdate(req.params.id, { isActive: false });
  sendSuccess(res, null, "Skill deactivated");
});

/* ── Sectors ─────────────────────────────────────────────── */
export const getSectors = asyncHandler(async (_req: Request, res: Response) => {
  const sectors = await Sector.find({ isActive: true }).sort({ name: 1 }).lean();
  sendSuccess(res, sectors);
});

export const createSector = asyncHandler(async (req: Request, res: Response) => {
  const sector = await Sector.create(req.body);
  sendCreated(res, sector, "Sector created");
});

export const updateSector = asyncHandler(async (req: Request, res: Response) => {
  const sector = await Sector.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!sector) throw new AppError("Sector not found", 404, "NOT_FOUND");
  sendSuccess(res, sector, "Sector updated");
});

export const deleteSector = asyncHandler(async (req: Request, res: Response) => {
  await Sector.findByIdAndUpdate(req.params.id, { isActive: false });
  sendSuccess(res, null, "Sector deactivated");
});

/* ── Locations ───────────────────────────────────────────── */
export const getLocations = asyncHandler(async (req: Request, res: Response) => {
  const { state } = req.query as { state?: string };
  const query: Record<string, unknown> = { isActive: true };
  if (state) query.state = { $regex: state, $options: "i" };
  const locations = await Location.find(query).sort({ state: 1, city: 1 }).lean();
  sendSuccess(res, locations);
});

export const getStates = asyncHandler(async (_req: Request, res: Response) => {
  const states = await Location.distinct("state", { isActive: true });
  sendSuccess(res, states.sort());
});

export const getCities = asyncHandler(async (req: Request, res: Response) => {
  const { state } = req.query as { state?: string };
  const query: Record<string, unknown> = { isActive: true };
  if (state) query.state = { $regex: state, $options: "i" };
  const cities = await Location.distinct("city", query);
  sendSuccess(res, cities.sort());
});
