"use client";

import { use } from "react";
import {
  ArrowLeftIcon,
  MapPinIcon,
  ClockIcon,
  IndianRupeeIcon,
  UsersIcon,
  CalendarIcon,
  GraduationCapIcon,
  SparklesIcon,
  Building2Icon,
  CheckCircle2Icon,
  ShieldCheckIcon,
  BriefcaseIcon
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { EmptyState } from "@/components/common/EmptyState";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/button";
import { useInternship } from "@/hooks/useInternships";
import { formatDate, formatStipendRange } from "@/lib/formatters";
import { ROUTES } from "@/lib/constants";
import { useRouter } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function InternshipDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const internship = useInternship(id);

  if (!internship) return <EmptyState title="Internship not found" />;

  const initial = internship.companyName?.slice(0, 2).toUpperCase() || "TN";

  return (
    <div className="space-y-6">
      {/* Top Back Nav */}
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon-sm"
          onClick={() => router.back()}
          aria-label="Go back"
          className="rounded-xl border-border/80 hover:bg-muted/50"
        >
          <ArrowLeftIcon className="size-4" />
        </Button>
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Back to Internship Catalog
        </span>
      </div>

      {/* Cyber Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent p-6 shadow-xl shadow-primary/5 backdrop-blur-md">
        <div className="absolute -right-10 -top-10 size-48 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/15 border border-primary/30 text-primary font-bold text-xl shrink-0 shadow-md">
              {initial}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                  {internship.title}
                </h1>
                <StatusBadge status={internship.status} />
                <span className="inline-flex items-center rounded-full border border-primary/25 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                  {internship.workMode}
                </span>
              </div>

              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <Building2Icon className="size-4 text-primary shrink-0" />
                <span className="font-semibold text-foreground/90">{internship.companyName}</span>
                <span>·</span>
                <span>Sector: {internship.sector}</span>
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-center backdrop-blur-sm">
              <span className="text-[11px] text-emerald-400 block font-medium">Monthly Compensation</span>
              <span className="text-base font-bold text-emerald-400">
                {formatStipendRange(internship.stipendMin, internship.stipendMax)} / mo
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column: Role Details & Specs */}
        <div className="space-y-6 lg:col-span-2">
          {/* Key Specs Grid */}
          <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-6 shadow-xl space-y-5">
            <h3 className="text-sm font-bold text-foreground">Placement Specifications</h3>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { icon: MapPinIcon, label: "Workplace Location", value: `${internship.city}, ${internship.state}` },
                { icon: ClockIcon, label: "Internship Duration", value: internship.duration },
                { icon: UsersIcon, label: "Seat Capacity", value: `${internship.availableSeats} of ${internship.seats} seats available` },
                { icon: CalendarIcon, label: "Term Dates", value: `${formatDate(internship.startDate)} – ${formatDate(internship.endDate)}` },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3 rounded-xl border border-border/60 bg-muted/20 p-3.5">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-card border border-border/70 text-primary shrink-0 shadow-sm">
                    <Icon className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-medium text-muted-foreground block">{label}</span>
                    <span className="text-xs sm:text-sm font-bold text-foreground truncate block">{value}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-px bg-border/60" />

            {/* Description */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Role Overview & Responsibilities
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {internship.description}
              </p>
            </div>

            <div className="h-px bg-border/60" />

            {/* Required Skills */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Required Technical Proficiencies
              </h4>
              <div className="flex flex-wrap gap-2">
                {internship.requiredSkills.map((s) => (
                  <span
                    key={s}
                    className="rounded-xl border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Eligibility & 1-Click Apply */}
        <div className="space-y-5">
          {/* Apply CTA Card */}
          <div className="rounded-2xl border border-primary/30 bg-primary/10 backdrop-blur-md p-6 shadow-xl space-y-4 text-center">
            <h3 className="text-base font-bold text-foreground">Interested in this Role?</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Your profile vectors will be verified against prerequisite skills and affirmative action criteria.
            </p>
            <Button
              size="lg"
              className="w-full gap-2 rounded-xl font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 py-3"
            >
              <SparklesIcon className="size-4" />
              <span>Apply with Digital Twin</span>
            </Button>
          </div>

          {/* Eligibility Card */}
          <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-6 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-foreground border-b border-border/60 pb-3">
              Prerequisite Eligibility
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Academic Qualification</span>
                <span className="font-bold text-foreground">{internship.qualification}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Minimum CGPA Threshold</span>
                <span className="font-bold text-foreground">{internship.minimumCGPA} / 10.0</span>
              </div>

              <div className="space-y-1.5 pt-1">
                <span className="text-muted-foreground block">Eligible Disciplines</span>
                <div className="flex flex-wrap gap-1.5">
                  {internship.eligibleBranches.map((b) => (
                    <span
                      key={b}
                      className="rounded-lg border border-border/70 bg-muted/30 px-2 py-0.5 text-[11px] font-medium text-foreground"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Applicant Volume */}
          <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-5 shadow-xl space-y-2 text-xs text-muted-foreground">
            <div className="flex justify-between">
              <span>Total Applicants:</span>
              <strong className="text-foreground">{internship.totalApplications} candidates</strong>
            </div>
            <div className="flex justify-between">
              <span>Shortlisted so far:</span>
              <strong className="text-emerald-400">{internship.shortlistedCount} candidates</strong>
            </div>
            <div className="flex justify-between">
              <span>Host Sector:</span>
              <strong className="text-foreground">{internship.sector}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
