"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  MapPinIcon,
  IndianRupeeIcon,
  ClockIcon,
  SparklesIcon,
  CheckIcon,
  BookmarkIcon,
  BriefcaseIcon,
  ArrowRightIcon,
  CheckCircle2Icon,
  BotIcon,
  FilterIcon,
  LayersIcon,
} from "lucide-react";

import { PageHeader } from "@/components/common/PageHeader";
import { ScoreCircle, ScoreBar } from "@/components/common/ScoreBar";
import { EmptyState } from "@/components/common/EmptyState";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRecommendations } from "@/hooks/useRecommendations";
import { formatStipendRange } from "@/lib/formatters";
import { cn } from "@/lib/utils";

export default function RecommendationsPage() {
  const { recommendations, total } = useRecommendations();
  const [filterMode, setFilterMode] = useState<"all" | "high" | "remote">("all");
  const [appliedIds, setAppliedIds] = useState<Set<string>>(() =>
    new Set(recommendations.filter((r) => r.isApplied).map((r) => r.id))
  );
  const [savedIds, setSavedIds] = useState<Set<string>>(() =>
    new Set(recommendations.filter((r) => r.isSaved).map((r) => r.id))
  );

  const handleApply = (id: string) => {
    setAppliedIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const handleSave = (id: string) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredList = useMemo(() => {
    if (filterMode === "high") return recommendations.filter((r) => r.matchScore >= 90);
    if (filterMode === "remote") return recommendations.filter((r) => r.workMode === "Remote" || r.workMode === "Hybrid");
    return recommendations;
  }, [recommendations, filterMode]);

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-300">
      
      {/* ─────────────────────────────────────────────────────────────
          1. HEADER
          ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
              AI Recommendation <span className="bg-gradient-to-r from-primary via-orange-400 to-amber-400 bg-clip-text text-transparent">Matrix</span>
            </h1>
            <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold text-primary shadow-[0_0_10px_var(--theme-glow)]">
              <SparklesIcon className="size-3" />
              {total} Live Matches
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground font-medium">
            Personalized opportunities dynamically scored against your verified skills, branch, and preferences.
          </p>
        </div>

        {/* Quick Filter Switcher */}
        <div className="flex items-center gap-1.5 rounded-2xl border border-border/70 bg-card/70 p-1 dark:border-white/10 dark:bg-white/[0.03]">
          <button
            type="button"
            onClick={() => setFilterMode("all")}
            className={cn(
              "rounded-xl px-3 py-1.5 text-xs font-bold transition-all cursor-pointer",
              filterMode === "all" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            All Matches ({recommendations.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterMode("high")}
            className={cn(
              "rounded-xl px-3 py-1.5 text-xs font-bold transition-all cursor-pointer",
              filterMode === "high" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            Top Fit (≥90%)
          </button>
          <button
            type="button"
            onClick={() => setFilterMode("remote")}
            className={cn(
              "rounded-xl px-3 py-1.5 text-xs font-bold transition-all cursor-pointer",
              filterMode === "remote" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            Remote / Hybrid
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. FEATURE HERO BANNER
          ───────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-r from-primary/20 via-primary/10 to-indigo-900/20 p-6 sm:p-8 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.35)]">
        <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-primary/25 blur-3xl" />

        <div className="relative z-10 grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
          <div className="space-y-3 lg:col-span-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-3 py-1 text-xs font-bold text-primary shadow-[0_0_12px_var(--theme-glow)]">
              <BotIcon className="size-3.5 animate-pulse" />
              <span>Multi-Dimensional Match Engine Active</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
              Ranked with Gale-Shapley Fairness & Skill Compatibility
            </h2>
            <p className="max-w-xl text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Every recommendation incorporates 5 evaluation vectors: Technical Skills (40%), Degree & CGPA (25%), Location Preference (15%), Sector Affinity (10%), and Experience Level (10%).
            </p>
          </div>

          <div className="flex flex-col gap-2 lg:col-span-4 lg:items-end">
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-right w-full sm:w-auto">
              <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase">Top Candidate Alignment</span>
              <p className="text-2xl font-black text-emerald-500 dark:text-emerald-400">94% Max Score</p>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. RECOMMENDATION CARDS
          ───────────────────────────────────────────────────────────── */}
      {filteredList.length === 0 ? (
        <EmptyState
          icon={SparklesIcon}
          title="No recommendations match this filter"
          description="Try switching to 'All Matches' to view all available internship recommendations."
        />
      ) : (
        <div className="space-y-4">
          {filteredList.map((rec) => {
            const isApplied = appliedIds.has(rec.id);
            const isSaved = savedIds.has(rec.id);

            return (
              <Card
                key={rec.id}
                className="rounded-3xl border border-border/80 bg-card/90 p-6 backdrop-blur-xl shadow-sm hover:border-primary/50 hover:shadow-[0_10px_35px_var(--theme-glow)] transition-all duration-300"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                  
                  {/* Left: Score Circle */}
                  <div className="flex shrink-0 items-center justify-between lg:flex-col lg:items-center lg:justify-center gap-3 lg:w-28 lg:border-r lg:border-border/60 lg:pr-6 dark:border-white/10">
                    <ScoreCircle score={rec.matchScore} size="md" />
                    <div className="text-right lg:text-center">
                      <span className="text-[11px] font-bold text-emerald-500 font-mono block">
                        {rec.matchScore >= 90 ? "Top Alignment" : "Strong Fit"}
                      </span>
                      <span className="text-[10px] text-muted-foreground">AI Compatibility</span>
                    </div>
                  </div>

                  {/* Center: Details & Vectors */}
                  <div className="flex-1 min-w-0 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary">
                          {rec.companyName} · {rec.sector}
                        </span>
                        <h3 className="text-lg font-black text-foreground hover:text-primary transition-colors">
                          <Link href={`/student/internships/${rec.internshipId}`}>
                            {rec.internshipTitle}
                          </Link>
                        </h3>
                      </div>

                      <div className="flex items-center gap-2">
                        {isSaved && (
                          <span className="rounded-full bg-blue-500/15 border border-blue-500/30 px-2.5 py-0.5 text-[11px] font-bold text-blue-400">
                            Saved
                          </span>
                        )}
                        {isApplied && (
                          <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 text-[11px] font-bold text-emerald-500 dark:text-emerald-400">
                            Application Submitted
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Metadata chips */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPinIcon className="size-3.5 text-muted-foreground" />
                        {rec.location}
                      </span>
                      <span className="flex items-center gap-1 font-bold text-foreground font-mono">
                        <IndianRupeeIcon className="size-3.5 text-emerald-500" />
                        {formatStipendRange(rec.stipendMin, rec.stipendMax)} / month
                      </span>
                      <span className="flex items-center gap-1">
                        <ClockIcon className="size-3.5 text-muted-foreground" />
                        {rec.duration}
                      </span>
                      <span className="rounded-lg bg-muted/60 border border-border/70 px-2 py-0.5 text-[11px] font-semibold text-foreground dark:bg-white/[0.04] dark:border-white/10">
                        {rec.workMode}
                      </span>
                    </div>

                    {/* Score Breakdown Bars */}
                    <div className="rounded-2xl border border-border/60 bg-muted/20 p-3.5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5 dark:border-white/10 dark:bg-white/[0.02]">
                      <ScoreBar label="Skill Match" score={rec.scoreBreakdown.skillMatch} />
                      <ScoreBar label="Qualification" score={rec.scoreBreakdown.qualification} />
                      <ScoreBar label="Location" score={rec.scoreBreakdown.location} />
                      <ScoreBar label="Interest" score={rec.scoreBreakdown.interest} />
                      <ScoreBar label="Experience" score={rec.scoreBreakdown.experience} />
                    </div>

                    {/* Why this match AI Explainer */}
                    <div className="rounded-2xl border border-primary/20 bg-primary/5 p-3.5 dark:border-white/10 dark:bg-white/[0.02]">
                      <div className="flex items-center gap-1.5 mb-1 text-xs font-bold text-primary font-mono">
                        <SparklesIcon className="size-3" />
                        <span>Why this match?</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {rec.whyThisMatch}
                      </p>
                    </div>

                    {/* Match Reasons Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {rec.matchReasons.map((reason) => (
                        <span
                          key={reason}
                          className="flex items-center gap-1 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-500 dark:text-emerald-400"
                        >
                          <CheckIcon className="size-3 stroke-[2.5]" />
                          {reason}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex flex-row lg:flex-col gap-2 shrink-0 lg:w-36 pt-2 lg:pt-0">
                    <Button
                      size="sm"
                      disabled={isApplied}
                      onClick={() => handleApply(rec.id)}
                      className="flex-1 rounded-xl bg-gradient-to-r from-primary to-orange-500 text-white font-bold text-xs py-2 shadow-[0_0_12px_var(--theme-glow)] hover:scale-[1.02] transition-all disabled:opacity-50"
                    >
                      {isApplied ? "Applied" : "Apply Now"}
                    </Button>
                    <Button
                      variant={isSaved ? "secondary" : "outline"}
                      size="sm"
                      onClick={() => handleSave(rec.id)}
                      className="flex-1 rounded-xl text-xs font-bold border-border/80 dark:border-white/15 dark:bg-white/[0.03]"
                    >
                      <BookmarkIcon className={cn("size-3.5 mr-1", isSaved && "fill-current text-primary")} />
                      {isSaved ? "Saved" : "Save"}
                    </Button>
                    <Link
                      href={`/student/internships/${rec.internshipId}`}
                      className="inline-flex items-center justify-center rounded-xl border border-border/80 bg-muted/30 px-3 py-2 text-xs font-bold text-foreground hover:bg-muted dark:border-white/10 dark:bg-white/[0.03] transition-colors"
                    >
                      <span>View Details</span>
                    </Link>
                  </div>

                </div>
              </Card>
            );
          })}
        </div>
      )}

    </div>
  );
}
