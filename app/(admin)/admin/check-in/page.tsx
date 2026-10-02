"use client";

import { ActivityIcon, CheckCircleIcon, ClockIcon, XCircleIcon } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/common/EmptyState";
import { mockCheckIns } from "@/data/verification";
import { formatDate, formatDateTime } from "@/lib/formatters";

const METHOD_COLOR: Record<string, string> = {
  QR:          "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  RFID:        "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
  Fingerprint: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  Face:        "bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300",
};

export default function AdminCheckInPage() {
  const checkedIn = mockCheckIns.filter((c) => c.status === "CheckedIn");
  const pending   = mockCheckIns.filter((c) => c.status === "Pending");
  const failed    = mockCheckIns.filter((c) => c.status === "Failed");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Internship Check-In"
        description="Monitor all student internship check-ins and verification statuses."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard title="Checked In" value={checkedIn.length} icon={CheckCircleIcon} trend="up"      />
        <StatCard title="Pending"    value={pending.length}   icon={ClockIcon}       trend="neutral" />
        <StatCard title="Failed"     value={failed.length}    icon={XCircleIcon}     trend="neutral" />
      </div>

      {mockCheckIns.length === 0 ? (
        <EmptyState icon={ActivityIcon} title="No check-in records" />
      ) : (
        <div className="space-y-3">
          {mockCheckIns.map((ci) => (
            <Card key={ci.id}>
              <CardContent className="p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-0.5">
                    <p className="font-medium text-foreground">{ci.studentName}</p>
                    <p className="text-sm text-muted-foreground">{ci.internshipTitle}</p>
                    <p className="text-xs text-muted-foreground">{ci.companyName}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <span className={`rounded px-2 py-0.5 text-xs font-medium ${METHOD_COLOR[ci.verificationMethod]}`}>
                      {ci.verificationMethod}
                    </span>
                    <Badge
                      variant={ci.status === "CheckedIn" ? "default" : ci.status === "Pending" ? "secondary" : "destructive"}
                      className="text-xs"
                    >
                      {ci.status}
                    </Badge>
                  </div>
                </div>
                <div className="mt-3 grid gap-1.5 sm:grid-cols-3 text-xs text-muted-foreground">
                  <span>Date: <strong className="text-foreground">{formatDate(ci.checkInDate)}</strong></span>
                  <span>Time: <strong className="text-foreground">{ci.checkInTime}</strong></span>
                  {ci.location && <span>Location: <strong className="text-foreground">{ci.location}</strong></span>}
                  {ci.verifiedBy && <span className="sm:col-span-3">Verified by: <strong className="text-foreground">{ci.verifiedBy}</strong></span>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
