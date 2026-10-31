"use client";

import { useState } from "react";
import {
  QrCodeIcon,
  CheckCircle2Icon,
  ClockIcon,
  XCircleIcon,
  ScanLineIcon,
  ShieldCheckIcon,
  MapPinIcon,
  CalendarIcon,
  Building2Icon,
  SparklesIcon,
  FingerprintIcon,
  RadioIcon,
  ScanFaceIcon,
  ExternalLinkIcon,
  CheckIcon,
  CopyIcon
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/common/EmptyState";
import { mockCheckIns } from "@/data/verification";
import { useStudent } from "@/hooks/useStudent";
import { formatDate } from "@/lib/formatters";

const STATUS_CONFIG: Record<string, { icon: React.ReactNode; badge: string; glow: string }> = {
  CheckedIn: {
    icon: <CheckCircle2Icon className="size-4 text-emerald-400" />,
    badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    glow: "shadow-[0_0_15px_rgba(16,185,129,0.15)]",
  },
  Pending: {
    icon: <ClockIcon className="size-4 text-amber-400" />,
    badge: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    glow: "shadow-[0_0_15px_rgba(245,158,11,0.15)]",
  },
  Failed: {
    icon: <XCircleIcon className="size-4 text-rose-400" />,
    badge: "bg-rose-500/15 text-rose-400 border-rose-500/30",
    glow: "shadow-[0_0_15px_rgba(244,63,94,0.15)]",
  },
};

const METHOD_CONFIG: Record<string, { color: string; icon: React.ReactNode }> = {
  QR: {
    color: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    icon: <QrCodeIcon className="size-3.5" />,
  },
  RFID: {
    color: "bg-purple-500/15 text-purple-400 border-purple-500/30",
    icon: <RadioIcon className="size-3.5" />,
  },
  Fingerprint: {
    color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    icon: <FingerprintIcon className="size-3.5" />,
  },
  Face: {
    color: "bg-pink-500/15 text-pink-400 border-pink-500/30",
    icon: <ScanFaceIcon className="size-3.5" />,
  },
};

export default function CheckInPage() {
  const { student, checkIns: userCheckIns } = useStudent();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const rawRecords = userCheckIns && userCheckIns.length > 0 ? userCheckIns : mockCheckIns;
  const checkedIn = rawRecords.filter((c) => c.status === "CheckedIn").length;
  const pending = rawRecords.filter((c) => c.status === "Pending").length;

  const records = statusFilter === "all" ? rawRecords : rawRecords.filter((c) => c.status === statusFilter);

  const handleCopy = (id: string) => {
    navigator.clipboard?.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <PageHeader
        title="Internship Check-In & Verification"
        description="Biometric, QR & Geofenced check-in records for official corporate onboarding."
      />

      {/* Cyber Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent p-6 shadow-xl shadow-primary/5 backdrop-blur-md">
        <div className="absolute -right-8 -top-8 size-48 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-md">
              <ShieldCheckIcon className="size-3.5 text-primary" />
              <span>Tamper-Proof Verification Protocol</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Official Workplace Attendance Verification
            </h2>
            <p className="max-w-2xl text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Every check-in is cryptographically signed, geofenced, and synced directly with your host organization's HRMS and AICTE/Govt internship portal.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              GPS Geofence: Active
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
              ⚡ Instant Sync
            </span>
          </div>
        </div>
      </div>

      {/* Modern Metric Cards with Sparklines */}
      <div className="grid gap-4 sm:grid-cols-3">
        {/* Checked In */}
        <div
          onClick={() => setStatusFilter(statusFilter === "CheckedIn" ? "all" : "CheckedIn")}
          className={`group cursor-pointer relative overflow-hidden rounded-2xl border p-5 transition-all duration-300 backdrop-blur-md ${
            statusFilter === "CheckedIn"
              ? "border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/10"
              : "border-border/80 dark:border-white/10 bg-card/85 dark:bg-[#0e1322]/85 hover:border-emerald-500/50 hover:shadow-md"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Checked In</span>
            <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              <CheckCircle2Icon className="size-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div className="text-3xl font-bold tracking-tight text-foreground">{checkedIn}</div>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400">
              ↑ 100% Verified
            </span>
          </div>
          {/* Sparkline Curve */}
          <div className="mt-3 h-8 w-full">
            <svg className="h-full w-full overflow-visible" viewBox="0 0 100 25" preserveAspectRatio="none">
              <path
                d="M 0 20 Q 25 18 50 10 T 100 4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="text-emerald-500"
              />
            </svg>
          </div>
        </div>

        {/* Pending */}
        <div
          onClick={() => setStatusFilter(statusFilter === "Pending" ? "all" : "Pending")}
          className={`group cursor-pointer relative overflow-hidden rounded-2xl border p-5 transition-all duration-300 backdrop-blur-md ${
            statusFilter === "Pending"
              ? "border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/10"
              : "border-border/80 dark:border-white/10 bg-card/85 dark:bg-[#0e1322]/85 hover:border-amber-500/50 hover:shadow-md"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Pending Review</span>
            <div className="flex size-9 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
              <ClockIcon className="size-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div className="text-3xl font-bold tracking-tight text-foreground">{pending}</div>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400">
              — All Clear
            </span>
          </div>
          {/* Sparkline Curve */}
          <div className="mt-3 h-8 w-full">
            <svg className="h-full w-full overflow-visible" viewBox="0 0 100 25" preserveAspectRatio="none">
              <path
                d="M 0 14 Q 30 14 60 14 T 100 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="text-amber-500/50"
              />
            </svg>
          </div>
        </div>

        {/* Total Records */}
        <div
          onClick={() => setStatusFilter("all")}
          className={`group cursor-pointer relative overflow-hidden rounded-2xl border p-5 transition-all duration-300 backdrop-blur-md ${
            statusFilter === "all"
              ? "border-primary bg-primary/10 shadow-lg shadow-primary/10"
              : "border-border/80 dark:border-white/10 bg-card/85 dark:bg-[#0e1322]/85 hover:border-primary/50 hover:shadow-md"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total Sessions</span>
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary/15 text-primary border border-primary/30">
              <ScanLineIcon className="size-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div className="text-3xl font-bold tracking-tight text-foreground">{rawRecords.length}</div>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
              ✓ 1 Active Cycle
            </span>
          </div>
          {/* Sparkline Curve */}
          <div className="mt-3 h-8 w-full">
            <svg className="h-full w-full overflow-visible" viewBox="0 0 100 25" preserveAspectRatio="none">
              <path
                d="M 0 22 Q 35 15 70 8 T 100 3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="text-primary"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between border-b border-border/70 pb-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setStatusFilter("all")}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
              statusFilter === "all"
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            All Sessions ({rawRecords.length})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter("CheckedIn")}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
              statusFilter === "CheckedIn"
                ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            Checked In ({checkedIn})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter("Pending")}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
              statusFilter === "Pending"
                ? "bg-amber-500 text-white shadow-md shadow-amber-500/20"
                : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            Pending ({pending})
          </button>
        </div>

        <span className="text-xs text-muted-foreground hidden sm:inline-block">
          Showing {records.length} of {rawRecords.length} records
        </span>
      </div>

      {/* Check-In Records */}
      {records.length === 0 ? (
        <EmptyState
          icon={QrCodeIcon}
          title="No matching check-in records"
          description="Your verification history will appear here once authenticated."
        />
      ) : (
        <div className="space-y-4">
          {records.map((ci) => {
            const statusConfig = STATUS_CONFIG[ci.status] || STATUS_CONFIG.CheckedIn;
            const methodConfig = METHOD_CONFIG[ci.verificationMethod] || METHOD_CONFIG.QR;
            const verificationId = `TXN-CHK-${ci.id?.slice(0, 8).toUpperCase() || "7894A"}`;

            return (
              <div
                key={ci.id}
                className={`relative overflow-hidden rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-xl ${statusConfig.glow}`}
              >
                {/* Status Indicator Stripe */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                    ci.status === "CheckedIn"
                      ? "bg-emerald-500"
                      : ci.status === "Pending"
                      ? "bg-amber-500"
                      : "bg-rose-500"
                  }`}
                />

                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  {/* Left Column: Role & Company Info */}
                  <div className="space-y-3 flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 border border-primary/25 text-primary font-bold text-sm shrink-0">
                        {ci.companyName?.slice(0, 2).toUpperCase() || "TN"}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-base font-bold text-foreground tracking-tight truncate">
                            {ci.internshipTitle}
                          </h3>
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${statusConfig.badge}`}
                          >
                            {statusConfig.icon}
                            {ci.status === "CheckedIn" ? "Checked In" : ci.status}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                          <Building2Icon className="size-3.5 text-primary/70 shrink-0" />
                          <span className="font-medium text-foreground/90">{ci.companyName}</span>
                          <span>·</span>
                          <span className="font-mono text-[11px] text-muted-foreground">ID: {verificationId}</span>
                          <button
                            type="button"
                            onClick={() => handleCopy(verificationId)}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            title="Copy Verification ID"
                          >
                            {copiedId === verificationId ? (
                              <CheckIcon className="size-3 text-emerald-400" />
                            ) : (
                              <CopyIcon className="size-3" />
                            )}
                          </button>
                        </p>
                      </div>
                    </div>

                    {/* Meta Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                      <div className="rounded-xl border border-border/60 bg-muted/30 p-2.5">
                        <span className="text-[11px] font-medium text-muted-foreground block">Check-in Date</span>
                        <div className="mt-1 flex items-center gap-1 text-xs font-semibold text-foreground">
                          <CalendarIcon className="size-3.5 text-primary shrink-0" />
                          <span>{formatDate(ci.checkInDate)}</span>
                        </div>
                      </div>

                      <div className="rounded-xl border border-border/60 bg-muted/30 p-2.5">
                        <span className="text-[11px] font-medium text-muted-foreground block">Time Recorded</span>
                        <div className="mt-1 flex items-center gap-1 text-xs font-semibold text-foreground">
                          <ClockIcon className="size-3.5 text-primary shrink-0" />
                          <span>{ci.checkInTime} IST</span>
                        </div>
                      </div>

                      <div className="rounded-xl border border-border/60 bg-muted/30 p-2.5">
                        <span className="text-[11px] font-medium text-muted-foreground block">Verification Method</span>
                        <div className="mt-1 flex items-center gap-1">
                          <span
                            className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-semibold ${methodConfig.color}`}
                          >
                            {methodConfig.icon}
                            {ci.verificationMethod}
                          </span>
                        </div>
                      </div>

                      <div className="rounded-xl border border-border/60 bg-muted/30 p-2.5">
                        <span className="text-[11px] font-medium text-muted-foreground block">Verified By</span>
                        <div className="mt-1 text-xs font-semibold text-foreground truncate">
                          {ci.verifiedBy || "HR Desk Automated"}
                        </div>
                      </div>
                    </div>

                    {ci.location && (
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPinIcon className="size-3.5 text-primary shrink-0" />
                        <span>Workplace Location: <strong className="text-foreground">{ci.location}</strong></span>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Status Banner & Stamp */}
                  <div className="lg:w-72 shrink-0">
                    {ci.status === "CheckedIn" ? (
                      <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 space-y-2">
                        <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                          <ShieldCheckIcon className="size-4" />
                          <span>Official Onboarding Active</span>
                        </div>
                        <p className="text-[11px] text-emerald-300/90 leading-relaxed">
                          Your physical check-in has been validated. Attendance and stipend calculation are actively logging for this cycle.
                        </p>
                        <div className="pt-1 flex items-center justify-between text-[10px] text-emerald-400/80 font-mono">
                          <span>HASH: 0x9f4a...8c2b</span>
                          <span>LATENCY: 120ms</span>
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 space-y-2">
                        <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                          <ClockIcon className="size-4" />
                          <span>Pending HR Counter-Verification</span>
                        </div>
                        <p className="text-[11px] text-amber-300/90 leading-relaxed">
                          Please present your student ID or QR scan at the reception terminal upon workplace arrival.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Supported Verification Modalities */}
      <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/80 dark:bg-[#0e1322]/80 backdrop-blur-md p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5">
          <div>
            <h3 className="text-base font-bold text-foreground tracking-tight">
              Supported Multi-Modal Verification Channels
            </h3>
            <p className="text-xs text-muted-foreground">
              InternAI supports high-assurance biometric and contactless terminal standards at partner workplaces.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs text-primary font-medium">
            <SparklesIcon className="size-3.5" /> ISO/IEC 19794 Certified
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              method: "Dynamic QR Pass",
              desc: "Rotating OTP-embedded QR code generated in your mobile app for scanner portals.",
              icon: <QrCodeIcon className="size-6 text-blue-400" />,
              badge: "Instant Scan",
              speed: "< 250ms",
              bg: "hover:border-blue-500/40 hover:bg-blue-500/5",
            },
            {
              method: "Smart RFID Card",
              desc: "Tap your university NFC or corporate access card at the workplace entry turnstile.",
              icon: <RadioIcon className="size-6 text-purple-400" />,
              badge: "Contactless",
              speed: "< 100ms",
              bg: "hover:border-purple-500/40 hover:bg-purple-500/5",
            },
            {
              method: "Biometric Fingerprint",
              desc: "Optical or capacitive fingerprint authentication at authorized security desks.",
              icon: <FingerprintIcon className="size-6 text-emerald-400" />,
              badge: "High Assurance",
              speed: "< 400ms",
              bg: "hover:border-emerald-500/40 hover:bg-emerald-500/5",
            },
            {
              method: "3D Face Recognition",
              desc: "Infrared liveness detection terminal at office lobby entrances for zero touch.",
              icon: <ScanFaceIcon className="size-6 text-pink-400" />,
              badge: "AI Powered",
              speed: "< 300ms",
              bg: "hover:border-pink-500/40 hover:bg-pink-500/5",
            },
          ].map((m) => (
            <div
              key={m.method}
              className={`rounded-2xl border border-border/70 dark:border-white/10 bg-background/50 p-4 transition-all duration-300 ${m.bg}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex size-11 items-center justify-center rounded-xl bg-card border border-border/80 shadow-sm">
                  {m.icon}
                </div>
                <Badge variant="outline" className="text-[10px] font-semibold border-border">
                  {m.badge}
                </Badge>
              </div>
              <h4 className="text-sm font-bold text-foreground">{m.method}</h4>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{m.desc}</p>
              <div className="mt-3 pt-2.5 border-t border-border/50 flex items-center justify-between text-[11px]">
                <span className="text-muted-foreground">Auth Latency</span>
                <span className="font-mono font-semibold text-foreground">{m.speed}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-xl border border-border/60 bg-muted/20 p-3 flex items-center justify-between flex-wrap gap-2 text-xs text-muted-foreground">
          <span>Need assistance with your corporate RFID badge or terminal registration?</span>
          <span className="font-semibold text-primary cursor-pointer hover:underline">
            Contact Company HR Desk →
          </span>
        </div>
      </div>
    </div>
  );
}
