import mongoose, { Document, Schema, Types } from "mongoose";

export interface IQuestion {
  _id?:          Types.ObjectId;
  question:      string;
  type:          "MCQ" | "MULTIPLE_SELECT" | "TRUE_FALSE";
  options:       string[];
  correctAnswer: string | string[];  // hidden from student until after submit
  marks:         number;
  explanation?:  string;
}

export interface IAssessment extends Document {
  title:         string;
  description:   string;
  internshipId:  Types.ObjectId;
  companyId:     Types.ObjectId;
  duration:      number;   // minutes
  totalMarks:    number;
  passingMarks:  number;
  questions:     IQuestion[];
  status:        "Draft" | "Published" | "Closed";
  createdAt:     Date;
  updatedAt:     Date;
}

const QuestionSchema = new Schema<IQuestion>({
  question:      { type: String, required: true },
  type:          { type: String, enum: ["MCQ","MULTIPLE_SELECT","TRUE_FALSE"], required: true },
  options:       [{ type: String }],
  correctAnswer: { type: Schema.Types.Mixed, required: true, select: false }, // never sent to client before submit
  marks:         { type: Number, required: true, min: 1 },
  explanation:   { type: String },
});

const AssessmentSchema = new Schema<IAssessment>(
  {
    title:        { type: String, required: true },
    description:  { type: String, required: true },
    internshipId: { type: Schema.Types.ObjectId, ref: "Internship", required: true },
    companyId:    { type: Schema.Types.ObjectId, ref: "Company",    required: true },
    duration:     { type: Number, required: true, min: 5 },
    totalMarks:   { type: Number, required: true },
    passingMarks: { type: Number, required: true },
    questions:    [QuestionSchema],
    status:       { type: String, enum: ["Draft","Published","Closed"], default: "Draft" },
  },
  { timestamps: true }
);

AssessmentSchema.index({ internshipId: 1 });
AssessmentSchema.index({ companyId: 1 });

export const Assessment = mongoose.model<IAssessment>("Assessment", AssessmentSchema);
