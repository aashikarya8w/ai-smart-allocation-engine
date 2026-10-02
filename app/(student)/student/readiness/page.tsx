"use client";

import { FlaskConicalIcon, ArrowRightIcon, TrendingUpIcon, ZapIcon } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { ScoreBar, ScoreCircle } from "@/components/common/ScoreBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/common/EmptyState";
import { LinkButton } from "@/components/ui/button";
import { mockReadinessProfiles } from "@/data/readiness";
import { useStudent } from "@/hooks/useStudent";
import { ROUTES } from "@/lib/constants";

const EFFORT_COLOR: Record<string, string> = {
  Low: "text-green-600 bg-green-50 dark:bg-green-950/30",
  Medium: "text-amber-600 bg-amber-50 dark:bg-amber-950/30",
  High: "text-red-600 bg-red-50 dark:bg-red-950/30",
};

const CATEGORY_COLOR: Record<string, string> = {
  Skill: "bg-blue-500",
  Assessment: "bg-purple-500",
  Project: "bg-amber-500",
  Experience: "bg-green-500",
  Qualification: "bg-pink-500",
};

export default function ReadinessPage() {
  const { student } = useStudent();
  const profiles = mockReadinessProfiles.filter((r) => r.studentId === student?.id);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Internship Readiness Twin"
        description="A dynamic simulation of how ready you are for each internship and what actions will improve your readiness."
      />

      {profiles.length === 0 ? (
        <EmptyState icon={FlaskConicalIcon} title="No readiness data" description="Complete your profile to see your readiness." />
      ) : (
        <Tabs defaultValue={profiles[0]?.id}>
          <TabsList className="flex-wrap h-auto gap-1.5 bg-transparent p-0 mb-4">
            {profiles.map((p) => (
              <TabsTrigger
                key={p.id}
                value={p.id}
                className="rounded-lg border border-border data-[state=active]:border-primary data-[state=active]:bg-primary/5"
              >
                {p.internshipTitle}
              </TabsTrigger>
            ))}
          </TabsList>

          {profiles.map((profile) => (
            <TabsContent key={profile.id} value={profile.id} className="space-y-5">
              <div className="grid gap-5 lg:grid-cols-3">
                {/* Overall score */}
                <Card className="flex flex-col items-center justify-center p-6">
                  <ScoreCircle score={profile.currentReadiness} size="xl" />
                  <p className="mt-3 text-sm font-semibold text-foreground">Current Readiness</p>
                  <p className="text-xs text-muted-foreground">{profile.internshipTitle}</p>
                  <p className="text-xs text-muted-foreground">{profile.companyName}</p>
                  <Progress value={profile.currentReadiness} className="mt-3 h-2 w-full" />
                </Card>

                {/* Breakdown */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-sm">Readiness Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <ScoreBar label="Skill Readiness"          score={profile.breakdown.skillReadiness}          />
                    <ScoreBar label="Assessment Readiness"     score={profile.breakdown.assessmentReadiness}     />
                    <ScoreBar label="Project Readiness"        score={profile.breakdown.projectReadiness}        />
                    <ScoreBar label="Qualification Readiness"  score={profile.breakdown.qualificationReadiness}  />
                    <ScoreBar label="Experience Readiness"     score={profile.breakdown.experienceReadiness}     />
                  </CardContent>
                </Card>
              </div>

              {/* Action Plan — projected readiness chain */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <ZapIcon className="size-4 text-primary" />
                    Improvement Roadmap — What should I do next?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-xs text-muted-foreground">
                    Actions ranked by impact. Each step shows projected readiness improvement.
                  </p>

                  {/* Chain visualization */}
                  <div className="space-y-3">
                    {/* Starting point */}
                    <div className="flex items-center gap-3">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold text-foreground">
                        Now
                      </div>
                      <div className="flex-1 rounded-lg bg-muted/50 px-4 py-2">
                        <p className="text-sm font-medium text-foreground">
                          Current Readiness: {profile.currentReadiness}%
                        </p>
                      </div>
                    </div>

                    {profile.actions.map((action, idx) => (
                      <div key={action.id}>
                        {/* Arrow */}
                        <div className="flex items-center gap-3">
                          <div className="flex w-8 justify-center">
                            <div className="h-6 w-0.5 bg-border" />
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <ArrowRightIcon className="size-3" />
                            <TrendingUpIcon className="size-3 text-green-500" />
                            <span className="text-green-600 font-medium">+{action.improvementDelta}% improvement</span>
                          </div>
                        </div>
                        {/* Action */}
                        <div className="flex items-start gap-3">
                          <div className={`flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${CATEGORY_COLOR[action.category] ?? "bg-primary"}`}>
                            {idx + 1}
                          </div>
                          <div className="flex-1 rounded-lg border border-border p-3">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <p className="text-sm font-medium text-foreground">{action.action}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                  Projected readiness: <strong>{action.projectedImpact}%</strong>
                                </p>
                              </div>
                              <div className="flex shrink-0 flex-col items-end gap-1">
                                <Badge variant="outline" className="text-xs">{action.category}</Badge>
                                <span className={`rounded px-1.5 py-0.5 text-xs font-medium ${EFFORT_COLOR[action.effort]}`}>
                                  {action.effort} effort
                                </span>
                              </div>
                            </div>
                            <Progress value={action.projectedImpact} className="mt-2 h-1" />
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Final readiness */}
                    <div className="flex items-center gap-3">
                      <div className="flex w-8 justify-center">
                        <div className="h-6 w-0.5 bg-border" />
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white">
                        ★
                      </div>
                      <div className="flex-1 rounded-lg border border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20 px-4 py-2">
                        <p className="text-sm font-semibold text-green-700 dark:text-green-400">
                          Projected Readiness: {profile.actions[profile.actions.length - 1]?.projectedImpact ?? profile.currentReadiness}%
                        </p>
                        <p className="text-xs text-green-600 dark:text-green-500">After completing all actions</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* What-If CTA */}
              <Card className="border-dashed bg-primary/5">
                <CardContent className="flex items-center justify-between gap-4 p-5">
                  <div>
                    <p className="text-sm font-semibold text-foreground">Want to simulate improvements?</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Use the What-If Simulator to see how changing your skills, CGPA or assessment score affects your match and suitability.
                    </p>
                  </div>
                  <LinkButton href={ROUTES.student.whatIf} size="sm" className="shrink-0">
                    Open Simulator
                  </LinkButton>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
}
