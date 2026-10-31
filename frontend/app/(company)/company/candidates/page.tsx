"use client";

import { useState } from "react";
import {
  PageHeader
} from "@/components/common/PageHeader";
import { SearchInput } from "@/components/common/SearchInput";
import { ScoreCircle } from "@/components/common/ScoreBar";
import { StatusBadge } from "@/components/common/StatusBadge";
import { EmptyState } from "@/components/common/EmptyState";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { useCompany } from "@/hooks/useCompany";
import { mockStudents } from "@/data/students";
import {
  SparklesIcon,
  GraduationCapIcon,
  MapPinIcon,
  Building2Icon,
  AwardIcon,
  ArrowRightIcon,
  UsersIcon,
  SearchIcon,
  SlidersHorizontalIcon
} from "lucide-react";

export default function CandidatesPage() {
  const { applications } = useCompany();
  const [search, setSearch] = useState("");

  const candidates = applications
    .map((app) => {
      const student = mockStudents.find((s) => s.id === app.studentId) || mockStudents[0];
      return { app, student };
    })
    .filter(({ student, app }) => {
      if (!student) return false;
      if (!search) return true;
      return (
        student.fullName.toLowerCase().includes(search.toLowerCase()) ||
        student.branch.toLowerCase().includes(search.toLowerCase()) ||
        app.internshipTitle.toLowerCase().includes(search.toLowerCase())
      );
    });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Candidate Talent Pool"
        description={`Evaluate ${candidates.length} AI-ranked student candidate${candidates.length !== 1 ? "s" : ""} across your open listings.`}
      />

      {/* Cyber Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent p-6 shadow-xl shadow-primary/5 backdrop-blur-md">
        <div className="absolute -right-10 -top-10 size-48 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-md">
              <SparklesIcon className="size-3.5 text-primary" />
              <span>AI Multi-Vector Talent Twin Engine</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Pre-Vetted University Talent with Proven Skillsets
            </h2>
            <p className="max-w-2xl text-xs sm:text-sm text-muted-foreground leading-relaxed">
              InternAI analyzes student GitHub repositories, course work, and coding assessment benchmarks to match you with top 5% candidates who ramp up immediately.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-400">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              Verified Transcripts Active
            </span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/85 dark:bg-[#0e1322]/85 p-4 backdrop-blur-md">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search by student name, engineering branch, or applied role…"
          className="max-w-md w-full"
        />
      </div>

      {/* Candidates Grid */}
      {candidates.length === 0 ? (
        <EmptyState
          title="No candidates match your search"
          description="Try searching with a broader query or clearing your filter text."
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {candidates.map(({ app, student }) => {
            if (!student) return null;
            const initials = student.fullName?.slice(0, 2).toUpperCase() || "AS";

            return (
              <div
                key={app.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-5 transition-all duration-300 hover:border-primary/50 hover:shadow-xl"
              >
                <div>
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 border border-primary/25 text-primary font-bold text-sm shrink-0 shadow-sm">
                        {initials}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-base font-bold text-foreground truncate group-hover:text-primary transition-colors">
                          {student.fullName}
                        </h4>
                        <p className="text-xs text-muted-foreground truncate">{student.degree}</p>
                        <p className="text-[11px] text-muted-foreground/80 truncate">{student.university}</p>
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <ScoreCircle score={app.matchScore} size="sm" />
                      <span className="text-[10px] text-muted-foreground block mt-0.5">Match</span>
                    </div>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                    <div className="rounded-xl border border-border/50 bg-muted/20 p-2">
                      <span className="text-muted-foreground text-[10px] block">Verified CGPA</span>
                      <span className="font-bold text-foreground">{student.cgpa.toFixed(2)} / 10.0</span>
                    </div>
                    <div className="rounded-xl border border-border/50 bg-muted/20 p-2">
                      <span className="text-muted-foreground text-[10px] block">Location</span>
                      <span className="font-semibold text-foreground truncate block">{student.city}</span>
                    </div>
                  </div>

                  {/* Applied Role */}
                  <div className="rounded-xl border border-border/60 bg-muted/30 p-2.5 mb-4 text-xs">
                    <span className="text-muted-foreground text-[10px] block">Applied Position</span>
                    <span className="font-bold text-foreground truncate block mt-0.5">{app.internshipTitle}</span>
                  </div>

                  {/* Skills Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {student.skills.slice(0, 3).map((s) => (
                      <span
                        key={s}
                        className="rounded-lg border border-primary/20 bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary"
                      >
                        {s}
                      </span>
                    ))}
                    {student.skills.length > 3 && (
                      <span className="rounded-lg border border-border/60 bg-muted/30 px-2 py-0.5 text-[11px] text-muted-foreground">
                        +{student.skills.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="flex items-center justify-between gap-2 pt-3.5 border-t border-border/60">
                  <StatusBadge status={app.status} />

                  <LinkButton
                    href={`/company/candidates/${student.id}`}
                    size="sm"
                    className="gap-1 rounded-xl font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm shadow-primary/20"
                  >
                    <span>View Profile</span>
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
