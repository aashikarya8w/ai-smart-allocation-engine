"use client";

import { useEffect } from "react";
import { useNotificationStore } from "@/store/notificationStore";
import { mockNotifications } from "@/data/notifications";
import { useAuthStore } from "@/store/authStore";
import type { Notification } from "@/types/notification";

export function useNotifications() {
  const store = useNotificationStore();
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    if (!user) return;
    const userNotifications = mockNotifications.filter(
      (n: Notification) => n.userId === user.id
    );
    store.setNotifications(userNotifications);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  return {
    notifications: store.notifications,
    unreadCount: store.unreadCount,
    markAsRead: store.markAsRead,
    markAllAsRead: store.markAllAsRead,
  };
}
