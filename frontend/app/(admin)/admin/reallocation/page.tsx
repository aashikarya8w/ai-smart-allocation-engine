"use client";

import { useState } from "react";
import {
  RefreshCwIcon, CheckCircle2Icon, XCircleIcon, ClockIcon, UserIcon,
  SparklesIcon, ArrowRightIcon, ShieldCheckIcon, AlertTriangleIcon,
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScoreCircle } from "@/components/common/ScoreBar";
import { EmptyState } from "@/components/common/EmptyState";
import { mockReallocations } from "@/data/reallocation";
import { formatDate } from "@/lib/formatters";

const TRIGGER_LABEL: Record<string, string> = {
  StudentRejection: "Candidate Declination",
  CompanyCancellation: "Corporate Seat Withdrawal",
  VacantSeat: "Unfilled Allocation Quota",
  RequirementChange: "Corporate Profile Mutation",
};

const TRIGGER_COLOR: Record<string, string> = {
  StudentRejection: "border-rose-500/30 text-rose-400 bg-rose-500/10",
  CompanyCancellation: "border-orange-500/30 text-orange-400 bg-orange-500/10",
  VacantSeat: "border-blue-500/30 text-blue-400 bg-blue-500/10",
  RequirementChange: "border-purple-500/30 text-purple-400 bg-purple-500/10",
};

export default function ReallocationPage() {
  const [reallocations, setReallocations] = useState(mockReallocations);
  const [activeTab, setActiveTab] = useState<string>("pending");

  const pending = reallocations.filter((r) => r.status === "Pending");
  const approved = reallocations.filter((r) => r.status === "Approved");
  const rejected = reallocations.filter((r) => r.status === "Rejected");

  const approve = (id: string) =>
    setReallocations((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: "Approved" as const, resolvedAt: new Date().toISOString() } : r
      )
    );

  const reject = (id: string) =>
    setReallocations((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: "Rejected" as const, resolvedAt: new Date().toISOString() } : r
      )
    );

  const ReallocationCard = ({ r }: { r: (typeof reallocations)[0] }) => (
    <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-6 shadow-xl backdrop-blur-md space-y-4 hover:border-primary/40 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border/50 dark:border-white/5">
        <div>
          <h3 className="text-base font-bold text-foreground">{r.internshipTitle}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Corporate Host: {r.companyName}</p>
        </div>
        <Badge
          variant="outline"
          className={`text-xs font-semibold ${
            r.status === "Approved"
              ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10"
              : r.status === "Pending"
              ? "border-amber-500/30 text-amber-400 bg-amber-500/10"
              : "border-rose-500/30 text-rose-400 bg-rose-500/10"
          }`}
        >
          {r.status}
        </Badge>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Vacated Student Tile */}
        <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4 space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-rose-400">Previous Allocation (Vacated)</p>
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-xs">
              <UserIcon className="size-4" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">{r.vacatedStudentName}</p>
              <p className="text-[11px] text-muted-foreground">Seat released by candidate</p>
            </div>
          </div>
          <span className={`inline-flex rounded-md px-2 py-0.5 text-[11px] font-bold border ${TRIGGER_COLOR[r.trigger]}`}>
            {TRIGGER_LABEL[r.trigger]}
          </span>
        </div>

        {/* Recommended Candidate Tile */}
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Algorithmic Reallocation Target</p>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="size-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                <SparklesIcon className="size-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">{r.recommendedStudentName}</p>
                <p className="text-[11px] text-muted-foreground">Top queue candidate</p>
              </div>
            </div>
            <ScoreCircle score={r.recommendedSuitabilityScore} size="sm" />
          </div>
          <p className="text-[11px] text-emerald-400 font-semibold">
            Gale-Shapley Match Precision: {r.recommendedSuitabilityScore}%
          </p>
        </div>
      </div>

      {r.adminNotes && (
        <div className="rounded-xl bg-muted/40 dark:bg-white/[0.02] border border-border/40 dark:border-white/5 p-3 text-xs text-slate-300">
          <strong className="text-foreground">System Audit Notes:</strong> {r.adminNotes}
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
        <span>Logged: {formatDate(r.createdAt)}</span>
        {r.resolvedAt && <span>Resolved: {formatDate(r.resolvedAt)}</span>}
      </div>

      {r.status === "Pending" && (
        <div className="flex gap-3 pt-2">
          <Button
            size="sm"
            onClick={() => approve(r.id)}
            className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold shadow-md active:scale-95"
          >
            <CheckCircle2Icon className="h-4 w-4 mr-1.5" />
            Authorize Reallocation
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => reject(r.id)}
            className="flex-1 font-semibold active:scale-95"
          >
            <XCircleIcon className="h-4 w-4 mr-1.5" />
            Dismiss Proposal
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-br from-[#0c1222] via-[#0f172a] to-[#1e1338] p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl">
        <div className="absolute -top-32 -right-24 h-96 w-96 rounded-full bg-gradient-to-br from-primary/20 via-purple-500/15 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-gradient-to-tr from-cyan-500/15 via-blue-500/10 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
              <RefreshCwIcon className="h-3.5 w-3.5" />
              Dynamic Vacancy Rebalancing Engine
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Seat <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Reallocations</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed font-normal">
              Manage automatic and manual backfill operations for forfeited, rejected, or newly created internship vacancies across partner enterprises.
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold backdrop-blur-md">
            <AlertTriangleIcon className="h-4 w-4" />
            <span>{pending.length} Unresolved Vacancies</span>
          </div>
        </div>
      </div>

      {/* 3 Interactive Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          {
            title: "Pending Reallocations",
            value: pending.length,
            tab: "pending",
            color: "from-amber-500 to-orange-600",
            accent: "#f59e0b",
            icon: ClockIcon,
            sub: "Requires admin confirmation",
          },
          {
            title: "Approved Backfills",
            value: approved.length,
            tab: "approved",
            color: "from-emerald-500 to-teal-600",
            accent: "#10b981",
            icon: CheckCircle2Icon,
            sub: "Seats successfully reassigned",
          },
          {
            title: "Dismissed Proposals",
            value: rejected.length,
            tab: "rejected",
            color: "from-rose-500 to-pink-600",
            accent: "#f43f5e",
            icon: XCircleIcon,
            sub: "Returned to unallocated pool",
          },
        ].map((stat) => {
          const Icon = stat.icon;
          const isSelected = activeTab === stat.tab;
          return (
            <div
              key={stat.title}
              onClick={() => setActiveTab(stat.tab)}
              className={`cursor-pointer group relative overflow-hidden rounded-2xl border bg-card/90 dark:bg-[#0e1322]/90 p-5 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 ${
                isSelected
                  ? "border-primary ring-2 ring-primary/40 shadow-primary/20"
                  : "border-border/80 dark:border-white/10 hover:border-primary/50"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">{stat.title}</p>
                  <p className="mt-2 text-3xl font-extrabold tracking-tight text-foreground">{stat.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{stat.sub}</p>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-md group-hover:scale-110 transition-transform`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-card/80 dark:bg-[#0e1322]/80 border border-border/80 dark:border-white/10 p-1 rounded-xl">
          <TabsTrigger value="pending" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg text-xs font-semibold">
            Pending Backfills ({pending.length})
          </TabsTrigger>
          <TabsTrigger value="approved" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg text-xs font-semibold">
            Approved Ledger ({approved.length})
          </TabsTrigger>
          <TabsTrigger value="rejected" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg text-xs font-semibold">
            Dismissed History ({rejected.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pending.length === 0 ? (
            <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-8 shadow-xl backdrop-blur-md">
              <EmptyState title="All vacancies reconciled" description="No pending reallocation proposals in queue." />
            </div>
          ) : (
            pending.map((r) => <ReallocationCard key={r.id} r={r} />)
          )}
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          {approved.length === 0 ? (
            <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-8 shadow-xl backdrop-blur-md">
              <EmptyState title="No approved reallocations" />
            </div>
          ) : (
            approved.map((r) => <ReallocationCard key={r.id} r={r} />)
          )}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          {rejected.length === 0 ? (
            <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-8 shadow-xl backdrop-blur-md">
              <EmptyState title="No dismissed reallocations" />
            </div>
          ) : (
            rejected.map((r) => <ReallocationCard key={r.id} r={r} />)
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
