"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeftIcon,
  SparklesIcon,
  UsersIcon,
  CalendarIcon,
  ArrowRightIcon,
  Building2Icon,
  AwardIcon
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { ScoreCircle } from "@/components/common/ScoreBar";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/button";
import { mockApplications } from "@/data/applications";
import { mockInternships } from "@/data/internships";
import { formatRelativeTime } from "@/lib/formatters";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function InternshipApplicantsPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const internship = mockInternships.find((i) => i.id === id);
  const applicants = mockApplications.filter((a) => a.internshipId === id);

  return (
    <div className="space-y-6">
      {/* Back Nav */}
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon-sm"
          onClick={() => router.back()}
          className="rounded-xl border-border/80 hover:bg-muted/50"
        >
          <ArrowLeftIcon className="size-4" />
        </Button>
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Back to Listings
        </span>
      </div>

      {/* Cyber Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent p-6 shadow-xl shadow-primary/5 backdrop-blur-md">
        <div className="absolute -right-10 -top-10 size-48 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-md">
              <UsersIcon className="size-3.5 text-primary" />
              <span>AI-Ranked Applicant Roster</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              {internship ? `${internship.title} Applicants` : "Role Applicants"}
            </h2>
            <p className="max-w-2xl text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Evaluating {applicants.length} candidate applications sorted automatically by skill overlap and holistic suitability.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-400">
              <SparklesIcon className="size-3.5" />
              {applicants.length} Total Submissions
            </span>
          </div>
        </div>
      </div>

      {applicants.length === 0 ? (
        <EmptyState
          title="No candidates have applied yet"
          description="Applications will appear here dynamically as students apply."
        />
      ) : (
        <div className="space-y-3">
          {[...applicants]
            .sort((a, b) => b.matchScore - a.matchScore)
            .map((app) => {
              const initials = app.studentName?.slice(0, 2).toUpperCase() || "ST";

              return (
                <div
                  key={app.id}
                  className="group relative overflow-hidden rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-5 transition-all duration-300 hover:border-primary/40 hover:shadow-xl"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-start gap-3.5 min-w-0 flex-1">
                      <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 border border-primary/25 text-primary font-bold text-sm shrink-0 shadow-sm">
                        {initials}
                      </div>

                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <h4 className="text-base font-bold text-foreground truncate group-hover:text-primary transition-colors">
                            {app.studentName}
                          </h4>
                          <StatusBadge status={app.status} />
                        </div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                          <CalendarIcon className="size-3 text-primary/70 shrink-0" />
                          <span>Submitted {formatRelativeTime(app.appliedAt)}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-border/50">
                      <div className="flex items-center gap-2 text-right">
                        <ScoreCircle score={app.matchScore} size="sm" />
                        <div className="text-left hidden sm:block">
                          <span className="text-[10px] text-muted-foreground block">Fit Score</span>
                          <span className="text-xs font-bold text-foreground">{app.matchScore}%</span>
                        </div>
                      </div>

                      <LinkButton
                        href={`/company/applications/${app.id}`}
                        size="sm"
                        className="gap-1.5 rounded-xl font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20"
                      >
                        <span>Review Application</span>
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
