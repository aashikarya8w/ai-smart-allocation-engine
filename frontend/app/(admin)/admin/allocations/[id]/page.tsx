"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeftIcon, CheckIcon, Building2Icon, MapPinIcon,
  CalendarIcon, IndianRupeeIcon, CheckCircle2Icon, XCircleIcon,
  SparklesIcon, UserIcon, ShieldCheckIcon,
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

export default function AdminAllocationDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const al = mockAllocations.find((a) => a.id === id);

  if (!al) return <EmptyState title="Allocation record not found" />;

  return (
    <div className="space-y-8 pb-12">
      {/* Top Navigation */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => router.back()}
          className="rounded-xl border border-border/80 dark:border-white/10 bg-card/60 dark:bg-white/5 hover:bg-white/10"
        >
          <ArrowLeftIcon className="size-4" />
        </Button>
        <div>
          <h2 className="text-xl font-black text-foreground">Allocation Adjudication Dossier</h2>
          <p className="text-xs text-muted-foreground">Reference Token: {al.id}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left 2 Cols: Allocation Details */}
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-6 shadow-xl backdrop-blur-md">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-border/50 dark:border-white/5">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-extrabold text-lg shadow-lg shadow-emerald-500/20">
                  {al.studentName.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">{al.studentName}</h3>
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                    <Building2Icon className="h-3.5 w-3.5 text-primary" />
                    <span>Allocated into: <strong className="text-foreground">{al.internshipTitle}</strong></span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">Enterprise: {al.companyName}</p>
                </div>
              </div>
              <StatusBadge status={al.status} />
            </div>

            {/* Metric pill tiles */}
            <div className="grid sm:grid-cols-2 gap-3 py-5 border-b border-border/50 dark:border-white/5 text-xs">
              {[
                { label: "Designated Location", val: al.location },
                { label: "Work Arrangement", val: al.workMode },
                { label: "Deployment Date", val: formatDate(al.startDate) },
                { label: "Conclusion Date", val: formatDate(al.endDate) },
                { label: "Approved Stipend", val: `${formatStipend(al.stipend)} / month` },
              ].map(({ label, val }) => (
                <div key={label} className="p-3 rounded-xl bg-muted/40 dark:bg-white/[0.02] border border-border/40 dark:border-white/5">
                  <p className="text-muted-foreground">{label}</p>
                  <p className="font-semibold text-foreground mt-0.5 text-sm">{val}</p>
                </div>
              ))}
            </div>

            {/* Score Breakdown */}
            <div className="pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <SparklesIcon className="h-3.5 w-3.5 text-primary" />
                  Algorithmic Score Vectors
                </p>
                <span className="text-xs font-bold text-primary">{al.matchScore}% Match Score</span>
              </div>
              <div className="space-y-3">
                <ScoreBar label="Skill Repertoire Overlap" score={al.scoreBreakdown.skillMatch} />
                <ScoreBar label="Academic Qualification" score={al.scoreBreakdown.qualification} />
                <ScoreBar label="Transit & Geographic Radius" score={al.scoreBreakdown.location} />
                <ScoreBar label="Aspirational Interest" score={al.scoreBreakdown.interest} />
                <ScoreBar label="Demonstrated Experience" score={al.scoreBreakdown.experience} />
              </div>
            </div>

            {/* Selection Reasons */}
            <div className="pt-6 border-t border-border/50 dark:border-white/5">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Algorithmic Justification</p>
              <ul className="space-y-2">
                {al.selectionReasons.map((r) => (
                  <li key={r} className="flex items-center gap-2 text-xs text-foreground font-medium p-2.5 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                    <CheckCircle2Icon className="size-4 shrink-0 text-emerald-400" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Col: Score Gauge & Admin Actions */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-6 shadow-xl backdrop-blur-md flex flex-col items-center text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
              Composite Compatibility Score
            </p>
            <ScoreCircle score={al.matchScore} size="lg" />
            <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
              Gale-Shapley matrix ranking calculated against national affirmative action quotas.
            </p>
          </div>

          <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-6 shadow-xl backdrop-blur-md space-y-3">
            <h4 className="text-sm font-bold text-foreground mb-2">Administrative Mandate</h4>
            {(al.status === "Recommended" || al.status === "Pending") && (
              <>
                <Button
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold shadow-md active:scale-95"
                  size="sm"
                >
                  <CheckCircle2Icon className="h-4 w-4 mr-1.5" />
                  Confirm & Lock Seat
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="w-full font-semibold active:scale-95"
                >
                  <XCircleIcon className="h-4 w-4 mr-1.5" />
                  Reject & Backfill
                </Button>
              </>
            )}
            <Button
              variant="outline"
              size="sm"
              className="w-full border-white/10 hover:bg-white/5 active:scale-95"
              onClick={() => router.back()}
            >
              Return to Allocations
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
