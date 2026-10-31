"use client";

import { useState } from "react";
import {
  StarIcon, MessageSquareIcon, ThumbsUpIcon, SparklesIcon,
  Building2Icon, UserIcon, CheckCircle2Icon, ShieldCheckIcon,
  AwardIcon, HeartHandshakeIcon,
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/common/EmptyState";
import { mockCompanyEvaluations, mockStudentFeedback } from "@/data/evaluations";
import { formatDateTime } from "@/lib/formatters";

function StarRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between text-xs py-1">
      <span className="text-muted-foreground">{label}</span>
      <div className="flex items-center gap-1.5">
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <StarIcon
              key={s}
              className={`size-3.5 ${
                s <= value ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]" : "text-muted-foreground/20"
              }`}
            />
          ))}
        </div>
        <span className="ml-1 text-foreground font-black">{value}/5</span>
      </div>
    </div>
  );
}

export default function AdminFeedbackPage() {
  const [activeTab, setActiveTab] = useState<string>("evaluations");
  const recommended =
    mockCompanyEvaluations.filter((e) => e.wouldRecommend).length +
    mockStudentFeedback.filter((f) => f.wouldRecommend).length;

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-br from-[#0c1222] via-[#0f172a] to-[#1e1338] p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl">
        <div className="absolute -top-32 -right-24 h-96 w-96 rounded-full bg-gradient-to-br from-primary/20 via-purple-500/15 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-gradient-to-tr from-cyan-500/15 via-blue-500/10 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
              <StarIcon className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              Bilateral Quality Assurance & Satisfaction
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Feedback & <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Evaluations</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed font-normal">
              Consolidated supervisory assessments from host corporate entities and direct experience reviews submitted by placed scholars.
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold backdrop-blur-md">
            <ThumbsUpIcon className="h-4 w-4" />
            <span>94.8% Scheme Endorsement Rate</span>
          </div>
        </div>
      </div>

      {/* 3 Stat Cards with Sparklines */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          {
            title: "Corporate Evaluations",
            value: mockCompanyEvaluations.length,
            tab: "evaluations",
            color: "from-amber-500 to-orange-600",
            accent: "#f59e0b",
            icon: StarIcon,
            sub: "Employer technical reviews",
          },
          {
            title: "Student Experience Reports",
            value: mockStudentFeedback.length,
            tab: "feedback",
            color: "from-blue-500 to-indigo-600",
            accent: "#3b82f6",
            icon: MessageSquareIcon,
            sub: "Intern mentorship ratings",
          },
          {
            title: "Mutual Recommendations",
            value: recommended,
            tab: "evaluations",
            color: "from-emerald-500 to-teal-600",
            accent: "#10b981",
            icon: ThumbsUpIcon,
            sub: "High-satisfaction endorsements",
          },
        ].map((stat) => {
          const Icon = stat.icon;
          const isSelected = activeTab === stat.tab;
          return (
            <div
              key={stat.title}
              onClick={() => setActiveTab(stat.tab)}
              className={`cursor-pointer group relative overflow-hidden rounded-2xl border bg-card/90 dark:bg-[#0e1322]/90 p-5 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 ${
                isSelected
                  ? "border-primary ring-2 ring-primary/40 shadow-primary/20"
                  : "border-border/80 dark:border-white/10 hover:border-primary/50"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">{stat.title}</p>
                  <p className="mt-2 text-3xl font-extrabold tracking-tight text-foreground">{stat.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{stat.sub}</p>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-md group-hover:scale-110 transition-transform`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-card/80 dark:bg-[#0e1322]/80 border border-border/80 dark:border-white/10 p-1 rounded-xl">
          <TabsTrigger value="evaluations" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg text-xs font-semibold">
            Corporate Evaluations ({mockCompanyEvaluations.length})
          </TabsTrigger>
          <TabsTrigger value="feedback" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg text-xs font-semibold">
            Scholar Feedback ({mockStudentFeedback.length})
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Corporate Evaluations */}
        <TabsContent value="evaluations" className="space-y-4">
          {mockCompanyEvaluations.length === 0 ? (
            <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-8 shadow-xl backdrop-blur-md">
              <EmptyState icon={StarIcon} title="No evaluations registered yet" />
            </div>
          ) : (
            mockCompanyEvaluations.map((ev) => (
              <div
                key={ev.id}
                className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-6 shadow-xl backdrop-blur-md space-y-4 hover:border-primary/40 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border/50 dark:border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="size-11 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/30 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-sm shrink-0">
                      {ev.studentName.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-foreground">{ev.studentName}</h3>
                      <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                        <Building2Icon className="h-3 w-3 text-primary" />
                        {ev.companyName} · <span className="font-medium text-foreground">{ev.internshipTitle}</span>
                      </p>
                    </div>
                  </div>

                  <Badge
                    variant="outline"
                    className={`text-xs font-semibold ${
                      ev.wouldRecommend
                        ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10"
                        : "border-slate-500/30 text-slate-400 bg-slate-500/10"
                    }`}
                  >
                    {ev.wouldRecommend ? "Recommended for Placement" : "Conditional Review"}
                  </Badge>
                </div>

                <div className="grid gap-2 sm:grid-cols-2 p-3 rounded-xl bg-muted/40 dark:bg-white/[0.02] border border-border/40 dark:border-white/5">
                  <StarRow label="Technical Aptitude" value={ev.technicalPerformance} />
                  <StarRow label="Project Deliverables" value={ev.projectPerformance} />
                  <StarRow label="Team Communication" value={ev.communication} />
                  <StarRow label="Professional Discipline" value={ev.discipline} />
                </div>

                {ev.comments && (
                  <div className="rounded-xl border border-primary/20 bg-primary/5 p-3.5 text-xs text-slate-300 italic">
                    "{ev.comments}"
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                  <span>Audit Timestamp: {formatDateTime(ev.submittedAt)}</span>
                  <span className="font-semibold text-primary">Overall Rating: {ev.overallPerformance}/5</span>
                </div>
              </div>
            ))
          )}
        </TabsContent>

        {/* Tab 2: Scholar Feedback */}
        <TabsContent value="feedback" className="space-y-4">
          {mockStudentFeedback.length === 0 ? (
            <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-8 shadow-xl backdrop-blur-md">
              <EmptyState icon={MessageSquareIcon} title="No student feedback registered yet" />
            </div>
          ) : (
            mockStudentFeedback.map((fb) => (
              <div
                key={fb.id}
                className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-6 shadow-xl backdrop-blur-md space-y-4 hover:border-primary/40 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border/50 dark:border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="size-11 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/30 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-sm shrink-0">
                      {fb.companyName.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-foreground">{fb.internshipTitle}</h3>
                      <p className="text-xs text-muted-foreground">{fb.companyName}</p>
                    </div>
                  </div>

                  <Badge
                    variant="outline"
                    className={`text-xs font-semibold ${
                      fb.wouldRecommend
                        ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10"
                        : "border-slate-500/30 text-slate-400 bg-slate-500/10"
                    }`}
                  >
                    {fb.wouldRecommend ? "Highly Recommended Host" : "Neutral Feedback"}
                  </Badge>
                </div>

                <div className="grid gap-2 sm:grid-cols-2 p-3 rounded-xl bg-muted/40 dark:bg-white/[0.02] border border-border/40 dark:border-white/5">
                  <StarRow label="Learning Curriculum & Depth" value={fb.learningExperience} />
                  <StarRow label="Executive Mentorship Quality" value={fb.mentorship} />
                  <StarRow label="Workplace Culture & Facility" value={fb.workEnvironment} />
                  <StarRow label="Overall Internship Experience" value={fb.overallExperience} />
                </div>

                {fb.suggestions && (
                  <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-3.5 text-xs text-slate-300 italic">
                    "{fb.suggestions}"
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                  <span>Submitted {formatDateTime(fb.submittedAt)}</span>
                  <span className="font-semibold text-primary">Overall Satisfaction: {fb.overallExperience}/5</span>
                </div>
              </div>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
