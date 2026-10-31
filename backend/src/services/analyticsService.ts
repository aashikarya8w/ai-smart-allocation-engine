import { Student }     from "../models/Student";
import { Company }     from "../models/Company";
import { Internship }  from "../models/Internship";
import { Application } from "../models/Application";
import { Allocation }  from "../models/Allocation";

export async function getAdminAnalytics() {
  const [
    totalStudents, totalCompanies, totalInternships, totalApplications,
    verifiedStudents, verifiedCompanies, activeInternships,
    totalAllocations, approvedAllocations, pendingAllocations,
  ] = await Promise.all([
    Student.countDocuments(),
    Company.countDocuments(),
    Internship.countDocuments(),
    Application.countDocuments(),
    Student.countDocuments({ verificationStatus: "Verified" }),
    Company.countDocuments({ verificationStatus: "Verified" }),
    Internship.countDocuments({ status: "Active" }),
    Allocation.countDocuments(),
    Allocation.countDocuments({ status: "Approved" }),
    Allocation.countDocuments({ status: { $in: ["Pending", "Recommended"] } }),
  ]);

  const totalSeats = await Internship.aggregate([
    { $group: { _id: null, total: { $sum: "$totalSeats" }, available: { $sum: "$availableSeats" } } },
  ]);

  const seats        = totalSeats[0] ?? { total: 0, available: 0 };
  const allocationRate = seats.total > 0 ? Math.round((approvedAllocations / seats.total) * 100) : 0;
  const seatUtil       = seats.total > 0 ? Math.round(((seats.total - seats.available) / seats.total) * 100) : 0;

  // Application status distribution
  const appStatuses = await Application.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  // Allocation status distribution
  const allocStatuses = await Allocation.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  // Sector distribution
  const sectorDist = await Internship.aggregate([
    { $group: { _id: "$sector", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 10 },
  ]);

  // Applications over last 6 months
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  const appsOverTime = await Application.aggregate([
    { $match: { appliedAt: { $gte: sixMonthsAgo } } },
    { $group: {
        _id: { $dateToString: { format: "%Y-%m", date: "$appliedAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  return {
    summary: {
      totalStudents, totalCompanies, totalInternships, totalApplications,
      verifiedStudents, verifiedCompanies, activeInternships,
      totalAllocations, approvedAllocations, pendingAllocations,
      totalSeats: seats.total, availableSeats: seats.available,
      allocationRate, seatUtilization: seatUtil,
      pendingVerifications: (totalStudents - verifiedStudents) + (totalCompanies - verifiedCompanies),
    },
    applicationStatusData:  appStatuses.map(a => ({ name: a._id, value: a.count })),
    allocationStatusData:   allocStatuses.map(a => ({ name: a._id, value: a.count })),
    sectorDistribution:     sectorDist.map(s => ({ name: s._id, value: s.count })),
    applicationsOverTime:   appsOverTime.map(a => ({ date: a._id, value: a.count })),
  };
}

export async function getCompanyAnalytics(companyId: string) {
  const [internships, applications, allocations] = await Promise.all([
    Internship.find({ companyId }).lean(),
    Application.find({ companyId }).lean(),
    Allocation.find({ companyId }).lean(),
  ]);

  const statusDist = ["Applied","Shortlisted","Rejected","Waitlisted","Allocated","Withdrawn"].map(s => ({
    name: s, value: applications.filter(a => a.status === s).length,
  }));

  const internshipStats = internships.map(i => ({
    name:         i.title.slice(0, 20),
    Applications: i.totalApplications,
    Shortlisted:  i.shortlistedCount,
    Seats:        i.totalSeats,
  }));

  return {
    stats: {
      activeInternships: internships.filter(i => i.status === "Active").length,
      totalApplications: applications.length,
      shortlisted:       applications.filter(a => a.status === "Shortlisted").length,
      allocated:         allocations.filter(a => a.status === "Approved").length,
      totalSeats:        internships.reduce((s, i) => s + i.totalSeats, 0),
      availableSeats:    internships.reduce((s, i) => s + i.availableSeats, 0),
    },
    statusDistribution: statusDist,
    internshipStats,
  };
}
