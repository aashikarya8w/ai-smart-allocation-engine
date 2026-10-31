"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckIcon, Loader2Icon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { ROLE_HOME } from "@/lib/permissions";
import { cn } from "@/lib/utils";

const STUDENT_STEPS = [
  { id: 1, title: "Personal Info",   description: "Basic details and contact info" },
  { id: 2, title: "Education",       description: "University, branch, and CGPA"  },
  { id: 3, title: "Skills",          description: "Technical and soft skills"      },
  { id: 4, title: "Preferences",     description: "Locations, sectors, work mode" },
  { id: 5, title: "Upload Resume",   description: "PDF resume for AI analysis"    },
];

const COMPANY_STEPS = [
  { id: 1, title: "Company Info",   description: "Name, sector, and description" },
  { id: 2, title: "Contact Details", description: "Address, phone, and website"  },
  { id: 3, title: "Verification",   description: "Upload documents for approval" },
];

export default function OnboardingPage() {
  const router   = useRouter();
  const user     = useAuthStore((s) => s.user);
  const [step, setStep]       = useState(1);
  const [loading, setLoading] = useState(false);

  const steps = user?.role === "company" ? COMPANY_STEPS : STUDENT_STEPS;
  const totalSteps = steps.length;
  const isLast = step === totalSteps;

  async function handleNext() {
    if (isLast) {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 800));
      router.push(user ? ROLE_HOME[user.role] : "/login");
    } else {
      setStep((s) => s + 1);
    }
  }

  return (
    <div className="w-full max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle>Complete your profile</CardTitle>
          <CardDescription>
            Step {step} of {totalSteps} — {steps[step - 1].title}
          </CardDescription>

          {/* Progress */}
          <div className="mt-4 flex gap-1.5">
            {steps.map((s) => (
              <div
                key={s.id}
                className={cn(
                  "h-1.5 flex-1 rounded-full transition-colors",
                  s.id <= step ? "bg-primary" : "bg-muted"
                )}
              />
            ))}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Step list */}
          <ol className="space-y-3">
            {steps.map((s) => (
              <li key={s.id} className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                    s.id < step
                      ? "bg-primary text-primary-foreground"
                      : s.id === step
                        ? "bg-primary/10 text-primary border border-primary"
                        : "bg-muted text-muted-foreground"
                  )}
                >
                  {s.id < step ? <CheckIcon className="size-3.5" /> : s.id}
                </div>
                <div>
                  <p className={cn("text-sm font-medium", s.id === step ? "text-foreground" : "text-muted-foreground")}>
                    {s.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{s.description}</p>
                </div>
              </li>
            ))}
          </ol>

          {/* Placeholder content for current step */}
          <div className="rounded-lg border border-dashed border-border bg-muted/30 px-6 py-8 text-center">
            <p className="text-sm text-muted-foreground">
              {steps[step - 1].description} — fill this in to continue.
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              (Full form in the profile settings after onboarding)
            </p>
          </div>

          <div className="flex items-center justify-between gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
            >
              Back
            </Button>
            <Button size="sm" onClick={handleNext} disabled={loading}>
              {loading && <Loader2Icon className="size-4 animate-spin" />}
              {isLast ? (loading ? "Finishing…" : "Finish Setup") : "Continue"}
            </Button>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            <button
              type="button"
              onClick={() => router.push(user ? ROLE_HOME[user.role] : "/login")}
              className="hover:underline"
            >
              Skip for now
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
