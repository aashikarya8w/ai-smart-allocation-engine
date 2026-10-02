"use client";

import { useState } from "react";
import { ArrowLeftRightIcon, CheckCircleIcon, XCircleIcon, ClockIcon, UserIcon } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScoreCircle } from "@/components/common/ScoreBar";
import { EmptyState } from "@/components/common/EmptyState";
import { mockSwapRequests } from "@/data/reallocation";
import { formatDate } from "@/lib/formatters";

const CHECK_COLOR = (v: boolean) =>
  v ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400";

export default function SwapsPage() {
  const [swaps, setSwaps] = useState(mockSwapRequests);

  const pending    = swaps.filter((s) => s.status === "Requested" || s.status === "UnderReview");
  const approved   = swaps.filter((s) => s.status === "Approved");
  const rejected   = swaps.filter((s) => s.status === "Rejected");

  const approve = (id: string) =>
    setSwaps((prev) => prev.map((s) => s.id === id ? { ...s, status: "Approved" as const, resolvedAt: new Date().toISOString() } : s));
  const reject = (id: string) =>
    setSwaps((prev) => prev.map((s) => s.id === id ? { ...s, status: "Rejected" as const, resolvedAt: new Date().toISOString() } : s));

  const SwapCard = ({ swap }: { swap: (typeof swaps)[0] }) => (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <ArrowLeftRightIcon className="size-4 text-primary shrink-0" />
            <p className="text-sm font-semibold text-foreground">Swap Request</p>
          </div>
          <Badge
            variant={
              swap.status === "Approved" ? "default" :
              swap.status === "Rejected" ? "destructive" : "secondary"
            }
            className="text-xs shrink-0"
          >
            {swap.status}
          </Badge>
        </div>

        {/* Students */}
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            {
              label: "Student A",
              name: swap.studentAName,
              internship: swap.internshipATitle,
              company: swap.companyAName,
              eligible: swap.bEligibleForA,
              suitability: swap.suitabilityAfterSwapA,
              bgColor: "bg-blue-50 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900",
              textColor: "text-blue-600",
            },
            {
              label: "Student B",
              name: swap.studentBName,
              internship: swap.internshipBTitle,
              company: swap.companyBName,
              eligible: swap.aEligibleForB,
              suitability: swap.suitabilityAfterSwapB,
              bgColor: "bg-purple-50 dark:bg-purple-950/20 border-purple-100 dark:border-purple-900",
              textColor: "text-purple-600",
            },
          ].map((s) => (
            <div key={s.label} className={`rounded-lg border p-3 ${s.bgColor}`}>
              <p className={`text-[11px] font-semibold uppercase mb-1 ${s.textColor}`}>{s.label}</p>
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-medium text-foreground">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.internship}</p>
                  <p className="text-xs text-muted-foreground">{s.company}</p>
                </div>
                <ScoreCircle score={s.suitability} size="sm" />
              </div>
              <p className={`mt-1.5 text-xs font-medium ${CHECK_COLOR(s.eligible)}`}>
                {s.eligible ? "✓ Eligible for swap" : "✗ Not eligible"}
              </p>
              <p className="text-[11px] text-muted-foreground">Post-swap suitability: {s.suitability}%</p>
            </div>
          ))}
        </div>

        {/* Compatibility checks */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[
            { label: "A eligible for B", value: swap.aEligibleForB },
            { label: "B eligible for A", value: swap.bEligibleForA },
            { label: "Preference boost",  value: swap.preferenceImprovement },
            { label: "Seat constraints",  value: swap.seatConstraintsSatisfied },
          ].map((c) => (
            <div key={c.label} className="rounded-lg bg-muted/50 p-2 text-center">
              <p className={`text-lg font-bold ${CHECK_COLOR(c.value)}`}>{c.value ? "✓" : "✗"}</p>
              <p className="text-[11px] text-muted-foreground">{c.label}</p>
            </div>
          ))}
        </div>

        {swap.adminNotes && (
          <div className="rounded-lg bg-muted/50 p-2.5">
            <p className="text-xs text-muted-foreground">Notes: {swap.adminNotes}</p>
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Requested {formatDate(swap.createdAt)}</span>
          {swap.resolvedAt && <span>Resolved {formatDate(swap.resolvedAt)}</span>}
        </div>

        {(swap.status === "Requested" || swap.status === "UnderReview") && (
          <div className="flex gap-2 pt-1">
            <Button size="sm" onClick={() => approve(swap.id)}
              disabled={!swap.aEligibleForB || !swap.bEligibleForA}
              className="flex-1"
            >
              <CheckCircleIcon className="mr-1.5 size-4" />Approve Swap
            </Button>
            <Button size="sm" variant="outline" onClick={() => reject(swap.id)} className="flex-1">
              <XCircleIcon className="mr-1.5 size-4" />Reject
            </Button>
          </div>
        )}
        {!swap.aEligibleForB || !swap.bEligibleForA ? (
          <p className="text-xs text-destructive">Cannot approve: eligibility check failed.</p>
        ) : null}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Internship Swap Management"
        description="Review and approve post-allocation internship swap requests between students."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard title="Pending Review" value={pending.length}  icon={ClockIcon}       trend="neutral" />
        <StatCard title="Approved"       value={approved.length} icon={CheckCircleIcon} trend="up"      />
        <StatCard title="Rejected"       value={rejected.length} icon={XCircleIcon}     trend="neutral" />
      </div>

      {/* How swap works */}
      <Card className="border-dashed">
        <CardContent className="p-4 space-y-2">
          <p className="text-xs font-semibold text-foreground">How Swap Engine Works</p>
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            {[
              "Student A & B request swap",
              "Check A eligible for B's internship",
              "Check B eligible for A's internship",
              "Validate seat constraints",
              "Assess preference improvement",
              "Admin reviews & approves",
            ].map((step, i, arr) => (
              <span key={step} className="flex items-center gap-2">
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary font-medium">{step}</span>
                {i < arr.length - 1 && <span>→</span>}
              </span>
            ))}
          </div>
          <p className="text-[11px] text-muted-foreground pt-1">
            Unlike reallocation, a swap does NOT require a vacant seat — it exchanges two existing allocations.
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">Pending ({pending.length})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({approved.length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({rejected.length})</TabsTrigger>
          <TabsTrigger value="all">All ({swaps.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="pending" className="space-y-4 pt-4">
          {pending.length === 0
            ? <EmptyState icon={ArrowLeftRightIcon} title="No pending swap requests" />
            : pending.map((s) => <SwapCard key={s.id} swap={s} />)}
        </TabsContent>
        <TabsContent value="approved" className="space-y-4 pt-4">
          {approved.map((s) => <SwapCard key={s.id} swap={s} />)}
        </TabsContent>
        <TabsContent value="rejected" className="space-y-4 pt-4">
          {rejected.map((s) => <SwapCard key={s.id} swap={s} />)}
        </TabsContent>
        <TabsContent value="all" className="space-y-4 pt-4">
          {swaps.map((s) => <SwapCard key={s.id} swap={s} />)}
        </TabsContent>
      </Tabs>
    </div>
  );
}
