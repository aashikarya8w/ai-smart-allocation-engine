"use client";

import { useState } from "react";
import { StarIcon, CheckCircleIcon, ClipboardCheckIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  projectPerformance:   z.number().min(1).max(5),
  communication:        z.number().min(1).max(5),
  discipline:           z.number().min(1).max(5),
  overallPerformance:   z.number().min(1).max(5),
  comments:             z.string().min(10, "Please add at least 10 characters"),
  wouldRecommend:       z.boolean(),
});
type EvalForm = z.infer<typeof schema>;

const RATING_LABEL = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1,2,3,4,5].map((s) => (
        <button key={s} type="button" onClick={() => onChange(s)}
          className={`transition-colors ${s <= value ? "text-amber-400" : "text-muted-foreground/30"}`}
        >
          <StarIcon className="size-6 fill-current" />
        </button>
      ))}
      {value > 0 && (
        <span className="ml-2 text-xs text-muted-foreground self-center">{RATING_LABEL[value]}</span>
      )}
    </div>
  );
}

function StarDisplay({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1,2,3,4,5].map((s) => (
        <StarIcon key={s} className={`size-3.5 fill-current ${s <= value ? "text-amber-400" : "text-muted-foreground/20"}`} />
      ))}
      <span className="ml-1 text-xs text-foreground font-medium">{value}/5</span>
    </div>
  );
}

export default function CompanyEvaluationsPage() {
  const { company } = useCompany();
  const submitted  = mockCompanyEvaluations.filter((e) => e.companyId === company?.id);
  const [success, setSuccess] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

  // Find allocations for this company that have no evaluation yet
  const allocatedStudents = mockAllocations
    .filter((a) => a.companyId === company?.id && a.status === "Approved")
    .filter((a) => !submitted.some((e) => e.allocationId === a.id));

  const { handleSubmit, watch, setValue, register, reset, formState: { errors, isSubmitting } } = useForm<EvalForm>({
    resolver: zodResolver(schema),
    defaultValues: { technicalPerformance:0, projectPerformance:0, communication:0, discipline:0, overallPerformance:0, comments:"", wouldRecommend:true },
  });

  const values = watch();

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 800));
    setSuccess(true);
    setSelectedStudent(null);
    reset();
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Intern Evaluations"
        description="Evaluate your interns after the internship to help improve future allocations."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard title="Submitted"       value={submitted.length}        icon={CheckCircleIcon}   trend="up"      />
        <StatCard title="Pending"         value={allocatedStudents.length} icon={ClipboardCheckIcon} trend="neutral" />
        <StatCard title="Total Interns"   value={submitted.length + allocatedStudents.length} icon={StarIcon} trend="up" />
      </div>

      <Tabs defaultValue={allocatedStudents.length > 0 ? "pending" : "submitted"}>
        <TabsList>
          <TabsTrigger value="pending">Pending ({allocatedStudents.length})</TabsTrigger>
          <TabsTrigger value="submitted">Submitted ({submitted.length})</TabsTrigger>
        </TabsList>

        {/* Pending evaluations */}
        <TabsContent value="pending" className="pt-4 space-y-4">
          {allocatedStudents.length === 0 ? (
            <EmptyState icon={ClipboardCheckIcon} title="No pending evaluations" description="All interns have been evaluated." />
          ) : (
            allocatedStudents.map((alloc) => (
              <Card key={alloc.id}>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-foreground">{alloc.studentName}</p>
                      <p className="text-sm text-muted-foreground">{alloc.internshipTitle}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs shrink-0">Pending Evaluation</Badge>
                  </div>

                  {selectedStudent === alloc.id ? (
                    // Inline form
                    success ? (
                      <div className="flex flex-col items-center gap-2 py-6">
                        <CheckCircleIcon className="size-8 text-green-500" />
                        <p className="text-sm font-semibold">Evaluation Submitted!</p>
                        <Button size="sm" variant="outline" onClick={() => setSuccess(false)}>Done</Button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2 border-t border-border">
                        {[
                          { name: "technicalPerformance" as const, label: "Technical Performance" },
                          { name: "projectPerformance"   as const, label: "Project Performance"   },
                          { name: "communication"        as const, label: "Communication"         },
                          { name: "discipline"           as const, label: "Discipline"            },
                          { name: "overallPerformance"   as const, label: "Overall Performance"   },
                        ].map((f) => (
                          <div key={f.name} className="space-y-1">
                            <Label className="text-xs">{f.label}</Label>
                            <StarRating value={values[f.name]} onChange={(v) => setValue(f.name, v)} />
                            {errors[f.name] && <p className="text-xs text-destructive">Please rate this</p>}
                          </div>
                        ))}
                        <div className="space-y-1">
                          <Label htmlFor="comments" className="text-xs">Comments</Label>
                          <Textarea id="comments" placeholder="Share your observations..." {...register("comments")} className="min-h-[80px]" />
                          {errors.comments && <p className="text-xs text-destructive">{errors.comments.message}</p>}
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="checkbox" id="rec" {...register("wouldRecommend")} className="size-4" />
                          <Label htmlFor="rec" className="text-xs cursor-pointer">I would recommend this student for future opportunities</Label>
                        </div>
                        <div className="flex gap-2">
                          <Button type="submit" size="sm" disabled={isSubmitting} className="flex-1">
                            {isSubmitting ? "Submitting..." : "Submit Evaluation"}
                          </Button>
                          <Button type="button" size="sm" variant="outline" onClick={() => setSelectedStudent(null)}>Cancel</Button>
                        </div>
                      </form>
                    )
                  ) : (
                    <Button size="sm" variant="outline" onClick={() => { setSuccess(false); setSelectedStudent(alloc.id); }}>
                      Start Evaluation
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Submitted evaluations */}
        <TabsContent value="submitted" className="pt-4 space-y-4">
          {submitted.length === 0 ? (
            <EmptyState icon={StarIcon} title="No evaluations submitted yet" />
          ) : (
            submitted.map((ev) => (
              <Card key={ev.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <CardTitle className="text-sm">{ev.studentName}</CardTitle>
                      <p className="text-xs text-muted-foreground">{ev.internshipTitle}</p>
                    </div>
                    <Badge variant={ev.wouldRecommend ? "default" : "secondary"} className="text-xs shrink-0">
                      {ev.wouldRecommend ? "Recommended" : "Not Recommended"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <StarDisplay value={ev.technicalPerformance} />
                  {[
                    { label: "Technical",   val: ev.technicalPerformance },
                    { label: "Projects",    val: ev.projectPerformance   },
                    { label: "Communication", val: ev.communication      },
                    { label: "Discipline",  val: ev.discipline           },
                    { label: "Overall",     val: ev.overallPerformance   },
                  ].map((r) => (
                    <div key={r.label} className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{r.label}</span>
                      <StarDisplay value={r.val} />
                    </div>
                  ))}
                  {ev.comments && (
                    <div className="mt-2 rounded-lg bg-muted/50 p-3">
                      <p className="text-xs italic text-muted-foreground">"{ev.comments}"</p>
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground">Submitted {formatDateTime(ev.submittedAt)}</p>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
