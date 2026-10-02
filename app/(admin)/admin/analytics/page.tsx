"use client";

import {
  BarChart3Icon, UsersIcon, BuildingIcon, BriefcaseIcon,
  ClipboardListIcon, AwardIcon, TrendingUpIcon, TargetIcon,
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
  AreaChart, Area,
} from "recharts";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useAdmin } from "@/hooks/useAdmin";
import { CHART_COLORS } from "@/lib/constants";

export default function AdminAnalyticsPage() {
  const { stats } = useAdmin();
  const {
    summary, applicationsOverTime, allocationsOverTime,
    sectorDistribution, skillDemand, stateData, sectorData,
    allocationStatusData, applicationStatusData,
  } = useAnalytics();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics"
        description="Platform-wide analytics and insights for the PM Internship Scheme."
      />

      {/* Top stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Students"     value={stats.totalStudents}                    icon={UsersIcon}        trend="up" />
        <StatCard title="Total Companies"    value={stats.totalCompanies}                   icon={BuildingIcon}     trend="up" />
        <StatCard title="Total Internships"  value={stats.totalInternships}                 icon={BriefcaseIcon}    trend="up" />
        <StatCard title="Total Applications" value={stats.totalApplications}                icon={ClipboardListIcon}trend="up" />
        <StatCard title="Allocated"          value={stats.approvedAllocations}              icon={AwardIcon}        trend="up" />
        <StatCard title="Avg Match Score"    value={`${summary.averageMatchScore.toFixed(1)}%`} icon={TargetIcon}  trend="up" />
        <StatCard title="Seat Utilization"   value={`${summary.seatUtilization}%`}          icon={TrendingUpIcon}   trend="up" />
        <StatCard title="Allocation Rate"    value={`${summary.allocationRate}%`}           icon={BarChart3Icon}    trend="up" />
      </div>

      {/* Line charts – over time */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Applications Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={applicationsOverTime} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Area type="monotone" dataKey="value" name="Applications" stroke={CHART_COLORS[0]} fill={CHART_COLORS[0]} fillOpacity={0.15} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Allocations Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={allocationsOverTime} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Area type="monotone" dataKey="value" name="Allocations" stroke={CHART_COLORS[1]} fill={CHART_COLORS[1]} fillOpacity={0.15} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Status distributions */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Application Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={applicationStatusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }: { name?: string; percent?: number }) => `${name ?? ""} ${((percent ?? 0) * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {applicationStatusData.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => [`${v}`, "Count"]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Allocation Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={allocationStatusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }: { name?: string; percent?: number }) => `${name ?? ""} ${((percent ?? 0) * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {allocationStatusData.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => [`${v}`, "Count"]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Sector distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Sector-wise Internship Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={sectorData} margin={{ top: 5, right: 10, left: -10, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="sector" tick={{ fontSize: 10, angle: -25, textAnchor: "end" }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="internships"   name="Internships"   fill={CHART_COLORS[0]} radius={[4,4,0,0]} />
              <Bar dataKey="applications"  name="Applications"  fill={CHART_COLORS[1]} radius={[4,4,0,0]} />
              <Bar dataKey="allocations"   name="Allocations"   fill={CHART_COLORS[2]} radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Skill demand */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Top In-Demand Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={skillDemand} layout="vertical" margin={{ top: 0, right: 20, left: 80, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10 }} domain={[0, 100]} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: 8 }}
                formatter={(v) => [`${v}%`, "Demand Score"]}
              />
              <Bar dataKey="value" name="Demand" fill={CHART_COLORS[3]} radius={[0,4,4,0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* State-wise distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">State-wise Student Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-2 text-left text-xs text-muted-foreground font-medium">State</th>
                  <th className="pb-2 text-right text-xs text-muted-foreground font-medium">Students</th>
                  <th className="pb-2 text-right text-xs text-muted-foreground font-medium">Internships</th>
                  <th className="pb-2 text-right text-xs text-muted-foreground font-medium">Allocations</th>
                </tr>
              </thead>
              <tbody>
                {stateData.map((row) => (
                  <tr key={row.state} className="border-b border-border/50">
                    <td className="py-2 text-foreground">{row.state}</td>
                    <td className="py-2 text-right text-muted-foreground">{row.students}</td>
                    <td className="py-2 text-right text-muted-foreground">{row.internships}</td>
                    <td className="py-2 text-right font-medium text-foreground">{row.allocations}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Assessment & Suitability metrics */}
      <div className="grid gap-5 sm:grid-cols-3">
        {[
          { label: "Average Match Score",     value: `${summary.averageMatchScore.toFixed(1)}%`, sub: "Across all recommendations"  },
          { label: "Average Suitability",     value: "84%",                                       sub: "Platform-wide average"       },
          { label: "Assessment Pass Rate",    value: "76%",                                       sub: "Of assessments taken"        },
          { label: "Preference Satisfaction", value: "78%",                                       sub: "Location + sector + mode"    },
          { label: "Seat Utilization",        value: `${summary.seatUtilization}%`,               sub: "Of total available seats"    },
          { label: "Profile Completion Avg",  value: "74%",                                       sub: "Across student profiles"     },
        ].map((m) => (
          <div key={m.label} className="rounded-xl border border-border p-4 space-y-1">
            <p className="text-2xl font-bold text-foreground">{m.value}</p>
            <p className="text-xs font-semibold text-foreground">{m.label}</p>
            <p className="text-xs text-muted-foreground">{m.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
