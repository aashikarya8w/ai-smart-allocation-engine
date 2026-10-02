"use client";

import { useState } from "react";
import { ZapIcon, TrendingUpIcon, ArrowRightIcon, RefreshCwIcon, PlusIcon, XIcon } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { ScoreCircle } from "@/components/common/ScoreBar";
import { StatCard } from "@/components/common/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
        title="What-If Simulator"
        description="Temporarily simulate profile changes and see how they impact your match score, suitability and opportunities — without modifying your actual profile."
      />

      {/* Warning banner */}
      <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30 p-4">
        <ZapIcon className="mt-0.5 size-4 shrink-0 text-amber-600" />
        <p className="text-xs text-amber-700 dark:text-amber-400">
          This is a <strong>simulation only</strong>. Changes made here do NOT affect your actual profile.
          Use the results to understand what improvements will have the most impact on your opportunities.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left: Controls */}
        <div className="space-y-5">
          {/* Add Skills */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Add Skills (Simulation)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <Input
                  placeholder="Type a skill (e.g. Docker)"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSkill(skillInput); }}}
                  className="flex-1"
                />
                <Button size="sm" variant="outline" onClick={() => addSkill(skillInput)}>
                  <PlusIcon className="size-4" />
                </Button>
              </div>
              {/* Suggestions */}
              <div className="flex flex-wrap gap-1.5">
                {SKILL_SUGGESTIONS.filter((s) => !student?.skills.includes(s) && !addedSkills.includes(s)).slice(0, 8).map((s) => (
                  <button
                    key={s}
                    onClick={() => addSkill(s)}
                    className="rounded-full border border-dashed border-border px-2.5 py-0.5 text-xs text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                  >
                    + {s}
                  </button>
                ))}
              </div>
              {addedSkills.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {addedSkills.map((s) => (
                    <Badge key={s} variant="default" className="gap-1 pl-2">
                      {s}
                      <button onClick={() => removeSkill(s)} className="ml-1">
                        <XIcon className="size-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Assessment Score */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Simulated Assessment Score</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-xs text-muted-foreground">Current: 78%</Label>
                <span className="text-lg font-bold text-foreground">{simAssessment}%</span>
              </div>
              <Slider
                min={0}
                max={100}
                step={1}
                value={[simAssessment]}
                onValueChange={(v) => setSimAssessment(Array.isArray(v) ? (v as number[])[0] : v as number)}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0%</span><span>50%</span><span>100%</span>
              </div>
            </CardContent>
          </Card>

          {/* CGPA */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Simulated CGPA</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-xs text-muted-foreground">Current: {student?.cgpa ?? 8.5}</Label>
                <span className="text-lg font-bold text-foreground">{simCgpa.toFixed(1)}</span>
              </div>
              <Slider
                min={5}
                max={10}
                step={0.1}
                value={[simCgpa]}
                onValueChange={(v) => setSimCgpa(Array.isArray(v) ? (v as number[])[0] : v as number)}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>5.0</span><span>7.5</span><span>10.0</span>
              </div>
            </CardContent>
          </Card>

          {/* Work Mode */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Simulated Work Mode</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={simWorkMode} onValueChange={(v) => v && setSimWorkMode(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {WORK_MODES.map((m) => (
                    <SelectItem key={m} value={m}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="mt-2 text-xs text-muted-foreground">Current: {student?.workMode}</p>
            </CardContent>
          </Card>

          {/* Projects */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Add Projects (Simulated)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-xs text-muted-foreground">Additional projects</Label>
                <span className="text-lg font-bold text-foreground">+{simProjects}</span>
              </div>
              <Slider
                min={0}
                max={5}
                step={1}
                value={[simProjects]}
                onValueChange={(v) => setSimProjects(Array.isArray(v) ? (v as number[])[0] : v as number)}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0</span><span>+5 projects</span>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button
              className="flex-1"
              onClick={() => setSimulated(true)}
              disabled={!hasChanges}
            >
              <ZapIcon className="mr-2 size-4" />Run Simulation
            </Button>
            <Button variant="outline" onClick={reset}>
              <RefreshCwIcon className="mr-2 size-4" />Reset
            </Button>
          </div>
        </div>

        {/* Right: Results */}
        <div className="space-y-5">
          {/* Comparison */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <TrendingUpIcon className="size-4 text-primary" />
                {simulated ? "Simulation Results" : "Preview (update sliders to simulate)"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Match Score */}
              <CompareRow
                label="Match Score"
                current={baseMatch}
                simulated={sim.match}
                active={simulated}
              />
              {/* Suitability */}
              <CompareRow
                label="Job Suitability"
                current={baseSuitability}
                simulated={sim.suitability}
                active={simulated}
              />
              {/* Readiness */}
              <CompareRow
                label="Readiness"
                current={baseReadiness}
                simulated={sim.readiness}
                active={simulated}
              />
              {/* Eligible */}
              <div className="rounded-lg bg-muted/50 p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Eligible Internships</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{baseEligible}</span>
                    {simulated && (
                      <>
                        <ArrowRightIcon className="size-3 text-muted-foreground" />
                        <span className="font-bold text-green-600">{sim.eligible}</span>
                        {sim.eligible > baseEligible && (
                          <Badge variant="default" className="text-xs">+{sim.eligible - baseEligible}</Badge>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
              {/* Strong Matches */}
              <div className="rounded-lg bg-muted/50 p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Strong Matches (≥80%)</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{baseStrong}</span>
                    {simulated && (
                      <>
                        <ArrowRightIcon className="size-3 text-muted-foreground" />
                        <span className="font-bold text-green-600">{sim.strong}</span>
                        {sim.strong > baseStrong && (
                          <Badge variant="default" className="text-xs">+{sim.strong - baseStrong}</Badge>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary of changes */}
          {hasChanges && (
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-sm">Simulated Changes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {addedSkills.length > 0 && (
                  <div className="text-xs text-foreground">
                    <span className="text-muted-foreground">Added skills: </span>
                    {addedSkills.map((s) => (
                      <Badge key={s} variant="outline" className="mr-1 text-xs">{s}</Badge>
                    ))}
                  </div>
                )}
                {simAssessment !== 78 && (
                  <p className="text-xs text-foreground">
                    <span className="text-muted-foreground">Assessment: </span>
                    78% → <strong>{simAssessment}%</strong>
                    {simAssessment > 78 ? <span className="ml-1 text-green-600">▲</span> : <span className="ml-1 text-red-500">▼</span>}
                  </p>
                )}
                {simCgpa !== (student?.cgpa ?? 8.5) && (
                  <p className="text-xs text-foreground">
                    <span className="text-muted-foreground">CGPA: </span>
                    {student?.cgpa} → <strong>{simCgpa.toFixed(1)}</strong>
                  </p>
                )}
                {simProjects > 0 && (
                  <p className="text-xs text-foreground">
                    <span className="text-muted-foreground">Additional projects: </span>
                    <strong>+{simProjects}</strong>
                  </p>
                )}
              </CardContent>
            </Card>
          )}

          {/* Tips */}
          {simulated && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-green-600">Opportunity Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-foreground">
                  {sim.match > baseMatch && (
                    <li className="flex items-start gap-2">
                      <span className="mt-1 size-1.5 shrink-0 rounded-full bg-green-500" />
                      Match score improves by <strong>+{sim.match - baseMatch}%</strong> — more internships will recommend you.
                    </li>
                  )}
                  {sim.eligible > baseEligible && (
                    <li className="flex items-start gap-2">
                      <span className="mt-1 size-1.5 shrink-0 rounded-full bg-green-500" />
                      You become eligible for <strong>{sim.eligible - baseEligible} more internships</strong>.
                    </li>
                  )}
                  {sim.strong > baseStrong && (
                    <li className="flex items-start gap-2">
                      <span className="mt-1 size-1.5 shrink-0 rounded-full bg-green-500" />
                      <strong>{sim.strong - baseStrong} new strong matches</strong> above 80% match score.
                    </li>
                  )}
                  <li className="flex items-start gap-2 text-muted-foreground">
                    <span className="mt-1 size-1.5 shrink-0 rounded-full bg-border" />
                    These are simulated projections. Actual results may vary.
                  </li>
                </ul>
              </CardContent>
            </Card>
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
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="flex items-center gap-3">
        <ScoreCircle score={current} size="sm" />
        {active && (
          <>
            <ArrowRightIcon className="size-4 text-muted-foreground" />
            <ScoreCircle score={simulated} size="sm" />
            {delta !== 0 && (
              <Badge variant={delta > 0 ? "default" : "destructive"} className="text-xs">
                {delta > 0 ? "+" : ""}{delta}%
              </Badge>
            )}
          </>
        )}
      </div>
    </div>
  );
}
