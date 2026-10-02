"use client";

import { StarIcon, MessageSquareIcon, ThumbsUpIcon } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/common/EmptyState";
import { mockCompanyEvaluations, mockStudentFeedback } from "@/data/evaluations";
import { formatDateTime } from "@/lib/formatters";

function StarRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="text-muted-foreground">{label}</span>
      <div className="flex items-center gap-1">
        {[1,2,3,4,5].map((s) => (
          <StarIcon key={s} className={`size-3.5 fill-current ${s <= value ? "text-amber-400" : "text-muted-foreground/20"}`} />
        ))}
        <span className="ml-1 text-foreground font-medium">{value}/5</span>
      </div>
    </div>
  );
}

export default function AdminFeedbackPage() {
  const avgEval = mockCompanyEvaluations.length > 0
    ? Math.round(mockCompanyEvaluations.reduce((s, e) => s + e.overallPerformance, 0) / mockCompanyEvaluations.length * 20)
    : 0;
  const avgFb = mockStudentFeedback.length > 0
    ? Math.round(mockStudentFeedback.reduce((s, f) => s + f.overallExperience, 0) / mockStudentFeedback.length * 20)
    : 0;
  const recommended = mockCompanyEvaluations.filter((e) => e.wouldRecommend).length
    + mockStudentFeedback.filter((f) => f.wouldRecommend).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Feedback & Evaluations"
        description="Company evaluations and student internship feedback consolidated view."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard title="Company Evaluations" value={mockCompanyEvaluations.length} icon={StarIcon}          trend="up" />
        <StatCard title="Student Feedback"    value={mockStudentFeedback.length}    icon={MessageSquareIcon} trend="up" />
        <StatCard title="Recommended"         value={recommended}                    icon={ThumbsUpIcon}      trend="up" />
      </div>

      <Tabs defaultValue="evaluations">
        <TabsList>
          <TabsTrigger value="evaluations">Company Evaluations ({mockCompanyEvaluations.length})</TabsTrigger>
          <TabsTrigger value="feedback">Student Feedback ({mockStudentFeedback.length})</TabsTrigger>
        </TabsList>

        {/* Company Evaluations */}
        <TabsContent value="evaluations" className="space-y-4 pt-4">
          {mockCompanyEvaluations.length === 0 ? (
            <EmptyState icon={StarIcon} title="No evaluations yet" />
          ) : (
            mockCompanyEvaluations.map((ev) => (
              <Card key={ev.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <CardTitle className="text-sm">{ev.studentName}</CardTitle>
                      <p className="text-xs text-muted-foreground">{ev.internshipTitle} · {ev.companyName}</p>
                    </div>
                    <Badge variant={ev.wouldRecommend ? "default" : "secondary"} className="text-xs shrink-0">
                      {ev.wouldRecommend ? "Recommended" : "Not Recommended"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <StarRow label="Technical Performance" value={ev.technicalPerformance} />
                  <StarRow label="Project Performance"   value={ev.projectPerformance}   />
                  <StarRow label="Communication"         value={ev.communication}         />
                  <StarRow label="Discipline"            value={ev.discipline}            />
                  <StarRow label="Overall Performance"   value={ev.overallPerformance}    />
                  {ev.comments && (
                    <div className="mt-2 rounded-lg bg-muted/50 p-3">
                      <p className="text-xs text-muted-foreground italic">"{ev.comments}"</p>
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground">Submitted {formatDateTime(ev.submittedAt)}</p>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Student Feedback */}
        <TabsContent value="feedback" className="space-y-4 pt-4">
          {mockStudentFeedback.length === 0 ? (
            <EmptyState icon={MessageSquareIcon} title="No feedback yet" />
          ) : (
            mockStudentFeedback.map((fb) => (
              <Card key={fb.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <CardTitle className="text-sm">{fb.internshipTitle}</CardTitle>
                      <p className="text-xs text-muted-foreground">{fb.companyName}</p>
                    </div>
                    <Badge variant={fb.wouldRecommend ? "default" : "secondary"} className="text-xs shrink-0">
                      {fb.wouldRecommend ? "Would Recommend" : "Would Not Recommend"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <StarRow label="Learning Experience" value={fb.learningExperience} />
                  <StarRow label="Mentorship"          value={fb.mentorship}          />
                  <StarRow label="Work Environment"    value={fb.workEnvironment}     />
                  <StarRow label="Overall Experience"  value={fb.overallExperience}   />
                  {fb.suggestions && (
                    <div className="mt-2 rounded-lg bg-muted/50 p-3">
                      <p className="text-xs text-muted-foreground italic">"{fb.suggestions}"</p>
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground">Submitted {formatDateTime(fb.submittedAt)}</p>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
