import mongoose, { Document, Schema, Types } from "mongoose";

export interface ISkillEvidence extends Document {
  studentId:   Types.ObjectId;
  skill:       string;
  evidenceType:"PROJECT" | "CERTIFICATE" | "ASSESSMENT" | "INTERNSHIP" | "COURSE";
  title:       string;
  description: string;
  url?:        string;
  confidence:  number;   // 0-100 (informational only)
  isVerified:  boolean;
  createdAt:   Date;
  updatedAt:   Date;
}

const SkillEvidenceSchema = new Schema<ISkillEvidence>(
  {
    studentId:   { type: Schema.Types.ObjectId, ref: "Student", required: true },
    skill:       { type: String, required: true },
    evidenceType:{ type: String, enum: ["PROJECT","CERTIFICATE","ASSESSMENT","INTERNSHIP","COURSE"], required: true },
    title:       { type: String, required: true },
    description: { type: String, required: true },
    url:         { type: String },
    confidence:  { type: Number, min: 0, max: 100, default: 50 },
    isVerified:  { type: Boolean, default: false },
  },
  { timestamps: true }
);

SkillEvidenceSchema.index({ studentId: 1 });
SkillEvidenceSchema.index({ studentId: 1, skill: 1 });

export const SkillEvidence = mongoose.model<ISkillEvidence>("SkillEvidence", SkillEvidenceSchema);
