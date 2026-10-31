"use client";

import { useState } from "react";
import {
  QrCodeIcon, CheckCircle2Icon, XCircleIcon, ClockIcon, ScanLineIcon,
  ShieldCheckIcon, FingerprintIcon, UserCheckIcon, SparklesIcon,
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/common/EmptyState";
import { mockVerifications } from "@/data/verification";
import { formatDateTime } from "@/lib/formatters";

const METHOD_COLOR: Record<string, string> = {
  QR: "border-blue-500/30 text-blue-400 bg-blue-500/10",
  RFID: "border-purple-500/30 text-purple-400 bg-purple-500/10",
  Fingerprint: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
  Face: "border-pink-500/30 text-pink-400 bg-pink-500/10",
};

export default function VerificationPage() {
  const [records, setRecords] = useState(mockVerifications);
  const [activeTab, setActiveTab] = useState<string>("all");

  const verified = records.filter((r) => r.status === "Verified");
  const pending = records.filter((r) => r.status === "Pending");
  const failed = records.filter((r) => r.status === "Failed");

  const markVerified = (id: string) =>
    setRecords((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: "Verified" as const, verifiedAt: new Date().toISOString() } : r
      )
    );

  const VerificationCard = ({ rec }: { rec: (typeof records)[0] }) => (
    <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-5 shadow-xl backdrop-blur-md space-y-4 hover:border-primary/40 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/50 dark:border-white/5">
        <div className="flex items-center gap-3">
          <div className="size-11 rounded-2xl bg-gradient-to-br from-primary/20 to-indigo-600/30 border border-primary/30 flex items-center justify-center text-primary font-bold text-sm shrink-0">
            {rec.studentName.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground">{rec.studentName}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {rec.internshipTitle} · <span className="text-foreground font-medium">{rec.companyName}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Badge
            variant="outline"
            className={`text-xs font-semibold ${
              rec.status === "Verified"
                ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10"
                : rec.status === "Pending"
                ? "border-amber-500/30 text-amber-400 bg-amber-500/10"
                : "border-rose-500/30 text-rose-400 bg-rose-500/10"
            }`}
          >
            {rec.status}
          </Badge>
          <span className={`rounded-lg px-2.5 py-1 text-xs font-semibold border ${METHOD_COLOR[rec.method]}`}>
            {rec.method}
          </span>
        </div>
      </div>

      {rec.notes && (
        <div className="rounded-xl bg-muted/40 dark:bg-white/[0.02] border border-border/40 dark:border-white/5 p-3 text-xs text-slate-300">
          <strong className="text-foreground">Authentication Logs:</strong> {rec.notes}
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
        <span>Recorded: {formatDateTime(rec.createdAt)}</span>
        {rec.verifiedAt && <span>Verified: {formatDateTime(rec.verifiedAt)}</span>}
      </div>

      {rec.status === "Pending" && (
        <Button
          size="sm"
          onClick={() => markVerified(rec.id)}
          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold shadow-md active:scale-95"
        >
          <CheckCircle2Icon className="mr-1.5 size-4" />
          Mark as Authenticated & Verified
        </Button>
      )}

      {rec.status === "Failed" && (
        <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 space-y-2">
          <p className="text-xs text-rose-400 font-medium">Authentication discrepancy detected. Manual administrative override required.</p>
          <Button
            size="sm"
            variant="outline"
            onClick={() => markVerified(rec.id)}
            className="w-full border-rose-500/30 text-rose-400 hover:bg-rose-500/10 text-xs font-semibold"
          >
            Override & Clear Identity Manually
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-br from-[#0c1222] via-[#0f172a] to-[#1e1338] p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl">
        <div className="absolute -top-32 -right-24 h-96 w-96 rounded-full bg-gradient-to-br from-primary/20 via-purple-500/15 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-gradient-to-tr from-cyan-500/15 via-blue-500/10 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
              <ShieldCheckIcon className="h-3.5 w-3.5" />
              Central Identity Verification Service (CIVS)
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Identity <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Verification</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed font-normal">
              Manage cryptographic Aadhaar eKYC authentication, biometric scans, and university enrollment validations for all allocated interns.
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold backdrop-blur-md">
            <UserCheckIcon className="h-4 w-4" />
            <span>97.2% Identity Authenticity Index</span>
          </div>
        </div>
      </div>

      {/* 3 Interactive Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          {
            title: "Verified Scholars",
            value: verified.length,
            tab: "verified",
            color: "from-emerald-500 to-teal-600",
            accent: "#10b981",
            icon: CheckCircle2Icon,
            sub: "Full clearance confirmed",
          },
          {
            title: "Pending Clearance",
            value: pending.length,
            tab: "pending",
            color: "from-amber-500 to-orange-600",
            accent: "#f59e0b",
            icon: ClockIcon,
            sub: "Awaiting document scan",
          },
          {
            title: "Verification Failures",
            value: failed.length,
            tab: "failed",
            color: "from-rose-500 to-pink-600",
            accent: "#f43f5e",
            icon: XCircleIcon,
            sub: "Flagged identity conflicts",
          },
        ].map((stat) => {
          const Icon = stat.icon;
          const isSelected = activeTab === stat.tab;
          return (
            <div
              key={stat.title}
              onClick={() => setActiveTab(stat.tab)}
              className={`cursor-pointer group relative overflow-hidden rounded-2xl border bg-card/90 dark:bg-[#0e1322]/90 p-5 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 ${
                isSelected
                  ? "border-primary ring-2 ring-primary/40 shadow-primary/20"
                  : "border-border/80 dark:border-white/10 hover:border-primary/50"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">{stat.title}</p>
                  <p className="mt-2 text-3xl font-extrabold tracking-tight text-foreground">{stat.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{stat.sub}</p>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-md group-hover:scale-110 transition-transform`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-card/80 dark:bg-[#0e1322]/80 border border-border/80 dark:border-white/10 p-1 rounded-xl">
          <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg text-xs font-semibold">
            All Records ({records.length})
          </TabsTrigger>
          <TabsTrigger value="verified" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg text-xs font-semibold">
            Verified ({verified.length})
          </TabsTrigger>
          <TabsTrigger value="pending" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg text-xs font-semibold">
            Pending Queue ({pending.length})
          </TabsTrigger>
          <TabsTrigger value="failed" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg text-xs font-semibold">
            Failed / Flagged ({failed.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {records.map((rec) => <VerificationCard key={rec.id} rec={rec} />)}
        </TabsContent>

        <TabsContent value="verified" className="space-y-4">
          {verified.length === 0 ? (
            <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-8 shadow-xl backdrop-blur-md">
              <EmptyState title="No verified records" />
            </div>
          ) : (
            verified.map((rec) => <VerificationCard key={rec.id} rec={rec} />)
          )}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {pending.length === 0 ? (
            <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-8 shadow-xl backdrop-blur-md">
              <EmptyState title="All students verified" description="No pending verification records in queue." />
            </div>
          ) : (
            pending.map((rec) => <VerificationCard key={rec.id} rec={rec} />)
          )}
        </TabsContent>

        <TabsContent value="failed" className="space-y-4">
          {failed.length === 0 ? (
            <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-8 shadow-xl backdrop-blur-md">
              <EmptyState title="Zero failed records" description="No security or biometric discrepancies found." />
            </div>
          ) : (
            failed.map((rec) => <VerificationCard key={rec.id} rec={rec} />)
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
