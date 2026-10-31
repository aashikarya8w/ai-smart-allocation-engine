"use client";

import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { SearchInput } from "@/components/common/SearchInput";
import { StatusBadge } from "@/components/common/StatusBadge";
import { DataTable, type Column } from "@/components/common/DataTable";
import { FilterBar } from "@/components/common/FilterBar";
import { LinkButton } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAdmin } from "@/hooks/useAdmin";
import { formatDate } from "@/lib/formatters";
import type { Company } from "@/types/company";
import { ROUTES } from "@/lib/constants";
import {
  Building2Icon,
  ShieldCheckIcon,
  BriefcaseIcon,
  UsersIcon,
  CheckCircle2Icon,
  ArrowRightIcon
} from "lucide-react";

export default function AdminCompaniesPage() {
  const { companies } = useAdmin();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});

  const filtered = companies.filter((c) => {
    const q = search.toLowerCase();
    const matchSearch =
      !search ||
      c.companyName.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.sector.toLowerCase().includes(q);
    const matchStatus = !filters.status || filters.status === "all" || c.verificationStatus === filters.status;
    return matchSearch && matchStatus;
  });

  const totalActiveInternships = companies.reduce((acc, c) => acc + (c.activeInternships || 0), 0);
  const verifiedCompanies = companies.filter((c) => c.verificationStatus === "Verified").length;

  const columns: Column<Company>[] = [
    {
      key: "name",
      header: "Enterprise Partner",
      cell: (c) => (
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 border border-primary/25 text-primary font-bold text-xs shrink-0">
            {c.companyName?.slice(0, 2).toUpperCase() || "CP"}
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">{c.companyName}</p>
            <p className="text-xs text-muted-foreground">{c.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "sector",
      header: "Industry Sector",
      cell: (c) => (
        <span className="inline-flex rounded-lg border border-border/80 bg-muted/30 px-2 py-0.5 text-xs font-semibold text-foreground">
          {c.sector}
        </span>
      ),
    },
    {
      key: "location",
      header: "Headquarters",
      cell: (c) => <span className="text-xs text-muted-foreground">{c.city}, {c.state}</span>,
    },
    {
      key: "internships",
      header: "Capacity Ratio",
      cell: (c) => (
        <div className="text-xs">
          <span className="font-bold text-foreground">{c.activeInternships}</span>
          <span className="text-muted-foreground">/{c.totalInternships} Active Roles</span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Accreditation",
      cell: (c) => (
        <div className="flex items-center gap-2">
          <StatusBadge status={c.verificationStatus} />
          {!c.isActive && (
            <Badge variant="outline" className="text-xs border-rose-500/30 text-rose-400">
              Suspended
            </Badge>
          )}
        </div>
      ),
    },
    {
      key: "joined",
      header: "Onboarded",
      cell: (c) => <span className="text-xs text-muted-foreground">{formatDate(c.createdAt)}</span>,
    },
    {
      key: "actions",
      header: "Actions",
      cell: (c) => (
        <LinkButton
          href={`${ROUTES.admin.companies}/${c.id}`}
          size="sm"
          className="rounded-xl font-semibold bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30"
        >
          View Enterprise
        </LinkButton>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Enterprise Partner Directory"
        description={`Managing ${companies.length} corporate employers registered with verified internship programs.`}
      />

      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent p-6 shadow-xl shadow-primary/5 backdrop-blur-md">
        <div className="absolute -right-10 -top-10 size-48 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-md">
              <Building2Icon className="size-3.5 text-primary" />
              <span>Corporate Accreditation & Compliance</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              National Corporate Host Partner Network
            </h2>
            <p className="max-w-2xl text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Verify corporate legal standing (MCA/CIN), GST registration, workplace health and safety compliance, and minimum stipend disbursement records.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 shrink-0 sm:flex sm:items-center">
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-center backdrop-blur-sm">
              <span className="text-xs text-emerald-400 block">Verified Partners</span>
              <span className="text-sm font-bold text-emerald-400">{verifiedCompanies} Accredited</span>
            </div>
            <div className="rounded-xl border border-border/70 bg-card/60 p-3 text-center backdrop-blur-sm">
              <span className="text-xs text-muted-foreground block">Active Openings</span>
              <span className="text-sm font-bold text-foreground">{totalActiveInternships} Live Roles</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/85 dark:bg-[#0e1322]/85 p-5 backdrop-blur-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search by company name, corporate email, or sector…"
            className="max-w-md w-full"
          />

          <span className="text-xs font-medium text-muted-foreground">
            Displaying {filtered.length} of {companies.length} employers
          </span>
        </div>

        <FilterBar
          filters={[
            {
              key: "status",
              placeholder: "All Verification Statuses",
              options: [
                { label: "Verified", value: "Verified" },
                { label: "Pending", value: "Pending" },
                { label: "Rejected", value: "Rejected" },
                { label: "Suspended", value: "Suspended" },
              ],
            },
          ]}
          values={filters}
          onChange={(k, v) => setFilters((p) => ({ ...p, [k]: v }))}
          onClear={() => setFilters({})}
        />
      </div>

      {/* Enhanced Table */}
      <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md overflow-hidden shadow-xl">
        <DataTable
          columns={columns}
          data={filtered}
          keyExtractor={(c) => c.id}
          emptyMessage="No enterprise partners match current filters."
        />
      </div>
    </div>
  );
}
