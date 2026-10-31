import mongoose, { Document, Schema, Types } from "mongoose";

export interface IRecommendation extends Document {
  studentId:         Types.ObjectId;
  internshipId:      Types.ObjectId;
  companyId:         Types.ObjectId;
  internshipTitle:   string;
  companyName:       string;
  sector:            string;
  location:          string;
  city:              string;
  state:             string;
  workMode:          string;
  duration:          string;
  stipendMin:        number;
  stipendMax:        number;
  matchScore:        number;
  skillScore:        number;
  qualificationScore:number;
  locationScore:     number;
  interestScore:     number;
  experienceScore:   number;
  matchedSkills:     string[];
  missingSkills:     string[];
  reasons:           string[];
  whyThisMatch:      string;
  isEligible:        boolean;
  isSaved:           boolean;
  isApplied:         boolean;
  generatedAt:       Date;
  expiresAt:         Date;
}

const RecommendationSchema = new Schema<IRecommendation>(
  {
    studentId:         { type: Schema.Types.ObjectId, ref: "Student",    required: true },
    internshipId:      { type: Schema.Types.ObjectId, ref: "Internship", required: true },
    companyId:         { type: Schema.Types.ObjectId, ref: "Company",    required: true },
    internshipTitle:   { type: String, required: true },
    companyName:       { type: String, required: true },
    sector:            { type: String },
    location:          { type: String },
    city:              { type: String },
    state:             { type: String },
    workMode:          { type: String },
    duration:          { type: String },
    stipendMin:        { type: Number, default: 0 },
    stipendMax:        { type: Number, default: 0 },
    matchScore:        { type: Number, required: true, min: 0, max: 100 },
    skillScore:        { type: Number, default: 0 },
    qualificationScore:{ type: Number, default: 0 },
    locationScore:     { type: Number, default: 0 },
    interestScore:     { type: Number, default: 0 },
    experienceScore:   { type: Number, default: 0 },
    matchedSkills:     [{ type: String }],
    missingSkills:     [{ type: String }],
    reasons:           [{ type: String }],
    whyThisMatch:      { type: String, default: "" },
    isEligible:        { type: Boolean, default: true },
    isSaved:           { type: Boolean, default: false },
    isApplied:         { type: Boolean, default: false },
    generatedAt:       { type: Date, default: Date.now },
    expiresAt:         { type: Date, required: true },
  },
  { timestamps: true }
);

RecommendationSchema.index({ studentId: 1 });
RecommendationSchema.index({ studentId: 1, internshipId: 1 });
RecommendationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL

export const Recommendation = mongoose.model<IRecommendation>("Recommendation", RecommendationSchema);
