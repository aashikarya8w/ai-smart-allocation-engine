import {
  BrainCircuitIcon,
  BarChart3Icon,
  ShieldCheckIcon,
  UsersIcon,
  BuildingIcon,
  ZapIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const FEATURES = [
  {
    icon: BrainCircuitIcon,
    title: "AI Skill Matching",
    description:
      "Intelligent matching engine scores students against internship requirements across skills, qualifications, location, and preferences.",
  },
  {
    icon: BarChart3Icon,
    title: "Smart Allocation",
    description:
      "Automated allocation engine optimises seat utilisation, minimises conflicts, and maximises overall match scores across all students.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Government Verified",
    description:
      "Companies and internships go through a rigorous verification process ensuring only legitimate opportunities are listed.",
  },
  {
    icon: UsersIcon,
    title: "Student Profiles",
    description:
      "Rich student profiles with education, skills, interests, and preferences to power accurate AI matching and recommendations.",
  },
  {
    icon: BuildingIcon,
    title: "Company Portal",
    description:
      "Dedicated portal for companies to post internships, manage applications, review AI-matched candidates, and track allocations.",
  },
  {
    icon: ZapIcon,
    title: "Real-time Analytics",
    description:
      "Comprehensive dashboards with allocation rates, skill demand charts, state-wise distributions, and trend analysis.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Features
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need for smart internship allocation
          </h2>
          <p className="mt-4 text-muted-foreground">
            Built specifically for the PM Internship Scheme with AI-driven
            matching and transparent allocation.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <Card key={feature.title} className="transition-shadow hover:shadow-md">
              <CardContent className="p-6">
                <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <feature.icon className="size-5" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
