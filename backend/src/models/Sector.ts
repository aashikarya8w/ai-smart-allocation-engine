import mongoose, { Document, Schema } from "mongoose";

export interface ISector extends Document {
  name:        string;
  description?: string;
  isActive:    boolean;
  createdAt:   Date;
  updatedAt:   Date;
}

const SectorSchema = new Schema<ISector>(
  {
    name:        { type: String, required: true, unique: true, trim: true },
    description: { type: String },
    isActive:    { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Sector = mongoose.model<ISector>("Sector", SectorSchema);
