"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeftIcon, MapPinIcon, GlobeIcon, PhoneIcon,
  Building2Icon, CheckCircle2Icon, XCircleIcon, BriefcaseIcon,
  UsersIcon, AwardIcon, CalendarIcon,
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import { mockCompanies } from "@/data/companies";
import { mockInternships } from "@/data/internships";
import { initials } from "@/lib/formatters";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function AdminCompanyDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const company = mockCompanies.find((c) => c.id === id);
  const companyInternships = mockInternships.filter((i) => i.companyId === id);

  if (!company) return <EmptyState title="Company record not found" />;

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
          <h2 className="text-xl font-black text-foreground">Enterprise Host Dossier</h2>
          <p className="text-xs text-muted-foreground">{company.companyName} · ID: {company.id}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Col: Company Summary & Directives */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-6 shadow-xl backdrop-blur-md text-center space-y-4">
            <div className="mx-auto size-20 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-amber-500/25">
              {initials(company.companyName)}
            </div>

            <div>
              <h3 className="text-lg font-bold text-foreground">{company.companyName}</h3>
              <p className="text-xs text-primary font-semibold mt-0.5">{company.sector}</p>
              <div className="mt-3 flex justify-center">
                <StatusBadge status={company.verificationStatus} />
              </div>
            </div>

            <div className="pt-4 border-t border-border/40 dark:border-white/5 space-y-2.5 text-xs text-left text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPinIcon className="size-3.5 text-primary shrink-0" />
                <span className="text-foreground">{company.city}, {company.state}</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneIcon className="size-3.5 text-primary shrink-0" />
                <span className="text-foreground">{company.phone}</span>
              </div>
              {company.website && (
                <div className="flex items-center gap-2">
                  <GlobeIcon className="size-3.5 text-primary shrink-0" />
                  <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline truncate">
                    {company.website}
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-5 shadow-xl backdrop-blur-md space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Governance Directives</h4>
            <Button
              size="sm"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs active:scale-95"
              disabled={company.verificationStatus === "Verified"}
            >
              <CheckCircle2Icon className="h-4 w-4 mr-1.5" />
              Authorize Enterprise Accreditation
            </Button>
            <Button
              size="sm"
              variant="destructive"
              className="w-full text-xs font-semibold active:scale-95"
              disabled={company.verificationStatus === "Rejected"}
            >
              <XCircleIcon className="h-4 w-4 mr-1.5" />
              Revoke / Reject Profile
            </Button>
          </div>
        </div>

        {/* Right 2 Cols: About, Stats, Internships */}
        <div className="space-y-6 lg:col-span-2">
          {/* About */}
          <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-6 shadow-xl backdrop-blur-md space-y-2">
            <h4 className="text-base font-bold text-foreground">Corporate Mission & Profile</h4>
            <p className="text-sm text-foreground/85 leading-relaxed font-normal">{company.description}</p>
          </div>

          {/* Stats Matrix */}
          <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-6 shadow-xl backdrop-blur-md space-y-3">
            <h4 className="text-base font-bold text-foreground">Operational Capacity Metrics</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                ["Total Listings", company.totalInternships],
                ["Active Vacancies", company.activeInternships],
                ["Sanctioned Seats", company.totalSeats],
                ["Allocated Seats", company.allocatedSeats],
                ["Staff Workforce", company.employeeCount],
                ["Year Founded", company.establishedYear],
              ].map(([label, val]) => (
                <div key={String(label)} className="p-3 rounded-xl bg-muted/40 dark:bg-white/[0.02] border border-border/40 dark:border-white/5">
                  <p className="text-[11px] text-muted-foreground uppercase font-semibold">{label}</p>
                  <p className="text-base font-extrabold text-foreground mt-0.5">{val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Internship Opportunities */}
          <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-6 shadow-xl backdrop-blur-md space-y-3">
            <h4 className="text-base font-bold text-foreground">Registered Internship Programs ({companyInternships.length})</h4>
            <div className="space-y-2.5">
              {companyInternships.map((i) => (
                <div
                  key={i.id}
                  className="flex items-center justify-between rounded-xl border border-border/50 dark:border-white/5 bg-muted/20 dark:bg-white/[0.01] p-3.5 hover:border-primary/40 transition-colors"
                >
                  <div>
                    <p className="text-sm font-bold text-foreground">{i.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {i.seats} Seats Quota · {i.duration} · {i.workMode}
                    </p>
                  </div>
                  <StatusBadge status={i.status} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
