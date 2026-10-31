"use client";

import { PageHeader } from "@/components/common/PageHeader";
import { LinkButton } from "@/components/ui/button";
import { useAdmin } from "@/hooks/useAdmin";
import {
  BrainCircuitIcon,
  UsersIcon,
  BriefcaseIcon,
  PlayIcon,
  SlidersHorizontalIcon,
  SparklesIcon,
  LayersIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  BarChart3Icon
} from "lucide-react";
import { ROUTES } from "@/lib/constants";

export default function AIMatchingPage() {
  const { stats } = useAdmin();

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Matching & Ranking Engine"
        description="Configure and execute multi-vector semantic matching between candidates and enterprise positions."
      >
        <LinkButton
          href={ROUTES.admin.aiMatchingRun}
          size="sm"
          className="gap-2 rounded-xl font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20"
        >
          <PlayIcon className="size-4" /> Run Matching Engine
        </LinkButton>
      </PageHeader>

      {/* Cyber Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent p-6 shadow-xl shadow-primary/5 backdrop-blur-md">
        <div className="absolute -right-10 -top-10 size-48 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-md">
              <BrainCircuitIcon className="size-3.5 text-primary" />
              <span>Multi-Vector Semantic Engine v4.8</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Deep Semantic Alignment & Quota Optimization
            </h2>
            <p className="max-w-2xl text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Calculates cosine similarities between student skill vectors, verified code project taxonomies, and corporate job descriptions while strictly upholding affirmative action constraints.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-400">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              Engine Ready · Zero Bias Validated
            </span>
          </div>
        </div>
      </div>

      {/* Stat Cards with Sparklines */}
      <div className="grid gap-4 sm:grid-cols-3">
        {/* Candidates */}
        <div className="group relative overflow-hidden rounded-2xl border border-border/80 dark:border-white/10 bg-card/85 dark:bg-[#0e1322]/85 p-5 backdrop-blur-md transition-all hover:border-primary/50 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total Candidates</span>
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary/15 text-primary border border-primary/30">
              <UsersIcon className="size-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div className="text-3xl font-bold tracking-tight text-foreground">{stats.totalStudents || 12480}</div>
            <span className="text-xs font-semibold text-primary">↑ 100% Indexed</span>
          </div>
          <div className="mt-3 h-8 w-full">
            <svg className="h-full w-full overflow-visible" viewBox="0 0 100 25" preserveAspectRatio="none">
              <path d="M 0 20 Q 25 15 50 12 T 100 4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-primary" />
            </svg>
          </div>
        </div>

        {/* Listings */}
        <div className="group relative overflow-hidden rounded-2xl border border-border/80 dark:border-white/10 bg-card/85 dark:bg-[#0e1322]/85 p-5 backdrop-blur-md transition-all hover:border-emerald-500/50 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Active Internships</span>
            <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              <BriefcaseIcon className="size-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div className="text-3xl font-bold tracking-tight text-foreground">{stats.activeInternships || 842}</div>
            <span className="text-xs font-semibold text-emerald-400">↑ +15% Active</span>
          </div>
          <div className="mt-3 h-8 w-full">
            <svg className="h-full w-full overflow-visible" viewBox="0 0 100 25" preserveAspectRatio="none">
              <path d="M 0 18 Q 30 16 60 10 T 100 3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-emerald-500" />
            </svg>
          </div>
        </div>

        {/* Avg Match Score */}
        <div className="group relative overflow-hidden rounded-2xl border border-border/80 dark:border-white/10 bg-card/85 dark:bg-[#0e1322]/85 p-5 backdrop-blur-md transition-all hover:border-blue-500/50 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Avg Match Score</span>
            <div className="flex size-9 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400 border border-blue-500/30">
              <BrainCircuitIcon className="size-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div className="text-3xl font-bold tracking-tight text-foreground">{stats.averageMatchScore || 88}%</div>
            <span className="text-xs font-semibold text-blue-400">High Precision</span>
          </div>
          <div className="mt-3 h-8 w-full">
            <svg className="h-full w-full overflow-visible" viewBox="0 0 100 25" preserveAspectRatio="none">
              <path d="M 0 15 Q 35 12 70 8 T 100 2" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-blue-500" />
            </svg>
          </div>
        </div>
      </div>

      {/* 3 Core Action Modules */}
      <div className="grid gap-5 sm:grid-cols-3">
        <div className="group relative overflow-hidden rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 border border-primary/25 text-primary mb-4 shadow-sm group-hover:scale-105 transition-transform">
              <PlayIcon className="size-7" />
            </div>
            <h3 className="text-base font-bold text-foreground">Execute Matching Run</h3>
            <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
              Trigger the AI engine to generate fresh affinity scores and candidate rankings across all live internship cohorts.
            </p>
          </div>
          <LinkButton
            href={ROUTES.admin.aiMatchingRun}
            size="sm"
            className="mt-5 w-full gap-2 rounded-xl font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20"
          >
            <span>Start Matching Process</span>
            <ArrowRightIcon className="size-3.5" />
          </LinkButton>
        </div>

        <div className="group relative overflow-hidden rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex size-14 items-center justify-center rounded-2xl bg-blue-500/10 border border-blue-500/25 text-blue-400 mb-4 shadow-sm group-hover:scale-105 transition-transform">
              <BarChart3Icon className="size-7" />
            </div>
            <h3 className="text-base font-bold text-foreground">Inspect Match Results</h3>
            <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
              Explore candidate match rankings, score vector breakdowns, explainability charts, and quota compliance stats.
            </p>
          </div>
          <LinkButton
            href={ROUTES.admin.aiMatchingResults}
            variant="outline"
            size="sm"
            className="mt-5 w-full gap-2 rounded-xl border-border/80 hover:bg-muted/50"
          >
            <span>View Results Matrix</span>
            <ArrowRightIcon className="size-3.5" />
          </LinkButton>
        </div>

        <div className="group relative overflow-hidden rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex size-14 items-center justify-center rounded-2xl bg-purple-500/10 border border-purple-500/25 text-purple-400 mb-4 shadow-sm group-hover:scale-105 transition-transform">
              <SlidersHorizontalIcon className="size-7" />
            </div>
            <h3 className="text-base font-bold text-foreground">Matching Weights & Rules</h3>
            <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
              Tune algorithm weights for technical skill overlap, CGPA thresholds, location proximity, and social equity quotas.
            </p>
          </div>
          <LinkButton
            href={ROUTES.admin.rulesMatching}
            variant="outline"
            size="sm"
            className="mt-5 w-full gap-2 rounded-xl border-border/80 hover:bg-muted/50"
          >
            <span>Configure Engine Weights</span>
            <ArrowRightIcon className="size-3.5" />
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
