"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboardIcon,
  BuildingIcon,
  BriefcaseIcon,
  ClipboardListIcon,
  UsersIcon,
  AwardIcon,
  BarChart3Icon,
  BellIcon,
  SettingsIcon,
  StarIcon,
  BotIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";
import { useNotifications } from "@/hooks/useNotifications";

const NAV = [
  { href: ROUTES.company.dashboard,    label: "Dashboard",    icon: LayoutDashboardIcon },
  { href: ROUTES.company.profile,      label: "Profile",      icon: BuildingIcon        },
  { href: ROUTES.company.internships,  label: "Internships",  icon: BriefcaseIcon       },
  { href: ROUTES.company.applications, label: "Applications", icon: ClipboardListIcon   },
  { href: ROUTES.company.candidates,   label: "Candidates",   icon: UsersIcon           },
  { href: ROUTES.company.allocations,  label: "Allocations",  icon: AwardIcon           },
  { href: ROUTES.company.evaluations,  label: "Evaluations",  icon: StarIcon            },
  { href: ROUTES.company.analytics,    label: "Analytics",    icon: BarChart3Icon       },
  { href: ROUTES.company.notifications,label: "Notifications",icon: BellIcon            },
  { href: ROUTES.company.settings,     label: "Settings",     icon: SettingsIcon        },
];

export function CompanySidebar() {
  const pathname = usePathname();
  const { unreadCount } = useNotifications();

  return (
    <aside className="flex h-full w-60 flex-col border-r border-sidebar-border bg-sidebar/95 backdrop-blur-xl transition-all">
      <div className="px-5 py-3 border-b border-sidebar-border/40">
        <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-sidebar-foreground/50">
          Company Workspace
        </p>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-3">
        {NAV.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold transition-all duration-200",
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
      </nav>

      {/* AI Hiring Copilot Widget */}
      <div className="p-3 border-t border-sidebar-border/50">
        <Link
          href={ROUTES.company.candidates}
          className="group relative flex items-center gap-3 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent p-3 shadow-[0_0_20px_var(--theme-glow)] transition-all hover:scale-[1.02] hover:border-primary/60"
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-[0_0_12px_var(--theme-glow)] group-hover:scale-105 transition-transform">
            <BotIcon className="size-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-foreground group-hover:text-primary transition-colors truncate">
              AI Hiring Copilot
            </p>
            <p className="text-[10px] text-muted-foreground truncate">
              Smart candidate & JD help
            </p>
          </div>
        </Link>
      </div>
    </aside>
  );
}
