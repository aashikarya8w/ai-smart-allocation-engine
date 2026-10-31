import mongoose, { Document, Schema } from "mongoose";

export interface ISkill extends Document {
  name:        string;
  category:    string;
  description?: string;
  isActive:    boolean;
  createdAt:   Date;
  updatedAt:   Date;
}

const SkillSchema = new Schema<ISkill>(
  {
    name:        { type: String, required: true, unique: true, trim: true },
    category:    { type: String, required: true },
    description: { type: String },
    isActive:    { type: Boolean, default: true },
  },
  { timestamps: true }
);

SkillSchema.index({ category: 1 });
SkillSchema.index({ name: "text" });

export const Skill = mongoose.model<ISkill>("Skill", SkillSchema);
