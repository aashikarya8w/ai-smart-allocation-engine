"use client";

import { useState } from "react";
import {
  SaveIcon, ShieldIcon, BellIcon, SlidersIcon, GlobeIcon,
  ShieldCheckIcon, LockIcon, AlertTriangleIcon, SparklesIcon,
  CheckCircle2Icon, CpuIcon, DownloadIcon, RefreshCwIcon,
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { APP_NAME, SCHEME_CODE, SCHEME_NAME } from "@/lib/constants";

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [notifications, setNotifications] = useState({
    newRegistrations: true,
    verificationRequests: true,
    allocationResults: true,
    systemAlerts: true,
    weeklyReport: false,
  });
  const [allocation, setAllocation] = useState({
    maxAllocationsPerStudent: 1,
    autoApproveThreshold: 90,
    enableWaitlist: true,
    waitlistSize: 20,
    enableReallocation: true,
    enableSwaps: true,
  });

  const save = async () => {
    await new Promise((r) => setTimeout(r, 600));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8 pb-12 max-w-4xl">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-br from-[#0c1222] via-[#0f172a] to-[#1e1338] p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl">
        <div className="absolute -top-32 -right-24 h-96 w-96 rounded-full bg-gradient-to-br from-primary/20 via-purple-500/15 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-gradient-to-tr from-cyan-500/15 via-blue-500/10 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
              <SlidersIcon className="h-3.5 w-3.5" />
              Central System Control Panel
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              System <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Settings & Policy</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed font-normal">
              Manage platform hyperparameters, feature gates, automated allocation thresholds, notification pipelines, and cryptographic access parameters.
            </p>
          </div>

          <Button
            size="sm"
            onClick={save}
            className="bg-gradient-to-r from-primary via-indigo-600 to-purple-600 hover:from-primary/90 hover:to-purple-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-primary/25 active:scale-95 transition-all gap-2"
          >
            <SaveIcon className="size-4" />
            {saved ? "Settings Saved!" : "Save Configuration"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-card/80 dark:bg-[#0e1322]/80 border border-border/80 dark:border-white/10 p-1 rounded-xl">
          <TabsTrigger value="general" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg text-xs font-semibold">
            Platform Info & Flags
          </TabsTrigger>
          <TabsTrigger value="allocation" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg text-xs font-semibold">
            Allocation Hyperparameters
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg text-xs font-semibold">
            Notification Telemetry
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg text-xs font-semibold">
            Security & Danger Zone
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: General */}
        <TabsContent value="general" className="space-y-6">
          <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-6 shadow-xl backdrop-blur-md space-y-5">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2 border-b border-border/50 dark:border-white/5 pb-3">
              <GlobeIcon className="size-4 text-primary" />
              Statutory Program Identity
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Platform Brand Identifier</Label>
                <Input defaultValue={APP_NAME} className="bg-muted/40 dark:bg-white/[0.03] border-border/60 dark:border-white/10 font-semibold" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">National Scheme Code</Label>
                <Input defaultValue={SCHEME_CODE} readOnly className="bg-muted/40 dark:bg-white/[0.03] border-border/60 dark:border-white/10 font-mono cursor-not-allowed opacity-80" />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label className="text-xs text-muted-foreground">Official Government Scheme Nomenclature</Label>
                <Input defaultValue={SCHEME_NAME} className="bg-muted/40 dark:bg-white/[0.03] border-border/60 dark:border-white/10" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 pt-2">
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Default Interface Locale</Label>
                <Select defaultValue="en">
                  <SelectTrigger className="bg-muted/40 dark:bg-white/[0.03] border-border/60 dark:border-white/10 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-[#0e1322] border-white/10 text-white">
                    <SelectItem value="en">English (Official National Portal)</SelectItem>
                    <SelectItem value="hi">Hindi (हिंदी - राजभाषा)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Platform Chronological Standard</Label>
                <Select defaultValue="IST">
                  <SelectTrigger className="bg-muted/40 dark:bg-white/[0.03] border-border/60 dark:border-white/10 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-[#0e1322] border-white/10 text-white">
                    <SelectItem value="IST">Indian Standard Time - IST (UTC+5:30)</SelectItem>
                    <SelectItem value="UTC">Coordinated Universal Time - UTC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Feature Flags */}
          <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-6 shadow-xl backdrop-blur-md space-y-4">
            <h3 className="text-base font-bold text-foreground border-b border-border/50 dark:border-white/5 pb-3">
              Operational Feature Flags & Modules
            </h3>
            <div className="space-y-3">
              {[
                { label: "Gale-Shapley AI Matching Engine", desc: "Enable automated multi-factor applicant scoring", key: "aiMatching" },
                { label: "Deterministic Smart Seat Allocation", desc: "Permit algorithmic round execution and capacity resolution", key: "smartAlloc" },
                { label: "What-If Career Simulator", desc: "Allow students to model prerequisite modifications and eligibility", key: "whatIf" },
                { label: "Digital Readiness Twin", desc: "Compute continuous role compatibility and skill gap radar", key: "readiness" },
                { label: "Pareto Mutual Swap Protocol", desc: "Allow verified candidates to propose bilateral seat trades", key: "swaps" },
                { label: "Capacity Stress Simulation Lab", desc: "Enable non-production sandboxed macro capacity planning", key: "capacity" },
              ].map((f) => (
                <div
                  key={f.key}
                  className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-muted/30 dark:bg-white/[0.01] border border-border/40 dark:border-white/5"
                >
                  <div>
                    <p className="text-sm font-bold text-foreground">{f.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{f.desc}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Tab 2: Allocation Settings */}
        <TabsContent value="allocation" className="space-y-6">
          <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-6 shadow-xl backdrop-blur-md space-y-5">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2 border-b border-border/50 dark:border-white/5 pb-3">
              <SlidersIcon className="size-4 text-primary" />
              Allocation Thresholds & Capacity Rules
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Max Allocations per Candidate</Label>
                <Input
                  type="number"
                  value={allocation.maxAllocationsPerStudent}
                  onChange={(e) => setAllocation((p) => ({ ...p, maxAllocationsPerStudent: +e.target.value }))}
                  min={1}
                  max={3}
                  className="bg-muted/40 dark:bg-white/[0.03] border-border/60 dark:border-white/10 font-bold"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Auto-Approval Threshold (% Match)</Label>
                <Input
                  type="number"
                  value={allocation.autoApproveThreshold}
                  onChange={(e) => setAllocation((p) => ({ ...p, autoApproveThreshold: +e.target.value }))}
                  min={0}
                  max={100}
                  className="bg-muted/40 dark:bg-white/[0.03] border-border/60 dark:border-white/10 font-bold"
                />
                <p className="text-[11px] text-muted-foreground">Offers scoring above this score are auto-cleared</p>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Waitlist Depth per Opportunity</Label>
                <Input
                  type="number"
                  value={allocation.waitlistSize}
                  onChange={(e) => setAllocation((p) => ({ ...p, waitlistSize: +e.target.value }))}
                  min={0}
                  max={100}
                  className="bg-muted/40 dark:bg-white/[0.03] border-border/60 dark:border-white/10 font-bold"
                />
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t border-border/50 dark:border-white/5">
              {[
                { label: "Enable Waitlist Automation", key: "enableWaitlist" as const, desc: "Place qualified runner-up candidates in buffer queue" },
                { label: "Automated Vacancy Reallocation", key: "enableReallocation" as const, desc: "Automatically trigger backfill on forfeited offers" },
                { label: "Bilateral Mutual Swap Verification", key: "enableSwaps" as const, desc: "Allow students to initiate mutual bilateral trades" },
              ].map((f) => (
                <div
                  key={f.key}
                  className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-muted/30 dark:bg-white/[0.01] border border-border/40 dark:border-white/5"
                >
                  <div>
                    <p className="text-sm font-bold text-foreground">{f.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{f.desc}</p>
                  </div>
                  <Switch
                    checked={allocation[f.key]}
                    onCheckedChange={(v) => setAllocation((p) => ({ ...p, [f.key]: v }))}
                  />
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Tab 3: Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-6 shadow-xl backdrop-blur-md space-y-4">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2 border-b border-border/50 dark:border-white/5 pb-3">
              <BellIcon className="size-4 text-primary" />
              Administrative Alert Feeds
            </h3>
            <div className="space-y-3">
              {(Object.entries(notifications) as [keyof typeof notifications, boolean][]).map(([key, val]) => (
                <div
                  key={key}
                  className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-muted/30 dark:bg-white/[0.01] border border-border/40 dark:border-white/5"
                >
                  <div>
                    <Label className="text-sm font-bold capitalize text-foreground">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </Label>
                    <p className="text-xs text-muted-foreground mt-0.5">Real-time alert dispatch to administrative terminals</p>
                  </div>
                  <Switch
                    checked={val}
                    onCheckedChange={(v) => setNotifications((p) => ({ ...p, [key]: v }))}
                  />
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Tab 4: Security & Danger Zone */}
        <TabsContent value="security" className="space-y-6">
          <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-6 shadow-xl backdrop-blur-md space-y-4">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2 border-b border-border/50 dark:border-white/5 pb-3">
              <ShieldCheckIcon className="size-4 text-primary" />
              Security Protocol Standards
            </h3>
            <div className="space-y-3">
              {[
                { label: "Hardware Multi-Factor Authentication (MFA)", desc: "Mandatory TOTP or FIDO2 key for all administrator logins", on: true },
                { label: "SHA-256 Immutable Audit Logging", desc: "Cryptographically sign every administrative modification event", on: true },
                { label: "Administrative Inactivity Timeout (30 min)", desc: "Auto-terminate idle administrative sessions", on: true },
                { label: "Ministry IP Whitelist Enforcement", desc: "Restrict console access to authorized government VPN gateways", on: false },
                { label: "Rotational Password Cycle (90 Days)", desc: "Enforce rotational secret policy across administrative personnel", on: false },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-muted/30 dark:bg-white/[0.01] border border-border/40 dark:border-white/5"
                >
                  <div>
                    <p className="text-sm font-bold text-foreground">{s.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{s.desc}</p>
                  </div>
                  <Switch defaultChecked={s.on} />
                </div>
              ))}
            </div>
          </div>

          {/* Danger Zone */}
          <div className="rounded-2xl border border-rose-500/30 bg-rose-500/5 p-6 shadow-xl backdrop-blur-md space-y-4">
            <h3 className="text-base font-bold text-rose-400 border-b border-rose-500/20 pb-3 flex items-center gap-2">
              <AlertTriangleIcon className="size-4" />
              Administrative Danger Zone
            </h3>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-rose-500/20">
                <div>
                  <p className="text-sm font-bold text-foreground">Purge Allocation Run Cycle</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Permanently clear simulated or unconfirmed allocations for the current cycle.</p>
                </div>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => alert("Danger Action: Purge simulated allocations requires ministerial authentication.")}
                  className="font-semibold active:scale-95 shrink-0"
                >
                  Reset Current Cycle
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-foreground">Full Platform Data Snapshot Export</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Download full cryptographic backup archive of students, companies, and allocations.</p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => alert("Full snapshot export compiling...")}
                  className="border-white/10 hover:bg-white/5 text-xs font-semibold shrink-0 gap-1.5"
                >
                  <DownloadIcon className="size-3.5" />
                  Export Full Archive (.tar.gz)
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
