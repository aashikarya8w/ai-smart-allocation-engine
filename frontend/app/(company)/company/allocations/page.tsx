"use client";

import {
  PageHeader
} from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { ScoreCircle } from "@/components/common/ScoreBar";
import { EmptyState } from "@/components/common/EmptyState";
import { LinkButton } from "@/components/ui/button";
import { useCompany } from "@/hooks/useCompany";
import { formatDate, formatStipend } from "@/lib/formatters";
import {
  ShieldCheckIcon,
  SparklesIcon,
  UsersIcon,
  CalendarIcon,
  MapPinIcon,
  IndianRupeeIcon,
  ArrowRightIcon,
  CheckCircle2Icon
} from "lucide-react";

export default function CompanyAllocationsPage() {
  const { allocations } = useCompany();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Confirmed Placements & Allocations"
        description={`Manage ${allocations.length} allocated student intern${allocations.length !== 1 ? "s" : ""} across your technical departments.`}
      />

      {/* Corporate Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent p-6 shadow-xl shadow-primary/5 backdrop-blur-md">
        <div className="absolute -right-10 -top-10 size-48 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-md">
              <ShieldCheckIcon className="size-3.5 text-primary" />
              <span>Official Government & Enterprise Allotment Register</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Finalized Intern Onboarding & Cohort Roster
            </h2>
            <p className="max-w-2xl text-xs sm:text-sm text-muted-foreground leading-relaxed">
              These candidates have cleared technical assessment benchmarks, domicile quotas, and affirmative action algorithms for this placement cycle.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-400">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              {allocations.length} Confirmed Placements
            </span>
          </div>
        </div>
      </div>

      {allocations.length === 0 ? (
        <EmptyState
          title="No allocations finalized yet"
          description="Candidates will populate here once the AI matching engine concludes the allocation round."
        />
      ) : (
        <div className="space-y-4">
          {allocations.map((al) => {
            const initials = al.studentName?.slice(0, 2).toUpperCase() || "ST";

            return (
              <div
                key={al.id}
                className="group relative overflow-hidden rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-5 transition-all duration-300 hover:border-emerald-500/40 hover:shadow-xl"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* Left: Candidate info */}
                  <div className="flex items-start gap-3.5 min-w-0 flex-1">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/25 text-primary font-bold text-sm shrink-0 shadow-sm">
                      {initials}
                    </div>

                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h4 className="text-base font-bold text-foreground group-hover:text-primary transition-colors truncate">
                          {al.studentName}
                        </h4>
                        <StatusBadge status={al.status} />
                        <span className="inline-flex items-center rounded-full border border-primary/25 bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
                          {al.workMode}
                        </span>
                      </div>

                      <p className="text-xs font-medium text-foreground/90">
                        Assigned Role: <strong className="text-foreground">{al.internshipTitle}</strong>
                      </p>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground pt-0.5">
                        <span className="flex items-center gap-1">
                          <MapPinIcon className="size-3.5 text-primary shrink-0" />
                          {al.location}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <CalendarIcon className="size-3.5 shrink-0" />
                          {formatDate(al.startDate)} – {formatDate(al.endDate)}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                          <IndianRupeeIcon className="size-3.5 shrink-0" />
                          {formatStipend(al.stipend)} / mo
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Score Ring & Profile CTA */}
                  <div className="flex items-center justify-between lg:justify-end gap-4 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-border/50">
                    <div className="flex items-center gap-2 text-right">
                      <ScoreCircle score={al.matchScore} size="sm" />
                      <div className="text-left hidden sm:block">
                        <span className="text-[10px] text-muted-foreground block">Fit Score</span>
                        <span className="text-xs font-bold text-foreground">{al.matchScore}% Match</span>
                      </div>
                    </div>

                    <LinkButton
                      href={`/company/candidates/${al.studentId}`}
                      size="sm"
                      className="gap-1.5 rounded-xl font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20"
                    >
                      <span>Candidate Dossier</span>
                      <ArrowRightIcon className="size-3.5" />
                    </LinkButton>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
