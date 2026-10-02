"use client";

import {
  GraduationCapIcon, BuildingIcon, BriefcaseIcon, ClipboardListIcon,
  AwardIcon, BrainCircuitIcon, PlayIcon, FileTextIcon, PlusIcon,
  ShieldCheckIcon, TrendingUpIcon, UsersIcon, RefreshCwIcon,
  ArrowLeftRightIcon, QrCodeIcon,
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import { SectionHeader } from "@/components/common/SectionHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { ScoreCircle } from "@/components/common/ScoreBar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/button";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts";
import { useAdmin } from "@/hooks/useAdmin";
import { useAnalytics } from "@/hooks/useAnalytics";
import { formatRelativeTime } from "@/lib/formatters";
import { ROUTES, CHART_COLORS } from "@/lib/constants";

export default function AdminDashboardPage() {
  const { stats, applications, allocations, companies, internships } = useAdmin();
  const { sectorDistribution, allocationStatusData, applicationStatusData } = useAnalytics();

  const pendingCompanies   = companies.filter((c) => c.verificationStatus === "Pending");
  const pendingInternships = internships.filter((i) => i.status === "Pending");

  return (
    <div className="space-y-6">
      <PageHeader title="Admin Dashboard" description="Overview of the PM Internship Scheme platform.">
        <div className="flex gap-2">
          <LinkButton href={ROUTES.admin.aiMatchingRun} variant="outline" size="sm" className="gap-1.5">
            <BrainCircuitIcon className="size-3.5" /> Run AI Matching
          </LinkButton>
          <LinkButton href={ROUTES.admin.allocations} size="sm" className="gap-1.5">
            <PlayIcon className="size-3.5" /> Run Allocation
          </LinkButton>
        </div>
      </PageHeader>

      {/* Overview stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Students"     value={stats.totalStudents}     icon={GraduationCapIcon} />
        <StatCard title="Total Companies"    value={stats.totalCompanies}    icon={BuildingIcon}      />
        <StatCard title="Total Internships"  value={stats.totalInternships}  icon={BriefcaseIcon}     />
        <StatCard title="Total Applications" value={stats.totalApplications} icon={ClipboardListIcon} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Seats"      value={stats.totalSeats}          icon={UsersIcon}     />
        <StatCard title="Allocated"        value={stats.approvedAllocations} icon={AwardIcon}     />
        <StatCard title="Pending Alloc."   value={stats.pendingAllocations}  icon={TrendingUpIcon}/>
        <StatCard title="Allocation Rate"  value={`${stats.allocationRate}%`}icon={ShieldCheckIcon}/>
      </div>

      {/* Charts row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Sector distribution */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <SectionHeader title="Internships by Sector" />
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={sectorDistribution.slice(0, 7)} margin={{ top: 4, right: 8, bottom: 40, left: -16 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" tick={{ fontSize: 9 }} angle={-35} textAnchor="end" interval={0} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ fontSize: 12 }} />
                <Bar dataKey="value" name="Internships" fill={CHART_COLORS[0]} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Allocation status */}
        <Card>
          <CardHeader>
            <SectionHeader title="Allocation Status" />
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={allocationStatusData} cx="50%" cy="45%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                  {allocationStatusData.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: 12 }} />
                <Legend iconSize={9} wrapperStyle={{ fontSize: 10 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          {/* Recent applications */}
          <Card>
            <CardHeader>
              <SectionHeader title="Recent Applications">
                <LinkButton href={ROUTES.admin.applications} variant="ghost" size="sm">View all</LinkButton>
              </SectionHeader>
            </CardHeader>
            <CardContent className="space-y-2">
              {applications.slice(0, 5).map((app) => (
                <div key={app.id} className="flex items-center justify-between gap-3 rounded-lg border border-border/50 p-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{app.studentName}</p>
                    <p className="text-xs text-muted-foreground">{app.internshipTitle} · {app.companyName} · {formatRelativeTime(app.appliedAt)}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="text-xs text-muted-foreground">{app.matchScore}%</span>
                    <StatusBadge status={app.status} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent allocations */}
          <Card>
            <CardHeader>
              <SectionHeader title="Recent Allocations">
                <LinkButton href={ROUTES.admin.allocations} variant="ghost" size="sm">View all</LinkButton>
              </SectionHeader>
            </CardHeader>
            <CardContent className="space-y-2">
              {allocations.slice(0, 4).map((al) => (
                <div key={al.id} className="flex items-center justify-between gap-3 rounded-lg border border-border/50 p-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{al.studentName}</p>
                    <p className="text-xs text-muted-foreground">{al.internshipTitle} · {al.companyName}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <ScoreCircle score={al.matchScore} size="sm" />
                    <StatusBadge status={al.status} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right col */}
        <div className="space-y-5">
          {/* Pending approvals */}
          <Card>
            <CardHeader><SectionHeader title="Pending Approvals" /></CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Companies</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-amber-600">{pendingCompanies.length}</span>
                  <LinkButton href={ROUTES.admin.companyVerification} variant="outline" size="sm">Review</LinkButton>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Internships</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-amber-600">{pendingInternships.length}</span>
                  <LinkButton href={ROUTES.admin.internshipsPending} variant="outline" size="sm">Review</LinkButton>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Allocations</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-amber-600">{stats.pendingAllocations}</span>
                  <LinkButton href={ROUTES.admin.allocationsPending} variant="outline" size="sm">Review</LinkButton>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Verifications</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-amber-600">{stats.pendingVerifications}</span>
                  <LinkButton href={ROUTES.admin.verification} variant="outline" size="sm">Review</LinkButton>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Reallocations</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-amber-600">{stats.pendingReallocations}</span>
                  <LinkButton href={ROUTES.admin.reallocation} variant="outline" size="sm">Review</LinkButton>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Swap Requests</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-amber-600">{stats.pendingSwaps}</span>
                  <LinkButton href={ROUTES.admin.swaps} variant="outline" size="sm">Review</LinkButton>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick actions */}
          <Card>
            <CardHeader><SectionHeader title="Quick Actions" /></CardHeader>
            <CardContent className="space-y-2">
              {[
                { label: "Add Internship",    href: ROUTES.admin.internships,        icon: PlusIcon           },
                { label: "Verify Company",    href: ROUTES.admin.companyVerification, icon: ShieldCheckIcon    },
                { label: "Run AI Matching",   href: ROUTES.admin.aiMatchingRun,       icon: BrainCircuitIcon   },
                { label: "Run Allocation",    href: ROUTES.admin.allocations,         icon: PlayIcon           },
                { label: "Review Swaps",      href: ROUTES.admin.swaps,              icon: ArrowLeftRightIcon },
                { label: "Check-In Monitor",  href: ROUTES.admin.checkIn,            icon: QrCodeIcon         },
                { label: "View Reallocations",href: ROUTES.admin.reallocation,       icon: RefreshCwIcon      },
                { label: "Generate Report",   href: ROUTES.admin.reports,            icon: FileTextIcon       },
              ].map(({ label, href, icon: Icon }) => (
                <LinkButton key={label} href={href} variant="outline" size="sm" className="w-full justify-start gap-2">
                  <Icon className="size-3.5" />{label}
                </LinkButton>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
