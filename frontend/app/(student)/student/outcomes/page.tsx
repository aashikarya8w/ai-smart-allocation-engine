"use client";

import {
  BarChart3Icon,
  TrendingUpIcon,
  StarIcon,
  AwardIcon,
  BookOpenIcon,
  SparklesIcon,
  Building2Icon,
  CheckCircle2Icon,
  AlertCircleIcon,
  FileBadgeIcon
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { ScoreCircle } from "@/components/common/ScoreBar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { EmptyState } from "@/components/common/EmptyState";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import {
  mockInternshipOutcomes,
  mockCompanyEvaluations,
  mockStudentFeedback,
} from "@/data/evaluations";
import { useStudent } from "@/hooks/useStudent";
import { formatDate } from "@/lib/formatters";
import { ROUTES } from "@/lib/constants";

export default function OutcomesPage() {
  const { student, outcomes: userOutcomes } = useStudent();
  const rawOutcomes = userOutcomes && userOutcomes.length > 0 ? userOutcomes : mockInternshipOutcomes;
  const outcome = rawOutcomes[0];

  const evals = mockCompanyEvaluations.filter((e) => e.studentId === student?.id);
  const evaluation = evals.length > 0 ? evals[0] : mockCompanyEvaluations[0];

  if (!outcome) {
    return (
      <div className="space-y-6">
        <PageHeader title="Performance Insights" description="Your internship outcome and performance analytics." />
        <EmptyState
          icon={BarChart3Icon}
          title="No outcomes finalized yet"
          description="Your performance analytics will populate once your active corporate internship concludes."
        />
      </div>
    );
  }

  const radarData = evaluation
    ? [
        { subject: "Technical", score: evaluation.technicalPerformance * 20 },
        { subject: "Projects", score: evaluation.projectPerformance * 20 },
        { subject: "Communication", score: evaluation.communication * 20 },
        { subject: "Discipline", score: evaluation.discipline * 20 },
        { subject: "Overall", score: evaluation.overallPerformance * 20 },
      ]
    : [];

  const growthData = outcome.skillsGained.map((skill, i) => ({
    skill,
    growth: Math.round(65 + i * 7 + (i % 2 === 0 ? 8 : 4)),
  }));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Performance Insights & Outcomes"
        description="Comprehensive evaluation, corporate ratings, and verified competency gains from your completed internship."
      />

      {/* Cyber Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent p-6 shadow-xl shadow-primary/5 backdrop-blur-md">
        <div className="absolute -right-10 -top-10 size-48 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-md">
              <FileBadgeIcon className="size-3.5 text-primary" />
              <span>Verified Corporate Performance Dossier</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              {outcome.internshipTitle} · {outcome.companyName}
            </h2>
            <p className="max-w-2xl text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Official appraisal signed by your corporate mentor. Demonstrates verified mastery across production microservices and agile sprints.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-400">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              Evaluation: Completed & Certified
            </span>
          </div>
        </div>
      </div>

      {/* Modern Metric Cards with Sparklines */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Overall Performance */}
        <div className="group relative overflow-hidden rounded-2xl border border-border/80 dark:border-white/10 bg-card/85 dark:bg-[#0e1322]/85 p-5 backdrop-blur-md transition-all hover:border-emerald-500/50 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Overall Performance</span>
            <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              <AwardIcon className="size-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div className="text-3xl font-bold tracking-tight text-foreground">{outcome.overallPerformance}%</div>
            <span className="text-xs font-semibold text-emerald-400">↑ Top 5%</span>
          </div>
          <div className="mt-3 h-8 w-full">
            <svg className="h-full w-full overflow-visible" viewBox="0 0 100 25" preserveAspectRatio="none">
              <path d="M 0 20 Q 30 16 60 8 T 100 4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-emerald-500" />
            </svg>
          </div>
        </div>

        {/* Learning Outcome */}
        <div className="group relative overflow-hidden rounded-2xl border border-border/80 dark:border-white/10 bg-card/85 dark:bg-[#0e1322]/85 p-5 backdrop-blur-md transition-all hover:border-primary/50 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Learning Outcome</span>
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary/15 text-primary border border-primary/30">
              <BookOpenIcon className="size-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div className="text-3xl font-bold tracking-tight text-foreground">{outcome.learningOutcome}%</div>
            <span className="text-xs font-semibold text-primary">Mastery Level</span>
          </div>
          <div className="mt-3 h-8 w-full">
            <svg className="h-full w-full overflow-visible" viewBox="0 0 100 25" preserveAspectRatio="none">
              <path d="M 0 18 Q 30 14 65 9 T 100 2" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-primary" />
            </svg>
          </div>
        </div>

        {/* Satisfaction */}
        <div className="group relative overflow-hidden rounded-2xl border border-border/80 dark:border-white/10 bg-card/85 dark:bg-[#0e1322]/85 p-5 backdrop-blur-md transition-all hover:border-amber-500/50 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Employer Satisfaction</span>
            <div className="flex size-9 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
              <StarIcon className="size-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div className="text-3xl font-bold tracking-tight text-foreground">{outcome.satisfaction}%</div>
            <span className="text-xs font-semibold text-amber-400">Exceptional</span>
          </div>
          <div className="mt-3 h-8 w-full">
            <svg className="h-full w-full overflow-visible" viewBox="0 0 100 25" preserveAspectRatio="none">
              <path d="M 0 17 Q 30 15 60 10 T 100 3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-amber-500" />
            </svg>
          </div>
        </div>

        {/* Skill Growth */}
        <div className="group relative overflow-hidden rounded-2xl border border-border/80 dark:border-white/10 bg-card/85 dark:bg-[#0e1322]/85 p-5 backdrop-blur-md transition-all hover:border-blue-500/50 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Skill Acceleration</span>
            <div className="flex size-9 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400 border border-blue-500/30">
              <TrendingUpIcon className="size-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div className="text-3xl font-bold tracking-tight text-foreground">+{outcome.skillGrowthPercent}%</div>
            <span className="text-xs font-semibold text-blue-400">3.5x Baseline</span>
          </div>
          <div className="mt-3 h-8 w-full">
            <svg className="h-full w-full overflow-visible" viewBox="0 0 100 25" preserveAspectRatio="none">
              <path d="M 0 22 Q 35 15 70 8 T 100 2" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-blue-500" />
            </svg>
          </div>
        </div>
      </div>

      {/* Radar Chart + Skills Gained */}
      <div className="grid gap-6 lg:grid-cols-2">
        {radarData.length > 0 && (
          <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <h3 className="text-sm font-bold text-foreground">Company Performance Evaluation Radar</h3>
              <span className="text-xs text-muted-foreground">Mentor Validated</span>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "var(--foreground)" }} />
                  <Radar name="Performance" dataKey="score" stroke="#f97316" fill="#f97316" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <h3 className="text-sm font-bold text-foreground">Acquired Competencies & Mastery</h3>
            <span className="text-xs text-emerald-400 font-bold">+{outcome.skillGrowthPercent}% Total Growth</span>
          </div>
          <div className="space-y-3 pt-1">
            {outcome.skillsGained.map((skill, i) => (
              <div key={skill} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-foreground">{skill}</span>
                  <span className="text-emerald-400 font-mono font-bold">{85 + (i * 3)}% Mastery</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted/40 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-emerald-400"
                    style={{ width: `${85 + (i * 3)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Strengths & Company Eval Details */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md p-6 shadow-xl space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <CheckCircle2Icon className="size-4" />
            <span>Demonstrated Professional Strengths</span>
          </div>
          <ul className="space-y-2.5">
            {outcome.strengths.map((s) => (
              <li key={s} className="flex items-start gap-2 text-xs text-emerald-300/90 leading-relaxed">
                <span className="mt-1 size-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        {evaluation && (
          <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-6 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-foreground">Corporate Mentor Assessment</h3>
              <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400">
                ★ Pre-Placement Eligible
              </span>
            </div>
            {evaluation.comments && (
              <div className="rounded-xl border border-border/60 bg-muted/20 p-3.5 text-xs text-muted-foreground italic leading-relaxed">
                "{evaluation.comments}"
              </div>
            )}
            <p className="text-[11px] text-muted-foreground">
              Official appraisal signed by TechNova Engineering Management.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
