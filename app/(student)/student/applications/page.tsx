"use client";

import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { EmptyState } from "@/components/common/EmptyState";
import { ScoreCircle } from "@/components/common/ScoreBar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useApplications } from "@/hooks/useApplications";
import { formatRelativeTime } from "@/lib/formatters";
import { APPLICATION_STATUS } from "@/lib/constants";
import { LinkButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ApplicationStatus } from "@/types/application";

const TABS: { label: string; value: ApplicationStatus | "all" }[] = [
  { label: "All",         value: "all"         },
  { label: "Applied",     value: "Applied"     },
  { label: "Shortlisted", value: "Shortlisted" },
  { label: "Allocated",   value: "Allocated"   },
  { label: "Rejected",    value: "Rejected"    },
  { label: "Waitlisted",  value: "Waitlisted"  },
  { label: "Withdrawn",   value: "Withdrawn"   },
];

export default function ApplicationsPage() {
  const { applications, statusFilter, setStatusFilter, counts } = useApplications();

  return (
    <div className="space-y-5">
      <PageHeader
        title="My Applications"
        description={`${counts.all} total application${counts.all !== 1 ? "s" : ""}`}
      />

      {/* Status tabs */}
      <div className="flex flex-wrap gap-1.5">
        {TABS.map((tab) => {
          const count = tab.value === "all" ? counts.all : counts[tab.value] ?? 0;
          return (
            <button
              key={tab.value}
              onClick={() => setStatusFilter(tab.value)}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors",
                statusFilter === tab.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
              {count > 0 && (
                <span className={cn(
                  "rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                  statusFilter === tab.value ? "bg-white/20" : "bg-background"
                )}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* List */}
      {applications.length === 0 ? (
        <EmptyState
          title="No applications found"
          description="You haven't applied to any internships yet."
        />
      ) : (
        <div className="space-y-3">
          {applications.map((app) => (
            <Card key={app.id} className="hover:shadow-sm transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold text-foreground">{app.internshipTitle}</p>
                      <StatusBadge status={app.status} />
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {app.companyName} · Applied {formatRelativeTime(app.appliedAt)}
                    </p>
                    {app.updatedAt !== app.appliedAt && (
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Updated {formatRelativeTime(app.updatedAt)}
                      </p>
                    )}
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <ScoreCircle score={app.matchScore} size="sm" />
                    <LinkButton
                      href={`/student/applications/${app.id}`}
                      variant="outline"
                      size="sm"
                    >
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
