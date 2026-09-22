"use client";

import { MapPinIcon, ClockIcon, IndianRupeeIcon, UsersIcon } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { SearchInput } from "@/components/common/SearchInput";
import { FilterBar } from "@/components/common/FilterBar";
import { Pagination } from "@/components/common/Pagination";
import { EmptyState } from "@/components/common/EmptyState";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useInternships } from "@/hooks/useInternships";
import { formatStipendRange } from "@/lib/formatters";
import { LinkButton } from "@/components/ui/button";
import { sectors } from "@/data/sectors";
import { popularCities } from "@/data/locations";

const SECTOR_OPTIONS   = sectors.map((s) => ({ label: s, value: s }));
const LOCATION_OPTIONS = popularCities.map((c) => ({ label: c, value: c }));
const WORKMODE_OPTIONS = [
  { label: "Remote",  value: "Remote"  },
  { label: "Hybrid",  value: "Hybrid"  },
  { label: "On-site", value: "On-site" },
];
const DURATION_OPTIONS = [
  { label: "1 Month",  value: "1 Month"  },
  { label: "2 Months", value: "2 Months" },
  { label: "3 Months", value: "3 Months" },
  { label: "4 Months", value: "4 Months" },
  { label: "6 Months", value: "6 Months" },
];

export default function InternshipsPage() {
  const {
    internships, filters, updateFilter, clearFilters,
    page, setPage, totalPages, total,
  } = useInternships();

  return (
    <div className="space-y-5">
      <PageHeader
        title="Browse Internships"
        description={`${total} active internship${total !== 1 ? "s" : ""} available`}
      />

      {/* Search + Filters */}
      <div className="space-y-3">
        <SearchInput
          value={filters.search}
          onChange={(v) => updateFilter("search", v)}
          placeholder="Search by title, company, or sector…"
          className="max-w-md"
        />
        <FilterBar
          filters={[
            { key: "sector",   placeholder: "All Sectors",   options: SECTOR_OPTIONS   },
            { key: "location", placeholder: "All Locations", options: LOCATION_OPTIONS },
            { key: "workMode", placeholder: "Work Mode",     options: WORKMODE_OPTIONS },
            { key: "duration", placeholder: "Duration",      options: DURATION_OPTIONS },
          ]}
          values={filters}
          onChange={updateFilter}
          onClear={clearFilters}
        />
      </div>

      {/* Grid */}
      {internships.length === 0 ? (
        <EmptyState
          title="No internships found"
          description="Try adjusting your filters or search query."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {internships.map((i) => (
            <Card key={i.id} className="flex flex-col hover:shadow-md transition-shadow">
              <CardContent className="flex flex-1 flex-col p-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">{i.title}</p>
                    <p className="text-xs text-muted-foreground">{i.companyName}</p>
                  </div>
                  <Badge variant="secondary" className="shrink-0 text-xs">{i.workMode}</Badge>
                </div>

                {/* Meta */}
                <div className="mt-3 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPinIcon className="size-3.5 shrink-0" />
                    {i.city}, {i.state}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <IndianRupeeIcon className="size-3.5 shrink-0" />
                    {formatStipendRange(i.stipendMin, i.stipendMax)} / month
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <ClockIcon className="size-3.5 shrink-0" />
                    {i.duration}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <UsersIcon className="size-3.5 shrink-0" />
                    {i.availableSeats} seat{i.availableSeats !== 1 ? "s" : ""} available
                  </div>
                </div>

                {/* Skills */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {i.requiredSkills.slice(0, 3).map((s) => (
                    <Badge key={s} variant="outline" className="text-xs">{s}</Badge>
                  ))}
                  {i.requiredSkills.length > 3 && (
                    <Badge variant="outline" className="text-xs">+{i.requiredSkills.length - 3}</Badge>
                  )}
                </div>

                {/* Footer */}
                <div className="mt-4 flex items-center justify-between gap-2 pt-3 border-t border-border/50">
                  <span className="text-xs text-muted-foreground">Min CGPA: {i.minimumCGPA}</span>
                  <LinkButton
                    href={`/student/internships/${i.id}`}
                    size="sm"
                    variant="outline"
                  >
                    View Details
                  </LinkButton>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
