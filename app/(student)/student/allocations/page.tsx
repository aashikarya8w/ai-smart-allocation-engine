"use client";

import { AwardIcon, MapPinIcon, CalendarIcon, IndianRupeeIcon } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { ScoreCircle } from "@/components/common/ScoreBar";
import { EmptyState } from "@/components/common/EmptyState";
import { Card, CardContent } from "@/components/ui/card";
import { useAllocations } from "@/hooks/useAllocations";
import { formatDate, formatStipend } from "@/lib/formatters";
import { LinkButton } from "@/components/ui/button";

export default function AllocationsPage() {
  const { allocations, activeAllocation } = useAllocations();

  if (allocations.length === 0) {
    return (
      <div className="space-y-5">
        <PageHeader title="My Allocation" description="Your internship allocation status." />
        <EmptyState
          icon={AwardIcon}
          title="No allocation yet"
          description="You haven't been allocated an internship yet. Keep applying!"
        />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <PageHeader title="My Allocation" description="Your internship allocation status." />

      <div className="space-y-4">
        {allocations.map((al) => (
          <Card key={al.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold text-foreground">{al.internshipTitle}</p>
                    <StatusBadge status={al.status} />
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">{al.companyName}</p>

                  <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPinIcon className="size-3" />{al.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <CalendarIcon className="size-3" />
                      {formatDate(al.startDate)} – {formatDate(al.endDate)}
                    </span>
                    <span className="flex items-center gap-1">
                      <IndianRupeeIcon className="size-3" />
                      {formatStipend(al.stipend)}/month
                    </span>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <ScoreCircle score={al.matchScore} size="sm" />
                  <LinkButton
                    href={`/student/allocations/${al.id}`}
                    variant="outline"
                    size="sm"
                  >
                    Details
                  </LinkButton>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
