import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name:             string;
  email:            string;
  password:         string;
  role:             "student" | "company" | "admin";
  phone?:           string;
  avatar?:          string;
  isEmailVerified:  boolean;
  isActive:         boolean;
  emailVerifyToken?: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  refreshToken?:    string;
  lastLogin?:       Date;
  createdAt:        Date;
  updatedAt:        Date;
}

const UserSchema = new Schema<IUser>(
  {
    name:             { type: String, required: true, trim: true },
    email:            { type: String, required: true, unique: true, lowercase: true, trim: true },
    password:         { type: String, required: true, select: false },
    role:             { type: String, enum: ["student", "company", "admin"], required: true },
    phone:            { type: String, trim: true },
    avatar:           { type: String },
    isEmailVerified:  { type: Boolean, default: false },
    isActive:         { type: Boolean, default: true },
    emailVerifyToken:     { type: String, select: false },
    passwordResetToken:   { type: String, select: false },
    passwordResetExpires: { type: Date,   select: false },
    refreshToken:     { type: String, select: false },
    lastLogin:        { type: Date },
  },
  { timestamps: true }
);

// Never return password in queries
UserSchema.set("toJSON", {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(_doc: any, ret: any) {
    delete ret.password;
    delete ret.refreshToken;
    delete ret.emailVerifyToken;
    delete ret.passwordResetToken;
    delete ret.passwordResetExpires;
    return ret;
  },
});

export const User = mongoose.model<IUser>("User", UserSchema);
