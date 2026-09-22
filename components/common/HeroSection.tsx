import { ArrowRightIcon, SparklesIcon } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { ROUTES, SCHEME_NAME, SCHEME_CODE } from "@/lib/constants";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28 lg:py-36">
      {/* Subtle background */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">

          {/* Badge */}
          <div className="mb-6 flex justify-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <SparklesIcon className="size-3" />
              {SCHEME_CODE} · Smart India Hackathon 2025
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            AI-Powered Internship
            <span className="block text-primary">Allocation Engine</span>
          </h1>

          {/* Sub-headline */}
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Connecting students with the right internship opportunities through
            intelligent skill matching, qualification scoring, and smart
            allocation for the{" "}
            <strong className="text-foreground">{SCHEME_NAME}</strong>.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <LinkButton href={ROUTES.register} size="lg" className="gap-2">
              Apply as Student
              <ArrowRightIcon className="size-4" />
            </LinkButton>
            <LinkButton href={ROUTES.register} variant="outline" size="lg">
              Register your Company
            </LinkButton>
          </div>

          {/* Trust signals */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
            {[
              "10,000+ Students Matched",
              "500+ Companies Onboarded",
              "95% Allocation Accuracy",
              "Government Initiative",
            ].map((item) => (
              <div key={item} className="flex items-center gap-1.5">
                <div className="size-1.5 rounded-full bg-primary" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
