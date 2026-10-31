import mongoose, { Document, Schema, Types } from "mongoose";

export interface IRoadmapStep {
  _id?:        Types.ObjectId;
  order:       number;
  title:       string;
  description: string;
  skills:      string[];
  timeframe:   string;
  status:      "Pending" | "In Progress" | "Completed";
  resources:   { title: string; url?: string; type: string }[];
}

export interface ICareerRoadmap extends Document {
  studentId:   Types.ObjectId;
  targetRole:  string;
  steps:       IRoadmapStep[];
  progress:    number;   // 0-100
  generatedAt: Date;
  createdAt:   Date;
  updatedAt:   Date;
}

const RoadmapSchema = new Schema<ICareerRoadmap>(
  {
    studentId:   { type: Schema.Types.ObjectId, ref: "Student", required: true, unique: true },
    targetRole:  { type: String, default: "Software Developer Intern" },
    steps: [{
      order:       { type: Number },
      title:       { type: String },
      description: { type: String },
      skills:      [{ type: String }],
      timeframe:   { type: String },
      status:      { type: String, enum: ["Pending","In Progress","Completed"], default: "Pending" },
      resources: [{
        title: { type: String },
        url:   { type: String },
        type:  { type: String },
      }],
    }],
    progress:    { type: Number, default: 0 },
    generatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const CareerRoadmap = mongoose.model<ICareerRoadmap>("CareerRoadmap", RoadmapSchema);
