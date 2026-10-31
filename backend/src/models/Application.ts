import mongoose, { Document, Schema, Types } from "mongoose";

export interface IScoreBreakdown {
  skillMatch:    number;
  qualification: number;
  location:      number;
  interest:      number;
  experience:    number;
}

export interface IApplication extends Document {
  studentId:      Types.ObjectId;
  internshipId:   Types.ObjectId;
  companyId:      Types.ObjectId;
  studentName:    string;
  internshipTitle:string;
  companyName:    string;
  resumeId?:      Types.ObjectId;
  matchScore:     number;
  scoreBreakdown: IScoreBreakdown;
  matchedSkills:  string[];
  missingSkills:  string[];
  status:         "Applied" | "Shortlisted" | "Rejected" | "Waitlisted" | "Allocated" | "Withdrawn";
  appliedAt:      Date;
  shortlistedAt?: Date;
  rejectedAt?:    Date;
  withdrawnAt?:   Date;
  allocatedAt?:   Date;
  notes?:         string;
  createdAt:      Date;
  updatedAt:      Date;
}

const ScoreBreakdownSchema = new Schema<IScoreBreakdown>({
  skillMatch:    { type: Number, default: 0 },
  qualification: { type: Number, default: 0 },
  location:      { type: Number, default: 0 },
  interest:      { type: Number, default: 0 },
  experience:    { type: Number, default: 0 },
}, { _id: false });

const ApplicationSchema = new Schema<IApplication>(
  {
    studentId:      { type: Schema.Types.ObjectId, ref: "Student",    required: true },
    internshipId:   { type: Schema.Types.ObjectId, ref: "Internship", required: true },
    companyId:      { type: Schema.Types.ObjectId, ref: "Company",    required: true },
    studentName:    { type: String, required: true },
    internshipTitle:{ type: String, required: true },
    companyName:    { type: String, required: true },
    resumeId:       { type: Schema.Types.ObjectId, ref: "Resume" },
    matchScore:     { type: Number, default: 0, min: 0, max: 100 },
    scoreBreakdown: { type: ScoreBreakdownSchema, default: {} },
    matchedSkills:  [{ type: String }],
    missingSkills:  [{ type: String }],
    status:         { type: String, enum: ["Applied","Shortlisted","Rejected","Waitlisted","Allocated","Withdrawn"], default: "Applied" },
    appliedAt:      { type: Date, default: Date.now },
    shortlistedAt:  { type: Date },
    rejectedAt:     { type: Date },
    withdrawnAt:    { type: Date },
    allocatedAt:    { type: Date },
    notes:          { type: String },
  },
  { timestamps: true }
);

// Prevent duplicate applications
ApplicationSchema.index({ studentId: 1, internshipId: 1 }, { unique: true });
ApplicationSchema.index({ studentId:   1 });
ApplicationSchema.index({ internshipId: 1 });
ApplicationSchema.index({ companyId:    1 });
ApplicationSchema.index({ status:       1 });

export const Application = mongoose.model<IApplication>("Application", ApplicationSchema);
