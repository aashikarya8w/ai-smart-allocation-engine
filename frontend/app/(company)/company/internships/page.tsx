"use client";

import {
  PlusIcon,
  UsersIcon,
  MapPinIcon,
  ClockIcon,
  BriefcaseIcon,
  Building2Icon,
  SparklesIcon,
  ArrowRightIcon,
  IndianRupeeIcon,
  CalendarIcon,
  CheckCircle2Icon
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { EmptyState } from "@/components/common/EmptyState";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { useCompany } from "@/hooks/useCompany";
import { formatStipendRange, formatDate } from "@/lib/formatters";
import { ROUTES } from "@/lib/constants";

export default function CompanyInternshipsPage() {
  const { internships } = useCompany();

  const totalApplications = internships.reduce((acc, i) => acc + (i.totalApplications || 0), 0);
  const totalSeats = internships.reduce((acc, i) => acc + (i.seats || 0), 0);
  const availableSeats = internships.reduce((acc, i) => acc + (i.availableSeats || 0), 0);
  const filledSeats = totalSeats - availableSeats;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Corporate Internship Listings"
        description={`Manage and track ${internships.length} corporate internship listing${internships.length !== 1 ? "s" : ""} across departments.`}
      >
        <LinkButton
          href={ROUTES.company.createInternship}
          size="sm"
          className="gap-2 rounded-xl font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20"
        >
          <PlusIcon className="size-4" /> Post New Internship
        </LinkButton>
      </PageHeader>

      {/* Corporate Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent p-6 shadow-xl shadow-primary/5 backdrop-blur-md">
        <div className="absolute -right-10 -top-10 size-48 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-md">
              <Building2Icon className="size-3.5 text-primary" />
              <span>Enterprise Talent Recruitment Engine</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Direct Pipeline for High-Caliber Student Talent
            </h2>
            <p className="max-w-2xl text-xs sm:text-sm text-muted-foreground leading-relaxed">
              InternAI automatically scores and ranks candidate profiles using verified skill metrics, course credentials, and assessment results so you hire with certainty.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 shrink-0 sm:flex sm:items-center">
            <div className="rounded-xl border border-border/70 bg-card/60 p-3 text-center backdrop-blur-sm">
              <span className="text-xs text-muted-foreground block">Active Applications</span>
              <span className="text-sm font-bold text-foreground">{totalApplications} Inflow</span>
            </div>
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-center backdrop-blur-sm">
              <span className="text-xs text-emerald-400 block">Filled Capacity</span>
              <span className="text-sm font-bold text-emerald-400">{filledSeats}/{totalSeats} Seats</span>
            </div>
          </div>
        </div>
      </div>

      {/* Listings List */}
      {internships.length === 0 ? (
        <EmptyState
          title="No internships posted yet"
          description="Create your first internship listing to begin receiving AI-ranked candidate applications."
        />
      ) : (
        <div className="space-y-4">
          {internships.map((i) => {
            const seatsOccupied = (i.seats || 0) - (i.availableSeats || 0);
            const occupancyPct = i.seats ? Math.round((seatsOccupied / i.seats) * 100) : 0;

            return (
              <div
                key={i.id}
                className="group relative overflow-hidden rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-xl"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  {/* Left Column: Role Details */}
                  <div className="space-y-3 flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-base font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">
                        {i.title}
                      </h3>
                      <StatusBadge status={i.status} />
                      <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                        {i.workMode}
                      </span>
                    </div>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <MapPinIcon className="size-3.5 text-primary shrink-0" />
                        <span className="truncate">{i.city}, {i.state}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <ClockIcon className="size-3.5 text-primary shrink-0" />
                        <span>{i.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <IndianRupeeIcon className="size-3.5 text-emerald-400 shrink-0" />
                        <span className="font-semibold text-foreground">
                          {formatStipendRange(i.stipendMin, i.stipendMax)}/mo
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <CalendarIcon className="size-3.5 text-primary shrink-0" />
                        <span className="truncate">{formatDate(i.startDate)} – {formatDate(i.endDate)}</span>
                      </div>
                    </div>

                    {/* Capacity Progress Bar */}
                    <div className="space-y-1.5 pt-1 max-w-md">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground font-medium flex items-center gap-1.5">
                          <UsersIcon className="size-3.5 text-blue-400" />
                          <span>{i.totalApplications} applied · {i.availableSeats} of {i.seats} seats available</span>
                        </span>
                        <span className="font-semibold text-foreground">{occupancyPct}% filled</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted/40 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-primary to-emerald-400 transition-all duration-500"
                          style={{ width: `${occupancyPct}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center gap-2.5 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-border/60">
                    <LinkButton
                      href={`/company/internships/${i.id}/applicants`}
                      size="sm"
                      className="gap-1.5 rounded-xl font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20"
                    >
                      <UsersIcon className="size-3.5" />
                      <span>Review Applicants ({i.totalApplications})</span>
                    </LinkButton>

                    <LinkButton
                      href={`/company/internships/${i.id}`}
                      variant="outline"
                      size="sm"
                      className="rounded-xl border-border/80 hover:bg-muted/50"
                    >
                      View Listing
                    </LinkButton>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
