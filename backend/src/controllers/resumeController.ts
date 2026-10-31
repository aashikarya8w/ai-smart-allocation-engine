import { Request, Response } from "express";
import { asyncHandler, AppError } from "../middleware/errorMiddleware";
import * as resumeService from "../services/resumeService";
import { sendSuccess, sendCreated } from "../utils/apiResponse";

export const uploadResume = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) throw new AppError("No file uploaded", 400, "NO_FILE");
  const resume = await resumeService.uploadResume(req.user!.userId, req.file);
  sendCreated(res, resume, "Resume uploaded successfully");
});

export const getMyResumes = asyncHandler(async (req: Request, res: Response) => {
  const resumes = await resumeService.getMyResumes(req.user!.userId);
  sendSuccess(res, resumes);
});

export const deleteResume = asyncHandler(async (req: Request, res: Response) => {
  await resumeService.deleteResume(req.user!.userId, req.params.id);
  sendSuccess(res, null, "Resume deleted");
});
