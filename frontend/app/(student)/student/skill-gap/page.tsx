"use client";

import Link from "next/link";
import {
  TrendingUpIcon,
  SparklesIcon,
  BookOpenIcon,
  CheckCircle2Icon,
  AlertTriangleIcon,
  ArrowRightIcon,
  ZapIcon,
  ExternalLinkIcon,
  AwardIcon,
  TargetIcon,
} from "lucide-react";

import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { useStudent } from "@/hooks/useStudent";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const MOCK_GAPS = [
  {
    skillName: "TypeScript",
    currentLevel: 65,
    requiredLevel: 85,
    gap: 20,
    impactBoost: "+6% Match",
    hoursNeeded: "12 hours",
    resources: [
      { title: "TypeScript Deep Dive & Generics", type: "Book / Docs", isFree: true, url: "https://www.typescriptlang.org/docs/" },
      { title: "Total TypeScript by Matt Pocock", type: "Course", isFree: false, url: "https://www.totaltypescript.com/" },
    ],
  },
  {
    skillName: "System Design & Architecture",
    currentLevel: 35,
    requiredLevel: 75,
    gap: 40,
    impactBoost: "+9% Match",
    hoursNeeded: "24 hours",
    resources: [
      { title: "System Design Primer – GitHub Open Source", type: "Article / Guide", isFree: true, url: "https://github.com/donnemartin/system-design-primer" },
      { title: "Grokking Microservices & Scalability", type: "Interactive", isFree: false, url: "https://www.educative.io/" },
    ],
  },
  {
    skillName: "Docker & Containerization",
    currentLevel: 25,
    requiredLevel: 65,
    gap: 40,
    impactBoost: "+8% Match",
    hoursNeeded: "16 hours",
    resources: [
      { title: "Docker Official Fast Track Tutorial", type: "Article", isFree: true, url: "https://docs.docker.com/get-started/" },
      { title: "Docker & Kubernetes for Cloud Deployments", type: "Course", isFree: false, url: "https://www.udemy.com/" },
    ],
  },
  {
    skillName: "React Advanced Patterns",
    currentLevel: 80,
    requiredLevel: 90,
    gap: 10,
    impactBoost: "+4% Match",
    hoursNeeded: "6 hours",
    resources: [
      { title: "React 19 Server Components & Actions", type: "Docs", isFree: true, url: "https://react.dev/" },
      { title: "Epic React by Kent C. Dodds", type: "Masterclass", isFree: false, url: "https://epicreact.dev/" },
    ],
  },
];

export default function SkillGapPage() {
  const { student, stats } = useStudent();

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-300">
      
      {/* ─────────────────────────────────────────────────────────────
          1. HEADER
          ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
              Skill Gap <span className="bg-gradient-to-r from-primary via-orange-400 to-amber-400 bg-clip-text text-transparent">Analysis</span>
            </h1>
            <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold text-primary shadow-[0_0_10px_var(--theme-glow)]">
              <SparklesIcon className="size-3" />
              AI Diagnostics
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground font-medium">
            Benchmark your profile against industry internship requirements to maximize match scores.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <LinkButton
            href={ROUTES.student.whatIf}
            size="sm"
            className="rounded-xl shadow-[0_0_20px_var(--theme-glow)] bg-gradient-to-r from-primary to-orange-500 hover:scale-105 transition-all text-xs font-bold gap-1.5"
          >
            <ZapIcon className="size-3.5" />
            <span>Simulate in What-If Twin</span>
          </LinkButton>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. FEATURE HERO BANNER
          ───────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-r from-primary/20 via-primary/10 to-purple-900/20 p-6 sm:p-8 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.35)]">
        <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-primary/25 blur-3xl" />

        <div className="relative z-10 grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
          <div className="space-y-3 lg:col-span-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-3 py-1 text-xs font-bold text-primary shadow-[0_0_12px_var(--theme-glow)]">
              <TargetIcon className="size-3.5 animate-pulse" />
              <span>Target Benchmark: Full Stack & Cloud Developer</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
              Close Your Skill Gaps to Unlock +15% Higher Match Rates
            </h2>
            <p className="max-w-xl text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Our AI engine scanned {stats.recommendationsCount * 8} corporate skill requirements against your verified profile. Mastering the 4 prioritized competencies below will elevate your placement probability.
            </p>
          </div>

          <div className="flex flex-col gap-2 lg:col-span-4 lg:items-end">
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-right">
              <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase">Projected Match Score</span>
              <p className="text-2xl font-black text-emerald-500 dark:text-emerald-400">98% Match Potential</p>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. SUMMARY METRIC CARDS
          ───────────────────────────────────────────────────────────── */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="rounded-2xl border border-border/80 bg-card/90 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground font-mono">
                Verified Skills
              </p>
              <p className="mt-1 text-3xl font-black text-foreground">
                {student?.skills.length ?? 6}
              </p>
            </div>
            <div className="flex size-11 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-400 border border-blue-500/25">
              <CheckCircle2Icon className="size-5" />
            </div>
          </div>
        </Card>

        <Card className="rounded-2xl border border-border/80 bg-card/90 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground font-mono">
                Gaps Identified
              </p>
              <p className="mt-1 text-3xl font-black text-amber-500">
                {MOCK_GAPS.length}
              </p>
            </div>
            <div className="flex size-11 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-400 border border-amber-500/25">
              <AlertTriangleIcon className="size-5" />
            </div>
          </div>
        </Card>

        <Card className="rounded-2xl border border-border/80 bg-card/90 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground font-mono">
                Near Proficiency
              </p>
              <p className="mt-1 text-3xl font-black text-emerald-500">
                {MOCK_GAPS.filter((g) => g.gap <= 20).length}
              </p>
            </div>
            <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
              <TrendingUpIcon className="size-5" />
            </div>
          </div>
        </Card>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. GAP CARDS WITH DUAL COMPARATOR BARS & RESOURCES
          ───────────────────────────────────────────────────────────── */}
      <div className="space-y-4">
        {MOCK_GAPS.sort((a, b) => b.gap - a.gap).map((gap) => {
          const isCritical = gap.gap >= 35;
          return (
            <Card key={gap.skillName} className="rounded-3xl border border-border/80 bg-card/90 p-6 backdrop-blur-xl shadow-sm hover:border-primary/40 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border/60 pb-4 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "size-10 rounded-2xl flex items-center justify-center shrink-0 font-bold",
                    isCritical ? "bg-rose-500/15 text-rose-400 border border-rose-500/30" : "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                  )}>
                    <TargetIcon className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-foreground">
                      {gap.skillName}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Estimated learning investment: <span className="text-foreground font-semibold font-mono">{gap.hoursNeeded}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-primary/10 border border-primary/25 px-2.5 py-1 text-xs font-bold text-primary font-mono">
                    {gap.impactBoost}
                  </span>
                  <span className={cn(
                    "rounded-full px-2.5 py-1 text-xs font-bold font-mono",
                    isCritical
                      ? "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                      : "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                  )}>
                    Gap: {gap.gap}%
                  </span>
                </div>
              </div>

              {/* Progress Comparison */}
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-border/60 bg-muted/20 p-3.5 space-y-1.5 dark:border-white/10 dark:bg-white/[0.02]">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-muted-foreground">Your Verified Level</span>
                    <span className="text-foreground font-mono">{gap.currentLevel}%</span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-muted/60 overflow-hidden dark:bg-white/[0.06]">
                    <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${gap.currentLevel}%` }} />
                  </div>
                </div>

                <div className="rounded-2xl border border-border/60 bg-muted/20 p-3.5 space-y-1.5 dark:border-white/10 dark:bg-white/[0.02]">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-muted-foreground">Target Role Requirement</span>
                    <span className="text-emerald-500 font-mono">{gap.requiredLevel}%</span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-muted/60 overflow-hidden dark:bg-white/[0.06]">
                    <div className="h-full rounded-full bg-emerald-500 transition-all duration-500" style={{ width: `${gap.requiredLevel}%` }} />
                  </div>
                </div>
              </div>

              {/* Learning Resources */}
              <div className="mt-4 pt-3 border-t border-border/40 dark:border-white/5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground font-mono mb-2.5">
                  AI-Curated Upskilling Pathways
                </p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {gap.resources.map((r) => (
                    <a
                      key={r.title}
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-2 rounded-xl border border-border/60 bg-muted/30 p-2.5 hover:border-primary/50 hover:bg-muted/50 transition-all dark:border-white/10 dark:bg-white/[0.03]"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <BookOpenIcon className="size-4 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                          {r.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className={cn(
                          "text-[10px] font-mono px-2 py-0.5 rounded-full",
                          r.isFree ? "bg-emerald-500/15 text-emerald-400 font-bold" : "bg-muted text-muted-foreground"
                        )}>
                          {r.isFree ? "Free" : "Certified"}
                        </span>
                        <ExternalLinkIcon className="size-3 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

    </div>
  );
}
