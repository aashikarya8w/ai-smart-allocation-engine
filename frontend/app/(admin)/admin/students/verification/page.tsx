"use client";

import {
  ShieldCheckIcon, CheckCircle2Icon, XCircleIcon, ArrowLeftIcon,
  UserCheckIcon, GraduationCapIcon, MailIcon,
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { mockStudents } from "@/data/students";
import { EmptyState } from "@/components/common/EmptyState";
import { initials, formatDate } from "@/lib/formatters";
import { useRouter } from "next/navigation";

export default function StudentVerificationPage() {
  const router = useRouter();
  const pending = mockStudents.filter((s) => s.verificationStatus === "Pending");

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
          <h2 className="text-xl font-black text-foreground">Scholar Identity Clearance</h2>
          <p className="text-xs text-muted-foreground">{pending.length} candidate eKYC dossiers pending administrative approval</p>
        </div>
      </div>

      {pending.length === 0 ? (
        <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-8 shadow-xl backdrop-blur-md">
          <EmptyState title="All students verified" description="All registered student profiles have been verified and cleared." />
        </div>
      ) : (
        <div className="space-y-4">
          {pending.map((s) => (
            <div
              key={s.id}
              className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-5 shadow-xl backdrop-blur-md transition-all hover:border-primary/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5">
                <div className="size-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/30 border border-blue-500/30 flex items-center justify-center text-blue-400 font-extrabold text-sm shrink-0">
                  {initials(s.fullName)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">{s.fullName}</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                    <GraduationCapIcon className="h-3 w-3 text-primary" />
                    {s.university} · <span className="font-mono">{s.email}</span>
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Registered: {formatDate(s.createdAt)}</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <StatusBadge status={s.verificationStatus} />
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold shadow-md active:scale-95"
                >
                  <CheckCircle2Icon className="h-4 w-4 mr-1.5" />
                  Grant Clearance
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
