import mongoose, { Document, Schema, Types } from "mongoose";

export interface IAnswerSubmission {
  questionId: Types.ObjectId;
  answer:     string | string[];
}

export interface IAssessmentAttempt extends Document {
  assessmentId:  Types.ObjectId;
  studentId:     Types.ObjectId;
  internshipId:  Types.ObjectId;
  answers:       IAnswerSubmission[];
  score:         number;
  totalMarks:    number;
  passingMarks:  number;
  passed:        boolean;
  percentage:    number;
  startedAt:     Date;
  submittedAt?:  Date;
  timeTaken?:    number;  // minutes
  status:        "In Progress" | "Submitted" | "Expired";
  createdAt:     Date;
  updatedAt:     Date;
}

const AttemptSchema = new Schema<IAssessmentAttempt>(
  {
    assessmentId: { type: Schema.Types.ObjectId, ref: "Assessment", required: true },
    studentId:    { type: Schema.Types.ObjectId, ref: "Student",    required: true },
    internshipId: { type: Schema.Types.ObjectId, ref: "Internship", required: true },
    answers: [{
      questionId: { type: Schema.Types.ObjectId },
      answer:     { type: Schema.Types.Mixed },
    }],
    score:        { type: Number, default: 0 },
    totalMarks:   { type: Number, default: 0 },
    passingMarks: { type: Number, default: 0 },
    passed:       { type: Boolean, default: false },
    percentage:   { type: Number, default: 0 },
    startedAt:    { type: Date, default: Date.now },
    submittedAt:  { type: Date },
    timeTaken:    { type: Number },
    status:       { type: String, enum: ["In Progress","Submitted","Expired"], default: "In Progress" },
  },
  { timestamps: true }
);

// One attempt per student per assessment
AttemptSchema.index({ assessmentId: 1, studentId: 1 }, { unique: true });
AttemptSchema.index({ studentId: 1 });

export const AssessmentAttempt = mongoose.model<IAssessmentAttempt>("AssessmentAttempt", AttemptSchema);
