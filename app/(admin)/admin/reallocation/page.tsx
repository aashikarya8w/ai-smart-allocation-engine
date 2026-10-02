"use client";

import { useState } from "react";
import { RefreshCwIcon, CheckCircleIcon, XCircleIcon, ClockIcon, UserIcon } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScoreCircle } from "@/components/common/ScoreBar";
import { EmptyState } from "@/components/common/EmptyState";
import { mockReallocations } from "@/data/reallocation";
import { formatDate } from "@/lib/formatters";

const TRIGGER_LABEL: Record<string, string> = {
  StudentRejection:    "Student Rejected",
  CompanyCancellation: "Company Cancelled",
  VacantSeat:          "Vacant Seat",
  RequirementChange:   "Requirement Changed",
};

const TRIGGER_COLOR: Record<string, string> = {
  StudentRejection:    "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
  CompanyCancellation: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
  VacantSeat:          "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  RequirementChange:   "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
};

export default function ReallocationPage() {
  const [reallocations, setReallocations] = useState(mockReallocations);

  const pending  = reallocations.filter((r) => r.status === "Pending");
  const approved = reallocations.filter((r) => r.status === "Approved");
  const rejected = reallocations.filter((r) => r.status === "Rejected");

  const approve = (id: string) =>
    setReallocations((prev) => prev.map((r) => r.id === id ? { ...r, status: "Approved" as const, resolvedAt: new Date().toISOString() } : r));

  const reject = (id: string) =>
    setReallocations((prev) => prev.map((r) => r.id === id ? { ...r, status: "Rejected" as const, resolvedAt: new Date().toISOString() } : r));

  const ReallocationCard = ({ r }: { r: (typeof reallocations)[0] }) => (
    <Card>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-medium text-foreground">{r.internshipTitle}</p>
            <p className="text-sm text-muted-foreground">{r.companyName}</p>
          </div>
          <Badge
            variant={r.status === "Approved" ? "default" : r.status === "Pending" ? "secondary" : "destructive"}
            className="text-xs shrink-0"
          >
            {r.status}
          </Badge>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {/* Vacated */}
          <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900 p-3">
            <p className="text-[11px] font-semibold uppercase text-red-500 mb-1">Vacated By</p>
            <div className="flex items-center gap-2">
              <UserIcon className="size-4 text-muted-foreground" />
              <p className="text-sm font-medium text-foreground">{r.vacatedStudentName}</p>
            </div>
            <span className={`mt-1 inline-flex rounded px-1.5 py-0.5 text-[11px] font-medium ${TRIGGER_COLOR[r.trigger]}`}>
              {TRIGGER_LABEL[r.trigger]}
            </span>
          </div>

          {/* Recommended */}
          <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900 p-3">
            <p className="text-[11px] font-semibold uppercase text-green-600 mb-1">Recommended Candidate</p>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <UserIcon className="size-4 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground">{r.recommendedStudentName}</p>
              </div>
              <ScoreCircle score={r.recommendedSuitabilityScore} size="sm" />
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground">Suitability: {r.recommendedSuitabilityScore}%</p>
          </div>
        </div>

        {r.adminNotes && (
          <div className="rounded-lg bg-muted/50 p-2.5">
            <p className="text-xs text-muted-foreground">Notes: {r.adminNotes}</p>
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Created {formatDate(r.createdAt)}</span>
          {r.resolvedAt && <span>Resolved {formatDate(r.resolvedAt)}</span>}
        </div>

        {r.status === "Pending" && (
          <div className="flex gap-2 pt-1">
            <Button size="sm" onClick={() => approve(r.id)} className="flex-1">
              <CheckCircleIcon className="mr-1.5 size-4" />Approve
            </Button>
            <Button size="sm" variant="outline" onClick={() => reject(r.id)} className="flex-1">
              <XCircleIcon className="mr-1.5 size-4" />Reject
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Smart Re-Allocation"
        description="Manage reallocation requests triggered by vacated seats, student rejections, or company cancellations."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard title="Pending Review" value={pending.length}  icon={ClockIcon}        trend="neutral" />
        <StatCard title="Approved"       value={approved.length} icon={CheckCircleIcon}  trend="up"      />
        <StatCard title="Rejected"       value={rejected.length} icon={XCircleIcon}      trend="neutral" />
      </div>

      {/* Reallocation flow */}
      <Card className="border-dashed">
        <CardContent className="p-4">
          <p className="text-xs font-semibold text-foreground mb-3">Reallocation Flow</p>
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            {["Seat Vacant", "Find Eligible Candidates", "Recalculate Suitability", "Apply Allocation Rules", "Recommend Replacement", "Admin Approval", "New Allocation"].map((step, i, arr) => (
              <span key={step} className="flex items-center gap-2">
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary font-medium">{step}</span>
                {i < arr.length - 1 && <span>→</span>}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">Pending ({pending.length})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({approved.length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({rejected.length})</TabsTrigger>
          <TabsTrigger value="all">All ({reallocations.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="pending" className="space-y-4 pt-4">
          {pending.length === 0
            ? <EmptyState icon={RefreshCwIcon} title="No pending reallocations" />
            : pending.map((r) => <ReallocationCard key={r.id} r={r} />)}
        </TabsContent>
        <TabsContent value="approved" className="space-y-4 pt-4">
          {approved.length === 0
            ? <EmptyState icon={CheckCircleIcon} title="No approved reallocations" />
            : approved.map((r) => <ReallocationCard key={r.id} r={r} />)}
        </TabsContent>
        <TabsContent value="rejected" className="space-y-4 pt-4">
          {rejected.length === 0
            ? <EmptyState icon={XCircleIcon} title="No rejected reallocations" />
            : rejected.map((r) => <ReallocationCard key={r.id} r={r} />)}
        </TabsContent>
        <TabsContent value="all" className="space-y-4 pt-4">
          {reallocations.map((r) => <ReallocationCard key={r.id} r={r} />)}
        </TabsContent>
      </Tabs>
    </div>
  );
}
