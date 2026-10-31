"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeftIcon,
  SparklesIcon,
  Building2Icon,
  CheckCircle2Icon,
  GraduationCapIcon,
  MapPinIcon,
  AwardIcon,
  CheckIcon,
  XIcon
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { ScoreBar, ScoreCircle } from "@/components/common/ScoreBar";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import { mockApplications } from "@/data/applications";
import { mockStudents } from "@/data/students";
import { formatDate, formatCGPA } from "@/lib/formatters";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CompanyApplicationDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const app = mockApplications.find((a) => a.id === id);
  const student = app ? mockStudents.find((s) => s.id === app.studentId) : null;

  if (!app) return <EmptyState title="Application not found" />;

  const initials = app.studentName?.slice(0, 2).toUpperCase() || "ST";

  return (
    <div className="space-y-6">
      {/* Back Nav */}
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon-sm"
          onClick={() => router.back()}
          className="rounded-xl border-border/80 hover:bg-muted/50"
        >
          <ArrowLeftIcon className="size-4" />
        </Button>
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Back to Applications Pipeline
        </span>
      </div>

      {/* Cyber Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent p-6 shadow-xl shadow-primary/5 backdrop-blur-md">
        <div className="absolute -right-10 -top-10 size-48 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/15 border border-primary/30 text-primary font-bold text-lg shrink-0 shadow-md">
              {initials}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                  {app.studentName}
                </h1>
                <StatusBadge status={app.status} />
              </div>
              <p className="text-xs text-muted-foreground">
                Applicant for: <strong className="text-foreground">{app.internshipTitle}</strong> · Submitted on {formatDate(app.appliedAt)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary">
              <SparklesIcon className="size-3.5" />
              Pre-Screened by InternAI
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column: Score Breakdown & Candidate Profile */}
        <div className="space-y-6 lg:col-span-2">
          {/* 5-Vector Score Breakdown */}
          <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <h3 className="text-sm font-bold text-foreground">5-Vector Affinity Breakdown</h3>
              <span className="text-xs text-muted-foreground font-mono">Algorithm Score</span>
            </div>

            <div className="space-y-3 pt-1">
              <ScoreBar label="Skill Match" score={app.scoreBreakdown.skillMatch} />
              <ScoreBar label="Qualification Alignment" score={app.scoreBreakdown.qualification} />
              <ScoreBar label="Location & Domicile" score={app.scoreBreakdown.location} />
              <ScoreBar label="Domain Passion" score={app.scoreBreakdown.interest} />
              <ScoreBar label="Verified Experience" score={app.scoreBreakdown.experience} />
            </div>
          </div>

          {/* Candidate Profile Details */}
          {student && (
            <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-6 shadow-xl space-y-5">
              <h3 className="text-base font-bold text-foreground">Candidate Academic Profile</h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="rounded-xl border border-border/60 bg-muted/20 p-3">
                  <span className="text-[10px] text-muted-foreground block">University</span>
                  <span className="font-bold text-foreground block truncate mt-0.5">{student.university}</span>
                </div>

                <div className="rounded-xl border border-border/60 bg-muted/20 p-3">
                  <span className="text-[10px] text-muted-foreground block">Engineering Branch</span>
                  <span className="font-bold text-foreground block truncate mt-0.5">{student.branch}</span>
                </div>

                <div className="rounded-xl border border-border/60 bg-muted/20 p-3">
                  <span className="text-[10px] text-muted-foreground block">Verified CGPA</span>
                  <span className="font-bold text-emerald-400 block mt-0.5">{formatCGPA(student.cgpa)} / 10.0</span>
                </div>

                <div className="rounded-xl border border-border/60 bg-muted/20 p-3">
                  <span className="text-[10px] text-muted-foreground block">Graduation Batch</span>
                  <span className="font-bold text-foreground block mt-0.5">Class of {student.graduationYear}</span>
                </div>

                <div className="rounded-xl border border-border/60 bg-muted/20 p-3">
                  <span className="text-[10px] text-muted-foreground block">Location</span>
                  <span className="font-bold text-foreground block truncate mt-0.5">{student.city}, {student.state}</span>
                </div>

                <div className="rounded-xl border border-border/60 bg-muted/20 p-3">
                  <span className="text-[10px] text-muted-foreground block">Work Arrangement</span>
                  <span className="font-bold text-foreground block mt-0.5">{student.workMode}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-border/60">
                <span className="text-xs font-bold text-foreground">Technical Skillset</span>
                <div className="flex flex-wrap gap-1.5">
                  {student.skills.map((s) => (
                    <span
                      key={s}
                      className="rounded-lg border border-primary/25 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar: Score Circle & Decision Actions */}
        <div className="space-y-5">
          <div className="flex flex-col items-center justify-center rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-6 text-center shadow-xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Candidate Fit Index
            </span>
            <ScoreCircle score={app.matchScore} size="lg" />
            <span className="text-xs font-bold text-emerald-400">
              {app.matchScore >= 80 ? "Top 5% Highly Recommended" : "Eligible Candidate"}
            </span>
          </div>

          <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-5 shadow-xl space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-border/60 pb-2">
              Recruiter Decision
            </h4>

            <div className="space-y-2">
              <Button className="w-full gap-2 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md">
                <CheckIcon className="size-4" />
                <span>Shortlist Candidate</span>
              </Button>

              <Button variant="outline" className="w-full gap-2 rounded-xl font-semibold border-rose-500/30 text-rose-400 hover:bg-rose-500/10">
                <XIcon className="size-4" />
                <span>Decline Application</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
