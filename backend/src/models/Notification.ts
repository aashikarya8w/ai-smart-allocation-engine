import mongoose, { Document, Schema, Types } from "mongoose";

export interface INotification extends Document {
  userId:        Types.ObjectId;
  title:         string;
  message:       string;
  type:          "APPLICATION" | "SHORTLIST" | "ALLOCATION" | "INTERNSHIP" | "SYSTEM" | "VERIFICATION";
  isRead:        boolean;
  relatedEntity?: string;
  relatedId?:    Types.ObjectId;
  link?:         string;
  createdAt:     Date;
  updatedAt:     Date;
}

const NotificationSchema = new Schema<INotification>(
  {
    userId:        { type: Schema.Types.ObjectId, ref: "User", required: true },
    title:         { type: String, required: true },
    message:       { type: String, required: true },
    type:          { type: String, enum: ["APPLICATION","SHORTLIST","ALLOCATION","INTERNSHIP","SYSTEM","VERIFICATION"], required: true },
    isRead:        { type: Boolean, default: false },
    relatedEntity: { type: String },
    relatedId:     { type: Schema.Types.ObjectId },
    link:          { type: String },
  },
  { timestamps: true }
);

NotificationSchema.index({ userId: 1, isRead: 1 });
NotificationSchema.index({ userId: 1, createdAt: -1 });

export const Notification = mongoose.model<INotification>("Notification", NotificationSchema);
