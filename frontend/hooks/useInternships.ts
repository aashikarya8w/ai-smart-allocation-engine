"use client";

import { useState, useMemo } from "react";
import { mockInternships } from "@/data/internships";
import type { Internship } from "@/types/internship";

interface InternshipFilters extends Record<string, string> {
  search: string;
  sector: string;
  location: string;
  workMode: string;
  duration: string;
  stipendRange: string;
}

const DEFAULT_FILTERS: InternshipFilters = {
  search: "",
  sector: "all",
  location: "all",
  workMode: "all",
  duration: "all",
  stipendRange: "all",
};

export function useInternships(initialFilters?: Partial<InternshipFilters>) {
  const [filters, setFilters] = useState<InternshipFilters>({
    search:      initialFilters?.search      ?? DEFAULT_FILTERS.search,
    sector:      initialFilters?.sector      ?? DEFAULT_FILTERS.sector,
    location:    initialFilters?.location    ?? DEFAULT_FILTERS.location,
    workMode:    initialFilters?.workMode    ?? DEFAULT_FILTERS.workMode,
    duration:    initialFilters?.duration    ?? DEFAULT_FILTERS.duration,
    stipendRange: initialFilters?.stipendRange ?? DEFAULT_FILTERS.stipendRange,
  });
  const [page, setPage] = useState(1);
  const pageSize = 9;

  const filtered = useMemo(() => {
    return mockInternships.filter((i: Internship) => {
      if (i.status !== "Active") return false;

      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (
          !i.title.toLowerCase().includes(q) &&
          !i.companyName.toLowerCase().includes(q) &&
          !i.sector.toLowerCase().includes(q)
        )
          return false;
      }

      if (filters.sector !== "all" && i.sector !== filters.sector) return false;

      if (
        filters.location !== "all" &&
        i.city !== filters.location &&
        i.state !== filters.location
      )
        return false;

      if (filters.workMode !== "all" && i.workMode !== filters.workMode) return false;

      if (filters.duration !== "all" && i.duration !== filters.duration) return false;

      if (filters.stipendRange !== "all") {
        const ranges: Record<string, [number, number]> = {
          "0-5000":   [0, 5000],
          "5000-10000": [5000, 10000],
          "10000-20000": [10000, 20000],
          "20000-30000": [20000, 30000],
          "30000+":  [30000, Infinity],
        };
        const range = ranges[filters.stipendRange];
        if (range && (i.stipendMax < range[0] || i.stipendMin > range[1])) return false;
      }

      return true;
    });
  }, [filters]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  function updateFilter(key: string, value: string) {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  }

  function clearFilters() {
    setFilters(DEFAULT_FILTERS);
    setPage(1);
  }

  return {
    internships: paginated,
    allInternships: filtered,
    filters,
    updateFilter,
    clearFilters,
    page,
    setPage,
    totalPages,
    total: filtered.length,
  };
}

export function useInternship(id: string) {
  return mockInternships.find((i) => i.id === id) ?? null;
}
