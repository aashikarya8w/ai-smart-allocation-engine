"use client";

import { useState } from "react";
import {
  MapPinIcon,
  ClockIcon,
  IndianRupeeIcon,
  UsersIcon,
  SparklesIcon,
  Building2Icon,
  BriefcaseIcon,
  ArrowRightIcon,
  BookmarkIcon,
  CheckCircle2Icon,
  SlidersHorizontalIcon,
  XIcon
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { SearchInput } from "@/components/common/SearchInput";
import { FilterBar } from "@/components/common/FilterBar";
import { Pagination } from "@/components/common/Pagination";
import { EmptyState } from "@/components/common/EmptyState";
import { Badge } from "@/components/ui/badge";
import { useInternships } from "@/hooks/useInternships";
import { formatStipendRange } from "@/lib/formatters";
import { LinkButton } from "@/components/ui/button";
import { sectors } from "@/data/sectors";
import { popularCities } from "@/data/locations";

const SECTOR_OPTIONS = sectors.map((s) => ({ label: s, value: s }));
const LOCATION_OPTIONS = popularCities.map((c) => ({ label: c, value: c }));
const WORKMODE_OPTIONS = [
  { label: "Remote", value: "Remote" },
  { label: "Hybrid", value: "Hybrid" },
  { label: "On-site", value: "On-site" },
];
const DURATION_OPTIONS = [
  { label: "1 Month", value: "1 Month" },
  { label: "2 Months", value: "2 Months" },
  { label: "3 Months", value: "3 Months" },
  { label: "4 Months", value: "4 Months" },
  { label: "6 Months", value: "6 Months" },
];

const WORKMODE_BADGE_STYLE: Record<string, string> = {
  Remote: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Hybrid: "bg-purple-500/15 text-purple-400 border-purple-500/30",
  "On-site": "bg-blue-500/15 text-blue-400 border-blue-500/30",
};

export default function InternshipsPage() {
  const {
    internships,
    filters,
    updateFilter,
    clearFilters,
    page,
    setPage,
    totalPages,
    total,
  } = useInternships();

  const [savedIds, setSavedIds] = useState<Record<string, boolean>>({});

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSavedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <PageHeader
        title="Browse Internships"
        description={`Explore ${total} verified corporate and enterprise internships curated for your profile.`}
      />

      {/* Cyber Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent p-6 shadow-xl shadow-primary/5 backdrop-blur-md">
        <div className="absolute -right-10 -top-10 size-48 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-md">
              <SparklesIcon className="size-3.5 text-primary" />
              <span>Smart Candidate Opportunity Matching</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Direct Access to Top Tech, AI & Core Engineering Roles
            </h2>
            <p className="max-w-2xl text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Every internship listed adheres to government minimum stipend standards, structured mentorship milestones, and verified corporate work credentials.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 shrink-0 sm:flex sm:items-center">
            <div className="rounded-xl border border-border/70 bg-card/60 p-3 text-center backdrop-blur-sm">
              <span className="text-xs text-muted-foreground block">Verified Stipends</span>
              <span className="text-sm font-bold text-foreground">₹15k – ₹40k</span>
            </div>
            <div className="rounded-xl border border-border/70 bg-card/60 p-3 text-center backdrop-blur-sm">
              <span className="text-xs text-muted-foreground block">Active Listings</span>
              <span className="text-sm font-bold text-primary">{total} Openings</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Filter & Search Hub */}
      <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/85 dark:bg-[#0e1322]/85 p-5 backdrop-blur-md space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1 max-w-lg">
            <SearchInput
              value={filters.search}
              onChange={(v) => updateFilter("search", v)}
              placeholder="Search by role, company name, skill, or sector..."
              className="w-full"
            />
          </div>

          <div className="flex items-center gap-2">
            {(filters.search || filters.sector || filters.location || filters.workMode || filters.duration) && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/20 transition-all"
              >
                <XIcon className="size-3.5" />
                Reset Filters
              </button>
            )}
            <span className="text-xs font-medium text-muted-foreground">
              Showing {internships.length} results
            </span>
          </div>
        </div>

        <FilterBar
          filters={[
            { key: "sector", placeholder: "All Sectors", options: SECTOR_OPTIONS },
            { key: "location", placeholder: "All Locations", options: LOCATION_OPTIONS },
            { key: "workMode", placeholder: "Work Mode", options: WORKMODE_OPTIONS },
            { key: "duration", placeholder: "Duration", options: DURATION_OPTIONS },
          ]}
          values={filters}
          onChange={updateFilter}
          onClear={clearFilters}
        />
      </div>

      {/* Internships Grid */}
      {internships.length === 0 ? (
        <EmptyState
          title="No internships match your search"
          description="Try broadening your filters, searching for alternate keywords, or clearing your current filter set."
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {internships.map((i) => {
            const isSaved = !!savedIds[i.id];
            const workModeStyle = WORKMODE_BADGE_STYLE[i.workMode] || "bg-primary/10 text-primary border-primary/20";
            const initial = i.companyName?.slice(0, 2).toUpperCase() || "TN";

            return (
              <div
                key={i.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-5 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_12px_36px_rgba(0,0,0,0.18)]"
              >
                {/* Glow highlight on hover */}
                <div className="absolute -top-12 -right-12 size-28 rounded-full bg-primary/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <div>
                  {/* Top Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 border border-primary/25 text-primary font-bold text-sm shrink-0 shadow-sm">
                        {initial}
                      </div>
                      <div className="min-w-0">
                        <h3 className="truncate text-base font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">
                          {i.title}
                        </h3>
                        <p className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                          <Building2Icon className="size-3.5 text-primary/70 shrink-0" />
                          <span className="truncate font-medium text-foreground/80">{i.companyName}</span>
                          <CheckCircle2Icon className="size-3 text-emerald-400 shrink-0" title="Verified Employer" />
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => toggleSave(i.id, e)}
                      className={`flex size-8 items-center justify-center rounded-xl border transition-all shrink-0 ${
                        isSaved
                          ? "border-primary bg-primary text-primary-foreground shadow-sm"
                          : "border-border/80 bg-background/50 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                      }`}
                      title={isSaved ? "Saved" : "Save Internship"}
                    >
                      <BookmarkIcon className={`size-4 ${isSaved ? "fill-current" : ""}`} />
                    </button>
                  </div>

                  {/* WorkMode & Sector Badges */}
                  <div className="mt-3.5 flex flex-wrap items-center gap-1.5">
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${workModeStyle}`}>
                      {i.workMode}
                    </span>
                    {i.sector && (
                      <span className="inline-flex items-center rounded-full border border-border/80 bg-muted/40 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                        {i.sector}
                      </span>
                    )}
                  </div>

                  {/* Details Grid */}
                  <div className="mt-4 grid grid-cols-2 gap-2.5 text-xs">
                    <div className="flex items-center gap-2 rounded-xl border border-border/50 bg-muted/20 p-2 text-muted-foreground">
                      <MapPinIcon className="size-3.5 text-primary shrink-0" />
                      <span className="truncate">{i.city}, {i.state}</span>
                    </div>

                    <div className="flex items-center gap-2 rounded-xl border border-border/50 bg-muted/20 p-2 text-muted-foreground">
                      <ClockIcon className="size-3.5 text-primary shrink-0" />
                      <span className="truncate">{i.duration}</span>
                    </div>

                    <div className="flex items-center gap-2 rounded-xl border border-border/50 bg-muted/20 p-2 text-muted-foreground">
                      <IndianRupeeIcon className="size-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate font-semibold text-foreground">
                        {formatStipendRange(i.stipendMin, i.stipendMax)}/mo
                      </span>
                    </div>

                    <div className="flex items-center gap-2 rounded-xl border border-border/50 bg-muted/20 p-2 text-muted-foreground">
                      <UsersIcon className="size-3.5 text-blue-400 shrink-0" />
                      <span className="truncate font-semibold text-foreground">
                        {i.availableSeats} seat{i.availableSeats !== 1 ? "s" : ""} left
                      </span>
                    </div>
                  </div>

                  {/* Skills Chips */}
                  <div className="mt-3.5 flex flex-wrap gap-1.5">
                    {i.requiredSkills.slice(0, 3).map((s) => (
                      <span
                        key={s}
                        className="rounded-lg border border-border/60 bg-muted/30 px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                      >
                        {s}
                      </span>
                    ))}
                    {i.requiredSkills.length > 3 && (
                      <span className="rounded-lg border border-border/60 bg-muted/30 px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                        +{i.requiredSkills.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="mt-5 flex items-center justify-between gap-3 pt-3.5 border-t border-border/60">
                  <span className="text-[11px] font-medium text-muted-foreground">
                    Min CGPA: <strong className="text-foreground">{i.minimumCGPA}</strong>
                  </span>

                  <LinkButton
                    href={`/student/internships/${i.id}`}
                    size="sm"
                    className="gap-1.5 rounded-xl font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20"
                  >
                    <span>View Role</span>
                    <ArrowRightIcon className="size-3.5" />
                  </LinkButton>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Controls */}
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
