import mongoose, { Document, Schema, Types } from "mongoose";

export interface IAllocation extends Document {
  studentId:       Types.ObjectId;
  internshipId:    Types.ObjectId;
  companyId:       Types.ObjectId;
  studentName:     string;
  internshipTitle: string;
  companyName:     string;
  location:        string;
  workMode:        string;
  startDate:       Date;
  endDate:         Date;
  stipend:         number;
  matchScore:      number;
  scoreBreakdown: {
    skillMatch:    number;
    qualification: number;
    location:      number;
    interest:      number;
    experience:    number;
  };
  allocationRank:   number;
  selectionReasons: string[];
  status:           "Pending" | "Recommended" | "Approved" | "Rejected" | "Cancelled";
  allocationCycle:  string;  // e.g. "2025-07"
  approvedBy?:      Types.ObjectId;
  reviewedBy?:      string;
  approvedAt?:      Date;
  reviewedAt?:      Date;
  reviewNotes?:     string;
  createdAt:        Date;
  updatedAt:        Date;
}

const AllocationSchema = new Schema<IAllocation>(
  {
    studentId:       { type: Schema.Types.ObjectId, ref: "Student",    required: true },
    internshipId:    { type: Schema.Types.ObjectId, ref: "Internship", required: true },
    companyId:       { type: Schema.Types.ObjectId, ref: "Company",    required: true },
    studentName:     { type: String, required: true },
    internshipTitle: { type: String, required: true },
    companyName:     { type: String, required: true },
    location:        { type: String, required: true },
    workMode:        { type: String, required: true },
    startDate:       { type: Date, required: true },
    endDate:         { type: Date, required: true },
    stipend:         { type: Number, required: true },
    matchScore:      { type: Number, required: true, min: 0, max: 100 },
    scoreBreakdown: {
      skillMatch:    { type: Number, default: 0 },
      qualification: { type: Number, default: 0 },
      location:      { type: Number, default: 0 },
      interest:      { type: Number, default: 0 },
      experience:    { type: Number, default: 0 },
    },
    allocationRank:   { type: Number, required: true },
    selectionReasons: [{ type: String }],
    status:           { type: String, enum: ["Pending","Recommended","Approved","Rejected","Cancelled"], default: "Pending" },
    allocationCycle:  { type: String, required: true },
    approvedBy:       { type: Schema.Types.ObjectId, ref: "User" },
    reviewedBy:       { type: String },
    approvedAt:       { type: Date },
    reviewedAt:       { type: Date },
    reviewNotes:      { type: String },
  },
  { timestamps: true }
);

// One student per internship per cycle
AllocationSchema.index({ studentId: 1, internshipId: 1, allocationCycle: 1 }, { unique: true });
AllocationSchema.index({ studentId:    1 });
AllocationSchema.index({ internshipId: 1 });
AllocationSchema.index({ status:       1 });
AllocationSchema.index({ allocationCycle: 1 });

export const Allocation = mongoose.model<IAllocation>("Allocation", AllocationSchema);
