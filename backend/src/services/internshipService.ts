import mongoose from "mongoose";
import { Internship }  from "../models/Internship";
import { Company }     from "../models/Company";
import { AppError }    from "../middleware/errorMiddleware";

export async function createInternship(companyUserId: string, data: Record<string, unknown>) {
  const company = await Company.findOne({ userId: companyUserId });
  if (!company) throw new AppError("Company profile not found", 404, "NOT_FOUND");
  if (company.verificationStatus !== "Verified") {
    throw new AppError("Company must be verified to post internships", 403, "NOT_VERIFIED");
  }
  const internship = await Internship.create({
    ...data,
    companyId:      company._id,
    companyName:    company.companyName,
    availableSeats: data.totalSeats,
    status:         "Pending",
    isPublished:    false,
  });
  return internship;
}

export async function updateInternship(
  companyUserId: string,
  internshipId: string,
  data: Record<string, unknown>
) {
  const company = await Company.findOne({ userId: companyUserId });
  if (!company) throw new AppError("Company not found", 404, "NOT_FOUND");

  const internship = await Internship.findOne({ _id: internshipId, companyId: company._id });
  if (!internship) throw new AppError("Internship not found or access denied", 404, "NOT_FOUND");
  if (internship.status === "Active" || internship.status === "Closed") {
    throw new AppError("Cannot edit active or closed internship", 400, "INVALID_STATUS");
  }
  Object.assign(internship, data);
  return internship.save();
}

export async function deleteInternship(companyUserId: string, internshipId: string) {
  const company = await Company.findOne({ userId: companyUserId });
  if (!company) throw new AppError("Company not found", 404, "NOT_FOUND");
  const internship = await Internship.findOne({ _id: internshipId, companyId: company._id });
  if (!internship) throw new AppError("Internship not found", 404, "NOT_FOUND");
  if (internship.status === "Active") {
    throw new AppError("Cannot delete an active internship", 400, "INVALID_STATUS");
  }
  await internship.deleteOne();
}

export async function getInternships(filters: {
  page: number; limit: number; search?: string; sector?: string;
  city?: string; workMode?: string; duration?: string; status?: string;
  companyId?: string;
}) {
  const { page, limit, search, sector, city, workMode, duration, status, companyId } = filters;
  const query: Record<string, unknown> = {};

  if (!status && !companyId) query.status = "Active";
  else if (status) query.status = status;
  if (companyId) query.companyId = new mongoose.Types.ObjectId(companyId);
  if (sector)   query.sector   = { $regex: sector,   $options: "i" };
  if (city)     query.city     = { $regex: city,     $options: "i" };
  if (workMode) query.workMode = workMode;
  if (duration) query.duration = duration;
  if (search) {
    query.$or = [
      { title:       { $regex: search, $options: "i" } },
      { companyName: { $regex: search, $options: "i" } },
      { sector:      { $regex: search, $options: "i" } },
    ];
  }

  const skip  = (page - 1) * limit;
  const total = await Internship.countDocuments(query);
  const data  = await Internship.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();
  return { data, total };
}

export async function approveInternship(internshipId: string, adminUserId: string) {
  const i = await Internship.findById(internshipId);
  if (!i) throw new AppError("Internship not found", 404, "NOT_FOUND");
  i.status      = "Active";
  i.isPublished = true;
  i.approvedBy  = new mongoose.Types.ObjectId(adminUserId);
  i.approvedAt  = new Date();
  return i.save();
}

export async function rejectInternship(internshipId: string, reason: string) {
  const i = await Internship.findById(internshipId);
  if (!i) throw new AppError("Internship not found", 404, "NOT_FOUND");
  i.status          = "Rejected";
  i.rejectionReason = reason;
  return i.save();
}
