const STEPS = [
  {
    step: "01",
    role: "Student",
    title: "Create your profile",
    description:
      "Register, complete your academic profile, upload your resume, and set your skill set, preferred sectors, and locations.",
  },
  {
    step: "02",
    role: "Company",
    title: "Post internship openings",
    description:
      "Companies register, get verified, and post internship listings with required skills, eligibility criteria, and seat count.",
  },
  {
    step: "03",
    role: "AI Engine",
    title: "AI matches students",
    description:
      "Our matching engine scores every eligible student against every internship using skill, qualification, location, and interest weights.",
  },
  {
    step: "04",
    role: "Admin",
    title: "Smart allocation runs",
    description:
      "The allocation engine assigns students to internships optimally, resolving conflicts and maximising overall placement rate.",
  },
  {
    step: "05",
    role: "Student",
    title: "Receive allocation",
    description:
      "Allocated students receive a notification, can view their match score breakdown, and download their allocation letter.",
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="border-y border-border/50 bg-muted/30 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            How it Works
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            From registration to allocation in 5 steps
          </h2>
        </div>

        {/* Steps */}
        <div className="mt-16 space-y-8">
          {STEPS.map((step, i) => (
            <div
              key={step.step}
              className="flex gap-6 rounded-xl border border-border/50 bg-card p-6"
            >
              {/* Step number */}
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm">
                {step.step}
              </div>
              {/* Content */}
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                    {step.role}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
              {/* Connector (not on last) */}
              {i < STEPS.length - 1 && (
                <div className="absolute hidden" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
