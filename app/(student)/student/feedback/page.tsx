"use client";

import { useState } from "react";
import { StarIcon, CheckCircleIcon, MessageSquareIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  mentorship:         z.number().min(1).max(5),
  workEnvironment:    z.number().min(1).max(5),
  overallExperience:  z.number().min(1).max(5),
  suggestions:        z.string().min(10, "Please provide at least 10 characters"),
  wouldRecommend:     z.boolean(),
});
type FeedbackForm = z.infer<typeof schema>;

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className={`transition-colors ${star <= value ? "text-amber-400" : "text-muted-foreground/30"}`}
        >
          <StarIcon className="size-6 fill-current" />
        </button>
      ))}
    </div>
  );
}

const RATING_LABEL = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

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
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Internship Feedback"
        description="Share your experience to help improve future internship programs."
      />

      {/* Past feedback */}
      {existing.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-foreground">Submitted Feedback</h2>
          {existing.map((fb) => (
            <Card key={fb.id}>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-foreground">{fb.internshipTitle}</p>
                    <p className="text-sm text-muted-foreground">{fb.companyName}</p>
                  </div>
                  <Badge variant="default" className="text-xs">Submitted</Badge>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {[
                    { label: "Learning Experience", val: fb.learningExperience },
                    { label: "Mentorship",           val: fb.mentorship },
                    { label: "Work Environment",     val: fb.workEnvironment },
                    { label: "Overall Experience",   val: fb.overallExperience },
                  ].map((r) => (
                    <div key={r.label} className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{r.label}</span>
                      <div className="flex items-center gap-1">
                        <div className="flex gap-0.5">
                          {[1,2,3,4,5].map((s) => (
                            <StarIcon key={s} className={`size-3.5 fill-current ${s <= r.val ? "text-amber-400" : "text-muted-foreground/20"}`} />
                          ))}
                        </div>
                        <span className="text-foreground font-medium">{RATING_LABEL[r.val]}</span>
                      </div>
                    </div>
                  ))}
                </div>
                {fb.suggestions && (
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-xs text-muted-foreground">"{fb.suggestions}"</p>
                  </div>
                )}
                <p className="text-xs text-muted-foreground">Submitted {formatDateTime(fb.submittedAt)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Submit new feedback */}
      {submitted ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-4 py-12">
            <CheckCircleIcon className="size-12 text-green-500" />
            <p className="text-lg font-semibold text-foreground">Feedback Submitted!</p>
            <p className="text-sm text-center text-muted-foreground">
              Thank you for your feedback. It helps us improve future internship programs.
            </p>
            <Button variant="outline" onClick={() => setSubmitted(false)}>Submit Another</Button>
          </CardContent>
        </Card>
      ) : !activeAllocation ? (
        <EmptyState
          icon={MessageSquareIcon}
          title="No active internship"
          description="You can submit feedback after completing an internship."
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Submit Internship Feedback</CardTitle>
            <p className="text-xs text-muted-foreground">
              For: {activeAllocation.internshipTitle} · {activeAllocation.companyName}
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Ratings */}
              {[
                { name: "learningExperience" as const, label: "Learning Experience" },
                { name: "mentorship"         as const, label: "Mentorship Quality"  },
                { name: "workEnvironment"    as const, label: "Work Environment"    },
                { name: "overallExperience"  as const, label: "Overall Experience"  },
              ].map((field) => (
                <div key={field.name} className="space-y-1.5">
                  <Label className="text-sm">{field.label}</Label>
                  <div className="flex items-center gap-3">
                    <StarRating
                      value={values[field.name]}
                      onChange={(v) => setValue(field.name, v)}
                    />
                    {values[field.name] > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        {RATING_LABEL[values[field.name]]}
                      </Badge>
                    )}
                  </div>
                  {errors[field.name] && (
                    <p className="text-xs text-destructive">Please rate this category</p>
                  )}
                </div>
              ))}

              {/* Suggestions */}
              <div className="space-y-1.5">
                <Label htmlFor="suggestions" className="text-sm">Suggestions & Comments</Label>
                <Textarea
                  id="suggestions"
                  placeholder="Share your experience, what you learned, and any suggestions for improvement..."
                  className="min-h-[100px]"
                  {...register("suggestions")}
                />
                {errors.suggestions && (
                  <p className="text-xs text-destructive">{errors.suggestions.message}</p>
                )}
              </div>

              {/* Would Recommend */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="recommend"
                  {...register("wouldRecommend")}
                  className="size-4"
                />
                <Label htmlFor="recommend" className="text-sm cursor-pointer">
                  I would recommend this internship to other students
                </Label>
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Submitting..." : "Submit Feedback"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
