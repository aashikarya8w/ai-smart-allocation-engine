"use client";

import { useState } from "react";
import {
  MapPinIcon, SearchIcon, PlusIcon, CompassIcon,
  Globe2Icon, ArrowUpRightIcon,
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { SearchInput } from "@/components/common/SearchInput";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { locationsByState, popularCities } from "@/data/locations";

export default function AdminLocationsPage() {
  const [search, setSearch] = useState("");

  const stateEntries = Object.entries(locationsByState);

  const filtered = stateEntries.filter(([state, cities]) => {
    const q = search.toLowerCase();
    return (
      state.toLowerCase().includes(q) ||
      cities.some((c) => c.toLowerCase().includes(q))
    );
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
              <CompassIcon className="h-3.5 w-3.5" />
              Pan-India Geocoding & Jurisdiction Coverage
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Geographic <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Jurisdictions</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed font-normal">
              Manage participating Indian States, Union Territories, corporate development clusters, and tier-2/3 regional hubs recognized under the PM Scheme.
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold backdrop-blur-md">
            <Globe2Icon className="h-4 w-4" />
            <span>36 States & UTs Enrolled</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-5 shadow-lg backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search state name or urban cluster…"
            className="w-full md:max-w-md"
          />
          <div className="text-xs text-muted-foreground">
            Covering <strong className="text-foreground">{filtered.length}</strong> active states & territories
          </div>
        </div>
      </div>

      {/* State Location Cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(([state, cities]) => (
          <div
            key={state}
            className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-5 shadow-lg backdrop-blur-md space-y-3 hover:border-primary/40 transition-all"
          >
            <div className="flex items-center justify-between pb-2 border-b border-border/40 dark:border-white/5">
              <div className="flex items-center gap-2.5">
                <MapPinIcon className="h-4 w-4 text-primary" />
                <h3 className="text-base font-bold text-foreground">{state}</h3>
              </div>
              <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10 text-[10px]">
                {cities.length} Clusters
              </Badge>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {cities.map((city) => (
                <span
                  key={city}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-muted/40 dark:bg-white/[0.03] border border-border/40 dark:border-white/5 text-foreground"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
