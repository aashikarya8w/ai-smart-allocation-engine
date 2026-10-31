"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeftIcon,
  MapPinIcon,
  CalendarIcon,
  IndianRupeeIcon,
  CheckIcon,
  DownloadIcon,
  SparklesIcon,
  Building2Icon,
  ShieldCheckIcon,
  CheckCircle2Icon,
  FileCheck2Icon,
  AwardIcon
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { ScoreBar, ScoreCircle } from "@/components/common/ScoreBar";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import { mockAllocations } from "@/data/allocations";
import { formatDate, formatStipend } from "@/lib/formatters";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function AllocationDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const al = mockAllocations.find((a) => a.id === id);

  if (!al) return <EmptyState title="Allocation not found" />;

  const isApproved = al.status === "Approved" || al.status === "Recommended";
  const initial = al.companyName?.slice(0, 2).toUpperCase() || "TN";

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
          Back to Allocations
        </span>
      </div>

      {/* Cyber Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent p-6 shadow-xl shadow-primary/5 backdrop-blur-md">
        <div className="absolute -right-10 -top-10 size-48 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold text-lg shrink-0 shadow-md">
              {initial}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                  {al.internshipTitle}
                </h1>
                <StatusBadge status={al.status} />
              </div>
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Building2Icon className="size-3.5 text-primary shrink-0" />
                <span className="font-semibold text-foreground/90">{al.companyName}</span>
                <span>·</span>
                <span>Allotment ID: ALO-{al.id.slice(0, 6).toUpperCase()}</span>
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-400">
              <ShieldCheckIcon className="size-3.5" />
              Verified Allotment Confirmed
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column: Details & Rationale */}
        <div className="space-y-6 lg:col-span-2">
          {/* Specs */}
          <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-6 shadow-xl space-y-5">
            <h3 className="text-sm font-bold text-foreground">Placement Terms & Stipend</h3>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { icon: MapPinIcon, label: "Workplace Campus", value: al.location },
                { icon: SparklesIcon, label: "Work Model", value: al.workMode },
                { icon: CalendarIcon, label: "Reporting Date", value: formatDate(al.startDate) },
                { icon: CalendarIcon, label: "Conclusion Date", value: formatDate(al.endDate) },
                { icon: IndianRupeeIcon, label: "Monthly Stipend", value: `${formatStipend(al.stipend)} / month` },
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

            {/* Score Breakdown */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-foreground">5-Vector Match Breakdown</h4>
                <span className="text-xs text-muted-foreground font-mono">Algorithm Score</span>
              </div>

              <div className="space-y-3 pt-1">
                <ScoreBar label="Technical Skill Match" score={al.scoreBreakdown.skillMatch} />
                <ScoreBar label="Academic Qualification" score={al.scoreBreakdown.qualification} />
                <ScoreBar label="Geographic Proximity" score={al.scoreBreakdown.location} />
                <ScoreBar label="Candidate Interest" score={al.scoreBreakdown.interest} />
                <ScoreBar label="Relevant Project Depth" score={al.scoreBreakdown.experience} />
              </div>
            </div>

            <div className="h-px bg-border/60" />

            {/* Why You Were Selected */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Official Selection Rationale
              </h4>
              <ul className="space-y-2">
                {al.selectionReasons.map((reason) => (
                  <li key={reason} className="flex items-center gap-2.5 text-xs text-foreground/90 font-medium">
                    <CheckCircle2Icon className="size-4 text-emerald-400 shrink-0" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Onboarding Checklist */}
          {isApproved && (
            <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-6 shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-foreground border-b border-border/60 pb-3">
                Pre-Joining Action Items
              </h3>
              <ol className="space-y-3">
                {[
                  "Download and sign your official AICTE-compliant allotment letter.",
                  "Email host HR to confirm your reporting kit and workspace credentials.",
                  "Complete background clearance documents and sign standard NDA.",
                  "Scan terminal QR code upon campus arrival for smart first-day check-in.",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs text-muted-foreground leading-relaxed">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary text-[10px] font-bold">
                      {i + 1}
                    </span>
                    <span className="text-foreground/90">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>

        {/* Right Sidebar: Score Circle & Letter Download */}
        <div className="space-y-5">
          <div className="flex flex-col items-center justify-center rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-6 text-center shadow-xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Overall Merit Fit
            </span>
            <ScoreCircle score={al.matchScore} size="lg" />
            <span className="text-xs font-semibold text-emerald-400">
              ✓ Ranked #1 in Allocation Pool
            </span>
          </div>

          {isApproved && (
            <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-5 shadow-xl space-y-3">
              <Button className="w-full gap-2 rounded-xl font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20">
                <DownloadIcon className="size-4" />
                <span>Download Allotment Order</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full rounded-xl font-semibold border-border/80 hover:bg-muted/50"
                onClick={() => router.back()}
              >
                Back to Allocations
              </Button>
            </div>
          )}

          {al.reviewedBy && (
            <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-5 shadow-xl space-y-1.5 text-xs text-muted-foreground">
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary block">
                Verification Officer
              </span>
              <p>Reviewed by: <strong className="text-foreground">{al.reviewedBy}</strong></p>
              {al.reviewedAt && <p>Timestamp: {formatDate(al.reviewedAt)}</p>}
              {al.reviewNotes && <p className="italic text-muted-foreground/80 mt-1">{al.reviewNotes}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
