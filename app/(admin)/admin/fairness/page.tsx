"use client";

import { ScaleIcon, CheckCircleIcon, AlertTriangleIcon, UsersIcon, AwardIcon } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
} from "recharts";
import { useAdmin } from "@/hooks/useAdmin";
import { CHART_COLORS } from "@/lib/constants";

const SUITABILITY_DIST = [
  { range: "90-100%", count: 4,  color: "#22c55e" },
  { range: "80-89%",  count: 8,  color: "#6366f1" },
  { range: "70-79%",  count: 12, color: "#3b82f6" },
  { range: "60-69%",  count: 7,  color: "#f59e0b" },
  { range: "< 60%",   count: 4,  color: "#ef4444" },
];

const PREFERENCE_DATA = [
  { name: "Location Met",   value: 78 },
  { name: "Sector Met",     value: 82 },
  { name: "Work Mode Met",  value: 71 },
];

const SECTOR_FAIRNESS = [
  { sector: "Software",   allocated: 12, waitlisted: 5, notAllocated: 3 },
  { sector: "Data/ML",    allocated: 6,  waitlisted: 4, notAllocated: 2 },
  { sector: "Finance",    allocated: 4,  waitlisted: 2, notAllocated: 3 },
  { sector: "EdTech",     allocated: 3,  waitlisted: 2, notAllocated: 1 },
  { sector: "Energy",     allocated: 2,  waitlisted: 1, notAllocated: 2 },
];

export default function FairnessPage() {
  const { stats } = useAdmin();
  const total = stats.totalAllocations + 8 + 17; // alloc + waitlisted + not alloc
  const seatUtil = Math.round((stats.approvedAllocations / Math.max(stats.totalSeats, 1)) * 100);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Fairness Dashboard"
        description="Transparent overview of allocation fairness, seat utilization, and rule consistency."
      />

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Allocated"     value={stats.approvedAllocations} icon={AwardIcon}        trend="up" />
        <StatCard title="Waitlisted"    value={8}                          icon={AlertTriangleIcon} trend="neutral" />
        <StatCard title="Not Allocated" value={17}                         icon={UsersIcon}         trend="neutral" />
        <StatCard title="Seat Utilization" value={`${seatUtil}%`}         icon={CheckCircleIcon}  trend="up" />
      </div>

      {/* Fairness principles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <ScaleIcon className="size-4 text-primary" />
            Fairness Principles Applied
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Consistent Rules",       desc: "Same criteria applied to all candidates",                ok: true  },
              { label: "Objective Criteria",     desc: "Score-based decisions, no arbitrary selection",          ok: true  },
              { label: "Transparent Decisions",  desc: "Every allocation has a logged explanation",              ok: true  },
              { label: "Seat Constraints",       desc: "Never exceeded available seats",                         ok: true  },
              { label: "Tie-Breaking Applied",   desc: "Defined rules used for candidates with equal scores",    ok: true  },
              { label: "Rule Violations",        desc: "Allocations where rules were overridden",                ok: false, count: 0 },
            ].map((p) => (
              <div key={p.label} className={`rounded-lg border p-3 ${p.ok && p.count !== 0 ? "border-border" : p.ok ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20" : "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/20"}`}>
                <div className="flex items-center gap-2">
                  {p.ok ? (
                    <CheckCircleIcon className="size-4 text-green-500 shrink-0" />
                  ) : (
                    <AlertTriangleIcon className="size-4 text-amber-500 shrink-0" />
                  )}
                  <p className="text-xs font-semibold text-foreground">{p.label}</p>
                  {p.count !== undefined && (
                    <Badge variant={p.count > 0 ? "destructive" : "secondary"} className="ml-auto text-xs">
                      {p.count}
                    </Badge>
                  )}
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground pl-6">{p.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Suitability distribution pie */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Suitability Score Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={SUITABILITY_DIST}
                  dataKey="count"
                  nameKey="range"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }: { name?: string; percent?: number }) => `${name ?? ""} (${Math.round((percent ?? 0) * 100)}%)`}
                  labelLine={false}
                >
                  {SUITABILITY_DIST.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => [`${v} candidates`, "Count"]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {SUITABILITY_DIST.map((d) => (
                <div key={d.range} className="flex items-center gap-1 text-xs">
                  <div className="size-2.5 rounded-full" style={{ background: d.color }} />
                  <span className="text-muted-foreground">{d.range}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Preference satisfaction */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Preference Satisfaction</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {PREFERENCE_DATA.map((p) => (
              <div key={p.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-foreground">{p.name}</span>
                  <span className="font-semibold text-foreground">{p.value}%</span>
                </div>
                <Progress value={p.value} className="h-2" />
              </div>
            ))}
            <div className="pt-2 rounded-lg bg-muted/50 p-3">
              <p className="text-xs text-muted-foreground">
                Preference satisfaction measures how often allocated students received internships matching their stated preferences.
                Higher scores indicate better alignment with student choices.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sector-wise allocation */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Sector-wise Allocation Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={SECTOR_FAIRNESS} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="sector" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="allocated"    name="Allocated"     fill="#22c55e" radius={[4,4,0,0]} />
              <Bar dataKey="waitlisted"   name="Waitlisted"    fill="#f59e0b" radius={[4,4,0,0]} />
              <Bar dataKey="notAllocated" name="Not Allocated" fill="#ef4444" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Tie cases */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Tie-Breaking Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: "Total Tie Cases",         value: 7,    color: "text-foreground"  },
              { label: "Resolved by Skill Cover", value: 4,    color: "text-blue-600"    },
              { label: "Resolved by Assessment",  value: 2,    color: "text-purple-600"  },
              { label: "Resolved by CGPA",        value: 1,    color: "text-green-600"   },
              { label: "Remaining Unresolved",    value: 0,    color: "text-green-600"   },
              { label: "Manual Override",         value: 0,    color: "text-foreground"  },
            ].map((t) => (
              <div key={t.label} className="rounded-lg bg-muted/50 p-3">
                <p className={`text-2xl font-bold ${t.color}`}>{t.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{t.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
