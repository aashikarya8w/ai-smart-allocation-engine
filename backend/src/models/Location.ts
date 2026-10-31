import mongoose, { Document, Schema } from "mongoose";

export interface ILocation extends Document {
  state:    string;
  city:     string;
  pincode?: string;
  isActive: boolean;
  createdAt:Date;
  updatedAt:Date;
}

const LocationSchema = new Schema<ILocation>(
  {
    state:    { type: String, required: true },
    city:     { type: String, required: true },
    pincode:  { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

LocationSchema.index({ state: 1 });
LocationSchema.index({ city:  1 });

export const Location = mongoose.model<ILocation>("Location", LocationSchema);
