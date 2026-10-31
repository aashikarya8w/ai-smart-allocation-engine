"use client";

import {
  FlaskConicalIcon,
  ArrowRightIcon,
  TrendingUpIcon,
  ZapIcon,
  SparklesIcon,
  Building2Icon,
  CheckCircle2Icon,
  CompassIcon,
  LayersIcon,
  TargetIcon
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { ScoreBar, ScoreCircle } from "@/components/common/ScoreBar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/common/EmptyState";
import { LinkButton } from "@/components/ui/button";
import { mockReadinessProfiles } from "@/data/readiness";
import { useStudent } from "@/hooks/useStudent";
import { ROUTES } from "@/lib/constants";

const EFFORT_COLOR: Record<string, string> = {
  Low: "text-emerald-400 bg-emerald-500/15 border-emerald-500/30",
  Medium: "text-amber-400 bg-amber-500/15 border-amber-500/30",
  High: "text-rose-400 bg-rose-500/15 border-rose-500/30",
};

const CATEGORY_COLOR: Record<string, string> = {
  Skill: "bg-blue-500 text-white",
  Assessment: "bg-purple-500 text-white",
  Project: "bg-amber-500 text-white",
  Experience: "bg-emerald-500 text-white",
  Qualification: "bg-pink-500 text-white",
};

export default function ReadinessPage() {
  const { student } = useStudent();
  const rawProfiles = mockReadinessProfiles.filter((r) => r.studentId === student?.id);
  const profiles = rawProfiles.length > 0 ? rawProfiles : mockReadinessProfiles;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Internship Readiness Twin"
        description="Dynamic competency replica simulating your readiness and next best actions for every role."
      />

      {/* Cyber Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent p-6 shadow-xl shadow-primary/5 backdrop-blur-md">
        <div className="absolute -right-10 -top-10 size-48 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-md">
              <FlaskConicalIcon className="size-3.5 text-primary" />
              <span>Competency Digital Twin v3.6</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Dynamic Readiness Modeling & Precision Action Plans
            </h2>
            <p className="max-w-2xl text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Your digital twin compares your current profile vectors against the exact benchmark thresholds of corporate roles to identify high-leverage milestones.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-400">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              Real-Time Vector Sync
            </span>
          </div>
        </div>
      </div>

      {profiles.length === 0 ? (
        <EmptyState
          icon={FlaskConicalIcon}
          title="No readiness twin created yet"
          description="Complete your student profile to initialize your readiness simulations."
        />
      ) : (
        <Tabs defaultValue={profiles[0]?.id} className="space-y-5">
          <TabsList className="bg-muted/50 p-1 rounded-2xl border border-border/60 flex-wrap h-auto gap-1">
            {profiles.map((p) => (
              <TabsTrigger
                key={p.id}
                value={p.id}
                className="rounded-xl text-xs font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground shadow-none"
              >
                {p.internshipTitle}
              </TabsTrigger>
            ))}
          </TabsList>

          {profiles.map((profile) => (
            <TabsContent key={profile.id} value={profile.id} className="space-y-6">
              <div className="grid gap-5 lg:grid-cols-3">
                {/* Overall Score */}
                <div className="flex flex-col items-center justify-center rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-6 text-center shadow-xl">
                  <ScoreCircle score={profile.currentReadiness} size="xl" />
                  <h3 className="mt-4 text-base font-bold text-foreground">Current Readiness</h3>
                  <p className="text-xs font-medium text-primary mt-0.5">{profile.internshipTitle}</p>
                  <p className="text-xs text-muted-foreground">{profile.companyName}</p>
                  <div className="mt-4 w-full h-2 rounded-full bg-muted/40 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-emerald-400 transition-all duration-500"
                      style={{ width: `${profile.currentReadiness}%` }}
                    />
                  </div>
                </div>

                {/* 5-Vector Breakdown */}
                <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-6 shadow-xl lg:col-span-2 space-y-4">
                  <div className="flex items-center justify-between border-b border-border/60 pb-3">
                    <h3 className="text-sm font-bold text-foreground">5-Vector Competency Breakdown</h3>
                    <span className="text-xs text-muted-foreground font-mono">Normalized Metric</span>
                  </div>

                  <div className="space-y-3.5 pt-1">
                    <ScoreBar label="Technical Skill Readiness" score={profile.breakdown.skillReadiness} />
                    <ScoreBar label="Assessment Proctored Score" score={profile.breakdown.assessmentReadiness} />
                    <ScoreBar label="Capstone & Project Depth" score={profile.breakdown.projectReadiness} />
                    <ScoreBar label="Academic Qualification Match" score={profile.breakdown.qualificationReadiness} />
                    <ScoreBar label="Practical Workplace Experience" score={profile.breakdown.experienceReadiness} />
                  </div>
                </div>
              </div>

              {/* Action Plan Chain */}
              <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-6 shadow-xl space-y-5">
                <div className="flex items-center justify-between border-b border-border/60 pb-3">
                  <div className="flex items-center gap-2">
                    <ZapIcon className="size-4 text-primary" />
                    <h3 className="text-base font-bold text-foreground">
                      Sequential Improvement Pathway — What To Complete Next
                    </h3>
                  </div>
                  <span className="text-xs text-muted-foreground">Ranked by ROI</span>
                </div>

                <div className="space-y-4">
                  {/* Current State */}
                  <div className="flex items-center gap-4">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-muted border border-border text-xs font-bold text-foreground">
                      Now
                    </div>
                    <div className="flex-1 rounded-xl border border-border/70 bg-muted/20 px-4 py-2.5">
                      <span className="text-xs font-bold text-foreground">
                        Starting Readiness Baseline: {profile.currentReadiness}%
                      </span>
                    </div>
                  </div>

                  {/* Actions Chain */}
                  {profile.actions.map((action, idx) => (
                    <div key={action.id} className="space-y-3">
                      <div className="flex items-center gap-4 pl-3">
                        <div className="h-6 w-0.5 bg-border/60" />
                        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                          <TrendingUpIcon className="size-3.5" />
                          <span>+{action.improvementDelta}% readiness increase</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div
                          className={`flex size-9 shrink-0 items-center justify-center rounded-xl text-xs font-bold shadow-sm ${
                            CATEGORY_COLOR[action.category] ?? "bg-primary text-primary-foreground"
                          }`}
                        >
                          {idx + 1}
                        </div>

                        <div className="flex-1 rounded-xl border border-border/80 dark:border-white/10 bg-card/85 p-4 transition-all hover:border-primary/40">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                              <h4 className="text-sm font-bold text-foreground">{action.action}</h4>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                Projected Post-Completion Readiness: <strong className="text-foreground">{action.projectedImpact}%</strong>
                              </p>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <Badge variant="outline" className="text-[11px] font-semibold border-border">
                                {action.category}
                              </Badge>
                              <span
                                className={`rounded-lg border px-2 py-0.5 text-xs font-semibold ${
                                  EFFORT_COLOR[action.effort] || "text-foreground"
                                }`}
                              >
                                {action.effort} Effort
                              </span>
                            </div>
                          </div>

                          <div className="mt-3 h-1.5 w-full rounded-full bg-muted/40 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-primary to-emerald-400"
                              style={{ width: `${action.projectedImpact}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Target Goal Final Box */}
                  <div className="pt-2 flex items-center gap-4">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-white font-bold text-sm shadow-md shadow-emerald-500/20">
                      ★
                    </div>
                    <div className="flex-1 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3">
                      <p className="text-sm font-bold text-emerald-400">
                        Projected Placement Readiness: {profile.actions[profile.actions.length - 1]?.projectedImpact ?? profile.currentReadiness}%
                      </p>
                      <p className="text-xs text-emerald-300/80 mt-0.5">
                        Achieves top 5% candidate ranking with 94%+ automated corporate interview matching.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* What-If Simulator Direct Jump Card */}
              <div className="rounded-2xl border border-primary/30 bg-primary/10 backdrop-blur-md p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-foreground">Want to experiment with custom improvements?</h4>
                  <p className="text-xs text-muted-foreground max-w-xl">
                    Test how tweaking assessment scores, project counts, or new programming frameworks alters your suitability matrix.
                  </p>
                </div>
                <LinkButton
                  href={ROUTES.student.whatIf}
                  size="sm"
                  className="gap-2 rounded-xl font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20 shrink-0"
                >
                  <ZapIcon className="size-3.5" />
                  <span>Launch What-If Simulator</span>
                </LinkButton>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
}
