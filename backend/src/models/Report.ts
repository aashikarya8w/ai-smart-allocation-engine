import mongoose, { Document, Schema, Types } from "mongoose";

export interface IReport extends Document {
  type:        string;
  title:       string;
  description: string;
  generatedBy: Types.ObjectId;
  generatedByName: string;
  format:      "CSV" | "JSON" | "PDF";
  rowCount:    number;
  filters:     Record<string, unknown>;
  filePath?:   string;
  createdAt:   Date;
  updatedAt:   Date;
}

const ReportSchema = new Schema<IReport>(
  {
    type:            { type: String, required: true },
    title:           { type: String, required: true },
    description:     { type: String, default: "" },
    generatedBy:     { type: Schema.Types.ObjectId, ref: "User", required: true },
    generatedByName: { type: String, required: true },
    format:          { type: String, enum: ["CSV","JSON","PDF"], default: "CSV" },
    rowCount:        { type: Number, default: 0 },
    filters:         { type: Schema.Types.Mixed, default: {} },
    filePath:        { type: String },
  },
  { timestamps: true }
);

export const Report = mongoose.model<IReport>("Report", ReportSchema);
