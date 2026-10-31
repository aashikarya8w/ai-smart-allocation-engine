import mongoose, { Document, Schema, Types } from "mongoose";

export interface ICompany extends Document {
  userId:             Types.ObjectId;
  companyName:        string;
  email:              string;
  phone?:             string;
  logo?:              string;
  website?:           string;
  description?:       string;
  industry:           string;
  companySize?:       string;
  state?:             string;
  city?:              string;
  address?:           string;
  cin?:               string;          // Corporate Identification Number
  gstNumber?:         string;
  contactPersonName?: string;
  contactPersonRole?: string;
  verificationStatus: "Pending" | "Verified" | "Rejected";
  isActive:           boolean;
  createdAt:          Date;
  updatedAt:          Date;
}

const CompanySchema = new Schema<ICompany>(
  {
    userId:             { type: Schema.Types.ObjectId, ref: "User", required: true },
    companyName:        { type: String, required: true, trim: true },
    email:              { type: String, default: "", lowercase: true, trim: true },
    phone:              { type: String },
    logo:               { type: String },
    website:            { type: String },
    description:        { type: String },
    industry:           { type: String, default: "" },
    companySize:        { type: String, enum: ["1-10","11-50","51-200","201-500","500+"] },
    state:              { type: String },
    city:               { type: String },
    address:            { type: String },
    cin:                { type: String },
    gstNumber:          { type: String },
    contactPersonName:  { type: String },
    contactPersonRole:  { type: String },
    verificationStatus: { type: String, enum: ["Pending","Verified","Rejected"], default: "Pending" },
    isActive:           { type: Boolean, default: true },
  },
  { timestamps: true }
);

CompanySchema.index({ userId: 1 });
CompanySchema.index({ verificationStatus: 1 });
CompanySchema.index({ industry: 1 });

export const Company = mongoose.model<ICompany>("Company", CompanySchema);
