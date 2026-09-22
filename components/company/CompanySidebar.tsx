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
  { href: ROUTES.company.analytics,    label: "Analytics",    icon: BarChart3Icon       },
  { href: ROUTES.company.notifications,label: "Notifications",icon: BellIcon            },
  { href: ROUTES.company.settings,     label: "Settings",     icon: SettingsIcon        },
];

export function CompanySidebar() {
  const pathname = usePathname();
  const { unreadCount } = useNotifications();

  return (
    <aside className="flex h-full w-56 flex-col border-r border-sidebar-border bg-sidebar">
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-2 py-3">
        {NAV.map((item) => {
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
      </nav>
    </aside>
  );
}
