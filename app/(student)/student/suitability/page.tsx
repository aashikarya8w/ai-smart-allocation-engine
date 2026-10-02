"use client";

import { TargetIcon, TrendingUpIcon, CheckCircleIcon, AlertCircleIcon } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { ScoreBar, ScoreCircle } from "@/components/common/ScoreBar";
import { StatCard } from "@/components/common/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/common/EmptyState";
import { mockSuitabilityResults } from "@/data/suitability";
import { useStudent } from "@/hooks/useStudent";

const BREAKDOWN_LABELS: Record<string, string> = {
  skillMatch:       "Skill Match",
  assessmentScore:  "Assessment Score",
  qualification:    "Qualification",
  cgpa:             "CGPA",
  projects:         "Projects",
  experience:       "Experience",
  interests:        "Interests",
  preferences:      "Preferences",
  location:         "Location",
  workMode:         "Work Mode",
};

export default function SuitabilityPage() {
  const { student } = useStudent();
  const results = mockSuitabilityResults.filter((r) => r.studentId === student?.id);
  const topResult = results.length > 0 ? [...results].sort((a, b) => b.overallScore - a.overallScore)[0] : null;

  const avg =
    results.length > 0
      ? Math.round(results.reduce((s, r) => s + r.overallScore, 0) / results.length)
      : 0;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Job Suitability"
        description="A comprehensive score that reflects your overall suitability for each internship."
      />

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard title="Internships Analyzed" value={results.length}          icon={TargetIcon}      />
        <StatCard title="Best Suitability"      value={`${topResult?.overallScore ?? 0}%`} icon={TrendingUpIcon} trend="up" />
        <StatCard title="Average Suitability"   value={`${avg}%`}              icon={CheckCircleIcon} trend="up" />
      </div>

      {results.length === 0 ? (
        <EmptyState icon={TargetIcon} title="No suitability data" description="Complete your profile and apply to internships." />
      ) : (
        <Tabs defaultValue={results[0]?.id}>
          <TabsList className="flex-wrap h-auto gap-1.5 bg-transparent p-0 mb-4">
            {results.map((r) => (
              <TabsTrigger
                key={r.id}
                value={r.id}
                className="rounded-lg border border-border data-[state=active]:border-primary data-[state=active]:bg-primary/5"
              >
                {r.internshipTitle}
              </TabsTrigger>
            ))}
          </TabsList>

          {results.map((result) => (
            <TabsContent key={result.id} value={result.id}>
              <div className="grid gap-5 lg:grid-cols-3">
                {/* Score circle */}
                <Card className="flex flex-col items-center justify-center p-6">
                  <ScoreCircle score={result.overallScore} size="xl" />
                  <p className="mt-3 text-base font-semibold text-foreground">{result.internshipTitle}</p>
                  <p className="text-sm text-muted-foreground">{result.companyName}</p>
                  <Badge
                    variant={result.overallScore >= 80 ? "default" : result.overallScore >= 60 ? "secondary" : "destructive"}
                    className="mt-2"
                  >
                    {result.overallScore >= 80 ? "Highly Suitable" : result.overallScore >= 60 ? "Moderately Suitable" : "Low Suitability"}
                  </Badge>
                </Card>

                {/* Breakdown */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-sm">Factor Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {Object.entries(result.breakdown).map(([key, val]) => (
                      <ScoreBar
                        key={key}
                        label={BREAKDOWN_LABELS[key] ?? key}
                        score={val}
                      />
                    ))}
                  </CardContent>
                </Card>

                {/* Strengths */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-sm text-green-600">
                      <CheckCircleIcon className="size-4" />Strengths
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.strengths.map((s) => (
                        <li key={s} className="flex items-start gap-2 text-sm text-foreground">
                          <span className="mt-1 size-1.5 shrink-0 rounded-full bg-green-500" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Improvements */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-sm text-amber-600">
                      <AlertCircleIcon className="size-4" />Areas to Improve
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.improvements.map((imp) => (
                        <li key={imp} className="flex items-start gap-2 text-sm text-foreground">
                          <span className="mt-1 size-1.5 shrink-0 rounded-full bg-amber-500" />
                          {imp}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}

      {/* What is Suitability Score */}
      <Card className="border-dashed">
        <CardContent className="p-5">
          <p className="text-sm font-semibold text-foreground mb-2">About the Job Suitability Score</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            The Job Suitability Score is different from the Match Score. While the Match Score measures compatibility,
            the Suitability Score is a comprehensive measure of how well-prepared you are for a specific internship.
            It factors in your skills, assessment performance, qualification, CGPA, projects, experience, interests,
            preferences, location, and work mode preferences.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {Object.values(BREAKDOWN_LABELS).map((l) => (
              <Badge key={l} variant="outline" className="text-xs">{l}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
