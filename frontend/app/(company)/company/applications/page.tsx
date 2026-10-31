"use client";

import { useState } from "react";
import {
  PageHeader
} from "@/components/common/PageHeader";
import { SearchInput } from "@/components/common/SearchInput";
import { StatusBadge } from "@/components/common/StatusBadge";
import { ScoreCircle } from "@/components/common/ScoreBar";
import { EmptyState } from "@/components/common/EmptyState";
import { LinkButton } from "@/components/ui/button";
import { useCompany } from "@/hooks/useCompany";
import { formatRelativeTime } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import type { ApplicationStatus } from "@/types/application";
import {
  SparklesIcon,
  UsersIcon,
  CalendarIcon,
  ArrowRightIcon,
  Building2Icon,
  CheckCircle2Icon
} from "lucide-react";

const TABS: { label: string; value: ApplicationStatus | "all" }[] = [
  { label: "All Applicants", value: "all" },
  { label: "Applied", value: "Applied" },
  { label: "Shortlisted", value: "Shortlisted" },
  { label: "Allocated", value: "Allocated" },
  { label: "Rejected", value: "Rejected" },
];

export default function CompanyApplicationsPage() {
  const { applications } = useCompany();
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<ApplicationStatus | "all">("all");

  const filtered = applications.filter((a) => {
    const matchTab = tab === "all" || a.status === tab;
    const matchSearch =
      !search ||
      a.studentName.toLowerCase().includes(search.toLowerCase()) ||
      a.internshipTitle.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Application Reviews"
        description={`Manage and evaluate ${applications.length} submitted candidate application${applications.length !== 1 ? "s" : ""}.`}
      />

      {/* Cyber Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent p-6 shadow-xl shadow-primary/5 backdrop-blur-md">
        <div className="absolute -right-10 -top-10 size-48 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-md">
              <SparklesIcon className="size-3.5 text-primary" />
              <span>Real-Time Corporate Applicant Pipeline</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Candidate Screening & Decision Management
            </h2>
            <p className="max-w-2xl text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Review AI match assessments, inspect candidate project links, and issue shortlist or allocation decisions directly.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-400">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              Auto-Rank Enabled
            </span>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/85 dark:bg-[#0e1322]/85 p-5 backdrop-blur-md space-y-4">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search by candidate name or internship title…"
          className="max-w-md w-full"
        />

        <div className="flex flex-wrap gap-2">
          {TABS.map((t) => {
            const count = t.value === "all" ? applications.length : applications.filter((a) => a.status === t.value).length;
            const isActive = tab === t.value;

            return (
              <button
                key={t.value}
                onClick={() => setTab(t.value)}
                className={cn(
                  "flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <span>{t.label}</span>
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.2 text-[10px] font-bold",
                    isActive ? "bg-white/20 text-white" : "bg-card border border-border text-foreground"
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Applications List */}
      {filtered.length === 0 ? (
        <EmptyState
          title="No applications found"
          description="Try broadening your search or switching to another status tab."
        />
      ) : (
        <div className="space-y-3">
          {filtered.map((app) => {
            const initials = app.studentName?.slice(0, 2).toUpperCase() || "ST";

            return (
              <div
                key={app.id}
                className="group relative overflow-hidden rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-5 transition-all duration-300 hover:border-primary/40 hover:shadow-xl"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-start gap-3.5 min-w-0 flex-1">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 border border-primary/25 text-primary font-bold text-sm shrink-0 shadow-sm">
                      {initials}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h4 className="text-base font-bold text-foreground truncate group-hover:text-primary transition-colors">
                          {app.studentName}
                        </h4>
                        <StatusBadge status={app.status} />
                      </div>

                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Applied for <strong className="text-foreground/90">{app.internshipTitle}</strong> · {formatRelativeTime(app.appliedAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-border/50">
                    <div className="flex items-center gap-2 text-right">
                      <ScoreCircle score={app.matchScore} size="sm" />
                      <div className="text-left hidden sm:block">
                        <span className="text-[10px] text-muted-foreground block">AI Match</span>
                        <span className="text-xs font-bold text-foreground">{app.matchScore}%</span>
                      </div>
                    </div>

                    <LinkButton
                      href={`/company/applications/${app.id}`}
                      size="sm"
                      className="gap-1.5 rounded-xl font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20"
                    >
                      <span>Review Details</span>
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
