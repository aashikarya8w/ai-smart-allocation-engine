export interface AnalyticsSummary {
  totalStudents: number;
  totalCompanies: number;
  totalInternships: number;
  totalApplications: number;
  totalSeats: number;
  allocatedSeats: number;
  pendingAllocations: number;
  unallocatedStudents: number;
  allocationRate: number;
  averageMatchScore: number;
  seatUtilization: number;
}

export interface TimeSeriesDataPoint {
  date: string;
  value: number;
}

export interface CategoryDataPoint {
  name: string;
  value: number;
}

export interface SectorData {
  sector: string;
  internships: number;
  applications: number;
  allocations: number;
}

export interface StateData {
  state: string;
  students: number;
  internships: number;
  allocations: number;
}

export interface ApplicationAnalytics {
  total: number;
  pending: number;
  shortlisted: number;
  rejected: number;
  allocated: number;
  withdrawn: number;
  overTime: TimeSeriesDataPoint[];
}

export interface AllocationAnalytics {
  total: number;
  recommended: number;
  pending: number;
  approved: number;
  rejected: number;
  allocationRate: number;
  averageMatchScore: number;
  seatUtilization: number;
}
