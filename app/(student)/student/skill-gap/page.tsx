"use client";

import { TrendingUpIcon } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { ScoreBar } from "@/components/common/ScoreBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useStudent } from "@/hooks/useStudent";

const MOCK_GAPS = [
  {
    skillName: "React",
    currentLevel: 80,
    requiredLevel: 90,
    gap: 10,
    resources: [
      { title: "React Advanced Patterns", type: "Course", isFree: false },
      { title: "React Docs – New Features", type: "Article", isFree: true },
    ],
  },
  {
    skillName: "TypeScript",
    currentLevel: 65,
    requiredLevel: 85,
    gap: 20,
    resources: [
      { title: "TypeScript Deep Dive", type: "Book", isFree: true },
      { title: "Total TypeScript by Matt Pocock", type: "Course", isFree: false },
    ],
  },
  {
    skillName: "System Design",
    currentLevel: 30,
    requiredLevel: 70,
    gap: 40,
    resources: [
      { title: "System Design Primer – GitHub", type: "Article", isFree: true },
      { title: "Grokking System Design", type: "Course", isFree: false },
    ],
  },
  {
    skillName: "Docker",
    currentLevel: 20,
    requiredLevel: 60,
    gap: 40,
    resources: [
      { title: "Docker Official Get Started", type: "Article", isFree: true },
      { title: "Docker & Kubernetes Bootcamp", type: "Course", isFree: false },
    ],
  },
];

export default function SkillGapPage() {
  const { student } = useStudent();

  return (
    <div className="space-y-5">
      <PageHeader
        title="Skill Gap Analysis"
        description="Compare your skills against top internship requirements."
      />

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{student?.skills.length ?? 0}</p>
            <p className="text-xs text-muted-foreground mt-1">Skills in Profile</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-amber-600">{MOCK_GAPS.length}</p>
            <p className="text-xs text-muted-foreground mt-1">Skill Gaps Identified</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">
              {MOCK_GAPS.filter((g) => g.gap <= 15).length}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Near Proficiency</p>
          </CardContent>
        </Card>
      </div>

      {/* Gap cards */}
      <div className="space-y-4">
        {MOCK_GAPS.sort((a, b) => b.gap - a.gap).map((gap) => (
          <Card key={gap.skillName}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between gap-3">
                <CardTitle className="text-sm">{gap.skillName}</CardTitle>
                <Badge
                  variant={gap.gap >= 30 ? "destructive" : "secondary"}
                  className="text-xs"
                >
                  Gap: {gap.gap}%
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <ScoreBar label={`Your Level (${gap.currentLevel}%)`}  score={gap.currentLevel}  />
                <ScoreBar label={`Required Level (${gap.requiredLevel}%)`} score={gap.requiredLevel} />
              </div>

              <div>
                <p className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Learning Resources
                </p>
                <div className="space-y-1.5">
                  {gap.resources.map((r) => (
                    <div
                      key={r.title}
                      className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2"
                    >
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">{r.type}</Badge>
                        <span className="text-xs text-foreground">{r.title}</span>
                      </div>
                      <Badge
                        variant={r.isFree ? "secondary" : "outline"}
                        className="text-xs"
                      >
                        {r.isFree ? "Free" : "Paid"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
