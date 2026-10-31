"use client";

import {
  PageHeader
} from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { EmptyState } from "@/components/common/EmptyState";
import { ScoreCircle } from "@/components/common/ScoreBar";
import { useApplications } from "@/hooks/useApplications";
import { formatRelativeTime } from "@/lib/formatters";
import { LinkButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ApplicationStatus } from "@/types/application";
import {
  SparklesIcon,
  Building2Icon,
  CalendarIcon,
  ArrowRightIcon,
  ClockIcon,
  CheckCircle2Icon,
  FileTextIcon,
  LayersIcon,
  ExternalLinkIcon
} from "lucide-react";

const TABS: { label: string; value: ApplicationStatus | "all" }[] = [
  { label: "All Applications", value: "all" },
  { label: "Applied", value: "Applied" },
  { label: "Shortlisted", value: "Shortlisted" },
  { label: "Allocated", value: "Allocated" },
  { label: "Rejected", value: "Rejected" },
  { label: "Waitlisted", value: "Waitlisted" },
  { label: "Withdrawn", value: "Withdrawn" },
];

const STATUS_BORDER: Record<string, string> = {
  Allocated: "border-l-4 border-l-emerald-500",
  Shortlisted: "border-l-4 border-l-blue-500",
  Applied: "border-l-4 border-l-amber-500",
  Rejected: "border-l-4 border-l-rose-500",
  Waitlisted: "border-l-4 border-l-purple-500",
  Withdrawn: "border-l-4 border-l-zinc-500",
};

export default function ApplicationsPage() {
  const { applications, statusFilter, setStatusFilter, counts } = useApplications();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="My Internship Applications"
        description={`Track the live review status and AI matching score for your ${counts.all} submitted applications.`}
      />

      {/* Cyber Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent p-6 shadow-xl shadow-primary/5 backdrop-blur-md">
        <div className="absolute -right-10 -top-10 size-48 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-md">
              <SparklesIcon className="size-3.5 text-primary" />
              <span>Real-Time Applicant Pipeline</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Smart Tracking with Instant Status Updates
            </h2>
            <p className="max-w-2xl text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Employers review candidate profiles dynamically. When you advance to Shortlisted or Allocated stages, confirmation tokens and reporting instructions update automatically.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 shrink-0 sm:flex sm:items-center">
            <div className="rounded-xl border border-border/70 bg-card/60 p-3 text-center backdrop-blur-sm">
              <span className="text-xs text-muted-foreground block">Active Submissions</span>
              <span className="text-sm font-bold text-foreground">{counts.all} Total</span>
            </div>
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-center backdrop-blur-sm">
              <span className="text-xs text-emerald-400 block">Allocated Offers</span>
              <span className="text-sm font-bold text-emerald-400">{counts.Allocated ?? 1} Confirmed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border/70 pb-3">
        {TABS.map((tab) => {
          const count = tab.value === "all" ? counts.all : counts[tab.value] ?? 0;
          const isActive = statusFilter === tab.value;

          return (
            <button
              key={tab.value}
              onClick={() => setStatusFilter(tab.value)}
              className={cn(
                "flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <span>{tab.label}</span>
              {count > 0 && (
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.2 text-[10px] font-bold",
                    isActive ? "bg-white/20 text-white" : "bg-card border border-border text-foreground"
                  )}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Applications List */}
      {applications.length === 0 ? (
        <EmptyState
          title="No applications found"
          description={
            statusFilter === "all"
              ? "You haven't submitted any internship applications yet. Explore available roles to get started!"
              : `No applications currently have the status "${statusFilter}".`
          }
        />
      ) : (
        <div className="space-y-4">
          {applications.map((app) => {
            const borderAccent = STATUS_BORDER[app.status] || "border-l-4 border-l-primary";
            const initial = app.companyName?.slice(0, 2).toUpperCase() || "TN";

            return (
              <div
                key={app.id}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-5 transition-all duration-300 hover:border-primary/40 hover:shadow-xl",
                  borderAccent
                )}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  {/* Left Column: Role Details */}
                  <div className="flex items-start gap-3.5 flex-1 min-w-0">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 border border-primary/25 text-primary font-bold text-sm shrink-0 shadow-sm">
                      {initial}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h3 className="text-base font-bold text-foreground tracking-tight group-hover:text-primary transition-colors truncate">
                          {app.internshipTitle}
                        </h3>
                        <StatusBadge status={app.status} />
                      </div>

                      <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1 font-medium text-foreground/85">
                          <Building2Icon className="size-3.5 text-primary/70 shrink-0" />
                          {app.companyName}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <CalendarIcon className="size-3.5 shrink-0" />
                          Applied {formatRelativeTime(app.appliedAt)}
                        </span>
                        {app.updatedAt !== app.appliedAt && (
                          <>
                            <span>·</span>
                            <span className="flex items-center gap-1 text-primary/80">
                              <ClockIcon className="size-3.5 shrink-0" />
                              Updated {formatRelativeTime(app.updatedAt)}
                            </span>
                          </>
                        )}
                      </div>

                      {/* Mini Pipeline Progression Preview */}
                      <div className="mt-3.5 flex items-center gap-2">
                        <div className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
                          <span className="flex size-4 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[9px]">✓</span>
                          <span>Submitted</span>
                        </div>
                        <div className="h-0.5 w-6 bg-border" />
                        <div className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
                          <span className={cn(
                            "flex size-4 items-center justify-center rounded-full font-bold text-[9px]",
                            app.status === "Shortlisted" || app.status === "Allocated"
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-muted text-muted-foreground"
                          )}>
                            {app.status === "Shortlisted" || app.status === "Allocated" ? "✓" : "2"}
                          </span>
                          <span>Review</span>
                        </div>
                        <div className="h-0.5 w-6 bg-border" />
                        <div className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
                          <span className={cn(
                            "flex size-4 items-center justify-center rounded-full font-bold text-[9px]",
                            app.status === "Allocated"
                              ? "bg-emerald-500 text-white"
                              : "bg-muted text-muted-foreground"
                          )}>
                            {app.status === "Allocated" ? "✓" : "3"}
                          </span>
                          <span>Decision</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Score & Details Button */}
                  <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-border/50">
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <ScoreCircle score={app.matchScore} size="sm" />
                        <div className="text-left hidden sm:block">
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block">
                            Match Score
                          </span>
                          <span className="text-xs font-bold text-foreground">
                            {app.matchScore >= 85 ? "Excellent Fit" : app.matchScore >= 70 ? "Good Fit" : "Moderate"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <LinkButton
                      href={`/student/applications/${app.id}`}
                      size="sm"
                      className="gap-1.5 rounded-xl font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20"
                    >
                      <span>Track Details</span>
                      <ArrowRightIcon className="size-3.5" />
                    </LinkButton>
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
