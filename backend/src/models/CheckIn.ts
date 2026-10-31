import mongoose, { Document, Schema, Types } from "mongoose";

export interface ICheckIn extends Document {
  studentId:    Types.ObjectId;
  companyId:    Types.ObjectId;
  internshipId: Types.ObjectId;
  allocationId: Types.ObjectId;
  method:       "QR" | "RFID" | "FINGERPRINT" | "FACE" | "MANUAL";
  verified:     boolean;
  checkInTime:  Date;
  checkOutTime?: Date;
  date:         string;   // YYYY-MM-DD for easy daily lookup
  status:       "Checked In" | "Checked Out" | "Absent" | "Late";
  notes?:       string;
  createdAt:    Date;
  updatedAt:    Date;
}

const CheckInSchema = new Schema<ICheckIn>(
  {
    studentId:    { type: Schema.Types.ObjectId, ref: "Student",    required: true },
    companyId:    { type: Schema.Types.ObjectId, ref: "Company",    required: true },
    internshipId: { type: Schema.Types.ObjectId, ref: "Internship", required: true },
    allocationId: { type: Schema.Types.ObjectId, ref: "Allocation", required: true },
    method:       { type: String, enum: ["QR","RFID","FINGERPRINT","FACE","MANUAL"], required: true },
    verified:     { type: Boolean, default: false },
    checkInTime:  { type: Date, required: true },
    checkOutTime: { type: Date },
    date:         { type: String, required: true },
    status:       { type: String, enum: ["Checked In","Checked Out","Absent","Late"], default: "Checked In" },
    notes:        { type: String },
  },
  { timestamps: true }
);

CheckInSchema.index({ studentId: 1, date: 1 });
CheckInSchema.index({ companyId: 1 });
CheckInSchema.index({ internshipId: 1 });

export const CheckIn = mongoose.model<ICheckIn>("CheckIn", CheckInSchema);
