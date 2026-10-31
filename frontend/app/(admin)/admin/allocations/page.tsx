"use client";

import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { ScoreCircle } from "@/components/common/ScoreBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LinkButton } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckIcon,
  XIcon,
  Loader2Icon,
  PlayIcon,
  CpuIcon,
  ShieldCheckIcon,
  SparklesIcon,
  Building2Icon,
  GraduationCapIcon,
  CalendarIcon,
  ArrowRightIcon
} from "lucide-react";
import { mockAllocations } from "@/data/allocations";
import { runSmartAllocation } from "@/services/allocationService";
import { formatDate } from "@/lib/formatters";
import { cn } from "@/lib/utils";

const STEPS = [
  "Preparing and indexing applicant pool",
  "Checking eligibility & domicile criteria",
  "Calculating multi-vector AI match scores",
  "Applying affirmative action & reservation quotas",
  "Optimising national allocation (Gale-Shapley)",
  "Generating final allotment orders & audit log",
];

export default function AdminAllocationsPage() {
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");

  const recommended = mockAllocations.filter((a) => a.status === "Recommended");
  const pending = mockAllocations.filter((a) => a.status === "Pending");
  const approved = mockAllocations.filter((a) => a.status === "Approved");
  const rejected = mockAllocations.filter((a) => a.status === "Rejected");

  async function handleRun() {
    setRunning(true);
    setDone(false);
    setProgress(0);
    await runSmartAllocation((step, pct) => {
      setCurrentStep(step);
      setProgress(pct);
    });
    setRunning(false);
    setDone(true);
  }

  const completedSteps = STEPS.filter((_, i) =>
    progress >= Math.round(((i + 1) / STEPS.length) * 100)
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Smart Allocation Engine"
        description="Run AI-driven matching and affirmative action quotas for nationwide placement."
      >
        <Button
          onClick={handleRun}
          disabled={running}
          size="sm"
          className="gap-2 rounded-xl font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20"
        >
          {running ? <Loader2Icon className="size-4 animate-spin" /> : <PlayIcon className="size-4" />}
          {running ? "Executing LP Engine…" : "Run Smart Allocation"}
        </Button>
      </PageHeader>

      {/* National Command Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent p-6 shadow-xl shadow-primary/5 backdrop-blur-md">
        <div className="absolute -right-10 -top-10 size-48 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-md">
              <CpuIcon className="size-3.5 text-primary" />
              <span>Gale-Shapley Stable Marriage & LP Optimizer v4.1</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Automated Merit & Policy-Compliant Allocation
            </h2>
            <p className="max-w-2xl text-xs sm:text-sm text-muted-foreground leading-relaxed">
              InternAI balances student career aspirations, corporate prerequisite thresholds, affirmative action reservations, and geographic preferences into mathematically optimal assignments.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-400">
              <ShieldCheckIcon className="size-3.5" />
              100% Deterministic & Auditable
            </span>
          </div>
        </div>
      </div>

      {/* Run Progress Card */}
      {(running || done) && (
        <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-foreground">Solver Progress & Verification Pipeline</h3>
            <span className="font-mono text-xs font-bold text-primary">{progress}% Complete</span>
          </div>

          <div className="space-y-2.5">
            {STEPS.map((step, i) => {
              const completed = completedSteps.includes(step);
              const active = currentStep === step && running;

              return (
                <div key={step} className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all",
                      completed
                        ? "bg-emerald-500 text-white"
                        : active
                        ? "bg-primary text-primary-foreground animate-pulse"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {completed ? <CheckIcon className="size-3.5" /> : i + 1}
                  </div>
                  <span
                    className={cn(
                      "text-xs sm:text-sm",
                      completed
                        ? "text-emerald-500 dark:text-emerald-400 font-semibold"
                        : active
                        ? "text-primary font-semibold"
                        : "text-muted-foreground"
                    )}
                  >
                    {step}
                  </span>
                  {active && <Loader2Icon className="size-3.5 animate-spin text-primary ml-auto" />}
                </div>
              );
            })}
          </div>

          <div className="space-y-1.5 pt-2">
            <div className="h-2 w-full rounded-full bg-muted/40 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-emerald-400 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {done && (
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
              <p className="text-sm font-semibold text-emerald-400">
                ✅ Optimization run completed! {mockAllocations.length} allocations generated with a 98.6% fairness index.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tabs */}
      <Tabs defaultValue="pending" className="w-full space-y-4">
        <TabsList className="bg-muted/50 p-1 rounded-2xl border border-border/60">
          <TabsTrigger value="recommended" className="rounded-xl text-xs font-semibold">
            Recommended ({recommended.length})
          </TabsTrigger>
          <TabsTrigger value="pending" className="rounded-xl text-xs font-semibold">
            Pending Approval ({pending.length})
          </TabsTrigger>
          <TabsTrigger value="approved" className="rounded-xl text-xs font-semibold">
            Approved ({approved.length})
          </TabsTrigger>
          <TabsTrigger value="rejected" className="rounded-xl text-xs font-semibold">
            Rejected ({rejected.length})
          </TabsTrigger>
        </TabsList>

        {(["recommended", "pending", "approved", "rejected"] as const).map((tab) => {
          const data = { recommended, pending, approved, rejected }[tab];

          return (
            <TabsContent key={tab} value={tab} className="space-y-3">
              {data.length === 0 ? (
                <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/70 dark:bg-[#0e1322]/70 p-8 text-center text-sm text-muted-foreground">
                  No {tab} allocations currently found.
                </div>
              ) : (
                data.map((al) => (
                  <div
                    key={al.id}
                    className="group relative overflow-hidden rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-5 transition-all duration-300 hover:border-primary/40 hover:shadow-xl"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      {/* Left info */}
                      <div className="space-y-2 min-w-0 flex-1">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <h4 className="text-base font-bold text-foreground truncate group-hover:text-primary transition-colors">
                            {al.studentName}
                          </h4>
                          <StatusBadge status={al.status} />
                          <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
                            {al.workMode}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1 font-semibold text-foreground/80">
                            <GraduationCapIcon className="size-3.5 text-primary shrink-0" />
                            {al.internshipTitle}
                          </span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <Building2Icon className="size-3.5 text-primary/70 shrink-0" />
                            {al.companyName}
                          </span>
                          <span>·</span>
                          <span>{al.location}</span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <CalendarIcon className="size-3.5 shrink-0" />
                            {formatDate(al.startDate)}
                          </span>
                        </div>
                      </div>

                      {/* Right actions */}
                      <div className="flex items-center justify-between lg:justify-end gap-3 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-border/50">
                        <div className="flex items-center gap-2">
                          <ScoreCircle score={al.matchScore} size="sm" />
                          <div className="text-left hidden sm:block">
                            <span className="text-[10px] text-muted-foreground block">Fit</span>
                            <span className="text-xs font-bold text-foreground">{al.matchScore}%</span>
                          </div>
                        </div>

                        {(tab === "recommended" || tab === "pending") && (
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              className="gap-1 rounded-xl font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm"
                            >
                              <CheckIcon className="size-3.5" />
                              <span>Approve</span>
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              className="gap-1 rounded-xl font-semibold"
                            >
                              <XIcon className="size-3.5" />
                              <span>Reject</span>
                            </Button>
                          </div>
                        )}

                        <LinkButton
                          href={`/admin/allocations/${al.id}`}
                          variant="outline"
                          size="sm"
                          className="rounded-xl border-border/80 hover:bg-muted/50"
                        >
                          Details
                        </LinkButton>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
