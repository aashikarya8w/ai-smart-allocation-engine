"use client";

import { useState } from "react";
import {
  ActivityIcon, CheckCircle2Icon, ClockIcon, XCircleIcon,
  ShieldCheckIcon, QrCodeIcon, FingerprintIcon, MapPinIcon,
  UserCheckIcon, Building2Icon,
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/common/EmptyState";
import { mockCheckIns } from "@/data/verification";
import { formatDate } from "@/lib/formatters";

const METHOD_COLOR: Record<string, string> = {
  QR: "border-blue-500/30 text-blue-400 bg-blue-500/10",
  RFID: "border-purple-500/30 text-purple-400 bg-purple-500/10",
  Fingerprint: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
  Face: "border-pink-500/30 text-pink-400 bg-pink-500/10",
};

export default function AdminCheckInPage() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const checkedIn = mockCheckIns.filter((c) => c.status === "CheckedIn");
  const pending = mockCheckIns.filter((c) => c.status === "Pending");
  const failed = mockCheckIns.filter((c) => c.status === "Failed");

  const filteredCheckIns =
    statusFilter === "all" ? mockCheckIns : mockCheckIns.filter((c) => c.status === statusFilter);

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
              Biometric & Geofenced Attendance Audit
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Candidate <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Check-In Ledger</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed font-normal">
              Real-time audit log of student physical and remote reporting events, QR code clearances, geofenced timestamps, and employer confirmations.
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold backdrop-blur-md">
            <UserCheckIcon className="h-4 w-4" />
            <span>{(checkedIn.length / (mockCheckIns.length || 1) * 100).toFixed(0)}% Reporting Rate</span>
          </div>
        </div>
      </div>

      {/* 3 Interactive Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          {
            title: "Confirmed Check-Ins",
            value: checkedIn.length,
            status: "CheckedIn",
            icon: CheckCircle2Icon,
            color: "from-emerald-500 to-teal-600",
            accent: "#10b981",
            sub: "Verified at employer facility",
          },
          {
            title: "Pending Reporting",
            value: pending.length,
            status: "Pending",
            icon: ClockIcon,
            color: "from-amber-500 to-orange-600",
            accent: "#f59e0b",
            sub: "Awaiting physical reporting scan",
          },
          {
            title: "Verification Anomalies",
            value: failed.length,
            status: "Failed",
            icon: XCircleIcon,
            color: "from-rose-500 to-pink-600",
            accent: "#f43f5e",
            sub: "Failed geolocation or credential check",
          },
        ].map((stat) => {
          const Icon = stat.icon;
          const isSelected = statusFilter === stat.status;
          return (
            <div
              key={stat.title}
              onClick={() => setStatusFilter(isSelected ? "all" : stat.status)}
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

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-border/60 dark:border-white/10 pb-3">
        {[
          { label: "All Records", value: "all", count: mockCheckIns.length },
          { label: "Checked In", value: "CheckedIn", count: checkedIn.length },
          { label: "Pending Scan", value: "Pending", count: pending.length },
          { label: "Failed / Anomalies", value: "Failed", count: failed.length },
        ].map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setStatusFilter(tab.value)}
            className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
              statusFilter === tab.value
                ? "bg-primary text-white shadow-md shadow-primary/25"
                : "bg-card/80 dark:bg-white/5 text-muted-foreground hover:bg-white/10 border border-border/60 dark:border-white/5"
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Records Feed */}
      {filteredCheckIns.length === 0 ? (
        <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-8 shadow-xl backdrop-blur-md">
          <EmptyState icon={ActivityIcon} title="No matching check-in records found" />
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCheckIns.map((ci) => (
            <div
              key={ci.id}
              className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-5 shadow-xl backdrop-blur-md transition-all hover:border-primary/40 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/30 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-sm shrink-0">
                    {ci.studentName.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground">{ci.studentName}</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                      <Building2Icon className="h-3 w-3 text-primary" />
                      {ci.companyName} · <span className="font-medium text-foreground">{ci.internshipTitle}</span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <span className={`rounded-lg px-2.5 py-1 text-xs font-semibold border ${METHOD_COLOR[ci.verificationMethod] || "bg-muted"}`}>
                    {ci.verificationMethod} Verified
                  </span>
                  <Badge
                    variant="outline"
                    className={`text-xs font-semibold ${
                      ci.status === "CheckedIn"
                        ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10"
                        : ci.status === "Pending"
                        ? "border-amber-500/30 text-amber-400 bg-amber-500/10"
                        : "border-rose-500/30 text-rose-400 bg-rose-500/10"
                    }`}
                  >
                    {ci.status}
                  </Badge>
                </div>
              </div>

              <div className="pt-3 border-t border-border/40 dark:border-white/5 grid gap-2 sm:grid-cols-4 text-xs text-muted-foreground">
                <div>
                  <span className="text-slate-400">Date:</span>{" "}
                  <strong className="text-foreground">{formatDate(ci.checkInDate)}</strong>
                </div>
                <div>
                  <span className="text-slate-400">Timestamp:</span>{" "}
                  <strong className="text-foreground">{ci.checkInTime}</strong>
                </div>
                {ci.location && (
                  <div className="flex items-center gap-1">
                    <MapPinIcon className="h-3 w-3 text-primary shrink-0" />
                    <span className="truncate">{ci.location}</span>
                  </div>
                )}
                {ci.verifiedBy && (
                  <div>
                    <span className="text-slate-400">Verifier:</span>{" "}
                    <strong className="text-foreground">{ci.verifiedBy}</strong>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
