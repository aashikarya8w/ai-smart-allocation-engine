import { mockNotifications } from "@/data/notifications";
import type { Notification } from "@/types/notification";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getUserNotifications(userId: string): Promise<Notification[]> {
  await delay(300);
  return mockNotifications
    .filter((n) => n.userId === userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}
