"use client";

import { useState } from "react";
import {
  FlaskConicalIcon, TrendingUpIcon, TrendingDownIcon, SaveIcon, RefreshCwIcon,
  SparklesIcon, CpuIcon, LayersIcon, CheckCircle2Icon, SlidersIcon,
  BarChart3Icon, HistoryIcon, ArrowUpRightIcon,
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  ResponsiveContainer, Legend,
} from "recharts";
import { mockCapacityScenarios } from "@/data/reallocation";
import { formatDate } from "@/lib/formatters";

const BASE = { applicants: 100, seats: 30, companies: 10 };

export default function CapacityPage() {
  const [applicantChange, setApplicantChange] = useState(0);
  const [seatChange, setSeatChange] = useState(0);
  const [newCompanies, setNewCompanies] = useState(0);
  const [simulated, setSimulated] = useState(false);

  const simApplicants = Math.round(BASE.applicants * (1 + applicantChange / 100));
  const simSeats = Math.max(1, Math.round(BASE.seats * (1 + seatChange / 100)));
  const simCompanies = BASE.companies + newCompanies;

  // Projection logic
  const eligRate = 0.72;
  const simEligible = Math.round(simApplicants * eligRate);
  const simAllocated = Math.min(simSeats, simEligible);
  const simWaitlisted = Math.max(0, Math.min(simEligible - simAllocated, Math.round(simSeats * 0.5)));
  const simUnalloc = simApplicants - simAllocated - simWaitlisted;
  const seatUtil = Math.min(100, Math.round((simAllocated / simSeats) * 100));
  const prefSatisf = Math.min(95, Math.round(60 + (simSeats / simApplicants) * 40));

  const barData = [
    {
      name: "Current Base",
      Applicants: BASE.applicants,
      Seats: BASE.seats,
      Eligible: Math.round(BASE.applicants * eligRate),
      Allocated: Math.min(BASE.seats, Math.round(BASE.applicants * eligRate)),
    },
    ...(simulated
      ? [
          {
            name: "Simulated Model",
            Applicants: simApplicants,
            Seats: simSeats,
            Eligible: simEligible,
            Allocated: simAllocated,
          },
        ]
      : []),
  ];

  const reset = () => {
    setApplicantChange(0);
    setSeatChange(0);
    setNewCompanies(0);
    setSimulated(false);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-br from-[#0c1222] via-[#0f172a] to-[#1e1338] p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl">
        <div className="absolute -top-32 -right-24 h-96 w-96 rounded-full bg-gradient-to-br from-primary/20 via-purple-500/15 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-gradient-to-tr from-cyan-500/15 via-blue-500/10 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
              <FlaskConicalIcon className="h-3.5 w-3.5" />
              Algorithmic Stress Testing & Sandbox
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Capacity <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Simulator</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed font-normal">
              Model hypothetical nationwide demand fluctuations, quota expansions, and corporate onboarding spikes to stress-test seat allocation equilibriums without modifying production databases.
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-medium backdrop-blur-md">
            <CpuIcon className="h-4 w-4 shrink-0" />
            <span>Zero Production Mutation Guaranteed</span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="simulator" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList className="bg-card/80 dark:bg-[#0e1322]/80 border border-border/80 dark:border-white/10 p-1 rounded-xl">
            <TabsTrigger value="simulator" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg text-xs font-semibold gap-2">
              <SlidersIcon className="h-3.5 w-3.5" />
              Live Interactive Simulator
            </TabsTrigger>
            <TabsTrigger value="saved" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg text-xs font-semibold gap-2">
              <HistoryIcon className="h-3.5 w-3.5" />
              Saved Scenarios ({mockCapacityScenarios.length})
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Tab 1: Live Simulator */}
        <TabsContent value="simulator" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Left Col: Parameter Tuning Sliders */}
            <div className="space-y-5">
              {/* Applicant Volume */}
              <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-5 shadow-xl backdrop-blur-md space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-foreground">Applicant Volume Delta</h3>
                    <p className="text-xs text-muted-foreground">Current Baseline: {BASE.applicants} students</p>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-primary/10 border border-primary/20">
                    {applicantChange > 0 ? (
                      <TrendingUpIcon className="size-4 text-amber-400" />
                    ) : applicantChange < 0 ? (
                      <TrendingDownIcon className="size-4 text-emerald-400" />
                    ) : null}
                    <span className="text-sm font-black text-primary">
                      {applicantChange > 0 ? "+" : ""}{applicantChange}%
                    </span>
                  </div>
                </div>

                <Slider
                  min={-50}
                  max={100}
                  step={5}
                  value={[applicantChange]}
                  onValueChange={(v) => setApplicantChange(Array.isArray(v) ? (v as number[])[0] : (v as number))}
                  className="py-2"
                />

                <div className="flex justify-between text-[11px] text-muted-foreground font-medium">
                  <span>-50% Contraction</span>
                  <span>Baseline (0%)</span>
                  <span>+100% Surge</span>
                </div>

                {applicantChange !== 0 && (
                  <p className="text-xs font-semibold text-primary pt-1">
                    Simulated Volume: <strong>{simApplicants} applicants</strong>
                  </p>
                )}
              </div>

              {/* Seat Capacity */}
              <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-5 shadow-xl backdrop-blur-md space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-foreground">Authorized Quota Seats Delta</h3>
                    <p className="text-xs text-muted-foreground">Current Baseline: {BASE.seats} seats</p>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-primary/10 border border-primary/20">
                    {seatChange > 0 ? (
                      <TrendingUpIcon className="size-4 text-emerald-400" />
                    ) : seatChange < 0 ? (
                      <TrendingDownIcon className="size-4 text-rose-400" />
                    ) : null}
                    <span className="text-sm font-black text-primary">
                      {seatChange > 0 ? "+" : ""}{seatChange}%
                    </span>
                  </div>
                </div>

                <Slider
                  min={-80}
                  max={100}
                  step={5}
                  value={[seatChange]}
                  onValueChange={(v) => setSeatChange(Array.isArray(v) ? (v as number[])[0] : (v as number))}
                  className="py-2"
                />

                <div className="flex justify-between text-[11px] text-muted-foreground font-medium">
                  <span>-80% Slump</span>
                  <span>Baseline (0%)</span>
                  <span>+100% Expansion</span>
                </div>

                {seatChange !== 0 && (
                  <p className="text-xs font-semibold text-primary pt-1">
                    Simulated Seats: <strong>{simSeats} seats</strong>
                  </p>
                )}
              </div>

              {/* New Companies */}
              <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-5 shadow-xl backdrop-blur-md space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-foreground">Corporate Host Partner Inflow</h3>
                    <p className="text-xs text-muted-foreground">Current Baseline: {BASE.companies} active partners</p>
                  </div>
                  <span className="text-sm font-black text-primary px-3 py-1 rounded-xl bg-primary/10 border border-primary/20">
                    +{newCompanies} Enterprises
                  </span>
                </div>

                <Slider
                  min={0}
                  max={20}
                  step={1}
                  value={[newCompanies]}
                  onValueChange={(v) => setNewCompanies(Array.isArray(v) ? (v as number[])[0] : (v as number))}
                  className="py-2"
                />

                <div className="flex justify-between text-[11px] text-muted-foreground font-medium">
                  <span>0 New</span>
                  <span>+10 Enterprises</span>
                  <span>+20 Enterprises</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  className="flex-1 bg-gradient-to-r from-primary via-indigo-600 to-purple-600 hover:from-primary/90 hover:to-purple-700 text-white font-semibold shadow-lg shadow-primary/25 active:scale-95"
                  onClick={() => setSimulated(true)}
                >
                  <FlaskConicalIcon className="mr-2 size-4" />
                  Compute Simulation Equilibrium
                </Button>
                <Button
                  variant="outline"
                  onClick={reset}
                  className="border-white/10 hover:bg-white/5 active:scale-95"
                >
                  <RefreshCwIcon className="mr-2 size-4" />
                  Reset
                </Button>
              </div>
            </div>

            {/* Right Col: Simulation Projections & Visual Comparison */}
            <div className="space-y-5">
              {/* Output Matrix Card */}
              <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-6 shadow-xl backdrop-blur-md space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-border/50 dark:border-white/5">
                  <h3 className="text-base font-bold text-foreground">
                    {simulated ? "Simulated Projection Breakdown" : "Baseline Operational Breakdown"}
                  </h3>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${simulated ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-muted text-muted-foreground"}`}>
                    {simulated ? "Model Computed" : "Static Baseline"}
                  </span>
                </div>

                <div className="space-y-3">
                  {[
                    { label: "Total Applicant Demand", base: BASE.applicants, sim: simApplicants, color: "text-blue-400" },
                    { label: "Available Internship Quota", base: BASE.seats, sim: simSeats, color: "text-cyan-400" },
                    { label: "Predicted Eligible Pool (72%)", base: Math.round(BASE.applicants * eligRate), sim: simEligible, color: "text-purple-400" },
                    { label: "Estimated Direct Allocations", base: Math.min(BASE.seats, Math.round(BASE.applicants * eligRate)), sim: simAllocated, color: "text-emerald-400" },
                    { label: "Estimated Waitlist Buffer", base: 8, sim: simWaitlisted, color: "text-amber-400" },
                    { label: "Residual Unallocated", base: 17, sim: simUnalloc, color: "text-rose-400" },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between text-xs py-1 border-b border-border/30 dark:border-white/5 last:border-0">
                      <span className="text-muted-foreground">{row.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-muted-foreground">{row.base}</span>
                        {simulated && (
                          <>
                            <span className="text-muted-foreground">→</span>
                            <span className={`font-bold ${row.color}`}>{row.sim}</span>
                            {row.sim !== row.base && (
                              <Badge
                                variant="outline"
                                className={`text-[10px] px-1.5 py-0 ${
                                  row.sim > row.base
                                    ? row.label.includes("Residual") || row.label.includes("Waitlist")
                                      ? "border-rose-500/30 text-rose-400 bg-rose-500/10"
                                      : "border-emerald-500/30 text-emerald-400 bg-emerald-500/10"
                                    : row.label.includes("Residual") || row.label.includes("Waitlist")
                                    ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10"
                                    : "border-rose-500/30 text-rose-400 bg-rose-500/10"
                                }`}
                              >
                                {row.sim > row.base ? "+" : ""}{row.sim - row.base}
                              </Badge>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {simulated && (
                  <div className="pt-4 border-t border-border/50 dark:border-white/5 space-y-3">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Seat Capacity Utilization</span>
                        <span className="font-bold text-foreground">{seatUtil}%</span>
                      </div>
                      <Progress value={seatUtil} className="h-2 bg-white/5" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Preference Satisfaction Equilibrium</span>
                        <span className="font-bold text-foreground">{prefSatisf}%</span>
                      </div>
                      <Progress value={prefSatisf} className="h-2 bg-white/5" />
                    </div>
                  </div>
                )}
              </div>

              {/* BarChart Comparison */}
              <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-5 shadow-xl backdrop-blur-md">
                <h4 className="text-sm font-bold text-foreground mb-3">Model Equilibrium Differential</h4>
                <ResponsiveContainer width="100%" height={210}>
                  <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: "currentColor" }} opacity={0.7} />
                    <YAxis tick={{ fontSize: 11, fill: "currentColor" }} opacity={0.6} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0d1220",
                        border: "1px solid rgba(255,255,255,0.15)",
                        borderRadius: "12px",
                        fontSize: "12px",
                        color: "#fff",
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Bar dataKey="Applicants" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Seats" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Eligible" fill="#a855f7" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Allocated" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Tab 2: Saved Scenarios */}
        <TabsContent value="saved" className="space-y-4">
          {mockCapacityScenarios.map((sc) => (
            <div
              key={sc.id}
              className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-6 shadow-xl backdrop-blur-md space-y-4"
            >
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-border/50 dark:border-white/5">
                <div>
                  <h4 className="text-base font-bold text-foreground">{sc.name}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{sc.description}</p>
                </div>
                <Badge variant="outline" className="text-xs border-primary/30 text-primary bg-primary/10">
                  {formatDate(sc.createdAt)}
                </Badge>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {[
                  {
                    label: "Applicants",
                    value: `${sc.baseApplicants} (${sc.applicantChangePercent > 0 ? "+" : ""}${sc.applicantChangePercent}%)`,
                  },
                  {
                    label: "Seats",
                    value: `${sc.baseSeats} (${sc.seatChangePercent > 0 ? "+" : ""}${sc.seatChangePercent}%)`,
                  },
                  { label: "Eligible Pool", value: sc.expectedEligible },
                  { label: "Allocated", value: sc.expectedAllocated },
                  { label: "Waitlisted", value: sc.expectedWaitlisted },
                  { label: "Seat Utilization", value: `${sc.seatUtilization}%` },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl bg-muted/40 dark:bg-white/[0.02] border border-border/40 dark:border-white/5 p-3 text-center">
                    <p className="text-sm font-bold text-foreground">{s.value}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
