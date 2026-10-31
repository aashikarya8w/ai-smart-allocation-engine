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

export default function AdminCompaniesPage() {
  const { companies } = useAdmin();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});

  const filtered = companies.filter((c) => {
    const q = search.toLowerCase();
    const matchSearch = !search || c.companyName.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.sector.toLowerCase().includes(q);
    const matchStatus = !filters.status || filters.status === "all" || c.verificationStatus === filters.status;
    return matchSearch && matchStatus;
  });

  const columns: Column<Company>[] = [
    {
      key: "name",
      header: "Company",
      cell: (c) => (
        <div>
          <p className="text-sm font-medium text-foreground">{c.companyName}</p>
          <p className="text-xs text-muted-foreground">{c.email}</p>
        </div>
      ),
    },
    { key: "sector",   header: "Sector",   cell: (c) => <span className="text-sm">{c.sector}</span> },
    { key: "location", header: "Location", cell: (c) => <span className="text-sm text-muted-foreground">{c.city}, {c.state}</span> },
    { key: "internships", header: "Internships", cell: (c) => (
      <div className="text-sm">
        <span className="font-medium">{c.activeInternships}</span>
        <span className="text-muted-foreground">/{c.totalInternships} active</span>
      </div>
    )},
    { key: "status",   header: "Status",   cell: (c) => (
      <div className="flex items-center gap-2">
        <StatusBadge status={c.verificationStatus} />
        {!c.isActive && <Badge variant="outline" className="text-xs">Suspended</Badge>}
      </div>
    )},
    { key: "joined",   header: "Joined",   cell: (c) => <span className="text-xs text-muted-foreground">{formatDate(c.createdAt)}</span> },
    { key: "actions",  header: "Actions",  cell: (c) => (
      <LinkButton href={`${ROUTES.admin.companies}/${c.id}`} variant="outline" size="sm">View</LinkButton>
    )},
  ];

  return (
    <div className="space-y-5">
      <PageHeader title="Companies" description={`${filtered.length} of ${companies.length} companies`} />
      <div className="space-y-3">
        <SearchInput value={search} onChange={setSearch} placeholder="Search by name, email, sector…" className="max-w-sm" />
        <FilterBar
          filters={[{ key: "status", placeholder: "All Statuses", options: [
            { label: "Verified",  value: "Verified"  },
            { label: "Pending",   value: "Pending"   },
            { label: "Rejected",  value: "Rejected"  },
            { label: "Suspended", value: "Suspended" },
          ]}]}
          values={filters}
          onChange={(k, v) => setFilters((p) => ({ ...p, [k]: v }))}
          onClear={() => setFilters({})}
        />
      </div>
      <DataTable columns={columns} data={filtered} emptyTitle="No companies found" />
    </div>
  );
}
