"use client";

import { QrCodeIcon, CheckCircleIcon, ClockIcon, XCircleIcon, ScanLineIcon } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/common/StatCard";
import { EmptyState } from "@/components/common/EmptyState";
import { mockCheckIns } from "@/data/verification";
import { useStudent } from "@/hooks/useStudent";
import { formatDate, formatDateTime } from "@/lib/formatters";

const STATUS_ICON: Record<string, React.ReactNode> = {
  CheckedIn: <CheckCircleIcon className="size-4 text-green-500" />,
  Pending:   <ClockIcon className="size-4 text-amber-500" />,
  Failed:    <XCircleIcon className="size-4 text-destructive" />,
};

const METHOD_COLOR: Record<string, string> = {
  QR:          "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  RFID:        "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
  Fingerprint: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  Face:        "bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300",
};

export default function CheckInPage() {
  const { student } = useStudent();
  const checkIns = mockCheckIns.filter((c) => c.studentId === student?.id);
  const checkedIn = checkIns.filter((c) => c.status === "CheckedIn").length;
  const pending   = checkIns.filter((c) => c.status === "Pending").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Internship Check-In"
        description="Your internship check-in records and verification status."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard title="Checked In"   value={checkedIn}       icon={CheckCircleIcon} trend="up"      />
        <StatCard title="Pending"      value={pending}         icon={ClockIcon}       trend="neutral" />
        <StatCard title="Total"        value={checkIns.length} icon={ScanLineIcon}    trend="neutral" />
      </div>

      {checkIns.length === 0 ? (
        <EmptyState icon={QrCodeIcon} title="No check-in records" description="Your check-in history will appear here after allocation." />
      ) : (
        <div className="space-y-4">
          {checkIns.map((ci) => (
            <Card key={ci.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <CardTitle className="text-sm">{ci.internshipTitle}</CardTitle>
                    <p className="text-xs text-muted-foreground mt-0.5">{ci.companyName}</p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {STATUS_ICON[ci.status]}
                    <Badge
                      variant={ci.status === "CheckedIn" ? "default" : ci.status === "Pending" ? "secondary" : "destructive"}
                      className="text-xs"
                    >
                      {ci.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Check-in Date</span>
                      <span className="font-medium text-foreground">{formatDate(ci.checkInDate)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Time</span>
                      <span className="font-medium text-foreground">{ci.checkInTime}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Verification Method</span>
                      <span className={`rounded px-1.5 py-0.5 text-xs font-medium ${METHOD_COLOR[ci.verificationMethod]}`}>
                        {ci.verificationMethod}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2 text-xs">
                    {ci.location && (
                      <div>
                        <span className="text-muted-foreground">Location</span>
                        <p className="text-foreground mt-0.5">{ci.location}</p>
                      </div>
                    )}
                    {ci.verifiedBy && (
                      <div>
                        <span className="text-muted-foreground">Verified By</span>
                        <p className="text-foreground mt-0.5">{ci.verifiedBy}</p>
                      </div>
                    )}
                  </div>
                </div>

                {ci.status === "Pending" && (
                  <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30 p-3">
                    <p className="text-xs text-amber-700 dark:text-amber-400">
                      Your check-in is pending verification. Please complete identity verification at your company.
                    </p>
                  </div>
                )}
                {ci.status === "CheckedIn" && (
                  <div className="mt-3 rounded-lg border border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20 p-3">
                    <p className="text-xs text-green-700 dark:text-green-400">
                      ✓ Check-in verified successfully. Your internship has officially started.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Supported Methods */}
      <Card className="border-dashed">
        <CardContent className="p-5">
          <p className="mb-3 text-sm font-semibold text-foreground">Supported Verification Methods</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { method: "QR",          desc: "Scan QR code at company entrance" },
              { method: "RFID",        desc: "Tap RFID card at reader" },
              { method: "Fingerprint", desc: "Place finger on scanner" },
              { method: "Face",        desc: "Face recognition at terminal" },
            ].map((m) => (
              <div key={m.method} className="rounded-lg bg-muted/50 p-3 text-center">
                <QrCodeIcon className="mx-auto mb-1.5 size-6 text-muted-foreground" />
                <p className="text-xs font-medium text-foreground">{m.method}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{m.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Verification method depends on your company's setup. Contact your company HR for details.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
