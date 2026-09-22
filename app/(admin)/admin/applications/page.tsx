"use client";

import { useState } from "react";
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

export default function AdminApplicationsPage() {
  const { applications } = useAdmin();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});

  const filtered = applications.filter((a) => {
    const q = search.toLowerCase();
    const matchSearch = !search || a.studentName.toLowerCase().includes(q) || a.internshipTitle.toLowerCase().includes(q) || a.companyName.toLowerCase().includes(q);
    const matchStatus = !filters.status || filters.status === "all" || a.status === filters.status;
    return matchSearch && matchStatus;
  });

  const columns: Column<Application>[] = [
    {
      key: "student",
      header: "Student",
      cell: (a) => <p className="text-sm font-medium text-foreground">{a.studentName}</p>,
    },
    {
      key: "internship",
      header: "Internship",
      cell: (a) => (
        <div>
          <p className="text-sm">{a.internshipTitle}</p>
          <p className="text-xs text-muted-foreground">{a.companyName}</p>
        </div>
      ),
    },
    { key: "score",   header: "Score",   cell: (a) => <span className="text-sm font-semibold">{a.matchScore}%</span> },
    { key: "status",  header: "Status",  cell: (a) => <StatusBadge status={a.status} /> },
    { key: "applied", header: "Applied", cell: (a) => <span className="text-xs text-muted-foreground">{formatDate(a.appliedAt)}</span> },
    { key: "actions", header: "Actions", cell: (a) => (
      <LinkButton href={`${ROUTES.admin.applications}/${a.id}`} variant="outline" size="sm">View</LinkButton>
    )},
  ];

  return (
    <div className="space-y-5">
      <PageHeader title="Applications" description={`${filtered.length} of ${applications.length} applications`} />
      <div className="space-y-3">
        <SearchInput value={search} onChange={setSearch} placeholder="Search student, role, or company…" className="max-w-sm" />
        <FilterBar
          filters={[{ key: "status", placeholder: "All Statuses", options: [
            { label: "Applied",     value: "Applied"     }, { label: "Shortlisted", value: "Shortlisted" },
            { label: "Allocated",   value: "Allocated"   }, { label: "Rejected",    value: "Rejected"    },
            { label: "Waitlisted",  value: "Waitlisted"  }, { label: "Withdrawn",   value: "Withdrawn"   },
          ]}]}
          values={filters}
          onChange={(k, v) => setFilters((p) => ({ ...p, [k]: v }))}
          onClear={() => setFilters({})}
        />
      </div>
      <DataTable columns={columns} data={filtered} emptyTitle="No applications found" />
    </div>
  );
}
