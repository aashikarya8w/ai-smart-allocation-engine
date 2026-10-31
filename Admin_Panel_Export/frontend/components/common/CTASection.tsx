import { ArrowRightIcon } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";

export function CTASection() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-primary/20 bg-primary/5 px-8 py-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Ready to find your perfect internship?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Join thousands of students and companies already on the PM
            Internship Scheme. Let AI match you with the right opportunity.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <LinkButton href={ROUTES.register} size="lg" className="gap-2">
              Get Started Free
              <ArrowRightIcon className="size-4" />
            </LinkButton>
            <LinkButton href={ROUTES.login} variant="outline" size="lg">
              Sign In
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
}
