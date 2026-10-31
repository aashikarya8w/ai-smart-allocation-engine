"use client";

import { useState } from "react";
import {
  BellIcon, CheckCircle2Icon, AlertCircleIcon, SparklesIcon,
  ClockIcon, Trash2Icon, CheckCheckIcon, ShieldCheckIcon,
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockNotifications } from "@/data/notifications";
import { formatDateTime } from "@/lib/formatters";
import Link from "next/link";

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const toggleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: !n.isRead } : n))
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="space-y-8 pb-12 max-w-4xl">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-br from-[#0c1222] via-[#0f172a] to-[#1e1338] p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl">
        <div className="absolute -top-32 -right-24 h-96 w-96 rounded-full bg-gradient-to-br from-primary/20 via-purple-500/15 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-gradient-to-tr from-cyan-500/15 via-blue-500/10 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
              <BellIcon className="h-3.5 w-3.5" />
              Administrative Signal & Event Dispatch
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              System <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Notifications</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed font-normal">
              High-priority alerts concerning scheme milestones, verification queues, algorithmic tie-breaks, and server telemetry.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              size="sm"
              variant="outline"
              onClick={markAllAsRead}
              className="border-white/10 hover:bg-white/5 text-white text-xs font-semibold"
            >
              <CheckCheckIcon className="size-3.5 mr-1.5" />
              Mark All Read
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={clearAll}
              className="border-rose-500/30 text-rose-400 hover:bg-rose-500/10 text-xs font-semibold"
            >
              <Trash2Icon className="size-3.5 mr-1.5" />
              Clear Feed
            </Button>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-12 text-center shadow-xl backdrop-blur-md">
            <BellIcon className="size-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-base font-bold text-foreground">No active administrative notifications</p>
            <p className="text-xs text-muted-foreground mt-1">Platform telemetry is clean and all pipelines are synchronized.</p>
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => toggleRead(n.id)}
              className={`cursor-pointer rounded-2xl border p-5 shadow-lg backdrop-blur-md transition-all hover:-translate-y-0.5 space-y-2 ${
                !n.isRead
                  ? "border-primary/40 bg-card/95 dark:bg-[#0e1322]/95 ring-1 ring-primary/20 shadow-primary/5"
                  : "border-border/60 dark:border-white/5 bg-card/60 dark:bg-white/[0.02] opacity-80"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div
                    className={`size-10 rounded-xl flex items-center justify-center shrink-0 text-sm ${
                      !n.isRead
                        ? "bg-primary/20 text-primary border border-primary/30"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <BellIcon className="size-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-foreground">{n.title}</h3>
                      {!n.isRead && (
                        <span className="size-2 rounded-full bg-primary animate-pulse" />
                      )}
                    </div>
                    <p className="text-xs text-slate-300/90 mt-1 leading-relaxed">{n.message}</p>
                  </div>
                </div>

                <span className="text-[11px] text-muted-foreground font-mono shrink-0">
                  {formatDateTime(n.createdAt)}
                </span>
              </div>

              {n.link && (
                <div className="pt-2 pl-13 flex justify-end">
                  <Link
                    href={n.link}
                    className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Inspect Detail →
                  </Link>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
