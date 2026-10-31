"use client";

import Link from "next/link";
import {
  GraduationCapIcon,
  BuildingIcon,
  BriefcaseIcon,
  ClipboardListIcon,
  AwardIcon,
  BrainCircuitIcon,
  PlayIcon,
  FileTextIcon,
  PlusIcon,
  ShieldCheckIcon,
  TrendingUpIcon,
  UsersIcon,
  RefreshCwIcon,
  ArrowLeftRightIcon,
  QrCodeIcon,
  CheckCircle2Icon,
  AlertCircleIcon,
  ArrowRightIcon,
  SparklesIcon,
  ScaleIcon,
  ClockIcon,
  LayersIcon,
  ChevronRightIcon,
} from "lucide-react";

import { PageHeader } from "@/components/common/PageHeader";
import { ScoreCircle } from "@/components/common/ScoreBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { useAdmin } from "@/hooks/useAdmin";
import { useAnalytics } from "@/hooks/useAnalytics";
import { formatRelativeTime } from "@/lib/formatters";
import { ROUTES, CHART_COLORS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function AdminDashboardPage() {
  const { stats, applications, allocations, companies, internships } = useAdmin();
  const { sectorDistribution, allocationStatusData, applicationStatusData } = useAnalytics();

  const pendingCompanies = companies.filter((c) => c.verificationStatus === "Pending");
  const pendingInternships = internships.filter((i) => i.status === "Pending");

  // Sparkline data
  const sparklines = {
    students: "M 0 25 Q 25 15, 60 12 T 100 4",
    companies: "M 0 28 Q 30 20, 60 15 T 100 6",
    internships: "M 0 26 Q 35 18, 70 10 T 100 3",
    applications: "M 0 30 Q 30 22, 60 12 T 100 2",
    allocated: "M 0 25 Q 35 15, 65 10 T 100 4",
    rate: "M 0 22 Q 35 18, 70 12 T 100 5",
  };

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-300">
      
      {/* ─────────────────────────────────────────────────────────────
          1. NATIONAL GOVERNANCE HEADER
          ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
              National Governance <span className="bg-gradient-to-r from-primary via-orange-400 to-amber-400 bg-clip-text text-transparent">Command Center</span>
            </h1>
            <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold text-primary shadow-[0_0_10px_var(--theme-glow)]">
              <ShieldCheckIcon className="size-3" />
              SIH25033 Active
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground font-medium">
            AI-Driven Smart Allocation Engine & National Quota Monitoring Dashboard.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <LinkButton
            href={ROUTES.admin.aiMatchingRun}
            variant="outline"
            size="sm"
            className="rounded-xl border-border/80 dark:border-white/15 dark:bg-white/[0.04] text-xs font-bold gap-1.5"
          >
            <BrainCircuitIcon className="size-3.5 text-primary" />
            <span>AI Matching Engine</span>
          </LinkButton>
          <LinkButton
            href={ROUTES.admin.allocations}
            size="sm"
            className="rounded-xl shadow-[0_0_20px_var(--theme-glow)] bg-gradient-to-r from-primary to-orange-500 hover:scale-105 transition-all text-xs font-bold gap-1.5"
          >
            <PlayIcon className="size-3.5" />
            <span>Run Allocation</span>
          </LinkButton>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. NATIONAL AI HUB FEATURE BANNER
          ───────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-r from-primary/20 via-primary/10 to-indigo-900/20 p-6 sm:p-8 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.35)]">
        <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-primary/25 blur-3xl" />
        <div className="pointer-events-none absolute right-1/4 -bottom-20 size-60 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="relative z-10 grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-3 py-1 text-xs font-bold text-primary shadow-[0_0_12px_var(--theme-glow)]">
              <SparklesIcon className="size-3.5 animate-pulse" />
              <span>PM Internship Scheme · Central National Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
              Fair, Transparent & Automated Quota Placement
            </h2>
            <p className="max-w-xl text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Equitably allocating high-impact corporate internships across academic disciplines, geographical quotas, and verified merit criteria.
            </p>
            <div className="pt-1 flex flex-wrap gap-3">
              <LinkButton
                href={ROUTES.admin.aiMatching}
                size="sm"
                className="rounded-xl bg-primary text-primary-foreground font-bold shadow-[0_0_18px_var(--theme-glow)]"
              >
                <span>Launch AI Allocation Matrix</span>
                <ArrowRightIcon className="size-3.5 ml-1" />
              </LinkButton>
              <LinkButton
                href={ROUTES.admin.fairness}
                variant="outline"
                size="sm"
                className="rounded-xl border-border/80 dark:border-white/15 dark:bg-white/[0.04]"
              >
                <span>Fairness & Bias Audit</span>
              </LinkButton>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 lg:col-span-4 lg:items-end">
            <div className="flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-bold text-emerald-500 dark:text-emerald-400 backdrop-blur-md shadow-sm w-fit">
              <CheckCircle2Icon className="size-4 shrink-0" />
              <span>Matching Matrix Engine Live</span>
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-xs font-bold text-blue-400 backdrop-blur-md shadow-sm w-fit">
              <CheckCircle2Icon className="size-4 shrink-0" />
              <span>Seat Quota Constraints Enforced</span>
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-xs font-bold text-purple-400 backdrop-blur-md shadow-sm w-fit">
              <CheckCircle2Icon className="size-4 shrink-0" />
              <span>Real-Time Audit Trail Logging</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. NATIONAL KEY METRICS (8-Stat Command Grid)
          ───────────────────────────────────────────────────────────── */}
      <div>
        <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground mb-3">
          Core Stakeholder Metrics
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          
          <Link href={ROUTES.admin.students} className="block group">
            <Card className="relative overflow-hidden rounded-2xl border border-border/80 bg-card/90 p-5 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-[0_8px_30px_var(--theme-glow)] hover:-translate-y-1">
              <div className="flex items-start justify-between gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-400 border border-blue-500/25">
                  <GraduationCapIcon className="size-5" />
                </div>
                <div className="w-24 h-9">
                  <svg viewBox="0 0 100 32" className="w-full h-full stroke-blue-400 fill-none stroke-2">
                    <path d={sparklines.students} strokeLinecap="round" />
                  </svg>
                </div>
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground font-mono">
                    Total Students
                  </p>
                  <p className="text-3xl font-black tabular-nums tracking-tight text-foreground">
                    {stats.totalStudents}
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-500 dark:text-emerald-400 flex items-center gap-0.5">
                  ↑ Registered
                </span>
              </div>
            </Card>
          </Link>

          <Link href={ROUTES.admin.companies} className="block group">
            <Card className="relative overflow-hidden rounded-2xl border border-border/80 bg-card/90 p-5 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-[0_8px_30px_var(--theme-glow)] hover:-translate-y-1">
              <div className="flex items-start justify-between gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/15 text-primary border border-primary/25 shadow-[0_0_12px_var(--theme-glow)]">
                  <BuildingIcon className="size-5" />
                </div>
                <div className="w-24 h-9">
                  <svg viewBox="0 0 100 32" className="w-full h-full stroke-orange-400 fill-none stroke-2">
                    <path d={sparklines.companies} strokeLinecap="round" />
                  </svg>
                </div>
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground font-mono">
                    Partner Companies
                  </p>
                  <p className="text-3xl font-black tabular-nums tracking-tight text-foreground">
                    {stats.totalCompanies}
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-500 dark:text-emerald-400 flex items-center gap-0.5">
                  ↑ Verified
                </span>
              </div>
            </Card>
          </Link>

          <Link href={ROUTES.admin.internships} className="block group">
            <Card className="relative overflow-hidden rounded-2xl border border-border/80 bg-card/90 p-5 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-[0_8px_30px_var(--theme-glow)] hover:-translate-y-1">
              <div className="flex items-start justify-between gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-purple-500/15 text-purple-400 border border-purple-500/25">
                  <BriefcaseIcon className="size-5" />
                </div>
                <div className="w-24 h-9">
                  <svg viewBox="0 0 100 32" className="w-full h-full stroke-purple-400 fill-none stroke-2">
                    <path d={sparklines.internships} strokeLinecap="round" />
                  </svg>
                </div>
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground font-mono">
                    Total Postings
                  </p>
                  <p className="text-3xl font-black tabular-nums tracking-tight text-foreground">
                    {stats.totalInternships}
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-500 dark:text-emerald-400 flex items-center gap-0.5">
                  ↑ Published
                </span>
              </div>
            </Card>
          </Link>

          <Link href={ROUTES.admin.applications} className="block group">
            <Card className="relative overflow-hidden rounded-2xl border border-border/80 bg-card/90 p-5 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-[0_8px_30px_var(--theme-glow)] hover:-translate-y-1">
              <div className="flex items-start justify-between gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-400 border border-amber-500/25">
                  <ClipboardListIcon className="size-5" />
                </div>
                <div className="w-24 h-9">
                  <svg viewBox="0 0 100 32" className="w-full h-full stroke-amber-400 fill-none stroke-2">
                    <path d={sparklines.applications} strokeLinecap="round" />
                  </svg>
                </div>
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground font-mono">
                    Total Applications
                  </p>
                  <p className="text-3xl font-black tabular-nums tracking-tight text-foreground">
                    {stats.totalApplications}
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-500 dark:text-emerald-400 flex items-center gap-0.5">
                  ↑ Processed
                </span>
              </div>
            </Card>
          </Link>

        </div>
      </div>

      {/* Row 2 Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        
        <Link href={ROUTES.admin.capacity} className="block group">
          <Card className="relative overflow-hidden rounded-2xl border border-border/80 bg-card/90 p-5 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-[0_8px_30px_var(--theme-glow)] hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground font-mono">
                  Total Capacity (Seats)
                </p>
                <p className="mt-2 text-3xl font-black tabular-nums tracking-tight text-foreground">
                  {stats.totalSeats}
                </p>
              </div>
              <div className="flex size-11 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/25">
                <UsersIcon className="size-5" />
              </div>
            </div>
          </Card>
        </Link>

        <Link href={ROUTES.admin.allocations} className="block group">
          <Card className="relative overflow-hidden rounded-2xl border border-border/80 bg-card/90 p-5 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-[0_8px_30px_var(--theme-glow)] hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground font-mono">
                  Confirmed Allocations
                </p>
                <p className="mt-2 text-3xl font-black tabular-nums tracking-tight text-foreground">
                  {stats.approvedAllocations}
                </p>
              </div>
              <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                <AwardIcon className="size-5" />
              </div>
            </div>
          </Card>
        </Link>

        <Link href={ROUTES.admin.allocations} className="block group">
          <Card className="relative overflow-hidden rounded-2xl border border-border/80 bg-card/90 p-5 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-[0_8px_30px_var(--theme-glow)] hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground font-mono">
                  Pending Allocations
                </p>
                <p className="mt-2 text-3xl font-black tabular-nums tracking-tight text-foreground">
                  {stats.pendingAllocations}
                </p>
              </div>
              <div className="flex size-11 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-400 border border-amber-500/25">
                <TrendingUpIcon className="size-5" />
              </div>
            </div>
          </Card>
        </Link>

        <Link href={ROUTES.admin.analytics} className="block group">
          <Card className="relative overflow-hidden rounded-2xl border border-border/80 bg-card/90 p-5 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-[0_8px_30px_var(--theme-glow)] hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground font-mono">
                  Fulfillment Rate
                </p>
                <p className="mt-2 text-3xl font-black tabular-nums tracking-tight text-emerald-500">
                  {stats.allocationRate}%
                </p>
              </div>
              <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                <ShieldCheckIcon className="size-5" />
              </div>
            </div>
          </Card>
        </Link>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. CHARTS: SECTOR DISTRIBUTION + ALLOCATION STATUS (Elevated Recharts)
          ───────────────────────────────────────────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-3">
        
        {/* Sector distribution */}
        <Card className="rounded-3xl border border-border/80 bg-card/90 p-6 backdrop-blur-xl shadow-sm lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-border/60 pb-3 dark:border-white/10">
              <div className="flex items-center gap-2">
                <LayersIcon className="size-4 text-primary" />
                <h3 className="text-sm font-bold text-foreground">Internship Distribution by Industry Sector</h3>
              </div>
              <Link href={ROUTES.admin.internships} className="text-xs font-bold text-primary hover:underline flex items-center gap-0.5">
                <span>View All Postings</span>
                <ArrowRightIcon className="size-3" />
              </Link>
            </div>

            <div className="mt-4">
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={sectorDistribution.slice(0, 7)} margin={{ top: 10, right: 10, bottom: 40, left: -10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#94a3b8" }} angle={-25} textAnchor="end" interval={0} />
                  <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(13, 17, 28, 0.95)",
                      borderColor: "rgba(255, 255, 255, 0.15)",
                      borderRadius: "1rem",
                      fontSize: "12px",
                      color: "#fff",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                    }}
                  />
                  <Bar dataKey="value" name="Internships" fill="var(--theme-color, #ea580c)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>

        {/* Allocation status Donut */}
        <Card className="rounded-3xl border border-border/80 bg-card/90 p-6 backdrop-blur-xl shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-border/60 pb-3 dark:border-white/10">
              <div className="flex items-center gap-2">
                <AwardIcon className="size-4 text-primary" />
                <h3 className="text-sm font-bold text-foreground">Allocation Status Ratio</h3>
              </div>
            </div>

            <div className="mt-4">
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={allocationStatusData}
                    cx="50%"
                    cy="45%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {allocationStatusData.map((_, i) => (
                      <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(13, 17, 28, 0.95)",
                      borderColor: "rgba(255, 255, 255, 0.15)",
                      borderRadius: "1rem",
                      fontSize: "12px",
                      color: "#fff",
                    }}
                  />
                  <Legend iconSize={10} wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          5. LOWER ACTIONS & VERIFICATION STREAM (2 Columns)
          ───────────────────────────────────────────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-2">
        
        {/* Pending Company Verifications */}
        <Card className="rounded-3xl border border-border/80 bg-card/90 p-6 backdrop-blur-xl shadow-sm">
          <div className="flex items-center justify-between border-b border-border/60 pb-3 dark:border-white/10">
            <div className="flex items-center gap-2">
              <BuildingIcon className="size-4 text-primary" />
              <h3 className="text-sm font-bold text-foreground">Pending Company Approvals</h3>
            </div>
            <Link href={ROUTES.admin.companies} className="text-xs font-bold text-primary hover:underline flex items-center gap-0.5">
              <span>View All</span>
              <ArrowRightIcon className="size-3" />
            </Link>
          </div>

          <div className="mt-4 space-y-3">
            {pendingCompanies.length === 0 ? (
              <div className="py-8 text-center text-xs text-muted-foreground">
                All companies are verified. Zero pending approvals.
              </div>
            ) : (
              pendingCompanies.slice(0, 3).map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-border/60 bg-muted/20 p-3.5 hover:border-primary/40 hover:bg-muted/40 transition-all dark:border-white/10 dark:bg-white/[0.02]"
                >
                  <div>
                    <h4 className="font-bold text-xs text-foreground truncate">
                      {c.companyName}
                    </h4>
                    <p className="text-[11px] text-muted-foreground">
                      {c.city}, {c.state} · Sector: {c.sector}
                    </p>
                  </div>
                  <LinkButton href={`${ROUTES.admin.companies}/${c.id}`} size="sm" className="rounded-xl h-8 px-3 text-xs font-bold">
                    Review & Verify
                  </LinkButton>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* AI Operations Suite Quick Links */}
        <Card className="rounded-3xl border border-border/80 bg-card/90 p-6 backdrop-blur-xl shadow-sm">
          <div className="flex items-center justify-between border-b border-border/60 pb-3 dark:border-white/10">
            <div className="flex items-center gap-2">
              <BrainCircuitIcon className="size-4 text-primary" />
              <h3 className="text-sm font-bold text-foreground">Autonomous Engine Modules</h3>
            </div>
            <span className="text-[10px] font-mono text-muted-foreground font-bold uppercase">
              Admin Ops
            </span>
          </div>

          <div className="mt-4 space-y-2">
            {[
              { label: "AI Matching Matrix Engine", desc: "Batch score candidate suitability across all openings", href: ROUTES.admin.aiMatching, icon: BrainCircuitIcon, color: "text-primary bg-primary/15" },
              { label: "National Allocation Engine", desc: "Run Gale-Shapley quota-constrained fair matching", href: ROUTES.admin.allocations, icon: PlayIcon, color: "text-emerald-400 bg-emerald-500/15" },
              { label: "Fairness & Anti-Bias Audit", desc: "Monitor affirmative quotas and diversity distribution", href: ROUTES.admin.fairness, icon: ScaleIcon, color: "text-blue-400 bg-blue-500/15" },
              { label: "Automated Reallocation Hub", desc: "Reassign vacant seats from withdrawn candidates", href: ROUTES.admin.reallocation, icon: RefreshCwIcon, color: "text-amber-400 bg-amber-500/15" },
            ].map((module) => (
              <Link
                key={module.label}
                href={module.href}
                className="group flex items-center justify-between gap-3 rounded-2xl border border-border/60 bg-muted/20 p-2.5 transition-all hover:border-primary/50 hover:bg-muted/40 hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/[0.02]"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={cn("size-8 rounded-xl flex items-center justify-center", module.color)}>
                    <module.icon className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-foreground group-hover:text-primary transition-colors truncate">
                      {module.label}
                    </p>
                    <p className="text-[10px] text-muted-foreground truncate">
                      {module.desc}
                    </p>
                  </div>
                </div>
                <ChevronRightIcon className="size-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>
            ))}
          </div>
        </Card>

      </div>

    </div>
  );
}
