import mongoose, { Document, Schema, Types } from "mongoose";

export interface IFeedback extends Document {
  studentId:        Types.ObjectId;
  internshipId:     Types.ObjectId;
  companyId:        Types.ObjectId;
  allocationId:     Types.ObjectId;
  learningRating:   number;
  experienceRating: number;
  mentorshipRating: number;
  workEnvRating:    number;
  overallRating:    number;
  comments:         string;
  suggestions:      string;
  wouldRecommend:   boolean;
  submittedAt:      Date;
  createdAt:        Date;
  updatedAt:        Date;
}

const FeedbackSchema = new Schema<IFeedback>(
  {
    studentId:        { type: Schema.Types.ObjectId, ref: "Student",    required: true },
    internshipId:     { type: Schema.Types.ObjectId, ref: "Internship", required: true },
    companyId:        { type: Schema.Types.ObjectId, ref: "Company",    required: true },
    allocationId:     { type: Schema.Types.ObjectId, ref: "Allocation", required: true },
    learningRating:   { type: Number, required: true, min: 1, max: 5 },
    experienceRating: { type: Number, required: true, min: 1, max: 5 },
    mentorshipRating: { type: Number, required: true, min: 1, max: 5 },
    workEnvRating:    { type: Number, required: true, min: 1, max: 5 },
    overallRating:    { type: Number, required: true, min: 1, max: 5 },
    comments:         { type: String, default: "" },
    suggestions:      { type: String, default: "" },
    wouldRecommend:   { type: Boolean, default: true },
    submittedAt:      { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// One feedback per student per internship
FeedbackSchema.index({ studentId: 1, internshipId: 1 }, { unique: true });
FeedbackSchema.index({ internshipId: 1 });

export const Feedback = mongoose.model<IFeedback>("Feedback", FeedbackSchema);
