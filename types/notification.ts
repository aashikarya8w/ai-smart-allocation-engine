export type NotificationType =
  | "APPLICATION"
  | "SHORTLIST"
  | "ALLOCATION"
  | "INTERNSHIP"
  | "SYSTEM"
  | "VERIFICATION";

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  link?: string;
  createdAt: string;
}
