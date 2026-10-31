"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeftIcon, Building2Icon, CalendarIcon, CheckCircle2Icon,
  GraduationCapIcon, MapPinIcon, ShieldCheckIcon, UserIcon,
  XCircleIcon, SparklesIcon, FileTextIcon, AwardIcon,
} from "lucide-react";
import { StatusBadge } from "@/components/common/StatusBadge";
import { ScoreBar, ScoreCircle } from "@/components/common/ScoreBar";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { mockApplications } from "@/data/applications";
import { mockStudents } from "@/data/students";
import { formatDate } from "@/lib/formatters";
import { Badge } from "@/components/ui/badge";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function AdminApplicationDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const app = mockApplications.find((a) => a.id === id);
  const student = app ? mockStudents.find((s) => s.id === app.studentId) : null;

  if (!app) return <EmptyState title="Application not found" />;

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
          <h2 className="text-xl font-black text-foreground">Application Audit Review</h2>
          <p className="text-xs text-muted-foreground">Reference ID: {app.id}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left 2 Cols: Main Dossier */}
        <div className="space-y-6 lg:col-span-2">
          {/* Main Overview Card */}
          <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-6 shadow-xl backdrop-blur-md">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-border/50 dark:border-white/5">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-extrabold text-lg shadow-lg shadow-primary/20">
                  {app.studentName.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">{app.studentName}</h3>
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                    <Building2Icon className="h-3.5 w-3.5 text-primary" />
                    <span>Applied for: <strong className="text-foreground">{app.internshipTitle}</strong></span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">Corporate Partner: {app.companyName}</p>
                </div>
              </div>
              <StatusBadge status={app.status} />
            </div>

            <div className="grid grid-cols-2 gap-4 py-5 text-sm border-b border-border/50 dark:border-white/5">
              <div>
                <p className="text-xs text-muted-foreground">Date of Application</p>
                <p className="font-semibold text-foreground mt-0.5">{formatDate(app.appliedAt)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">System Audit State</p>
                <p className="font-semibold text-foreground mt-0.5">{formatDate(app.updatedAt)}</p>
              </div>
            </div>

            {/* Score Breakdown */}
            <div className="pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <SparklesIcon className="h-3.5 w-3.5 text-primary" />
                  Algorithmic Vector Score Breakdown
                </p>
                <span className="text-xs font-semibold text-primary">{app.matchScore}% Overall Match</span>
              </div>
              <div className="space-y-3">
                <ScoreBar label="Skill Repertoire Overlap" score={app.scoreBreakdown.skillMatch} />
                <ScoreBar label="Academic Qualification & CGPA" score={app.scoreBreakdown.qualification} />
                <ScoreBar label="Geographic & Work Mode Match" score={app.scoreBreakdown.location} />
                <ScoreBar label="Domain Interest & Motivation" score={app.scoreBreakdown.interest} />
                <ScoreBar label="Prior Experience & Project Depth" score={app.scoreBreakdown.experience} />
              </div>
            </div>
          </div>

          {/* Student Profile Card */}
          {student && (
            <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-6 shadow-xl backdrop-blur-md space-y-5">
              <div className="flex items-center justify-between border-b border-border/50 dark:border-white/5 pb-4">
                <h4 className="text-base font-bold text-foreground flex items-center gap-2">
                  <GraduationCapIcon className="h-5 w-5 text-indigo-400" />
                  Candidate Background Ledger
                </h4>
                <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 bg-emerald-500/10 text-xs">
                  Verified Scholar
                </Badge>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="p-3 rounded-xl bg-muted/40 dark:bg-white/[0.02] border border-border/40 dark:border-white/5">
                  <p className="text-xs text-muted-foreground">University / Institute</p>
                  <p className="font-semibold text-foreground mt-1">{student.university}</p>
                </div>
                <div className="p-3 rounded-xl bg-muted/40 dark:bg-white/[0.02] border border-border/40 dark:border-white/5">
                  <p className="text-xs text-muted-foreground">Specialization / Branch</p>
                  <p className="font-semibold text-foreground mt-1">{student.branch}</p>
                </div>
                <div className="p-3 rounded-xl bg-muted/40 dark:bg-white/[0.02] border border-border/40 dark:border-white/5">
                  <p className="text-xs text-muted-foreground">Cumulative Grade (CGPA)</p>
                  <p className="font-semibold text-foreground mt-1">{student.cgpa.toFixed(2)} / 10.0</p>
                </div>
                <div className="p-3 rounded-xl bg-muted/40 dark:bg-white/[0.02] border border-border/40 dark:border-white/5">
                  <p className="text-xs text-muted-foreground">Hometown Location</p>
                  <p className="font-semibold text-foreground mt-1">{student.city}, {student.state}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-2">Verified Skill Tags</p>
                <div className="flex flex-wrap gap-2">
                  {student.skills.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-primary/10 border border-primary/20 text-primary"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Col: Score Gauge & Admin Actions */}
        <div className="space-y-6">
          {/* Match Score Card */}
          <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-6 shadow-xl backdrop-blur-md flex flex-col items-center text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
              Composite Gale-Shapley Score
            </p>
            <ScoreCircle score={app.matchScore} size="lg" />
            <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
              Based on algorithmic skill congruence, quota rules, and student preference weight.
            </p>
          </div>

          {/* Action Decision Card */}
          <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-6 shadow-xl backdrop-blur-md space-y-3">
            <h4 className="text-sm font-bold text-foreground mb-2">Governance Controls</h4>
            <Button
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold shadow-md active:scale-95"
              size="sm"
              disabled={app.status !== "Applied"}
            >
              <CheckCircle2Icon className="h-4 w-4 mr-1.5" />
              Direct Shortlist
            </Button>
            <Button
              variant="destructive"
              size="sm"
              className="w-full font-semibold active:scale-95"
              disabled={app.status === "Rejected"}
            >
              <XCircleIcon className="h-4 w-4 mr-1.5" />
              Reject Application
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full border-white/10 hover:bg-white/5 active:scale-95"
              onClick={() => router.back()}
            >
              Return to Pipeline
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
