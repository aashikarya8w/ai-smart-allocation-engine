"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeftIcon, MapPinIcon, ClockIcon, IndianRupeeIcon, UsersIcon,
  BriefcaseIcon, Building2Icon, CheckCircle2Icon, XCircleIcon,
  SparklesIcon, UserIcon, ArrowRightIcon, ShieldCheckIcon,
} from "lucide-react";
import { StatusBadge } from "@/components/common/StatusBadge";
import { EmptyState } from "@/components/common/EmptyState";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockInternships } from "@/data/internships";
import { mockApplications } from "@/data/applications";
import { formatDate, formatStipendRange } from "@/lib/formatters";
import Link from "next/link";
import { ROUTES } from "@/lib/constants";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function AdminInternshipDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const internship = mockInternships.find((i) => i.id === id);
  const apps = mockApplications.filter((a) => a.internshipId === id);

  if (!internship) return <EmptyState title="Internship opportunity not found" />;

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
          <h2 className="text-xl font-black text-foreground">Opportunity Dossier</h2>
          <p className="text-xs text-muted-foreground">{internship.companyName} · ID: {internship.id}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left 2 Cols: Main Dossier */}
        <div className="space-y-6 lg:col-span-2">
          {/* Main Card */}
          <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-6 shadow-xl backdrop-blur-md">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-border/50 dark:border-white/5">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-extrabold text-lg shadow-lg shadow-amber-500/20">
                  {internship.companyName.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">{internship.title}</h3>
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                    <Building2Icon className="h-3.5 w-3.5 text-primary" />
                    <span>Host Entity: <strong className="text-foreground">{internship.companyName}</strong></span>
                  </div>
                </div>
              </div>
              <StatusBadge status={internship.status} />
            </div>

            {/* Metric pill tiles */}
            <div className="grid sm:grid-cols-2 gap-4 py-5 border-b border-border/50 dark:border-white/5">
              {[
                { icon: MapPinIcon, label: "Workplace Location", value: `${internship.city}, ${internship.state}` },
                { icon: ClockIcon, label: "Engagement Duration", value: internship.duration },
                {
                  icon: IndianRupeeIcon,
                  label: "Approved Stipend",
                  value: `${formatStipendRange(internship.stipendMin, internship.stipendMax)} / month`,
                },
                {
                  icon: UsersIcon,
                  label: "Authorized Quota",
                  value: `${internship.availableSeats} of ${internship.seats} seats available`,
                },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="p-3 rounded-xl bg-muted/40 dark:bg-white/[0.02] border border-border/40 dark:border-white/5 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-4 shrink-0" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="text-sm font-semibold text-foreground mt-0.5">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="py-5 border-b border-border/50 dark:border-white/5">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Scope & Role Description</p>
              <p className="text-sm text-foreground/90 leading-relaxed font-normal">{internship.description}</p>
            </div>

            {/* Required Skills */}
            <div className="pt-5">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Required Technical Capabilities</p>
              <div className="flex flex-wrap gap-2">
                {internship.requiredSkills.map((s) => (
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

          {/* Applications list */}
          <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-6 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between pb-4 border-b border-border/50 dark:border-white/5">
              <h4 className="text-base font-bold text-foreground">Registered Applicants ({apps.length})</h4>
              <span className="text-xs text-muted-foreground">Sorted by Match Precision</span>
            </div>

            <div className="pt-4 space-y-3">
              {apps.length === 0 ? (
                <p className="text-xs text-muted-foreground py-4 text-center">No candidate applications registered yet for this opportunity.</p>
              ) : (
                apps.map((a) => (
                  <div
                    key={a.id}
                    className="flex items-center justify-between rounded-xl border border-border/50 dark:border-white/5 bg-muted/20 dark:bg-white/[0.01] p-3.5 hover:border-primary/40 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                        {a.studentName.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{a.studentName}</p>
                        <p className="text-xs text-muted-foreground">Applied {formatDate(a.appliedAt)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {a.matchScore}% Match
                      </span>
                      <StatusBadge status={a.status} />
                      <Link
                        href={`${ROUTES.admin.applications}/${a.id}`}
                        className="text-primary hover:text-primary/80"
                      >
                        <ArrowRightIcon className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Col: Admin Controls & Eligibility */}
        <div className="space-y-6">
          {/* Governance Action Card */}
          <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-6 shadow-xl backdrop-blur-md space-y-3">
            <h4 className="text-sm font-bold text-foreground mb-2">Governance Directives</h4>
            {internship.status === "Pending" && (
              <>
                <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold shadow-md active:scale-95" size="sm">
                  <CheckCircle2Icon className="h-4 w-4 mr-1.5" />
                  Grant Approval
                </Button>
                <Button variant="destructive" size="sm" className="w-full font-semibold active:scale-95">
                  <XCircleIcon className="h-4 w-4 mr-1.5" />
                  Reject Posting
                </Button>
              </>
            )}
            {internship.status === "Active" && (
              <Button variant="destructive" size="sm" className="w-full font-semibold active:scale-95">
                Close Posting (Freeze Intake)
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              className="w-full border-white/10 hover:bg-white/5 active:scale-95"
              onClick={() => router.back()}
            >
              Back to Catalog
            </Button>
          </div>

          {/* Scheme Criteria */}
          <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-6 shadow-xl backdrop-blur-md space-y-4">
            <h4 className="text-sm font-bold text-foreground border-b border-border/50 dark:border-white/5 pb-3">
              Eligibility & Accreditations
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-border/30 dark:border-white/5">
                <span className="text-muted-foreground">Qualification Baseline</span>
                <span className="font-semibold text-foreground">{internship.qualification}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/30 dark:border-white/5">
                <span className="text-muted-foreground">Minimum CGPA</span>
                <span className="font-semibold text-foreground">{internship.minimumCGPA} / 10.0</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/30 dark:border-white/5">
                <span className="text-muted-foreground">Industry Sector</span>
                <span className="font-semibold text-foreground">{internship.sector}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground">Work Arrangement</span>
                <span className="font-semibold text-foreground">{internship.workMode}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
