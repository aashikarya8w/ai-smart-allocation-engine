"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeftIcon, GraduationCapIcon, MailIcon, MapPinIcon,
  CalendarIcon, AwardIcon, CheckCircle2Icon, XCircleIcon,
  ShieldCheckIcon, Building2Icon, ArrowRightIcon,
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { EmptyState } from "@/components/common/EmptyState";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockStudents } from "@/data/students";
import { mockApplications } from "@/data/applications";
import { mockAllocations } from "@/data/allocations";
import { formatDate, formatCGPA, initials } from "@/lib/formatters";
import Link from "next/link";
import { ROUTES } from "@/lib/constants";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function AdminStudentDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const student = mockStudents.find((s) => s.id === id);
  const apps = mockApplications.filter((a) => a.studentId === id);
  const allocs = mockAllocations.filter((a) => a.studentId === id);

  if (!student) return <EmptyState title="Scholar record not found" />;

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
          <h2 className="text-xl font-black text-foreground">Scholar Dossier & History</h2>
          <p className="text-xs text-muted-foreground">{student.fullName} · ID: {student.id}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Col: Scholar Profile Card & Quick Actions */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-6 shadow-xl backdrop-blur-md text-center space-y-4">
            <div className="mx-auto size-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-primary/25">
              {initials(student.fullName)}
            </div>

            <div>
              <h3 className="text-lg font-bold text-foreground">{student.fullName}</h3>
              <p className="text-xs text-muted-foreground font-mono mt-0.5">{student.email}</p>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                <StatusBadge status={student.verificationStatus} />
                {!student.isActive && <StatusBadge status="Inactive" />}
              </div>
            </div>

            <div className="pt-4 border-t border-border/40 dark:border-white/5 grid grid-cols-2 gap-2 text-xs text-left">
              {[
                ["University", student.university],
                ["Branch", student.branch],
                ["CGPA", formatCGPA(student.cgpa)],
                ["Grad Year", student.graduationYear.toString()],
                ["City", student.city],
                ["State", student.state],
              ].map(([label, val]) => (
                <div key={label} className="p-2.5 rounded-xl bg-muted/40 dark:bg-white/[0.02] border border-border/40 dark:border-white/5">
                  <p className="text-muted-foreground text-[10px] uppercase font-semibold">{label}</p>
                  <p className="font-bold text-foreground mt-0.5 truncate">{val}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-5 shadow-xl backdrop-blur-md space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Scholar Directives</h4>
            <Button size="sm" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs active:scale-95">
              <CheckCircle2Icon className="h-4 w-4 mr-1.5" />
              Verify Scholar Profile
            </Button>
            <Button size="sm" variant="destructive" className="w-full text-xs font-semibold active:scale-95">
              <XCircleIcon className="h-4 w-4 mr-1.5" />
              Suspend Scholar Account
            </Button>
          </div>
        </div>

        {/* Right 2 Cols: Skills, Applications, Allocations */}
        <div className="space-y-6 lg:col-span-2">
          {/* Skills */}
          <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-6 shadow-xl backdrop-blur-md space-y-3">
            <h4 className="text-base font-bold text-foreground">Verified Repertoire & Skill Badges</h4>
            <div className="flex flex-wrap gap-2">
              {student.skills.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1 rounded-xl text-xs font-bold bg-primary/10 border border-primary/25 text-primary"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Applications */}
          <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-6 shadow-xl backdrop-blur-md space-y-3">
            <h4 className="text-base font-bold text-foreground">Applications Registered ({apps.length})</h4>
            <div className="space-y-2.5">
              {apps.length === 0 ? (
                <p className="text-xs text-muted-foreground py-2">No applications registered by this candidate.</p>
              ) : (
                apps.map((a) => (
                  <div
                    key={a.id}
                    className="flex items-center justify-between rounded-xl border border-border/50 dark:border-white/5 bg-muted/20 dark:bg-white/[0.01] p-3 hover:border-primary/40 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-bold text-foreground">{a.internshipTitle}</p>
                      <p className="text-xs text-muted-foreground">{a.companyName} · {formatDate(a.appliedAt)}</p>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-bold text-primary">{a.matchScore}% Match</span>
                      <StatusBadge status={a.status} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Allocations */}
          <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-6 shadow-xl backdrop-blur-md space-y-3">
            <h4 className="text-base font-bold text-foreground">Approved Seat Allocations ({allocs.length})</h4>
            <div className="space-y-2.5">
              {allocs.length === 0 ? (
                <p className="text-xs text-muted-foreground py-2">No confirmed allocations for this candidate yet.</p>
              ) : (
                allocs.map((a) => (
                  <div
                    key={a.id}
                    className="flex items-center justify-between rounded-xl border border-border/50 dark:border-white/5 bg-muted/20 dark:bg-white/[0.01] p-3 hover:border-primary/40 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-bold text-foreground">{a.internshipTitle}</p>
                      <p className="text-xs text-muted-foreground">{a.companyName}</p>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-bold text-emerald-400">{a.matchScore}% Score</span>
                      <StatusBadge status={a.status} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
