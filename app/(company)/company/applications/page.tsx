"use client";

import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { SearchInput } from "@/components/common/SearchInput";
import { StatusBadge } from "@/components/common/StatusBadge";
import { ScoreCircle } from "@/components/common/ScoreBar";
import { EmptyState } from "@/components/common/EmptyState";
import { Card, CardContent } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/button";
import { useCompany } from "@/hooks/useCompany";
import { formatRelativeTime } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import type { ApplicationStatus } from "@/types/application";

const TABS: { label: string; value: ApplicationStatus | "all" }[] = [
  { label: "All",         value: "all"         },
  { label: "Applied",     value: "Applied"     },
  { label: "Shortlisted", value: "Shortlisted" },
  { label: "Allocated",   value: "Allocated"   },
  { label: "Rejected",    value: "Rejected"    },
];

export default function CompanyApplicationsPage() {
  const { applications } = useCompany();
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<ApplicationStatus | "all">("all");

  const filtered = applications.filter((a) => {
    const matchTab = tab === "all" || a.status === tab;
    const matchSearch = !search ||
      a.studentName.toLowerCase().includes(search.toLowerCase()) ||
      a.internshipTitle.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  return (
    <div className="space-y-5">
      <PageHeader
        title="Applications"
        description={`${applications.length} total application${applications.length !== 1 ? "s" : ""}`}
      />

      <div className="space-y-3">
        <SearchInput value={search} onChange={setSearch} placeholder="Search by student or role…" className="max-w-sm" />
        <div className="flex flex-wrap gap-1.5">
          {TABS.map((t) => (
            <button
              key={t.value}
              onClick={() => setTab(t.value)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                tab === t.value ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              {t.label}
              <span className="ml-1.5 text-[10px]">
                ({t.value === "all" ? applications.length : applications.filter((a) => a.status === t.value).length})
              </span>
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No applications found" />
      ) : (
        <div className="space-y-3">
          {filtered.map((app) => (
            <Card key={app.id} className="hover:shadow-sm transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground">{app.studentName}</p>
                    <p className="text-xs text-muted-foreground">
                      {app.internshipTitle} · {formatRelativeTime(app.appliedAt)}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <ScoreCircle score={app.matchScore} size="sm" />
                    <StatusBadge status={app.status} />
                    <LinkButton href={`/company/applications/${app.id}`} variant="outline" size="sm">
                      View
                    </LinkButton>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
