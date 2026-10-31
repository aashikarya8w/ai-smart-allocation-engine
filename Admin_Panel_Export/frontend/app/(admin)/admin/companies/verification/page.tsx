"use client";

import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/common/EmptyState";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { mockCompanies } from "@/data/companies";
import { initials, formatDate } from "@/lib/formatters";

export default function CompanyVerificationPage() {
  const pending = mockCompanies.filter((c) => c.verificationStatus === "Pending");

  return (
    <div className="space-y-5">
      <PageHeader title="Company Verification" description={`${pending.length} companies pending verification`} />
      {pending.length === 0 ? (
        <EmptyState title="No pending verifications" description="All companies have been reviewed." />
      ) : (
        <div className="space-y-3">
          {pending.map((c) => (
            <Card key={c.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-9">
                      <AvatarFallback className="text-xs bg-primary/10 text-primary">{initials(c.companyName)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-foreground">{c.companyName}</p>
                      <p className="text-xs text-muted-foreground">{c.sector} · {c.city}, {c.state}</p>
                      <p className="text-xs text-muted-foreground">Registered: {formatDate(c.createdAt)}</p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <StatusBadge status={c.verificationStatus} />
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
