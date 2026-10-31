import { mockVerifications, mockCheckIns } from "@/data/verification";
import type { VerificationRecord, CheckIn, VerificationMethod } from "@/types/verification";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function getVerificationsForStudent(studentId: string): Promise<VerificationRecord[]> {
  await delay(300);
  return mockVerifications.filter((v) => v.studentId === studentId);
}

export async function getAllVerifications(): Promise<VerificationRecord[]> {
  await delay(400);
  return mockVerifications;
}

export async function verifyStudent(
  studentId: string,
  allocationId: string,
  method: VerificationMethod
): Promise<VerificationRecord> {
  await delay(1200);
  // Simulate 90% success rate
  const success = Math.random() > 0.1;
  return {
    id: `ver_${Date.now()}`,
    studentId,
    studentName: "Student",
    allocationId,
    internshipId: "",
    internshipTitle: "",
    companyId: "",
    companyName: "",
    method,
    status: success ? "Verified" : "Failed",
    verifiedAt: success ? new Date().toISOString() : undefined,
    notes: success ? `Verified via ${method}` : `${method} verification failed. Manual check required.`,
    createdAt: new Date().toISOString(),
  };
}

export async function getCheckInsForStudent(studentId: string): Promise<CheckIn[]> {
  await delay(300);
  return mockCheckIns.filter((c) => c.studentId === studentId);
}

export async function getAllCheckIns(): Promise<CheckIn[]> {
  await delay(400);
  return mockCheckIns;
}

export async function checkInStudent(
  studentId: string,
  allocationId: string,
  method: VerificationMethod
): Promise<CheckIn> {
  await delay(1000);
  const now  = new Date();
  return {
    id:                 `ci_${Date.now()}`,
    studentId,
    studentName:        "Student",
    allocationId,
    internshipId:       "",
    internshipTitle:    "",
    companyId:          "",
    companyName:        "",
    verificationMethod: method,
    status:             "CheckedIn",
    checkInDate:        now.toISOString().split("T")[0],
    checkInTime:        now.toTimeString().slice(0, 5),
    createdAt:          now.toISOString(),
  };
}
