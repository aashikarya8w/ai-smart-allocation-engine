"use client";

import { useState } from "react";
import {
  UploadIcon,
  FileTextIcon,
  SparklesIcon,
  CheckCircleIcon,
  Loader2Icon,
  AlertCircleIcon,
  AwardIcon,
  GraduationCapIcon,
  Code2Icon,
  FileCheck2Icon,
  ArrowUpRightIcon,
  LightbulbIcon
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

const MOCK_ANALYSIS = {
  extractedSkills: ["React", "Node.js", "MongoDB", "TypeScript", "Git", "REST API", "Tailwind CSS", "Docker"],
  education: [{ degree: "B.Tech – Computer Science & Engineering", institution: "PICT, Pune", year: "2022–2026", score: "8.7 CGPA" }],
  projects: [
    {
      title: "E-Commerce Microservices Platform",
      description: "Full-stack cloud-native marketplace with automated payment gateways and inventory sync.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe API"]
    },
    {
      title: "Collaborative Task Manager",
      description: "Real-time task synchronization tool with WebSockets, drag-drop Kanban, and role-based ACL.",
      technologies: ["TypeScript", "Socket.io", "Express", "Redis"]
    },
  ],
  certifications: [
    { title: "Meta Certified Front-End Developer", issuer: "Meta · Coursera", year: "2024" },
    { title: "AWS Cloud Practitioner (In Progress)", issuer: "Amazon Web Services", year: "2025" },
  ],
  overallScore: 78,
  breakdown: [
    { label: "Technical Skills Coverage", score: 86, color: "bg-emerald-500" },
    { label: "Impact & Action Verbs", score: 68, color: "bg-amber-500" },
    { label: "ATS Standard Formatting", score: 92, color: "bg-blue-500" },
    { label: "Academic & Project Depth", score: 80, color: "bg-purple-500" },
  ],
  suggestions: [
    { text: "Add quantifiable metrics to projects (e.g., 'Reduced response latency by 35%').", priority: "High" },
    { text: "Include a 2-sentence executive summary tailored for Full Stack & Cloud roles.", priority: "High" },
    { text: "Link your verified GitHub profile and live deployed demo URLs in the header.", priority: "Medium" },
  ],
};

export default function ResumePage() {
  const [hasResume, setHasResume] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(true);
  const [dragging, setDragging] = useState(false);

  function handleAnalyze() {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setAnalyzed(true);
    }, 1800);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    setHasResume(true);
    setAnalyzed(false);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Resume & ATS Diagnostics"
        description="Optimize your CV with AI-driven ATS screening and keyword extraction."
      />

      {/* Cyber Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent p-6 shadow-xl shadow-primary/5 backdrop-blur-md">
        <div className="absolute -right-10 -top-10 size-48 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-md">
              <SparklesIcon className="size-3.5 text-primary" />
              <span>Deep Semantic ATS Parser v3.2</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Maximize Interview Shortlists with AI Feedback
            </h2>
            <p className="max-w-2xl text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Our parser screens your resume against enterprise applicant tracking systems (Taleo, Greenhouse, Workday) to verify keyword density, structure, and readability.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-400">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              ATS Parsable: Validated
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column: Upload & Actions */}
        <div className="space-y-4">
          {/* Dropzone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-7 text-center transition-all backdrop-blur-md ${
              dragging
                ? "border-primary bg-primary/10 shadow-lg shadow-primary/10"
                : "border-border/80 dark:border-white/10 bg-card/85 dark:bg-[#0e1322]/85 hover:border-primary/50"
            }`}
          >
            <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/25 mb-3 shadow-inner">
              <UploadIcon className="size-6" />
            </div>
            <h4 className="text-sm font-bold text-foreground">Upload or Drop Resume</h4>
            <p className="mt-1 text-xs text-muted-foreground">PDF or DOCX format (Max 5 MB)</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4 rounded-xl border-primary/30 text-primary hover:bg-primary/10"
              onClick={() => {
                setHasResume(true);
                setAnalyzed(false);
              }}
            >
              Browse Computer
            </Button>
          </div>

          {/* Active File Card */}
          {hasResume && (
            <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 shrink-0">
                  <FileTextIcon className="size-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-foreground">Aarav_Sharma_Resume.pdf</p>
                  <p className="text-xs text-muted-foreground">245 KB · Uploaded 10 Jun 2025</p>
                </div>
              </div>

              <div className="h-px bg-border/60" />

              <Button
                className="w-full gap-2 rounded-xl font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20"
                size="sm"
                onClick={handleAnalyze}
                disabled={analyzing}
              >
                {analyzing ? (
                  <>
                    <Loader2Icon className="size-4 animate-spin" />
                    <span>Analyzing Keywords & Layout…</span>
                  </>
                ) : (
                  <>
                    <SparklesIcon className="size-4" />
                    <span>Re-Run AI Diagnostics</span>
                  </>
                )}
              </Button>
            </div>
          )}
        </div>

        {/* Right Column: AI Score & Extracted Data */}
        <div className="space-y-5 lg:col-span-2">
          {!analyzed ? (
            <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/85 dark:bg-[#0e1322]/85 p-12 text-center backdrop-blur-md">
              <SparklesIcon className="mx-auto mb-3 size-10 text-primary animate-pulse" />
              <h4 className="text-base font-bold text-foreground">Ready for AI Analysis</h4>
              <p className="mt-1 text-xs text-muted-foreground max-w-sm mx-auto">
                Click "Run AI Diagnostics" to parse skills, estimate ATS pass probability, and identify missing keywords.
              </p>
            </div>
          ) : (
            <>
              {/* ATS Score Card */}
              <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                  <div className="flex items-center gap-4">
                    <div className="relative flex size-18 items-center justify-center">
                      <svg className="size-16 -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-muted/30"
                          stroke="currentColor"
                          strokeWidth="3.5"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="text-primary"
                          strokeDasharray={`${MOCK_ANALYSIS.overallScore}, 100`}
                          stroke="currentColor"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <span className="absolute text-xl font-extrabold text-foreground">
                        {MOCK_ANALYSIS.overallScore}
                      </span>
                    </div>

                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
                        ATS Readiness Score
                      </span>
                      <h3 className="text-lg font-bold text-foreground">Strong Match Candidate</h3>
                      <p className="text-xs text-emerald-400 font-medium">✓ Passes 88% of automated enterprise filters</p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary self-start sm:self-center">
                    Level: Tier-1 Competitive
                  </span>
                </div>

                {/* Score Breakdown Bars */}
                <div className="grid gap-3 sm:grid-cols-2 pt-2 border-t border-border/60">
                  {MOCK_ANALYSIS.breakdown.map((b) => (
                    <div key={b.label} className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">{b.label}</span>
                        <span className="font-semibold text-foreground">{b.score}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted/40 overflow-hidden">
                        <div className={`h-full rounded-full ${b.color}`} style={{ width: `${b.score}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Extracted Skills */}
              <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Code2Icon className="size-4 text-primary" />
                  <h3 className="text-sm font-bold text-foreground">Extracted Technical Skills</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {MOCK_ANALYSIS.extractedSkills.map((s) => (
                    <span
                      key={s}
                      className="rounded-xl border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verified Education & Projects */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <GraduationCapIcon className="size-4 text-primary" />
                    <h3 className="text-sm font-bold text-foreground">Education</h3>
                  </div>
                  {MOCK_ANALYSIS.education.map((e, i) => (
                    <div key={i} className="rounded-xl border border-border/60 bg-muted/20 p-3 space-y-1">
                      <p className="font-bold text-sm text-foreground">{e.degree}</p>
                      <p className="text-xs text-muted-foreground">{e.institution} · {e.year}</p>
                      <span className="inline-block rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-400">
                        {e.score}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <AwardIcon className="size-4 text-primary" />
                    <h3 className="text-sm font-bold text-foreground">Certifications</h3>
                  </div>
                  <div className="space-y-2">
                    {MOCK_ANALYSIS.certifications.map((c, i) => (
                      <div key={i} className="rounded-xl border border-border/60 bg-muted/20 p-3 space-y-1">
                        <p className="font-bold text-xs text-foreground">{c.title}</p>
                        <p className="text-[11px] text-muted-foreground">{c.issuer} · {c.year}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* AI Improvement Suggestions */}
              <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-6">
                <div className="flex items-center gap-2 mb-4">
                  <LightbulbIcon className="size-4 text-amber-400" />
                  <h3 className="text-sm font-bold text-foreground">AI Optimization Recommendations</h3>
                </div>

                <div className="space-y-3">
                  {MOCK_ANALYSIS.suggestions.map((s, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 rounded-xl border border-border/60 bg-muted/20 p-3.5 transition-colors hover:border-primary/40"
                    >
                      <span
                        className={`rounded-md px-2 py-0.5 text-[10px] font-bold shrink-0 mt-0.5 ${
                          s.priority === "High"
                            ? "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                            : "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                        }`}
                      >
                        {s.priority}
                      </span>
                      <p className="text-xs text-foreground leading-relaxed flex-1">{s.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
