"use client";

import { useState } from "react";
import {
  SlidersIcon, CheckCircleIcon, XCircleIcon, PlusIcon, SaveIcon,
  ShieldCheckIcon, ScaleIcon, SparklesIcon, CpuIcon, CheckCircle2Icon,
  AlertTriangleIcon, ArrowUpRightIcon,
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockRules } from "@/data/rules";
import type { MatchingRule } from "@/types/rule";
import { formatDate } from "@/lib/formatters";

const TIE_BREAKING_CRITERIA = [
  { id: "tb1", label: "Required Skill Coverage Ratio", weight: 30, enabled: true },
  { id: "tb2", label: "National Assessment Performance Score", weight: 25, enabled: true },
  { id: "tb3", label: "Cumulative Undergraduate CGPA", weight: 20, enabled: true },
  { id: "tb4", label: "Verified Academic Capstone Projects", weight: 15, enabled: true },
  { id: "tb5", label: "Relevant Prior Industry Experience", weight: 10, enabled: true },
  { id: "tb6", label: "Geographical & Work Mode Preference", weight: 0, enabled: false },
];

export default function RulesPage() {
  const [rules, setRules] = useState(mockRules);
  const [tieCriteria, setTieCriteria] = useState(TIE_BREAKING_CRITERIA);
  const [saved, setSaved] = useState(false);

  const toggleRule = (id: string) =>
    setRules((prev) => prev.map((r) => (r.id === id ? { ...r, isActive: !r.isActive } : r)));

  const updateWeight = (ruleId: string, field: keyof MatchingRule["weights"], value: number) =>
    setRules((prev) =>
      prev.map((r) =>
        r.id === ruleId ? { ...r, weights: { ...r.weights, [field]: value } } : r
      )
    );

  const toggleTieCriteria = (id: string) =>
    setTieCriteria((prev) =>
      prev.map((c) => (c.id === id ? { ...c, enabled: !c.enabled } : c))
    );

  const updateTieWeight = (id: string, weight: number) =>
    setTieCriteria((prev) =>
      prev.map((c) => (c.id === id ? { ...c, weight } : c))
    );

  const save = async () => {
    await new Promise((r) => setTimeout(r, 600));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
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
              <SlidersIcon className="h-3.5 w-3.5" />
              Gale-Shapley Matching Hyperparameters
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Allocation <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Rules Engine</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed font-normal">
              Fine-tune multi-objective weighting coefficients, affirmative action constraints, tie-breaking heuristics, and strict eligibility thresholds across rounds.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              size="sm"
              onClick={save}
              className="bg-gradient-to-r from-primary via-indigo-600 to-purple-600 hover:from-primary/90 hover:to-purple-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-primary/25 active:scale-95 transition-all gap-2"
            >
              <SaveIcon className="size-4" />
              {saved ? "Weights Committed!" : "Save Policy Changes"}
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="matching" className="space-y-6">
        <TabsList className="bg-card/80 dark:bg-[#0e1322]/80 border border-border/80 dark:border-white/10 p-1 rounded-xl">
          <TabsTrigger value="matching" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg text-xs font-semibold">
            Multi-Objective Weights
          </TabsTrigger>
          <TabsTrigger value="tiebreaking" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg text-xs font-semibold">
            Deterministic Tie-Breaking
          </TabsTrigger>
          <TabsTrigger value="eligibility" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg text-xs font-semibold">
            Eligibility & Constraints
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Matching Rules */}
        <TabsContent value="matching" className="space-y-5">
          {rules.map((rule) => {
            const totalWeight = Object.values(rule.weights).reduce((s, v) => s + v, 0);
            return (
              <div
                key={rule.id}
                className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-6 shadow-xl backdrop-blur-md space-y-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border/50 dark:border-white/5">
                  <div>
                    <h3 className="text-base font-bold text-foreground">{rule.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Last synchronized on {formatDate(rule.updatedAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <Badge
                      variant="outline"
                      className={`text-xs font-semibold ${
                        rule.isActive
                          ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10"
                          : "border-slate-500/30 text-slate-400 bg-slate-500/10"
                      }`}
                    >
                      {rule.isActive ? "Active Policy" : "Dormant Policy"}
                    </Badge>
                    <Switch checked={rule.isActive} onCheckedChange={() => toggleRule(rule.id)} />
                  </div>
                </div>

                {totalWeight !== 100 && (
                  <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 flex items-center gap-2 text-xs text-amber-400">
                    <AlertTriangleIcon className="h-4 w-4 shrink-0" />
                    <span>Coefficient imbalance: Total weight sums to <strong>{totalWeight}%</strong>. It must equal exactly 100% for mathematical equilibrium.</span>
                  </div>
                )}

                <div className="grid gap-5 sm:grid-cols-2">
                  {(Object.entries(rule.weights) as [keyof typeof rule.weights, number][]).map(([key, val]) => (
                    <div
                      key={key}
                      className="p-4 rounded-xl bg-muted/40 dark:bg-white/[0.02] border border-border/40 dark:border-white/5 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <Label className="text-xs font-semibold capitalize text-foreground">
                          {key.replace(/([A-Z])/g, " $1").trim()} Weight
                        </Label>
                        <span className="text-xs font-black text-primary px-2.5 py-0.5 rounded-md bg-primary/10 border border-primary/20">
                          {val}%
                        </span>
                      </div>
                      <Slider
                        min={0}
                        max={100}
                        step={5}
                        value={[val]}
                        onValueChange={(v) =>
                          updateWeight(rule.id, key, Array.isArray(v) ? (v as number[])[0] : (v as number))
                        }
                      />
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-border/40 dark:border-white/5">
                  <span className="text-muted-foreground">Aggregate Coefficient Sum</span>
                  <span className={`font-black text-sm ${totalWeight === 100 ? "text-emerald-400" : "text-amber-400"}`}>
                    {totalWeight}% / 100%
                  </span>
                </div>
              </div>
            );
          })}
        </TabsContent>

        {/* Tab 2: Tie-Breaking */}
        <TabsContent value="tiebreaking" className="space-y-4">
          <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-6 shadow-xl backdrop-blur-md space-y-5">
            <div className="pb-4 border-b border-border/50 dark:border-white/5">
              <h3 className="text-base font-bold text-foreground">Deterministic Tie-Resolution Hierarchy</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                When two or more candidates produce identical suitability and match vectors, the Gale-Shapley allocator resolves placement using these ordered criteria.
              </p>
            </div>

            <div className="space-y-3">
              {tieCriteria.map((c, idx) => (
                <div
                  key={c.id}
                  className={`rounded-xl border border-border/50 dark:border-white/5 bg-muted/20 dark:bg-white/[0.01] p-4 space-y-3 transition-opacity ${
                    !c.enabled ? "opacity-40" : ""
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="flex size-7 items-center justify-center rounded-xl bg-primary/10 text-xs font-black text-primary border border-primary/20">
                        0{idx + 1}
                      </span>
                      <span className="text-sm font-semibold text-foreground">{c.label}</span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs font-black text-primary px-2.5 py-0.5 rounded-md bg-primary/10 border border-primary/20">
                        {c.weight}% Weight
                      </span>
                      <Switch checked={c.enabled} onCheckedChange={() => toggleTieCriteria(c.id)} />
                    </div>
                  </div>

                  {c.enabled && (
                    <Slider
                      min={0}
                      max={50}
                      step={5}
                      value={[c.weight]}
                      onValueChange={(v) =>
                        updateTieWeight(c.id, Array.isArray(v) ? (v as number[])[0] : (v as number))
                      }
                      className="py-1"
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-xs text-slate-300 leading-relaxed">
              <strong className="text-primary font-semibold">Strict Audit Guarantee:</strong> Every tie-breaker resolution is cryptographically preserved in the system audit trail with step-by-step mathematical reasoning to guarantee 100% transparency.
            </div>
          </div>
        </TabsContent>

        {/* Tab 3: Eligibility & Constraints */}
        <TabsContent value="eligibility" className="space-y-5">
          {rules.map((rule) => (
            <div
              key={rule.id}
              className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-6 shadow-xl backdrop-blur-md space-y-5"
            >
              <h3 className="text-base font-bold text-foreground border-b border-border/50 dark:border-white/5 pb-3">
                {rule.name} — Eligibility Thresholds
              </h3>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: "Minimum CGPA Cutoff", value: `${rule.eligibilityCriteria.minimumCGPA} / 10.0` },
                  { label: "Minimum Skill Badges", value: `${rule.eligibilityCriteria.minimumSkills} Verified` },
                  { label: "Mandatory Resume Parser", value: rule.eligibilityCriteria.requireResume ? "Enforced" : "Optional" },
                  { label: "eKYC Aadhaar Clearance", value: rule.eligibilityCriteria.requireVerification ? "Mandatory" : "Exempt" },
                ].map((f) => (
                  <div key={f.label} className="p-3.5 rounded-xl bg-muted/40 dark:bg-white/[0.02] border border-border/40 dark:border-white/5">
                    <p className="text-xs text-muted-foreground">{f.label}</p>
                    <p className="text-sm font-bold text-foreground mt-1">{f.value}</p>
                  </div>
                ))}
              </div>

              {rule.eligibilityCriteria.allowedBranches.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-2">Permitted Academic Disciplines</p>
                  <div className="flex flex-wrap gap-2">
                    {rule.eligibilityCriteria.allowedBranches.map((b) => (
                      <span key={b} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-primary/10 border border-primary/20 text-primary">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Hard Constraints */}
              <div className="space-y-3 pt-2">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Active Hard Constraints</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {rule.constraints.map((con) => (
                    <div
                      key={con.id}
                      className="flex items-center justify-between text-xs rounded-xl border border-border/50 dark:border-white/5 bg-muted/20 dark:bg-white/[0.01] p-3"
                    >
                      <span className="font-medium text-foreground">{con.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground font-mono">{String(con.value)}</span>
                        {con.isEnabled ? (
                          <CheckCircle2Icon className="size-4 text-emerald-400" />
                        ) : (
                          <XCircleIcon className="size-4 text-slate-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
