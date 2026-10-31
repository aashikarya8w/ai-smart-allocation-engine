import mongoose, { Document, Schema, Types } from "mongoose";

export interface IInternship extends Document {
  companyId:           Types.ObjectId;
  companyName:         string;
  title:               string;
  description:         string;
  sector:              string;
  requiredSkills:      string[];
  qualification:       string;
  eligibleBranches:    string[];
  minimumCGPA:         number;
  state:               string;
  city:                string;
  workMode:            "Remote" | "Hybrid" | "On-site";
  duration:            string;
  stipendMin:          number;
  stipendMax:          number;
  totalSeats:          number;
  availableSeats:      number;
  startDate:           Date;
  endDate:             Date;
  applicationDeadline: Date;
  status:              "Draft" | "Pending" | "Approved" | "Rejected" | "Active" | "Closed";
  isPublished:         boolean;
  rejectionReason?:    string;
  approvedBy?:         Types.ObjectId;
  approvedAt?:         Date;
  totalApplications:   number;
  shortlistedCount:    number;
  createdAt:           Date;
  updatedAt:           Date;
}

const InternshipSchema = new Schema<IInternship>(
  {
    companyId:           { type: Schema.Types.ObjectId, ref: "Company", required: true },
    companyName:         { type: String, required: true },
    title:               { type: String, required: true, trim: true },
    description:         { type: String, required: true },
    sector:              { type: String, required: true },
    requiredSkills:      [{ type: String }],
    qualification:       { type: String, required: true },
    eligibleBranches:    [{ type: String }],
    minimumCGPA:         { type: Number, required: true, min: 0, max: 10 },
    state:               { type: String, required: true },
    city:                { type: String, required: true },
    workMode:            { type: String, enum: ["Remote","Hybrid","On-site"], required: true },
    duration:            { type: String, required: true },
    stipendMin:          { type: Number, required: true, min: 0 },
    stipendMax:          { type: Number, required: true, min: 0 },
    totalSeats:          { type: Number, required: true, min: 1 },
    availableSeats:      { type: Number, required: true, min: 0 },
    startDate:           { type: Date, required: true },
    endDate:             { type: Date, required: true },
    applicationDeadline: { type: Date, required: true },
    status:              { type: String, enum: ["Draft","Pending","Approved","Rejected","Active","Closed"], default: "Draft" },
    isPublished:         { type: Boolean, default: false },
    rejectionReason:     { type: String },
    approvedBy:          { type: Schema.Types.ObjectId, ref: "User" },
    approvedAt:          { type: Date },
    totalApplications:   { type: Number, default: 0 },
    shortlistedCount:    { type: Number, default: 0 },
  },
  { timestamps: true }
);

InternshipSchema.index({ companyId: 1 });
InternshipSchema.index({ status: 1 });
InternshipSchema.index({ sector: 1 });
InternshipSchema.index({ city: 1, state: 1 });
InternshipSchema.index({ title: "text", description: "text", companyName: "text" });

export const Internship = mongoose.model<IInternship>("Internship", InternshipSchema);
