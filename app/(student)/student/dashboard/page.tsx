"use client";

import { BriefcaseIcon, SparklesIcon, AwardIcon, ClipboardListIcon, TargetIcon, FlaskConicalIcon, ClipboardCheckIcon, TrendingUpIcon } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import { SectionHeader } from "@/components/common/SectionHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { ScoreBar, ScoreCircle } from "@/components/common/ScoreBar";
import { EmptyState } from "@/components/common/EmptyState";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useStudent } from "@/hooks/useStudent";
import { useNotifications } from "@/hooks/useNotifications";
import { formatDate, formatRelativeTime, formatStipendRange } from "@/lib/formatters";
import { LinkButton } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";

export default function StudentDashboardPage() {
  const { student, stats, applications, recommendations, activeAllocation } = useStudent();
  const { notifications, unreadCount } = useNotifications();

  if (!student) {
    return (
      <EmptyState
        title="Profile not found"
        description="Please complete your profile setup."
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title={`Welcome back, ${student.fullName.split(" ")[0]} 👋`}
        description="Here's your internship journey at a glance."
      >
        <LinkButton href={ROUTES.student.internships} size="sm">
          Browse Internships
        </LinkButton>
      </PageHeader>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Applications"    value={stats.applicationsCount}   icon={ClipboardListIcon} />
        <StatCard title="Recommendations" value={stats.recommendationsCount} icon={SparklesIcon}      />
        <StatCard title="Shortlisted"     value={stats.shortlistedCount}     icon={BriefcaseIcon}     />
        <StatCard title="Allocated"       value={stats.allocationsCount}     icon={AwardIcon}         />
      </div>

      {/* AI Scores row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Top Match Score"     value={`${stats.topMatchScore}%`}   icon={SparklesIcon}        trend="up" />
        <StatCard title="Job Suitability"     value={`${stats.topSuitability}%`}  icon={TargetIcon}          trend="up" />
        <StatCard title="Readiness"           value={`${stats.currentReadiness}%`} icon={FlaskConicalIcon}   trend="up" />
        <StatCard title="Assessments Passed"  value={stats.assessmentsPassed}     icon={ClipboardCheckIcon}  trend="up" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left col */}
        <div className="space-y-6 lg:col-span-2">

          {/* Current Allocation */}
          {activeAllocation ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <AwardIcon className="size-4 text-primary" />
                  Current Allocation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-foreground">{activeAllocation.internshipTitle}</p>
                    <p className="text-sm text-muted-foreground">{activeAllocation.companyName}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {activeAllocation.location} · {activeAllocation.workMode} · {formatDate(activeAllocation.startDate)} – {formatDate(activeAllocation.endDate)}
                    </p>
                  </div>
                  <ScoreCircle score={activeAllocation.matchScore} size="sm" />
                </div>
                <div className="grid gap-2">
                  <ScoreBar label="Skill Match"    score={activeAllocation.scoreBreakdown.skillMatch}    />
                  <ScoreBar label="Qualification"  score={activeAllocation.scoreBreakdown.qualification} />
                  <ScoreBar label="Location"       score={activeAllocation.scoreBreakdown.location}      />
                </div>
                <LinkButton href={`${ROUTES.student.allocations}/${activeAllocation.id}`} variant="outline" size="sm">
                  View Full Details
                </LinkButton>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6">
                <EmptyState
                  icon={AwardIcon}
                  title="No allocation yet"
                  description="You haven't been allocated an internship yet. Keep applying!"
                />
              </CardContent>
            </Card>
          )}

          {/* Recent Applications */}
          <Card>
            <CardHeader>
              <SectionHeader title="Recent Applications">
                <LinkButton href={ROUTES.student.applications} variant="ghost" size="sm">
                  View all
                </LinkButton>
              </SectionHeader>
            </CardHeader>
            <CardContent>
              {applications.length === 0 ? (
                <EmptyState title="No applications yet" description="Apply to internships to see them here." />
              ) : (
                <div className="space-y-3">
                  {applications.slice(0, 4).map((app) => (
                    <div key={app.id} className="flex items-center justify-between gap-3 rounded-lg border border-border/50 p-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">{app.internshipTitle}</p>
                        <p className="text-xs text-muted-foreground">{app.companyName} · {formatRelativeTime(app.appliedAt)}</p>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <span className="text-xs font-medium text-muted-foreground">{app.matchScore}%</span>
                        <StatusBadge status={app.status} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Top Recommendations */}
          <Card>
            <CardHeader>
              <SectionHeader title="Top AI Recommendations">
                <LinkButton href={ROUTES.student.recommendations} variant="ghost" size="sm">
                  View all
                </LinkButton>
              </SectionHeader>
            </CardHeader>
            <CardContent>
              {recommendations.length === 0 ? (
                <EmptyState title="No recommendations yet" description="Complete your profile to get AI recommendations." />
              ) : (
                <div className="space-y-3">
                  {recommendations.slice(0, 3).map((rec) => (
                    <div key={rec.id} className="flex items-center justify-between gap-3 rounded-lg border border-border/50 p-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">{rec.internshipTitle}</p>
                        <p className="text-xs text-muted-foreground">{rec.companyName} · {rec.location}</p>
                        <p className="text-xs text-muted-foreground">{formatStipendRange(rec.stipendMin, rec.stipendMax)} · {rec.duration}</p>
                      </div>
                      <ScoreCircle score={rec.matchScore} size="sm" />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right col */}
        <div className="space-y-6">
          {/* Profile completion */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Profile Completion</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-primary">{student.profileCompletion}%</span>
                <span className="text-xs text-muted-foreground">
                  {student.profileCompletion < 100 ? "Incomplete" : "Complete"}
                </span>
              </div>
              <Progress value={student.profileCompletion} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Complete your profile to improve your match score.
              </p>
              <LinkButton href={ROUTES.student.profile} variant="outline" size="sm" className="w-full">
                Complete Profile
              </LinkButton>
            </CardContent>
          </Card>

          {/* AI Match Score */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Top AI Match Score</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-3">
              <ScoreCircle score={stats.topMatchScore} size="lg" />
              <p className="text-center text-xs text-muted-foreground">
                Your best match across all recommendations
              </p>
            </CardContent>
          </Card>

          {/* AI Tools quick links */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">AI Analysis Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { label: "Skill Gap Analysis",   href: ROUTES.student.skillGap,      icon: TrendingUpIcon      },
                { label: "Job Suitability",       href: ROUTES.student.suitability,   icon: TargetIcon          },
                { label: "Readiness Twin",        href: ROUTES.student.readiness,     icon: FlaskConicalIcon    },
                { label: "What-If Simulator",     href: ROUTES.student.whatIf,        icon: ClipboardCheckIcon  },
                { label: "Career Roadmap",        href: ROUTES.student.careerRoadmap, icon: AwardIcon           },
              ].map(({ label, href, icon: Icon }) => (
                <LinkButton key={label} href={href} variant="outline" size="sm" className="w-full justify-start gap-2">
                  <Icon className="size-3.5" />{label}
                </LinkButton>
              ))}
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <SectionHeader title="Notifications">
                <LinkButton href={ROUTES.student.notifications} variant="ghost" size="sm">
                  View all
                </LinkButton>
              </SectionHeader>
            </CardHeader>
            <CardContent>
              {notifications.length === 0 ? (
                <EmptyState title="No notifications" />
              ) : (
                <div className="space-y-2">
                  {notifications.slice(0, 4).map((n) => (
                    <div key={n.id} className={`rounded-lg p-2.5 text-xs ${n.isRead ? "bg-muted/40" : "bg-primary/5 border border-primary/10"}`}>
                      <p className="font-medium text-foreground">{n.title}</p>
                      <p className="mt-0.5 text-muted-foreground line-clamp-1">{n.message}</p>
                      <p className="mt-1 text-muted-foreground/60">{formatRelativeTime(n.createdAt)}</p>
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
