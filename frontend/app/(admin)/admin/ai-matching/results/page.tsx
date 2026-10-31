"use client";

import {
  SparklesIcon, CheckIcon, Building2Icon, ArrowRightIcon,
  ShieldCheckIcon, TargetIcon, UserIcon, ArrowLeftIcon,
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { ScoreBar, ScoreCircle } from "@/components/common/ScoreBar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockRecommendations } from "@/data/recommendations";
import Link from "next/link";
import { ROUTES } from "@/lib/constants";
import { useRouter } from "next/navigation";

const topMatches = [...mockRecommendations]
  .sort((a, b) => b.matchScore - a.matchScore)
  .slice(0, 10);

export default function AIMatchingResultsPage() {
  const router = useRouter();

  return (
    <div className="space-y-8 pb-12">
      {/* Top Navigation */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => router.back()}
          className="rounded-xl border border-border/80 dark:border-white/10 bg-card/60 dark:bg-white/5 hover:bg-white/10"
        >
          <ArrowLeftIcon className="size-4" />
        </Button>
        <div>
          <h2 className="text-xl font-black text-foreground">AI Matching Manifest</h2>
          <p className="text-xs text-muted-foreground">{topMatches.length} highest-precision algorithmic pairings</p>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-br from-[#0c1222] via-[#0f172a] to-[#1e1338] p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl">
        <div className="absolute -top-32 -right-24 h-96 w-96 rounded-full bg-gradient-to-br from-primary/20 via-purple-500/15 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-gradient-to-tr from-cyan-500/15 via-blue-500/10 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
              <SparklesIcon className="h-3.5 w-3.5" />
              Gale-Shapley Stable Convergence Output
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              AI Matching <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Telemetry</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed font-normal">
              High-ranking match scores computed by evaluating student technical repertoires, academic transcripts, geocoded transit radii, and affirmative action weights.
            </p>
          </div>

          <Link
            href={ROUTES.admin.allocations}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary via-indigo-600 to-purple-600 hover:from-primary/90 hover:to-purple-700 text-white text-xs font-bold shadow-lg shadow-primary/25 active:scale-95 transition-all"
          >
            Review Confirmed Allocations <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Results Feed */}
      <div className="space-y-4">
        {topMatches.map((rec, idx) => (
          <div
            key={rec.id}
            className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-6 shadow-xl backdrop-blur-md space-y-4 hover:border-primary/40 transition-all"
          >
            <div className="flex items-start gap-4">
              {/* Rank Badge */}
              <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-purple-600/30 border border-primary/30 text-sm font-black text-primary shadow-md">
                #{idx + 1}
              </div>

              {/* Main Info */}
              <div className="flex-1 min-w-0 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-bold text-foreground">{rec.internshipTitle}</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                      <Building2Icon className="h-3.5 w-3.5 text-primary" />
                      Host: <strong className="text-foreground">{rec.companyName}</strong>
                      <span className="text-muted-foreground">·</span>
                      <UserIcon className="h-3 w-3" /> Candidate: {rec.studentId}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Badge
                      variant="outline"
                      className="border-purple-500/30 text-purple-400 bg-purple-500/10 text-xs font-semibold"
                    >
                      {rec.workMode}
                    </Badge>
                    <ScoreCircle score={rec.matchScore} size="sm" />
                  </div>
                </div>

                {/* Score Breakdown Bars */}
                <div className="grid gap-2 sm:grid-cols-5 p-3 rounded-xl bg-muted/40 dark:bg-white/[0.02] border border-border/40 dark:border-white/5">
                  <ScoreBar label="Skill Repertoire" score={rec.scoreBreakdown.skillMatch} />
                  <ScoreBar label="Qualifications" score={rec.scoreBreakdown.qualification} />
                  <ScoreBar label="Geocoding" score={rec.scoreBreakdown.location} />
                  <ScoreBar label="Domain Interest" score={rec.scoreBreakdown.interest} />
                  <ScoreBar label="Prior Experience" score={rec.scoreBreakdown.experience} />
                </div>

                {/* Match Reasons */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {rec.matchReasons.map((r) => (
                    <span
                      key={r}
                      className="flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-400 font-medium"
                    >
                      <CheckIcon className="size-3" />
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
