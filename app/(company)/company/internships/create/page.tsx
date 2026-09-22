"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, SaveIcon, SendIcon } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { internshipSchema, type InternshipFormData } from "@/lib/validations";
import { sectors } from "@/data/sectors";
import { INDIAN_STATES, WORK_MODES, DURATION_OPTIONS } from "@/lib/constants";
import { ROUTES } from "@/lib/constants";

export default function CreateInternshipPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [action, setAction] = useState<"draft" | "publish">("publish");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<InternshipFormData>({
    resolver: zodResolver(internshipSchema),
    defaultValues: {
      minimumCGPA: 7.0,
      stipendMin: 10000,
      stipendMax: 20000,
      seats: 2,
      requiredSkills: [],
      eligibleBranches: [],
    },
  });

  async function onSubmit(data: InternshipFormData) {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    router.push(ROUTES.company.internships);
  }

  return (
    <div className="space-y-5 max-w-3xl">
      <PageHeader
        title="Post New Internship"
        description="Fill in the details to create an internship listing."
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Basic Info */}
        <Card>
          <CardHeader><CardTitle className="text-sm">Basic Information</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="title">Job Title *</Label>
              <Input id="title" placeholder="e.g. Full Stack Developer Intern" {...register("title")} aria-invalid={!!errors.title} />
              {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="description">Description *</Label>
              <Textarea id="description" placeholder="Describe the role, responsibilities, and what interns will learn…" rows={5} {...register("description")} aria-invalid={!!errors.description} />
              {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>Sector *</Label>
                <Select onValueChange={(v) => { if (v) setValue("sector", v as string); }}>
                  <SelectTrigger><SelectValue placeholder="Select sector" /></SelectTrigger>
                  <SelectContent>
                    {sectors.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
                {errors.sector && <p className="text-xs text-destructive">{errors.sector.message}</p>}
              </div>

              <div className="space-y-1.5">
                <Label>Work Mode *</Label>
                <Select onValueChange={(v) => v && setValue("workMode", v as "Remote" | "Hybrid" | "On-site")}>
                  <SelectTrigger><SelectValue placeholder="Select mode" /></SelectTrigger>
                  <SelectContent>
                    {WORK_MODES.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Requirements */}
        <Card>
          <CardHeader><CardTitle className="text-sm">Eligibility Requirements</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="qualification">Qualification *</Label>
              <Input id="qualification" placeholder="e.g. B.Tech / B.E." {...register("qualification")} aria-invalid={!!errors.qualification} />
              {errors.qualification && <p className="text-xs text-destructive">{errors.qualification.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="requiredSkills">Required Skills * <span className="text-muted-foreground font-normal">(comma separated)</span></Label>
              <Input id="requiredSkills" placeholder="React, Node.js, MongoDB" onChange={(e) => setValue("requiredSkills", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))} />
              {errors.requiredSkills && <p className="text-xs text-destructive">{errors.requiredSkills.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="eligibleBranches">Eligible Branches * <span className="text-muted-foreground font-normal">(comma separated)</span></Label>
              <Input id="eligibleBranches" placeholder="Computer Science, Information Technology" onChange={(e) => setValue("eligibleBranches", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="minimumCGPA">Minimum CGPA *</Label>
                <Input id="minimumCGPA" type="number" step="0.1" min="0" max="10" defaultValue="7.0"
                  onChange={(e) => setValue("minimumCGPA", parseFloat(e.target.value))} />
              </div>
              <div className="space-y-1.5">
                <Label>Duration *</Label>
                <Select onValueChange={(v) => { if (v) setValue("duration", v as string); }}>
                  <SelectTrigger><SelectValue placeholder="Select duration" /></SelectTrigger>
                  <SelectContent>
                    {DURATION_OPTIONS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location & Compensation */}
        <Card>
          <CardHeader><CardTitle className="text-sm">Location & Compensation</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>State *</Label>
                <Select onValueChange={(v) => { if (v) setValue("state", v as string); }}>
                  <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
                  <SelectContent>
                    {INDIAN_STATES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
                {errors.state && <p className="text-xs text-destructive">{errors.state.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="city">City *</Label>
                <Input id="city" placeholder="e.g. Bengaluru" {...register("city")} aria-invalid={!!errors.city} />
                {errors.city && <p className="text-xs text-destructive">{errors.city.message}</p>}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-1.5">
                <Label htmlFor="stipendMin">Min Stipend (₹)</Label>
                <Input id="stipendMin" type="number" defaultValue="10000" onChange={(e) => setValue("stipendMin", parseInt(e.target.value))} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="stipendMax">Max Stipend (₹)</Label>
                <Input id="stipendMax" type="number" defaultValue="20000" onChange={(e) => setValue("stipendMax", parseInt(e.target.value))} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="seats">Number of Seats *</Label>
                <Input id="seats" type="number" min="1" defaultValue="2" onChange={(e) => setValue("seats", parseInt(e.target.value))} />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="startDate">Start Date *</Label>
                <Input id="startDate" type="date" {...register("startDate")} aria-invalid={!!errors.startDate} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="endDate">End Date *</Label>
                <Input id="endDate" type="date" {...register("endDate")} aria-invalid={!!errors.endDate} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button type="submit" variant="outline" size="sm" className="gap-2"
            onClick={() => setAction("draft")} disabled={submitting}>
            <SaveIcon className="size-4" />
            {submitting && action === "draft" ? "Saving…" : "Save Draft"}
          </Button>
          <Button type="submit" size="sm" className="gap-2"
            onClick={() => setAction("publish")} disabled={submitting}>
            {submitting && action === "publish" ? <Loader2Icon className="size-4 animate-spin" /> : <SendIcon className="size-4" />}
            {submitting && action === "publish" ? "Publishing…" : "Publish Internship"}
          </Button>
        </div>
      </form>
    </div>
  );
}
