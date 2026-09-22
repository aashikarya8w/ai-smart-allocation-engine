"use client";

import { CheckIcon, CircleIcon, LockIcon } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    title: "Foundation",
    description: "Build strong fundamentals in CS and programming.",
    status: "completed",
    skills: ["Data Structures", "Algorithms", "JavaScript", "Python", "Git"],
    timeframe: "Year 1–2",
  },
  {
    id: 2,
    title: "Frontend Development",
    description: "Master React, TypeScript and modern frontend tooling.",
    status: "current",
    skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "REST API"],
    timeframe: "Year 2–3",
  },
  {
    id: 3,
    title: "Full Stack Skills",
    description: "Add backend, databases, and cloud to your stack.",
    status: "upcoming",
    skills: ["Node.js", "PostgreSQL", "AWS", "Docker", "CI/CD"],
    timeframe: "Year 3",
  },
  {
    id: 4,
    title: "Internship Ready",
    description: "Apply for internships with a strong project portfolio.",
    status: "upcoming",
    skills: ["System Design", "Problem Solving", "Communication", "Agile/Scrum"],
    timeframe: "Year 3–4",
  },
  {
    id: 5,
    title: "Full-time Placement",
    description: "Leverage internship experience for a full-time role.",
    status: "upcoming",
    skills: ["Leadership", "Product Thinking", "Advanced System Design"],
    timeframe: "Year 4+",
  },
];

const STATUS_ICON: Record<StepStatus, React.ReactNode> = {
  completed: <CheckIcon  className="size-4" />,
  current:   <CircleIcon className="size-4" />,
  upcoming:  <LockIcon   className="size-4" />,
};

const STATUS_STYLE: Record<StepStatus, string> = {
  completed: "bg-green-500 text-white",
  current:   "bg-primary text-primary-foreground",
  upcoming:  "bg-muted text-muted-foreground",
};

const completedCount = ROADMAP.filter((s) => s.status === "completed").length;
const progress = Math.round((completedCount / ROADMAP.length) * 100);

export default function CareerRoadmapPage() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Career Roadmap"
        description="Your personalised path to becoming an industry-ready engineer."
      />

      {/* Overall progress */}
      <Card>
        <CardContent className="p-5 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-foreground">Overall Progress</span>
            <span className="font-semibold text-primary">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2.5" />
          <p className="text-xs text-muted-foreground">
            {completedCount} of {ROADMAP.length} milestones completed
          </p>
        </CardContent>
      </Card>

      {/* Steps */}
      <div className="relative space-y-0">
        {/* Connector line */}
        <div className="absolute left-5 top-6 bottom-6 w-0.5 bg-border" aria-hidden="true" />

        <div className="space-y-4">
          {ROADMAP.map((step) => (
            <div key={step.id} className="relative flex gap-4">
              {/* Icon */}
              <div
                className={cn(
                  "relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full",
                  STATUS_STYLE[step.status]
                )}
              >
                {STATUS_ICON[step.status]}
              </div>

              {/* Card */}
              <Card className={cn(
                "flex-1 transition-shadow",
                step.status === "current" && "border-primary/30",
                step.status === "upcoming" && "opacity-70"
              )}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle className="text-sm">{step.title}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          step.status === "completed"
                            ? "default"
                            : step.status === "current"
                              ? "secondary"
                              : "outline"
                        }
                        className="text-xs"
                      >
                        {step.status === "completed"
                          ? "Completed"
                          : step.status === "current"
                            ? "In Progress"
                            : "Upcoming"}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{step.timeframe}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {step.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
