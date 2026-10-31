"use client";

import { useState, useMemo } from "react";
import { ScrollTextIcon, SearchIcon, FilterIcon } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { mockAuditLogs } from "@/data/auditLogs";
import { formatDateTime } from "@/lib/formatters";

const ROLE_COLOR: Record<string, string> = {
  admin:   "bg-red-100   text-red-700   dark:bg-red-900   dark:text-red-300",
  company: "bg-blue-100  text-blue-700  dark:bg-blue-900  dark:text-blue-300",
  student: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
};

const ACTION_COLOR: Record<string, string> = {
  CREATE:       "bg-green-100  text-green-700  dark:bg-green-900  dark:text-green-300",
  UPDATE:       "bg-blue-100   text-blue-700   dark:bg-blue-900   dark:text-blue-300",
  DELETE:       "bg-red-100    text-red-700    dark:bg-red-900    dark:text-red-300",
  APPROVE:      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300",
  REJECT:       "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
  VERIFY:       "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
  SUSPEND:      "bg-red-100    text-red-700    dark:bg-red-900    dark:text-red-300",
  LOGIN:        "bg-gray-100   text-gray-700   dark:bg-gray-800   dark:text-gray-300",
  EXPORT:       "bg-amber-100  text-amber-700  dark:bg-amber-900  dark:text-amber-300",
  RUN_MATCHING: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300",
  RUN_ALLOCATION:"bg-teal-100  text-teal-700   dark:bg-teal-900   dark:text-teal-300",
};

const STATUS_COLOR: Record<string, string> = {
  Success: "default",
  Failed:  "destructive",
  Pending: "secondary",
} as const;

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

  return (
    <div className="space-y-6">
      <PageHeader
        title="Audit Logs"
        description={`${mockAuditLogs.length} total events tracked across the platform.`}
      />

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search logs..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={roleFilter} onValueChange={(v) => v && setRoleFilter(v)}>
          <SelectTrigger className="w-full sm:w-36">
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
          <SelectTrigger className="w-full sm:w-44">
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
          <SelectTrigger className="w-full sm:w-36">
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

      {/* Count */}
      <p className="text-xs text-muted-foreground">
        Showing <strong>{filtered.length}</strong> of {mockAuditLogs.length} logs
      </p>

      {/* Logs */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <ScrollTextIcon className="size-10 text-muted-foreground/40 mb-3" />
          <p className="text-sm font-medium text-foreground">No logs match your filters</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((log) => (
            <Card key={log.id} className="overflow-hidden">
              <CardContent className="p-3">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-2.5 min-w-0">
                    {/* Action badge */}
                    <span className={`mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-[11px] font-semibold ${ACTION_COLOR[log.action] ?? "bg-muted text-muted-foreground"}`}>
                      {log.action}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{log.description}</p>
                      {log.entityLabel && (
                        <p className="text-xs text-muted-foreground">Entity: {log.entityLabel}</p>
                      )}
                      <div className="mt-1 flex flex-wrap items-center gap-1.5">
                        <span className={`rounded px-1.5 py-0.5 text-[11px] font-medium ${ROLE_COLOR[log.actorRole] ?? ""}`}>
                          {log.actorRole}
                        </span>
                        <span className="text-xs text-muted-foreground">{log.actorName}</span>
                        {log.entity && (
                          <Badge variant="outline" className="text-[11px] py-0">{log.entity}</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <Badge variant={STATUS_COLOR[log.status] as "default" | "destructive" | "secondary"} className="text-xs">
                      {log.status}
                    </Badge>
                    <p className="text-[11px] text-muted-foreground whitespace-nowrap">
                      {formatDateTime(log.createdAt)}
                    </p>
                    {log.ipAddress && (
                      <p className="text-[11px] text-muted-foreground">{log.ipAddress}</p>
                    )}
                  </div>
                </div>

                {/* Diff */}
                {(log.previousValue || log.newValue) && (
                  <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                    {log.previousValue && (
                      <div className="rounded bg-red-50 dark:bg-red-950/20 p-2">
                        <p className="text-[10px] font-semibold text-red-500 mb-1">BEFORE</p>
                        <pre className="text-muted-foreground whitespace-pre-wrap font-mono text-[11px]">
                          {JSON.stringify(log.previousValue, null, 2)}
                        </pre>
                      </div>
                    )}
                    {log.newValue && (
                      <div className="rounded bg-green-50 dark:bg-green-950/20 p-2">
                        <p className="text-[10px] font-semibold text-green-600 mb-1">AFTER</p>
                        <pre className="text-foreground whitespace-pre-wrap font-mono text-[11px]">
                          {JSON.stringify(log.newValue, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
