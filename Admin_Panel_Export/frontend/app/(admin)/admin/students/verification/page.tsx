"use client";

import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockStudents } from "@/data/students";
import { EmptyState } from "@/components/common/EmptyState";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { initials, formatDate } from "@/lib/formatters";

export default function StudentVerificationPage() {
  const pending = mockStudents.filter((s) => s.verificationStatus === "Pending");

  return (
    <div className="space-y-5">
      <PageHeader title="Student Verification" description={`${pending.length} students pending verification`} />

      {pending.length === 0 ? (
        <EmptyState title="No pending verifications" description="All students have been verified." />
      ) : (
        <div className="space-y-3">
          {pending.map((s) => (
            <Card key={s.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-9">
                      <AvatarFallback className="text-xs bg-primary/10 text-primary">{initials(s.fullName)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-foreground">{s.fullName}</p>
                      <p className="text-xs text-muted-foreground">{s.email} · {s.university}</p>
                      <p className="text-xs text-muted-foreground">Registered: {formatDate(s.createdAt)}</p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <StatusBadge status={s.verificationStatus} />
                    <Button size="sm" variant="outline">Verify</Button>
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
