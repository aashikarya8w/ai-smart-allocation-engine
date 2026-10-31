"use client";

import { useState } from "react";
import {
  ZapIcon,
  TrendingUpIcon,
  ArrowRightIcon,
  RefreshCwIcon,
  PlusIcon,
  XIcon,
  SparklesIcon,
  SlidersHorizontalIcon,
  LightbulbIcon,
  BriefcaseIcon,
  ShieldAlertIcon,
  CheckCircle2Icon
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { ScoreCircle } from "@/components/common/ScoreBar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useStudent } from "@/hooks/useStudent";
import { mockSuitabilityResults } from "@/data/suitability";
import { mockReadinessProfiles } from "@/data/readiness";

const SKILL_SUGGESTIONS = [
  "Docker", "Spring Boot", "Kubernetes", "GraphQL", "Redis",
  "AWS", "TypeScript", "FastAPI", "React Native", "TensorFlow",
  "PostgreSQL", "Kafka", "Next.js", "Rust", "Go",
];

const WORK_MODES = ["Remote", "Hybrid", "On-site", "Any"];

export default function WhatIfPage() {
  const { student } = useStudent();
  const suitability = mockSuitabilityResults.find((r) => r.studentId === student?.id);
  const readiness = mockReadinessProfiles.find((r) => r.studentId === student?.id);

  // Simulation state
  const [addedSkills, setAddedSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [simAssessment, setSimAssessment] = useState<number>(78);
  const [simCgpa, setSimCgpa] = useState<number>(student?.cgpa ?? 8.5);
  const [simWorkMode, setSimWorkMode] = useState<string>(student?.workMode ?? "Hybrid");
  const [simProjects, setSimProjects] = useState<number>(0);
  const [simulated, setSimulated] = useState(false);

  // Base values
  const baseMatch = 72;
  const baseSuitability = suitability?.overallScore ?? 74;
  const baseReadiness = readiness?.currentReadiness ?? 72;
  const baseEligible = 8;
  const baseStrong = 3;

  // Calculate simulated values
  const calcSimulated = () => {
    let matchDelta = 0;
    let suitDelta = 0;
    let readDelta = 0;
    let eligDelta = 0;
    let strongDelta = 0;

    matchDelta += addedSkills.length * 3;
    suitDelta += addedSkills.length * 2.5;
    readDelta += addedSkills.length * 2;
    eligDelta += addedSkills.length * 1;
    strongDelta += Math.floor(addedSkills.length / 2);

    const assessmentBoost = Math.max(0, (simAssessment - 78) / 10);
    matchDelta += assessmentBoost * 2;
    suitDelta += assessmentBoost * 3;
    readDelta += assessmentBoost * 2.5;

    const cgpaBoost = Math.max(0, (simCgpa - (student?.cgpa ?? 8.5)) * 2);
    matchDelta += cgpaBoost;
    suitDelta += cgpaBoost * 1.5;

    matchDelta += simProjects * 2;
    suitDelta += simProjects * 2;
    readDelta += simProjects * 3;
    eligDelta += simProjects;
    strongDelta += simProjects;

    return {
      match: Math.min(99, Math.round(baseMatch + matchDelta)),
      suitability: Math.min(99, Math.round(baseSuitability + suitDelta)),
      readiness: Math.min(99, Math.round(baseReadiness + readDelta)),
      eligible: Math.min(30, baseEligible + eligDelta),
      strong: Math.min(20, baseStrong + strongDelta),
    };
  };

  const sim = calcSimulated();

  const addSkill = (skill: string) => {
    const s = skill.trim();
    if (s && !addedSkills.includes(s) && !student?.skills.includes(s)) {
      setAddedSkills((p) => [...p, s]);
    }
    setSkillInput("");
  };

  const removeSkill = (skill: string) => setAddedSkills((p) => p.filter((s) => s !== skill));

  const reset = () => {
    setAddedSkills([]);
    setSimAssessment(78);
    setSimCgpa(student?.cgpa ?? 8.5);
    setSimWorkMode(student?.workMode ?? "Hybrid");
    setSimProjects(0);
    setSimulated(false);
  };

  const hasChanges =
    addedSkills.length > 0 ||
    simAssessment !== 78 ||
    simCgpa !== (student?.cgpa ?? 8.5) ||
    simProjects > 0;

  return (
    <div className="space-y-6">
      <PageHeader
        title="What-If Career Simulator"
        description="Simulate profile improvements and quantify their direct impact on your interview match probabilities."
      />

      {/* Cyber Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent p-6 shadow-xl shadow-primary/5 backdrop-blur-md">
        <div className="absolute -right-10 -top-10 size-48 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-md">
              <SparklesIcon className="size-3.5 text-primary" />
              <span>Predictive Career Modelling Engine</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Simulate Skills, CGPA & Project Upgrades in Real Time
            </h2>
            <p className="max-w-2xl text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Test how mastering Docker or raising your assessment score immediately shifts you from a Moderate Fit to a Top-Tier Candidate across enterprise recruiters.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1.5 text-xs font-semibold text-amber-400">
              <ZapIcon className="size-3.5" />
              Sandbox Simulation Active
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left: Interactive Simulation Controls */}
        <div className="space-y-5">
          {/* Add Skills */}
          <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-5 space-y-3.5 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-foreground">Simulate Acquiring New Skills</h3>
              <span className="text-[11px] text-primary font-semibold">+{addedSkills.length * 3}% Boost</span>
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Type a skill (e.g. Docker, Kafka, AWS)"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkill(skillInput);
                  }
                }}
                className="flex-1 rounded-xl bg-background/50 border-border/70"
              />
              <Button
                size="sm"
                className="rounded-xl font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => addSkill(skillInput)}
              >
                <PlusIcon className="size-4" />
              </Button>
            </div>

            {/* Quick suggestions */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {SKILL_SUGGESTIONS.filter((s) => !student?.skills.includes(s) && !addedSkills.includes(s)).slice(0, 8).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => addSkill(s)}
                  className="rounded-xl border border-border/70 bg-muted/30 px-2.5 py-1 text-xs text-muted-foreground hover:border-primary/50 hover:bg-primary/10 hover:text-primary transition-all font-medium"
                >
                  + {s}
                </button>
              ))}
            </div>

            {addedSkills.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/50">
                {addedSkills.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-primary/30 bg-primary/15 px-3 py-1 text-xs font-semibold text-primary"
                  >
                    <span>{s}</span>
                    <button
                      type="button"
                      onClick={() => removeSkill(s)}
                      className="hover:text-foreground transition-colors"
                    >
                      <XIcon className="size-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Assessment Slider */}
          <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-5 space-y-3.5 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-foreground">Simulate Assessment Score</h3>
                <span className="text-xs text-muted-foreground">Baseline: 78%</span>
              </div>
              <span className="text-xl font-extrabold text-foreground">{simAssessment}%</span>
            </div>

            <Slider
              min={0}
              max={100}
              step={1}
              value={[simAssessment]}
              onValueChange={(v) => setSimAssessment(Array.isArray(v) ? (v as number[])[0] : (v as number))}
              className="py-2"
            />
            <div className="flex justify-between text-[11px] text-muted-foreground">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>

          {/* CGPA Slider */}
          <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-5 space-y-3.5 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-foreground">Simulate Academic CGPA</h3>
                <span className="text-xs text-muted-foreground">Current: {student?.cgpa ?? 8.5}</span>
              </div>
              <span className="text-xl font-extrabold text-foreground">{simCgpa.toFixed(1)}</span>
            </div>

            <Slider
              min={5}
              max={10}
              step={0.1}
              value={[simCgpa]}
              onValueChange={(v) => setSimCgpa(Array.isArray(v) ? (v as number[])[0] : (v as number))}
              className="py-2"
            />
            <div className="flex justify-between text-[11px] text-muted-foreground">
              <span>5.0</span>
              <span>7.5</span>
              <span>10.0</span>
            </div>
          </div>

          {/* Additional Projects Slider */}
          <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-5 space-y-3.5 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-foreground">Add Verified Projects</h3>
                <span className="text-xs text-muted-foreground">Portfolio Depth</span>
              </div>
              <span className="text-xl font-extrabold text-emerald-400">+{simProjects}</span>
            </div>

            <Slider
              min={0}
              max={5}
              step={1}
              value={[simProjects]}
              onValueChange={(v) => setSimProjects(Array.isArray(v) ? (v as number[])[0] : (v as number))}
              className="py-2"
            />
            <div className="flex justify-between text-[11px] text-muted-foreground">
              <span>0 projects</span>
              <span>+3 projects</span>
              <span>+5 projects</span>
            </div>
          </div>

          {/* Action Triggers */}
          <div className="flex items-center gap-3 pt-2">
            <Button
              className="flex-1 gap-2 rounded-xl font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20"
              onClick={() => setSimulated(true)}
              disabled={!hasChanges}
            >
              <ZapIcon className="size-4" />
              <span>Compute Projected Impact</span>
            </Button>
            <Button
              variant="outline"
              className="gap-1.5 rounded-xl border-border/80 hover:bg-muted/50"
              onClick={reset}
            >
              <RefreshCwIcon className="size-4" />
              <span>Reset</span>
            </Button>
          </div>
        </div>

        {/* Right: Simulated Outcomes & Projected Metrics */}
        <div className="space-y-5">
          <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2">
                <TrendingUpIcon className="size-4 text-primary" />
                <h3 className="text-base font-bold text-foreground">
                  {simulated ? "Simulated Projection Results" : "Live Forecast Matrix"}
                </h3>
              </div>
              <span className="text-xs text-muted-foreground">
                {simulated ? "Active Projection" : "Real-time Delta"}
              </span>
            </div>

            <div className="space-y-4">
              <CompareRow label="Top Match Score" current={baseMatch} simulated={sim.match} active={simulated} />
              <CompareRow label="Job Suitability" current={baseSuitability} simulated={sim.suitability} active={simulated} />
              <CompareRow label="Readiness Index" current={baseReadiness} simulated={sim.readiness} active={simulated} />

              <div className="rounded-xl border border-border/60 bg-muted/20 p-4">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-muted-foreground font-medium">Eligible Corporate Positions</span>
                  <div className="flex items-center gap-2.5">
                    <span className="font-bold text-foreground">{baseEligible} Roles</span>
                    {simulated && (
                      <>
                        <ArrowRightIcon className="size-3 text-muted-foreground" />
                        <span className="font-extrabold text-emerald-400">{sim.eligible} Roles</span>
                        {sim.eligible > baseEligible && (
                          <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-bold text-emerald-400">
                            +{sim.eligible - baseEligible}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-border/60 bg-muted/20 p-4">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-muted-foreground font-medium">Strong High-Fit Roles (≥80%)</span>
                  <div className="flex items-center gap-2.5">
                    <span className="font-bold text-foreground">{baseStrong} Offers</span>
                    {simulated && (
                      <>
                        <ArrowRightIcon className="size-3 text-muted-foreground" />
                        <span className="font-extrabold text-emerald-400">{sim.strong} Offers</span>
                        {sim.strong > baseStrong && (
                          <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-bold text-emerald-400">
                            +{sim.strong - baseStrong}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Insights and Opportunity Multiplier */}
          {simulated && (
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md p-6 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2Icon className="size-4" />
                <span>Simulated High-Yield Breakthrough</span>
              </div>
              <ul className="space-y-2 text-xs text-emerald-300/90 leading-relaxed">
                {sim.match > baseMatch && (
                  <li className="flex items-start gap-2">
                    <span className="mt-1 size-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span>Your match score increases by <strong>+{sim.match - baseMatch}%</strong>, boosting automated shortlisting.</span>
                  </li>
                )}
                {sim.eligible > baseEligible && (
                  <li className="flex items-start gap-2">
                    <span className="mt-1 size-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span>You qualify for <strong>{sim.eligible - baseEligible} additional corporate listings</strong> across Bengaluru and Hyderabad.</span>
                  </li>
                )}
                {sim.strong > baseStrong && (
                  <li className="flex items-start gap-2">
                    <span className="mt-1 size-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span><strong>{sim.strong - baseStrong} new tier-1 placements</strong> cross the critical 80% affirmative threshold.</span>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CompareRow({
  label,
  current,
  simulated,
  active,
}: {
  label: string;
  current: number;
  simulated: number;
  active: boolean;
}) {
  const delta = simulated - current;
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-border/50 bg-muted/20 p-3.5">
      <span className="text-xs sm:text-sm font-medium text-foreground">{label}</span>
      <div className="flex items-center gap-3">
        <ScoreCircle score={current} size="sm" />
        {active && (
          <>
            <ArrowRightIcon className="size-3.5 text-muted-foreground" />
            <ScoreCircle score={simulated} size="sm" />
            {delta !== 0 && (
              <span
                className={`rounded-md px-2 py-0.5 text-xs font-bold ${
                  delta > 0
                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                    : "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                }`}
              >
                {delta > 0 ? "+" : ""}{delta}%
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
}
