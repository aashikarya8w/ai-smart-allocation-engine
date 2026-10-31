"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  BriefcaseIcon,
  SparklesIcon,
  AwardIcon,
  ClipboardListIcon,
  TargetIcon,
  FlaskConicalIcon,
  ClipboardCheckIcon,
  TrendingUpIcon,
  CheckCircle2Icon,
  CircleIcon,
  ChevronRightIcon,
  CodeIcon,
  LayersIcon,
  DatabaseIcon,
  PaletteIcon,
  ArrowRightIcon,
  MessageSquareIcon,
  MapPinIcon,
  CalendarIcon,
  BotIcon,
  BellIcon,
  CheckIcon,
  ZapIcon,
  DollarSignIcon,
  ClockIcon,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/common/StatusBadge";
import { ScoreCircle, ScoreBar } from "@/components/common/ScoreBar";
import { EmptyState } from "@/components/common/EmptyState";
import { LinkButton } from "@/components/ui/button";
import { useStudent } from "@/hooks/useStudent";
import { useNotifications } from "@/hooks/useNotifications";
import { formatDate, formatRelativeTime, formatStipendRange } from "@/lib/formatters";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function StudentDashboardPage() {
  const { student, stats, applications, recommendations, activeAllocation, readinessProfiles } = useStudent();
  const { notifications } = useNotifications();
  const [contactSuccess, setContactSuccess] = useState(false);

  // Breakdown of readiness
  const readiness = readinessProfiles[0]?.breakdown || {
    skillReadiness: 78,
    assessmentReadiness: 75,
    projectReadiness: 70,
    overallReadiness: 72,
  };

  // Sparkline data curves (SVG paths)
  const sparklines = {
    applications: "M 0 25 Q 25 15, 50 20 T 100 5",
    recommendations: "M 0 28 Q 30 22, 60 12 T 100 4",
    shortlisted: "M 0 18 Q 35 18, 70 18 T 100 18",
    allocated: "M 0 30 Q 35 25, 65 10 T 100 2",
    matchScore: "M 0 26 Q 30 18, 60 10 T 100 4",
    suitability: "M 0 24 Q 30 14, 60 12 T 100 6",
    readinessCurve: "M 0 28 Q 35 20, 70 12 T 100 8",
    assessments: "M 0 20 Q 35 15, 70 10 T 100 5",
  };

  // Application status counts for Donut Chart
  const statusCounts = useMemo(() => {
    const allocated = applications.filter((a) => a.status === "Allocated").length || 1;
    const shortlisted = applications.filter((a) => a.status === "Shortlisted").length || 1;
    const inReview = applications.filter((a) => ["Applied", "Under Review", "Screening"].includes(a.status)).length || 2;
    const rejected = applications.filter((a) => a.status === "Rejected").length || 0;
    const total = allocated + shortlisted + inReview + rejected;
    return { allocated, shortlisted, inReview, rejected, total: total || 4 };
  }, [applications]);

  if (!student) {
    return (
      <EmptyState
        title="Profile not found"
        description="Please complete your profile setup."
      />
    );
  }

  // Profile completion checklist
  const profileSteps = [
    { label: "Basic Details", completed: true },
    { label: "Academic Details", completed: true },
    { label: "Resume Upload", completed: true },
    { label: "Skills & Projects", completed: (student.skills?.length ?? 0) > 2 },
    { label: "Preferences", completed: (student.preferredLocations?.length ?? 0) > 0 },
  ];

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-300">
      
      {/* ─────────────────────────────────────────────────────────────
          1. WELCOME HEADER (Matching Reference Image 2)
          ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
            Welcome back, <span className="bg-gradient-to-r from-primary via-orange-400 to-amber-400 bg-clip-text text-transparent">{student.fullName}</span> 👋
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground font-medium">
            Continue your internship journey and build your career today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <LinkButton
            href={ROUTES.student.internships}
            className="rounded-xl shadow-[0_0_20px_var(--theme-glow)] bg-gradient-to-r from-primary to-orange-500 hover:scale-105 transition-all text-xs font-bold"
          >
            <span>Browse Internships</span>
            <ArrowRightIcon className="size-3.5 ml-1" />
          </LinkButton>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. HERO FEATURE BANNER (Matching Reference Image 2 Banner)
          ───────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-r from-primary/20 via-primary/10 to-purple-900/20 p-6 sm:p-8 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.35)]">
        {/* Ambient background aura */}
        <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-primary/25 blur-3xl" />
        <div className="pointer-events-none absolute right-1/4 -bottom-20 size-60 rounded-full bg-purple-500/20 blur-3xl" />

        <div className="relative z-10 grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-3 py-1 text-xs font-bold text-primary shadow-[0_0_12px_var(--theme-glow)]">
              <SparklesIcon className="size-3.5 animate-pulse" />
              <span>AI-Powered Internship Matching</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
              Launch Your Dream Career with Precision AI
            </h2>
            <p className="max-w-xl text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Get personalized internship recommendations, track your real-time progress and build a successful corporate career with InternAI.
            </p>
            <div className="pt-1 flex flex-wrap gap-3">
              <LinkButton
                href={ROUTES.student.internships}
                size="sm"
                className="rounded-xl bg-primary text-primary-foreground font-bold shadow-[0_0_18px_var(--theme-glow)]"
              >
                <span>Browse Internships</span>
                <ArrowRightIcon className="size-3.5 ml-1" />
              </LinkButton>
              <LinkButton
                href={ROUTES.student.recommendations}
                variant="outline"
                size="sm"
                className="rounded-xl border-border/80 dark:border-white/15 dark:bg-white/[0.04]"
              >
                <span>View Recommendations</span>
              </LinkButton>
            </div>
          </div>

          {/* Right Highlights Badge Grid */}
          <div className="flex flex-col gap-2.5 lg:col-span-4 lg:items-end">
            <div className="flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-bold text-emerald-500 dark:text-emerald-400 backdrop-blur-md shadow-sm w-fit">
              <CheckCircle2Icon className="size-4 shrink-0" />
              <span>AI Smart Match Engine</span>
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-bold text-primary backdrop-blur-md shadow-sm w-fit">
              <CheckCircle2Icon className="size-4 shrink-0" />
              <span>Skill Gap Analysis Twin</span>
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-xs font-bold text-purple-400 backdrop-blur-md shadow-sm w-fit">
              <CheckCircle2Icon className="size-4 shrink-0" />
              <span>Real-Time Quota Allocation</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. ROW 1: CORE ACTIVITY METRICS (Applications, Recommendations, Shortlisted, Allocated)
          ───────────────────────────────────────────────────────────── */}
      <div>
        <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground mb-3">
          Internship Activity Overview
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Card 1: Applications */}
          <Link href={ROUTES.student.applications} className="block group">
            <Card className="relative overflow-hidden rounded-2xl border border-border/80 bg-card/90 p-5 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-[0_8px_30px_var(--theme-glow)] hover:-translate-y-1">
              <div className="flex items-start justify-between gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-purple-500/15 text-purple-400 border border-purple-500/25">
                  <ClipboardListIcon className="size-5" />
                </div>
                <div className="w-24 h-9">
                  <svg viewBox="0 0 100 32" className="w-full h-full stroke-purple-400 fill-none stroke-2">
                    <path d={sparklines.applications} strokeLinecap="round" />
                  </svg>
                </div>
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground font-mono">
                    Applications
                  </p>
                  <p className="text-3xl font-black tabular-nums tracking-tight text-foreground">
                    {stats.applicationsCount}
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-500 dark:text-emerald-400 flex items-center gap-0.5">
                  ↑ +33%
                </span>
              </div>
            </Card>
          </Link>

          {/* Card 2: Recommendations */}
          <Link href={ROUTES.student.recommendations} className="block group">
            <Card className="relative overflow-hidden rounded-2xl border border-border/80 bg-card/90 p-5 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-[0_8px_30px_var(--theme-glow)] hover:-translate-y-1">
              <div className="flex items-start justify-between gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-400 border border-blue-500/25">
                  <SparklesIcon className="size-5" />
                </div>
                <div className="w-24 h-9">
                  <svg viewBox="0 0 100 32" className="w-full h-full stroke-blue-400 fill-none stroke-2">
                    <path d={sparklines.recommendations} strokeLinecap="round" />
                  </svg>
                </div>
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground font-mono">
                    Recommendations
                  </p>
                  <p className="text-3xl font-black tabular-nums tracking-tight text-foreground">
                    {stats.recommendationsCount}
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-500 dark:text-emerald-400 flex items-center gap-0.5">
                  ↑ +25%
                </span>
              </div>
            </Card>
          </Link>

          {/* Card 3: Shortlisted */}
          <Link href={ROUTES.student.applications} className="block group">
            <Card className="relative overflow-hidden rounded-2xl border border-border/80 bg-card/90 p-5 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-[0_8px_30px_var(--theme-glow)] hover:-translate-y-1">
              <div className="flex items-start justify-between gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-400 border border-amber-500/25">
                  <BriefcaseIcon className="size-5" />
                </div>
                <div className="w-24 h-9">
                  <svg viewBox="0 0 100 32" className="w-full h-full stroke-amber-400 fill-none stroke-2">
                    <path d={sparklines.shortlisted} strokeLinecap="round" />
                  </svg>
                </div>
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground font-mono">
                    Shortlisted
                  </p>
                  <p className="text-3xl font-black tabular-nums tracking-tight text-foreground">
                    {stats.shortlistedCount}
                  </p>
                </div>
                <span className="text-xs font-bold text-muted-foreground flex items-center gap-0.5">
                  — Stable
                </span>
              </div>
            </Card>
          </Link>

          {/* Card 4: Allocated */}
          <Link href={ROUTES.student.allocations} className="block group">
            <Card className="relative overflow-hidden rounded-2xl border border-border/80 bg-card/90 p-5 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-[0_8px_30px_var(--theme-glow)] hover:-translate-y-1">
              <div className="flex items-start justify-between gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                  <AwardIcon className="size-5" />
                </div>
                <div className="w-24 h-9">
                  <svg viewBox="0 0 100 32" className="w-full h-full stroke-emerald-400 fill-none stroke-2">
                    <path d={sparklines.allocated} strokeLinecap="round" />
                  </svg>
                </div>
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground font-mono">
                    Allocated
                  </p>
                  <p className="text-3xl font-black tabular-nums tracking-tight text-foreground">
                    {stats.allocationsCount}
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-500 dark:text-emerald-400 flex items-center gap-0.5">
                  ↑ Confirmed
                </span>
              </div>
            </Card>
          </Link>

        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. ROW 2: ORIGINAL AI INTELLIGENCE SCORES ROW (Restored & Enhanced!)
          ───────────────────────────────────────────────────────────── */}
      <div>
        <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground mb-3">
          AI Evaluation & Twin Scores
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* AI Score 1: Top Match Score */}
          <Link href={ROUTES.student.recommendations} className="block group">
            <Card className="relative overflow-hidden rounded-2xl border border-border/80 bg-card/90 p-5 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-[0_8px_30px_var(--theme-glow)] hover:-translate-y-1">
              <div className="flex items-start justify-between gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/15 text-primary border border-primary/25 shadow-[0_0_12px_var(--theme-glow)]">
                  <SparklesIcon className="size-5" />
                </div>
                <div className="w-24 h-9">
                  <svg viewBox="0 0 100 32" className="w-full h-full stroke-orange-400 fill-none stroke-2">
                    <path d={sparklines.matchScore} strokeLinecap="round" />
                  </svg>
                </div>
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground font-mono">
                    Top Match Score
                  </p>
                  <p className="text-3xl font-black tabular-nums tracking-tight text-foreground">
                    {stats.topMatchScore}%
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-500 dark:text-emerald-400 flex items-center gap-0.5">
                  ↑ Increasing
                </span>
              </div>
            </Card>
          </Link>

          {/* AI Score 2: Job Suitability */}
          <Link href={ROUTES.student.suitability} className="block group">
            <Card className="relative overflow-hidden rounded-2xl border border-border/80 bg-card/90 p-5 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-[0_8px_30px_var(--theme-glow)] hover:-translate-y-1">
              <div className="flex items-start justify-between gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/25">
                  <TargetIcon className="size-5" />
                </div>
                <div className="w-24 h-9">
                  <svg viewBox="0 0 100 32" className="w-full h-full stroke-cyan-400 fill-none stroke-2">
                    <path d={sparklines.suitability} strokeLinecap="round" />
                  </svg>
                </div>
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground font-mono">
                    Job Suitability
                  </p>
                  <p className="text-3xl font-black tabular-nums tracking-tight text-foreground">
                    {stats.topSuitability}%
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-500 dark:text-emerald-400 flex items-center gap-0.5">
                  ↑ Increasing
                </span>
              </div>
            </Card>
          </Link>

          {/* AI Score 3: Readiness Twin */}
          <Link href={ROUTES.student.readiness} className="block group">
            <Card className="relative overflow-hidden rounded-2xl border border-border/80 bg-card/90 p-5 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-[0_8px_30px_var(--theme-glow)] hover:-translate-y-1">
              <div className="flex items-start justify-between gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/25">
                  <FlaskConicalIcon className="size-5" />
                </div>
                <div className="w-24 h-9">
                  <svg viewBox="0 0 100 32" className="w-full h-full stroke-indigo-400 fill-none stroke-2">
                    <path d={sparklines.readinessCurve} strokeLinecap="round" />
                  </svg>
                </div>
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground font-mono">
                    Readiness Twin
                  </p>
                  <p className="text-3xl font-black tabular-nums tracking-tight text-foreground">
                    {stats.currentReadiness}%
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-500 dark:text-emerald-400 flex items-center gap-0.5">
                  ↑ Increasing
                </span>
              </div>
            </Card>
          </Link>

          {/* AI Score 4: Assessments Passed */}
          <Link href={ROUTES.student.assessments} className="block group">
            <Card className="relative overflow-hidden rounded-2xl border border-border/80 bg-card/90 p-5 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-[0_8px_30px_var(--theme-glow)] hover:-translate-y-1">
              <div className="flex items-start justify-between gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                  <ClipboardCheckIcon className="size-5" />
                </div>
                <div className="w-24 h-9">
                  <svg viewBox="0 0 100 32" className="w-full h-full stroke-emerald-400 fill-none stroke-2">
                    <path d={sparklines.assessments} strokeLinecap="round" />
                  </svg>
                </div>
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground font-mono">
                    Assessments Passed
                  </p>
                  <p className="text-3xl font-black tabular-nums tracking-tight text-foreground">
                    {stats.assessmentsPassed}
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-500 dark:text-emerald-400 flex items-center gap-0.5">
                  ↑ Increasing
                </span>
              </div>
            </Card>
          </Link>

        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          5. MIDDLE ROW: ALLOCATION + DONUT STATUS + PROFILE GAUGE (3 Columns)
          ───────────────────────────────────────────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-3">
        
        {/* Card A: Current Allocation (Left Column) */}
        <Card className="rounded-3xl border border-border/80 bg-card/90 p-6 backdrop-blur-xl shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-border/60 pb-3 dark:border-white/10">
              <div className="flex items-center gap-2">
                <BriefcaseIcon className="size-4 text-primary" />
                <h3 className="text-sm font-bold text-foreground">Current Allocation</h3>
              </div>
              <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 text-[11px] font-bold text-emerald-500 dark:text-emerald-400">
                Allocated
              </span>
            </div>

            {activeAllocation ? (
              <div className="mt-4 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-extrabold text-foreground text-base tracking-tight">
                      {activeAllocation.internshipTitle}
                    </h4>
                    <p className="text-xs font-semibold text-primary mt-0.5">
                      {activeAllocation.companyName}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPinIcon className="size-3 text-muted-foreground" />
                        {activeAllocation.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <CalendarIcon className="size-3 text-muted-foreground" />
                        {formatDate(activeAllocation.startDate)} – {formatDate(activeAllocation.endDate)}
                      </span>
                    </div>
                  </div>
                  <div className="shrink-0 flex flex-col items-center">
                    <ScoreCircle score={activeAllocation.matchScore} size="sm" />
                    <span className="text-[10px] font-mono text-muted-foreground mt-0.5">Match</span>
                  </div>
                </div>

                {/* Score Breakdown Progress Bars */}
                <div className="space-y-2.5 pt-1">
                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-muted-foreground">Skill Match</span>
                      <span className="font-bold text-foreground">{activeAllocation.scoreBreakdown.skillMatch}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted/60 overflow-hidden dark:bg-white/[0.06]">
                      <div className="h-full rounded-full bg-emerald-500 transition-all duration-500" style={{ width: `${activeAllocation.scoreBreakdown.skillMatch}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-muted-foreground">Qualification</span>
                      <span className="font-bold text-foreground">{activeAllocation.scoreBreakdown.qualification}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted/60 overflow-hidden dark:bg-white/[0.06]">
                      <div className="h-full rounded-full bg-emerald-500 transition-all duration-500" style={{ width: `${activeAllocation.scoreBreakdown.qualification}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-muted-foreground">Location</span>
                      <span className="font-bold text-foreground">{activeAllocation.scoreBreakdown.location}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted/60 overflow-hidden dark:bg-white/[0.06]">
                      <div className="h-full rounded-full bg-emerald-500 transition-all duration-500" style={{ width: `${activeAllocation.scoreBreakdown.location}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-muted-foreground">
                No active allocation yet. Continue applying!
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="mt-5 grid grid-cols-2 gap-2 pt-3 border-t border-border/50 dark:border-white/10">
            <LinkButton
              href={activeAllocation ? `${ROUTES.student.allocations}/${activeAllocation.id}` : ROUTES.student.internships}
              variant="outline"
              size="sm"
              className="rounded-xl text-xs font-bold"
            >
              View Full Details
            </LinkButton>
            <button
              type="button"
              onClick={() => {
                setContactSuccess(true);
                setTimeout(() => setContactSuccess(false), 2500);
              }}
              className="rounded-xl bg-gradient-to-r from-primary to-orange-500 text-white font-bold text-xs py-2 px-3 shadow-[0_0_12px_var(--theme-glow)] transition-all hover:scale-[1.02] flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <MessageSquareIcon className="size-3.5" />
              <span>{contactSuccess ? "Message Sent!" : "Contact Supervisor"}</span>
            </button>
          </div>
        </Card>

        {/* Card B: Application Status Overview - Interactive SVG Donut Chart (Center Column) */}
        <Card className="rounded-3xl border border-border/80 bg-card/90 p-6 backdrop-blur-xl shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-border/60 pb-3 dark:border-white/10">
              <div className="flex items-center gap-2">
                <ClipboardCheckIcon className="size-4 text-primary" />
                <h3 className="text-sm font-bold text-foreground">Application Status Overview</h3>
              </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row items-center justify-around gap-6">
              {/* Donut Chart SVG */}
              <div className="relative size-36 shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="size-full -rotate-90">
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="currentColor" strokeWidth="12" className="text-muted/40 dark:text-white/[0.04]" />
                  <circle
                    cx="50" cy="50" r="40" fill="transparent"
                    stroke="#10b981" strokeWidth="12"
                    strokeDasharray="251.2"
                    strokeDashoffset="200"
                    strokeLinecap="round"
                    className="transition-all duration-700 hover:opacity-90"
                  />
                  <circle
                    cx="50" cy="50" r="40" fill="transparent"
                    stroke="#3b82f6" strokeWidth="12"
                    strokeDasharray="251.2"
                    strokeDashoffset="210"
                    transform="rotate(60 50 50)"
                    strokeLinecap="round"
                    className="transition-all duration-700 hover:opacity-90"
                  />
                  <circle
                    cx="50" cy="50" r="40" fill="transparent"
                    stroke="#a855f7" strokeWidth="12"
                    strokeDasharray="251.2"
                    strokeDashoffset="180"
                    transform="rotate(130 50 50)"
                    strokeLinecap="round"
                    className="transition-all duration-700 hover:opacity-90"
                  />
                </svg>

                {/* Inner Center Total Label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-black text-foreground tabular-nums">
                    {statusCounts.total}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground font-mono">
                    Total
                  </span>
                </div>
              </div>

              {/* Status Breakdown Legend */}
              <div className="space-y-2.5 w-full max-w-[160px]">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <span className="text-muted-foreground font-medium">Allocated</span>
                  </div>
                  <span className="font-bold text-foreground">({statusCounts.allocated})</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                    <span className="text-muted-foreground font-medium">Shortlisted</span>
                  </div>
                  <span className="font-bold text-foreground">({statusCounts.shortlisted})</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                    <span className="text-muted-foreground font-medium">In Review</span>
                  </div>
                  <span className="font-bold text-foreground">({statusCounts.inReview})</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                    <span className="text-muted-foreground font-medium">Rejected</span>
                  </div>
                  <span className="font-bold text-foreground">({statusCounts.rejected})</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-border/50 dark:border-white/10 text-center">
            <Link
              href={ROUTES.student.applications}
              className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
            >
              <span>Manage All Applications</span>
              <ArrowRightIcon className="size-3" />
            </Link>
          </div>
        </Card>

        {/* Card C: Profile Completion (Right Column) */}
        <Card className="rounded-3xl border border-border/80 bg-card/90 p-6 backdrop-blur-xl shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-border/60 pb-3 dark:border-white/10">
              <div className="flex items-center gap-2">
                <TargetIcon className="size-4 text-primary" />
                <h3 className="text-sm font-bold text-foreground">Profile Completion</h3>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-5">
              {/* Radial Progress Ring */}
              <div className="relative size-24 shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="size-full -rotate-90">
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="currentColor" strokeWidth="10" className="text-muted/40 dark:text-white/[0.04]" />
                  <circle
                    cx="50" cy="50" r="40" fill="transparent"
                    stroke="var(--theme-color, #ea580c)" strokeWidth="10"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 * (1 - student.profileCompletion / 100)}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-black text-foreground tabular-nums">
                    {student.profileCompletion}%
                  </span>
                </div>
              </div>

              {/* Checklist */}
              <div className="space-y-1.5 flex-1 min-w-0">
                {profileSteps.map((step) => (
                  <div key={step.label} className="flex items-center gap-2 text-xs">
                    {step.completed ? (
                      <CheckCircle2Icon className="size-3.5 text-emerald-500 shrink-0" />
                    ) : (
                      <CircleIcon className="size-3.5 text-muted-foreground/50 shrink-0" />
                    )}
                    <span className={cn(
                      "truncate",
                      step.completed ? "text-foreground font-medium" : "text-muted-foreground"
                    )}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-border/50 dark:border-white/10">
            <LinkButton
              href={ROUTES.student.profile}
              className="w-full rounded-xl bg-gradient-to-r from-primary to-orange-500 text-white font-bold text-xs py-2 shadow-[0_0_15px_var(--theme-glow)] hover:scale-[1.01] transition-all"
            >
              <span>Complete Profile</span>
              <ArrowRightIcon className="size-3.5 ml-1" />
            </LinkButton>
          </div>
        </Card>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          6. ROW 4: RECENT APPLICATIONS + TOP AI MATCH SCORE SPOTLIGHT (Restored Original Layout!)
          ───────────────────────────────────────────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-3">
        
        {/* Left (2 Columns on lg): Recent Applications */}
        <div className="lg:col-span-2">
          <Card className="rounded-3xl border border-border/80 bg-card/90 p-6 backdrop-blur-xl shadow-sm h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-border/60 pb-3 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <ClipboardListIcon className="size-4 text-primary" />
                  <h3 className="text-sm font-bold text-foreground">Recent Applications</h3>
                </div>
                <Link
                  href={ROUTES.student.applications}
                  className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-0.5"
                >
                  <span>View All</span>
                  <ArrowRightIcon className="size-3" />
                </Link>
              </div>

              <div className="mt-4 space-y-3">
                {applications.slice(0, 4).map((app, idx) => {
                  const Icon = idx === 0 ? CodeIcon : idx === 1 ? LayersIcon : idx === 2 ? DatabaseIcon : PaletteIcon;
                  const iconColor = idx === 0 ? "text-blue-400 bg-blue-500/15" : idx === 1 ? "text-emerald-400 bg-emerald-500/15" : idx === 2 ? "text-purple-400 bg-purple-500/15" : "text-amber-400 bg-amber-500/15";

                  return (
                    <div
                      key={app.id}
                      className="flex items-center justify-between gap-3 rounded-2xl border border-border/60 bg-muted/20 p-3.5 hover:border-primary/40 hover:bg-muted/40 transition-all dark:border-white/10 dark:bg-white/[0.02]"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={cn("size-9 shrink-0 rounded-xl flex items-center justify-center font-bold text-xs", iconColor)}>
                          <Icon className="size-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-xs text-foreground truncate">
                            {app.internshipTitle}
                          </p>
                          <p className="text-[11px] text-muted-foreground truncate">
                            {app.companyName} · {formatRelativeTime(app.appliedAt)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5 shrink-0">
                        <span className="text-xs font-bold font-mono text-foreground">
                          {app.matchScore}%
                        </span>
                        <StatusBadge status={app.status} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-border/50 dark:border-white/10 text-center">
              <Link
                href={ROUTES.student.applications}
                className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
              >
                <span>Track Application Lifecycles & Status Updates</span>
                <ArrowRightIcon className="size-3" />
              </Link>
            </div>
          </Card>
        </div>

        {/* Right (1 Column on lg): Top AI Match Score Spotlight (Original Component!) */}
        <div className="lg:col-span-1">
          <Link href={ROUTES.student.recommendations} className="block group h-full">
            <Card className="rounded-3xl border border-border/80 bg-card/90 p-6 backdrop-blur-xl shadow-sm h-full flex flex-col items-center justify-between text-center transition-all duration-300 hover:border-primary/50 hover:shadow-[0_10px_35px_var(--theme-glow)]">
              <div className="w-full">
                <div className="flex items-center justify-between border-b border-border/60 pb-3 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <SparklesIcon className="size-4 text-primary" />
                    <h3 className="text-sm font-bold text-foreground">Top AI Match Score</h3>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-500 uppercase">
                    Rank #1
                  </span>
                </div>

                <div className="mt-6 flex flex-col items-center justify-center">
                  <div className="relative p-3 rounded-full border border-primary/20 bg-primary/5 shadow-[0_0_25px_var(--theme-glow)]">
                    <ScoreCircle score={stats.topMatchScore} size="lg" />
                  </div>
                  <h4 className="mt-4 font-black text-base text-foreground">
                    Best Match Identified
                  </h4>
                  <p className="mt-1 text-xs text-muted-foreground max-w-[200px] leading-relaxed">
                    Your skills, branch & preferences align with top candidate criteria.
                  </p>
                </div>
              </div>

              <div className="mt-6 w-full pt-3 border-t border-border/50 dark:border-white/10">
                <div className="w-full rounded-xl border border-border/70 bg-muted/40 py-2 px-3 text-xs font-bold text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all flex items-center justify-center gap-1.5 dark:border-white/10 dark:bg-white/[0.04]">
                  <span>Explore All Matching Internships</span>
                  <ArrowRightIcon className="size-3.5" />
                </div>
              </div>
            </Card>
          </Link>
        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          7. ROW 5: TOP AI RECOMMENDATIONS LIST (Restored Full Original Feature!)
          ───────────────────────────────────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <SparklesIcon className="size-4 text-primary" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground font-mono">
              Top AI Recommendations For You
            </h3>
          </div>
          <Link
            href={ROUTES.student.recommendations}
            className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
          >
            <span>View All ({recommendations.length})</span>
            <ArrowRightIcon className="size-3" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recommendations.slice(0, 3).map((rec) => (
            <Card
              key={rec.id}
              className="rounded-3xl border border-border/80 bg-card/90 p-5 backdrop-blur-xl shadow-sm flex flex-col justify-between hover:border-primary/50 hover:shadow-[0_8px_30px_var(--theme-glow)] transition-all duration-300"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary">
                      {rec.companyName}
                    </span>
                    <h4 className="font-extrabold text-sm text-foreground leading-tight mt-0.5">
                      {rec.internshipTitle}
                    </h4>
                    <p className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1">
                      <MapPinIcon className="size-3 text-muted-foreground/70" />
                      {rec.location} · {rec.workMode}
                    </p>
                  </div>
                  <div className="shrink-0">
                    <ScoreCircle score={rec.matchScore} size="sm" />
                  </div>
                </div>

                {/* Tech stack / matching reasons tags */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {rec.matchReasons.slice(0, 3).map((reason) => (
                    <span
                      key={reason}
                      className="rounded-lg bg-card border border-border/70 px-2 py-0.5 text-[10px] font-medium text-foreground/90 dark:bg-white/[0.04] dark:border-white/10"
                    >
                      {reason.split(" ")[0]}
                    </span>
                  ))}
                </div>

                <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-border/40 dark:border-white/5">
                  <span className="font-bold text-foreground font-mono flex items-center gap-1">
                    <DollarSignIcon className="size-3 text-emerald-500" />
                    {formatStipendRange(rec.stipendMin, rec.stipendMax)}
                  </span>
                  <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                    <ClockIcon className="size-3" />
                    {rec.duration}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-border/50 dark:border-white/10">
                <LinkButton
                  href={`${ROUTES.student.internships}/${rec.internshipId}`}
                  className="w-full rounded-xl bg-gradient-to-r from-primary to-orange-500 text-white font-bold text-xs py-2 shadow-[0_0_12px_var(--theme-glow)] hover:scale-[1.01] transition-all"
                >
                  <span>Apply Now</span>
                  <ArrowRightIcon className="size-3.5 ml-1" />
                </LinkButton>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          8. ROW 6: READINESS TWIN + AI TOOLS + NOTIFICATIONS (3 Columns)
          ───────────────────────────────────────────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-3">
        
        {/* Column 1: Readiness Progress (Matching Reference Image 2) */}
        <Card className="rounded-3xl border border-border/80 bg-card/90 p-6 backdrop-blur-xl shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-border/60 pb-3 dark:border-white/10">
              <div className="flex items-center gap-2">
                <TrendingUpIcon className="size-4 text-primary" />
                <h3 className="text-sm font-bold text-foreground">Readiness Progress</h3>
              </div>
              <Link
                href={ROUTES.student.readiness}
                className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-0.5"
              >
                <span>Twin Hub</span>
                <ArrowRightIcon className="size-3" />
              </Link>
            </div>

            <div className="mt-4 space-y-3.5">
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-foreground font-semibold flex items-center gap-1.5">
                    <TargetIcon className="size-3.5 text-purple-400" />
                    Overall Readiness
                  </span>
                  <span className="font-bold text-purple-400 font-mono">{readiness.overallReadiness}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted/60 overflow-hidden dark:bg-white/[0.06]">
                  <div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500" style={{ width: `${readiness.overallReadiness}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-foreground font-semibold flex items-center gap-1.5">
                    <CodeIcon className="size-3.5 text-blue-400" />
                    Technical Skills
                  </span>
                  <span className="font-bold text-blue-400 font-mono">{readiness.skillReadiness}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted/60 overflow-hidden dark:bg-white/[0.06]">
                  <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" style={{ width: `${readiness.skillReadiness}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-foreground font-semibold flex items-center gap-1.5">
                    <LayersIcon className="size-3.5 text-emerald-400" />
                    Domain Knowledge
                  </span>
                  <span className="font-bold text-emerald-400 font-mono">{readiness.projectReadiness}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted/60 overflow-hidden dark:bg-white/[0.06]">
                  <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" style={{ width: `${readiness.projectReadiness}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-foreground font-semibold flex items-center gap-1.5">
                    <ClipboardCheckIcon className="size-3.5 text-amber-400" />
                    Assessment Mastery
                  </span>
                  <span className="font-bold text-amber-400 font-mono">{readiness.assessmentReadiness}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted/60 overflow-hidden dark:bg-white/[0.06]">
                  <div className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500" style={{ width: `${readiness.assessmentReadiness}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-border/50 dark:border-white/10 text-center">
            <Link
              href={ROUTES.student.whatIf}
              className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
            >
              <span>Simulate Improvements in What-If Engine</span>
              <ArrowRightIcon className="size-3" />
            </Link>
          </div>
        </Card>

        {/* Column 2: AI Analysis Tools (Original 5 Modules!) */}
        <Card className="rounded-3xl border border-border/80 bg-card/90 p-6 backdrop-blur-xl shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-border/60 pb-3 dark:border-white/10">
              <div className="flex items-center gap-2">
                <BotIcon className="size-4 text-primary" />
                <h3 className="text-sm font-bold text-foreground">AI Analysis Tools</h3>
              </div>
              <span className="text-[10px] font-mono text-muted-foreground font-bold uppercase">
                5 Tools
              </span>
            </div>

            <div className="mt-3.5 space-y-2">
              {[
                { label: "Skill Gap Analysis",   href: ROUTES.student.skillGap,      icon: TrendingUpIcon,     color: "text-purple-400 bg-purple-500/15" },
                { label: "Job Suitability",       href: ROUTES.student.suitability,   icon: TargetIcon,         color: "text-blue-400 bg-blue-500/15" },
                { label: "Readiness Twin",        href: ROUTES.student.readiness,     icon: FlaskConicalIcon,   color: "text-emerald-400 bg-emerald-500/15" },
                { label: "What-If Simulator",     href: ROUTES.student.whatIf,        icon: ZapIcon,            color: "text-amber-400 bg-amber-500/15" },
                { label: "Career Roadmap",        href: ROUTES.student.careerRoadmap, icon: AwardIcon,          color: "text-primary bg-primary/15" },
              ].map(({ label, href, icon: Icon, color }) => (
                <Link
                  key={label}
                  href={href}
                  className="group flex items-center justify-between gap-3 rounded-2xl border border-border/60 bg-muted/20 p-2.5 transition-all hover:border-primary/50 hover:bg-muted/40 hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/[0.02]"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={cn("size-8 shrink-0 rounded-xl flex items-center justify-center", color)}>
                      <Icon className="size-4" />
                    </div>
                    <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors truncate">
                      {label}
                    </span>
                  </div>
                  <ChevronRightIcon className="size-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-border/50 dark:border-white/10 text-center">
            <Link
              href={ROUTES.student.careerRoadmap}
              className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
            >
              <span>View Milestone Pathway</span>
              <ArrowRightIcon className="size-3" />
            </Link>
          </div>
        </Card>

        {/* Column 3: Recent Notifications (Original Component!) */}
        <Card className="rounded-3xl border border-border/80 bg-card/90 p-6 backdrop-blur-xl shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-border/60 pb-3 dark:border-white/10">
              <div className="flex items-center gap-2">
                <BellIcon className="size-4 text-primary" />
                <h3 className="text-sm font-bold text-foreground">Notifications</h3>
              </div>
              <Link
                href={ROUTES.student.notifications}
                className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-0.5"
              >
                <span>View All</span>
                <ArrowRightIcon className="size-3" />
              </Link>
            </div>

            <div className="mt-3.5 space-y-2.5">
              {notifications.length === 0 ? (
                <div className="py-8 text-center text-xs text-muted-foreground">
                  No new notifications.
                </div>
              ) : (
                notifications.slice(0, 4).map((n) => (
                  <div
                    key={n.id}
                    className={cn(
                      "flex items-start gap-2.5 rounded-2xl border p-2.5 transition-all",
                      n.isRead
                        ? "border-border/60 bg-muted/20 dark:border-white/10 dark:bg-white/[0.02]"
                        : "border-primary/30 bg-primary/5 dark:bg-primary/10 shadow-[0_0_12px_var(--theme-glow)]"
                    )}
                  >
                    <div className="mt-1 size-2 rounded-full bg-primary shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <p className="text-xs font-bold text-foreground truncate">
                          {n.title}
                        </p>
                        <span className="text-[10px] text-muted-foreground/70 shrink-0 font-mono">
                          {formatRelativeTime(n.createdAt)}
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">
                        {n.message}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-border/50 dark:border-white/10 text-center">
            <Link
              href={ROUTES.student.notifications}
              className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
            >
              <span>Manage Notification Preferences</span>
              <ArrowRightIcon className="size-3" />
            </Link>
          </div>
        </Card>

      </div>

    </div>
  );
}
