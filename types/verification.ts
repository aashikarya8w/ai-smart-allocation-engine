export type VerificationMethod = "QR" | "RFID" | "Fingerprint" | "Face";
export type VerificationStatus = "Pending" | "Verified" | "Failed";
export type CheckInStatus = "Pending" | "CheckedIn" | "Failed";

export interface VerificationRecord {
  id: string;
  studentId: string;
  studentName: string;
  allocationId: string;
  internshipId: string;
  internshipTitle: string;
  companyId: string;
  companyName: string;
  method: VerificationMethod;
  status: VerificationStatus;
  verifiedAt?: string;
  notes?: string;
  createdAt: string;
}

export interface CheckIn {
  id: string;
  studentId: string;
  studentName: string;
  allocationId: string;
  internshipId: string;
  internshipTitle: string;
  companyId: string;
  companyName: string;
  verificationMethod: VerificationMethod;
  status: CheckInStatus;
  checkInDate: string;
  checkInTime: string;
  location?: string;
  verifiedBy?: string;
  createdAt: string;
}
