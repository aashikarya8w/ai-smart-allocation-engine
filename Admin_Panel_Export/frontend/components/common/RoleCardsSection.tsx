import { GraduationCapIcon, BuildingIcon, ShieldIcon, ArrowRightIcon } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ROUTES } from "@/lib/constants";

const ROLES = [
  {
    icon: GraduationCapIcon,
    title: "For Students",
    description:
      "Create your profile, get AI-powered internship recommendations, track applications, and receive smart allocations based on your skills.",
    href: ROUTES.register,
    cta: "Register as Student",
    highlights: [
      "AI Match Score",
      "Personalised Recommendations",
      "Resume Analysis",
      "Skill Gap Insights",
    ],
  },
  {
    icon: BuildingIcon,
    title: "For Companies",
    description:
      "Post internship openings, receive AI-ranked candidate matches, manage applications, and track your allocation pipeline.",
    href: ROUTES.register,
    cta: "Register your Company",
    highlights: [
      "AI-Matched Candidates",
      "Application Management",
      "Analytics Dashboard",
      "Verified Students",
    ],
  },
  {
    icon: ShieldIcon,
    title: "For Admins",
    description:
      "Oversee the entire scheme — verify companies, approve internships, run AI matching, manage allocations, and generate reports.",
    href: ROUTES.login,
    cta: "Admin Portal",
    highlights: [
      "AI Matching Engine",
      "Smart Allocation",
      "Audit Logs",
      "Comprehensive Reports",
    ],
  },
];

export function RoleCardsSection() {
  return (
    <section id="about" className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Who it&apos;s for
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            One platform, three portals
          </h2>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ROLES.map((role) => (
            <Card key={role.title} className="flex flex-col transition-shadow hover:shadow-md">
              <CardContent className="flex flex-1 flex-col p-6">
                <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <role.icon className="size-6" />
                </div>
                <h3 className="text-base font-semibold text-foreground">
                  {role.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground leading-relaxed">
                  {role.description}
                </p>
                <ul className="mt-4 space-y-1.5">
                  {role.highlights.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="size-1.5 shrink-0 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <LinkButton
                    href={role.href}
                    variant="outline"
                    size="sm"
                    className="w-full gap-2"
                  >
                    {role.cta}
                    <ArrowRightIcon className="size-3.5" />
                  </LinkButton>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
