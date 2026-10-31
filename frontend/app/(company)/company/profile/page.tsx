"use client";

import {
  MapPinIcon,
  GlobeIcon,
  PhoneIcon,
  MailIcon,
  BuildingIcon,
  ShieldCheckIcon,
  SparklesIcon,
  BriefcaseIcon,
  UsersIcon,
  Building2Icon,
  CheckCircle2Icon
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useCompany } from "@/hooks/useCompany";
import { EmptyState } from "@/components/common/EmptyState";
import { LinkButton } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";
import { initials } from "@/lib/formatters";

export default function CompanyProfilePage() {
  const { company, stats } = useCompany();

  if (!company) return <EmptyState title="Company profile not found" />;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Corporate Enterprise Profile"
        description="Public employer brand, verified accreditation, and national capacity quota."
      >
        <LinkButton
          href={ROUTES.company.settings}
          size="sm"
          className="rounded-xl font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20"
        >
          Edit Company Profile
        </LinkButton>
      </PageHeader>

      {/* Cyber Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent p-6 shadow-xl shadow-primary/5 backdrop-blur-md">
        <div className="absolute -right-10 -top-10 size-48 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-md">
              <ShieldCheckIcon className="size-3.5 text-primary" />
              <span>Accredited Tier-1 Industry Partner</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              {company.companyName} · {company.sector}
            </h2>
            <p className="max-w-2xl text-xs sm:text-sm text-muted-foreground leading-relaxed">
              MCA registered entity offering structured engineering internships in compliance with national stipend regulations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-400">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              Corporate Accreditation: Active
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: Brand Identity & Verified Metrics */}
        <div className="space-y-5">
          <div className="relative overflow-hidden rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-6 text-center shadow-xl">
            <div className="relative mx-auto size-24 mb-4">
              <div className="size-full rounded-2xl bg-gradient-to-tr from-primary to-blue-500 p-0.5 shadow-lg shadow-primary/20">
                <div className="size-full rounded-2xl bg-card dark:bg-[#0e1322] flex items-center justify-center">
                  <span className="text-2xl font-extrabold text-foreground">
                    {initials(company.companyName)}
                  </span>
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 flex size-6 items-center justify-center rounded-full bg-emerald-500 text-white text-xs border-2 border-background shadow">
                ✓
              </span>
            </div>

            <h3 className="text-lg font-bold text-foreground">{company.companyName}</h3>
            <p className="text-xs text-primary font-semibold mt-0.5">{company.sector}</p>

            <div className="mt-3 flex justify-center">
              <StatusBadge status={company.verificationStatus} />
            </div>

            <div className="my-5 h-px bg-border/60" />

            <div className="space-y-3 text-left text-xs">
              <div className="flex items-center gap-2.5 rounded-xl border border-border/50 bg-muted/20 p-2.5">
                <MapPinIcon className="size-4 text-primary shrink-0" />
                <span className="text-foreground font-medium">{company.city}, {company.state}</span>
              </div>
              <div className="flex items-center gap-2.5 rounded-xl border border-border/50 bg-muted/20 p-2.5">
                <PhoneIcon className="size-4 text-primary shrink-0" />
                <span className="text-foreground font-medium">{company.phone}</span>
              </div>
              <div className="flex items-center gap-2.5 rounded-xl border border-border/50 bg-muted/20 p-2.5">
                <MailIcon className="size-4 text-primary shrink-0" />
                <span className="text-foreground font-medium truncate">{company.email}</span>
              </div>
              {company.website && (
                <div className="flex items-center gap-2.5 rounded-xl border border-border/50 bg-muted/20 p-2.5">
                  <GlobeIcon className="size-4 text-primary shrink-0" />
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium truncate"
                  >
                    {company.website}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-2.5 rounded-xl border border-border/50 bg-muted/20 p-2.5">
                <BuildingIcon className="size-4 text-primary shrink-0" />
                <span className="text-foreground font-medium">Established in {company.establishedYear}</span>
              </div>
            </div>
          </div>

          {/* Placement Volume Cards */}
          <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-5 shadow-xl space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-border/60 pb-2">
              National Placement Capacity
            </h4>

            {[
              { label: "Total Openings Posted", value: `${company.totalInternships} Listings` },
              { label: "Active Roles", value: `${company.activeInternships} Live` },
              { label: "Allocated Seat Quotas", value: `${company.allocatedSeats} of ${company.totalSeats} Seats` },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{label}</span>
                <span className="font-bold text-foreground">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: About & Organization Overview */}
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-6 shadow-xl space-y-3">
            <h3 className="text-base font-bold text-foreground">About the Enterprise</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {company.description}
            </p>
          </div>

          <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-foreground">Accreditation & Compliance Safeguards</h3>
            <div className="grid gap-3 sm:grid-cols-2 text-xs">
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 space-y-1">
                <span className="font-bold text-emerald-400 block">✓ Minimum Stipend Certified</span>
                <p className="text-muted-foreground">Compliant with AICTE/National Apprenticeship norms.</p>
              </div>
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 space-y-1">
                <span className="font-bold text-emerald-400 block">✓ Biometric Smart Check-In</span>
                <p className="text-muted-foreground">GPS geofenced and RFID turnstile authentication supported.</p>
              </div>
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 space-y-1">
                <span className="font-bold text-emerald-400 block">✓ Structured Mentor Reviews</span>
                <p className="text-muted-foreground">Certified evaluations award university course credits.</p>
              </div>
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 space-y-1">
                <span className="font-bold text-emerald-400 block">✓ Affirmative Quota Partner</span>
                <p className="text-muted-foreground">Participates in social equity and regional inclusion rounds.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
