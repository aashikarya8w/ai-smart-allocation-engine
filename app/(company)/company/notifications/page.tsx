"use client";

import { BellIcon, CheckCheckIcon } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { EmptyState } from "@/components/common/EmptyState";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNotifications } from "@/hooks/useNotifications";
import { formatRelativeTime } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import type { NotificationType } from "@/types/notification";

const TYPE_COLORS: Record<NotificationType, string> = {
  APPLICATION:  "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  SHORTLIST:    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  ALLOCATION:   "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  INTERNSHIP:   "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  SYSTEM:       "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
  VERIFICATION: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
};

export default function CompanyNotificationsPage() {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  return (
    <div className="space-y-5">
      <PageHeader
        title="Notifications"
        description={unreadCount > 0 ? `${unreadCount} unread` : "All caught up"}
      >
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" className="gap-2" onClick={markAllAsRead}>
            <CheckCheckIcon className="size-4" />Mark all read
          </Button>
        )}
      </PageHeader>

      {notifications.length === 0 ? (
        <EmptyState icon={BellIcon} title="No notifications" description="You're all caught up!" />
      ) : (
        <div className="space-y-2">
          {notifications.map((n) => (
            <Card
              key={n.id}
              className={cn("cursor-pointer transition-colors hover:bg-muted/40", !n.isRead && "border-primary/20 bg-primary/5")}
              onClick={() => markAsRead(n.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={cn("mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-xs font-medium", TYPE_COLORS[n.type])}>
                    {n.type}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className={cn("text-sm font-medium", !n.isRead ? "text-foreground" : "text-muted-foreground")}>
                        {n.title}
                      </p>
                      {!n.isRead && <span className="size-2 shrink-0 rounded-full bg-primary" />}
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">{n.message}</p>
                    <p className="mt-1 text-xs text-muted-foreground/60">{formatRelativeTime(n.createdAt)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
