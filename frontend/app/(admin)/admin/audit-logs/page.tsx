"use client";

import { useState, useMemo } from "react";
import {
  ScrollTextIcon, SearchIcon, FilterIcon, ShieldAlertIcon,
  ShieldCheckIcon, TerminalIcon, CpuIcon, LayersIcon,
  ClockIcon, LockIcon,
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { mockAuditLogs } from "@/data/auditLogs";
import { formatDateTime } from "@/lib/formatters";

const ROLE_COLOR: Record<string, string> = {
  admin: "border-rose-500/30 text-rose-400 bg-rose-500/10",
  company: "border-blue-500/30 text-blue-400 bg-blue-500/10",
  student: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
};

const ACTION_COLOR: Record<string, string> = {
  CREATE: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
  UPDATE: "border-blue-500/30 text-blue-400 bg-blue-500/10",
  DELETE: "border-rose-500/30 text-rose-400 bg-rose-500/10",
  APPROVE: "border-teal-500/30 text-teal-400 bg-teal-500/10",
  REJECT: "border-orange-500/30 text-orange-400 bg-orange-500/10",
  VERIFY: "border-purple-500/30 text-purple-400 bg-purple-500/10",
  SUSPEND: "border-rose-500/30 text-rose-400 bg-rose-500/10",
  LOGIN: "border-slate-500/30 text-slate-400 bg-slate-500/10",
  EXPORT: "border-amber-500/30 text-amber-400 bg-amber-500/10",
  RUN_MATCHING: "border-indigo-500/30 text-indigo-400 bg-indigo-500/10",
  RUN_ALLOCATION: "border-cyan-500/30 text-cyan-400 bg-cyan-500/10",
};

export default function AuditLogsPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [actionFilter, setActionFilter] = useState("all");
  const [entityFilter, setEntityFilter] = useState("all");

  const uniqueActions = [...new Set(mockAuditLogs.map((l) => l.action))];
  const uniqueEntities = [...new Set(mockAuditLogs.map((l) => l.entity))];

  const filtered = useMemo(() => {
    return mockAuditLogs
      .filter((log) => {
        if (roleFilter !== "all" && log.actorRole !== roleFilter) return false;
        if (actionFilter !== "all" && log.action !== actionFilter) return false;
        if (entityFilter !== "all" && log.entity !== entityFilter) return false;
        if (search) {
          const q = search.toLowerCase();
          return (
            log.actorName.toLowerCase().includes(q) ||
            log.description.toLowerCase().includes(q) ||
            log.entityLabel?.toLowerCase().includes(q) ||
            log.action.toLowerCase().includes(q)
          );
        }
        return true;
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [search, roleFilter, actionFilter, entityFilter]);

  const totalLogs = mockAuditLogs.length;
  const adminEvents = mockAuditLogs.filter((l) => l.actorRole === "admin").length;
  const aiEngineEvents = mockAuditLogs.filter(
    (l) => l.action === "RUN_MATCHING" || l.action === "RUN_ALLOCATION"
  ).length;

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-br from-[#0c1222] via-[#0f172a] to-[#1e1338] p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl">
        <div className="absolute -top-32 -right-24 h-96 w-96 rounded-full bg-gradient-to-br from-primary/20 via-purple-500/15 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-gradient-to-tr from-cyan-500/15 via-blue-500/10 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
              <LockIcon className="h-3.5 w-3.5" />
              Immutable Cryptographic Ledger
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              System <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Audit Trail</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed font-normal">
              High-fidelity compliance telemetry recording every administrative intervention, corporate approval, AI algorithm run, and student identity modification.
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold backdrop-blur-md">
            <TerminalIcon className="h-4 w-4" />
            <span>SHA-256 Verifiable Hashes</span>
          </div>
        </div>

        {/* Quick summary stats */}
        <div className="relative z-10 mt-8 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
            <p className="text-xs text-slate-400">Total Recorded Events</p>
            <p className="text-2xl font-black text-white mt-1">{totalLogs}</p>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
            <p className="text-xs text-slate-400">Administrative Mutations</p>
            <p className="text-2xl font-black text-rose-400 mt-1">{adminEvents}</p>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
            <p className="text-xs text-slate-400">Algorithmic Engine Runs</p>
            <p className="text-2xl font-black text-indigo-400 mt-1">{aiEngineEvents}</p>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
            <p className="text-xs text-slate-400">Integrity Health</p>
            <p className="text-2xl font-black text-emerald-400 mt-1">100%</p>
          </div>
        </div>
      </div>

      {/* Cyber Filters */}
      <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-5 shadow-lg backdrop-blur-md space-y-4">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search by actor, description, entity identifier, or action…"
              className="pl-9 bg-muted/40 dark:bg-white/[0.03] border-border/60 dark:border-white/10 text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Select value={roleFilter} onValueChange={(v) => v && setRoleFilter(v)}>
              <SelectTrigger className="w-32 bg-muted/40 dark:bg-white/[0.03] border-border/60 dark:border-white/10 text-xs">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="company">Company</SelectItem>
                <SelectItem value="student">Student</SelectItem>
              </SelectContent>
            </Select>

            <Select value={actionFilter} onValueChange={(v) => v && setActionFilter(v)}>
              <SelectTrigger className="w-40 bg-muted/40 dark:bg-white/[0.03] border-border/60 dark:border-white/10 text-xs">
                <SelectValue placeholder="Action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                {uniqueActions.map((a) => (
                  <SelectItem key={a} value={a}>{a}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={entityFilter} onValueChange={(v) => v && setEntityFilter(v)}>
              <SelectTrigger className="w-36 bg-muted/40 dark:bg-white/[0.03] border-border/60 dark:border-white/10 text-xs">
                <SelectValue placeholder="Entity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Entities</SelectItem>
                {uniqueEntities.map((e) => (
                  <SelectItem key={e} value={e}>{e}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 border-t border-border/40 dark:border-white/5">
          <span>Filtering active trail: Showing <strong>{filtered.length}</strong> of {mockAuditLogs.length} events</span>
        </div>
      </div>

      {/* Audit Log Stream */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-8 shadow-xl backdrop-blur-md">
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <ScrollTextIcon className="size-10 text-muted-foreground/40 mb-3" />
            <p className="text-sm font-semibold text-foreground">No audit entries matching filter criteria</p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((log) => (
            <div
              key={log.id}
              className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-5 shadow-xl backdrop-blur-md transition-all hover:border-primary/40 space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <span
                    className={`mt-0.5 shrink-0 rounded-lg px-2.5 py-1 text-xs font-bold border ${
                      ACTION_COLOR[log.action] ?? "bg-muted text-muted-foreground"
                    }`}
                  >
                    {log.action}
                  </span>

                  <div className="min-w-0 space-y-1">
                    <p className="text-sm font-semibold text-foreground leading-snug">{log.description}</p>
                    {log.entityLabel && (
                      <p className="text-xs text-muted-foreground font-mono">Target: {log.entityLabel}</p>
                    )}
                    <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                      <span className={`rounded-md px-2 py-0.5 text-[11px] font-bold border ${ROLE_COLOR[log.actorRole] ?? ""}`}>
                        {log.actorRole.toUpperCase()}
                      </span>
                      <span className="text-foreground font-medium">{log.actorName}</span>
                      {log.entity && (
                        <Badge variant="outline" className="text-[11px] border-white/10 bg-white/5">
                          {log.entity}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex shrink-0 flex-col sm:items-end gap-1 text-xs text-muted-foreground">
                  <Badge
                    variant="outline"
                    className={`text-[11px] font-semibold ${
                      log.status === "Success"
                        ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10"
                        : log.status === "Failed"
                        ? "border-rose-500/30 text-rose-400 bg-rose-500/10"
                        : "border-amber-500/30 text-amber-400 bg-amber-500/10"
                    }`}
                  >
                    {log.status}
                  </Badge>
                  <span className="font-mono text-[11px]">{formatDateTime(log.createdAt)}</span>
                  {log.ipAddress && (
                    <span className="text-[10px] text-muted-foreground font-mono">{log.ipAddress}</span>
                  )}
                </div>
              </div>

              {/* Mutation Diff View */}
              {(log.previousValue || log.newValue) && (
                <div className="pt-3 border-t border-border/40 dark:border-white/5 grid sm:grid-cols-2 gap-3 text-xs">
                  {log.previousValue && (
                    <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-3">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-rose-400 mb-1.5 flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                        Previous State
                      </p>
                      <pre className="text-slate-300 whitespace-pre-wrap font-mono text-[11px] max-h-36 overflow-auto">
                        {JSON.stringify(log.previousValue, null, 2)}
                      </pre>
                    </div>
                  )}
                  {log.newValue && (
                    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 mb-1.5 flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        Mutated State
                      </p>
                      <pre className="text-emerald-300/90 whitespace-pre-wrap font-mono text-[11px] max-h-36 overflow-auto">
                        {JSON.stringify(log.newValue, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
