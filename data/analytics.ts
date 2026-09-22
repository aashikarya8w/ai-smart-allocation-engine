import type {
  AnalyticsSummary,
  TimeSeriesDataPoint,
  CategoryDataPoint,
  SectorData,
  StateData,
  ApplicationAnalytics,
  AllocationAnalytics,
} from "@/types/analytics";

export const mockAnalyticsSummary: AnalyticsSummary = {
  totalStudents: 10,
  totalCompanies: 10,
  totalInternships: 25,
  totalApplications: 25,
  totalSeats: 83,
  allocatedSeats: 10,
  pendingAllocations: 4,
  unallocatedStudents: 3,
  allocationRate: 40,
  averageMatchScore: 83.6,
  seatUtilization: 12,
};

export const mockApplicationsOverTime: TimeSeriesDataPoint[] = [
  { date: "Jan 2025", value: 0 },
  { date: "Feb 2025", value: 0 },
  { date: "Mar 2025", value: 0 },
  { date: "Apr 2025", value: 5 },
  { date: "May 2025", value: 18 },
  { date: "Jun 2025", value: 25 },
];

export const mockAllocationsOverTime: TimeSeriesDataPoint[] = [
  { date: "Jan 2025", value: 0 },
  { date: "Feb 2025", value: 0 },
  { date: "Mar 2025", value: 0 },
  { date: "Apr 2025", value: 0 },
  { date: "May 2025", value: 2 },
  { date: "Jun 2025", value: 10 },
];

export const mockStudentsRegisteredOverTime: TimeSeriesDataPoint[] = [
  { date: "Jan 2025", value: 3 },
  { date: "Feb 2025", value: 6 },
  { date: "Mar 2025", value: 10 },
  { date: "Apr 2025", value: 10 },
  { date: "May 2025", value: 10 },
  { date: "Jun 2025", value: 10 },
];

export const mockSectorDistribution: CategoryDataPoint[] = [
  { name: "Software Development",        value: 5 },
  { name: "Information Technology",      value: 3 },
  { name: "Data Science & Analytics",    value: 3 },
  { name: "Finance & Fintech",           value: 4 },
  { name: "Artificial Intelligence & ML",value: 3 },
  { name: "Cloud Computing",             value: 2 },
  { name: "Consulting",                  value: 2 },
  { name: "EdTech",                      value: 2 },
  { name: "Energy & CleanTech",          value: 2 },
  { name: "Other",                       value: 3 },
];

export const mockSkillDemand: CategoryDataPoint[] = [
  { name: "React",             value: 95 },
  { name: "Python",            value: 92 },
  { name: "Node.js",           value: 90 },
  { name: "Java",              value: 85 },
  { name: "TypeScript",        value: 88 },
  { name: "AWS",               value: 87 },
  { name: "Machine Learning",  value: 89 },
  { name: "Docker",            value: 84 },
  { name: "SQL",               value: 86 },
  { name: "Git",               value: 96 },
];

export const mockStateWiseStudents: StateData[] = [
  { state: "Maharashtra",   students: 2, internships: 5, allocations: 2 },
  { state: "Karnataka",     students: 1, internships: 8, allocations: 1 },
  { state: "Telangana",     students: 1, internships: 2, allocations: 0 },
  { state: "Gujarat",       students: 1, internships: 1, allocations: 1 },
  { state: "Kerala",        students: 1, internships: 0, allocations: 1 },
  { state: "Uttar Pradesh", students: 1, internships: 3, allocations: 0 },
  { state: "Rajasthan",     students: 1, internships: 0, allocations: 1 },
  { state: "Punjab",        students: 1, internships: 0, allocations: 0 },
  { state: "Madhya Pradesh",students: 1, internships: 0, allocations: 0 },
  { state: "Tamil Nadu",    students: 1, internships: 2, allocations: 1 },
];

export const mockSectorData: SectorData[] = [
  { sector: "Software Development",         internships: 5,  applications: 8,  allocations: 3 },
  { sector: "Information Technology",       internships: 3,  applications: 5,  allocations: 2 },
  { sector: "Data Science & Analytics",     internships: 3,  applications: 4,  allocations: 2 },
  { sector: "Finance & Fintech",            internships: 4,  applications: 6,  allocations: 1 },
  { sector: "Artificial Intelligence & ML", internships: 3,  applications: 4,  allocations: 1 },
  { sector: "Cloud Computing",              internships: 2,  applications: 3,  allocations: 1 },
  { sector: "Consulting",                   internships: 2,  applications: 3,  allocations: 0 },
  { sector: "EdTech",                       internships: 2,  applications: 2,  allocations: 0 },
  { sector: "Energy & CleanTech",           internships: 2,  applications: 2,  allocations: 1 },
];

export const mockApplicationAnalytics: ApplicationAnalytics = {
  total: 25,
  pending: 8,
  shortlisted: 9,
  rejected: 4,
  allocated: 5,
  withdrawn: 1,
  overTime: mockApplicationsOverTime,
};

export const mockAllocationAnalytics: AllocationAnalytics = {
  total: 10,
  recommended: 2,
  pending: 2,
  approved: 5,
  rejected: 1,
  allocationRate: 40,
  averageMatchScore: 85.2,
  seatUtilization: 12,
};

export const mockAllocationStatusData: CategoryDataPoint[] = [
  { name: "Approved",     value: 5 },
  { name: "Pending",      value: 2 },
  { name: "Recommended",  value: 2 },
  { name: "Rejected",     value: 1 },
];

export const mockApplicationStatusData: CategoryDataPoint[] = [
  { name: "Applied",      value: 8 },
  { name: "Shortlisted",  value: 9 },
  { name: "Allocated",    value: 5 },
  { name: "Rejected",     value: 4 },
  { name: "Withdrawn",    value: 1 },
  { name: "Waitlisted",   value: 2 },
];
