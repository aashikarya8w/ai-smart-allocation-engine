"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboardIcon, UsersIcon, BuildingIcon, BriefcaseIcon,
  ClipboardListIcon, BrainCircuitIcon, AwardIcon, SlidersIcon,
  TagIcon, MapPinIcon, BarChart3Icon, BellIcon, ScrollTextIcon,
  FileTextIcon, ShieldIcon, SettingsIcon, GraduationCapIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";

const NAV_GROUPS = [
  {
    label: "Overview",
    items: [
      { href: ROUTES.admin.dashboard,  label: "Dashboard",   icon: LayoutDashboardIcon },
    ],
  },
  {
    label: "Management",
    items: [
      { href: ROUTES.admin.students,   label: "Students",    icon: GraduationCapIcon   },
      { href: ROUTES.admin.companies,  label: "Companies",   icon: BuildingIcon        },
      { href: ROUTES.admin.internships,label: "Internships", icon: BriefcaseIcon       },
      { href: ROUTES.admin.applications,label:"Applications",icon: ClipboardListIcon   },
    ],
  },
  {
    label: "AI Engine",
    items: [
      { href: ROUTES.admin.aiMatching, label: "AI Matching", icon: BrainCircuitIcon    },
      { href: ROUTES.admin.allocations,label: "Allocations", icon: AwardIcon           },
      { href: ROUTES.admin.rules,      label: "Rules",       icon: SlidersIcon         },
    ],
  },
  {
    label: "Configuration",
    items: [
      { href: ROUTES.admin.skills,     label: "Skills",      icon: TagIcon             },
      { href: ROUTES.admin.sectors,    label: "Sectors",     icon: TagIcon             },
      { href: ROUTES.admin.locations,  label: "Locations",   icon: MapPinIcon          },
    ],
  },
  {
    label: "Reports",
    items: [
      { href: ROUTES.admin.analytics,  label: "Analytics",   icon: BarChart3Icon       },
      { href: ROUTES.admin.reports,    label: "Reports",     icon: FileTextIcon        },
      { href: ROUTES.admin.auditLogs,  label: "Audit Logs",  icon: ScrollTextIcon      },
    ],
  },
  {
    label: "System",
    items: [
      { href: ROUTES.admin.notifications, label: "Notifications", icon: BellIcon      },
      { href: ROUTES.admin.administrators,label: "Admins",        icon: ShieldIcon     },
      { href: ROUTES.admin.settings,   label: "Settings",    icon: SettingsIcon        },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-60 flex-col border-r border-sidebar-border bg-sidebar">
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-4">
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
                    <span className="truncate">{item.label}</span>
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
