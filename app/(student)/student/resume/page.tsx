"use client";

import { useState } from "react";
import { UploadIcon, FileTextIcon, SparklesIcon, CheckCircleIcon, Loader2Icon } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

const MOCK_ANALYSIS = {
  extractedSkills: ["React", "Node.js", "MongoDB", "TypeScript", "Git", "REST API"],
  education: [{ degree: "B.Tech – Computer Science", institution: "PICT, Pune", year: "2022–2026", score: "8.7 CGPA" }],
  experience: [] as { company: string; role: string; duration: string; description: string }[],
  projects: [
    { title: "E-Commerce Platform", description: "Full stack shopping app", technologies: ["React", "Node.js", "MongoDB"] },
    { title: "Task Management App", description: "Collaborative todo with real-time sync", technologies: ["TypeScript", "Socket.io"] },
  ],
  certifications: [
    { title: "React Developer Certification", issuer: "Meta", year: "2024" },
  ],
  overallScore: 72,
  suggestions: [
    "Add more quantifiable achievements",
    "Include a professional summary",
    "List open source contributions",
  ],
};

export default function ResumePage() {
  const [hasResume, setHasResume]     = useState(true);
  const [analyzing, setAnalyzing]     = useState(false);
  const [analyzed, setAnalyzed]       = useState(true);
  const [dragging, setDragging]       = useState(false);

  function handleAnalyze() {
    setAnalyzing(true);
    setTimeout(() => { setAnalyzing(false); setAnalyzed(true); }, 2000);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    setHasResume(true);
    setAnalyzed(false);
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Resume" description="Upload and analyse your resume with AI." />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Upload panel */}
        <div className="space-y-4">
          {/* Drop zone */}
          <Card>
            <CardContent className="p-4">
              <div
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
                  dragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/30"
                }`}
              >
                <UploadIcon className="mb-3 size-8 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground">Drag & drop your resume</p>
                <p className="mt-1 text-xs text-muted-foreground">PDF, DOCX up to 5 MB</p>
                <Button variant="outline" size="sm" className="mt-4"
                  onClick={() => { setHasResume(true); setAnalyzed(false); }}>
                  Browse File
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Uploaded file */}
          {hasResume && (
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/20">
                    <FileTextIcon className="size-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">Aarav_Sharma_Resume.pdf</p>
                    <p className="text-xs text-muted-foreground">245 KB · Uploaded Jun 1</p>
                  </div>
                </div>
                <Separator />
                <Button
                  className="w-full gap-2"
                  size="sm"
                  onClick={handleAnalyze}
                  disabled={analyzing || analyzed}
                >
                  {analyzing ? (
                    <><Loader2Icon className="size-4 animate-spin" />Analysing…</>
                  ) : analyzed ? (
                    <><CheckCircleIcon className="size-4" />Analysed</>
                  ) : (
                    <><SparklesIcon className="size-4" />Run AI Analysis</>
                  )}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Analysis results */}
        <div className="space-y-4 lg:col-span-2">
          {!analyzed ? (
            <Card>
              <CardContent className="p-8 text-center">
                <SparklesIcon className="mx-auto mb-3 size-10 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground">No analysis yet</p>
                <p className="mt-1 text-xs text-muted-foreground">Upload a resume and run AI analysis to see results.</p>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Score */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Resume Score</p>
                      <p className="text-3xl font-bold text-primary">{MOCK_ANALYSIS.overallScore}/100</p>
                    </div>
                    <Progress value={MOCK_ANALYSIS.overallScore} className="h-3 w-32" />
                  </div>
                </CardContent>
              </Card>

              {/* Extracted skills */}
              <Card>
                <CardHeader><CardTitle className="text-sm">Extracted Skills</CardTitle></CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {MOCK_ANALYSIS.extractedSkills.map((s) => (
                      <Badge key={s} variant="secondary">{s}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Education */}
              <Card>
                <CardHeader><CardTitle className="text-sm">Education</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  {MOCK_ANALYSIS.education.map((e, i) => (
                    <div key={i} className="rounded-lg border border-border/50 p-3 text-sm">
                      <p className="font-medium text-foreground">{e.degree}</p>
                      <p className="text-xs text-muted-foreground">{e.institution} · {e.year} · {e.score}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Projects */}
              <Card>
                <CardHeader><CardTitle className="text-sm">Projects</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  {MOCK_ANALYSIS.projects.map((p, i) => (
                    <div key={i} className="rounded-lg border border-border/50 p-3">
                      <p className="text-sm font-medium text-foreground">{p.title}</p>
                      <p className="text-xs text-muted-foreground">{p.description}</p>
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {p.technologies.map((t) => (
                          <Badge key={t} variant="outline" className="text-xs">{t}</Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Certifications */}
              <Card>
                <CardHeader><CardTitle className="text-sm">Certifications</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  {MOCK_ANALYSIS.certifications.map((c, i) => (
                    <div key={i} className="rounded-lg border border-border/50 p-3 text-sm">
                      <p className="font-medium text-foreground">{c.title}</p>
                      <p className="text-xs text-muted-foreground">{c.issuer} · {c.year}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Suggestions */}
              <Card>
                <CardHeader><CardTitle className="text-sm">AI Suggestions</CardTitle></CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {MOCK_ANALYSIS.suggestions.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 text-xs">!</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
