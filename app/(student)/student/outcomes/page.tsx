"use client";

import { BarChart3Icon, TrendingUpIcon, StarIcon, AwardIcon, BookOpenIcon } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import { ScoreCircle } from "@/components/common/ScoreBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { EmptyState } from "@/components/common/EmptyState";
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";
import { mockInternshipOutcomes, mockCompanyEvaluations, mockStudentFeedback } from "@/data/evaluations";
import { useStudent } from "@/hooks/useStudent";
import { formatDate } from "@/lib/formatters";

export default function OutcomesPage() {
  const { student } = useStudent();
  const outcomes   = mockInternshipOutcomes.filter((o) => o.studentId === student?.id);
  const evals      = mockCompanyEvaluations.filter((e) => e.studentId === student?.id);
  const feedbacks  = mockStudentFeedback.filter((f) => f.studentId === student?.id);

  if (outcomes.length === 0) {
    return (
      <div className="space-y-5">
        <PageHeader title="Performance Insights" description="Your internship outcome and performance analytics." />
        <EmptyState icon={BarChart3Icon} title="No outcomes yet" description="Complete an internship to see your performance insights." />
      </div>
    );
  }

  const outcome = outcomes[0];
  const evaluation = evals[0];
  const feedback = feedbacks[0];

  const radarData = evaluation
    ? [
        { subject: "Technical",    score: evaluation.technicalPerformance * 20 },
        { subject: "Projects",     score: evaluation.projectPerformance * 20 },
        { subject: "Communication",score: evaluation.communication * 20 },
        { subject: "Discipline",   score: evaluation.discipline * 20 },
        { subject: "Overall",      score: evaluation.overallPerformance * 20 },
      ]
    : [];

  const growthData = outcome.skillsGained.map((skill, i) => ({
    skill,
    growth: Math.round(60 + i * 8 + Math.random() * 15),
  }));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Performance Insights"
        description="Your internship outcomes, company evaluation, and future recommendations."
      />

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Overall Performance" value={`${outcome.overallPerformance}%`} icon={AwardIcon}      trend="up" />
        <StatCard title="Learning Outcome"    value={`${outcome.learningOutcome}%`}    icon={BookOpenIcon}   trend="up" />
        <StatCard title="Satisfaction"        value={`${outcome.satisfaction}%`}       icon={StarIcon}       trend="up" />
        <StatCard title="Skill Growth"        value={`+${outcome.skillGrowthPercent}%`} icon={TrendingUpIcon} trend="up" />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Radar chart */}
        {radarData.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Performance Breakdown (Company Evaluation)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
                  <Radar name="Score" dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.25} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Skills gained */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Skills Gained</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {outcome.skillsGained.map((skill) => (
              <div key={skill} className="flex items-center gap-3">
                <Badge variant="secondary" className="w-28 justify-center shrink-0 text-xs">{skill}</Badge>
                <Progress value={75 + Math.round(Math.random() * 20)} className="flex-1 h-1.5" />
              </div>
            ))}
            <p className="pt-2 text-xs text-muted-foreground">
              Skill growth: <strong className="text-green-600">+{outcome.skillGrowthPercent}%</strong> compared to pre-internship profile
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Skill growth bar chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Skill Growth Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={growthData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="skill" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} domain={[0, 100]} />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: 8 }}
                formatter={(v) => [`${v}%`, "Proficiency"]}
              />
              <Bar dataKey="growth" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Strengths */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-green-600">Strengths</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {outcome.strengths.map((s) => (
                <li key={s} className="flex items-start gap-2 text-sm text-foreground">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-green-500" />{s}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Areas for improvement */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-amber-600">Areas for Improvement</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {outcome.areasForImprovement.map((a) => (
                <li key={a} className="flex items-start gap-2 text-sm text-foreground">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-amber-500" />{a}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Company eval summary */}
        {evaluation && (
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Company Evaluation Summary</CardTitle>
              <p className="text-xs text-muted-foreground">{evaluation.companyName}</p>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { label: "Technical Performance", val: evaluation.technicalPerformance },
                { label: "Project Performance",   val: evaluation.projectPerformance   },
                { label: "Communication",         val: evaluation.communication        },
                { label: "Discipline",            val: evaluation.discipline           },
                { label: "Overall",               val: evaluation.overallPerformance   },
              ].map((r) => (
                <div key={r.label} className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{r.label}</span>
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map((s) => (
                      <StarIcon key={s} className={`size-3.5 fill-current ${s <= r.val ? "text-amber-400" : "text-muted-foreground/20"}`} />
                    ))}
                  </div>
                </div>
              ))}
              {evaluation.comments && (
                <div className="mt-2 rounded-lg bg-muted/50 p-3">
                  <p className="text-xs text-muted-foreground italic">"{evaluation.comments}"</p>
                </div>
              )}
              <Badge variant={evaluation.wouldRecommend ? "default" : "secondary"} className="text-xs">
                {evaluation.wouldRecommend ? "Recommended by Company" : "Not Recommended"}
              </Badge>
            </CardContent>
          </Card>
        )}

        {/* Future recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-primary">Future Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {outcome.futureRecommendations.map((r) => (
                <li key={r} className="flex items-start gap-2 text-sm text-foreground">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />{r}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Outcome profile card */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="flex flex-col items-center gap-3 p-6 sm:flex-row sm:gap-6">
          <ScoreCircle score={outcome.overallPerformance} size="lg" />
          <div className="text-center sm:text-left">
            <p className="text-base font-semibold text-foreground">Internship Outcome Profile</p>
            <p className="text-sm text-muted-foreground">{outcome.internshipTitle} · {outcome.companyName}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {outcome.projectsCompleted} projects completed · Completed {formatDate(outcome.completedAt)}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              This profile is used to improve your future internship recommendations.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
