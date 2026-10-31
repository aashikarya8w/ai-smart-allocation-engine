"use client";

import {
  BarChart3Icon, UsersIcon, BuildingIcon, BriefcaseIcon,
  ClipboardListIcon, AwardIcon, TrendingUpIcon, TargetIcon,
  SparklesIcon, ArrowUpRightIcon, ShieldCheckIcon, ActivityIcon,
  CheckCircle2Icon, Globe2Icon, CompassIcon, PieChartIcon,
  ZapIcon, DownloadIcon, RefreshCwIcon,
} from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
  AreaChart, Area,
} from "recharts";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useAdmin } from "@/hooks/useAdmin";
import { CHART_COLORS, ROUTES } from "@/lib/constants";
import Link from "next/link";
import { useState } from "react";

export default function AdminAnalyticsPage() {
  const { stats } = useAdmin();
  const {
    summary, applicationsOverTime, allocationsOverTime,
    sectorDistribution, skillDemand, stateData, sectorData,
    allocationStatusData, applicationStatusData,
  } = useAnalytics();

  const [activeTab, setActiveTab] = useState<"overview" | "trends" | "sectors" | "states">("overview");

  // Sparkline data helpers
  const statCards = [
    {
      title: "Total Registered Students",
      value: stats.totalStudents.toLocaleString(),
      change: "+18.4%",
      isPositive: true,
      icon: UsersIcon,
      color: "from-blue-500 to-indigo-600",
      accent: "#3b82f6",
      href: ROUTES.admin.students,
      spark: "M0,20 Q15,8 30,16 T60,6 T90,14 T120,4",
    },
    {
      title: "Partner Enterprises",
      value: stats.totalCompanies.toLocaleString(),
      change: "+12.1%",
      isPositive: true,
      icon: BuildingIcon,
      color: "from-emerald-500 to-teal-600",
      accent: "#10b981",
      href: ROUTES.admin.companies,
      spark: "M0,18 Q20,12 40,15 T80,8 T100,12 T120,3",
    },
    {
      title: "Active Opportunities",
      value: stats.totalInternships.toLocaleString(),
      change: "+24.8%",
      isPositive: true,
      icon: BriefcaseIcon,
      color: "from-amber-500 to-orange-600",
      accent: "#f59e0b",
      href: ROUTES.admin.internships,
      spark: "M0,22 Q15,18 35,10 T70,12 T100,5 T120,2",
    },
    {
      title: "Scheme Applications",
      value: stats.totalApplications.toLocaleString(),
      change: "+31.2%",
      isPositive: true,
      icon: ClipboardListIcon,
      color: "from-purple-500 to-pink-600",
      accent: "#a855f7",
      href: ROUTES.admin.applications,
      spark: "M0,24 Q25,14 50,16 T80,6 T105,10 T120,2",
    },
    {
      title: "Confirmed Allocations",
      value: stats.approvedAllocations.toLocaleString(),
      change: "+9.5%",
      isPositive: true,
      icon: AwardIcon,
      color: "from-cyan-500 to-blue-600",
      accent: "#06b6d4",
      href: ROUTES.admin.allocations,
      spark: "M0,16 Q20,20 40,12 T75,9 T100,4 T120,1",
    },
    {
      title: "AI Match Precision",
      value: `${summary.averageMatchScore.toFixed(1)}%`,
      change: "+4.2%",
      isPositive: true,
      icon: TargetIcon,
      color: "from-rose-500 to-pink-600",
      accent: "#f43f5e",
      href: ROUTES.admin.aiMatchingResults,
      spark: "M0,14 Q30,6 60,10 T90,4 T120,2",
    },
    {
      title: "Capacity Utilization",
      value: `${summary.seatUtilization}%`,
      change: "+15.0%",
      isPositive: true,
      icon: TrendingUpIcon,
      color: "from-teal-500 to-emerald-600",
      accent: "#14b8a6",
      href: ROUTES.admin.capacity,
      spark: "M0,20 Q20,10 50,14 T85,6 T120,3",
    },
    {
      title: "Allocation Efficiency",
      value: `${summary.allocationRate}%`,
      change: "+7.8%",
      isPositive: true,
      icon: BarChart3Icon,
      color: "from-violet-500 to-purple-600",
      accent: "#8b5cf6",
      href: ROUTES.admin.fairness,
      spark: "M0,18 Q25,12 50,15 T80,5 T120,2",
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-br from-[#0c1222] via-[#0f172a] to-[#1e1338] p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl">
        <div className="absolute -top-32 -right-24 h-96 w-96 rounded-full bg-gradient-to-br from-primary/20 via-purple-500/15 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-gradient-to-tr from-cyan-500/15 via-blue-500/10 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Real-Time National Telemetry & Analytics
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Executive <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Intelligence</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed font-normal">
              Continuous live monitoring of the Prime Minister’s Internship Scheme. Track applicant velocity, AI matching accuracy, affirmative action fulfillment, and cross-state employment distribution.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold backdrop-blur-md transition-all shadow-sm active:scale-95"
            >
              <RefreshCwIcon className="h-3.5 w-3.5" />
              Sync Stream
            </button>
            <Link
              href={ROUTES.admin.reports}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary via-indigo-600 to-purple-600 hover:from-primary/90 hover:to-purple-700 text-white text-xs font-semibold shadow-lg shadow-primary/25 transition-all active:scale-95"
            >
              <DownloadIcon className="h-3.5 w-3.5" />
              Export PDF Report
            </Link>
          </div>
        </div>

        {/* Live Status Bar */}
        <div className="relative z-10 mt-8 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <ShieldCheckIcon className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>Telemetry Pipeline: <strong className="text-emerald-400 font-semibold">100% Synced</strong></span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <ZapIcon className="h-4 w-4 text-amber-400 shrink-0" />
            <span>AI Matching Engine: <strong className="text-amber-400 font-semibold">Gale-Shapley v4.2</strong></span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <ActivityIcon className="h-4 w-4 text-cyan-400 shrink-0" />
            <span>Throughput: <strong className="text-cyan-400 font-semibold">1,420 ev/sec</strong></span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Globe2Icon className="h-4 w-4 text-purple-400 shrink-0" />
            <span>Coverage: <strong className="text-purple-400 font-semibold">36 States & UTs</strong></span>
          </div>
        </div>
      </div>

      {/* 8 Metric Cards with Cyber Sparklines */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Link
              key={i}
              href={stat.href}
              className="group relative overflow-hidden rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-5 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-primary/10"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">{stat.title}</p>
                  <p className="mt-2 text-2xl lg:text-3xl font-extrabold tracking-tight text-foreground">{stat.value}</p>
                  <div className="mt-2 flex items-center gap-1.5">
                    <span className="inline-flex items-center text-[11px] font-semibold text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-md">
                      <ArrowUpRightIcon className="mr-0.5 h-3 w-3" />
                      {stat.change}
                    </span>
                    <span className="text-[11px] text-muted-foreground">vs last cycle</span>
                  </div>
                </div>

                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-md group-hover:scale-110 transition-transform`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>

              {/* Sparkline curve */}
              <div className="mt-4 flex items-end justify-between">
                <svg className="w-full h-8 overflow-visible" viewBox="0 0 120 25">
                  <path
                    d={stat.spark}
                    fill="none"
                    stroke={stat.accent}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                  <circle cx="120" cy="2" r="3.5" fill={stat.accent} />
                </svg>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Temporal Analysis Area Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Applications Velocity */}
        <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-6 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between pb-4 border-b border-border/50 dark:border-white/5">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                <h3 className="text-base font-bold text-foreground">Applications Velocity</h3>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">Daily submission throughput across all nationwide domains</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">
              Live Feed
            </span>
          </div>

          <div className="pt-6">
            <ResponsiveContainer width="100%" height={230}>
              <AreaChart data={applicationsOverTime} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                <defs>
                  <linearGradient id="appColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "currentColor" }} opacity={0.6} />
                <YAxis tick={{ fontSize: 11, fill: "currentColor" }} opacity={0.6} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0d1220",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: "12px",
                    fontSize: "12px",
                    color: "#fff",
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)",
                  }}
                />
                <Area type="monotone" dataKey="value" name="Applications" stroke="#3b82f6" fill="url(#appColor)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Allocations Momentum */}
        <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-6 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between pb-4 border-b border-border/50 dark:border-white/5">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="text-base font-bold text-foreground">Seat Allocation Momentum</h3>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">Cumulative algorithmic matches confirmed & locked</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              Verified
            </span>
          </div>

          <div className="pt-6">
            <ResponsiveContainer width="100%" height={230}>
              <AreaChart data={allocationsOverTime} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                <defs>
                  <linearGradient id="allocColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "currentColor" }} opacity={0.6} />
                <YAxis tick={{ fontSize: 11, fill: "currentColor" }} opacity={0.6} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0d1220",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: "12px",
                    fontSize: "12px",
                    color: "#fff",
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)",
                  }}
                />
                <Area type="monotone" dataKey="value" name="Allocations" stroke="#10b981" fill="url(#allocColor)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Status Distributions & Sector Analytics */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Application Status Distribution */}
        <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-6 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between pb-4 border-b border-border/50 dark:border-white/5">
            <div>
              <h3 className="text-base font-bold text-foreground">Application Pipeline Stages</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Live distribution of candidate candidate flows</p>
            </div>
            <PieChartIcon className="h-5 w-5 text-muted-foreground" />
          </div>

          <div className="pt-6">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={applicationStatusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={85}
                  innerRadius={45}
                  paddingAngle={4}
                  label={({ name, percent }: { name?: string; percent?: number }) => `${name ?? ""} ${((percent ?? 0) * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {applicationStatusData.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} stroke="rgba(0,0,0,0.2)" strokeWidth={2} />
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
                  formatter={(v) => [`${v}`, "Count"]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Allocation Status Distribution */}
        <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-6 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between pb-4 border-b border-border/50 dark:border-white/5">
            <div>
              <h3 className="text-base font-bold text-foreground">Seat Allocation Status</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Breakdown of offer acceptances and confirmations</p>
            </div>
            <AwardIcon className="h-5 w-5 text-muted-foreground" />
          </div>

          <div className="pt-6">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={allocationStatusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={85}
                  innerRadius={45}
                  paddingAngle={4}
                  label={({ name, percent }: { name?: string; percent?: number }) => `${name ?? ""} ${((percent ?? 0) * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {allocationStatusData.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[(i + 3) % CHART_COLORS.length]} stroke="rgba(0,0,0,0.2)" strokeWidth={2} />
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
                  formatter={(v) => [`${v}`, "Count"]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Sector-wise Internship Distribution BarChart */}
      <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-6 shadow-xl backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-border/50 dark:border-white/5">
          <div>
            <h3 className="text-base font-bold text-foreground">Sector-wise Program Distribution</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Cross-industry comparison of available seats, candidate interest, and final placements</p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-blue-500" /> Internships</span>
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-emerald-500" /> Applications</span>
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-purple-500" /> Allocations</span>
          </div>
        </div>

        <div className="pt-6">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={sectorData} margin={{ top: 10, right: 10, left: -10, bottom: 45 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="sector" tick={{ fontSize: 10, angle: -25, textAnchor: "end", fill: "currentColor" }} opacity={0.7} />
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
              <Bar dataKey="internships" name="Internships" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              <Bar dataKey="applications" name="Applications" fill="#10b981" radius={[6, 6, 0, 0]} />
              <Bar dataKey="allocations" name="Allocations" fill="#a855f7" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top In-Demand Skills & National Distribution Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top In-Demand Skills */}
        <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-6 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between pb-4 border-b border-border/50 dark:border-white/5">
            <div>
              <h3 className="text-base font-bold text-foreground">Top In-Demand National Competencies</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Most sought-after technical skills by host corporate partners</p>
            </div>
            <SparklesIcon className="h-5 w-5 text-amber-400" />
          </div>

          <div className="pt-6">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={skillDemand} layout="vertical" margin={{ top: 0, right: 20, left: 80, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10, fill: "currentColor" }} domain={[0, 100]} opacity={0.6} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "currentColor" }} opacity={0.8} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0d1220",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: "12px",
                    fontSize: "12px",
                    color: "#fff",
                  }}
                  formatter={(v) => [`${v}%`, "Industry Demand"]}
                />
                <Bar dataKey="value" name="Demand" fill="#f59e0b" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* State-wise Distribution Table */}
        <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-6 shadow-xl backdrop-blur-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-border/50 dark:border-white/5">
              <div>
                <h3 className="text-base font-bold text-foreground">State-wise Participation</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Regional geographic reach and allocation counts</p>
              </div>
              <CompassIcon className="h-5 w-5 text-cyan-400" />
            </div>

            <div className="pt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50 dark:border-white/10">
                    <th className="pb-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">State / UT</th>
                    <th className="pb-2.5 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Students</th>
                    <th className="pb-2.5 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Seats</th>
                    <th className="pb-2.5 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Allocated</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30 dark:divide-white/5">
                  {stateData.slice(0, 6).map((row) => (
                    <tr key={row.state} className="hover:bg-muted/40 dark:hover:bg-white/[0.02] transition-colors">
                      <td className="py-2.5 font-medium text-foreground flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {row.state}
                      </td>
                      <td className="py-2.5 text-right text-muted-foreground">{row.students.toLocaleString()}</td>
                      <td className="py-2.5 text-right text-muted-foreground">{row.internships.toLocaleString()}</td>
                      <td className="py-2.5 text-right font-bold text-primary">{row.allocations.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-4 border-t border-border/40 dark:border-white/5 flex items-center justify-between text-xs text-muted-foreground">
            <span>Showing top participating Indian states</span>
            <Link href={ROUTES.admin.reports} className="text-primary hover:underline font-medium inline-flex items-center gap-1">
              Full State Ledger <ArrowUpRightIcon className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* 6 High-Performance Governance Health Indicators */}
      <div>
        <h3 className="text-lg font-bold text-foreground mb-4">Governance & Performance Index</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              label: "Average AI Match Score",
              value: `${summary.averageMatchScore.toFixed(1)}%`,
              sub: "Gale-Shapley precision rate across student choices",
              badge: "Optimal",
              color: "text-blue-500",
              ring: "bg-blue-500/10 border-blue-500/20",
            },
            {
              label: "Candidate Suitability",
              value: "84.2%",
              sub: "Calculated skill overlap with corporate specifications",
              badge: "High",
              color: "text-emerald-500",
              ring: "bg-emerald-500/10 border-emerald-500/20",
            },
            {
              label: "Technical Assessment Pass Rate",
              value: "76.4%",
              sub: "Aptitude & domain verification assessment completion",
              badge: "Solid",
              color: "text-cyan-500",
              ring: "bg-cyan-500/10 border-cyan-500/20",
            },
            {
              label: "Multi-factor Preference Alignment",
              value: "78.9%",
              sub: "Optimal location, domain stipend, and work-mode match",
              badge: "Balanced",
              color: "text-purple-500",
              ring: "bg-purple-500/10 border-purple-500/20",
            },
            {
              label: "Corporate Seat Utilization",
              value: `${summary.seatUtilization}%`,
              sub: "Active absorption of approved corporate internship quotas",
              badge: "Active",
              color: "text-amber-500",
              ring: "bg-amber-500/10 border-amber-500/20",
            },
            {
              label: "Aadhaar eKYC Verified Ratio",
              value: "92.6%",
              sub: "National identity verification completed prior to allocation",
              badge: "Compliant",
              color: "text-rose-500",
              ring: "bg-rose-500/10 border-rose-500/20",
            },
          ].map((m) => (
            <div
              key={m.label}
              className="relative overflow-hidden rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-5 shadow-lg backdrop-blur-md transition-all hover:-translate-y-1 hover:border-primary/40"
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${m.ring} ${m.color}`}>
                  {m.badge}
                </span>
                <CheckCircle2Icon className={`h-4 w-4 ${m.color}`} />
              </div>
              <p className="text-3xl font-black text-foreground tracking-tight">{m.value}</p>
              <p className="text-xs font-bold text-foreground mt-1">{m.label}</p>
              <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{m.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
