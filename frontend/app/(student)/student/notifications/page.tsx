"use client";

import {
  BellIcon,
  CheckCheckIcon,
  SparklesIcon,
  ClockIcon,
  CheckCircle2Icon,
  BriefcaseIcon,
  AwardIcon,
  ShieldCheckIcon,
  InboxIcon
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import { useNotifications } from "@/hooks/useNotifications";
import { formatRelativeTime } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import type { NotificationType } from "@/types/notification";

const TYPE_CONFIG: Record<
  NotificationType,
  { badge: string; icon: React.ReactNode }
> = {
  APPLICATION: {
    badge: "border-blue-500/30 bg-blue-500/15 text-blue-400",
    icon: <BriefcaseIcon className="size-3.5" />,
  },
  SHORTLIST: {
    badge: "border-amber-500/30 bg-amber-500/15 text-amber-400",
    icon: <AwardIcon className="size-3.5" />,
  },
  ALLOCATION: {
    badge: "border-emerald-500/30 bg-emerald-500/15 text-emerald-400",
    icon: <CheckCircle2Icon className="size-3.5" />,
  },
  INTERNSHIP: {
    badge: "border-purple-500/30 bg-purple-500/15 text-purple-400",
    icon: <SparklesIcon className="size-3.5" />,
  },
  SYSTEM: {
    badge: "border-border/70 bg-muted/40 text-muted-foreground",
    icon: <BellIcon className="size-3.5" />,
  },
  VERIFICATION: {
    badge: "border-teal-500/30 bg-teal-500/15 text-teal-400",
    icon: <ShieldCheckIcon className="size-3.5" />,
  },
};

export default function NotificationsPage() {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Activity Notifications"
        description={
          unreadCount > 0
            ? `You have ${unreadCount} unread update${unreadCount !== 1 ? "s" : ""}.`
            : "All caught up! No unread notifications."
        }
      >
        {unreadCount > 0 && (
          <Button
            size="sm"
            className="gap-2 rounded-xl font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20"
            onClick={markAllAsRead}
          >
            <CheckCheckIcon className="size-4" />
            <span>Mark All As Read</span>
          </Button>
        )}
      </PageHeader>

      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent p-6 shadow-xl shadow-primary/5 backdrop-blur-md">
        <div className="absolute -right-10 -top-10 size-48 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-md">
              <BellIcon className="size-3.5 text-primary" />
              <span>Real-Time Alert Dispatcher</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Instant Updates on Shortlists, Tests & Allotments
            </h2>
            <p className="max-w-2xl text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Stay ahead of application review decisions, test schedules, and host company onboarding instructions in real time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary">
              <InboxIcon className="size-3.5" />
              {notifications.length} Total Alerts
            </span>
          </div>
        </div>
      </div>

      {notifications.length === 0 ? (
        <EmptyState
          icon={BellIcon}
          title="No notifications in your feed"
          description="Updates regarding your applications, interview invites, and test results will appear here."
        />
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => {
            const config = TYPE_CONFIG[n.type] || TYPE_CONFIG.SYSTEM;

            return (
              <div
                key={n.id}
                onClick={() => markAsRead(n.id)}
                className={cn(
                  "group relative cursor-pointer overflow-hidden rounded-2xl border p-4.5 transition-all duration-300 backdrop-blur-md",
                  !n.isRead
                    ? "border-primary/50 bg-primary/10 shadow-lg shadow-primary/5"
                    : "border-border/70 dark:border-white/10 bg-card/85 dark:bg-[#0e1322]/85 hover:border-primary/40 hover:bg-card/95"
                )}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-xl border",
                      config.badge
                    )}
                  >
                    {config.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={cn(
                            "rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                            config.badge
                          )}
                        >
                          {n.type}
                        </span>
                        <h4
                          className={cn(
                            "text-sm font-bold tracking-tight",
                            !n.isRead ? "text-foreground" : "text-foreground/80"
                          )}
                        >
                          {n.title}
                        </h4>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                          <ClockIcon className="size-3" />
                          {formatRelativeTime(n.createdAt)}
                        </span>
                        {!n.isRead && (
                          <span className="size-2 rounded-full bg-primary animate-pulse" title="Unread" />
                        )}
                      </div>
                    </div>

                    <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                      {n.message}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
