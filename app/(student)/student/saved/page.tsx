"use client";

import { BookmarkIcon, MapPinIcon, IndianRupeeIcon, ClockIcon } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { EmptyState } from "@/components/common/EmptyState";
import { ScoreCircle } from "@/components/common/ScoreBar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/button";
import { useRecommendations } from "@/hooks/useRecommendations";
import { formatStipendRange } from "@/lib/formatters";

export default function SavedPage() {
  const { recommendations } = useRecommendations();
  const saved = recommendations.filter((r) => r.isSaved);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Saved Internships"
        description={`${saved.length} saved internship${saved.length !== 1 ? "s" : ""}`}
      />

      {saved.length === 0 ? (
        <EmptyState
          icon={BookmarkIcon}
          title="No saved internships"
          description="Save internships from recommendations or listings to view them here."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {saved.map((rec) => (
            <Card key={rec.id} className="flex flex-col hover:shadow-md transition-shadow">
              <CardContent className="flex flex-1 flex-col p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">{rec.internshipTitle}</p>
                    <p className="text-xs text-muted-foreground">{rec.companyName}</p>
                  </div>
                  <ScoreCircle score={rec.matchScore} size="sm" />
                </div>

                <div className="mt-3 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPinIcon className="size-3.5" />{rec.location}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <IndianRupeeIcon className="size-3.5" />
                    {formatStipendRange(rec.stipendMin, rec.stipendMax)}/mo
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <ClockIcon className="size-3.5" />{rec.duration}
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between gap-2 pt-3 border-t border-border/50">
                  <Badge variant="secondary" className="text-xs">{rec.workMode}</Badge>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon-sm" aria-label="Remove from saved">
                      <BookmarkIcon className="size-4 fill-primary text-primary" />
                    </Button>
                    <LinkButton
                      href={`/student/internships/${rec.internshipId}`}
                      variant="outline"
                      size="sm"
                    >
                      View
                    </LinkButton>
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
