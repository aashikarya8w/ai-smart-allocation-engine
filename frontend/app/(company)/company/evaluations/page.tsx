"use client";

import { useState } from "react";
import {
  StarIcon,
  CheckCircle2Icon,
  ClipboardCheckIcon,
  Building2Icon,
  ClockIcon,
  SparklesIcon,
  AwardIcon,
  SendIcon
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/common/EmptyState";
import { mockCompanyEvaluations } from "@/data/evaluations";
import { mockAllocations } from "@/data/allocations";
import { useCompany } from "@/hooks/useCompany";
import { formatDateTime } from "@/lib/formatters";

const schema = z.object({
  technicalPerformance: z.number().min(1).max(5),
  projectPerformance: z.number().min(1).max(5),
  communication: z.number().min(1).max(5),
  discipline: z.number().min(1).max(5),
  overallPerformance: z.number().min(1).max(5),
  comments: z.string().min(10, "Please add at least 10 characters"),
  wouldRecommend: z.boolean(),
});
type EvalForm = z.infer<typeof schema>;

const RATING_LABEL = ["", "Unsatisfactory", "Needs Guidance", "Proficient", "Very Strong", "Exemplary"];

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center gap-1.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          className={`transition-all hover:scale-110 ${
            s <= value ? "text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" : "text-muted-foreground/30 hover:text-amber-400/50"
          }`}
        >
          <StarIcon className="size-6 fill-current" />
        </button>
      ))}
      {value > 0 && (
        <span className="ml-2 text-xs font-semibold text-amber-400 self-center">
          {RATING_LABEL[value]}
        </span>
      )}
    </div>
  );
}

function StarDisplay({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <StarIcon
          key={s}
          className={`size-3.5 fill-current ${
            s <= value ? "text-amber-400" : "text-muted-foreground/20"
          }`}
        />
      ))}
      <span className="ml-1 text-xs text-foreground font-bold">{value}/5</span>
    </div>
  );
}

export default function CompanyEvaluationsPage() {
  const { company } = useCompany();
  const userSubmitted = mockCompanyEvaluations.filter((e) => e.companyId === company?.id);
  const submitted = userSubmitted.length > 0 ? userSubmitted : mockCompanyEvaluations.slice(0, 2);
  const [success, setSuccess] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("pending");

  const companyAllocs = mockAllocations.filter((a) => a.companyId === company?.id && a.status === "Approved");
  const rawAllocs = companyAllocs.length > 0 ? companyAllocs : mockAllocations.filter((a) => a.status === "Approved").slice(0, 3);
  const allocatedStudents = rawAllocs.filter((a) => !submitted.some((e) => e.allocationId === a.id));

  const {
    handleSubmit,
    watch,
    setValue,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EvalForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      technicalPerformance: 0,
      projectPerformance: 0,
      communication: 0,
      discipline: 0,
      overallPerformance: 0,
      comments: "",
      wouldRecommend: true,
    },
  });

  const values = watch();

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 700));
    setSuccess(true);
    setSelectedStudent(null);
    reset();
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Intern Performance Appraisals"
        description="Submit official performance ratings and recommendations for your active student cohort."
      />

      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent p-6 shadow-xl shadow-primary/5 backdrop-blur-md">
        <div className="absolute -right-10 -top-10 size-48 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-md">
              <AwardIcon className="size-3.5 text-primary" />
              <span>National Academic Credit Accreditation</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Official Corporate Mentor Evaluations
            </h2>
            <p className="max-w-2xl text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Your appraisals directly award university academic internship credits to students and calibrate the affirmative allocation matching weights for next year.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-400">
              <CheckCircle2Icon className="size-3.5" />
              Digital Signature Enabled
            </span>
          </div>
        </div>
      </div>

      {/* Modern Metric Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {/* Submitted */}
        <div
          onClick={() => setActiveTab("submitted")}
          className={`group cursor-pointer relative overflow-hidden rounded-2xl border p-5 transition-all duration-300 backdrop-blur-md ${
            activeTab === "submitted"
              ? "border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/10"
              : "border-border/80 dark:border-white/10 bg-card/85 dark:bg-[#0e1322]/85 hover:border-emerald-500/50 hover:shadow-md"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Submitted</span>
            <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              <CheckCircle2Icon className="size-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div className="text-3xl font-bold tracking-tight text-foreground">{submitted.length} Interns</div>
            <span className="text-xs font-semibold text-emerald-400">✓ Completed</span>
          </div>
          <div className="mt-3 h-8 w-full">
            <svg className="h-full w-full overflow-visible" viewBox="0 0 100 25" preserveAspectRatio="none">
              <path d="M 0 20 Q 30 16 60 8 T 100 3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-emerald-500" />
            </svg>
          </div>
        </div>

        {/* Pending */}
        <div
          onClick={() => setActiveTab("pending")}
          className={`group cursor-pointer relative overflow-hidden rounded-2xl border p-5 transition-all duration-300 backdrop-blur-md ${
            activeTab === "pending"
              ? "border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/10"
              : "border-border/80 dark:border-white/10 bg-card/85 dark:bg-[#0e1322]/85 hover:border-amber-500/50 hover:shadow-md"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Pending Review</span>
            <div className="flex size-9 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
              <ClockIcon className="size-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div className="text-3xl font-bold tracking-tight text-foreground">{allocatedStudents.length} Interns</div>
            <span className="text-xs font-semibold text-amber-400">Action Needed</span>
          </div>
          <div className="mt-3 h-8 w-full">
            <svg className="h-full w-full overflow-visible" viewBox="0 0 100 25" preserveAspectRatio="none">
              <path d="M 0 16 Q 30 14 60 16 T 100 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-amber-500" />
            </svg>
          </div>
        </div>

        {/* Total */}
        <div className="group relative overflow-hidden rounded-2xl border border-border/80 dark:border-white/10 bg-card/85 dark:bg-[#0e1322]/85 p-5 backdrop-blur-md transition-all hover:border-primary/50 hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total Cohort</span>
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary/15 text-primary border border-primary/30">
              <AwardIcon className="size-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div className="text-3xl font-bold tracking-tight text-foreground">{submitted.length + allocatedStudents.length} Placements</div>
            <span className="text-xs font-semibold text-primary">Active Year</span>
          </div>
          <div className="mt-3 h-8 w-full">
            <svg className="h-full w-full overflow-visible" viewBox="0 0 100 25" preserveAspectRatio="none">
              <path d="M 0 18 Q 35 14 70 8 T 100 2" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-primary" />
            </svg>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-5">
        <TabsList className="bg-muted/50 p-1 rounded-2xl border border-border/60">
          <TabsTrigger value="pending" className="rounded-xl text-xs font-semibold">
            Pending Appraisals ({allocatedStudents.length})
          </TabsTrigger>
          <TabsTrigger value="submitted" className="rounded-xl text-xs font-semibold">
            Submitted Evaluations ({submitted.length})
          </TabsTrigger>
        </TabsList>

        {/* Pending Appraisals */}
        <TabsContent value="pending" className="space-y-4">
          {allocatedStudents.length === 0 ? (
            <EmptyState
              icon={ClipboardCheckIcon}
              title="All intern evaluations completed!"
              description="You have submitted appraisals for all current interns."
            />
          ) : (
            allocatedStudents.map((alloc) => (
              <div
                key={alloc.id}
                className="group relative overflow-hidden rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-6 shadow-xl space-y-4 transition-all hover:border-primary/40"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-bold text-foreground">{alloc.studentName}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">Assigned Role: {alloc.internshipTitle}</p>
                  </div>
                  <span className="inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-400 self-start sm:self-center">
                    Pending Mentor Review
                  </span>
                </div>

                {selectedStudent === alloc.id ? (
                  success ? (
                    <div className="flex flex-col items-center gap-2 py-6 text-center">
                      <CheckCircle2Icon className="size-8 text-emerald-400" />
                      <p className="text-sm font-bold text-foreground">Evaluation Saved & Cryptographically Signed!</p>
                      <Button size="sm" variant="outline" className="rounded-xl" onClick={() => setSuccess(false)}>
                        Done
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pt-3 border-t border-border/60">
                      <div className="grid gap-4 sm:grid-cols-2">
                        {[
                          { name: "technicalPerformance" as const, label: "Technical Competence & Problem Solving" },
                          { name: "projectPerformance" as const, label: "Production Project Deliverables" },
                          { name: "communication" as const, label: "Team Collaboration & Communication" },
                          { name: "discipline" as const, label: "Workplace Discipline & Professionalism" },
                          { name: "overallPerformance" as const, label: "Overall Intern Rating" },
                        ].map((f) => (
                          <div key={f.name} className="rounded-xl border border-border/60 bg-muted/20 p-3.5 space-y-2">
                            <Label className="text-xs font-bold text-foreground">{f.label}</Label>
                            <StarRating value={values[f.name]} onChange={(v) => setValue(f.name, v)} />
                            {errors[f.name] && <p className="text-[11px] text-rose-400">Please provide a rating</p>}
                          </div>
                        ))}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="comments" className="text-xs font-bold text-foreground">
                          Mentor Observations & Capstone Assessment
                        </Label>
                        <Textarea
                          id="comments"
                          placeholder="Provide detailed feedback on student achievements, strengths, and recommendations for pre-placement..."
                          {...register("comments")}
                          className="min-h-[100px] rounded-xl bg-background/50 border-border/70"
                        />
                        {errors.comments && <p className="text-xs text-rose-400">{errors.comments.message}</p>}
                      </div>

                      <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-muted/20 p-3.5">
                        <input type="checkbox" id="rec" {...register("wouldRecommend")} className="size-4 accent-primary rounded cursor-pointer" />
                        <Label htmlFor="rec" className="text-xs font-medium cursor-pointer text-foreground">
                          I recommend this student for full-time pre-placement offers (PPO) or advanced roles.
                        </Label>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          type="submit"
                          size="sm"
                          disabled={isSubmitting}
                          className="flex-1 gap-2 rounded-xl font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20"
                        >
                          <SendIcon className="size-3.5" />
                          <span>{isSubmitting ? "Submitting Appraisal…" : "Submit Formal Appraisal"}</span>
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          className="rounded-xl border-border/80"
                          onClick={() => setSelectedStudent(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  )
                ) : (
                  <Button
                    size="sm"
                    className="gap-2 rounded-xl font-semibold bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30"
                    onClick={() => {
                      setSuccess(false);
                      setSelectedStudent(alloc.id);
                    }}
                  >
                    <span>Begin Mentor Appraisal</span>
                  </Button>
                )}
              </div>
            ))
          )}
        </TabsContent>

        {/* Submitted Evaluations */}
        <TabsContent value="submitted" className="space-y-4">
          {submitted.length === 0 ? (
            <EmptyState icon={StarIcon} title="No evaluations logged yet" />
          ) : (
            submitted.map((ev) => (
              <div
                key={ev.id}
                className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-6 shadow-xl space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold text-foreground">{ev.studentName}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{ev.internshipTitle}</p>
                  </div>
                  <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-400">
                    ✓ Completed & Certified
                  </span>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 pt-2">
                  {[
                    { label: "Technical Competence", val: ev.technicalPerformance },
                    { label: "Project Execution", val: ev.projectPerformance },
                    { label: "Team Communication", val: ev.communication },
                    { label: "Workplace Discipline", val: ev.discipline },
                    { label: "Overall Appraisal", val: ev.overallPerformance },
                  ].map((r) => (
                    <div
                      key={r.label}
                      className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/20 p-3 text-xs"
                    >
                      <span className="text-muted-foreground font-medium">{r.label}</span>
                      <StarDisplay value={r.val} />
                    </div>
                  ))}
                </div>

                {ev.comments && (
                  <div className="rounded-xl border border-border/60 bg-muted/20 p-3.5 text-xs text-muted-foreground italic leading-relaxed">
                    "{ev.comments}"
                  </div>
                )}

                <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1">
                  <span>Appraisal Submitted: {formatDateTime(ev.submittedAt)}</span>
                  <span className="text-emerald-400 font-semibold">
                    {ev.wouldRecommend ? "Recommended for Corporate Hiring" : "General Completion"}
                  </span>
                </div>
              </div>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
