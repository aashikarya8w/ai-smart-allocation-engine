"use client";

import { MapPinIcon, IndianRupeeIcon, ClockIcon, SparklesIcon, CheckIcon } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { ScoreBar, ScoreCircle } from "@/components/common/ScoreBar";
import { EmptyState } from "@/components/common/EmptyState";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useRecommendations } from "@/hooks/useRecommendations";
import { formatStipendRange } from "@/lib/formatters";

export default function RecommendationsPage() {
  const { recommendations, total } = useRecommendations();

  return (
    <div className="space-y-5">
      <PageHeader
        title="AI Recommendations"
        description={`${total} personalised match${total !== 1 ? "es" : ""} based on your profile`}
      />

      {recommendations.length === 0 ? (
        <EmptyState
          icon={SparklesIcon}
          title="No recommendations yet"
          description="Complete your profile and add skills to get AI-powered recommendations."
        />
      ) : (
        <div className="space-y-4">
          {recommendations.map((rec) => (
            <Card key={rec.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start">
                  {/* Score */}
                  <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:items-center">
                    <ScoreCircle score={rec.matchScore} size="md" />
                    <span className="text-xs text-muted-foreground text-center">Match Score</span>
                  </div>

                  <Separator orientation="vertical" className="hidden sm:block h-auto" />

                  {/* Details */}
                  <div className="flex-1 min-w-0 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-semibold text-foreground">{rec.internshipTitle}</h3>
                        <p className="text-xs text-muted-foreground">{rec.companyName} · {rec.sector}</p>
                      </div>
                      <div className="flex gap-1.5 shrink-0">
                        {rec.isSaved && <Badge variant="secondary" className="text-xs">Saved</Badge>}
                        {rec.isApplied && <Badge variant="outline" className="text-xs">Applied</Badge>}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPinIcon className="size-3" />{rec.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <IndianRupeeIcon className="size-3" />{formatStipendRange(rec.stipendMin, rec.stipendMax)}/mo
                      </span>
                      <span className="flex items-center gap-1">
                        <ClockIcon className="size-3" />{rec.duration}
                      </span>
                      <Badge variant="outline" className="text-xs">{rec.workMode}</Badge>
                    </div>

                    {/* Score breakdown */}
                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
                      <ScoreBar label="Skill Match"   score={rec.scoreBreakdown.skillMatch}    />
                      <ScoreBar label="Qualification" score={rec.scoreBreakdown.qualification} />
                      <ScoreBar label="Location"      score={rec.scoreBreakdown.location}      />
                      <ScoreBar label="Interest"      score={rec.scoreBreakdown.interest}      />
                      <ScoreBar label="Experience"    score={rec.scoreBreakdown.experience}    />
                    </div>

                    {/* Why this match */}
                    <div className="rounded-lg bg-muted/40 p-3">
                      <p className="text-xs font-medium text-foreground mb-1">Why this match?</p>
                      <p className="text-xs text-muted-foreground">{rec.whyThisMatch}</p>
                    </div>

                    {/* Match reasons */}
                    <div className="flex flex-wrap gap-1.5">
                      {rec.matchReasons.slice(0, 4).map((reason) => (
                        <span key={reason} className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs text-green-700 dark:bg-green-900/20 dark:text-green-400">
                          <CheckIcon className="size-2.5" />{reason}
                        </span>
                      ))}
                      {rec.matchReasons.length > 4 && (
                        <span className="text-xs text-muted-foreground">+{rec.matchReasons.length - 4} more</span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex shrink-0 flex-row gap-2 sm:flex-col">
                    <Button size="sm" className="flex-1 sm:flex-none" disabled={rec.isApplied}>
                      {rec.isApplied ? "Applied" : "Apply Now"}
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                      {rec.isSaved ? "Saved" : "Save"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
