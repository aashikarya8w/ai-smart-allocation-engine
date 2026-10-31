"use client";

import {
  AwardIcon,
  MapPinIcon,
  CalendarIcon,
  IndianRupeeIcon,
  Building2Icon,
  SparklesIcon,
  ShieldCheckIcon,
  DownloadIcon,
  ArrowRightIcon,
  UserCheckIcon,
  FileCheck2Icon,
  ClockIcon,
  ExternalLinkIcon
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { ScoreCircle } from "@/components/common/ScoreBar";
import { EmptyState } from "@/components/common/EmptyState";
import { useAllocations } from "@/hooks/useAllocations";
import { formatDate, formatStipend } from "@/lib/formatters";
import { LinkButton } from "@/components/ui/button";

export default function AllocationsPage() {
  const { allocations, activeAllocation } = useAllocations();

  if (allocations.length === 0) {
    return (
      <div className="space-y-6">
        <PageHeader title="My Allocation" description="Your internship allocation and allotment status." />
        <EmptyState
          icon={AwardIcon}
          title="No allocation finalized yet"
          description="Your profile is actively being considered in current allocation matching rounds. Keep your preferences and skills up-to-date!"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Official Internship Allocation"
        description="Your verified workplace placement confirmed through the AI matching engine."
      />

      {/* Cyber Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent p-6 shadow-xl shadow-primary/5 backdrop-blur-md">
        <div className="absolute -right-10 -top-10 size-48 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-md">
              <ShieldCheckIcon className="size-3.5 text-primary" />
              <span>Verified Allotment Order #IN-2025-9481</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Internship Placement Successfully Confirmed
            </h2>
            <p className="max-w-2xl text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Congratulations! Your application has been matched and officially allocated. Please review your reporting instructions and complete your orientation checklist.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-400">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              Status: Confirmed & Active
            </span>
          </div>
        </div>
      </div>

      {/* Primary Allocation Spotlight Cards */}
      <div className="space-y-4">
        {allocations.map((al) => {
          const initial = al.companyName?.slice(0, 2).toUpperCase() || "TN";

          return (
            <div
              key={al.id}
              className="relative overflow-hidden rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-6 shadow-xl transition-all duration-300 hover:border-primary/40 hover:shadow-[0_12px_36px_rgba(0,0,0,0.18)]"
            >
              {/* Emerald Accent Left Stripe */}
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-500" />

              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                {/* Left: Role Info */}
                <div className="space-y-4 flex-1 min-w-0">
                  <div className="flex items-start gap-3.5">
                    <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/15 border border-primary/30 text-primary font-bold text-lg shrink-0 shadow-md">
                      {initial}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h3 className="text-lg font-bold text-foreground tracking-tight truncate">
                          {al.internshipTitle}
                        </h3>
                        <StatusBadge status={al.status} />
                      </div>

                      <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-foreground/85">
                        <Building2Icon className="size-4 text-primary shrink-0" />
                        <span>{al.companyName}</span>
                        <span>·</span>
                        <span className="text-xs text-muted-foreground">Corporate Host Partner</span>
                      </p>
                    </div>
                  </div>

                  {/* Allocation Meta Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="rounded-xl border border-border/60 bg-muted/20 p-3">
                      <span className="text-[11px] font-medium text-muted-foreground block">Work Location</span>
                      <div className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-foreground">
                        <MapPinIcon className="size-3.5 text-primary shrink-0" />
                        <span className="truncate">{al.location}</span>
                      </div>
                    </div>

                    <div className="rounded-xl border border-border/60 bg-muted/20 p-3">
                      <span className="text-[11px] font-medium text-muted-foreground block">Internship Period</span>
                      <div className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-foreground">
                        <CalendarIcon className="size-3.5 text-primary shrink-0" />
                        <span className="truncate">{formatDate(al.startDate)} – {formatDate(al.endDate)}</span>
                      </div>
                    </div>

                    <div className="rounded-xl border border-border/60 bg-muted/20 p-3">
                      <span className="text-[11px] font-medium text-muted-foreground block">Monthly Stipend</span>
                      <div className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                        <IndianRupeeIcon className="size-3.5 shrink-0" />
                        <span>{formatStipend(al.stipend)} / month</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Score Ring & Action Links */}
                <div className="flex flex-col sm:flex-row lg:flex-col items-center justify-between lg:justify-center gap-4 shrink-0 lg:w-64 pt-4 lg:pt-0 border-t lg:border-t-0 border-border/60">
                  <div className="flex items-center gap-3">
                    <ScoreCircle score={al.matchScore} size="md" />
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block">
                        Match Confidence
                      </span>
                      <span className="text-sm font-bold text-foreground">
                        {al.matchScore}% Match
                      </span>
                    </div>
                  </div>

                  <div className="flex w-full gap-2">
                    <LinkButton
                      href={`/student/allocations/${al.id}`}
                      className="w-full gap-1.5 rounded-xl font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20"
                      size="sm"
                    >
                      <span>View Allotment Order</span>
                      <ArrowRightIcon className="size-3.5" />
                    </LinkButton>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Onboarding & Reporting Checklist */}
      <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/80 dark:bg-[#0e1322]/80 backdrop-blur-md p-6">
        <h3 className="text-base font-bold text-foreground tracking-tight mb-1">
          Next Steps for Workplace Onboarding
        </h3>
        <p className="text-xs text-muted-foreground mb-4">
          Complete the following compliance milestones before your official start date.
        </p>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
              <span className="flex size-5 items-center justify-center rounded-full bg-emerald-500 text-white text-[10px]">✓</span>
              <span>1. Offer Acceptance</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Confirmed on portal. Seat locked under affirmative merit quota.
            </p>
          </div>

          <div className="rounded-xl border border-border/70 bg-muted/20 p-4">
            <div className="flex items-center gap-2 text-foreground font-bold text-xs">
              <span className="flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px]">2</span>
              <span>2. HR Document Verification</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Sign NDA and upload university recommendation letter.
            </p>
          </div>

          <div className="rounded-xl border border-border/70 bg-muted/20 p-4">
            <div className="flex items-center gap-2 text-foreground font-bold text-xs">
              <span className="flex size-5 items-center justify-center rounded-full bg-muted text-muted-foreground text-[10px]">3</span>
              <span>3. First-Day Smart Check-In</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Scan corporate terminal QR upon reporting to Bengaluru campus.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
