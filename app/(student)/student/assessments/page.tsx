"use client";

import { useState } from "react";
import { ClipboardCheckIcon, PlayIcon, CheckCircleIcon, ClockIcon, XCircleIcon } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { EmptyState } from "@/components/common/EmptyState";
import { StatCard } from "@/components/common/StatCard";
import { mockAssessments, mockAssessmentResults } from "@/data/assessments";
import { formatDateTime } from "@/lib/formatters";
import AssessmentModal from "./AssessmentModal";

export default function AssessmentsPage() {
  const [activeAssessment, setActiveAssessment] = useState<string | null>(null);

  const completedIds = new Set(mockAssessmentResults.map((r) => r.assessmentId));
  const pending = mockAssessments.filter((a) => !completedIds.has(a.id));
  const completed = mockAssessmentResults;

  const avgScore =
    completed.length > 0
      ? Math.round(completed.reduce((s, r) => s + r.percentage, 0) / completed.length)
      : 0;

  if (activeAssessment) {
    const assessment = mockAssessments.find((a) => a.id === activeAssessment);
    if (assessment) {
      return (
        <AssessmentModal
          assessment={assessment}
          onFinish={() => setActiveAssessment(null)}
        />
      );
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Assessments"
        description="Take internship-specific assessments to strengthen your application."
      />

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard title="Pending"   value={pending.length}   icon={ClockIcon}        trend="neutral" />
        <StatCard title="Completed" value={completed.length} icon={CheckCircleIcon}  trend="up"      />
        <StatCard title="Avg Score" value={`${avgScore}%`}   icon={ClipboardCheckIcon} trend="up"   />
      </div>

      {/* Pending Assessments */}
      <div>
        <h2 className="mb-3 text-sm font-semibold text-foreground">Pending Assessments</h2>
        {pending.length === 0 ? (
          <EmptyState icon={ClipboardCheckIcon} title="No pending assessments" description="All assessments completed." />
        ) : (
          <div className="space-y-3">
            {pending.map((asmt) => (
              <Card key={asmt.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-medium text-foreground">{asmt.title}</p>
                      <p className="text-sm text-muted-foreground">{asmt.companyName} · {asmt.internshipTitle}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-xs">
                          <ClockIcon className="mr-1 size-3" />{asmt.duration} mins
                        </Badge>
                        <Badge variant="outline" className="text-xs">{asmt.totalQuestions} questions</Badge>
                        <Badge variant="secondary" className="text-xs">Pass: {asmt.passingScore}%</Badge>
                        {asmt.isRequired && <Badge className="text-xs">Required</Badge>}
                      </div>
                    </div>
                    <Button size="sm" onClick={() => setActiveAssessment(asmt.id)} className="shrink-0">
                      <PlayIcon className="mr-1.5 size-4" />Start Assessment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Completed Assessments */}
      <div>
        <h2 className="mb-3 text-sm font-semibold text-foreground">Completed Assessments</h2>
        {completed.length === 0 ? (
          <EmptyState icon={CheckCircleIcon} title="No completed assessments yet" />
        ) : (
          <div className="space-y-3">
            {completed.map((result) => (
              <Card key={result.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                      <p className="font-medium text-foreground">{result.assessmentTitle}</p>
                      <p className="text-sm text-muted-foreground">{result.companyName} · {result.internshipTitle}</p>
                      <p className="text-xs text-muted-foreground">Completed {formatDateTime(result.completedAt)}</p>
                      <div className="flex flex-wrap gap-2 pt-1">
                        <Badge variant="outline" className="text-xs">{result.attempted}/{result.totalQuestions} attempted</Badge>
                        <Badge variant="outline" className="text-xs">{result.correct} correct</Badge>
                        <Badge
                          variant={result.passed ? "default" : "destructive"}
                          className="text-xs"
                        >
                          {result.passed ? "Passed" : "Failed"}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <p className="text-2xl font-bold text-foreground">{result.percentage}%</p>
                      <Progress value={result.percentage} className="h-1.5 w-24" />
                      {result.passed ? (
                        <CheckCircleIcon className="size-5 text-green-500" />
                      ) : (
                        <XCircleIcon className="size-5 text-destructive" />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
