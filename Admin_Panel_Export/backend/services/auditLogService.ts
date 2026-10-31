import { Types } from "mongoose";
import { AuditLog } from "../models/AuditLog";

export async function createAuditLog(params: {
  actorId:       string | Types.ObjectId;
  actorName:     string;
  actorRole:     string;
  action:        string;
  entity:        string;
  entityId?:     string;
  entityLabel?:  string;
  description:   string;
  previousValue?: Record<string, unknown>;
  newValue?:      Record<string, unknown>;
  ipAddress?:    string;
  userAgent?:    string;
  status?:       "Success" | "Failed" | "Pending";
}): Promise<void> {
  await AuditLog.create(params);
}

export async function getAuditLogs(filters: {
  page?:   number;
  limit?:  number;
  search?: string;
  action?: string;
  entity?: string;
  role?:   string;
}) {
  const { page = 1, limit = 20, search, action, entity, role } = filters;
  const query: Record<string, unknown> = {};
  if (action) query.action = action;
  if (entity) query.entity = entity;
  if (role)   query.actorRole = role;
  if (search) {
    query.$or = [
      { description:  { $regex: search, $options: "i" } },
      { actorName:    { $regex: search, $options: "i" } },
      { entityLabel:  { $regex: search, $options: "i" } },
    ];
  }
  const skip  = (page - 1) * limit;
  const total = await AuditLog.countDocuments(query);
  const data  = await AuditLog.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();
  return { data, total };
}
