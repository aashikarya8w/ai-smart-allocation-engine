"use client";

import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LinkButton } from "@/components/ui/button";
import { CheckIcon, Loader2Icon, PlayIcon } from "lucide-react";
import { runAIMatching } from "@/services/adminService";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const STEPS = [
  "Eligibility Check",
  "Skill Matching",
  "Qualification Matching",
  "Location Matching",
  "Preference Matching",
  "Match Score Generation",
];

export default function RunAIMatchingPage() {
  const [running, setRunning]   = useState(false);
  const [done, setDone]         = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");

  async function handleRun() {
    setRunning(true);
    setDone(false);
    setProgress(0);
    await runAIMatching((step, pct) => {
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
    <div className="space-y-6 max-w-2xl">
      <PageHeader title="Run AI Matching" description="Match all eligible students to available internships." />

      <Card>
        <CardHeader><CardTitle className="text-sm">Matching Progress</CardTitle></CardHeader>
        <CardContent className="space-y-5">
          {/* Steps */}
          <div className="space-y-3">
            {STEPS.map((step, i) => {
              const completed = completedSteps.includes(step);
              const active    = currentStep === step && running;
              return (
                <div key={step} className="flex items-center gap-3">
                  <div className={cn(
                    "flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                    completed ? "bg-green-500 text-white" :
                    active    ? "bg-primary text-primary-foreground" :
                                "bg-muted text-muted-foreground"
                  )}>
                    {completed ? <CheckIcon className="size-3.5" /> : i + 1}
                  </div>
                  <span className={cn(
                    "text-sm transition-colors",
                    completed ? "text-green-600 dark:text-green-400 font-medium" :
                    active    ? "text-primary font-medium" :
                                "text-muted-foreground"
                  )}>
                    {step}
                  </span>
                  {active && <Loader2Icon className="size-3.5 animate-spin text-primary" />}
                </div>
              );
            })}
          </div>

          {/* Progress bar */}
          {(running || done) && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{done ? "Completed" : currentStep}</span>
                <span className="font-medium text-foreground">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          {/* Done message */}
          {done && (
            <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800/30 dark:bg-green-900/10">
              <p className="text-sm font-semibold text-green-700 dark:text-green-400">
                ✅ AI Matching completed successfully!
              </p>
              <p className="mt-1 text-xs text-green-600 dark:text-green-500">
                All eligible students have been matched. Review results to proceed to allocation.
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <Button onClick={handleRun} disabled={running} className="gap-2">
              {running ? <Loader2Icon className="size-4 animate-spin" /> : <PlayIcon className="size-4" />}
              {running ? "Running…" : done ? "Run Again" : "Start AI Matching"}
            </Button>
            {done && (
              <LinkButton href={ROUTES.admin.aiMatchingResults} variant="outline" size="sm">
                View Results
              </LinkButton>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
