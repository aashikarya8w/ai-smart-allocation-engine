import { CheckIn }   from "../models/CheckIn";
import { Student }   from "../models/Student";
import { Allocation }from "../models/Allocation";
import { Company }   from "../models/Company";
import { AppError }  from "../middleware/errorMiddleware";

export async function checkIn(params: {
  studentUserId: string;
  method: "QR" | "RFID" | "FINGERPRINT" | "FACE" | "MANUAL";
  token?: string;
}) {
  const student    = await Student.findOne({ userId: params.studentUserId });
  if (!student) throw new AppError("Student not found", 404, "NOT_FOUND");

  const allocation = await Allocation.findOne({ studentId: student._id, status: "Approved" }).lean();
  if (!allocation) throw new AppError("No approved allocation found", 404, "NOT_FOUND");

  const today = new Date().toISOString().slice(0, 10);

  // Prevent duplicate check-in on same day
  const existing = await CheckIn.findOne({ studentId: student._id, date: today, checkOutTime: null });
  if (existing) throw new AppError("Already checked in today", 409, "DUPLICATE");

  const record = await CheckIn.create({
    studentId:    student._id,
    companyId:    allocation.companyId,
    internshipId: allocation.internshipId,
    allocationId: allocation._id,
    method:       params.method,
    verified:     true,
    checkInTime:  new Date(),
    date:         today,
    status:       "Checked In",
  });

  return record;
}

export async function checkOut(studentUserId: string) {
  const student = await Student.findOne({ userId: studentUserId }).lean();
  if (!student) throw new AppError("Student not found", 404, "NOT_FOUND");

  const today  = new Date().toISOString().slice(0, 10);
  const record = await CheckIn.findOne({ studentId: student._id, date: today, status: "Checked In" });
  if (!record) throw new AppError("No active check-in found", 404, "NOT_FOUND");

  record.checkOutTime = new Date();
  record.status       = "Checked Out";
  return record.save();
}

export async function getStudentCheckIns(studentUserId: string) {
  const student = await Student.findOne({ userId: studentUserId }).lean();
  if (!student) throw new AppError("Student not found", 404, "NOT_FOUND");
  return CheckIn.find({ studentId: student._id }).sort({ checkInTime: -1 }).lean();
}

export async function getCompanyCheckIns(companyUserId: string) {
  const company = await Company.findOne({ userId: companyUserId }).lean();
  if (!company) throw new AppError("Company not found", 404, "NOT_FOUND");
  return CheckIn.find({ companyId: company._id }).sort({ checkInTime: -1 }).lean();
}

export async function getAllCheckIns(filters: { page: number; limit: number; date?: string }) {
  const { page, limit, date } = filters;
  const query: Record<string, unknown> = {};
  if (date) query.date = date;
  const skip  = (page - 1) * limit;
  const total = await CheckIn.countDocuments(query);
  const data  = await CheckIn.find(query).sort({ checkInTime: -1 }).skip(skip).limit(limit).lean();
  return { data, total };
}
