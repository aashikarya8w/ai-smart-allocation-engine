"use client";

import { BriefcaseIcon, UsersIcon, AwardIcon, ClipboardListIcon, CheckCircleIcon, AlertCircleIcon } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import { SectionHeader } from "@/components/common/SectionHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { ScoreCircle } from "@/components/common/ScoreBar";
import { EmptyState } from "@/components/common/EmptyState";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCompany } from "@/hooks/useCompany";
import { formatRelativeTime, formatDate } from "@/lib/formatters";
import { LinkButton } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";

export default function CompanyDashboardPage() {
  const { company, stats, internships, applications, allocations } = useCompany();

  if (!company) return <EmptyState title="Company profile not found" description="Please complete your company profile." />;

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Welcome, ${company.companyName}`}
        description="Manage your internship listings and candidates."
      >
        <div className="flex items-center gap-2">
          {company.verificationStatus === "Verified" ? (
            <span className="flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400">
              <CheckCircleIcon className="size-3.5" /> Verified
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400">
              <AlertCircleIcon className="size-3.5" /> {company.verificationStatus}
            </span>
          )}
          <LinkButton href={ROUTES.company.createInternship} size="sm">
            Post Internship
          </LinkButton>
        </div>
      </PageHeader>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Active Internships"  value={stats.activeInternships}  icon={BriefcaseIcon}       />
        <StatCard title="Total Applications"  value={stats.totalApplications}  icon={ClipboardListIcon}   />
        <StatCard title="Shortlisted"         value={stats.shortlistedCount}   icon={UsersIcon}           />
        <StatCard title="Allocated"           value={stats.allocatedCount}     icon={AwardIcon}           />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">

          {/* Recent Internships */}
          <Card>
            <CardHeader>
              <SectionHeader title="Recent Internships">
                <LinkButton href={ROUTES.company.internships} variant="ghost" size="sm">View all</LinkButton>
              </SectionHeader>
            </CardHeader>
            <CardContent>
              {internships.length === 0 ? (
                <EmptyState title="No internships yet" description="Post your first internship to get started." />
              ) : (
                <div className="space-y-3">
                  {internships.slice(0, 4).map((i) => (
                    <div key={i.id} className="flex items-center justify-between gap-3 rounded-lg border border-border/50 p-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">{i.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {i.totalApplications} applications · {i.availableSeats} seats left · {i.duration}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <StatusBadge status={i.status} />
                        <LinkButton href={`/company/internships/${i.id}`} variant="ghost" size="sm">View</LinkButton>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Applications */}
          <Card>
            <CardHeader>
              <SectionHeader title="Recent Applications">
                <LinkButton href={ROUTES.company.applications} variant="ghost" size="sm">View all</LinkButton>
              </SectionHeader>
            </CardHeader>
            <CardContent>
              {applications.length === 0 ? (
                <EmptyState title="No applications yet" />
              ) : (
                <div className="space-y-3">
                  {applications.slice(0, 5).map((app) => (
                    <div key={app.id} className="flex items-center justify-between gap-3 rounded-lg border border-border/50 p-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">{app.studentName}</p>
                        <p className="text-xs text-muted-foreground">{app.internshipTitle} · {formatRelativeTime(app.appliedAt)}</p>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <ScoreCircle score={app.matchScore} size="sm" />
                        <StatusBadge status={app.status} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right col */}
        <div className="space-y-6">
          {/* Seat availability */}
          <Card>
            <CardHeader>
              <SectionHeader title="Seat Availability" />
            </CardHeader>
            <CardContent className="space-y-3">
              {internships.filter((i) => i.status === "Active").map((i) => (
                <div key={i.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="truncate text-muted-foreground max-w-[140px]">{i.title}</span>
                    <span className="font-medium text-foreground">{i.availableSeats}/{i.seats}</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${((i.seats - i.availableSeats) / i.seats) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
              {internships.filter((i) => i.status === "Active").length === 0 && (
                <p className="text-xs text-muted-foreground">No active internships.</p>
              )}
            </CardContent>
          </Card>

          {/* Top candidates */}
          <Card>
            <CardHeader>
              <SectionHeader title="Top Candidates" />
            </CardHeader>
            <CardContent>
              {applications.length === 0 ? (
                <EmptyState title="No candidates yet" />
              ) : (
                <div className="space-y-3">
                  {[...applications]
                    .sort((a, b) => b.matchScore - a.matchScore)
                    .slice(0, 4)
                    .map((app) => (
                      <div key={app.id} className="flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-foreground">{app.studentName}</p>
                          <p className="text-xs text-muted-foreground truncate">{app.internshipTitle}</p>
                        </div>
                        <ScoreCircle score={app.matchScore} size="sm" />
                      </div>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
