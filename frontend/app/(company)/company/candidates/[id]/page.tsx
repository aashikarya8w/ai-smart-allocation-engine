"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeftIcon,
  MapPinIcon,
  GraduationCapIcon,
  LinkIcon,
  SparklesIcon,
  Building2Icon,
  AwardIcon,
  CheckCircle2Icon,
  ShieldCheckIcon,
  Code2Icon
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { ScoreBar, ScoreCircle } from "@/components/common/ScoreBar";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { mockStudents } from "@/data/students";
import { mockApplications } from "@/data/applications";
import { formatCGPA, initials } from "@/lib/formatters";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CandidateDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const student = mockStudents.find((s) => s.id === id);
  const apps = mockApplications.filter((a) => a.studentId === id);
  const bestApp = apps.sort((a, b) => b.matchScore - a.matchScore)[0];

  if (!student) return <EmptyState title="Candidate profile not found" />;

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
          Back to Candidate Pool
        </span>
      </div>

      {/* Cyber Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent p-6 shadow-xl shadow-primary/5 backdrop-blur-md">
        <div className="absolute -right-10 -top-10 size-48 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-md">
              <ShieldCheckIcon className="size-3.5 text-primary" />
              <span>Verified University Talent Dossier</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              {student.fullName} · {student.degree}
            </h2>
            <p className="max-w-2xl text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {student.university} · Verified CGPA {student.cgpa.toFixed(2)} / 10.0 · Pre-screened by AICTE algorithm.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-400">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              Academic Credentials Validated
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column: Identity & Score */}
        <div className="space-y-5">
          <div className="relative overflow-hidden rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-6 text-center shadow-xl">
            <div className="relative mx-auto size-20 mb-3">
              <div className="size-full rounded-2xl bg-gradient-to-tr from-primary to-emerald-400 p-0.5 shadow-md shadow-primary/20">
                <div className="size-full rounded-2xl bg-card dark:bg-[#0e1322] flex items-center justify-center">
                  <span className="text-xl font-extrabold text-foreground">
                    {initials(student.fullName)}
                  </span>
                </div>
              </div>
            </div>

            <h3 className="text-base font-bold text-foreground">{student.fullName}</h3>
            <p className="text-xs text-muted-foreground">{student.email}</p>

            <div className="mt-3 flex justify-center">
              <StatusBadge status={student.verificationStatus} />
            </div>

            <div className="my-4 h-px bg-border/60" />

            <div className="space-y-2.5 text-left text-xs">
              <div className="flex items-center gap-2 rounded-xl border border-border/50 bg-muted/20 p-2.5">
                <MapPinIcon className="size-3.5 text-primary shrink-0" />
                <span className="text-foreground font-medium">{student.city}, {student.state}</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-border/50 bg-muted/20 p-2.5">
                <GraduationCapIcon className="size-3.5 text-primary shrink-0" />
                <span className="text-foreground font-medium truncate">{student.branch}</span>
              </div>
            </div>

            {student.linkedinUrl && (
              <div className="mt-4 pt-3 border-t border-border/60">
                <a
                  href={student.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-border/80 bg-muted/30 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-muted/60 transition-colors"
                >
                  <LinkIcon className="size-3" /> View LinkedIn
                </a>
              </div>
            )}
          </div>

          {bestApp && (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-6 text-center shadow-xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Peak Match Alignment
              </span>
              <ScoreCircle score={bestApp.matchScore} size="lg" />
              <p className="text-xs font-semibold text-primary">{bestApp.internshipTitle}</p>
            </div>
          )}
        </div>

        {/* Right Column: Education & Skills */}
        <div className="space-y-6 lg:col-span-2">
          {/* Education */}
          <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-foreground">Academic Education</h3>
            <div className="space-y-3">
              {student.education.map((edu) => (
                <div key={edu.id} className="rounded-xl border border-border/60 bg-muted/20 p-4 space-y-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-bold text-foreground">{edu.degree}</h4>
                      <p className="text-xs text-muted-foreground">{edu.institution}</p>
                    </div>
                    <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-xs font-bold text-emerald-400">
                      CGPA: {formatCGPA(edu.cgpa)}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground pt-1">
                    {edu.startYear} – {edu.isCurrently ? "Present" : edu.endYear}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills */}
          <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-6 shadow-xl space-y-3">
            <div className="flex items-center gap-2">
              <Code2Icon className="size-4 text-primary" />
              <h3 className="text-base font-bold text-foreground">Verified Technical Skillsets</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {student.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-xl border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Applications Submitted */}
          {apps.length > 0 && (
            <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-6 shadow-xl space-y-3">
              <h3 className="text-base font-bold text-foreground">Submitted Applications to Your Company</h3>
              <div className="space-y-2">
                {apps.map((app) => (
                  <div
                    key={app.id}
                    className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/20 p-3.5 text-xs"
                  >
                    <div>
                      <p className="font-bold text-foreground text-sm">{app.internshipTitle}</p>
                      <p className="text-muted-foreground text-[11px] mt-0.5">Match: {app.matchScore}%</p>
                    </div>
                    <StatusBadge status={app.status} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
