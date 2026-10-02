"use client";

import { useState } from "react";
import { QrCodeIcon, CheckCircleIcon, XCircleIcon, ClockIcon, ScanLineIcon } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/common/EmptyState";
import { mockVerifications } from "@/data/verification";
import { formatDateTime } from "@/lib/formatters";

const METHOD_COLOR: Record<string, string> = {
  QR:          "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  RFID:        "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
  Fingerprint: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  Face:        "bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300",
};

export default function VerificationPage() {
  const [records, setRecords] = useState(mockVerifications);

  const verified = records.filter((r) => r.status === "Verified");
  const pending  = records.filter((r) => r.status === "Pending");
  const failed   = records.filter((r) => r.status === "Failed");

  const markVerified = (id: string) =>
    setRecords((prev) => prev.map((r) => r.id === id ? { ...r, status: "Verified" as const, verifiedAt: new Date().toISOString() } : r));

  const VerificationCard = ({ rec }: { rec: (typeof records)[0] }) => (
    <Card>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-medium text-foreground">{rec.studentName}</p>
            <p className="text-sm text-muted-foreground">{rec.internshipTitle}</p>
            <p className="text-xs text-muted-foreground">{rec.companyName}</p>
          </div>
          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <Badge
              variant={rec.status === "Verified" ? "default" : rec.status === "Pending" ? "secondary" : "destructive"}
              className="text-xs"
            >
              {rec.status}
            </Badge>
            <span className={`rounded px-1.5 py-0.5 text-xs font-medium ${METHOD_COLOR[rec.method]}`}>
              {rec.method}
            </span>
          </div>
        </div>

        {rec.notes && (
          <div className="rounded-lg bg-muted/50 p-2.5">
            <p className="text-xs text-muted-foreground">{rec.notes}</p>
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Created {formatDateTime(rec.createdAt)}</span>
          {rec.verifiedAt && <span>Verified {formatDateTime(rec.verifiedAt)}</span>}
        </div>

        {rec.status === "Pending" && (
          <Button size="sm" onClick={() => markVerified(rec.id)} className="w-full">
            <CheckCircleIcon className="mr-1.5 size-4" />Mark as Verified
          </Button>
        )}
        {rec.status === "Failed" && (
          <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-2.5">
            <p className="text-xs text-destructive">Verification failed. Manual review required.</p>
            <Button size="sm" variant="outline" onClick={() => markVerified(rec.id)} className="mt-2 w-full">
              Override & Verify Manually
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Identity Verification"
        description="Manage student identity and internship allocation verification records."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard title="Verified"      value={verified.length} icon={CheckCircleIcon} trend="up"      />
        <StatCard title="Pending"       value={pending.length}  icon={ClockIcon}       trend="neutral" />
        <StatCard title="Failed"        value={failed.length}   icon={XCircleIcon}     trend="neutral" />
      </div>

      {/* Verification methods */}
      <Card className="border-dashed">
        <CardContent className="p-4">
          <p className="text-xs font-semibold text-foreground mb-3">Supported Verification Methods</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { method: "QR",          desc: "Student scans QR code at entrance", icon: "📱" },
              { method: "RFID",        desc: "RFID card tap verification",         icon: "💳" },
              { method: "Fingerprint", desc: "Biometric fingerprint scanner",      icon: "👆" },
              { method: "Face",        desc: "Face recognition terminal",          icon: "👤" },
            ].map((m) => (
              <div key={m.method} className="rounded-lg bg-muted/50 p-3 text-center">
                <p className="text-2xl mb-1">{m.icon}</p>
                <p className="text-xs font-semibold text-foreground">{m.method}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{m.desc}</p>
                <span className={`mt-2 inline-flex rounded px-1.5 py-0.5 text-[11px] font-medium ${METHOD_COLOR[m.method]}`}>
                  {m.method}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            These are frontend prototypes. Hardware integration to be implemented in the next phase.
            Verification is for identity confirmation only — it does not affect match or suitability scores.
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All ({records.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pending.length})</TabsTrigger>
          <TabsTrigger value="verified">Verified ({verified.length})</TabsTrigger>
          <TabsTrigger value="failed">Failed ({failed.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-3 pt-4">
          {records.map((r) => <VerificationCard key={r.id} rec={r} />)}
        </TabsContent>
        <TabsContent value="pending" className="space-y-3 pt-4">
          {pending.length === 0
            ? <EmptyState icon={ClockIcon} title="No pending verifications" />
            : pending.map((r) => <VerificationCard key={r.id} rec={r} />)}
        </TabsContent>
        <TabsContent value="verified" className="space-y-3 pt-4">
          {verified.map((r) => <VerificationCard key={r.id} rec={r} />)}
        </TabsContent>
        <TabsContent value="failed" className="space-y-3 pt-4">
          {failed.length === 0
            ? <EmptyState icon={XCircleIcon} title="No failed verifications" />
            : failed.map((r) => <VerificationCard key={r.id} rec={r} />)}
        </TabsContent>
      </Tabs>
    </div>
  );
}
