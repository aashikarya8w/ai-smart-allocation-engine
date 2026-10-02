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
    label: "Analysis",
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
      { href: ROUTES.student.checkIn,         label: "Check-In",         icon: QrCodeIcon          },
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
    <aside className="flex h-full w-56 flex-col border-r border-sidebar-border bg-sidebar">
      <nav className="flex-1 space-y-4 overflow-y-auto px-2 py-3">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            <p className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/40">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const active = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
                      active
                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                    )}
                  >
                    <item.icon className="size-4 shrink-0" />
                    <span className="flex-1 truncate">{item.label}</span>
                    {item.label === "Notifications" && unreadCount > 0 && (
                      <span className="flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
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
    </aside>
  );
}
