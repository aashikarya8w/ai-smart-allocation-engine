"use client";

import {
  MapPinIcon,
  GraduationCapIcon,
  BriefcaseIcon,
  LinkIcon,
  CheckCircle2Icon,
  ShieldCheckIcon,
  SparklesIcon,
  CalendarIcon,
  AwardIcon,
  Building2Icon,
  ExternalLinkIcon,
  Code2Icon,
  HeartIcon,
  CompassIcon,
  PhoneIcon,
  MailIcon
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useStudent } from "@/hooks/useStudent";
import { EmptyState } from "@/components/common/EmptyState";
import { LinkButton } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";
import { initials, formatCGPA } from "@/lib/formatters";

export default function StudentProfilePage() {
  const { student } = useStudent();

  if (!student) return <EmptyState title="Profile not found" />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title="My Student Profile"
        description="Verified national student credentials, academic pedigree, and matching preferences."
      >
        <LinkButton
          href={ROUTES.student.settings}
          size="sm"
          className="gap-2 rounded-xl font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20"
        >
          Edit Profile
        </LinkButton>
      </PageHeader>

      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent p-6 shadow-xl shadow-primary/5 backdrop-blur-md">
        <div className="absolute -right-10 -top-10 size-48 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-md">
              <ShieldCheckIcon className="size-3.5 text-primary" />
              <span>Verified University Talent Twin</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              {student.fullName} · {student.branch}
            </h2>
            <p className="max-w-2xl text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Academic credentials, course transcripts, and assessment benchmarks are synchronized directly with your affiliated institution.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-400">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              Identity: 100% Verified
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column — Identity Card & Profile Health */}
        <div className="space-y-5">
          <div className="relative overflow-hidden rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-6 text-center shadow-xl">
            {/* Top Glow Orb */}
            <div className="absolute -top-12 -left-12 size-28 rounded-full bg-primary/15 blur-xl pointer-events-none" />

            {/* Avatar */}
            <div className="relative mx-auto size-24 mb-4">
              <div className="size-full rounded-2xl bg-gradient-to-tr from-primary to-emerald-400 p-0.5 shadow-lg shadow-primary/20">
                <div className="size-full rounded-2xl bg-card dark:bg-[#0e1322] flex items-center justify-center">
                  <span className="text-2xl font-extrabold text-foreground">
                    {initials(student.fullName)}
                  </span>
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 flex size-6 items-center justify-center rounded-full bg-emerald-500 text-white text-xs border-2 border-background shadow">
                ✓
              </span>
            </div>

            <h3 className="text-lg font-bold text-foreground">{student.fullName}</h3>
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-1.5 mt-1">
              <MailIcon className="size-3.5 text-primary/70" />
              <span>{student.email}</span>
            </p>
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-1.5 mt-1">
              <PhoneIcon className="size-3.5 text-primary/70" />
              <span>{student.phone}</span>
            </p>

            <div className="mt-3 flex justify-center">
              <StatusBadge status={student.verificationStatus} />
            </div>

            <div className="my-5 h-px bg-border/60" />

            <div className="space-y-3 text-left text-xs">
              <div className="flex items-center gap-2.5 rounded-xl border border-border/50 bg-muted/20 p-2.5">
                <MapPinIcon className="size-4 text-primary shrink-0" />
                <span className="text-foreground font-medium">{student.city}, {student.state}</span>
              </div>
              <div className="flex items-center gap-2.5 rounded-xl border border-border/50 bg-muted/20 p-2.5">
                <GraduationCapIcon className="size-4 text-primary shrink-0" />
                <span className="text-foreground font-medium truncate">{student.degree} — {student.branch}</span>
              </div>
              <div className="flex items-center gap-2.5 rounded-xl border border-border/50 bg-muted/20 p-2.5">
                <CalendarIcon className="size-4 text-primary shrink-0" />
                <span className="text-foreground font-medium">Graduation Class of {student.graduationYear}</span>
              </div>
            </div>

            {(student.linkedinUrl || student.githubUrl) && (
              <>
                <div className="my-5 h-px bg-border/60" />
                <div className="flex items-center justify-center gap-3">
                  {student.linkedinUrl && (
                    <a
                      href={student.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl border border-border/80 bg-muted/30 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-muted/60 transition-colors"
                    >
                      <LinkIcon className="size-3" /> LinkedIn
                    </a>
                  )}
                  {student.githubUrl && (
                    <a
                      href={student.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl border border-border/80 bg-muted/30 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-muted/60 transition-colors"
                    >
                      <LinkIcon className="size-3" /> GitHub
                    </a>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Profile Health Gauge */}
          <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-5 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-foreground">Profile Completeness</span>
              <span className="font-extrabold text-primary">{student.profileCompletion}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted/40 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-emerald-400 transition-all duration-500"
                style={{ width: `${student.profileCompletion}%` }}
              />
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              A 100% complete profile improves AI recommendation accuracy and priority consideration by 35%.
            </p>
          </div>
        </div>

        {/* Right Column — Details & Academic Pedigree */}
        <div className="space-y-5 lg:col-span-2">
          {/* Education */}
          <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-6">
            <div className="flex items-center gap-2 mb-4">
              <GraduationCapIcon className="size-4 text-primary" />
              <h3 className="text-base font-bold text-foreground">Academic Pedigree</h3>
            </div>
            <div className="space-y-3">
              {student.education.map((edu) => (
                <div
                  key={edu.id}
                  className="rounded-xl border border-border/60 bg-muted/20 p-4 transition-colors hover:border-primary/40"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-sm font-bold text-foreground">{edu.degree}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{edu.institution}</p>
                    </div>
                    {edu.isCurrently && (
                      <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400">
                        Current
                      </span>
                    )}
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span>
                      Cumulative CGPA: <strong className="text-foreground">{formatCGPA(edu.cgpa)}</strong> / 10.0
                    </span>
                    <span>·</span>
                    <span>{edu.startYear} – {edu.isCurrently ? "Present" : edu.endYear}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-6">
            <div className="flex items-center gap-2 mb-3">
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

          {/* Interests & Domains */}
          <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-6">
            <div className="flex items-center gap-2 mb-3">
              <HeartIcon className="size-4 text-rose-400" />
              <h3 className="text-base font-bold text-foreground">Core Interests & Domains</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {student.interests.map((interest) => (
                <span
                  key={interest}
                  className="rounded-xl border border-border/70 bg-muted/40 px-3 py-1 text-xs font-medium text-foreground/90"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Preferences */}
          <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-6">
            <div className="flex items-center gap-2 mb-4">
              <CompassIcon className="size-4 text-blue-400" />
              <h3 className="text-base font-bold text-foreground">Internship Matching Preferences</h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 text-xs">
              <div className="rounded-xl border border-border/60 bg-muted/20 p-3.5 space-y-2">
                <span className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px] block">
                  Preferred Cities
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {student.preferredLocations.map((loc) => (
                    <span
                      key={loc}
                      className="rounded-lg border border-border/60 bg-card px-2 py-0.5 text-xs font-medium text-foreground"
                    >
                      {loc}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-border/60 bg-muted/20 p-3.5 space-y-2">
                <span className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px] block">
                  Preferred Industry Sectors
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {student.preferredSectors.map((sec) => (
                    <span
                      key={sec}
                      className="rounded-lg border border-border/60 bg-card px-2 py-0.5 text-xs font-medium text-foreground"
                    >
                      {sec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-border/60 bg-muted/20 p-3.5 sm:col-span-2 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px] block">
                    Work Arrangement Preference
                  </span>
                  <span className="text-sm font-bold text-foreground mt-0.5 block">{student.workMode}</span>
                </div>
                <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  Flexible
                </span>
              </div>
            </div>
          </div>

          {/* Previous Internships */}
          {student.previousInternships && student.previousInternships.length > 0 && (
            <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-6">
              <div className="flex items-center gap-2 mb-4">
                <BriefcaseIcon className="size-4 text-emerald-400" />
                <h3 className="text-base font-bold text-foreground">Verified Prior Internships</h3>
              </div>
              <div className="space-y-3">
                {student.previousInternships.map((exp) => (
                  <div key={exp.id} className="rounded-xl border border-border/60 bg-muted/20 p-4 space-y-1.5">
                    <h4 className="text-sm font-bold text-foreground">{exp.role}</h4>
                    <p className="text-xs text-muted-foreground">
                      {exp.company} · {exp.duration} · {exp.year}
                    </p>
                    {exp.description && (
                      <p className="text-xs text-muted-foreground/90 mt-1 leading-relaxed">
                        {exp.description}
                      </p>
                    )}
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
