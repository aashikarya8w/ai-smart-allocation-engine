import { GraduationCapIcon, BuildingIcon, ShieldIcon, ArrowRightIcon } from "lucide-react";
import Link from "next/link";
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
      "AI Match Score & Recommendations",
      "Online Skill Assessments",
      "Dynamic Readiness Twin",
      "Skill Gap & Career Roadmap",
    ],
    borderAccent: "hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]",
    iconColor: "from-blue-500 to-indigo-600",
  },
  {
    icon: BuildingIcon,
    title: "For Companies",
    description:
      "Post internship openings, receive AI-ranked candidate matches, manage applications, and track your allocation pipeline.",
    href: ROUTES.register,
    cta: "Register your Company",
    highlights: [
      "AI-Matched & Ranked Candidates",
      "Seat Constraint & Quota Pipeline",
      "Verified Student Profiles",
      "Real-time Outcome Analytics",
    ],
    borderAccent: "hover:border-orange-500/50 hover:shadow-[0_0_30px_rgba(249,115,22,0.2)]",
    iconColor: "from-orange-500 to-amber-600",
  },
  {
    icon: ShieldIcon,
    title: "For Admins",
    description:
      "Oversee the entire scheme — verify companies, approve internships, run AI matching, manage allocations, and generate reports.",
    href: ROUTES.login,
    cta: "Admin Portal",
    highlights: [
      "Smart Allocation Engine",
      "Affirmative Action Quota Rules",
      "Capacity Stress Simulator",
      "Immutable Audit Logs & Reports",
    ],
    borderAccent: "hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]",
    iconColor: "from-purple-500 to-pink-600",
  },
];

export function RoleCardsSection() {
  return (
    <section id="portals" className="relative bg-[#07090e] py-24 sm:py-32 border-b border-white/[0.06] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-orange-400">
            Portals & Access
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            One platform, three dedicated portals
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            Tailored interfaces engineered for each stakeholder in the PM Internship ecosystem.
          </p>
        </div>

        {/* 3 Cyber Glass Cards */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ROLES.map((role) => (
            <div
              key={role.title}
              className={`flex flex-col justify-between rounded-3xl border border-white/10 bg-[#0c101c]/80 p-7 backdrop-blur-xl transition-all duration-300 ${role.borderAccent}`}
            >
              <div>
                <div
                  className={`mb-5 flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br ${role.iconColor} text-white shadow-lg`}
                >
                  <role.icon className="size-6" />
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  {role.title}
                </h3>
                <p className="mt-2.5 text-sm text-slate-400 leading-relaxed">
                  {role.description}
                </p>
                
                <ul className="mt-5 space-y-2 border-t border-white/10 pt-4">
                  {role.highlights.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-slate-300">
                      <span className="size-1.5 shrink-0 rounded-full bg-orange-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4">
                <Link
                  href={role.href}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 py-2.5 text-xs font-bold text-white transition-all hover:bg-white/10 hover:border-white/30"
                >
                  <span>{role.cta}</span>
                  <ArrowRightIcon className="size-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
