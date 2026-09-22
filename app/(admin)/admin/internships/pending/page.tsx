"use client";

import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/common/EmptyState";
import { mockInternships } from "@/data/internships";
import { formatDate, formatStipendRange } from "@/lib/formatters";

export default function PendingInternshipsPage() {
  const pending = mockInternships.filter((i) => i.status === "Pending");

  return (
    <div className="space-y-5">
      <PageHeader title="Pending Internships" description={`${pending.length} listings awaiting approval`} />
      {pending.length === 0 ? (
        <EmptyState title="No pending internships" description="All listings have been reviewed." />
      ) : (
        <div className="space-y-3">
          {pending.map((i) => (
            <Card key={i.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-medium text-foreground">{i.title}</p>
                      <StatusBadge status={i.status} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{i.companyName} · {i.city}, {i.state}</p>
                    <div className="mt-1.5 flex flex-wrap gap-2 text-xs text-muted-foreground">
                      <span>{i.duration}</span>
                      <span>{formatStipendRange(i.stipendMin, i.stipendMax)}/mo</span>
                      <span>{i.seats} seats</span>
                      <Badge variant="secondary" className="text-xs">{i.workMode}</Badge>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">Submitted: {formatDate(i.createdAt)}</p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Button size="sm">Approve</Button>
                    <Button size="sm" variant="destructive">Reject</Button>
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
