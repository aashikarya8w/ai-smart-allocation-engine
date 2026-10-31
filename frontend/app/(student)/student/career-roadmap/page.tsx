"use client";

import {
  CheckIcon,
  CircleIcon,
  LockIcon,
  SparklesIcon,
  CompassIcon,
  ArrowRightIcon,
  ClockIcon,
  LayersIcon,
  CheckCircle2Icon
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type StepStatus = "completed" | "current" | "upcoming";

interface RoadmapStep {
  id: number;
  title: string;
  description: string;
  status: StepStatus;
  skills: string[];
  timeframe: string;
}

const ROADMAP: RoadmapStep[] = [
  {
    id: 1,
    title: "Core CS Fundamentals & Logic",
    description: "Build deep foundations in algorithms, data structures, and foundational programming paradigms.",
    status: "completed",
    skills: ["Data Structures", "Algorithms", "JavaScript", "Python", "Git & GitHub"],
    timeframe: "Year 1–2",
  },
  {
    id: 2,
    title: "Modern Frontend & Web Systems",
    description: "Master React, TypeScript, Next.js App Router, state managers, and enterprise CSS tooling.",
    status: "current",
    skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "REST APIs"],
    timeframe: "Year 2–3 (Active)",
  },
  {
    id: 3,
    title: "Full-Stack & Cloud Architecture",
    description: "Integrate relational and document databases, Docker containerization, and AWS services.",
    status: "upcoming",
    skills: ["Node.js", "PostgreSQL", "AWS Cloud", "Docker", "CI/CD Actions"],
    timeframe: "Year 3",
  },
  {
    id: 4,
    title: "Enterprise Internship Readiness",
    description: "Deploy scalable production capstones, undergo mock technical interviews, and clear skill tests.",
    status: "upcoming",
    skills: ["System Design", "Microservices", "Agile Sprints", "Code Reviews"],
    timeframe: "Year 3–4",
  },
  {
    id: 5,
    title: "Full-Time Placement & Pre-Placement Offer",
    description: "Convert corporate internship performance into high-value full-time software engineering offers.",
    status: "upcoming",
    skills: ["Engineering Leadership", "Distributed Systems", "Product Strategy"],
    timeframe: "Year 4+",
  },
];

const completedCount = ROADMAP.filter((s) => s.status === "completed").length;
const progress = Math.round(((completedCount + 0.5) / ROADMAP.length) * 100);

export default function CareerRoadmapPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Career Progression Roadmap"
        description="Structured engineering roadmap tailored to your target roles and current university year."
      />

      {/* Cyber Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent p-6 shadow-xl shadow-primary/5 backdrop-blur-md">
        <div className="absolute -right-10 -top-10 size-48 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-md">
              <CompassIcon className="size-3.5 text-primary" />
              <span>Adaptive Engineering Milestone Tracker</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Personalized Path from Campus to Tier-1 Enterprise
            </h2>
            <p className="max-w-2xl text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Every milestone is dynamically prioritized based on hiring trends across Fortune 500 tech partners and your verified assessment accomplishments.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 shrink-0 sm:flex sm:items-center">
            <div className="rounded-xl border border-primary/30 bg-primary/10 p-3 text-center backdrop-blur-sm">
              <span className="text-xs text-primary block">Active Milestone</span>
              <span className="text-sm font-bold text-foreground">Stage 2 of 5</span>
            </div>
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-center backdrop-blur-sm">
              <span className="text-xs text-emerald-400 block">Overall Mastery</span>
              <span className="text-sm font-bold text-emerald-400">{progress}% Complete</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Metric Card */}
      <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-6 space-y-3 shadow-xl">
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <span className="font-bold text-foreground">Curriculum & Industry Readiness Progress</span>
          <span className="font-extrabold text-primary">{progress}% Ready</span>
        </div>
        <div className="h-2.5 w-full rounded-full bg-muted/40 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-emerald-400 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
          <span>{completedCount} milestone completed · 1 active in progress · 3 upcoming</span>
          <span className="font-medium text-foreground">Target Graduation: 2026</span>
        </div>
      </div>

      {/* Cyber Timeline */}
      <div className="relative space-y-0 pl-2">
        {/* Glowing Connector line */}
        <div className="absolute left-7 top-8 bottom-8 w-0.5 bg-gradient-to-b from-emerald-500 via-primary to-border/40" />

        <div className="space-y-5">
          {ROADMAP.map((step) => {
            const isCompleted = step.status === "completed";
            const isCurrent = step.status === "current";

            return (
              <div key={step.id} className="relative flex items-start gap-5">
                {/* Step Node */}
                <div
                  className={cn(
                    "relative z-10 flex size-10 shrink-0 items-center justify-center rounded-2xl font-bold text-xs shadow-md transition-transform",
                    isCompleted
                      ? "bg-emerald-500 text-white shadow-emerald-500/20"
                      : isCurrent
                      ? "bg-primary text-primary-foreground shadow-primary/30 ring-4 ring-primary/20 animate-pulse"
                      : "bg-muted text-muted-foreground border border-border/80"
                  )}
                >
                  {isCompleted ? (
                    <CheckIcon className="size-5" />
                  ) : isCurrent ? (
                    <span className="text-xs font-black">{step.id}</span>
                  ) : (
                    <LockIcon className="size-4" />
                  )}
                </div>

                {/* Step Detail Card */}
                <div
                  className={cn(
                    "flex-1 overflow-hidden rounded-2xl border backdrop-blur-md p-5 transition-all duration-300",
                    isCurrent
                      ? "border-primary/50 bg-card/95 dark:bg-[#0e1322]/95 shadow-xl shadow-primary/5 ring-1 ring-primary/30"
                      : isCompleted
                      ? "border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 hover:border-emerald-500/40"
                      : "border-border/60 bg-card/60 dark:bg-[#0e1322]/60 opacity-80"
                  )}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="text-base font-bold text-foreground">{step.title}</h3>
                      <span
                        className={cn(
                          "rounded-full border px-2.5 py-0.5 text-[11px] font-semibold",
                          isCompleted
                            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                            : isCurrent
                            ? "border-primary/30 bg-primary/10 text-primary"
                            : "border-border/60 bg-muted/40 text-muted-foreground"
                        )}
                      >
                        {isCompleted ? "Completed" : isCurrent ? "Active In Progress" : "Upcoming"}
                      </span>
                    </div>

                    <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                      <ClockIcon className="size-3 text-primary shrink-0" />
                      {step.timeframe}
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed mb-3.5">
                    {step.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {step.skills.map((skill) => (
                      <span
                        key={skill}
                        className={cn(
                          "rounded-lg border px-2.5 py-0.5 text-xs font-medium",
                          isCurrent
                            ? "border-primary/25 bg-primary/10 text-primary font-semibold"
                            : "border-border/60 bg-muted/30 text-muted-foreground"
                        )}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
