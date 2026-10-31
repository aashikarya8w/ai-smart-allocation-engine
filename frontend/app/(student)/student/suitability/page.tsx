"use client";

import { useState } from "react";
import {
  TargetIcon,
  TrendingUpIcon,
  CheckCircle2Icon,
  AlertCircleIcon,
  SparklesIcon,
  ShieldCheckIcon,
  Building2Icon,
  ArrowRightIcon,
  AwardIcon,
  HelpCircleIcon
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { ScoreBar, ScoreCircle } from "@/components/common/ScoreBar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/common/EmptyState";
import { mockSuitabilityResults } from "@/data/suitability";
import { useStudent } from "@/hooks/useStudent";
import { ROUTES } from "@/lib/constants";

const BREAKDOWN_LABELS: Record<string, string> = {
  skillMatch: "Technical Skill Coverage",
  assessmentScore: "Proctored Assessment Score",
  qualification: "Academic Degree Alignment",
  cgpa: "CGPA & Merit Standing",
  projects: "Verified Project Portfolios",
  experience: "Prior Internship Experience",
  interests: "Domain & Passion Match",
  preferences: "Personal Role Preferences",
  location: "Geographic Proximity",
  workMode: "Workplace Model Match",
};

export default function SuitabilityPage() {
  const { student } = useStudent();
  const rawResults = mockSuitabilityResults.filter((r) => r.studentId === student?.id);
  const results = rawResults.length > 0 ? rawResults : mockSuitabilityResults;
  const [selectedTab, setSelectedTab] = useState<string>(results[0]?.id || "");
  const topResult = results.length > 0 ? [...results].sort((a, b) => b.overallScore - a.overallScore)[0] : null;

  const avg =
    results.length > 0
      ? Math.round(results.reduce((s, r) => s + r.overallScore, 0) / results.length)
      : 0;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Job Suitability Diagnostics"
        description="Multi-factor evaluation analyzing your holistic preparation and success likelihood for each role."
      />

      {/* Cyber Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent p-6 shadow-xl shadow-primary/5 backdrop-blur-md">
        <div className="absolute -right-10 -top-10 size-48 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-md">
              <TargetIcon className="size-3.5 text-primary" />
              <span>Holistic Capability Model v4.0</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Deep Multi-Vector Candidate Alignment
            </h2>
            <p className="max-w-2xl text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Suitability assesses not just resume keywords, but your real-world readiness across 10 vital hiring dimensions, predicting high Day-1 performance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-400">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              Top Suitability: {topResult?.overallScore ?? 87}%
            </span>
          </div>
        </div>
      </div>

      {/* Modern Metric Cards with Sparklines */}
      <div className="grid gap-4 sm:grid-cols-3">
        {/* Analyzed */}
        <div className="group relative overflow-hidden rounded-2xl border border-border/80 dark:border-white/10 bg-card/85 dark:bg-[#0e1322]/85 p-5 backdrop-blur-md transition-all hover:border-primary/50 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Roles Analyzed</span>
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary/15 text-primary border border-primary/30">
              <TargetIcon className="size-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div className="text-3xl font-bold tracking-tight text-foreground">{results.length} Positions</div>
            <span className="text-xs font-semibold text-primary">✓ Complete</span>
          </div>
          <div className="mt-3 h-8 w-full">
            <svg className="h-full w-full overflow-visible" viewBox="0 0 100 25" preserveAspectRatio="none">
              <path d="M 0 16 Q 30 16 60 16 T 100 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-primary/60" />
            </svg>
          </div>
        </div>

        {/* Best Suitability */}
        <div
          onClick={() => topResult && setSelectedTab(topResult.id)}
          className="group cursor-pointer relative overflow-hidden rounded-2xl border border-border/80 dark:border-white/10 bg-card/85 dark:bg-[#0e1322]/85 p-5 backdrop-blur-md transition-all hover:border-emerald-500/50 hover:shadow-lg"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Peak Suitability</span>
            <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              <TrendingUpIcon className="size-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div className="text-3xl font-bold tracking-tight text-foreground">{topResult?.overallScore ?? 87}%</div>
            <span className="text-xs font-semibold text-emerald-400">↑ High Alignment</span>
          </div>
          <div className="mt-3 h-8 w-full">
            <svg className="h-full w-full overflow-visible" viewBox="0 0 100 25" preserveAspectRatio="none">
              <path d="M 0 20 Q 30 16 60 8 T 100 3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-emerald-500" />
            </svg>
          </div>
        </div>

        {/* Average */}
        <div className="group relative overflow-hidden rounded-2xl border border-border/80 dark:border-white/10 bg-card/85 dark:bg-[#0e1322]/85 p-5 backdrop-blur-md transition-all hover:border-blue-500/50 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Cohort Average</span>
            <div className="flex size-9 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400 border border-blue-500/30">
              <CheckCircle2Icon className="size-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div className="text-3xl font-bold tracking-tight text-foreground">{avg}%</div>
            <span className="text-xs font-semibold text-blue-400">Competitive Tier</span>
          </div>
          <div className="mt-3 h-8 w-full">
            <svg className="h-full w-full overflow-visible" viewBox="0 0 100 25" preserveAspectRatio="none">
              <path d="M 0 18 Q 35 14 70 9 T 100 4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-blue-500" />
            </svg>
          </div>
        </div>
      </div>

      {results.length === 0 ? (
        <EmptyState
          icon={TargetIcon}
          title="No suitability records found"
          description="Complete your student preferences and applications to generate job suitability diagnostics."
        />
      ) : (
        <Tabs value={selectedTab || results[0]?.id} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="bg-muted/50 p-1 rounded-2xl border border-border/60 flex-wrap h-auto gap-1">
            {results.map((r) => (
              <TabsTrigger
                key={r.id}
                value={r.id}
                className="rounded-xl text-xs font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground shadow-none"
              >
                {r.internshipTitle}
              </TabsTrigger>
            ))}
          </TabsList>

          {results.map((result) => (
            <TabsContent key={result.id} value={result.id} className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-3">
                {/* Score Circle Card */}
                <div className="flex flex-col items-center justify-center rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-6 text-center shadow-xl">
                  <ScoreCircle score={result.overallScore} size="xl" />
                  <h3 className="mt-4 text-base font-bold text-foreground">{result.internshipTitle}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{result.companyName}</p>
                  <span
                    className={`mt-3 inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${
                      result.overallScore >= 80
                        ? "border-emerald-500/30 bg-emerald-500/15 text-emerald-400"
                        : result.overallScore >= 60
                        ? "border-blue-500/30 bg-blue-500/15 text-blue-400"
                        : "border-amber-500/30 bg-amber-500/15 text-amber-400"
                    }`}
                  >
                    {result.overallScore >= 80
                      ? "Highly Suitable Candidate"
                      : result.overallScore >= 60
                      ? "Moderately Suitable"
                      : "Developing Suitability"}
                  </span>
                </div>

                {/* 10-Factor Breakdown */}
                <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-6 shadow-xl lg:col-span-2 space-y-4">
                  <div className="flex items-center justify-between border-b border-border/60 pb-3">
                    <h3 className="text-sm font-bold text-foreground">10-Factor Readiness Matrix</h3>
                    <span className="text-xs text-muted-foreground font-mono">Weighted Algorithm</span>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {Object.entries(result.breakdown).map(([key, val]) => (
                      <ScoreBar
                        key={key}
                        label={BREAKDOWN_LABELS[key] ?? key}
                        score={val}
                      />
                    ))}
                  </div>
                </div>

                {/* Strengths */}
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md p-6 shadow-xl space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <CheckCircle2Icon className="size-4" />
                    <span>Key Hiring Strengths</span>
                  </div>
                  <ul className="space-y-2.5">
                    {result.strengths.map((s) => (
                      <li key={s} className="flex items-start gap-2 text-xs text-emerald-300/90 leading-relaxed">
                        <span className="mt-1 size-1.5 shrink-0 rounded-full bg-emerald-400" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Improvements */}
                <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-6 shadow-xl lg:col-span-2 space-y-3">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                    <AlertCircleIcon className="size-4" />
                    <span>Targeted Growth Opportunities</span>
                  </div>
                  <ul className="space-y-2.5">
                    {result.improvements.map((imp) => (
                      <li key={imp} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                        <span className="mt-1 size-1.5 shrink-0 rounded-full bg-amber-400" />
                        <span className="text-foreground/90">{imp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}

      {/* Explainer Footer Card */}
      <div className="rounded-2xl border border-border/70 dark:border-white/10 bg-card/70 dark:bg-[#0e1322]/70 backdrop-blur-md p-6">
        <div className="flex items-center gap-2 mb-2">
          <HelpCircleIcon className="size-4 text-primary" />
          <h4 className="text-sm font-bold text-foreground">Understanding Job Suitability vs. Match Score</h4>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          While the AI Match Score evaluates instantaneous profile overlap, Job Suitability models your holistic resilience, assessment mastery, project portfolio depth, and work mode adaptability. A suitability rating above 80% guarantees top-tier priority in affirmative placement matching.
        </p>
      </div>
    </div>
  );
}
