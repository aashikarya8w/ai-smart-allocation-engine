import { Types } from "mongoose";
import { Notification } from "../models/Notification";

type NotifType = "APPLICATION" | "SHORTLIST" | "ALLOCATION" | "INTERNSHIP" | "SYSTEM" | "VERIFICATION";

export async function createNotification(params: {
  userId:        string | Types.ObjectId;
  title:         string;
  message:       string;
  type:          NotifType;
  relatedEntity?: string;
  relatedId?:    string | Types.ObjectId;
  link?:         string;
}): Promise<void> {
  await Notification.create(params);
}

export async function getNotifications(userId: string, page = 1, limit = 20) {
  const skip  = (page - 1) * limit;
  const total = await Notification.countDocuments({ userId });
  const data  = await Notification.find({ userId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();
  return { data, total };
}

export async function getUnreadCount(userId: string): Promise<number> {
  return Notification.countDocuments({ userId, isRead: false });
}

export async function markRead(id: string, userId: string): Promise<void> {
  await Notification.findOneAndUpdate({ _id: id, userId }, { isRead: true });
}

export async function markAllRead(userId: string): Promise<void> {
  await Notification.updateMany({ userId, isRead: false }, { isRead: true });
}

export async function deleteNotification(id: string, userId: string): Promise<void> {
  await Notification.findOneAndDelete({ _id: id, userId });
}
