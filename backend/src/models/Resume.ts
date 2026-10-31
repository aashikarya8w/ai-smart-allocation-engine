import mongoose, { Document, Schema, Types } from "mongoose";

export interface IResume extends Document {
  studentId:   Types.ObjectId;
  userId:      Types.ObjectId;
  fileName:    string;
  filePath:    string;
  fileSize:    number;
  mimeType:    string;
  isActive:    boolean;
  uploadedAt:  Date;
  createdAt:   Date;
  updatedAt:   Date;
}

const ResumeSchema = new Schema<IResume>(
  {
    studentId:  { type: Schema.Types.ObjectId, ref: "Student", required: true },
    userId:     { type: Schema.Types.ObjectId, ref: "User",    required: true },
    fileName:   { type: String, required: true },
    filePath:   { type: String, required: true },
    fileSize:   { type: Number, required: true },
    mimeType:   { type: String, required: true },
    isActive:   { type: Boolean, default: true },
    uploadedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

ResumeSchema.index({ studentId: 1 });

export const Resume = mongoose.model<IResume>("Resume", ResumeSchema);
