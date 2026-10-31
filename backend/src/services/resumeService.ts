import path from "path";
import fs   from "fs";
import { Resume }  from "../models/Resume";
import { Student } from "../models/Student";
import { AppError } from "../middleware/errorMiddleware";

export async function uploadResume(
  studentUserId: string,
  file: Express.Multer.File
) {
  const student = await Student.findOne({ userId: studentUserId });
  if (!student) throw new AppError("Student profile not found", 404, "NOT_FOUND");

  // Mark previous resumes inactive
  await Resume.updateMany({ studentId: student._id }, { isActive: false });

  const resume = await Resume.create({
    studentId:  student._id,
    userId:     studentUserId,
    fileName:   file.originalname,
    filePath:   file.path,
    fileSize:   file.size,
    mimeType:   file.mimetype,
    isActive:   true,
    uploadedAt: new Date(),
  });

  // Update student resumeUrl
  student.resumeUrl = `/uploads/resumes/${path.basename(file.path)}`;
  await student.save();

  return resume;
}

export async function getMyResumes(studentUserId: string) {
  const student = await Student.findOne({ userId: studentUserId }).lean();
  if (!student) throw new AppError("Profile not found", 404, "NOT_FOUND");
  return Resume.find({ studentId: student._id }).sort({ uploadedAt: -1 }).lean();
}

export async function deleteResume(studentUserId: string, resumeId: string) {
  const student = await Student.findOne({ userId: studentUserId }).lean();
  if (!student) throw new AppError("Profile not found", 404, "NOT_FOUND");

  const resume = await Resume.findOne({ _id: resumeId, studentId: student._id });
  if (!resume) throw new AppError("Resume not found", 404, "NOT_FOUND");

  // Remove file from disk
  if (fs.existsSync(resume.filePath)) fs.unlinkSync(resume.filePath);
  await resume.deleteOne();
}
