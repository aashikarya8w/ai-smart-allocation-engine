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
import type { Student } from "@/types/student";
import { ROUTES } from "@/lib/constants";
import {
  GraduationCapIcon,
  ShieldCheckIcon,
  SparklesIcon,
  UsersIcon,
  CheckCircle2Icon,
  ClockIcon,
  ArrowRightIcon
} from "lucide-react";

export default function AdminStudentsPage() {
  const { students } = useAdmin();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});

  const filtered = students.filter((s) => {
    const q = search.toLowerCase();
    const matchSearch =
      !search ||
      s.fullName.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      s.university.toLowerCase().includes(q);
    const matchStatus = !filters.status || filters.status === "all" || s.verificationStatus === filters.status;
    const matchBranch = !filters.branch || filters.branch === "all" || s.branch === filters.branch;
    return matchSearch && matchStatus && matchBranch;
  });

  const verifiedCount = students.filter((s) => s.verificationStatus === "Verified").length;
  const pendingCount = students.filter((s) => s.verificationStatus === "Pending").length;

  const columns: Column<Student>[] = [
    {
      key: "name",
      header: "Student Name",
      cell: (s) => (
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 border border-primary/25 text-primary font-bold text-xs shrink-0">
            {s.fullName?.slice(0, 2).toUpperCase() || "ST"}
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">{s.fullName}</p>
            <p className="text-xs text-muted-foreground">{s.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "university",
      header: "Academic Institution",
      cell: (s) => (
        <div>
          <p className="text-sm font-semibold text-foreground/90">{s.university}</p>
          <p className="text-xs text-muted-foreground">{s.branch} · {s.degree}</p>
        </div>
      ),
    },
    {
      key: "cgpa",
      header: "CGPA",
      cell: (s) => (
        <span className="inline-flex rounded-lg border border-border/80 bg-muted/30 px-2 py-0.5 text-xs font-bold text-foreground">
          {s.cgpa.toFixed(2)}
        </span>
      ),
    },
    {
      key: "location",
      header: "Location",
      cell: (s) => (
        <span className="text-xs text-muted-foreground">{s.city}, {s.state}</span>
      ),
    },
    {
      key: "status",
      header: "Verification",
      cell: (s) => (
        <div className="flex items-center gap-2">
          <StatusBadge status={s.verificationStatus} />
          {!s.isActive && (
            <Badge variant="outline" className="text-xs border-muted text-muted-foreground">
              Inactive
            </Badge>
          )}
        </div>
      ),
    },
    {
      key: "joined",
      header: "Registered",
      cell: (s) => <span className="text-xs text-muted-foreground">{formatDate(s.createdAt)}</span>,
    },
    {
      key: "actions",
      header: "Actions",
      cell: (s) => (
        <LinkButton
          href={`${ROUTES.admin.students}/${s.id}`}
          size="sm"
          className="rounded-xl font-semibold bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30"
        >
          View Profile
        </LinkButton>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="National Student Directory"
        description={`Managing ${students.length} university candidates registered in the national talent pool.`}
      />

      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent p-6 shadow-xl shadow-primary/5 backdrop-blur-md">
        <div className="absolute -right-10 -top-10 size-48 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-md">
              <GraduationCapIcon className="size-3.5 text-primary" />
              <span>National Academic Verification Portal</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              University Candidate Registry & Identity Verification
            </h2>
            <p className="max-w-2xl text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Verify student academic transcripts, branch eligibility, quota categories, and internship allocation readiness across affiliated colleges nationwide.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 shrink-0 sm:flex sm:items-center">
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-center backdrop-blur-sm">
              <span className="text-xs text-emerald-400 block">Verified Students</span>
              <span className="text-sm font-bold text-emerald-400">{verifiedCount} Validated</span>
            </div>
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-center backdrop-blur-sm">
              <span className="text-xs text-amber-400 block">Pending eKYC</span>
              <span className="text-sm font-bold text-amber-400">{pendingCount} In Queue</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Container */}
      <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/85 dark:bg-[#0e1322]/85 p-5 backdrop-blur-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search by student name, email, or university…"
            className="max-w-md w-full"
          />

          <span className="text-xs font-medium text-muted-foreground">
            Displaying {filtered.length} of {students.length} students
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
          keyExtractor={(s) => s.id}
          emptyMessage="No students found matching current filters."
        />
      </div>
    </div>
  );
}
