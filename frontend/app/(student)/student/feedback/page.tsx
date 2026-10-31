"use client";

import { useState } from "react";
import {
  StarIcon,
  CheckCircle2Icon,
  MessageSquareIcon,
  SparklesIcon,
  Building2Icon,
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
import { EmptyState } from "@/components/common/EmptyState";
import { mockStudentFeedback } from "@/data/evaluations";
import { useStudent } from "@/hooks/useStudent";
import { formatDateTime } from "@/lib/formatters";

const schema = z.object({
  learningExperience: z.number().min(1).max(5),
  mentorship: z.number().min(1).max(5),
  workEnvironment: z.number().min(1).max(5),
  overallExperience: z.number().min(1).max(5),
  suggestions: z.string().min(10, "Please provide at least 10 characters"),
  wouldRecommend: z.boolean(),
});
type FeedbackForm = z.infer<typeof schema>;

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex gap-1.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className={`transition-all hover:scale-110 ${
            star <= value ? "text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" : "text-muted-foreground/30 hover:text-amber-400/50"
          }`}
        >
          <StarIcon className="size-6 fill-current" />
        </button>
      ))}
    </div>
  );
}

const RATING_LABEL = ["", "Needs Improvement", "Fair", "Good", "Very Good", "Exceptional"];

export default function FeedbackPage() {
  const { student, activeAllocation } = useStudent();
  const existing = mockStudentFeedback.filter((f) => f.studentId === student?.id);
  const [submitted, setSubmitted] = useState(false);

  const {
    handleSubmit,
    watch,
    setValue,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FeedbackForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      learningExperience: 0,
      mentorship: 0,
      workEnvironment: 0,
      overallExperience: 0,
      suggestions: "",
      wouldRecommend: true,
    },
  });

  const values = watch();

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 700));
    setSubmitted(true);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Internship Review & Feedback"
        description="Submit transparent evaluations regarding your mentorship, workplace culture, and learning curve."
      />

      {/* Cyber Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent p-6 shadow-xl shadow-primary/5 backdrop-blur-md">
        <div className="absolute -right-10 -top-10 size-48 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-md">
              <MessageSquareIcon className="size-3.5 text-primary" />
              <span>National Employer Accountability Index</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Empowering Future Interns with Verified Reviews
            </h2>
            <p className="max-w-2xl text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Your evaluations contribute to corporate partner accreditation ratings, AICTE compliance audits, and future batch recommendation weightings.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-400">
              <CheckCircle2Icon className="size-3.5" />
              Anonymous & Confidential
            </span>
          </div>
        </div>
      </div>

      {/* Past Submitted Feedback */}
      {existing.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-foreground tracking-tight">
            Your Previous Reviews ({existing.length})
          </h3>

          {existing.map((fb) => (
            <div
              key={fb.id}
              className="relative overflow-hidden rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-6 shadow-xl space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-foreground">{fb.internshipTitle}</h4>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <Building2Icon className="size-3.5 text-primary" />
                    <span>{fb.companyName}</span>
                  </p>
                </div>
                <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/15 px-3 py-0.5 text-xs font-semibold text-emerald-400">
                  Verified Review
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 pt-2">
                {[
                  { label: "Learning Experience", val: fb.learningExperience },
                  { label: "Mentorship Quality", val: fb.mentorship },
                  { label: "Workplace Culture", val: fb.workEnvironment },
                  { label: "Overall Satisfaction", val: fb.overallExperience },
                ].map((r) => (
                  <div
                    key={r.label}
                    className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/20 p-3 text-xs"
                  >
                    <span className="text-muted-foreground font-medium">{r.label}</span>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5 text-amber-400">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <StarIcon
                            key={s}
                            className={`size-3.5 fill-current ${
                              s <= r.val ? "text-amber-400" : "text-muted-foreground/20"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-foreground font-bold">{RATING_LABEL[r.val]}</span>
                    </div>
                  </div>
                ))}
              </div>

              {fb.suggestions && (
                <div className="rounded-xl border border-border/60 bg-muted/30 p-3.5 text-xs text-muted-foreground italic">
                  "{fb.suggestions}"
                </div>
              )}

              <p className="text-[11px] text-muted-foreground">
                Recorded on {formatDateTime(fb.submittedAt)}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Submit New Feedback Form */}
      {submitted ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-12 text-center backdrop-blur-md space-y-4">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/20">
            <CheckCircle2Icon className="size-8" />
          </div>
          <h3 className="text-xl font-bold text-foreground">Feedback Recorded Successfully!</h3>
          <p className="text-xs text-muted-foreground max-w-md">
            Thank you for reviewing your internship experience. Your honest evaluation helps our AI accurately benchmark host companies.
          </p>
          <Button
            variant="outline"
            className="rounded-xl font-semibold border-border/80 hover:bg-muted/50"
            onClick={() => setSubmitted(false)}
          >
            Submit Another Review
          </Button>
        </div>
      ) : !activeAllocation ? (
        <EmptyState
          icon={MessageSquareIcon}
          title="No active internship to evaluate"
          description="You will be prompted to submit feedback once you complete your active corporate allotment."
        />
      ) : (
        <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-6 shadow-xl space-y-6">
          <div className="border-b border-border/60 pb-3">
            <h3 className="text-base font-bold text-foreground">Submit Workplace Feedback</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Host Placement: <strong className="text-foreground">{activeAllocation.internshipTitle}</strong> at {activeAllocation.companyName}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-5 sm:grid-cols-2">
              {[
                { name: "learningExperience" as const, label: "Technical Learning & Project Impact" },
                { name: "mentorship" as const, label: "Mentorship & Supervisor Guidance" },
                { name: "workEnvironment" as const, label: "Workplace Safety & Team Culture" },
                { name: "overallExperience" as const, label: "Overall Internship Experience" },
              ].map((field) => (
                <div key={field.name} className="rounded-xl border border-border/60 bg-muted/20 p-4 space-y-2">
                  <Label className="text-xs font-bold text-foreground">{field.label}</Label>
                  <div className="flex items-center justify-between pt-1">
                    <StarRating value={values[field.name]} onChange={(v) => setValue(field.name, v)} />
                    {values[field.name] > 0 && (
                      <span className="rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-xs font-semibold text-amber-400">
                        {RATING_LABEL[values[field.name]]}
                      </span>
                    )}
                  </div>
                  {errors[field.name] && (
                    <p className="text-[11px] text-rose-400">Please provide a rating</p>
                  )}
                </div>
              ))}
            </div>

            {/* Suggestions */}
            <div className="space-y-2">
              <Label htmlFor="suggestions" className="text-xs font-bold text-foreground">
                Detailed Comments & Recommendations
              </Label>
              <Textarea
                id="suggestions"
                placeholder="Share your highlights, constructive suggestions for the team, or advice for future interns..."
                className="min-h-[110px] rounded-xl bg-background/50 border-border/70"
                {...register("suggestions")}
              />
              {errors.suggestions && (
                <p className="text-xs text-rose-400">{errors.suggestions.message}</p>
              )}
            </div>

            {/* Recommendation Checkbox */}
            <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-muted/20 p-3.5">
              <input
                type="checkbox"
                id="recommend"
                {...register("wouldRecommend")}
                className="size-4 accent-primary rounded cursor-pointer"
              />
              <Label htmlFor="recommend" className="text-xs font-medium cursor-pointer text-foreground">
                I would wholeheartedly recommend this internship program to future engineering students.
              </Label>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full gap-2 rounded-xl font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20 py-2.5"
            >
              <SendIcon className="size-4" />
              <span>{isSubmitting ? "Submitting Evaluation…" : "Submit Official Review"}</span>
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
