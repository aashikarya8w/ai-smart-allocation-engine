"use client";

import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { ScoreCircle } from "@/components/common/ScoreBar";
import { EmptyState } from "@/components/common/EmptyState";
import { Card, CardContent } from "@/components/ui/card";
import { useCompany } from "@/hooks/useCompany";
import { formatDate, formatStipend } from "@/lib/formatters";

export default function CompanyAllocationsPage() {
  const { allocations } = useCompany();

  return (
    <div className="space-y-5">
      <PageHeader
        title="Allocations"
        description={`${allocations.length} allocation${allocations.length !== 1 ? "s" : ""}`}
      />

      {allocations.length === 0 ? (
        <EmptyState title="No allocations yet" description="Allocations will appear here after the AI allocation run." />
      ) : (
        <div className="space-y-3">
          {allocations.map((al) => (
            <Card key={al.id} className="hover:shadow-sm transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground">{al.studentName}</p>
                    <p className="text-xs text-muted-foreground">
                      {al.internshipTitle} · {al.location} · {al.workMode}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(al.startDate)} – {formatDate(al.endDate)} · {formatStipend(al.stipend)}/mo
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <ScoreCircle score={al.matchScore} size="sm" />
                    <StatusBadge status={al.status} />
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
