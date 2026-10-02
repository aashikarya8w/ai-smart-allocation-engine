import {
  BrainCircuitIcon, BarChart3Icon, ShieldCheckIcon, ZapIcon,
  TrendingUpIcon, TargetIcon, FlaskConicalIcon, ScaleIcon,
  RefreshCwIcon, ArrowLeftRightIcon, ActivityIcon, QrCodeIcon,
  StarIcon, MapIcon, ClipboardCheckIcon, BookOpenIcon,
  AwardIcon, LineChartIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const FEATURES = [
  {
    icon: BrainCircuitIcon,
    title: "AI Skill Matching",
    description: "Multi-factor matching across skills, education, CGPA, projects, experience, interests, location and preferences with detailed score breakdown.",
    category: "Core",
  },
  {
    icon: ClipboardCheckIcon,
    title: "Online Skill Assessment",
    description: "Internship-specific MCQ/true-false assessments with timer, progress tracking, auto-grading and detailed result review.",
    category: "Core",
  },
  {
    icon: TrendingUpIcon,
    title: "Skill Gap Analysis",
    description: "Compare your skills against internship requirements. Identify missing skills and get learning resource recommendations.",
    category: "Student",
  },
  {
    icon: TargetIcon,
    title: "Job Suitability Score",
    description: "A comprehensive score separate from match score, combining skills, assessment, CGPA, projects, experience and preferences.",
    category: "Student",
  },
  {
    icon: FlaskConicalIcon,
    title: "Readiness Twin",
    description: "Dynamic simulation of your internship readiness with an action-by-action improvement roadmap showing projected impact.",
    category: "Student",
  },
  {
    icon: ZapIcon,
    title: "What-If Simulator",
    description: "Temporarily simulate profile changes — add skills, improve assessment score or CGPA — to see how it affects your opportunities.",
    category: "Student",
  },
  {
    icon: MapIcon,
    title: "Career Roadmap",
    description: "Personalised step-by-step roadmap from current profile to internship readiness with skill gap tracking and progress.",
    category: "Student",
  },
  {
    icon: ScaleIcon,
    title: "Fair Allocation Engine",
    description: "Smart seat-constrained allocation using eligibility, suitability, assessment, preferences, and predefined rules — never arbitrary.",
    category: "Allocation",
  },
  {
    icon: BarChart3Icon,
    title: "Fairness Dashboard",
    description: "Transparent metrics: suitability distribution, preference satisfaction, seat utilisation, tie cases, and rule violation tracking.",
    category: "Allocation",
  },
  {
    icon: BookOpenIcon,
    title: "Explainable Decisions",
    description: "Every allocation result includes a clear explanation — why allocated, why waitlisted, or why not allocated.",
    category: "Allocation",
  },
  {
    icon: RefreshCwIcon,
    title: "Smart Re-Allocation",
    description: "Automatic reallocation trigger on seat vacancy, rejection or cancellation — recalculates suitability and recommends replacement.",
    category: "Allocation",
  },
  {
    icon: ArrowLeftRightIcon,
    title: "Internship Swap Engine",
    description: "Post-allocation swap system that validates eligibility, suitability and constraints for both students before admin approval.",
    category: "Allocation",
  },
  {
    icon: LineChartIcon,
    title: "Capacity Stress Simulator",
    description: "Admin planning tool to simulate high-demand, seat-reduction or company-growth scenarios without affecting live data.",
    category: "Admin",
  },
  {
    icon: QrCodeIcon,
    title: "Identity Verification",
    description: "Frontend prototypes for QR, RFID, fingerprint and face verification — designed for real hardware integration later.",
    category: "Verification",
  },
  {
    icon: ActivityIcon,
    title: "Smart Check-In",
    description: "Internship joining check-in with verification method tracking, timestamp recording and status monitoring.",
    category: "Verification",
  },
  {
    icon: StarIcon,
    title: "Evaluation & Feedback",
    description: "Company evaluates intern performance. Student provides feedback. Both combined into an Internship Outcome Profile.",
    category: "Outcome",
  },
  {
    icon: AwardIcon,
    title: "Performance Insights",
    description: "Post-internship analytics combining evaluation, feedback, skill growth and project outcomes with future recommendations.",
    category: "Outcome",
  },
  {
    icon: ShieldCheckIcon,
    title: "Admin Analytics",
    description: "Comprehensive admin dashboards with time-series charts, sector analysis, skill demand, state distribution and audit logs.",
    category: "Admin",
  },
];

const CATEGORY_COLOR: Record<string, string> = {
  Core:         "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
  Student:      "bg-blue-100   text-blue-700   dark:bg-blue-900/30   dark:text-blue-300",
  Allocation:   "bg-green-100  text-green-700  dark:bg-green-900/30  dark:text-green-300",
  Verification: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  Outcome:      "bg-amber-100  text-amber-700  dark:bg-amber-900/30  dark:text-amber-300",
  Admin:        "bg-rose-100   text-rose-700   dark:bg-rose-900/30   dark:text-rose-300",
};

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Features</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Complete Internship Lifecycle Platform
          </h2>
          <p className="mt-4 text-muted-foreground">
            From profile to placement — every step of the internship lifecycle covered with AI-powered tools,
            fair allocation, and transparent decisions.
          </p>
        </div>

        {/* Category legend */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {Object.entries(CATEGORY_COLOR).map(([cat, cls]) => (
            <span key={cat} className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${cls}`}>
              {cat}
            </span>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <Card key={feature.title} className="group transition-all hover:shadow-md hover:border-primary/30">
              <CardContent className="p-5">
                <div className="mb-3 flex items-start justify-between gap-2">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                    <feature.icon className="size-4" />
                  </div>
                  <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${CATEGORY_COLOR[feature.category]}`}>
                    {feature.category}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
