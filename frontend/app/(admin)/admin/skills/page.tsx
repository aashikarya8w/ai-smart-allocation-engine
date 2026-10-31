"use client";

import { useState } from "react";
import {
  TagIcon, SearchIcon, SparklesIcon, TrendingUpIcon,
  PlusIcon, ArrowUpRightIcon, CheckCircle2Icon, FilterIcon,
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { SearchInput } from "@/components/common/SearchInput";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockSkills } from "@/data/skills";

export default function AdminSkillsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", ...new Set(mockSkills.map((s) => s.category))];

  const filtered = mockSkills.filter((s) => {
    const matchSearch =
      !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategory === "all" || s.category === selectedCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-br from-[#0c1222] via-[#0f172a] to-[#1e1338] p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl">
        <div className="absolute -top-32 -right-24 h-96 w-96 rounded-full bg-gradient-to-br from-primary/20 via-purple-500/15 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-gradient-to-tr from-cyan-500/15 via-blue-500/10 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
              <TagIcon className="h-3.5 w-3.5" />
              National Competency & Skill Ontology
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Skill <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Taxonomy & Demand</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed font-normal">
              Manage the standardized national database of technical proficiencies, demand scoring weights, and curriculum mappings used by the AI Matching Engine.
            </p>
          </div>

          <Button
            size="sm"
            onClick={() => alert("Add Skill Taxonomy Node — Mock action")}
            className="bg-gradient-to-r from-primary via-indigo-600 to-purple-600 hover:from-primary/90 hover:to-purple-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-primary/25 active:scale-95 transition-all gap-2"
          >
            <PlusIcon className="size-4" />
            Add New Skill
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-5 shadow-lg backdrop-blur-md space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search skill name or category…"
            className="w-full md:max-w-md"
          />
          <div className="text-xs text-muted-foreground">
            Showing <strong className="text-foreground">{filtered.length}</strong> of {mockSkills.length} competencies
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 pt-1 border-t border-border/40 dark:border-white/5">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all capitalize ${
                selectedCategory === cat
                  ? "bg-primary text-white shadow-md shadow-primary/25"
                  : "bg-muted/40 dark:bg-white/5 text-muted-foreground hover:bg-white/10 border border-border/50 dark:border-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((skill) => (
          <div
            key={skill.id}
            className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-5 shadow-lg backdrop-blur-md space-y-3 hover:border-primary/40 transition-all group"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                  {skill.name}
                </h3>
                <span className="text-xs text-muted-foreground font-medium">{skill.category}</span>
              </div>
              <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10 text-xs">
                {skill.demandScore}% Demand
              </Badge>
            </div>

            {/* Demand Progress Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-muted-foreground">
                <span>Industry Demand Index</span>
                <span className="font-bold text-foreground">{skill.demandScore}/100</span>
              </div>
              <div className="w-full bg-muted/60 dark:bg-white/10 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    skill.demandScore >= 85 ? "bg-emerald-500" : skill.demandScore >= 70 ? "bg-blue-500" : "bg-amber-500"
                  }`}
                  style={{ width: `${skill.demandScore}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
