"use client";

import { TrendingUpIcon, AwardIcon, BookOpenIcon, StarIcon, UsersIcon } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, Radar, Legend,
} from "recharts";
import { mockInternshipOutcomes } from "@/data/evaluations";
import { formatDate } from "@/lib/formatters";

export default function AdminOutcomesPage() {
  const avgPerf  = Math.round(mockInternshipOutcomes.reduce((s, o) => s + o.overallPerformance, 0) / Math.max(mockInternshipOutcomes.length, 1));
  const avgLearn = Math.round(mockInternshipOutcomes.reduce((s, o) => s + o.learningOutcome, 0) / Math.max(mockInternshipOutcomes.length, 1));
  const avgSatisf = Math.round(mockInternshipOutcomes.reduce((s, o) => s + o.satisfaction, 0) / Math.max(mockInternshipOutcomes.length, 1));
  const totalSkills = [...new Set(mockInternshipOutcomes.flatMap((o) => o.skillsGained))].length;

  const radarData = mockInternshipOutcomes.map((o) => ({
    name: o.internshipTitle.split(" ")[0],
    Performance: o.overallPerformance,
    Learning:    o.learningOutcome,
    Satisfaction:o.satisfaction,
    SkillGrowth: o.skillGrowthPercent,
  }));

  const skillFreq: Record<string, number> = {};
  mockInternshipOutcomes.forEach((o) =>
    o.skillsGained.forEach((s) => { skillFreq[s] = (skillFreq[s] ?? 0) + 1; })
  );
  const topSkills = Object.entries(skillFreq)
    .sort(([,a],[,b]) => b - a)
    .slice(0, 8)
    .map(([skill, count]) => ({ skill, count }));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Internship Outcomes"
        description="Consolidated internship outcome profiles combining evaluation, feedback, and skill growth data."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Outcomes Recorded" value={mockInternshipOutcomes.length} icon={UsersIcon}      trend="up" />
        <StatCard title="Avg Performance"   value={`${avgPerf}%`}                 icon={AwardIcon}      trend="up" />
        <StatCard title="Avg Satisfaction"  value={`${avgSatisf}%`}               icon={StarIcon}       trend="up" />
        <StatCard title="Unique Skills"     value={totalSkills}                    icon={TrendingUpIcon} trend="up" />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Radar chart */}
        {radarData.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Outcome Metrics Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <Radar name="Performance"  dataKey="Performance"  stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} />
                  <Radar name="Learning"     dataKey="Learning"     stroke="#22c55e" fill="#22c55e" fillOpacity={0.2} />
                  <Radar name="Satisfaction" dataKey="Satisfaction" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Top skills gained */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Most Gained Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={topSkills} layout="vertical" margin={{ top: 0, right: 10, left: 60, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10 }} />
                <YAxis type="category" dataKey="skill" tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Bar dataKey="count" name="Count" fill="#6366f1" radius={[0,4,4,0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Outcome cards */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-foreground">Individual Outcome Profiles</h2>
        {mockInternshipOutcomes.map((outcome) => (
          <Card key={outcome.id}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <CardTitle className="text-sm">{outcome.internshipTitle}</CardTitle>
                  <p className="text-xs text-muted-foreground">{outcome.companyName} · Completed {formatDate(outcome.completedAt)}</p>
                </div>
                <Badge variant="default" className="text-xs shrink-0">
                  {outcome.projectsCompleted} projects
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid gap-2 sm:grid-cols-3">
                {[
                  { label: "Overall Performance", value: outcome.overallPerformance },
                  { label: "Learning Outcome",    value: outcome.learningOutcome    },
                  { label: "Satisfaction",        value: outcome.satisfaction       },
                ].map((m) => (
                  <div key={m.label} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">{m.label}</span>
                      <span className="font-medium text-foreground">{m.value}%</span>
                    </div>
                    <Progress value={m.value} className="h-1.5" />
                  </div>
                ))}
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-1.5">
                  Skills gained (+{outcome.skillGrowthPercent}% growth):
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {outcome.skillsGained.map((s) => (
                    <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-medium text-green-600 mb-1">Strengths</p>
                  <ul className="space-y-0.5">
                    {outcome.strengths.map((s) => (
                      <li key={s} className="text-xs text-foreground flex items-start gap-1.5">
                        <span className="mt-1 size-1 shrink-0 rounded-full bg-green-500" />{s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-amber-600 mb-1">Future Recommendations</p>
                  <ul className="space-y-0.5">
                    {outcome.futureRecommendations.slice(0, 2).map((r) => (
                      <li key={r} className="text-xs text-foreground flex items-start gap-1.5">
                        <span className="mt-1 size-1 shrink-0 rounded-full bg-amber-500" />{r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
