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
import { formatDate, formatStipendRange } from "@/lib/formatters";
import type { Internship } from "@/types/internship";
import { ROUTES } from "@/lib/constants";

export default function AdminInternshipsPage() {
  const { internships } = useAdmin();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});

  const filtered = internships.filter((i) => {
    const q = search.toLowerCase();
    const matchSearch = !search || i.title.toLowerCase().includes(q) || i.companyName.toLowerCase().includes(q) || i.sector.toLowerCase().includes(q);
    const matchStatus = !filters.status || filters.status === "all" || i.status === filters.status;
    const matchWorkMode = !filters.workMode || filters.workMode === "all" || i.workMode === filters.workMode;
    return matchSearch && matchStatus && matchWorkMode;
  });

  const columns: Column<Internship>[] = [
    {
      key: "title",
      header: "Internship",
      cell: (i) => (
        <div>
          <p className="text-sm font-medium text-foreground">{i.title}</p>
          <p className="text-xs text-muted-foreground">{i.companyName}</p>
        </div>
      ),
    },
    { key: "sector",   header: "Sector",   cell: (i) => <span className="text-xs">{i.sector}</span> },
    { key: "location", header: "Location", cell: (i) => <span className="text-xs text-muted-foreground">{i.city}, {i.state}</span> },
    { key: "stipend",  header: "Stipend",  cell: (i) => <span className="text-xs">{formatStipendRange(i.stipendMin, i.stipendMax)}</span> },
    { key: "seats",    header: "Seats",    cell: (i) => <span className="text-xs">{i.availableSeats}/{i.seats}</span> },
    { key: "mode",     header: "Mode",     cell: (i) => <Badge variant="secondary" className="text-xs">{i.workMode}</Badge> },
    { key: "status",   header: "Status",   cell: (i) => <StatusBadge status={i.status} /> },
    { key: "actions",  header: "Actions",  cell: (i) => (
      <div className="flex gap-1.5">
        <LinkButton href={`${ROUTES.admin.internships}/${i.id}`} variant="outline" size="sm">View</LinkButton>
        {i.status === "Pending" && <LinkButton href={`${ROUTES.admin.internships}/${i.id}`} size="sm">Approve</LinkButton>}
      </div>
    )},
  ];

  return (
    <div className="space-y-5">
      <PageHeader title="Internships" description={`${filtered.length} of ${internships.length} listings`} />
      <div className="space-y-3">
        <SearchInput value={search} onChange={setSearch} placeholder="Search by title, company, sector…" className="max-w-sm" />
        <FilterBar
          filters={[
            { key: "status", placeholder: "All Statuses", options: [
              { label: "Active",  value: "Active"  }, { label: "Pending", value: "Pending" },
              { label: "Draft",   value: "Draft"   }, { label: "Closed",  value: "Closed"  },
            ]},
            { key: "workMode", placeholder: "Work Mode", options: [
              { label: "Remote",  value: "Remote"  },
              { label: "Hybrid",  value: "Hybrid"  },
              { label: "On-site", value: "On-site" },
            ]},
          ]}
          values={filters}
          onChange={(k, v) => setFilters((p) => ({ ...p, [k]: v }))}
          onClear={() => setFilters({})}
        />
      </div>
      <DataTable columns={columns} data={filtered} emptyTitle="No internships found" />
    </div>
  );
}
