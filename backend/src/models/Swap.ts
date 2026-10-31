import mongoose, { Document, Schema, Types } from "mongoose";

export interface ISwap extends Document {
  requestedBy:   Types.ObjectId;   // studentId who initiates
  studentAId:    Types.ObjectId;
  studentBId:    Types.ObjectId;
  internshipAId: Types.ObjectId;   // A's current internship
  internshipBId: Types.ObjectId;   // B's current internship
  allocationAId: Types.ObjectId;
  allocationBId: Types.ObjectId;
  reason:        string;
  eligibilityCheck: {
    studentAEligible: boolean;
    studentBEligible: boolean;
    details:          string;
  };
  status:         "Pending" | "Approved" | "Rejected" | "Cancelled";
  reviewedBy?:    Types.ObjectId;
  reviewNotes?:   string;
  reviewedAt?:    Date;
  createdAt:      Date;
  updatedAt:      Date;
}

const SwapSchema = new Schema<ISwap>(
  {
    requestedBy:   { type: Schema.Types.ObjectId, ref: "Student",    required: true },
    studentAId:    { type: Schema.Types.ObjectId, ref: "Student",    required: true },
    studentBId:    { type: Schema.Types.ObjectId, ref: "Student",    required: true },
    internshipAId: { type: Schema.Types.ObjectId, ref: "Internship", required: true },
    internshipBId: { type: Schema.Types.ObjectId, ref: "Internship", required: true },
    allocationAId: { type: Schema.Types.ObjectId, ref: "Allocation", required: true },
    allocationBId: { type: Schema.Types.ObjectId, ref: "Allocation", required: true },
    reason:        { type: String, required: true },
    eligibilityCheck: {
      studentAEligible: { type: Boolean, default: false },
      studentBEligible: { type: Boolean, default: false },
      details:          { type: String, default: "" },
    },
    status:     { type: String, enum: ["Pending","Approved","Rejected","Cancelled"], default: "Pending" },
    reviewedBy: { type: Schema.Types.ObjectId, ref: "User" },
    reviewNotes:{ type: String },
    reviewedAt: { type: Date },
  },
  { timestamps: true }
);

SwapSchema.index({ studentAId: 1 });
SwapSchema.index({ studentBId: 1 });
SwapSchema.index({ status: 1 });

export const Swap = mongoose.model<ISwap>("Swap", SwapSchema);
