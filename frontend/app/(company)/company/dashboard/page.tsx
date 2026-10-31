"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  BriefcaseIcon,
  UsersIcon,
  AwardIcon,
  ClipboardListIcon,
  CheckCircle2Icon,
  AlertCircleIcon,
  PlusIcon,
  ArrowRightIcon,
  BuildingIcon,
  TrendingUpIcon,
  SparklesIcon,
  ShieldCheckIcon,
  ChevronRightIcon,
  UserCheckIcon,
  MapPinIcon,
  ClockIcon,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/common/StatusBadge";
import { ScoreCircle } from "@/components/common/ScoreBar";
import { EmptyState } from "@/components/common/EmptyState";
import { LinkButton } from "@/components/ui/button";
import { useCompany } from "@/hooks/useCompany";
import { formatRelativeTime } from "@/lib/formatters";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function CompanyDashboardPage() {
  const { company, stats, internships, applications, allocations } = useCompany();

  // Sparklines for company metrics
  const sparklines = {
    internships: "M 0 25 Q 30 15, 60 18 T 100 6",
    applications: "M 0 28 Q 25 18, 55 10 T 100 4",
    shortlisted: "M 0 22 Q 35 16, 70 12 T 100 8",
    allocated: "M 0 26 Q 30 18, 65 12 T 100 5",
  };

  // Pipeline distribution counts
  const pipeline = useMemo(() => {
    const applied = applications.filter((a) => a.status === "Applied").length || 3;
    const shortlisted = applications.filter((a) => a.status === "Shortlisted").length || 2;
    const allocated = allocations.length || 1;
    const total = applied + shortlisted + allocated;
    return { applied, shortlisted, allocated, total };
  }, [applications, allocations]);

  if (!company) {
    return (
      <EmptyState
        title="Company profile not found"
        description="Please complete your corporate profile."
      />
    );
  }

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-300">
      
      {/* ─────────────────────────────────────────────────────────────
          1. CORPORATE HEADER
          ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
              Welcome, <span className="bg-gradient-to-r from-primary via-orange-400 to-amber-400 bg-clip-text text-transparent">{company.companyName}</span>
            </h1>
            {company.verificationStatus === "Verified" ? (
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-bold text-emerald-500 dark:text-emerald-400">
                <CheckCircle2Icon className="size-3" />
                Verified Partner
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-bold text-amber-500">
                <AlertCircleIcon className="size-3" />
                {company.verificationStatus}
              </span>
            )}
          </div>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground font-medium">
            Manage your corporate internship postings, AI candidate pipelines, and quota allocations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <LinkButton
            href={ROUTES.company.createInternship}
            className="rounded-xl shadow-[0_0_20px_var(--theme-glow)] bg-gradient-to-r from-primary to-orange-500 hover:scale-105 transition-all text-xs font-bold"
          >
            <PlusIcon className="size-3.5 mr-1" />
            <span>Post New Internship</span>
          </LinkButton>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. CORPORATE HERO FEATURE BANNER
          ───────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-r from-primary/20 via-primary/10 to-blue-900/20 p-6 sm:p-8 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.35)]">
        <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-primary/25 blur-3xl" />
        <div className="pointer-events-none absolute right-1/4 -bottom-20 size-60 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="relative z-10 grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-3 py-1 text-xs font-bold text-primary shadow-[0_0_12px_var(--theme-glow)]">
              <SparklesIcon className="size-3.5 animate-pulse" />
              <span>AI Corporate Matching & Talent Routing</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
              Empower Your Organization with AI-Matched Talent
            </h2>
            <p className="max-w-xl text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Connect with top-tier university candidates, automate eligibility verification, and streamline internship fulfillment under the PM Internship Scheme.
            </p>
            <div className="pt-1 flex flex-wrap gap-3">
              <LinkButton
                href={ROUTES.company.candidates}
                size="sm"
                className="rounded-xl bg-primary text-primary-foreground font-bold shadow-[0_0_18px_var(--theme-glow)]"
              >
                <span>Review AI-Matched Candidates</span>
                <ArrowRightIcon className="size-3.5 ml-1" />
              </LinkButton>
              <LinkButton
                href={ROUTES.company.allocations}
                variant="outline"
                size="sm"
                className="rounded-xl border-border/80 dark:border-white/15 dark:bg-white/[0.04]"
              >
                <span>View Quota Allocations</span>
              </LinkButton>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 lg:col-span-4 lg:items-end">
            <div className="flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-bold text-emerald-500 dark:text-emerald-400 backdrop-blur-md shadow-sm w-fit">
              <CheckCircle2Icon className="size-4 shrink-0" />
              <span>Automated Candidate Scoring</span>
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-xs font-bold text-blue-400 backdrop-blur-md shadow-sm w-fit">
              <CheckCircle2Icon className="size-4 shrink-0" />
              <span>Transparent Quota Allocation</span>
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-xs font-bold text-purple-400 backdrop-blur-md shadow-sm w-fit">
              <CheckCircle2Icon className="size-4 shrink-0" />
              <span>GPS/QR Check-In Verification</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. METRIC STAT CARDS WITH SPARKLINES
          ───────────────────────────────────────────────────────────── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* Metric 1 */}
        <Link href={ROUTES.company.internships} className="block group">
          <Card className="relative overflow-hidden rounded-2xl border border-border/80 bg-card/90 p-5 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-[0_8px_30px_var(--theme-glow)] hover:-translate-y-1">
            <div className="flex items-start justify-between gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/15 text-primary border border-primary/25 shadow-[0_0_12px_var(--theme-glow)]">
                <BriefcaseIcon className="size-5" />
              </div>
              <div className="w-24 h-9">
                <svg viewBox="0 0 100 32" className="w-full h-full stroke-orange-400 fill-none stroke-2">
                  <path d={sparklines.internships} strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground font-mono">
                  Active Internships
                </p>
                <p className="text-3xl font-black tabular-nums tracking-tight text-foreground">
                  {stats.activeInternships}
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-500 dark:text-emerald-400 flex items-center gap-0.5">
                ↑ +12%
              </span>
            </div>
          </Card>
        </Link>

        {/* Metric 2 */}
        <Link href={ROUTES.company.applications} className="block group">
          <Card className="relative overflow-hidden rounded-2xl border border-border/80 bg-card/90 p-5 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-[0_8px_30px_var(--theme-glow)] hover:-translate-y-1">
            <div className="flex items-start justify-between gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-400 border border-blue-500/25">
                <ClipboardListIcon className="size-5" />
              </div>
              <div className="w-24 h-9">
                <svg viewBox="0 0 100 32" className="w-full h-full stroke-blue-400 fill-none stroke-2">
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
                ↑ +45%
              </span>
            </div>
          </Card>
        </Link>

        {/* Metric 3 */}
        <Link href={ROUTES.company.candidates} className="block group">
          <Card className="relative overflow-hidden rounded-2xl border border-border/80 bg-card/90 p-5 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-[0_8px_30px_var(--theme-glow)] hover:-translate-y-1">
            <div className="flex items-start justify-between gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-400 border border-amber-500/25">
                <UsersIcon className="size-5" />
              </div>
              <div className="w-24 h-9">
                <svg viewBox="0 0 100 32" className="w-full h-full stroke-amber-400 fill-none stroke-2">
                  <path d={sparklines.shortlisted} strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground font-mono">
                  Shortlisted Talent
                </p>
                <p className="text-3xl font-black tabular-nums tracking-tight text-foreground">
                  {stats.shortlistedCount}
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-500 dark:text-emerald-400 flex items-center gap-0.5">
                ↑ +18%
              </span>
            </div>
          </Card>
        </Link>

        {/* Metric 4 */}
        <Link href={ROUTES.company.allocations} className="block group">
          <Card className="relative overflow-hidden rounded-2xl border border-border/80 bg-card/90 p-5 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-[0_8px_30px_var(--theme-glow)] hover:-translate-y-1">
            <div className="flex items-start justify-between gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-purple-500/15 text-purple-400 border border-purple-500/25">
                <AwardIcon className="size-5" />
              </div>
              <div className="w-24 h-9">
                <svg viewBox="0 0 100 32" className="w-full h-full stroke-purple-400 fill-none stroke-2">
                  <path d={sparklines.allocated} strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground font-mono">
                  Confirmed Allocations
                </p>
                <p className="text-3xl font-black tabular-nums tracking-tight text-foreground">
                  {stats.allocatedCount}
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-500 dark:text-emerald-400 flex items-center gap-0.5">
                ↑ +28%
              </span>
            </div>
          </Card>
        </Link>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. MIDDLE ROW: ACTIVE INTERNSHIPS + APPLICANT PIPELINE + ACTIONS (3 Columns)
          ───────────────────────────────────────────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-3">
        
        {/* Column 1: Recent Internships Pipeline */}
        <Card className="rounded-3xl border border-border/80 bg-card/90 p-6 backdrop-blur-xl shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-border/60 pb-3 dark:border-white/10">
              <div className="flex items-center gap-2">
                <BriefcaseIcon className="size-4 text-primary" />
                <h3 className="text-sm font-bold text-foreground">Active Listings</h3>
              </div>
              <Link href={ROUTES.company.internships} className="text-xs font-bold text-primary hover:underline flex items-center gap-0.5">
                <span>View All</span>
                <ArrowRightIcon className="size-3" />
              </Link>
            </div>

            <div className="mt-4 space-y-3">
              {internships.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-border/60 bg-muted/20 p-3 hover:border-primary/40 hover:bg-muted/40 transition-all dark:border-white/10 dark:bg-white/[0.02]"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-xs text-foreground truncate">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        {item.location} · {item.duration}
                      </p>
                    </div>
                    <StatusBadge status={item.status} />
                  </div>

                  <div className="mt-2.5 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-muted-foreground">
                      <span className="font-bold text-foreground">{item.totalApplications}</span> applicants
                    </span>
                    <span className="text-[11px] font-bold text-primary font-mono">
                      {item.availableSeats} seats left
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-border/50 dark:border-white/10">
            <LinkButton
              href={ROUTES.company.createInternship}
              variant="outline"
              size="sm"
              className="w-full rounded-xl text-xs font-bold"
            >
              <PlusIcon className="size-3.5 mr-1" />
              <span>Create New Posting</span>
            </LinkButton>
          </div>
        </Card>

        {/* Column 2: Candidate Pipeline Donut Chart */}
        <Card className="rounded-3xl border border-border/80 bg-card/90 p-6 backdrop-blur-xl shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-border/60 pb-3 dark:border-white/10">
              <div className="flex items-center gap-2">
                <UsersIcon className="size-4 text-primary" />
                <h3 className="text-sm font-bold text-foreground">Talent Funnel</h3>
              </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row items-center justify-around gap-6">
              <div className="relative size-36 shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="size-full -rotate-90">
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="currentColor" strokeWidth="12" className="text-muted/40 dark:text-white/[0.04]" />
                  <circle
                    cx="50" cy="50" r="40" fill="transparent"
                    stroke="#3b82f6" strokeWidth="12"
                    strokeDasharray="251.2"
                    strokeDashoffset="170"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="50" cy="50" r="40" fill="transparent"
                    stroke="#f59e0b" strokeWidth="12"
                    strokeDasharray="251.2"
                    strokeDashoffset="210"
                    transform="rotate(90 50 50)"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="50" cy="50" r="40" fill="transparent"
                    stroke="#10b981" strokeWidth="12"
                    strokeDasharray="251.2"
                    strokeDashoffset="220"
                    transform="rotate(180 50 50)"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-black text-foreground tabular-nums">
                    {pipeline.total}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground font-mono">
                    Candidates
                  </span>
                </div>
              </div>

              <div className="space-y-2.5 w-full max-w-[150px]">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                    <span className="text-muted-foreground">In Review</span>
                  </div>
                  <span className="font-bold text-foreground">({pipeline.applied})</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                    <span className="text-muted-foreground">Shortlisted</span>
                  </div>
                  <span className="font-bold text-foreground">({pipeline.shortlisted})</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <span className="text-muted-foreground">Allocated</span>
                  </div>
                  <span className="font-bold text-foreground">({pipeline.allocated})</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-border/50 dark:border-white/10 text-center">
            <Link href={ROUTES.company.candidates} className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1">
              <span>Review Candidate Resumes & Scores</span>
              <ArrowRightIcon className="size-3" />
            </Link>
          </div>
        </Card>

        {/* Column 3: Corporate Verification & Compliance */}
        <Card className="rounded-3xl border border-border/80 bg-card/90 p-6 backdrop-blur-xl shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-border/60 pb-3 dark:border-white/10">
              <div className="flex items-center gap-2">
                <ShieldCheckIcon className="size-4 text-primary" />
                <h3 className="text-sm font-bold text-foreground">Corporate Status</h3>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-emerald-500 dark:text-emerald-400">
                    Enterprise Quota Active
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    GST & CIN verified by Ministry portal
                  </p>
                </div>
                <CheckCircle2Icon className="size-5 text-emerald-500" />
              </div>

              <div className="rounded-2xl border border-border/60 bg-muted/20 p-3.5 space-y-2 dark:border-white/10 dark:bg-white/[0.02]">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground font-medium">Industry Sector</span>
                  <span className="font-bold text-foreground">{company.sector || "Information Technology"}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground font-medium">Headquarters</span>
                  <span className="font-bold text-foreground">{company.city || "Bengaluru"}, {company.state || "Karnataka"}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground font-medium">Corporate ID</span>
                  <span className="font-bold font-mono text-primary">{company.id}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-border/50 dark:border-white/10">
            <LinkButton
              href={ROUTES.company.profile}
              variant="outline"
              size="sm"
              className="w-full rounded-xl text-xs font-bold"
            >
              <span>Manage Corporate Profile</span>
              <ArrowRightIcon className="size-3.5 ml-1" />
            </LinkButton>
          </div>
        </Card>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          5. BOTTOM ROW: RECENT APPLICATIONS + ALLOCATED TALENT (2 Columns)
          ───────────────────────────────────────────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-2">
        
        {/* Left: Recent Candidate Applications Stream */}
        <Card className="rounded-3xl border border-border/80 bg-card/90 p-6 backdrop-blur-xl shadow-sm">
          <div className="flex items-center justify-between border-b border-border/60 pb-3 dark:border-white/10">
            <div className="flex items-center gap-2">
              <ClipboardListIcon className="size-4 text-primary" />
              <h3 className="text-sm font-bold text-foreground">Recent Candidate Inflow</h3>
            </div>
            <Link href={ROUTES.company.applications} className="text-xs font-bold text-primary hover:underline flex items-center gap-0.5">
              <span>View All</span>
              <ArrowRightIcon className="size-3" />
            </Link>
          </div>

          <div className="mt-4 space-y-3">
            {applications.slice(0, 4).map((app) => (
              <div
                key={app.id}
                className="flex items-center justify-between gap-3 rounded-2xl border border-border/60 bg-muted/20 p-3.5 hover:border-primary/40 hover:bg-muted/40 transition-all dark:border-white/10 dark:bg-white/[0.02]"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="size-9 rounded-xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center font-bold text-xs shrink-0">
                    <UserCheckIcon className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-xs text-foreground truncate">
                      {app.studentName}
                    </p>
                    <p className="text-[11px] text-muted-foreground truncate">
                      {app.internshipTitle} · {formatRelativeTime(app.appliedAt)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-bold font-mono text-emerald-500">
                      {app.matchScore}% Match
                    </span>
                    <StatusBadge status={app.status} />
                  </div>
                  <LinkButton href={`${ROUTES.company.applications}/${app.id}`} variant="ghost" size="sm" className="rounded-xl h-8 px-2.5 text-xs font-bold">
                    Review
                  </LinkButton>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Right: Confirmed Student Allocations */}
        <Card className="rounded-3xl border border-border/80 bg-card/90 p-6 backdrop-blur-xl shadow-sm">
          <div className="flex items-center justify-between border-b border-border/60 pb-3 dark:border-white/10">
            <div className="flex items-center gap-2">
              <AwardIcon className="size-4 text-primary" />
              <h3 className="text-sm font-bold text-foreground">Allocated Candidates</h3>
            </div>
            <Link href={ROUTES.company.allocations} className="text-xs font-bold text-primary hover:underline flex items-center gap-0.5">
              <span>View All</span>
              <ArrowRightIcon className="size-3" />
            </Link>
          </div>

          <div className="mt-4 space-y-3">
            {allocations.length === 0 ? (
              <div className="py-8 text-center text-xs text-muted-foreground">
                No students allocated yet. Matching engine will run allocations soon.
              </div>
            ) : (
              allocations.slice(0, 4).map((alloc) => (
                <div
                  key={alloc.id}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-border/60 bg-muted/20 p-3.5 hover:border-primary/40 hover:bg-muted/40 transition-all dark:border-white/10 dark:bg-white/[0.02]"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="size-9 rounded-xl bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 flex items-center justify-center font-bold text-xs shrink-0">
                      <AwardIcon className="size-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-xs text-foreground truncate">
                        {alloc.studentName}
                      </p>
                      <p className="text-[11px] text-muted-foreground truncate">
                        {alloc.internshipTitle} · Reporting: Active
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-bold text-emerald-500 font-mono">
                      {alloc.matchScore}%
                    </span>
                    <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-500 dark:text-emerald-400">
                      Confirmed
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

      </div>

    </div>
  );
}
