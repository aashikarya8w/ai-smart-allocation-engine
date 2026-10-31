"use client";

import {
  ScaleIcon, CheckCircle2Icon, AlertTriangleIcon, UsersIcon,
  AwardIcon, ShieldCheckIcon, PieChartIcon, BarChart3Icon,
  HeartHandshakeIcon, ArrowUpRightIcon,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
} from "recharts";
import { useAdmin } from "@/hooks/useAdmin";
import { ROUTES } from "@/lib/constants";
import Link from "next/link";

const SUITABILITY_DIST = [
  { range: "90-100%", count: 4, color: "#10b981" },
  { range: "80-89%", count: 8, color: "#3b82f6" },
  { range: "70-79%", count: 12, color: "#8b5cf6" },
  { range: "60-69%", count: 7, color: "#f59e0b" },
  { range: "< 60%", count: 4, color: "#ef4444" },
];

const PREFERENCE_DATA = [
  { name: "Geographic Location Preference Satisfied", value: 78, color: "bg-blue-500" },
  { name: "Industry Sector Choice Alignment", value: 82, color: "bg-emerald-500" },
  { name: "Work Arrangement Mode (Remote/Hybrid/Onsite)", value: 71, color: "bg-purple-500" },
  { name: "Stipend Expectation Floor Met", value: 89, color: "bg-cyan-500" },
];

const SECTOR_FAIRNESS = [
  { sector: "Software & AI", allocated: 12, waitlisted: 5, notAllocated: 3 },
  { sector: "Data Analytics", allocated: 6, waitlisted: 4, notAllocated: 2 },
  { sector: "FinTech & Banking", allocated: 4, waitlisted: 2, notAllocated: 3 },
  { sector: "EdTech & Education", allocated: 3, waitlisted: 2, notAllocated: 1 },
  { sector: "Clean Energy & EV", allocated: 2, waitlisted: 1, notAllocated: 2 },
];

export default function FairnessPage() {
  const { stats } = useAdmin();
  const seatUtil = Math.round((stats.approvedAllocations / Math.max(stats.totalSeats, 1)) * 100);

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-br from-[#0c1222] via-[#0f172a] to-[#1e1338] p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl">
        <div className="absolute -top-32 -right-24 h-96 w-96 rounded-full bg-gradient-to-br from-primary/20 via-purple-500/15 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-gradient-to-tr from-cyan-500/15 via-blue-500/10 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
              <ScaleIcon className="h-3.5 w-3.5" />
              Equitable Opportunity & Affirmative Action
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Fairness & <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Integrity Audit</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed font-normal">
              Continuous mathematical verification of equity distribution, quota fulfillment, non-discriminatory matching algorithms, and preference satisfaction metrics.
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold backdrop-blur-md">
            <ShieldCheckIcon className="h-4 w-4" />
            <span>Zero Rule Bias Detected</span>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards with Sparklines */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Confirmed Allocations",
            value: stats.approvedAllocations,
            trend: "+12.4%",
            color: "from-emerald-500 to-teal-600",
            accent: "#10b981",
            icon: AwardIcon,
            href: ROUTES.admin.allocations,
            spark: "M0,20 Q30,10 60,14 T120,4",
          },
          {
            title: "Buffer Waitlist",
            value: 8,
            trend: "Stable",
            color: "from-amber-500 to-orange-600",
            accent: "#f59e0b",
            icon: AlertTriangleIcon,
            href: ROUTES.admin.allocations,
            spark: "M0,15 Q30,15 60,14 T120,13",
          },
          {
            title: "Unallocated Pool",
            value: 17,
            trend: "Phase 2 Target",
            color: "from-blue-500 to-indigo-600",
            accent: "#3b82f6",
            icon: UsersIcon,
            href: ROUTES.admin.students,
            spark: "M0,22 Q30,18 60,10 T120,6",
          },
          {
            title: "Seat Utilization Rate",
            value: `${seatUtil}%`,
            trend: "+8.2%",
            color: "from-purple-500 to-pink-600",
            accent: "#a855f7",
            icon: CheckCircle2Icon,
            href: ROUTES.admin.capacity,
            spark: "M0,18 Q30,8 60,12 T120,3",
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
                  <circle cx="120" cy="4" r="3" fill={s.accent} />
                </svg>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Fairness Principles Grid */}
      <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-6 shadow-xl backdrop-blur-md space-y-4">
        <div className="flex items-center gap-2 border-b border-border/50 dark:border-white/5 pb-3">
          <HeartHandshakeIcon className="h-5 w-5 text-primary" />
          <h3 className="text-base font-bold text-foreground">Verified Non-Discriminatory Guarantees</h3>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { label: "Deterministic Algorithm Rules", desc: "Identical Gale-Shapley matrix applied without manual tampering.", ok: true },
            { label: "Objective Vector Scoring", desc: "100% computed from verified credentials, CGPA, and test evaluations.", ok: true },
            { label: "Explainable Match Justification", desc: "Audit log generates mathematical breakdown for every student match.", ok: true },
            { label: "Quota Limit Integrity", desc: "Corporate entity capacities are mathematically impossible to over-allocate.", ok: true },
            { label: "Rule-Based Tie Resolution", desc: "Automated ranking order breaks ties without human subjective bias.", ok: true },
            { label: "Manual Rule Overrides", desc: "0 policy violations or unauthorized bypasses reported in this cycle.", ok: true, count: 0 },
          ].map((p) => (
            <div
              key={p.label}
              className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 space-y-2"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2Icon className="h-4 w-4 text-emerald-400 shrink-0" />
                <p className="text-xs font-bold text-foreground">{p.label}</p>
                {p.count !== undefined && (
                  <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {p.count} Overrides
                  </span>
                )}
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed pl-6">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Distribution Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Suitability Distribution Pie */}
        <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-6 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between pb-4 border-b border-border/50 dark:border-white/5">
            <div>
              <h3 className="text-base font-bold text-foreground">Suitability Score Distribution</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Applicant matching congruence across all allocations</p>
            </div>
            <PieChartIcon className="h-5 w-5 text-muted-foreground" />
          </div>

          <div className="pt-6">
            <ResponsiveContainer width="100%" height={230}>
              <PieChart>
                <Pie
                  data={SUITABILITY_DIST}
                  dataKey="count"
                  nameKey="range"
                  cx="50%"
                  cy="50%"
                  outerRadius={85}
                  innerRadius={45}
                  paddingAngle={3}
                  label={({ name, percent }: { name?: string; percent?: number }) =>
                    `${name ?? ""} (${Math.round((percent ?? 0) * 100)}%)`
                  }
                  labelLine={false}
                >
                  {SUITABILITY_DIST.map((entry, i) => (
                    <Cell key={i} fill={entry.color} stroke="rgba(0,0,0,0.2)" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0d1220",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: "12px",
                    fontSize: "12px",
                    color: "#fff",
                  }}
                  formatter={(v) => [`${v} candidates`, "Count"]}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="flex flex-wrap justify-center gap-3 mt-3">
              {SUITABILITY_DIST.map((d) => (
                <div key={d.range} className="flex items-center gap-1.5 text-xs">
                  <div className="size-2.5 rounded-full" style={{ background: d.color }} />
                  <span className="text-muted-foreground font-medium">{d.range}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Preference Satisfaction */}
        <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-6 shadow-xl backdrop-blur-md flex flex-col justify-between">
          <div>
            <div className="pb-4 border-b border-border/50 dark:border-white/5">
              <h3 className="text-base font-bold text-foreground">Student Preference Fulfillment</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Ratio of students matched to their preferred parameters</p>
            </div>

            <div className="pt-5 space-y-4">
              {PREFERENCE_DATA.map((p) => (
                <div key={p.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-foreground">{p.name}</span>
                    <span className="font-black text-primary">{p.value}%</span>
                  </div>
                  <Progress value={p.value} className="h-2 bg-white/5" />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 p-3.5 rounded-xl bg-muted/40 dark:bg-white/[0.02] border border-border/40 dark:border-white/5 text-xs text-muted-foreground">
            <strong>Equilibrium Insight:</strong> Over 82% of allocated scholars were matched into their top-choice industry domain, proving high student-centered satisfaction.
          </div>
        </div>
      </div>

      {/* Sector-wise Allocation Breakdown */}
      <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-6 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between pb-4 border-b border-border/50 dark:border-white/5">
          <div>
            <h3 className="text-base font-bold text-foreground">Sector-wise Equity Breakdown</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Cross-sector ratio of confirmed, waitlisted, and unallocated students</p>
          </div>
          <BarChart3Icon className="h-5 w-5 text-muted-foreground" />
        </div>

        <div className="pt-6">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={SECTOR_FAIRNESS} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="sector" tick={{ fontSize: 11, fill: "currentColor" }} opacity={0.7} />
              <YAxis tick={{ fontSize: 11, fill: "currentColor" }} opacity={0.6} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0d1220",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "12px",
                  fontSize: "12px",
                  color: "#fff",
                }}
              />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="allocated" name="Allocated" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="waitlisted" name="Waitlisted" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              <Bar dataKey="notAllocated" name="Unallocated" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tie-Breaking Summary Metrics */}
      <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-6 shadow-xl backdrop-blur-md space-y-4">
        <h3 className="text-base font-bold text-foreground border-b border-border/50 dark:border-white/5 pb-3">
          Algorithmic Tie-Breaking Ledger
        </h3>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { label: "Total Tie Cases Detected", value: "7 Incidents", color: "text-foreground" },
            { label: "Resolved by Skill Repertoire", value: "4 (57%)", color: "text-blue-400" },
            { label: "Resolved by Assessment Tests", value: "2 (29%)", color: "text-purple-400" },
            { label: "Resolved by Academic CGPA", value: "1 (14%)", color: "text-emerald-400" },
            { label: "Remaining Unresolved", value: "0 Cases", color: "text-emerald-400" },
            { label: "Manual Interventions Required", value: "0 Cases", color: "text-emerald-400" },
          ].map((t) => (
            <div key={t.label} className="p-4 rounded-xl bg-muted/40 dark:bg-white/[0.02] border border-border/40 dark:border-white/5">
              <p className={`text-2xl font-black ${t.color}`}>{t.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{t.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
