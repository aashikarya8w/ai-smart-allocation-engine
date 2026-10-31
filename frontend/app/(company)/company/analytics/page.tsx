"use client";

import { PageHeader } from "@/components/common/PageHeader";
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
  Legend
} from "recharts";
import { useCompany } from "@/hooks/useCompany";
import {
  BriefcaseIcon,
  UsersIcon,
  AwardIcon,
  ClipboardListIcon,
  SparklesIcon,
  BarChart3Icon,
  TrendingUpIcon
} from "lucide-react";
import { CHART_COLORS, ROUTES } from "@/lib/constants";

export default function CompanyAnalyticsPage() {
  const { stats, internships, applications } = useCompany();

  const applicationsByStatus = [
    { name: "Applied", value: applications.filter((a) => a.status === "Applied").length },
    { name: "Shortlisted", value: applications.filter((a) => a.status === "Shortlisted").length },
    { name: "Allocated", value: applications.filter((a) => a.status === "Allocated").length },
    { name: "Rejected", value: applications.filter((a) => a.status === "Rejected").length },
  ].filter((d) => d.value > 0);

  const internshipData = internships.map((i) => ({
    name: i.title.length > 16 ? i.title.slice(0, 16) + "…" : i.title,
    Applications: i.totalApplications,
    Shortlisted: i.shortlistedCount,
    Seats: i.seats,
  }));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Corporate Recruitment Analytics"
        description="Comprehensive insights into application inflow, screening conversions, and seat utilization."
      />

      {/* Cyber Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent p-6 shadow-xl shadow-primary/5 backdrop-blur-md">
        <div className="absolute -right-10 -top-10 size-48 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-md">
              <BarChart3Icon className="size-3.5 text-primary" />
              <span>Real-Time Hiring Intelligence & Funnel</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Candidate Inflow & Conversion Pipeline
            </h2>
            <p className="max-w-2xl text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Track multi-stage screening velocity from application receipt to final affirmative allocation across all company listings.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-400">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              Live Funnel Active
            </span>
          </div>
        </div>
      </div>

      {/* 4 Modern Stat Cards with Sparklines */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Active Internships */}
        <div className="group relative overflow-hidden rounded-2xl border border-border/80 dark:border-white/10 bg-card/85 dark:bg-[#0e1322]/85 p-5 backdrop-blur-md transition-all hover:border-primary/50 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Active Listings</span>
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary/15 text-primary border border-primary/30">
              <BriefcaseIcon className="size-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div className="text-3xl font-bold tracking-tight text-foreground">{stats.activeInternships} Roles</div>
            <span className="text-xs font-semibold text-primary">Live</span>
          </div>
          <div className="mt-3 h-8 w-full">
            <svg className="h-full w-full overflow-visible" viewBox="0 0 100 25" preserveAspectRatio="none">
              <path d="M 0 16 Q 30 16 60 16 T 100 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-primary" />
            </svg>
          </div>
        </div>

        {/* Total Applications */}
        <div className="group relative overflow-hidden rounded-2xl border border-border/80 dark:border-white/10 bg-card/85 dark:bg-[#0e1322]/85 p-5 backdrop-blur-md transition-all hover:border-blue-500/50 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total Inflow</span>
            <div className="flex size-9 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400 border border-blue-500/30">
              <ClipboardListIcon className="size-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div className="text-3xl font-bold tracking-tight text-foreground">{stats.totalApplications} Applicants</div>
            <span className="text-xs font-semibold text-blue-400">↑ +24% YoY</span>
          </div>
          <div className="mt-3 h-8 w-full">
            <svg className="h-full w-full overflow-visible" viewBox="0 0 100 25" preserveAspectRatio="none">
              <path d="M 0 20 Q 30 15 65 10 T 100 3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-blue-500" />
            </svg>
          </div>
        </div>

        {/* Shortlisted */}
        <div className="group relative overflow-hidden rounded-2xl border border-border/80 dark:border-white/10 bg-card/85 dark:bg-[#0e1322]/85 p-5 backdrop-blur-md transition-all hover:border-emerald-500/50 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Shortlisted Talent</span>
            <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              <UsersIcon className="size-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div className="text-3xl font-bold tracking-tight text-foreground">{stats.shortlistedCount} Selected</div>
            <span className="text-xs font-semibold text-emerald-400">Top Tier</span>
          </div>
          <div className="mt-3 h-8 w-full">
            <svg className="h-full w-full overflow-visible" viewBox="0 0 100 25" preserveAspectRatio="none">
              <path d="M 0 18 Q 30 14 60 8 T 100 2" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-emerald-500" />
            </svg>
          </div>
        </div>

        {/* Available Seats */}
        <div className="group relative overflow-hidden rounded-2xl border border-border/80 dark:border-white/10 bg-card/85 dark:bg-[#0e1322]/85 p-5 backdrop-blur-md transition-all hover:border-purple-500/50 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Available Capacity</span>
            <div className="flex size-9 items-center justify-center rounded-xl bg-purple-500/15 text-purple-400 border border-purple-500/30">
              <AwardIcon className="size-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div className="text-3xl font-bold tracking-tight text-foreground">{stats.availableSeats} Remaining</div>
            <span className="text-xs font-semibold text-purple-400">Open Quotas</span>
          </div>
          <div className="mt-3 h-8 w-full">
            <svg className="h-full w-full overflow-visible" viewBox="0 0 100 25" preserveAspectRatio="none">
              <path d="M 0 12 Q 35 12 70 12 T 100 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-purple-500" />
            </svg>
          </div>
        </div>
      </div>

      {/* Visual Analytics Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Applications per Internship */}
        <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <h3 className="text-sm font-bold text-foreground">Candidate Inflow by Internship Listing</h3>
            <span className="text-xs text-muted-foreground font-mono">Volume Metric</span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={internshipData} margin={{ top: 10, right: 10, bottom: 5, left: -15 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "var(--foreground)" }} />
                <YAxis tick={{ fontSize: 11, fill: "var(--foreground)" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0d1220",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: "12px",
                    fontSize: "12px",
                    color: "#fff",
                  }}
                />
                <Bar dataKey="Applications" fill="#f97316" radius={[6, 6, 0, 0]} />
                <Bar dataKey="Shortlisted" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Funnel Distribution Donut */}
        <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <h3 className="text-sm font-bold text-foreground">Application Status Funnel Breakdown</h3>
            <span className="text-xs text-emerald-400 font-bold">100% Normalized</span>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            {applicationsByStatus.length === 0 ? (
              <span className="text-xs text-muted-foreground">No candidate application data logged yet.</span>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={applicationsByStatus}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={95}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {applicationsByStatus.map((_, i) => (
                      <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
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
                  />
                  <Legend iconSize={10} wrapperStyle={{ fontSize: 11, color: "var(--foreground)" }} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
