import { Request, Response } from "express";
import { asyncHandler } from "../middleware/errorMiddleware";
import * as studentService from "../services/studentService";
import { sendSuccess, sendList } from "../utils/apiResponse";
import { getPagination, buildPaginationMeta } from "../utils/pagination";
import { Student } from "../models/Student";
import { AppError } from "../middleware/errorMiddleware";

export const getMyProfile = asyncHandler(async (req: Request, res: Response) => {
  const student = await studentService.getStudentByUserId(req.user!.userId);
  sendSuccess(res, student);
});

export const updateMyProfile = asyncHandler(async (req: Request, res: Response) => {
  const student = await studentService.updateStudentProfile(req.user!.userId, req.body);
  sendSuccess(res, student, "Profile updated successfully");
});

export const updateSkills = asyncHandler(async (req: Request, res: Response) => {
  const student = await studentService.updateSkills(req.user!.userId, req.body.skills);
  sendSuccess(res, student, "Skills updated");
});

export const updateEducation = asyncHandler(async (req: Request, res: Response) => {
  const student = await studentService.updateEducation(req.user!.userId, req.body.education);
  sendSuccess(res, student, "Education updated");
});

export const getDashboard = asyncHandler(async (req: Request, res: Response) => {
  const data = await studentService.getDashboard(req.user!.userId);
  sendSuccess(res, data);
});

export const getStudentById = asyncHandler(async (req: Request, res: Response) => {
  const student = await Student.findById(req.params.id).lean();
  if (!student) throw new AppError("Student not found", 404, "NOT_FOUND");
  sendSuccess(res, student);
});

// Admin: list all students
export const listStudents = asyncHandler(async (req: Request, res: Response) => {
  const { page, limit } = getPagination(req);
  const { search, status, branch } = req.query as Record<string, string>;
  const { data, total } = await studentService.getStudentsList({ page, limit, search, status, branch });
  sendList(res, data, buildPaginationMeta(page, limit, total));
});

// Admin: verify student
export const verifyStudent = asyncHandler(async (req: Request, res: Response) => {
  const { status } = req.body as { status: "Verified" | "Rejected" };
  const student = await Student.findByIdAndUpdate(
    req.params.id,
    { verificationStatus: status },
    { new: true }
  );
  if (!student) throw new AppError("Student not found", 404, "NOT_FOUND");
  sendSuccess(res, student, `Student ${status.toLowerCase()} successfully`);
});
