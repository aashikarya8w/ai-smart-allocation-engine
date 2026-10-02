"use client";

import { useState } from "react";
import { FileTextIcon, DownloadIcon, PlusIcon, FilterIcon } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  CSV:   "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  Excel: "bg-blue-100  text-blue-700  dark:bg-blue-900  dark:text-blue-300",
  PDF:   "bg-red-100   text-red-700   dark:bg-red-900   dark:text-red-300",
};

const TYPE_ICON: Record<string, string> = {
  students:     "👨‍🎓",
  companies:    "🏢",
  internships:  "💼",
  applications: "📋",
  allocations:  "🏆",
  assessments:  "📝",
  fairness:     "⚖️",
  verification: "🔐",
  evaluations:  "⭐",
  outcomes:     "📈",
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
      description: `Auto-generated ${genType} report.`,
      generatedBy: "Admin User",
      generatedAt: new Date().toISOString(),
      format: genFormat as "CSV" | "Excel" | "PDF",
      rowCount: Math.floor(Math.random() * 50) + 5,
      filters: {},
    };
    setReports((p) => [newReport, ...p]);
    setOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        description="Generate, view and export platform reports."
      >
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger render={<Button size="sm"><PlusIcon className="mr-1.5 size-4" />Generate Report</Button>} />
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Generate New Report</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <Label>Report Type</Label>
                <Select value={genType} onValueChange={(v) => v && setGenType(v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {REPORT_TYPES.map((t) => (
                      <SelectItem key={t} value={t}>
                        {TYPE_ICON[t]} {t.charAt(0).toUpperCase() + t.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Format</Label>
                <Select value={genFormat} onValueChange={(v) => v && setGenFormat(v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CSV">CSV</SelectItem>
                    <SelectItem value="Excel">Excel</SelectItem>
                    <SelectItem value="PDF">PDF</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={generateReport} className="w-full">Generate</Button>
            </div>
          </DialogContent>
        </Dialog>
      </PageHeader>

      {/* Filter */}
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
        >
          All ({reports.length})
        </Button>
        {REPORT_TYPES.map((t) => {
          const count = reports.filter((r) => r.type === t).length;
          if (!count) return null;
          return (
            <Button
              key={t}
              size="sm"
              variant={filter === t ? "default" : "outline"}
              onClick={() => setFilter(t)}
            >
              {TYPE_ICON[t]} {t} ({count})
            </Button>
          );
        })}
      </div>

      {/* Report cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map((report) => (
          <Card key={report.id} className="group hover:border-primary/40 transition-colors">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2">
                  <span className="text-2xl">{TYPE_ICON[report.type] ?? "📄"}</span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground leading-tight">{report.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{report.description}</p>
                  </div>
                </div>
                <span className={`shrink-0 rounded px-1.5 py-0.5 text-xs font-medium ${FORMAT_COLOR[report.format] ?? ""}`}>
                  {report.format}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span>{report.rowCount} records</span>
                <span>·</span>
                <span>Generated {formatDateTime(report.generatedAt)}</span>
                <span>·</span>
                <span>by {report.generatedBy}</span>
              </div>

              {report.filters && Object.keys(report.filters).length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {Object.entries(report.filters).map(([k, v]) => (
                    <Badge key={k} variant="outline" className="text-xs">
                      {k}: {String(v)}
                    </Badge>
                  ))}
                </div>
              )}

              <Button
                size="sm"
                variant="outline"
                className="w-full gap-1.5"
                onClick={() => alert(`Downloading ${report.title} as ${report.format}...\n(Mock export)`)}
              >
                <DownloadIcon className="size-3.5" />
                Download {report.format}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <FileTextIcon className="size-10 text-muted-foreground/40 mb-3" />
          <p className="text-sm font-medium text-foreground">No reports found</p>
          <p className="text-xs text-muted-foreground mt-1">Generate a new report using the button above.</p>
        </div>
      )}
    </div>
  );
}
