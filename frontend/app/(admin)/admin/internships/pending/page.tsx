"use client";

import {
  ClockIcon, CheckCircle2Icon, XCircleIcon, BriefcaseIcon,
  MapPinIcon, IndianRupeeIcon, UsersIcon, ShieldAlertIcon,
  ArrowLeftIcon,
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/common/EmptyState";
import { mockInternships } from "@/data/internships";
import { formatDate, formatStipendRange } from "@/lib/formatters";
import { useRouter } from "next/navigation";

export default function PendingInternshipsPage() {
  const router = useRouter();
  const pending = mockInternships.filter((i) => i.status === "Pending");

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
          <h2 className="text-xl font-black text-foreground">Pending Internship Submissions</h2>
          <p className="text-xs text-muted-foreground">{pending.length} corporate postings awaiting administrative clearance</p>
        </div>
      </div>

      {pending.length === 0 ? (
        <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-8 shadow-xl backdrop-blur-md">
          <EmptyState
            title="All submissions reviewed"
            description="There are currently no company internship postings waiting in the administrative approval pipeline."
          />
        </div>
      ) : (
        <div className="grid gap-4">
          {pending.map((i) => (
            <div
              key={i.id}
              className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-6 shadow-xl backdrop-blur-md transition-all hover:border-primary/40 flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-lg font-bold text-foreground">{i.title}</h3>
                  <StatusBadge status={i.status} />
                  <Badge variant="outline" className="text-xs border-amber-500/30 text-amber-400 bg-amber-500/10">
                    Awaiting Verification
                  </Badge>
                </div>

                <p className="text-sm font-medium text-primary flex items-center gap-2">
                  <BriefcaseIcon className="h-4 w-4" />
                  {i.companyName}
                  <span className="text-muted-foreground font-normal">·</span>
                  <span className="text-muted-foreground font-normal flex items-center gap-1">
                    <MapPinIcon className="h-3 w-3" /> {i.city}, {i.state}
                  </span>
                </p>

                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="px-2.5 py-1 rounded-md bg-muted/60 dark:bg-white/5 border border-border/40 dark:border-white/5">
                    ⏱️ {i.duration}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-muted/60 dark:bg-white/5 border border-border/40 dark:border-white/5 text-emerald-400 font-semibold">
                    💰 {formatStipendRange(i.stipendMin, i.stipendMax)}/mo
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-muted/60 dark:bg-white/5 border border-border/40 dark:border-white/5">
                    👥 {i.seats} Seats Available
                  </span>
                  <Badge variant="secondary" className="text-xs font-semibold">
                    {i.workMode}
                  </Badge>
                  <span className="text-[11px] text-muted-foreground">Submitted: {formatDate(i.createdAt)}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold shadow-md active:scale-95"
                >
                  <CheckCircle2Icon className="h-4 w-4 mr-1.5" />
                  Approve Posting
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="font-semibold active:scale-95"
                >
                  <XCircleIcon className="h-4 w-4 mr-1.5" />
                  Reject
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
