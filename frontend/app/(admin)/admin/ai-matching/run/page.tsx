"use client";

import { useState } from "react";
import {
  PlayIcon, CheckCircle2Icon, Loader2Icon, SparklesIcon,
  CpuIcon, ArrowRightIcon, ShieldCheckIcon, CheckIcon,
  RotateCcwIcon, LayersIcon,
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LinkButton } from "@/components/ui/button";
import { runAIMatching } from "@/services/adminService";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";

const STEPS = [
  "National Eligibility & Pre-requisite Filtering",
  "Semantic Skill Graph & Ontology Vector Matching",
  "Academic Qualification & CGPA Threshold Normalization",
  "Geographical Proximity & Commute Radius Scoring",
  "Student Career Aspiration & Sector Preference Alignment",
  "Gale-Shapley Stable Marriage Match Matrix Generation",
];

export default function RunAIMatchingPage() {
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
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
    <div className="space-y-8 pb-12 max-w-3xl">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-br from-[#0c1222] via-[#0f172a] to-[#1e1338] p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        <div className="absolute -top-32 -right-24 h-96 w-96 rounded-full bg-gradient-to-br from-primary/20 via-purple-500/15 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-gradient-to-tr from-cyan-500/15 via-blue-500/10 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
            <CpuIcon className="h-3.5 w-3.5" />
            Gale-Shapley Algorithmic Orchestration
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Execute <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">AI Matching Batch</span>
          </h1>
          <p className="text-sm text-slate-300/90 leading-relaxed font-normal">
            Launch multi-objective vector matching across all verified applicants and open corporate internship capacities for the Prime Minister's Scheme.
          </p>
        </div>
      </div>

      {/* Execution Terminal Card */}
      <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-6 shadow-xl backdrop-blur-md space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-border/50 dark:border-white/5">
          <div>
            <h3 className="text-base font-bold text-foreground">Algorithmic Pipeline Sequence</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Automated 6-stage mathematical vector convergence</p>
          </div>
          <span className="text-xs font-mono text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-lg">
            v4.2-STABLE
          </span>
        </div>

        {/* Pipeline Steps */}
        <div className="space-y-3.5">
          {STEPS.map((step, i) => {
            const completed = completedSteps.includes(step);
            const active = currentStep === step && running;
            return (
              <div
                key={step}
                className={cn(
                  "flex items-center gap-3.5 p-3 rounded-xl border transition-all",
                  completed
                    ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-400"
                    : active
                    ? "border-primary/40 bg-primary/10 text-primary ring-1 ring-primary/30"
                    : "border-border/40 dark:border-white/5 bg-muted/20 dark:bg-white/[0.01] text-muted-foreground"
                )}
              >
                <div
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-xl text-xs font-black transition-colors",
                    completed
                      ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/25"
                      : active
                      ? "bg-primary text-white shadow-md shadow-primary/25"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {completed ? <CheckIcon className="size-4" /> : `0${i + 1}`}
                </div>
                <span className="text-sm font-semibold flex-1 text-foreground">{step}</span>
                {active && <Loader2Icon className="size-4 animate-spin text-primary shrink-0" />}
                {completed && <CheckCircle2Icon className="size-4 text-emerald-400 shrink-0" />}
              </div>
            );
          })}
        </div>

        {/* Progress bar */}
        {(running || done) && (
          <div className="space-y-2 pt-2 border-t border-border/50 dark:border-white/5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground font-medium">{done ? "All Stages Completed" : currentStep}</span>
              <span className="font-black text-primary text-sm">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2.5 bg-white/5" />
          </div>
        )}

        {/* Done Notification Card */}
        {done && (
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-5 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <CheckCircle2Icon className="h-5 w-5" />
              AI Matching Engine Completed Successfully!
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              All nationwide applicant vectors have been aligned with optimal corporate seat configurations. The system is ready to compile allocation results.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href={ROUTES.admin.aiMatchingResults}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold shadow-md active:scale-95"
              >
                Inspect Top Recommendations <ArrowRightIcon className="h-3.5 w-3.5" />
              </Link>
              <Link
                href={ROUTES.admin.allocations}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5 text-white text-xs font-semibold active:scale-95"
              >
                Proceed to Allocation Manifest
              </Link>
            </div>
          </div>
        )}

        {/* Run Trigger Button */}
        {!running && (
          <div className="pt-2">
            <Button
              onClick={handleRun}
              className="w-full bg-gradient-to-r from-primary via-indigo-600 to-purple-600 hover:from-primary/90 hover:to-purple-700 text-white font-bold py-6 text-sm shadow-xl shadow-primary/25 active:scale-95 transition-all gap-2"
            >
              {done ? <RotateCcwIcon className="size-4" /> : <PlayIcon className="size-4 fill-white" />}
              {done ? "Re-Run Matching Calculation" : "Initiate Full AI Matching Batch"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
