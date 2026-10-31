"use client";

import {
  TrendingUpIcon, AwardIcon, BookOpenIcon, StarIcon, UsersIcon,
  SparklesIcon, ArrowUpRightIcon, CheckCircle2Icon, ShieldCheckIcon,
  BriefcaseIcon, CompassIcon,
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, Radar, Legend,
} from "recharts";
import { mockInternshipOutcomes } from "@/data/evaluations";
import { formatDate } from "@/lib/formatters";
import { ROUTES } from "@/lib/constants";
import Link from "next/link";

export default function AdminOutcomesPage() {
  const avgPerf = Math.round(
    mockInternshipOutcomes.reduce((s, o) => s + o.overallPerformance, 0) /
      Math.max(mockInternshipOutcomes.length, 1)
  );
  const avgLearn = Math.round(
    mockInternshipOutcomes.reduce((s, o) => s + o.learningOutcome, 0) /
      Math.max(mockInternshipOutcomes.length, 1)
  );
  const avgSatisf = Math.round(
    mockInternshipOutcomes.reduce((s, o) => s + o.satisfaction, 0) /
      Math.max(mockInternshipOutcomes.length, 1)
  );
  const totalSkills = [...new Set(mockInternshipOutcomes.flatMap((o) => o.skillsGained))].length;

  const radarData = mockInternshipOutcomes.map((o) => ({
    name: o.internshipTitle.split(" ")[0],
    Performance: o.overallPerformance,
    Learning: o.learningOutcome,
    Satisfaction: o.satisfaction,
    SkillGrowth: o.skillGrowthPercent,
  }));

  const skillFreq: Record<string, number> = {};
  mockInternshipOutcomes.forEach((o) =>
    o.skillsGained.forEach((s) => {
      skillFreq[s] = (skillFreq[s] ?? 0) + 1;
    })
  );
  const topSkills = Object.entries(skillFreq)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)
    .map(([skill, count]) => ({ skill, count }));

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-br from-[#0c1222] via-[#0f172a] to-[#1e1338] p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl">
        <div className="absolute -top-32 -right-24 h-96 w-96 rounded-full bg-gradient-to-br from-primary/20 via-purple-500/15 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-gradient-to-tr from-cyan-500/15 via-blue-500/10 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
              <AwardIcon className="h-3.5 w-3.5" />
              National Career Progression & PPO Tracking
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Scheme <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Outcomes & Growth</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed font-normal">
              Consolidated graduation metrics, verified capability uplifts, pre-placement offer (PPO) conversion rates, and multi-dimensional performance tracking.
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold backdrop-blur-md">
            <TrendingUpIcon className="h-4 w-4" />
            <span>+38.5% Average Skill Velocity</span>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards with Sparklines */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Completed Outcomes",
            value: mockInternshipOutcomes.length,
            trend: "+25.0%",
            color: "from-blue-500 to-indigo-600",
            accent: "#3b82f6",
            icon: UsersIcon,
            href: ROUTES.admin.analytics,
            spark: "M0,20 Q30,12 60,15 T120,4",
          },
          {
            title: "Average Performance",
            value: `${avgPerf}%`,
            trend: "+6.8%",
            color: "from-emerald-500 to-teal-600",
            accent: "#10b981",
            icon: AwardIcon,
            href: ROUTES.admin.feedback,
            spark: "M0,18 Q30,10 60,12 T120,3",
          },
          {
            title: "Corporate Satisfaction",
            value: `${avgSatisf}%`,
            trend: "+9.2%",
            color: "from-amber-500 to-orange-600",
            accent: "#f59e0b",
            icon: StarIcon,
            href: ROUTES.admin.feedback,
            spark: "M0,15 Q30,6 60,10 T120,2",
          },
          {
            title: "Verified Skill Additions",
            value: totalSkills,
            trend: "+14.1%",
            color: "from-purple-500 to-pink-600",
            accent: "#a855f7",
            icon: TrendingUpIcon,
            href: ROUTES.admin.rules,
            spark: "M0,22 Q30,14 60,8 T120,2",
          },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <Link
              key={i}
              href={s.href}
              className="group relative overflow-hidden rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-5 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/50"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">{s.title}</p>
                  <p className="mt-2 text-3xl font-extrabold tracking-tight text-foreground">{s.value}</p>
                  <span className="inline-block mt-1 text-[11px] font-semibold text-primary">{s.trend}</span>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-br ${s.color} text-white shadow-md group-hover:scale-110 transition-transform`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4">
                <svg className="w-full h-7 overflow-visible" viewBox="0 0 120 25">
                  <path d={s.spark} fill="none" stroke={s.accent} strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="120" cy="3" r="3" fill={s.accent} />
                </svg>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Analytics Visualizers */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Radar Chart */}
        {radarData.length > 0 && (
          <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-6 shadow-xl backdrop-blur-md">
            <div className="pb-4 border-b border-border/50 dark:border-white/5">
              <h3 className="text-base font-bold text-foreground">Cohort Competency Radar</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Performance vs. Learning Outcome vs. Satisfaction index</p>
            </div>
            <div className="pt-4">
              <ResponsiveContainer width="100%" height={260}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis dataKey="name" tick={{ fontSize: 11, fill: "currentColor" }} opacity={0.7} />
                  <Radar name="Performance" dataKey="Performance" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.25} />
                  <Radar name="Learning" dataKey="Learning" stroke="#10b981" fill="#10b981" fillOpacity={0.25} />
                  <Radar name="Satisfaction" dataKey="Satisfaction" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.25} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Most Gained Skills */}
        <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-6 shadow-xl backdrop-blur-md">
          <div className="pb-4 border-b border-border/50 dark:border-white/5">
            <h3 className="text-base font-bold text-foreground">Top Skills Acquired by Interns</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Most common validated capabilities earned during project delivery</p>
          </div>
          <div className="pt-4">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={topSkills} layout="vertical" margin={{ top: 0, right: 10, left: 60, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10, fill: "currentColor" }} opacity={0.6} />
                <YAxis type="category" dataKey="skill" tick={{ fontSize: 11, fill: "currentColor" }} opacity={0.8} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0d1220",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: "12px",
                    fontSize: "12px",
                    color: "#fff",
                  }}
                />
                <Bar dataKey="count" name="Certified Students" fill="#8b5cf6" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Individual Outcome Profiles */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-foreground">Individual Internship Outcomes Dossiers</h3>
        <div className="space-y-4">
          {mockInternshipOutcomes.map((outcome) => (
            <div
              key={outcome.id}
              className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-6 shadow-xl backdrop-blur-md space-y-4 hover:border-primary/40 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border/50 dark:border-white/5">
                <div>
                  <h4 className="text-base font-bold text-foreground">{outcome.internshipTitle}</h4>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                    <BriefcaseIcon className="h-3 w-3 text-primary" />
                    {outcome.companyName} · <span className="font-medium text-foreground">Graduated {formatDate(outcome.completedAt)}</span>
                  </p>
                </div>
                <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10 text-xs font-semibold">
                  {outcome.projectsCompleted} Projects Delivered
                </Badge>
              </div>

              {/* Progress bars */}
              <div className="grid gap-3 sm:grid-cols-3 p-4 rounded-xl bg-muted/40 dark:bg-white/[0.02] border border-border/40 dark:border-white/5">
                {[
                  { label: "Overall Performance", value: outcome.overallPerformance, color: "bg-blue-500" },
                  { label: "Learning Outcome Depth", value: outcome.learningOutcome, color: "bg-emerald-500" },
                  { label: "Host Entity Satisfaction", value: outcome.satisfaction, color: "bg-amber-500" },
                ].map((m) => (
                  <div key={m.label} className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">{m.label}</span>
                      <span className="font-black text-foreground">{m.value}%</span>
                    </div>
                    <Progress value={m.value} className="h-1.5 bg-white/5" />
                  </div>
                ))}
              </div>

              {/* Skills Gained */}
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1">
                  <span>Skills Acquired:</span>
                  <span className="text-emerald-400 font-bold">(+{outcome.skillGrowthPercent}% skill expansion)</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {outcome.skillsGained.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-primary/10 border border-primary/20 text-primary"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Strengths & Recommendations */}
              <div className="grid gap-4 sm:grid-cols-2 pt-2 border-t border-border/40 dark:border-white/5 text-xs">
                <div className="space-y-1.5">
                  <p className="font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2Icon className="h-3.5 w-3.5" /> Key Evaluated Strengths
                  </p>
                  <ul className="space-y-1">
                    {outcome.strengths.map((s) => (
                      <li key={s} className="text-slate-300 flex items-start gap-1.5">
                        <span className="mt-1 size-1 shrink-0 rounded-full bg-emerald-400" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-1.5">
                  <p className="font-bold text-amber-400 flex items-center gap-1">
                    <CompassIcon className="h-3.5 w-3.5" /> Career Growth Path
                  </p>
                  <ul className="space-y-1">
                    {outcome.futureRecommendations.slice(0, 2).map((r) => (
                      <li key={r} className="text-slate-300 flex items-start gap-1.5">
                        <span className="mt-1 size-1 shrink-0 rounded-full bg-amber-400" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
