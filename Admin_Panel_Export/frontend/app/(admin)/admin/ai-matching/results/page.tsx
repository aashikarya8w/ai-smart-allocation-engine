"use client";

import { PageHeader } from "@/components/common/PageHeader";
import { ScoreBar, ScoreCircle } from "@/components/common/ScoreBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckIcon } from "lucide-react";
import { mockRecommendations } from "@/data/recommendations";

const topMatches = [...mockRecommendations]
  .sort((a, b) => b.matchScore - a.matchScore)
  .slice(0, 10);

export default function AIMatchingResultsPage() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="AI Matching Results"
        description={`${topMatches.length} top matches from the latest run`}
      />

      <div className="space-y-4">
        {topMatches.map((rec, idx) => (
          <Card key={rec.id} className="hover:shadow-sm transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                {/* Rank */}
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">
                  #{idx + 1}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-foreground">Student ID: {rec.studentId}</p>
                      <p className="text-xs text-muted-foreground">{rec.internshipTitle} · {rec.companyName}</p>
                    </div>
                    <ScoreCircle score={rec.matchScore} size="sm" />
                  </div>

                  <div className="grid gap-1.5 sm:grid-cols-5">
                    <ScoreBar label="Skill"    score={rec.scoreBreakdown.skillMatch}    />
                    <ScoreBar label="Qual."    score={rec.scoreBreakdown.qualification} />
                    <ScoreBar label="Location" score={rec.scoreBreakdown.location}      />
                    <ScoreBar label="Interest" score={rec.scoreBreakdown.interest}      />
                    <ScoreBar label="Exp."     score={rec.scoreBreakdown.experience}    />
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {rec.matchReasons.slice(0, 3).map((r) => (
                      <span key={r} className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs text-green-700 dark:bg-green-900/20 dark:text-green-400">
                        <CheckIcon className="size-2.5" />{r}
                      </span>
                    ))}
                    <Badge variant="secondary" className="text-xs">{rec.workMode}</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
