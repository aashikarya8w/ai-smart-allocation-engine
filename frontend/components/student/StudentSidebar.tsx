"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboardIcon,
  UserIcon,
  FileTextIcon,
  BriefcaseIcon,
  SparklesIcon,
  ClipboardListIcon,
  AwardIcon,
  BellIcon,
  BookmarkIcon,
  TrendingUpIcon,
  MapIcon,
  SettingsIcon,
  TargetIcon,
  FlaskConicalIcon,
  ZapIcon,
  ClipboardCheckIcon,
  QrCodeIcon,
  StarIcon,
  BarChart3Icon,
  BotIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";
import { useNotifications } from "@/hooks/useNotifications";

const NAV_GROUPS = [
  {
    label: "Overview",
    items: [
      { href: ROUTES.student.dashboard,       label: "Dashboard",        icon: LayoutDashboardIcon },
      { href: ROUTES.student.profile,         label: "Profile",          icon: UserIcon            },
      { href: ROUTES.student.resume,          label: "Resume",           icon: FileTextIcon        },
    ],
  },
  {
    label: "Internships",
    items: [
      { href: ROUTES.student.internships,     label: "Internships",      icon: BriefcaseIcon       },
      { href: ROUTES.student.recommendations, label: "Recommendations",  icon: SparklesIcon        },
      { href: ROUTES.student.saved,           label: "Saved",            icon: BookmarkIcon        },
      { href: ROUTES.student.applications,    label: "Applications",     icon: ClipboardListIcon   },
      { href: ROUTES.student.allocations,     label: "My Allocation",    icon: AwardIcon           },
    ],
  },
  {
    label: "Analysis & Tools",
    items: [
      { href: ROUTES.student.skillGap,        label: "Skill Gap",        icon: TrendingUpIcon      },
      { href: ROUTES.student.suitability,     label: "Job Suitability",  icon: TargetIcon          },
      { href: ROUTES.student.readiness,       label: "Readiness Twin",   icon: FlaskConicalIcon    },
      { href: ROUTES.student.whatIf,          label: "What-If Simulator",icon: ZapIcon             },
      { href: ROUTES.student.careerRoadmap,   label: "Career Roadmap",   icon: MapIcon             },
    ],
  },
  {
    label: "Activities",
    items: [
      { href: ROUTES.student.assessments,     label: "Assessments",      icon: ClipboardCheckIcon  },
      { href: ROUTES.student.checkIn,         label: "Check-In (QR)",    icon: QrCodeIcon          },
      { href: ROUTES.student.feedback,        label: "Feedback",         icon: StarIcon            },
      { href: ROUTES.student.outcomes,        label: "Performance",      icon: BarChart3Icon       },
    ],
  },
  {
    label: "Account",
    items: [
      { href: ROUTES.student.notifications,   label: "Notifications",    icon: BellIcon            },
      { href: ROUTES.student.settings,        label: "Settings",         icon: SettingsIcon        },
    ],
  },
];

export function StudentSidebar() {
  const pathname = usePathname();
  const { unreadCount } = useNotifications();

  return (
    <aside className="flex h-full w-60 flex-col border-r border-sidebar-border bg-sidebar/95 backdrop-blur-xl transition-all">
      <nav className="flex-1 space-y-4 overflow-y-auto px-3 py-4">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            <p className="mb-1.5 px-3 text-[10px] font-bold uppercase tracking-widest text-sidebar-foreground/40 font-mono">
              {group.label}
            </p>
            <div className="space-y-1">
              {group.items.map((item) => {
                const active = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold transition-all duration-200 relative",
                      active
                        ? "bg-primary/15 text-primary border border-primary/25 shadow-[0_0_15px_var(--theme-glow)] font-bold"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                    )}
                  >
                    <item.icon className={cn("size-4 shrink-0 transition-transform group-hover:scale-110", active && "text-primary")} />
                    <span className="flex-1 truncate">{item.label}</span>
                    {item.label === "Notifications" && unreadCount > 0 && (
                      <span className="flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shadow-[0_0_8px_var(--theme-glow)]">
                        {unreadCount > 9 ? "9+" : unreadCount}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* AI Career Assistant Widget (Matching Reference Image 2) */}
      <div className="p-3 border-t border-sidebar-border/50">
        <Link
          href={ROUTES.student.recommendations}
          className="group relative flex items-center gap-3 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent p-3 shadow-[0_0_20px_var(--theme-glow)] transition-all hover:scale-[1.02] hover:border-primary/60"
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-[0_0_12px_var(--theme-glow)] group-hover:scale-105 transition-transform">
            <BotIcon className="size-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-foreground group-hover:text-primary transition-colors truncate">
              AI Career Assistant
            </p>
            <p className="text-[10px] text-muted-foreground truncate">
              Get personalized help
            </p>
          </div>
        </Link>
      </div>
    </aside>
  );
}
