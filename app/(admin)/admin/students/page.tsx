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

export default function AdminStudentsPage() {
  const { students } = useAdmin();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});

  const filtered = students.filter((s) => {
    const q = search.toLowerCase();
    const matchSearch = !search ||
      s.fullName.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      s.university.toLowerCase().includes(q);
    const matchStatus = !filters.status || filters.status === "all" || s.verificationStatus === filters.status;
    const matchBranch = !filters.branch || filters.branch === "all" || s.branch === filters.branch;
    return matchSearch && matchStatus && matchBranch;
  });

  const columns: Column<Student>[] = [
    {
      key: "name",
      header: "Student",
      cell: (s) => (
        <div>
          <p className="text-sm font-medium text-foreground">{s.fullName}</p>
          <p className="text-xs text-muted-foreground">{s.email}</p>
        </div>
      ),
    },
    {
      key: "university",
      header: "University",
      cell: (s) => (
        <div>
          <p className="text-sm">{s.university}</p>
          <p className="text-xs text-muted-foreground">{s.branch} · {s.degree}</p>
        </div>
      ),
    },
    { key: "cgpa",     header: "CGPA",     cell: (s) => <span className="text-sm font-medium">{s.cgpa.toFixed(2)}</span> },
    { key: "location", header: "Location", cell: (s) => <span className="text-sm text-muted-foreground">{s.city}, {s.state}</span> },
    {
      key: "status",
      header: "Status",
      cell: (s) => (
        <div className="flex items-center gap-2">
          <StatusBadge status={s.verificationStatus} />
          {!s.isActive && <Badge variant="outline" className="text-xs">Inactive</Badge>}
        </div>
      ),
    },
    { key: "joined",  header: "Joined",   cell: (s) => <span className="text-xs text-muted-foreground">{formatDate(s.createdAt)}</span> },
    {
      key: "actions",
      header: "Actions",
      cell: (s) => (
        <LinkButton href={`${ROUTES.admin.students}/${s.id}`} variant="outline" size="sm">View</LinkButton>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <PageHeader title="Students" description={`${filtered.length} of ${students.length} students`} />

      <div className="space-y-3">
        <SearchInput value={search} onChange={setSearch} placeholder="Search by name, email, university…" className="max-w-sm" />
        <FilterBar
          filters={[
            { key: "status", placeholder: "All Statuses", options: [
              { label: "Verified", value: "Verified" },
              { label: "Pending",  value: "Pending"  },
              { label: "Rejected", value: "Rejected" },
            ]},
          ]}
          values={filters}
          onChange={(k, v) => setFilters((p) => ({ ...p, [k]: v }))}
          onClear={() => setFilters({})}
        />
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        emptyTitle="No students found"
        emptyDescription="Try adjusting your search or filters."
      />
    </div>
  );
}
