"use client";

import {
  Building2Icon, CheckCircle2Icon, XCircleIcon, ArrowLeftIcon,
  ShieldCheckIcon, MapPinIcon,
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/common/EmptyState";
import { mockCompanies } from "@/data/companies";
import { initials, formatDate } from "@/lib/formatters";
import { useRouter } from "next/navigation";

export default function CompanyVerificationPage() {
  const router = useRouter();
  const pending = mockCompanies.filter((c) => c.verificationStatus === "Pending");

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
          <h2 className="text-xl font-black text-foreground">Corporate Host MCA Clearance</h2>
          <p className="text-xs text-muted-foreground">{pending.length} enterprise partners awaiting statutory onboarding clearance</p>
        </div>
      </div>

      {pending.length === 0 ? (
        <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-8 shadow-xl backdrop-blur-md">
          <EmptyState title="All corporate entities verified" description="No pending company MCA verification dossiers." />
        </div>
      ) : (
        <div className="space-y-4">
          {pending.map((c) => (
            <div
              key={c.id}
              className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-5 shadow-xl backdrop-blur-md transition-all hover:border-primary/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5">
                <div className="size-12 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/30 border border-amber-500/30 flex items-center justify-center text-amber-400 font-extrabold text-sm shrink-0">
                  {initials(c.companyName)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">{c.companyName}</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                    <Building2Icon className="h-3 w-3 text-primary" />
                    {c.sector} · <span className="flex items-center gap-1"><MapPinIcon className="h-3 w-3" /> {c.city}, {c.state}</span>
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Registered: {formatDate(c.createdAt)}</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <StatusBadge status={c.verificationStatus} />
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold shadow-md active:scale-95"
                >
                  <CheckCircle2Icon className="h-4 w-4 mr-1.5" />
                  Approve Enterprise
                </Button>
                <Button size="sm" variant="destructive" className="font-semibold active:scale-95">
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
