"use client";

import { useState } from "react";
import {
  ArrowLeftRightIcon, CheckCircle2Icon, XCircleIcon, ClockIcon, UserIcon,
  SparklesIcon, ShieldCheckIcon, AlertTriangleIcon, CheckIcon, XIcon,
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScoreCircle } from "@/components/common/ScoreBar";
import { EmptyState } from "@/components/common/EmptyState";
import { mockSwapRequests } from "@/data/reallocation";
import { formatDate } from "@/lib/formatters";

export default function SwapsPage() {
  const [swaps, setSwaps] = useState(mockSwapRequests);
  const [activeTab, setActiveTab] = useState<string>("pending");

  const pending = swaps.filter((s) => s.status === "Requested" || s.status === "UnderReview");
  const approved = swaps.filter((s) => s.status === "Approved");
  const rejected = swaps.filter((s) => s.status === "Rejected");

  const approve = (id: string) =>
    setSwaps((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: "Approved" as const, resolvedAt: new Date().toISOString() } : s
      )
    );

  const reject = (id: string) =>
    setSwaps((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: "Rejected" as const, resolvedAt: new Date().toISOString() } : s
      )
    );

  const SwapCard = ({ swap }: { swap: (typeof swaps)[0] }) => (
    <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-6 shadow-xl backdrop-blur-md space-y-4 hover:border-primary/40 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border/50 dark:border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
            <ArrowLeftRightIcon className="size-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground">Bilateral Mutual Swap Request</h3>
            <p className="text-xs text-muted-foreground">ID: {swap.id} · Requested {formatDate(swap.createdAt)}</p>
          </div>
        </div>

        <Badge
          variant="outline"
          className={`text-xs font-semibold ${
            swap.status === "Approved"
              ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10"
              : swap.status === "Rejected"
              ? "border-rose-500/30 text-rose-400 bg-rose-500/10"
              : "border-amber-500/30 text-amber-400 bg-amber-500/10"
          }`}
        >
          {swap.status}
        </Badge>
      </div>

      {/* Dual Candidate Exchange Matrix */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Student A */}
        <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 space-y-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-blue-400">Candidate A Offering</p>
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-base font-bold text-foreground">{swap.studentAName}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{swap.internshipATitle}</p>
              <p className="text-xs font-medium text-primary mt-0.5">{swap.companyAName}</p>
            </div>
            <ScoreCircle score={swap.suitabilityAfterSwapA} size="sm" />
          </div>
          <div className="pt-2 border-t border-border/30 dark:border-white/5 flex items-center justify-between text-xs">
            <span className={swap.bEligibleForA ? "text-emerald-400 font-semibold" : "text-rose-400 font-semibold"}>
              {swap.bEligibleForA ? "✓ Candidate B satisfies requirements" : "✗ B not eligible"}
            </span>
            <span className="text-muted-foreground">Post-Swap: {swap.suitabilityAfterSwapA}%</span>
          </div>
        </div>

        {/* Student B */}
        <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-4 space-y-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-purple-400">Candidate B Offering</p>
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-base font-bold text-foreground">{swap.studentBName}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{swap.internshipBTitle}</p>
              <p className="text-xs font-medium text-purple-400 mt-0.5">{swap.companyBName}</p>
            </div>
            <ScoreCircle score={swap.suitabilityAfterSwapB} size="sm" />
          </div>
          <div className="pt-2 border-t border-border/30 dark:border-white/5 flex items-center justify-between text-xs">
            <span className={swap.aEligibleForB ? "text-emerald-400 font-semibold" : "text-rose-400 font-semibold"}>
              {swap.aEligibleForB ? "✓ Candidate A satisfies requirements" : "✗ A not eligible"}
            </span>
            <span className="text-muted-foreground">Post-Swap: {swap.suitabilityAfterSwapB}%</span>
          </div>
        </div>
      </div>

      {/* Algorithmic Constraints Verification Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
        {[
          { label: "A Eligible for B", value: swap.aEligibleForB },
          { label: "B Eligible for A", value: swap.bEligibleForA },
          { label: "Preference Gain", value: swap.preferenceImprovement },
          { label: "Seat Caps Respected", value: swap.seatConstraintsSatisfied },
        ].map((c) => (
          <div
            key={c.label}
            className="p-2.5 rounded-xl bg-muted/40 dark:bg-white/[0.02] border border-border/40 dark:border-white/5 flex items-center justify-between text-xs"
          >
            <span className="text-muted-foreground">{c.label}</span>
            {c.value ? (
              <span className="flex items-center gap-1 text-emerald-400 font-bold">
                <CheckIcon className="size-3.5" /> Pass
              </span>
            ) : (
              <span className="flex items-center gap-1 text-rose-400 font-bold">
                <XIcon className="size-3.5" /> Fail
              </span>
            )}
          </div>
        ))}
      </div>

      {swap.adminNotes && (
        <div className="rounded-xl bg-muted/40 dark:bg-white/[0.02] border border-border/40 dark:border-white/5 p-3 text-xs text-slate-300">
          <strong className="text-foreground">Auditor Remarks:</strong> {swap.adminNotes}
        </div>
      )}

      {(swap.status === "Requested" || swap.status === "UnderReview") && (
        <div className="flex gap-3 pt-2">
          <Button
            size="sm"
            onClick={() => approve(swap.id)}
            className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold shadow-md active:scale-95"
          >
            <CheckCircle2Icon className="h-4 w-4 mr-1.5" />
            Sanction Mutual Swap
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => reject(swap.id)}
            className="flex-1 font-semibold active:scale-95"
          >
            <XCircleIcon className="h-4 w-4 mr-1.5" />
            Decline Request
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
              <ArrowLeftRightIcon className="h-3.5 w-3.5" />
              Pareto-Optimal Mutual Exchange Engine
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Mutual <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Seat Swaps</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed font-normal">
              Review and authorize cross-institutional mutual internship swaps requested by accepted candidates. Verified against qualification thresholds to guarantee zero quality regression.
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold backdrop-blur-md">
            <ShieldCheckIcon className="h-4 w-4" />
            <span>Strict Pareto Dominance Rule</span>
          </div>
        </div>
      </div>

      {/* 3 Interactive Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          {
            title: "Pending Swap Proposals",
            value: pending.length,
            tab: "pending",
            color: "from-amber-500 to-orange-600",
            accent: "#f59e0b",
            icon: ClockIcon,
            sub: "Awaiting ministerial audit",
          },
          {
            title: "Authorized Swaps",
            value: approved.length,
            tab: "approved",
            color: "from-emerald-500 to-teal-600",
            accent: "#10b981",
            icon: CheckCircle2Icon,
            sub: "Executed & confirmed",
          },
          {
            title: "Rejected Swaps",
            value: rejected.length,
            tab: "rejected",
            color: "from-rose-500 to-pink-600",
            accent: "#f43f5e",
            icon: XCircleIcon,
            sub: "Incompatible prerequisites",
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
            Pending Reviews ({pending.length})
          </TabsTrigger>
          <TabsTrigger value="approved" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg text-xs font-semibold">
            Authorized Swaps ({approved.length})
          </TabsTrigger>
          <TabsTrigger value="rejected" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg text-xs font-semibold">
            Declined ({rejected.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pending.length === 0 ? (
            <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-8 shadow-xl backdrop-blur-md">
              <EmptyState title="No pending mutual swaps" description="All candidate exchange requests have been adjudicated." />
            </div>
          ) : (
            pending.map((s) => <SwapCard key={s.id} swap={s} />)
          )}
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          {approved.length === 0 ? (
            <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-8 shadow-xl backdrop-blur-md">
              <EmptyState title="No authorized swaps" />
            </div>
          ) : (
            approved.map((s) => <SwapCard key={s.id} swap={s} />)
          )}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          {rejected.length === 0 ? (
            <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-8 shadow-xl backdrop-blur-md">
              <EmptyState title="No declined swaps" />
            </div>
          ) : (
            rejected.map((s) => <SwapCard key={s.id} swap={s} />)
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
