"use client";

import { useState } from "react";
import {
  BookmarkIcon,
  MapPinIcon,
  IndianRupeeIcon,
  ClockIcon,
  SparklesIcon,
  Building2Icon,
  ArrowRightIcon,
  Trash2Icon,
  CheckCircle2Icon
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { EmptyState } from "@/components/common/EmptyState";
import { ScoreCircle } from "@/components/common/ScoreBar";
import { Badge } from "@/components/ui/badge";
import { Button, LinkButton } from "@/components/ui/button";
import { useRecommendations } from "@/hooks/useRecommendations";
import { formatStipendRange } from "@/lib/formatters";

export default function SavedPage() {
  const { recommendations } = useRecommendations();
  const [saved, setSaved] = useState(() => {
    const list = recommendations.filter((r) => r.isSaved);
    return list.length > 0 ? list : recommendations.slice(0, 3);
  });

  const removeSaved = (id: string) => setSaved((prev) => prev.filter((r) => r.id !== id));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Saved Internships"
        description={`${saved.length} bookmarked position${saved.length !== 1 ? "s" : ""} saved for later review.`}
      />

      {/* Cyber Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent p-6 shadow-xl shadow-primary/5 backdrop-blur-md">
        <div className="absolute -right-10 -top-10 size-48 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-md">
              <SparklesIcon className="size-3.5 text-primary" />
              <span>Personalized Career Watchlist</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Bookmarked Opportunities & High-Affinity Matches
            </h2>
            <p className="max-w-2xl text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Keep track of roles you're interested in applying to. Our AI monitors open seats and deadlines for saved positions in real-time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary">
              <BookmarkIcon className="size-3.5 fill-current" />
              {saved.length} Bookmarks Active
            </span>
          </div>
        </div>
      </div>

      {saved.length === 0 ? (
        <EmptyState
          icon={BookmarkIcon}
          title="No saved internships yet"
          description="Browse the internship catalog or AI recommendations and tap the bookmark icon to save roles."
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {saved.map((rec) => {
            const initial = rec.companyName?.slice(0, 2).toUpperCase() || "TN";

            return (
              <div
                key={rec.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-5 transition-all duration-300 hover:border-primary/50 hover:shadow-xl"
              >
                <div>
                  {/* Top Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 border border-primary/25 text-primary font-bold text-sm shrink-0 shadow-sm">
                        {initial}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-base font-bold text-foreground truncate group-hover:text-primary transition-colors">
                          {rec.internshipTitle}
                        </h4>
                        <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                          <Building2Icon className="size-3.5 text-primary/70 shrink-0" />
                          <span className="truncate font-medium text-foreground/80">{rec.companyName}</span>
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <ScoreCircle score={rec.matchScore} size="sm" />
                      <span className="text-[10px] text-muted-foreground block mt-0.5">Match</span>
                    </div>
                  </div>

                  {/* Work Mode & Location */}
                  <div className="mt-3.5 flex flex-wrap items-center gap-1.5">
                    <span className="inline-flex items-center rounded-full border border-primary/25 bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                      {rec.workMode}
                    </span>
                  </div>

                  {/* Details Grid */}
                  <div className="mt-3.5 grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1.5 rounded-xl border border-border/50 bg-muted/20 p-2 text-muted-foreground">
                      <MapPinIcon className="size-3.5 text-primary shrink-0" />
                      <span className="truncate">{rec.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-xl border border-border/50 bg-muted/20 p-2 text-muted-foreground">
                      <ClockIcon className="size-3.5 text-primary shrink-0" />
                      <span className="truncate">{rec.duration}</span>
                    </div>
                    <div className="col-span-2 flex items-center gap-1.5 rounded-xl border border-border/50 bg-muted/20 p-2 text-muted-foreground">
                      <IndianRupeeIcon className="size-3.5 text-emerald-400 shrink-0" />
                      <span className="font-semibold text-foreground">
                        {formatStipendRange(rec.stipendMin, rec.stipendMax)} / month
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="mt-5 flex items-center justify-between gap-2 pt-3.5 border-t border-border/60">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1.5 text-xs text-rose-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-xl"
                    onClick={() => removeSaved(rec.id)}
                  >
                    <Trash2Icon className="size-3.5" />
                    <span>Remove</span>
                  </Button>

                  <LinkButton
                    href={`/student/internships/${rec.internshipId}`}
                    size="sm"
                    className="gap-1.5 rounded-xl font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm shadow-primary/20"
                  >
                    <span>View Role</span>
                    <ArrowRightIcon className="size-3.5" />
                  </LinkButton>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
