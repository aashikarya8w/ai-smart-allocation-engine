"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeftIcon,
  Building2Icon,
  CalendarIcon,
  ClockIcon,
  SparklesIcon,
  CheckCircle2Icon,
  ShieldCheckIcon
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { ScoreBar, ScoreCircle } from "@/components/common/ScoreBar";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import { mockApplications } from "@/data/applications";
import { formatDate, formatRelativeTime } from "@/lib/formatters";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ApplicationDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const app = mockApplications.find((a) => a.id === id);

  if (!app) return <EmptyState title="Application not found" />;

  const initial = app.companyName?.slice(0, 2).toUpperCase() || "TN";

  return (
    <div className="space-y-6">
      {/* Back Nav */}
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon-sm"
          onClick={() => router.back()}
          className="rounded-xl border-border/80 hover:bg-muted/50"
        >
          <ArrowLeftIcon className="size-4" />
        </Button>
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Back to Applications Tracker
        </span>
      </div>

      {/* Cyber Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent p-6 shadow-xl shadow-primary/5 backdrop-blur-md">
        <div className="absolute -right-10 -top-10 size-48 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/15 border border-primary/30 text-primary font-bold text-lg shrink-0 shadow-md">
              {initial}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                  {app.internshipTitle}
                </h1>
                <StatusBadge status={app.status} />
              </div>
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Building2Icon className="size-3.5 text-primary shrink-0" />
                <span className="font-semibold text-foreground/90">{app.companyName}</span>
                <span>·</span>
                <span>Application ID: APP-{app.id.slice(0, 6).toUpperCase()}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary">
              <SparklesIcon className="size-3.5" />
              Verified Submissions Pipeline
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: Score Breakdown & Timestamps */}
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-6 shadow-xl space-y-5">
            <h3 className="text-sm font-bold text-foreground">Application Metadata</h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-border/60 bg-muted/20 p-3.5">
                <span className="text-[11px] font-medium text-muted-foreground block">Submission Timestamp</span>
                <span className="text-xs sm:text-sm font-bold text-foreground block mt-0.5">
                  {formatDate(app.appliedAt)}
                </span>
              </div>

              <div className="rounded-xl border border-border/60 bg-muted/20 p-3.5">
                <span className="text-[11px] font-medium text-muted-foreground block">Last HR Pipeline Update</span>
                <span className="text-xs sm:text-sm font-bold text-foreground block mt-0.5">
                  {formatRelativeTime(app.updatedAt)}
                </span>
              </div>
            </div>

            <div className="h-px bg-border/60" />

            {/* 5-Vector Score Breakdown */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-foreground">5-Vector Match Breakdown</h4>
                <span className="text-xs text-muted-foreground font-mono">Weighted Algorithm</span>
              </div>

              <div className="space-y-3 pt-1">
                <ScoreBar label="Technical Skill Alignment" score={app.scoreBreakdown.skillMatch} />
                <ScoreBar label="Academic Qualification" score={app.scoreBreakdown.qualification} />
                <ScoreBar label="Geographic & Domicile Match" score={app.scoreBreakdown.location} />
                <ScoreBar label="Domain Passion & Interests" score={app.scoreBreakdown.interest} />
                <ScoreBar label="Relevant Project Experience" score={app.scoreBreakdown.experience} />
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Score Circle & Action Controls */}
        <div className="space-y-5">
          <div className="flex flex-col items-center justify-center rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-6 text-center shadow-xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Overall Algorithm Match
            </span>
            <ScoreCircle score={app.matchScore} size="lg" />
            <p className="text-xs text-muted-foreground">
              {app.matchScore >= 85 ? "Top 5% Match Tier" : "Competitive Applicant"}
            </p>
          </div>

          <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-5 shadow-xl space-y-3">
            {app.status === "Applied" && (
              <Button
                variant="destructive"
                size="sm"
                className="w-full rounded-xl font-semibold bg-rose-600 hover:bg-rose-500 text-white"
              >
                Withdraw Application
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              className="w-full rounded-xl font-semibold border-border/80 hover:bg-muted/50"
              onClick={() => router.back()}
            >
              Back to Applications
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
