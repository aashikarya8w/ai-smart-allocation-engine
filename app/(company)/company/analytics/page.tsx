"use client";

import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { useCompany } from "@/hooks/useCompany";
import { BriefcaseIcon, UsersIcon, AwardIcon, ClipboardListIcon } from "lucide-react";
import { CHART_COLORS } from "@/lib/constants";

export default function CompanyAnalyticsPage() {
  const { stats, internships, applications } = useCompany();

  const applicationsByStatus = [
    { name: "Applied",     value: applications.filter((a) => a.status === "Applied").length     },
    { name: "Shortlisted", value: applications.filter((a) => a.status === "Shortlisted").length },
    { name: "Allocated",   value: applications.filter((a) => a.status === "Allocated").length   },
    { name: "Rejected",    value: applications.filter((a) => a.status === "Rejected").length    },
  ].filter((d) => d.value > 0);

  const internshipData = internships.map((i) => ({
    name: i.title.length > 18 ? i.title.slice(0, 18) + "…" : i.title,
    Applications: i.totalApplications,
    Shortlisted: i.shortlistedCount,
    Seats: i.seats,
  }));

  return (
    <div className="space-y-6">
      <PageHeader title="Analytics" description="Track your internship and application performance." />

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Active Internships"  value={stats.activeInternships}  icon={BriefcaseIcon}     />
        <StatCard title="Total Applications"  value={stats.totalApplications}  icon={ClipboardListIcon} />
        <StatCard title="Shortlisted"         value={stats.shortlistedCount}   icon={UsersIcon}         />
        <StatCard title="Available Seats"     value={stats.availableSeats}     icon={AwardIcon}         />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Applications per internship */}
        <Card>
          <CardHeader><CardTitle className="text-sm">Applications per Internship</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={internshipData} margin={{ top: 4, right: 8, bottom: 4, left: -16 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ fontSize: 12 }} />
                <Bar dataKey="Applications" fill={CHART_COLORS[0]} radius={[4, 4, 0, 0]} />
                <Bar dataKey="Shortlisted"  fill={CHART_COLORS[1]} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Application status distribution */}
        <Card>
          <CardHeader><CardTitle className="text-sm">Application Status</CardTitle></CardHeader>
          <CardContent>
            {applicationsByStatus.length === 0 ? (
              <div className="flex h-60 items-center justify-center text-sm text-muted-foreground">
                No application data yet
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={applicationsByStatus}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {applicationsByStatus.map((_, i) => (
                      <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: 12 }} />
                  <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
