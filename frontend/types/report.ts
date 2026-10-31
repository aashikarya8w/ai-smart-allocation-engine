export type ReportType =
  | "students"
  | "internships"
  | "applications"
  | "allocations";

export type ReportFormat = "CSV" | "Excel" | "PDF";

export interface Report {
  id: string;
  type: ReportType;
  title: string;
  description: string;
  generatedBy: string;
  generatedAt: string;
  format: ReportFormat;
  fileUrl?: string;
  rowCount: number;
  filters?: Record<string, string | number | boolean>;
}
