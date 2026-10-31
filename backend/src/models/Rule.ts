import mongoose, { Document, Schema } from "mongoose";

export interface IWeights {
  skillMatch:    number;
  qualification: number;
  location:      number;
  interest:      number;
  experience:    number;
}

export interface IEligibilityCriteria {
  minimumCGPA:         number;
  minimumSkills:       number;
  requireResume:       boolean;
  requireVerification: boolean;
  allowedBranches:     string[];
}

export interface IConstraint {
  id:        string;
  label:     string;
  value:     string | number | boolean;
  isEnabled: boolean;
}

export interface IRule extends Document {
  name:                string;
  type:                "matching" | "allocation" | "eligibility";
  weights:             IWeights;
  eligibilityCriteria: IEligibilityCriteria;
  constraints:         IConstraint[];
  isActive:            boolean;
  updatedBy?:          string;
  createdAt:           Date;
  updatedAt:           Date;
}

const RuleSchema = new Schema<IRule>(
  {
    name: { type: String, required: true },
    type: { type: String, enum: ["matching","allocation","eligibility"], required: true },
    weights: {
      skillMatch:    { type: Number, default: 40 },
      qualification: { type: Number, default: 20 },
      location:      { type: Number, default: 15 },
      interest:      { type: Number, default: 15 },
      experience:    { type: Number, default: 10 },
    },
    eligibilityCriteria: {
      minimumCGPA:         { type: Number, default: 6.0 },
      minimumSkills:       { type: Number, default: 2 },
      requireResume:       { type: Boolean, default: false },
      requireVerification: { type: Boolean, default: false },
      allowedBranches:     [{ type: String }],
    },
    constraints: [
      {
        id:        { type: String },
        label:     { type: String },
        value:     { type: Schema.Types.Mixed },
        isEnabled: { type: Boolean, default: true },
      },
    ],
    isActive:  { type: Boolean, default: true },
    updatedBy: { type: String },
  },
  { timestamps: true }
);

export const Rule = mongoose.model<IRule>("Rule", RuleSchema);
