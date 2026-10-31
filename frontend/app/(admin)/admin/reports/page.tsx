"use client";

import { useState } from "react";
import {
  FileTextIcon, DownloadIcon, PlusIcon, FilterIcon,
  ShieldCheckIcon, CheckCircle2Icon, SparklesIcon,
  LayersIcon, ClockIcon, UserIcon, ArrowDownToLineIcon,
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { mockReports } from "@/data/reports";
import { formatDateTime } from "@/lib/formatters";

const REPORT_TYPES = [
  "students", "companies", "internships", "applications",
  "allocations", "assessments", "fairness", "verification",
  "evaluations", "outcomes",
];

const FORMAT_COLOR: Record<string, string> = {
  CSV: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
  Excel: "border-blue-500/30 text-blue-400 bg-blue-500/10",
  PDF: "border-rose-500/30 text-rose-400 bg-rose-500/10",
};

const TYPE_ICON: Record<string, string> = {
  students: "👨‍🎓",
  companies: "🏢",
  internships: "💼",
  applications: "📋",
  allocations: "🏆",
  assessments: "📝",
  fairness: "⚖️",
  verification: "🔐",
  evaluations: "⭐",
  outcomes: "📈",
};

export default function ReportsPage() {
  const [reports, setReports] = useState(mockReports);
  const [filter, setFilter] = useState("all");
  const [genType, setGenType] = useState("students");
  const [genFormat, setGenFormat] = useState("CSV");
  const [open, setOpen] = useState(false);

  const filtered = filter === "all" ? reports : reports.filter((r) => r.type === filter);

  const generateReport = () => {
    const newReport = {
      id: `rep${reports.length + 1}`,
      type: genType as typeof reports[0]["type"],
      title: `${genType.charAt(0).toUpperCase() + genType.slice(1)} Report – ${new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" })}`,
      description: `Auto-generated ${genType} compliance report.`,
      generatedBy: "Chief Operations Admin",
      generatedAt: new Date().toISOString(),
      format: genFormat as "CSV" | "Excel" | "PDF",
      rowCount: Math.floor(Math.random() * 50) + 12,
      filters: {},
    };
    setReports((p) => [newReport, ...p]);
    setOpen(false);
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
              <FileTextIcon className="h-3.5 w-3.5" />
              Statutory Documentation & Data Exports
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Compliance <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Reports & Export</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed font-normal">
              Generate certified parliamentary and ministerial audits, candidate allocation manifests, institutional stipend disbursements, and verification ledgers.
            </p>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={<Button className="bg-gradient-to-r from-primary via-indigo-600 to-purple-600 hover:from-primary/90 hover:to-purple-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-primary/25 active:scale-95 transition-all gap-2"><PlusIcon className="size-4" />Compile New Report</Button>} />
            <DialogContent className="sm:max-w-md bg-[#0e1322] border-white/10 text-white">
              <DialogHeader>
                <DialogTitle className="text-lg font-bold">Compile Administrative Report</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-3">
                <div className="space-y-1.5">
                  <Label className="text-xs text-slate-300">Report Focus Domain</Label>
                  <Select value={genType} onValueChange={(v) => v && setGenType(v)}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white"><SelectValue /></SelectTrigger>
                    <SelectContent className="bg-[#0e1322] border-white/10 text-white">
                      {REPORT_TYPES.map((t) => (
                        <SelectItem key={t} value={t}>
                          {TYPE_ICON[t]} {t.charAt(0).toUpperCase() + t.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs text-slate-300">Export Standard</Label>
                  <Select value={genFormat} onValueChange={(v) => v && setGenFormat(v)}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white"><SelectValue /></SelectTrigger>
                    <SelectContent className="bg-[#0e1322] border-white/10 text-white">
                      <SelectItem value="CSV">Comma Separated Values (CSV)</SelectItem>
                      <SelectItem value="Excel">Microsoft Excel Spreadsheet (.xlsx)</SelectItem>
                      <SelectItem value="PDF">Signed PDF Manifest (.pdf)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={generateReport}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold shadow-md active:scale-95"
                >
                  Generate & Register Document
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
            filter === "all"
              ? "bg-primary text-white shadow-md shadow-primary/25"
              : "bg-card/80 dark:bg-[#0e1322]/80 text-muted-foreground hover:bg-white/10 border border-border/60 dark:border-white/5"
          }`}
        >
          All Dossiers ({reports.length})
        </button>
        {REPORT_TYPES.map((t) => {
          const count = reports.filter((r) => r.type === t).length;
          if (!count) return null;
          return (
            <button
              key={t}
              type="button"
              onClick={() => setFilter(t)}
              className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition-all flex items-center gap-1.5 ${
                filter === t
                  ? "bg-primary text-white shadow-md shadow-primary/25"
                  : "bg-card/80 dark:bg-[#0e1322]/80 text-muted-foreground hover:bg-white/10 border border-border/60 dark:border-white/5"
              }`}
            >
              <span>{TYPE_ICON[t]}</span>
              <span className="capitalize">{t}</span>
              <span className="opacity-70">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Report Cards Grid */}
      <div className="grid gap-5 sm:grid-cols-2">
        {filtered.map((report) => (
          <div
            key={report.id}
            className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-5 shadow-xl backdrop-blur-md space-y-4 hover:border-primary/50 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="size-11 rounded-2xl bg-muted/60 dark:bg-white/5 border border-border/40 dark:border-white/5 flex items-center justify-center text-xl shrink-0">
                    {TYPE_ICON[report.type] ?? "📄"}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground leading-snug">{report.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{report.description}</p>
                  </div>
                </div>

                <span className={`shrink-0 rounded-lg px-2.5 py-1 text-xs font-bold border ${FORMAT_COLOR[report.format] ?? "bg-muted"}`}>
                  {report.format}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-muted/40 dark:bg-white/[0.02] border border-border/40 dark:border-white/5 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <div>
                  <span className="text-slate-400">Total Rows:</span>{" "}
                  <strong className="text-foreground">{report.rowCount.toLocaleString()} entries</strong>
                </div>
                <div>
                  <span className="text-slate-400">Auditor:</span>{" "}
                  <strong className="text-foreground">{report.generatedBy}</strong>
                </div>
                <div className="col-span-2 text-[11px] font-mono">
                  Generated {formatDateTime(report.generatedAt)}
                </div>
              </div>
            </div>

            <Button
              size="sm"
              variant="outline"
              className="w-full gap-2 border-white/10 hover:bg-white/5 text-xs font-semibold active:scale-95"
              onClick={() =>
                alert(`Export Manifest: Downloading ${report.title} as ${report.format}...\n(Simulated download initiated)`)
              }
            >
              <ArrowDownToLineIcon className="size-3.5" />
              Download {report.format} Package
            </Button>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-12 text-center shadow-xl backdrop-blur-md">
          <FileTextIcon className="size-12 text-muted-foreground/40 mx-auto mb-3" />
          <p className="text-base font-semibold text-foreground">No reports matching selected category</p>
          <p className="text-xs text-muted-foreground mt-1">Compile a new report using the button above.</p>
        </div>
      )}
    </div>
  );
}
