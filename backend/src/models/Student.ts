import mongoose, { Document, Schema, Types } from "mongoose";

export interface IEducation {
  _id?:         Types.ObjectId;
  degree:       string;
  branch:       string;
  institution:  string;
  cgpa:         number;
  startYear:    number;
  endYear?:     number;
  isCurrently:  boolean;
}

export interface IStudentSkill {
  name:              string;
  level:             "Beginner" | "Intermediate" | "Advanced" | "Expert";
  yearsOfExperience: number;
}

export interface IPreviousInternship {
  _id?:        Types.ObjectId;
  company:     string;
  role:        string;
  duration:    string;
  year:        number;
  description?: string;
}

export interface IProject {
  _id?:        Types.ObjectId;
  title:       string;
  description: string;
  techStack:   string[];
  url?:        string;
}

export interface ICertification {
  _id?:        Types.ObjectId;
  name:        string;
  issuer:      string;
  year:        number;
  url?:        string;
}

export interface IStudent extends Document {
  userId:              Types.ObjectId;
  fullName:            string;
  email:               string;
  phone?:              string;
  dateOfBirth?:        string;
  gender?:             string;
  profilePhoto?:       string;
  state?:              string;
  city?:               string;
  pincode?:            string;
  university:          string;
  branch:              string;
  degree:              string;
  cgpa:                number;
  graduationYear:      number;
  education:           IEducation[];
  skills:              IStudentSkill[];
  interests:           string[];
  preferredLocations:  string[];
  preferredSectors:    string[];
  preferredWorkMode:   string;
  previousInternships: IPreviousInternship[];
  projects:            IProject[];
  certifications:      ICertification[];
  resumeUrl?:          string;
  linkedinUrl?:        string;
  githubUrl?:          string;
  profileCompletion:   number;
  verificationStatus:  "Pending" | "Verified" | "Rejected";
  isActive:            boolean;
  createdAt:           Date;
  updatedAt:           Date;
}

const EducationSchema = new Schema<IEducation>({
  degree:      { type: String, required: true },
  branch:      { type: String, required: true },
  institution: { type: String, required: true },
  cgpa:        { type: Number, required: true, min: 0, max: 10 },
  startYear:   { type: Number, required: true },
  endYear:     { type: Number },
  isCurrently: { type: Boolean, default: false },
});

const SkillSchema = new Schema<IStudentSkill>({
  name:              { type: String, required: true },
  level:             { type: String, enum: ["Beginner","Intermediate","Advanced","Expert"], default: "Intermediate" },
  yearsOfExperience: { type: Number, default: 0 },
});

const ProjectSchema = new Schema<IProject>({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  techStack:   [{ type: String }],
  url:         { type: String },
});

const CertificationSchema = new Schema<ICertification>({
  name:   { type: String, required: true },
  issuer: { type: String, required: true },
  year:   { type: Number, required: true },
  url:    { type: String },
});

const PreviousInternshipSchema = new Schema<IPreviousInternship>({
  company:     { type: String, required: true },
  role:        { type: String, required: true },
  duration:    { type: String, required: true },
  year:        { type: Number, required: true },
  description: { type: String },
});

const StudentSchema = new Schema<IStudent>(
  {
    userId:             { type: Schema.Types.ObjectId, ref: "User", required: true },
    fullName:           { type: String, required: true, trim: true },
    email:              { type: String, default: "", lowercase: true, trim: true },
    phone:              { type: String },
    dateOfBirth:        { type: String },
    gender:             { type: String, enum: ["Male","Female","Other","Prefer not to say"] },
    profilePhoto:       { type: String },
    state:              { type: String },
    city:               { type: String },
    pincode:            { type: String },
    university:         { type: String, default: "" },
    branch:             { type: String, default: "" },
    degree:             { type: String, default: "" },
    cgpa:               { type: Number, default: 0, min: 0, max: 10 },
    graduationYear:     { type: Number, default: new Date().getFullYear() + 2 },
    education:          [EducationSchema],
    skills:             [SkillSchema],
    interests:          [{ type: String }],
    preferredLocations: [{ type: String }],
    preferredSectors:   [{ type: String }],
    preferredWorkMode:  { type: String, enum: ["Remote","Hybrid","On-site"], default: "Hybrid" },
    previousInternships:[PreviousInternshipSchema],
    projects:           [ProjectSchema],
    certifications:     [CertificationSchema],
    resumeUrl:          { type: String },
    linkedinUrl:        { type: String },
    githubUrl:          { type: String },
    profileCompletion:  { type: Number, default: 0, min: 0, max: 100 },
    verificationStatus: { type: String, enum: ["Pending","Verified","Rejected"], default: "Pending" },
    isActive:           { type: Boolean, default: true },
  },
  { timestamps: true }
);

StudentSchema.index({ userId: 1 });
StudentSchema.index({ email: 1 });
StudentSchema.index({ verificationStatus: 1 });

export const Student = mongoose.model<IStudent>("Student", StudentSchema);
