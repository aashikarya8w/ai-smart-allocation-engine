"use client";

import { useState } from "react";
import { FlaskConicalIcon, TrendingUpIcon, TrendingDownIcon, SaveIcon, RefreshCwIcon } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
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
  const simSeats      = Math.max(1, Math.round(BASE.seats * (1 + seatChange / 100)));
  const simCompanies  = BASE.companies + newCompanies;

  // Simple projection
  const eligRate      = 0.72;
  const simEligible   = Math.round(simApplicants * eligRate);
  const simAllocated  = Math.min(simSeats, simEligible);
  const simWaitlisted = Math.max(0, Math.min(simEligible - simAllocated, Math.round(simSeats * 0.5)));
  const simUnalloc    = simApplicants - simAllocated - simWaitlisted;
  const seatUtil      = Math.min(100, Math.round((simAllocated / simSeats) * 100));
  const prefSatisf    = Math.min(95, Math.round(60 + (simSeats / simApplicants) * 40));

  const barData = [
    {
      name: "Current",
      Applicants: BASE.applicants,
      Seats: BASE.seats,
      Eligible: Math.round(BASE.applicants * eligRate),
      Allocated: Math.min(BASE.seats, Math.round(BASE.applicants * eligRate)),
    },
    ...(simulated ? [{
      name: "Simulated",
      Applicants: simApplicants,
      Seats: simSeats,
      Eligible: simEligible,
      Allocated: simAllocated,
    }] : []),
  ];

  const reset = () => {
    setApplicantChange(0);
    setSeatChange(0);
    setNewCompanies(0);
    setSimulated(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Capacity Stress Simulator"
        description="Plan allocation capacity by simulating different demand and supply scenarios. This does NOT modify live data."
      />

      <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30 p-4">
        <FlaskConicalIcon className="mt-0.5 size-4 shrink-0 text-amber-600" />
        <p className="text-xs text-amber-700 dark:text-amber-400">
          <strong>Planning simulation only.</strong> Results shown here are projections for decision-making.
          No changes are applied to actual allocation data.
        </p>
      </div>

      <Tabs defaultValue="simulator">
        <TabsList>
          <TabsTrigger value="simulator">Live Simulator</TabsTrigger>
          <TabsTrigger value="saved">Saved Scenarios ({mockCapacityScenarios.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="simulator" className="pt-4">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Controls */}
            <div className="space-y-5">
              {/* Applicants */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Applicant Volume Change</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Current: {BASE.applicants} applicants</span>
                    <div className="flex items-center gap-1.5">
                      {applicantChange > 0
                        ? <TrendingUpIcon className="size-4 text-amber-500" />
                        : applicantChange < 0
                        ? <TrendingDownIcon className="size-4 text-green-500" />
                        : null}
                      <span className="text-lg font-bold text-foreground">
                        {applicantChange > 0 ? "+" : ""}{applicantChange}%
                      </span>
                    </div>
                  </div>
                  <Slider
                    min={-50} max={100} step={5}
                    value={[applicantChange]}
                    onValueChange={(v) => setApplicantChange(Array.isArray(v) ? (v as number[])[0] : v as number)}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>-50%</span><span>0%</span><span>+100%</span>
                  </div>
                  {applicantChange !== 0 && (
                    <p className="text-sm text-foreground">
                      Simulated applicants: <strong>{simApplicants}</strong>
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Seats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Seat Capacity Change</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Current: {BASE.seats} seats</span>
                    <div className="flex items-center gap-1.5">
                      {seatChange > 0
                        ? <TrendingUpIcon className="size-4 text-green-500" />
                        : seatChange < 0
                        ? <TrendingDownIcon className="size-4 text-red-500" />
                        : null}
                      <span className="text-lg font-bold text-foreground">
                        {seatChange > 0 ? "+" : ""}{seatChange}%
                      </span>
                    </div>
                  </div>
                  <Slider
                    min={-80} max={100} step={5}
                    value={[seatChange]}
                    onValueChange={(v) => setSeatChange(Array.isArray(v) ? (v as number[])[0] : v as number)}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>-80%</span><span>0%</span><span>+100%</span>
                  </div>
                  {seatChange !== 0 && (
                    <p className="text-sm text-foreground">
                      Simulated seats: <strong>{simSeats}</strong>
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* New Companies */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">New Companies Joining</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Current: {BASE.companies} companies</span>
                    <span className="text-lg font-bold text-foreground">+{newCompanies}</span>
                  </div>
                  <Slider
                    min={0} max={20} step={1}
                    value={[newCompanies]}
                    onValueChange={(v) => setNewCompanies(Array.isArray(v) ? (v as number[])[0] : v as number)}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0</span><span>+20 companies</span>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-3">
                <Button className="flex-1" onClick={() => setSimulated(true)}>
                  <FlaskConicalIcon className="mr-2 size-4" />Run Simulation
                </Button>
                <Button variant="outline" onClick={reset}>
                  <RefreshCwIcon className="mr-2 size-4" />Reset
                </Button>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-5">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">
                    {simulated ? "Simulation Results" : "Projected Outcomes"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { label: "Total Applicants",      base: BASE.applicants,  sim: simApplicants,  color: "text-foreground" },
                    { label: "Available Seats",       base: BASE.seats,        sim: simSeats,        color: "text-blue-600"   },
                    { label: "Expected Eligible",     base: Math.round(BASE.applicants * eligRate), sim: simEligible, color: "text-purple-600" },
                    { label: "Expected Allocated",    base: Math.min(BASE.seats, Math.round(BASE.applicants * eligRate)), sim: simAllocated, color: "text-green-600" },
                    { label: "Expected Waitlisted",   base: 8,                 sim: simWaitlisted,  color: "text-amber-600"  },
                    { label: "Expected Unallocated",  base: 17,                sim: simUnalloc,     color: "text-red-500"    },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{row.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">{row.base}</span>
                        {simulated && (
                          <>
                            <span className="text-muted-foreground">→</span>
                            <span className={`font-bold ${row.color}`}>{row.sim}</span>
                            {row.sim !== row.base && (
                              <Badge
                                variant={row.sim > row.base ? (row.label.includes("Unalloc") || row.label.includes("Wait") ? "destructive" : "default") : (row.label.includes("Unalloc") || row.label.includes("Wait") ? "default" : "destructive")}
                                className="text-xs"
                              >
                                {row.sim > row.base ? "+" : ""}{row.sim - row.base}
                              </Badge>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                  {simulated && (
                    <>
                      <div className="space-y-1.5 pt-2 border-t border-border">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Seat Utilization</span>
                          <span className="font-bold text-foreground">{seatUtil}%</span>
                        </div>
                        <Progress value={seatUtil} className="h-2" />
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Preference Satisfaction</span>
                          <span className="font-bold text-foreground">{prefSatisf}%</span>
                        </div>
                        <Progress value={prefSatisf} className="h-2" />
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Visual Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={barData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                      <Legend wrapperStyle={{ fontSize: 11 }} />
                      <Bar dataKey="Applicants" fill="#6366f1" radius={[4,4,0,0]} />
                      <Bar dataKey="Seats"      fill="#3b82f6" radius={[4,4,0,0]} />
                      <Bar dataKey="Eligible"   fill="#8b5cf6" radius={[4,4,0,0]} />
                      <Bar dataKey="Allocated"  fill="#22c55e" radius={[4,4,0,0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Saved Scenarios */}
        <TabsContent value="saved" className="pt-4 space-y-4">
          {mockCapacityScenarios.map((sc) => (
            <Card key={sc.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <CardTitle className="text-sm">{sc.name}</CardTitle>
                    <p className="text-xs text-muted-foreground mt-0.5">{sc.description}</p>
                  </div>
                  <Badge variant="outline" className="text-xs shrink-0">{formatDate(sc.createdAt)}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-6">
                  {[
                    { label: "Applicants",    value: `${sc.baseApplicants} (${sc.applicantChangePercent > 0 ? "+" : ""}${sc.applicantChangePercent}%)` },
                    { label: "Seats",         value: `${sc.baseSeats} (${sc.seatChangePercent > 0 ? "+" : ""}${sc.seatChangePercent}%)` },
                    { label: "Eligible",      value: sc.expectedEligible },
                    { label: "Allocated",     value: sc.expectedAllocated },
                    { label: "Waitlisted",    value: sc.expectedWaitlisted },
                    { label: "Seat Util",     value: `${sc.seatUtilization}%` },
                  ].map((s) => (
                    <div key={s.label} className="rounded-lg bg-muted/50 p-2 text-center">
                      <p className="text-sm font-semibold text-foreground">{s.value}</p>
                      <p className="text-[11px] text-muted-foreground">{s.label}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
