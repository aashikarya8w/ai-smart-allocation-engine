"use client";

import { useState } from "react";
import { SlidersIcon, CheckCircleIcon, XCircleIcon, PlusIcon, SaveIcon } from "lucide-react";
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
  { id: "tb1", label: "Required Skill Coverage",    weight: 30, enabled: true  },
  { id: "tb2", label: "Assessment Performance",      weight: 25, enabled: true  },
  { id: "tb3", label: "CGPA",                       weight: 20, enabled: true  },
  { id: "tb4", label: "Relevant Projects",           weight: 15, enabled: true  },
  { id: "tb5", label: "Relevant Experience",         weight: 10, enabled: true  },
  { id: "tb6", label: "Preference Compatibility",    weight: 0,  enabled: false },
];

export default function RulesPage() {
  const [rules, setRules] = useState(mockRules);
  const [tieCriteria, setTieCriteria] = useState(TIE_BREAKING_CRITERIA);
  const [saved, setSaved] = useState(false);

  const toggleRule = (id: string) =>
    setRules((prev) => prev.map((r) => r.id === id ? { ...r, isActive: !r.isActive } : r));

  const updateWeight = (ruleId: string, field: keyof MatchingRule["weights"], value: number) =>
    setRules((prev) =>
      prev.map((r) =>
        r.id === ruleId ? { ...r, weights: { ...r.weights, [field]: value } } : r
      )
    );

  const toggleTieCriteria = (id: string) =>
    setTieCriteria((prev) =>
      prev.map((c) => c.id === id ? { ...c, enabled: !c.enabled } : c)
    );

  const updateTieWeight = (id: string, weight: number) =>
    setTieCriteria((prev) =>
      prev.map((c) => c.id === id ? { ...c, weight } : c)
    );

  const save = async () => {
    await new Promise((r) => setTimeout(r, 600));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Allocation Rules"
        description="Configure matching weights, eligibility criteria, and tie-breaking rules."
      >
        <Button size="sm" onClick={save}>
          <SaveIcon className="mr-1.5 size-4" />
          {saved ? "Saved!" : "Save Changes"}
        </Button>
      </PageHeader>

      <Tabs defaultValue="matching">
        <TabsList>
          <TabsTrigger value="matching">Matching Rules</TabsTrigger>
          <TabsTrigger value="tiebreaking">Tie-Breaking</TabsTrigger>
          <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
        </TabsList>

        {/* Matching Rules */}
        <TabsContent value="matching" className="space-y-4 pt-4">
          {rules.map((rule) => {
            const totalWeight = Object.values(rule.weights).reduce((s, v) => s + v, 0);
            return (
              <Card key={rule.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <CardTitle className="text-sm">{rule.name}</CardTitle>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Last updated {formatDate(rule.updatedAt)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge variant={rule.isActive ? "default" : "secondary"} className="text-xs">
                        {rule.isActive ? "Active" : "Inactive"}
                      </Badge>
                      <Switch checked={rule.isActive} onCheckedChange={() => toggleRule(rule.id)} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Weight total warning */}
                  {totalWeight !== 100 && (
                    <div className="rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30 p-2.5">
                      <p className="text-xs text-amber-700 dark:text-amber-400">
                        ⚠ Weights total {totalWeight}% — should equal 100%
                      </p>
                    </div>
                  )}

                  <div className="grid gap-4 sm:grid-cols-2">
                    {(Object.entries(rule.weights) as [keyof typeof rule.weights, number][]).map(([key, val]) => (
                      <div key={key} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="text-xs capitalize text-foreground">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </Label>
                          <span className="text-xs font-semibold text-primary">{val}%</span>
                        </div>
                        <Slider
                          min={0} max={100} step={5}
                          value={[val]}
                          onValueChange={(v) => updateWeight(rule.id, key, Array.isArray(v) ? (v as number[])[0] : v as number)}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-muted-foreground">Total weight</span>
                    <span className={`font-bold ${totalWeight === 100 ? "text-green-600" : "text-amber-600"}`}>
                      {totalWeight}%
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        {/* Tie-breaking */}
        <TabsContent value="tiebreaking" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Tie-Breaking Criteria</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                When candidates have equal suitability scores, these criteria are applied in order to resolve ties objectively.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {tieCriteria.map((c, idx) => (
                <div key={c.id} className={`rounded-lg border p-3 space-y-2 ${!c.enabled ? "opacity-50" : ""}`}>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {idx + 1}
                      </span>
                      <span className="text-sm font-medium text-foreground">{c.label}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-semibold text-primary">{c.weight}%</span>
                      <Switch checked={c.enabled} onCheckedChange={() => toggleTieCriteria(c.id)} />
                    </div>
                  </div>
                  {c.enabled && (
                    <Slider
                      min={0} max={50} step={5}
                      value={[c.weight]}
                      onValueChange={(v) => updateTieWeight(c.id, Array.isArray(v) ? (v as number[])[0] : v as number)}
                    />
                  )}
                </div>
              ))}

              <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
                <strong>How it works:</strong> When two or more candidates have equal overall suitability,
                the system applies these criteria in weighted order to break the tie objectively.
                All tie-breaking decisions are logged in the audit trail.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Eligibility */}
        <TabsContent value="eligibility" className="pt-4 space-y-4">
          {rules.map((rule) => (
            <Card key={rule.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">{rule.name} — Eligibility</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { label: "Minimum CGPA",         value: rule.eligibilityCriteria.minimumCGPA },
                    { label: "Minimum Skills",        value: rule.eligibilityCriteria.minimumSkills },
                    { label: "Require Resume",        value: rule.eligibilityCriteria.requireResume ? "Yes" : "No" },
                    { label: "Require Verification",  value: rule.eligibilityCriteria.requireVerification ? "Yes" : "No" },
                  ].map((f) => (
                    <div key={f.label} className="rounded-lg bg-muted/50 p-3">
                      <p className="text-xs text-muted-foreground">{f.label}</p>
                      <p className="text-sm font-semibold text-foreground mt-0.5">{String(f.value)}</p>
                    </div>
                  ))}
                </div>
                {rule.eligibilityCriteria.allowedBranches.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs text-muted-foreground mb-1.5">Allowed Branches</p>
                    <div className="flex flex-wrap gap-1.5">
                      {rule.eligibilityCriteria.allowedBranches.map((b) => (
                        <Badge key={b} variant="secondary" className="text-xs">{b}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Constraints */}
                <div className="mt-4 space-y-2">
                  <p className="text-xs font-semibold text-foreground">Constraints</p>
                  {rule.constraints.map((con) => (
                    <div key={con.id} className="flex items-center justify-between text-xs rounded-lg border border-border/50 p-2.5">
                      <span className="text-foreground">{con.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">{String(con.value)}</span>
                        {con.isEnabled
                          ? <CheckCircleIcon className="size-4 text-green-500" />
                          : <XCircleIcon    className="size-4 text-muted-foreground" />
                        }
                      </div>
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
