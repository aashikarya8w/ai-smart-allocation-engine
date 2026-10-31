"use client";

import { useState } from "react";
import {
  ClipboardListIcon, SearchIcon, FilterIcon, ArrowUpRightIcon,
  CheckCircle2Icon, ClockIcon, XCircleIcon, SparklesIcon,
  Building2Icon, UserIcon, ArrowRightIcon,
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { SearchInput } from "@/components/common/SearchInput";
import { StatusBadge } from "@/components/common/StatusBadge";
import { DataTable, type Column } from "@/components/common/DataTable";
import { FilterBar } from "@/components/common/FilterBar";
import { LinkButton } from "@/components/ui/button";
import { useAdmin } from "@/hooks/useAdmin";
import { formatDate } from "@/lib/formatters";
import type { Application } from "@/types/application";
import { ROUTES } from "@/lib/constants";
import Link from "next/link";

export default function AdminApplicationsPage() {
  const { applications } = useAdmin();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});

  const filtered = applications.filter((a) => {
    const q = search.toLowerCase();
    const matchSearch =
      !search ||
      a.studentName.toLowerCase().includes(q) ||
      a.internshipTitle.toLowerCase().includes(q) ||
      a.companyName.toLowerCase().includes(q);
    const matchStatus = !filters.status || filters.status === "all" || a.status === filters.status;
    return matchSearch && matchStatus;
  });

  const totalApplied = applications.length;
  const totalAllocated = applications.filter((a) => a.status === "Allocated").length;
  const totalShortlisted = applications.filter((a) => a.status === "Shortlisted").length;
  const avgScore = totalApplied > 0
    ? (applications.reduce((acc, a) => acc + (a.matchScore || 0), 0) / totalApplied).toFixed(1)
    : "0.0";

  const columns: Column<Application>[] = [
    {
      key: "student",
      header: "Candidate Name",
      cell: (a) => (
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/30 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-xs shrink-0">
            {a.studentName.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{a.studentName}</p>
            <p className="text-[11px] text-muted-foreground flex items-center gap-1">
              <UserIcon className="h-3 w-3" /> ID: {a.studentId.slice(0, 8)}...
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "internship",
      header: "Applied Role & Corporate Host",
      cell: (a) => (
        <div>
          <p className="text-sm font-medium text-foreground">{a.internshipTitle}</p>
          <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
            <Building2Icon className="h-3 w-3 text-muted-foreground" />
            {a.companyName}
          </p>
        </div>
      ),
    },
    {
      key: "score",
      header: "Match Precision",
      cell: (a) => (
        <div className="flex items-center gap-2">
          <div className="w-16 bg-muted/60 dark:bg-white/10 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full rounded-full ${
                a.matchScore >= 80 ? "bg-emerald-500" : a.matchScore >= 60 ? "bg-amber-500" : "bg-rose-500"
              }`}
              style={{ width: `${a.matchScore}%` }}
            />
          </div>
          <span className="text-xs font-bold">{a.matchScore}%</span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (a) => <StatusBadge status={a.status} />,
    },
    {
      key: "applied",
      header: "Timestamp",
      cell: (a) => <span className="text-xs text-muted-foreground">{formatDate(a.appliedAt)}</span>,
    },
    {
      key: "actions",
      header: "Audit Action",
      cell: (a) => (
        <LinkButton
          href={`${ROUTES.admin.applications}/${a.id}`}
          variant="outline"
          size="sm"
          className="border-primary/20 hover:border-primary/50 text-xs gap-1 group"
        >
          Review <ArrowRightIcon className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
        </LinkButton>
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
              <ClipboardListIcon className="h-3.5 w-3.5" />
              National Application Ledger
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Applicant <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Pipeline</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed font-normal">
              Audit and supervise all student submissions submitted across participating ministries and private corporate internships in real time.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
              <p className="text-[11px] font-medium text-slate-400">Total Entries</p>
              <p className="text-xl font-black text-white mt-0.5">{totalApplied}</p>
            </div>
            <div className="p-3.5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
              <p className="text-[11px] font-medium text-slate-400">Shortlisted</p>
              <p className="text-xl font-black text-amber-400 mt-0.5">{totalShortlisted}</p>
            </div>
            <div className="p-3.5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
              <p className="text-[11px] font-medium text-slate-400">Allocated</p>
              <p className="text-xl font-black text-emerald-400 mt-0.5">{totalAllocated}</p>
            </div>
            <div className="p-3.5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
              <p className="text-[11px] font-medium text-slate-400">Avg Precision</p>
              <p className="text-xl font-black text-cyan-400 mt-0.5">{avgScore}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-5 shadow-lg backdrop-blur-md space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search candidate name, internship title, or corporate host…"
            className="w-full md:max-w-md"
          />
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">{filtered.length}</span> results found
          </div>
        </div>

        <FilterBar
          filters={[
            {
              key: "status",
              placeholder: "All Pipeline Statuses",
              options: [
                { label: "Applied", value: "Applied" },
                { label: "Shortlisted", value: "Shortlisted" },
                { label: "Allocated", value: "Allocated" },
                { label: "Rejected", value: "Rejected" },
                { label: "Waitlisted", value: "Waitlisted" },
                { label: "Withdrawn", value: "Withdrawn" },
              ],
            },
          ]}
          values={filters}
          onChange={(k, v) => setFilters((p) => ({ ...p, [k]: v }))}
          onClear={() => setFilters({})}
        />
      </div>

      {/* Cyber DataTable */}
      <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 shadow-xl backdrop-blur-md overflow-hidden">
        <DataTable columns={columns} data={filtered} emptyTitle="No matching applications found" />
      </div>
    </div>
  );
}
