"use client";

import { useState } from "react";
import {
  BriefcaseIcon, SearchIcon, FilterIcon, ArrowRightIcon,
  CheckCircle2Icon, ClockIcon, MapPinIcon, IndianRupeeIcon,
  UsersIcon, SparklesIcon, AlertCircleIcon,
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { SearchInput } from "@/components/common/SearchInput";
import { StatusBadge } from "@/components/common/StatusBadge";
import { DataTable, type Column } from "@/components/common/DataTable";
import { FilterBar } from "@/components/common/FilterBar";
import { LinkButton } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAdmin } from "@/hooks/useAdmin";
import { formatDate, formatStipendRange } from "@/lib/formatters";
import type { Internship } from "@/types/internship";
import { ROUTES } from "@/lib/constants";
import Link from "next/link";

export default function AdminInternshipsPage() {
  const { internships } = useAdmin();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});

  const pendingCount = internships.filter((i) => i.status === "Pending").length;
  const activeCount = internships.filter((i) => i.status === "Active").length;
  const totalSeats = internships.reduce((acc, i) => acc + (i.seats || 0), 0);
  const availableSeats = internships.reduce((acc, i) => acc + (i.availableSeats || 0), 0);

  const filtered = internships.filter((i) => {
    const q = search.toLowerCase();
    const matchSearch =
      !search ||
      i.title.toLowerCase().includes(q) ||
      i.companyName.toLowerCase().includes(q) ||
      i.sector.toLowerCase().includes(q);
    const matchStatus = !filters.status || filters.status === "all" || i.status === filters.status;
    const matchWorkMode = !filters.workMode || filters.workMode === "all" || i.workMode === filters.workMode;
    return matchSearch && matchStatus && matchWorkMode;
  });

  const columns: Column<Internship>[] = [
    {
      key: "title",
      header: "Internship & Employer",
      cell: (i) => (
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/30 border border-amber-500/30 flex items-center justify-center text-amber-500 font-bold text-xs shrink-0">
            {i.companyName.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{i.title}</p>
            <p className="text-xs text-muted-foreground">{i.companyName}</p>
          </div>
        </div>
      ),
    },
    {
      key: "sector",
      header: "Industry Sector",
      cell: (i) => (
        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-muted/60 dark:bg-white/5 border border-border/50 dark:border-white/10">
          {i.sector}
        </span>
      ),
    },
    {
      key: "location",
      header: "Location",
      cell: (i) => (
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <MapPinIcon className="h-3 w-3 text-muted-foreground" />
          {i.city}, {i.state}
        </span>
      ),
    },
    {
      key: "stipend",
      header: "Monthly Stipend",
      cell: (i) => (
        <span className="text-xs font-semibold text-emerald-500 dark:text-emerald-400">
          {formatStipendRange(i.stipendMin, i.stipendMax)}
        </span>
      ),
    },
    {
      key: "seats",
      header: "Seat Quota",
      cell: (i) => {
        const fillPct = Math.round(((i.seats - i.availableSeats) / (i.seats || 1)) * 100);
        return (
          <div className="space-y-1">
            <span className="text-xs font-semibold">{i.availableSeats} / {i.seats} left</span>
            <div className="w-16 bg-muted/60 dark:bg-white/10 rounded-full h-1.5 overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: `${fillPct}%` }} />
            </div>
          </div>
        );
      },
    },
    {
      key: "mode",
      header: "Mode",
      cell: (i) => (
        <Badge
          variant="outline"
          className={`text-[11px] font-medium ${
            i.workMode === "Remote"
              ? "border-purple-500/30 text-purple-400 bg-purple-500/10"
              : i.workMode === "Hybrid"
              ? "border-blue-500/30 text-blue-400 bg-blue-500/10"
              : "border-amber-500/30 text-amber-400 bg-amber-500/10"
          }`}
        >
          {i.workMode}
        </Badge>
      ),
    },
    { key: "status", header: "Status", cell: (i) => <StatusBadge status={i.status} /> },
    {
      key: "actions",
      header: "Actions",
      cell: (i) => (
        <div className="flex items-center gap-2">
          <LinkButton
            href={`${ROUTES.admin.internships}/${i.id}`}
            variant="outline"
            size="sm"
            className="border-primary/20 hover:border-primary/50 text-xs"
          >
            Review
          </LinkButton>
          {i.status === "Pending" && (
            <LinkButton
              href={`${ROUTES.admin.internships}/${i.id}`}
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs shadow-sm"
            >
              Approve
            </LinkButton>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-br from-[#0c1222] via-[#0f172a] to-[#1e1338] p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl">
        <div className="absolute -top-32 -right-24 h-96 w-96 rounded-full bg-gradient-to-br from-primary/20 via-purple-500/15 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-gradient-to-tr from-cyan-500/15 via-blue-500/10 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
              <BriefcaseIcon className="h-3.5 w-3.5" />
              National Opportunities Ledger
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Internship <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Catalogue</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed font-normal">
              Direct oversight and governance for all central and state-accredited internship vacancies, corporate partner postings, and capacity distribution.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
            {pendingCount > 0 && (
              <Link
                href="/admin/internships/pending"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs font-bold backdrop-blur-md transition-all shadow-sm active:scale-95 animate-pulse"
              >
                <AlertCircleIcon className="h-4 w-4" />
                {pendingCount} Pending Approval
              </Link>
            )}
          </div>
        </div>

        {/* Metric summary strip */}
        <div className="relative z-10 mt-8 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
            <p className="text-xs text-slate-400">Total Program Postings</p>
            <p className="text-2xl font-black text-white mt-1">{internships.length}</p>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
            <p className="text-xs text-slate-400">Active Live Vacancies</p>
            <p className="text-2xl font-black text-emerald-400 mt-1">{activeCount}</p>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
            <p className="text-xs text-slate-400">Total Sanctioned Seats</p>
            <p className="text-2xl font-black text-cyan-400 mt-1">{totalSeats}</p>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
            <p className="text-xs text-slate-400">Unfilled Capacity</p>
            <p className="text-2xl font-black text-amber-400 mt-1">{availableSeats}</p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-5 shadow-lg backdrop-blur-md space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search by title, enterprise partner, or sector…"
            className="w-full md:max-w-md"
          />
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">{filtered.length}</span> listings found
          </div>
        </div>

        <FilterBar
          filters={[
            {
              key: "status",
              placeholder: "All Statuses",
              options: [
                { label: "Active", value: "Active" },
                { label: "Pending", value: "Pending" },
                { label: "Draft", value: "Draft" },
                { label: "Closed", value: "Closed" },
              ],
            },
            {
              key: "workMode",
              placeholder: "Work Mode",
              options: [
                { label: "Remote", value: "Remote" },
                { label: "Hybrid", value: "Hybrid" },
                { label: "On-site", value: "On-site" },
              ],
            },
          ]}
          values={filters}
          onChange={(k, v) => setFilters((p) => ({ ...p, [k]: v }))}
          onClear={() => setFilters({})}
        />
      </div>

      {/* Modernized DataTable */}
      <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 shadow-xl backdrop-blur-md overflow-hidden">
        <DataTable columns={columns} data={filtered} emptyTitle="No internships found matching your query" />
      </div>
    </div>
  );
}
