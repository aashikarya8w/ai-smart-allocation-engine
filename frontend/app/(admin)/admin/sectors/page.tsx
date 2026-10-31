"use client";

import { useState } from "react";
import {
  TagIcon, SearchIcon, PlusIcon, Building2Icon,
  BriefcaseIcon, ArrowUpRightIcon, SparklesIcon,
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { SearchInput } from "@/components/common/SearchInput";
import { Button } from "@/components/ui/button";
import { sectors } from "@/data/sectors";

export default function AdminSectorsPage() {
  const [search, setSearch] = useState("");

  const filtered = sectors.filter((s) =>
    s.toLowerCase().includes(search.toLowerCase())
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
              <Building2Icon className="h-3.5 w-3.5" />
              National Industrial Sectors Taxonomy
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Industrial <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Sectors Directory</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed font-normal">
              Accredited ministries, public sector undertakings (PSUs), and private market economic sectors eligible for scheme internship placements.
            </p>
          </div>

          <Button
            size="sm"
            onClick={() => alert("Add Sector Classification — Mock action")}
            className="bg-gradient-to-r from-primary via-indigo-600 to-purple-600 hover:from-primary/90 hover:to-purple-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-primary/25 active:scale-95 transition-all gap-2"
          >
            <PlusIcon className="size-4" />
            Accredit New Sector
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-5 shadow-lg backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search industry sector title…"
            className="w-full md:max-w-md"
          />
          <div className="text-xs text-muted-foreground">
            Showing <strong className="text-foreground">{filtered.length}</strong> of {sectors.length} registered sectors
          </div>
        </div>
      </div>

      {/* Sectors Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((sector, i) => (
          <div
            key={sector}
            className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-5 shadow-lg backdrop-blur-md flex items-center justify-between gap-3 hover:border-primary/40 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-gradient-to-br from-primary/20 to-indigo-600/30 border border-primary/30 flex items-center justify-center text-primary font-bold text-xs shrink-0">
                0{i + 1}
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                  {sector}
                </h3>
                <p className="text-[11px] text-muted-foreground">Accredited Scheme Industry</p>
              </div>
            </div>
            <ArrowUpRightIcon className="size-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
