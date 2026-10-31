"use client";

import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { ScoreCircle } from "@/components/common/ScoreBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LinkButton } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckIcon, XIcon, Loader2Icon, PlayIcon } from "lucide-react";
import { mockAllocations } from "@/data/allocations";
import { runSmartAllocation } from "@/services/allocationService";
import { formatDate } from "@/lib/formatters";
import { cn } from "@/lib/utils";

const STEPS = [
  "Preparing data",
  "Checking eligibility",
  "Calculating match scores",
  "Applying constraints",
  "Optimising allocation",
  "Generating results",
];

export default function AdminAllocationsPage() {
  const [running, setRunning]     = useState(false);
  const [done, setDone]           = useState(false);
  const [progress, setProgress]   = useState(0);
  const [currentStep, setCurrentStep] = useState("");

  const recommended = mockAllocations.filter((a) => a.status === "Recommended");
  const pending     = mockAllocations.filter((a) => a.status === "Pending");
  const approved    = mockAllocations.filter((a) => a.status === "Approved");
  const rejected    = mockAllocations.filter((a) => a.status === "Rejected");

  async function handleRun() {
    setRunning(true);
    setDone(false);
    setProgress(0);
    await runSmartAllocation((step, pct) => {
      setCurrentStep(step);
      setProgress(pct);
    });
    setRunning(false);
    setDone(true);
  }

  const completedSteps = STEPS.filter((_, i) =>
    progress >= Math.round(((i + 1) / STEPS.length) * 100)
  );

  return (
    <div className="space-y-6">
      <PageHeader title="Smart Allocation" description="Run the AI-powered smart allocation engine.">
        <Button onClick={handleRun} disabled={running} size="sm" className="gap-2">
          {running ? <Loader2Icon className="size-4 animate-spin" /> : <PlayIcon className="size-4" />}
          {running ? "Running…" : "Run Smart Allocation"}
        </Button>
      </PageHeader>

      {/* Run progress */}
      {(running || done) && (
        <Card>
          <CardHeader><CardTitle className="text-sm">Allocation Progress</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2.5">
              {STEPS.map((step, i) => {
                const completed = completedSteps.includes(step);
                const active    = currentStep === step && running;
                return (
                  <div key={step} className="flex items-center gap-3">
                    <div className={cn(
                      "flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold transition-colors",
                      completed ? "bg-green-500 text-white" : active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    )}>
                      {completed ? <CheckIcon className="size-3" /> : i + 1}
                    </div>
                    <span className={cn("text-sm", completed ? "text-green-600 dark:text-green-400 font-medium" : active ? "text-primary font-medium" : "text-muted-foreground")}>
                      {step}
                    </span>
                    {active && <Loader2Icon className="size-3.5 animate-spin text-primary" />}
                  </div>
                );
              })}
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">{done ? "Completed" : currentStep}</span>
                <span className="font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            {done && (
              <div className="rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-800/30 dark:bg-green-900/10">
                <p className="text-sm font-semibold text-green-700 dark:text-green-400">
                  ✅ Allocation complete! {mockAllocations.length} allocations generated.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Tabs */}
      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="recommended">Recommended ({recommended.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pending.length})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({approved.length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({rejected.length})</TabsTrigger>
        </TabsList>

        {(["recommended", "pending", "approved", "rejected"] as const).map((tab) => {
          const data = { recommended, pending, approved, rejected }[tab];
          return (
            <TabsContent key={tab} value={tab} className="mt-4 space-y-3">
              {data.length === 0 ? (
                <p className="text-sm text-muted-foreground py-8 text-center">No {tab} allocations.</p>
              ) : (
                data.map((al) => (
                  <Card key={al.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-foreground">{al.studentName}</p>
                          <p className="text-xs text-muted-foreground">{al.internshipTitle} · {al.companyName}</p>
                          <p className="text-xs text-muted-foreground">{al.location} · {al.workMode} · {formatDate(al.startDate)}</p>
                        </div>
                        <div className="flex shrink-0 items-center gap-2">
                          <ScoreCircle score={al.matchScore} size="sm" />
                          <StatusBadge status={al.status} />
                          {(tab === "recommended" || tab === "pending") && (
                            <>
                              <Button size="sm" className="gap-1"><CheckIcon className="size-3" />Approve</Button>
                              <Button size="sm" variant="destructive" className="gap-1"><XIcon className="size-3" />Reject</Button>
                            </>
                          )}
                          <LinkButton href={`/admin/allocations/${al.id}`} variant="ghost" size="sm">View</LinkButton>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
