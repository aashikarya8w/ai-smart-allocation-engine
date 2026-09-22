export type CompanyVerificationStatus =
  | "Pending"
  | "Verified"
  | "Rejected"
  | "Suspended";

export interface Company {
  id: string;
  userId: string;
  companyName: string;
  email: string;
  phone: string;
  logo?: string;
  website?: string;
  sector: string;
  description: string;
  state: string;
  city: string;
  address: string;
  employeeCount: string;
  establishedYear: number;

  verificationStatus: CompanyVerificationStatus;
  isActive: boolean;

  // Stats
  totalInternships: number;
  activeInternships: number;
  totalSeats: number;
  allocatedSeats: number;

  createdAt: string;
  updatedAt: string;
}
