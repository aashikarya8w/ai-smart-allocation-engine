import mongoose, { Document, Schema, Types } from "mongoose";

export interface IAuditLog extends Document {
  actorId:      Types.ObjectId;
  actorName:    string;
  actorRole:    string;
  action:       string;
  entity:       string;
  entityId?:    string;
  entityLabel?: string;
  description:  string;
  previousValue?: Record<string, unknown>;
  newValue?:      Record<string, unknown>;
  ipAddress?:   string;
  userAgent?:   string;
  status:       "Success" | "Failed" | "Pending";
  createdAt:    Date;
  updatedAt:    Date;
}

const AuditLogSchema = new Schema<IAuditLog>(
  {
    actorId:      { type: Schema.Types.ObjectId, ref: "User", required: true },
    actorName:    { type: String, required: true },
    actorRole:    { type: String, required: true },
    action:       { type: String, required: true },
    entity:       { type: String, required: true },
    entityId:     { type: String },
    entityLabel:  { type: String },
    description:  { type: String, required: true },
    previousValue:{ type: Schema.Types.Mixed },
    newValue:     { type: Schema.Types.Mixed },
    ipAddress:    { type: String },
    userAgent:    { type: String },
    status:       { type: String, enum: ["Success","Failed","Pending"], default: "Success" },
  },
  { timestamps: true }
);

AuditLogSchema.index({ actorId: 1 });
AuditLogSchema.index({ action:  1 });
AuditLogSchema.index({ entity:  1 });
AuditLogSchema.index({ createdAt: -1 });

export const AuditLog = mongoose.model<IAuditLog>("AuditLog", AuditLogSchema);
