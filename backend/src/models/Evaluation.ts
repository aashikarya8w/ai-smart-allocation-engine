import mongoose, { Document, Schema, Types } from "mongoose";

export interface IEvaluation extends Document {
  studentId:           Types.ObjectId;
  internshipId:        Types.ObjectId;
  companyId:           Types.ObjectId;
  allocationId:        Types.ObjectId;
  technicalRating:     number;
  projectRating:       number;
  communicationRating: number;
  disciplineRating:    number;
  overallRating:       number;
  strengths:           string[];
  improvements:        string[];
  comments:            string;
  wouldRehire:         boolean;
  submittedBy:         Types.ObjectId;  // company user
  submittedAt:         Date;
  createdAt:           Date;
  updatedAt:           Date;
}

const EvaluationSchema = new Schema<IEvaluation>(
  {
    studentId:           { type: Schema.Types.ObjectId, ref: "Student",    required: true },
    internshipId:        { type: Schema.Types.ObjectId, ref: "Internship", required: true },
    companyId:           { type: Schema.Types.ObjectId, ref: "Company",    required: true },
    allocationId:        { type: Schema.Types.ObjectId, ref: "Allocation", required: true },
    technicalRating:     { type: Number, required: true, min: 1, max: 5 },
    projectRating:       { type: Number, required: true, min: 1, max: 5 },
    communicationRating: { type: Number, required: true, min: 1, max: 5 },
    disciplineRating:    { type: Number, required: true, min: 1, max: 5 },
    overallRating:       { type: Number, required: true, min: 1, max: 5 },
    strengths:           [{ type: String }],
    improvements:        [{ type: String }],
    comments:            { type: String, default: "" },
    wouldRehire:         { type: Boolean, default: true },
    submittedBy:         { type: Schema.Types.ObjectId, ref: "User", required: true },
    submittedAt:         { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// One evaluation per student per internship
EvaluationSchema.index({ studentId: 1, internshipId: 1 }, { unique: true });
EvaluationSchema.index({ internshipId: 1 });
EvaluationSchema.index({ companyId: 1 });

export const Evaluation = mongoose.model<IEvaluation>("Evaluation", EvaluationSchema);
