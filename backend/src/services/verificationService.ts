import crypto           from "crypto";
import { Student }      from "../models/Student";
import { Allocation }   from "../models/Allocation";
import { AppError }     from "../middleware/errorMiddleware";

// In-memory QR store for dev (replace with Redis/DB in production)
const qrStore = new Map<string, { studentId: string; allocationId: string; expiresAt: Date }>();

export async function generateQR(studentUserId: string) {
  const student    = await Student.findOne({ userId: studentUserId }).lean();
  if (!student) throw new AppError("Student not found", 404, "NOT_FOUND");

  const allocation = await Allocation.findOne({ studentId: student._id, status: "Approved" }).lean();
  if (!allocation) throw new AppError("No approved allocation found", 404, "NOT_FOUND");

  const token    = crypto.randomBytes(32).toString("hex");
  const expiresAt= new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

  qrStore.set(token, {
    studentId:    String(student._id),
    allocationId: String(allocation._id),
    expiresAt,
  });

  return {
    token,
    qrData:      `SIH25033:${token}`,
    studentName: student.fullName,
    internship:  allocation.internshipTitle,
    company:     allocation.companyName,
    expiresAt,
    status:      "PENDING",
    method:      "QR",
  };
}

export async function verifyQR(token: string) {
  const entry = qrStore.get(token);
  if (!entry) {
    return { verified: false, status: "FAILED", message: "Invalid or expired QR code" };
  }
  if (entry.expiresAt < new Date()) {
    qrStore.delete(token);
    return { verified: false, status: "EXPIRED", message: "QR code has expired" };
  }

  const student    = await Student.findById(entry.studentId).lean();
  const allocation = await Allocation.findById(entry.allocationId).lean();

  qrStore.delete(token); // Single use

  return {
    verified:     true,
    status:       "VERIFIED",
    studentId:    entry.studentId,
    allocationId: entry.allocationId,
    studentName:  student?.fullName ?? "Unknown",
    internship:   allocation?.internshipTitle ?? "Unknown",
    message:      "Verification successful",
  };
}

export async function simulateHardwareVerification(
  method: "RFID" | "FINGERPRINT" | "FACE",
  studentId: string
) {
  // Simulated hardware verification — returns success in dev mode
  const student = await Student.findOne({ userId: studentId }).lean();
  if (!student) throw new AppError("Student not found", 404, "NOT_FOUND");

  return {
    verified:   true,
    method,
    status:     "VERIFIED",
    studentId:  String(student._id),
    studentName:student.fullName,
    message:    `${method} verification simulated successfully`,
    timestamp:  new Date(),
    note:       "Hardware integration simulated — not a real biometric check",
  };
}
