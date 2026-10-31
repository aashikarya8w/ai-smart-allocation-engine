"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Loader2Icon,
  SaveIcon,
  SendIcon,
  Building2Icon,
  SparklesIcon,
  BriefcaseIcon,
  MapPinIcon,
  IndianRupeeIcon,
  UsersIcon,
  CalendarIcon
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { internshipSchema, type InternshipFormData } from "@/lib/validations";
import { sectors } from "@/data/sectors";
import { INDIAN_STATES, WORK_MODES, DURATION_OPTIONS, ROUTES } from "@/lib/constants";

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
      stipendMin: 15000,
      stipendMax: 25000,
      seats: 3,
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
    <div className="space-y-6 max-w-4xl">
      <PageHeader
        title="Post Corporate Internship"
        description="Configure role requirements, affirmative action quotas, and verified stipend packages."
      />

      {/* Cyber Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent p-6 shadow-xl shadow-primary/5 backdrop-blur-md">
        <div className="absolute -right-10 -top-10 size-48 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-md">
              <Building2Icon className="size-3.5 text-primary" />
              <span>Enterprise Talent Inflow Configurator</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Define Role Specifications for AI Matching
            </h2>
            <p className="max-w-2xl text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Once published, InternAI's Gale-Shapley matching engine begins vector-scoring applicant profiles to deliver high-affinity student recommendations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-400">
              <SparklesIcon className="size-3.5" />
              Instant Portal Broadcast
            </span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Info */}
        <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 border-b border-border/60 pb-3">
            <BriefcaseIcon className="size-4 text-primary" />
            <h3 className="text-sm font-bold text-foreground">Position Overview</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="title" className="text-xs font-semibold text-muted-foreground">
                Internship Title *
              </Label>
              <Input
                id="title"
                placeholder="e.g. Cloud Architecture & DevOps Intern"
                className="rounded-xl bg-background/50 border-border/70"
                {...register("title")}
              />
              {errors.title && <p className="text-xs text-rose-400">{errors.title.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="description" className="text-xs font-semibold text-muted-foreground">
                Job Description & Learning Outcomes *
              </Label>
              <Textarea
                id="description"
                placeholder="Describe project responsibilities, technologies used, mentorship milestones, and what interns will build…"
                rows={5}
                className="rounded-xl bg-background/50 border-border/70 min-h-[110px]"
                {...register("description")}
              />
              {errors.description && <p className="text-xs text-rose-400">{errors.description.message}</p>}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-muted-foreground">Industry Sector *</Label>
                <Select onValueChange={(v) => { if (v) setValue("sector", v as string); }}>
                  <SelectTrigger className="rounded-xl bg-background/50 border-border/70">
                    <SelectValue placeholder="Select sector" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {sectors.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
                {errors.sector && <p className="text-xs text-rose-400">{errors.sector.message}</p>}
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-muted-foreground">Workplace Model *</Label>
                <Select onValueChange={(v) => v && setValue("workMode", v as "Remote" | "Hybrid" | "On-site")}>
                  <SelectTrigger className="rounded-xl bg-background/50 border-border/70">
                    <SelectValue placeholder="Select work mode" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {WORK_MODES.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Eligibility Requirements */}
        <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 border-b border-border/60 pb-3">
            <SparklesIcon className="size-4 text-primary" />
            <h3 className="text-sm font-bold text-foreground">Candidate Eligibility & Skills</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="qualification" className="text-xs font-semibold text-muted-foreground">
                Minimum Degree Level *
              </Label>
              <Input
                id="qualification"
                placeholder="e.g. B.Tech / B.E. / M.Tech"
                className="rounded-xl bg-background/50 border-border/70"
                {...register("qualification")}
              />
              {errors.qualification && <p className="text-xs text-rose-400">{errors.qualification.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="requiredSkills" className="text-xs font-semibold text-muted-foreground">
                Required Technical Skills (comma separated) *
              </Label>
              <Input
                id="requiredSkills"
                placeholder="React, TypeScript, AWS, Docker, Node.js"
                className="rounded-xl bg-background/50 border-border/70"
                onChange={(e) =>
                  setValue(
                    "requiredSkills",
                    e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                  )
                }
              />
              {errors.requiredSkills && <p className="text-xs text-rose-400">{errors.requiredSkills.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="eligibleBranches" className="text-xs font-semibold text-muted-foreground">
                Eligible Academic Branches (comma separated) *
              </Label>
              <Input
                id="eligibleBranches"
                placeholder="Computer Science, Information Technology, AI/ML"
                className="rounded-xl bg-background/50 border-border/70"
                onChange={(e) =>
                  setValue(
                    "eligibleBranches",
                    e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                  )
                }
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="minimumCGPA" className="text-xs font-semibold text-muted-foreground">
                  Minimum Academic CGPA *
                </Label>
                <Input
                  id="minimumCGPA"
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  defaultValue="7.0"
                  className="rounded-xl bg-background/50 border-border/70"
                  onChange={(e) => setValue("minimumCGPA", parseFloat(e.target.value))}
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-muted-foreground">Tenure Duration *</Label>
                <Select onValueChange={(v) => { if (v) setValue("duration", v as string); }}>
                  <SelectTrigger className="rounded-xl bg-background/50 border-border/70">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {DURATION_OPTIONS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Location & Compensation */}
        <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 border-b border-border/60 pb-3">
            <IndianRupeeIcon className="size-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-foreground">Location & Monthly Stipend</h3>
          </div>

          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-muted-foreground">State / Region *</Label>
                <Select onValueChange={(v) => { if (v) setValue("state", v as string); }}>
                  <SelectTrigger className="rounded-xl bg-background/50 border-border/70">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {INDIAN_STATES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
                {errors.state && <p className="text-xs text-rose-400">{errors.state.message}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="city" className="text-xs font-semibold text-muted-foreground">City *</Label>
                <Input
                  id="city"
                  placeholder="e.g. Bengaluru"
                  className="rounded-xl bg-background/50 border-border/70"
                  {...register("city")}
                />
                {errors.city && <p className="text-xs text-rose-400">{errors.city.message}</p>}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-1.5">
                <Label htmlFor="stipendMin" className="text-xs font-semibold text-muted-foreground">Min Stipend (₹/mo)</Label>
                <Input
                  id="stipendMin"
                  type="number"
                  defaultValue="15000"
                  className="rounded-xl bg-background/50 border-border/70"
                  onChange={(e) => setValue("stipendMin", parseInt(e.target.value))}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="stipendMax" className="text-xs font-semibold text-muted-foreground">Max Stipend (₹/mo)</Label>
                <Input
                  id="stipendMax"
                  type="number"
                  defaultValue="25000"
                  className="rounded-xl bg-background/50 border-border/70"
                  onChange={(e) => setValue("stipendMax", parseInt(e.target.value))}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="seats" className="text-xs font-semibold text-muted-foreground">Open Capacity (Seats) *</Label>
                <Input
                  id="seats"
                  type="number"
                  min="1"
                  defaultValue="3"
                  className="rounded-xl bg-background/50 border-border/70"
                  onChange={(e) => setValue("seats", parseInt(e.target.value))}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="startDate" className="text-xs font-semibold text-muted-foreground">Internship Start Date *</Label>
                <Input id="startDate" type="date" className="rounded-xl bg-background/50 border-border/70" {...register("startDate")} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="endDate" className="text-xs font-semibold text-muted-foreground">Internship End Date *</Label>
                <Input id="endDate" type="date" className="rounded-xl bg-background/50 border-border/70" {...register("endDate")} />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <Button
            type="submit"
            variant="outline"
            size="sm"
            className="gap-2 rounded-xl border-border/80 hover:bg-muted/50"
            onClick={() => setAction("draft")}
            disabled={submitting}
          >
            <SaveIcon className="size-4" />
            <span>{submitting && action === "draft" ? "Saving…" : "Save Draft"}</span>
          </Button>

          <Button
            type="submit"
            size="sm"
            className="gap-2 rounded-xl font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20 py-2.5 px-5"
            onClick={() => setAction("publish")}
            disabled={submitting}
          >
            {submitting && action === "publish" ? <Loader2Icon className="size-4 animate-spin" /> : <SendIcon className="size-4" />}
            <span>{submitting && action === "publish" ? "Publishing Position…" : "Publish Internship Listing"}</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
