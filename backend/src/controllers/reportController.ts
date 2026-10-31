import { Request, Response } from "express";
import { asyncHandler } from "../middleware/errorMiddleware";
import { Report }      from "../models/Report";
import { Student }     from "../models/Student";
import { Company }     from "../models/Company";
import { Internship }  from "../models/Internship";
import { Application } from "../models/Application";
import { Allocation }  from "../models/Allocation";
import { sendSuccess, sendCreated } from "../utils/apiResponse";

async function buildAndSave(
  type: string, title: string, description: string,
  adminId: string, adminName: string, data: unknown[], format: string
) {
  const report = await Report.create({
    type, title, description,
    generatedBy: adminId, generatedByName: adminName,
    format, rowCount: (data as unknown[]).length,
  });
  return { report, data };
}

export const getReports = asyncHandler(async (req: Request, res: Response) => {
  const reports = await Report.find().sort({ createdAt: -1 }).limit(50).lean();
  sendSuccess(res, reports);
});

export const getStudentReport = asyncHandler(async (req: Request, res: Response) => {
  const students = await Student.find().lean();
  const { report } = await buildAndSave(
    "students", "Student Report", "All registered students",
    req.user!.userId, req.user!.name, students, "JSON"
  );
  sendSuccess(res, { report, count: students.length, data: students });
});

export const getInternshipReport = asyncHandler(async (req: Request, res: Response) => {
  const internships = await Internship.find().lean();
  const { report } = await buildAndSave(
    "internships", "Internship Report", "All internships",
    req.user!.userId, req.user!.name, internships, "JSON"
  );
  sendSuccess(res, { report, count: internships.length, data: internships });
});

export const getApplicationReport = asyncHandler(async (req: Request, res: Response) => {
  const applications = await Application.find().sort({ appliedAt: -1 }).lean();
  const { report } = await buildAndSave(
    "applications", "Application Report", "All applications",
    req.user!.userId, req.user!.name, applications, "JSON"
  );
  sendSuccess(res, { report, count: applications.length, data: applications });
});

export const getAllocationReport = asyncHandler(async (req: Request, res: Response) => {
  const allocations = await Allocation.find().sort({ createdAt: -1 }).lean();
  const { report } = await buildAndSave(
    "allocations", "Allocation Report", "All allocations",
    req.user!.userId, req.user!.name, allocations, "JSON"
  );
  sendSuccess(res, { report, count: allocations.length, data: allocations });
});

export const generateReport = asyncHandler(async (req: Request, res: Response) => {
  const { type, format = "JSON" } = req.body;
  const dataMap: Record<string, () => Promise<unknown[]>> = {
    students:     () => Student.find().lean(),
    companies:    () => Company.find().lean(),
    internships:  () => Internship.find().lean(),
    applications: () => Application.find().lean(),
    allocations:  () => Allocation.find().lean(),
  };
  const fetcher = dataMap[type];
  if (!fetcher) {
    sendSuccess(res, null, "Unknown report type");
    return;
  }
  const data = await fetcher();
  const title = `${type.charAt(0).toUpperCase() + type.slice(1)} Report – ${new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" })}`;
  const { report } = await buildAndSave(type, title, `Auto-generated ${type} report.`, req.user!.userId, req.user!.name, data, format);

  // CSV export — convert first-level keys to CSV
  if (format === "CSV") {
    if (data.length === 0) { sendSuccess(res, { report, csv: "" }); return; }
    const keys = Object.keys(data[0] as Record<string, unknown>).filter(k => !["__v"].includes(k));
    const header = keys.join(",");
    const rows   = (data as Record<string, unknown>[]).map(row =>
      keys.map(k => {
        const val = row[k];
        const str = val === null || val === undefined ? "" : String(val).replace(/"/g, '""');
        return str.includes(",") ? `"${str}"` : str;
      }).join(",")
    );
    const csv = [header, ...rows].join("\n");
    sendCreated(res, { report, count: data.length, csv }, "Report generated");
    return;
  }

  sendCreated(res, { report, count: data.length }, "Report generated");
});
