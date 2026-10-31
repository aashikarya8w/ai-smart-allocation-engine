import { Company }     from "../models/Company";
import { Internship }  from "../models/Internship";
import { Application } from "../models/Application";
import { Allocation }  from "../models/Allocation";
import { AppError }    from "../middleware/errorMiddleware";

export async function getCompanyByUserId(userId: string) {
  const c = await Company.findOne({ userId }).lean();
  if (!c) throw new AppError("Company profile not found", 404, "NOT_FOUND");
  return c;
}

export async function updateCompanyProfile(userId: string, data: Record<string, unknown>) {
  const c = await Company.findOneAndUpdate({ userId }, { $set: data }, { new: true });
  if (!c) throw new AppError("Company not found", 404, "NOT_FOUND");
  return c;
}

export async function getCompanyDashboard(userId: string) {
  const company = await Company.findOne({ userId }).lean();
  if (!company) throw new AppError("Company not found", 404, "NOT_FOUND");

  const [internships, applications, allocations] = await Promise.all([
    Internship.find({ companyId: company._id }).sort({ createdAt: -1 }).limit(5).lean(),
    Application.find({ companyId: company._id }).sort({ appliedAt: -1 }).limit(10).lean(),
    Allocation.find({ companyId: company._id }).lean(),
  ]);

  const active = internships.filter((i) => i.status === "Active");
  const totalSeats = active.reduce((s, i) => s + i.totalSeats, 0);
  const availableSeats = active.reduce((s, i) => s + i.availableSeats, 0);

  return {
    company,
    stats: {
      activeInternships:  active.length,
      totalApplications:  applications.length,
      shortlistedCount:   applications.filter((a) => a.status === "Shortlisted").length,
      allocatedCount:     allocations.filter((a) => a.status === "Approved").length,
      totalSeats,
      availableSeats,
    },
    recentInternships:  internships,
    recentApplications: applications,
    allocations,
  };
}

export async function getCompaniesList(filters: {
  page: number; limit: number; search?: string; status?: string; industry?: string;
}) {
  const { page, limit, search, status, industry } = filters;
  const query: Record<string, unknown> = {};
  if (status)   query.verificationStatus = status;
  if (industry) query.industry = { $regex: industry, $options: "i" };
  if (search)   query.$or = [
    { companyName: { $regex: search, $options: "i" } },
    { email:       { $regex: search, $options: "i" } },
  ];
  const skip  = (page - 1) * limit;
  const total = await Company.countDocuments(query);
  const data  = await Company.find(query).skip(skip).limit(limit).lean();
  return { data, total };
}
