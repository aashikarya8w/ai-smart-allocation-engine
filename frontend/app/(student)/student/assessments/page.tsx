"use client";

import { useState } from "react";
import {
  ClipboardCheckIcon,
  PlayIcon,
  CheckCircle2Icon,
  ClockIcon,
  XCircleIcon,
  SparklesIcon,
  AwardIcon,
  Building2Icon,
  Code2Icon,
  ArrowRightIcon,
  CheckIcon
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { EmptyState } from "@/components/common/EmptyState";
import { mockAssessments, mockAssessmentResults } from "@/data/assessments";
import { formatDateTime } from "@/lib/formatters";
import AssessmentModal from "./AssessmentModal";

export default function AssessmentsPage() {
  const [activeAssessment, setActiveAssessment] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");

  const completedIds = new Set(mockAssessmentResults.map((r) => r.assessmentId));
  const pending = mockAssessments.filter((a) => !completedIds.has(a.id));
  const completed = mockAssessmentResults;

  const avgScore =
    completed.length > 0
      ? Math.round(completed.reduce((s, r) => s + r.percentage, 0) / completed.length)
      : 0;

  if (activeAssessment) {
    const assessment = mockAssessments.find((a) => a.id === activeAssessment);
    if (assessment) {
      return (
        <AssessmentModal
          assessment={assessment}
          onFinish={() => setActiveAssessment(null)}
        />
      );
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Technical Skill Assessments"
        description="Verify your coding, architectural, and domain proficiencies with proctored assessments."
      />

      {/* Cyber Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent p-6 shadow-xl shadow-primary/5 backdrop-blur-md">
        <div className="absolute -right-10 -top-10 size-48 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-md">
              <SparklesIcon className="size-3.5 text-primary" />
              <span>Certified Skills Verification Engine</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Boost Placement Ranking with Validated Test Scores
            </h2>
            <p className="max-w-2xl text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Companies prioritize candidates with verified assessment scores. Completing assessments unlocks automated shortlisting for top-tier enterprise roles.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-400">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              Verified Badges Active
            </span>
          </div>
        </div>
      </div>

      {/* Modern Metric Cards with Sparklines */}
      <div className="grid gap-4 sm:grid-cols-3">
        {/* Pending */}
        <div
          onClick={() => setFilter(filter === "pending" ? "all" : "pending")}
          className={`group cursor-pointer relative overflow-hidden rounded-2xl border p-5 transition-all duration-300 backdrop-blur-md ${
            filter === "pending"
              ? "border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/10"
              : "border-border/80 dark:border-white/10 bg-card/85 dark:bg-[#0e1322]/85 hover:border-amber-500/50 hover:shadow-md"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Pending Tests</span>
            <div className="flex size-9 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
              <ClockIcon className="size-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div className="text-3xl font-bold tracking-tight text-foreground">{pending.length}</div>
            <span className="text-xs font-semibold text-amber-400">Action Required</span>
          </div>
          <div className="mt-3 h-8 w-full">
            <svg className="h-full w-full overflow-visible" viewBox="0 0 100 25" preserveAspectRatio="none">
              <path d="M 0 18 Q 30 14 60 18 T 100 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-amber-500" />
            </svg>
          </div>
        </div>

        {/* Completed */}
        <div
          onClick={() => setFilter(filter === "completed" ? "all" : "completed")}
          className={`group cursor-pointer relative overflow-hidden rounded-2xl border p-5 transition-all duration-300 backdrop-blur-md ${
            filter === "completed"
              ? "border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/10"
              : "border-border/80 dark:border-white/10 bg-card/85 dark:bg-[#0e1322]/85 hover:border-emerald-500/50 hover:shadow-md"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Completed</span>
            <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              <CheckCircle2Icon className="size-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div className="text-3xl font-bold tracking-tight text-foreground">{completed.length}</div>
            <span className="text-xs font-semibold text-emerald-400">✓ All Passed</span>
          </div>
          <div className="mt-3 h-8 w-full">
            <svg className="h-full w-full overflow-visible" viewBox="0 0 100 25" preserveAspectRatio="none">
              <path d="M 0 20 Q 30 16 60 8 T 100 4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-emerald-500" />
            </svg>
          </div>
        </div>

        {/* Avg Score */}
        <div
          onClick={() => setFilter("completed")}
          className="group cursor-pointer relative overflow-hidden rounded-2xl border border-border/80 dark:border-white/10 bg-card/85 dark:bg-[#0e1322]/85 p-5 backdrop-blur-md transition-all hover:border-primary/50 hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Average Mastery</span>
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary/15 text-primary border border-primary/30">
              <AwardIcon className="size-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div className="text-3xl font-bold tracking-tight text-foreground">{avgScore}%</div>
            <span className="text-xs font-semibold text-primary">Top 10% Tier</span>
          </div>
          <div className="mt-3 h-8 w-full">
            <svg className="h-full w-full overflow-visible" viewBox="0 0 100 25" preserveAspectRatio="none">
              <path d="M 0 18 Q 30 15 65 8 T 100 2" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-primary" />
            </svg>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-border/70 pb-3">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
            filter === "all"
              ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
              : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          All Tests ({mockAssessments.length})
        </button>
        <button
          type="button"
          onClick={() => setFilter("pending")}
          className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
            filter === "pending"
              ? "bg-amber-500 text-white shadow-md shadow-amber-500/20"
              : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          Pending ({pending.length})
        </button>
        <button
          type="button"
          onClick={() => setFilter("completed")}
          className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
            filter === "completed"
              ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
              : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          Completed ({completed.length})
        </button>
      </div>

      {/* Pending Assessments */}
      {(filter === "all" || filter === "pending") && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-foreground tracking-tight">
            Pending Tests ({pending.length})
          </h3>

          {pending.length === 0 ? (
            <EmptyState
              icon={ClipboardCheckIcon}
              title="All caught up!"
              description="You have completed all pending assessments."
            />
          ) : (
            <div className="space-y-3">
              {pending.map((asmt) => (
                <div
                  key={asmt.id}
                  className="group relative overflow-hidden rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-5 transition-all duration-300 hover:border-primary/50 hover:shadow-xl"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="space-y-2 flex-1 min-w-0">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h4 className="text-base font-bold text-foreground truncate group-hover:text-primary transition-colors">
                          {asmt.title}
                        </h4>
                        {asmt.isRequired && (
                          <span className="inline-flex items-center rounded-full border border-rose-500/30 bg-rose-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-rose-400">
                            Required by Employer
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <Building2Icon className="size-3.5 text-primary/70 shrink-0" />
                        <span className="font-medium text-foreground/85">{asmt.companyName}</span>
                        <span>·</span>
                        <span>{asmt.internshipTitle}</span>
                      </p>

                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <span className="inline-flex items-center gap-1 rounded-lg border border-border/60 bg-muted/30 px-2 py-0.5 text-xs text-muted-foreground">
                          <ClockIcon className="size-3 text-primary shrink-0" />
                          {asmt.duration} mins
                        </span>
                        <span className="inline-flex items-center rounded-lg border border-border/60 bg-muted/30 px-2 py-0.5 text-xs text-muted-foreground">
                          {asmt.totalQuestions} questions
                        </span>
                        <span className="inline-flex items-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400">
                          Pass Benchmark: {asmt.passingScore}%
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-border/50">
                      <Button
                        size="sm"
                        onClick={() => setActiveAssessment(asmt.id)}
                        className="gap-2 rounded-xl font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20 w-full sm:w-auto"
                      >
                        <PlayIcon className="size-3.5" />
                        <span>Start Assessment</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Completed Assessments */}
      {(filter === "all" || filter === "completed") && (
        <div className="space-y-4 pt-2">
          <h3 className="text-base font-bold text-foreground tracking-tight">
            Completed Assessments ({completed.length})
          </h3>

          {completed.length === 0 ? (
            <EmptyState icon={CheckCircle2Icon} title="No completed assessments yet" />
          ) : (
            <div className="space-y-3">
              {completed.map((result) => (
                <div
                  key={result.id}
                  className="group relative overflow-hidden rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-5 transition-all duration-300 hover:border-emerald-500/40 hover:shadow-xl"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="space-y-2 flex-1 min-w-0">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h4 className="text-base font-bold text-foreground truncate">
                          {result.assessmentTitle}
                        </h4>
                        <span
                          className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                            result.passed
                              ? "border-emerald-500/30 bg-emerald-500/15 text-emerald-400"
                              : "border-rose-500/30 bg-rose-500/15 text-rose-400"
                          }`}
                        >
                          {result.passed ? <CheckIcon className="size-3" /> : <XCircleIcon className="size-3" />}
                          {result.passed ? "Passed & Certified" : "Failed"}
                        </span>
                      </div>

                      <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <Building2Icon className="size-3.5 text-primary/70 shrink-0" />
                        <span>{result.companyName}</span>
                        <span>·</span>
                        <span>{result.internshipTitle}</span>
                      </p>

                      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground pt-1">
                        <span>{result.attempted}/{result.totalQuestions} questions attempted</span>
                        <span>·</span>
                        <span className="text-emerald-400 font-semibold">{result.correct} correct</span>
                        <span>·</span>
                        <span>{formatDateTime(result.completedAt)}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-border/50">
                      <div className="text-right">
                        <span className="text-2xl font-extrabold text-foreground">{result.percentage}%</span>
                        <div className="h-1.5 w-24 rounded-full bg-muted/40 overflow-hidden mt-1">
                          <div
                            className={`h-full rounded-full ${result.passed ? "bg-emerald-500" : "bg-rose-500"}`}
                            style={{ width: `${result.percentage}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        <AwardIcon className="size-5" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
