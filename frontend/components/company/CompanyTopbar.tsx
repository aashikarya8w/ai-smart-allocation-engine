"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  SearchIcon,
  XIcon,
  UsersIcon,
  AwardIcon,
  BriefcaseIcon,
  PlusCircleIcon,
  ClipboardListIcon,
  CheckCircle2Icon,
  BarChart3Icon,
  LayoutDashboardIcon,
  BuildingIcon,
  SettingsIcon,
  BellIcon,
  LogOutIcon,
  MenuIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Logo } from "@/components/common/Logo";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { useAuth } from "@/hooks/useAuth";
import { useNotifications } from "@/hooks/useNotifications";
import { initials } from "@/lib/formatters";
import { ROUTES } from "@/lib/constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SearchItem {
  title: string;
  description: string;
  href: string;
  keywords: string[];
  category: "Talent" | "Postings" | "Pipeline" | "Analytics" | "Account";
  icon: React.ElementType;
}

const SEARCH_ITEMS: SearchItem[] = [
  // Talent & Sourcing
  {
    title: "Candidate Search & Discovery",
    description: "Browse verified student pool with AI match fit",
    href: ROUTES.company.candidates,
    keywords: ["candidate", "candidates", "students", "talent", "hire", "search", "student"],
    category: "Talent",
    icon: UsersIcon,
  },
  {
    title: "Candidate Evaluations",
    description: "Score applicants, write feedback & manage ratings",
    href: ROUTES.company.evaluations,
    keywords: ["evaluation", "evaluations", "review", "rating", "feedback", "grade", "score"],
    category: "Talent",
    icon: AwardIcon,
  },

  // Postings & Openings
  {
    title: "Manage Internships",
    description: "Active listings, applicant counts & status",
    href: ROUTES.company.internships,
    keywords: ["internship", "internships", "openings", "postings", "listings", "jobs", "manage"],
    category: "Postings",
    icon: BriefcaseIcon,
  },
  {
    title: "Post New Internship",
    description: "Create AI-assisted job listing with skills & stipend",
    href: ROUTES.company.createInternship,
    keywords: ["create", "post", "new", "publish", "add", "post internship", "job post"],
    category: "Postings",
    icon: PlusCircleIcon,
  },

  // Pipeline & Allocation
  {
    title: "Applicant Pipeline",
    description: "Review incoming resumes, match scores & status",
    href: ROUTES.company.applications,
    keywords: ["application", "applications", "applicants", "applied", "pipeline", "resume", "applicant"],
    category: "Pipeline",
    icon: ClipboardListIcon,
  },
  {
    title: "Seat Allocations",
    description: "Confirmed student allocations & PM scheme quota",
    href: ROUTES.company.allocations,
    keywords: ["allocation", "allocations", "seats", "assigned", "quota", "confirm", "allocated"],
    category: "Pipeline",
    icon: CheckCircle2Icon,
  },

  // Analytics & Insights
  {
    title: "Hiring Analytics & Trends",
    description: "Funnel metrics, diversity stats & hiring speed",
    href: ROUTES.company.analytics,
    keywords: ["analytics", "metrics", "stats", "reports", "insights", "charts", "kpi"],
    category: "Analytics",
    icon: BarChart3Icon,
  },
  {
    title: "Company Dashboard",
    description: "Overview of your corporate internship portal",
    href: ROUTES.company.dashboard,
    keywords: ["dashboard", "home", "overview"],
    category: "Analytics",
    icon: LayoutDashboardIcon,
  },

  // Account & Governance
  {
    title: "Company Profile & KYC",
    description: "Corporate branding, industry sector & GSTIN/CIN",
    href: ROUTES.company.profile,
    keywords: ["profile", "company", "kyc", "gstin", "about", "details"],
    category: "Account",
    icon: BuildingIcon,
  },
  {
    title: "Company Settings",
    description: "Team notifications, security & preferences",
    href: ROUTES.company.settings,
    keywords: ["settings", "preferences", "security", "password", "account"],
    category: "Account",
    icon: SettingsIcon,
  },
  {
    title: "Notifications & Alerts",
    description: "System updates, applicant alerts & reminders",
    href: ROUTES.company.notifications,
    keywords: ["notifications", "alerts", "inbox", "updates", "messages"],
    category: "Account",
    icon: BellIcon,
  },
];

interface CompanyTopbarProps {
  onMenuClick?: () => void;
}

export function CompanyTopbar({ onMenuClick }: CompanyTopbarProps) {
  const { user, signOut } = useAuth();
  const { unreadCount } = useNotifications();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close suggestions when clicked outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter matching items
  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return SEARCH_ITEMS.filter((item) => {
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchKeywords = item.keywords.some((k) => k.toLowerCase().includes(q) || q.includes(k.toLowerCase()));
      return matchTitle || matchDesc || matchKeywords;
    }).slice(0, 6);
  }, [searchQuery]);

  // Execute smart routing
  const navigateTo = (targetHref: string) => {
    setIsOpen(false);
    setSearchQuery("");
    router.push(targetHref);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim().toLowerCase();
    if (!q) return;

    // 1. Direct Page Intent Matching
    const exactMatch = SEARCH_ITEMS.find((item) =>
      item.keywords.some((k) => k.toLowerCase() === q) ||
      item.title.toLowerCase() === q
    );
    if (exactMatch) {
      navigateTo(exactMatch.href);
      return;
    }

    // 2. Partial Page Intent Matching
    const partialMatch = SEARCH_ITEMS.find((item) =>
      item.keywords.some((k) => q.includes(k.toLowerCase()) || k.toLowerCase().includes(q))
    );
    if (partialMatch) {
      navigateTo(partialMatch.href);
      return;
    }

    // 3. Otherwise, search candidate discovery database
    navigateTo(`${ROUTES.company.candidates}?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <header className="relative z-30 flex h-16 items-center justify-between border-b border-border/80 bg-background/85 px-4 sm:px-6 backdrop-blur-xl">
      {/* Left: Menu + Logo + Hub Badge */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuClick} aria-label="Toggle sidebar">
          <MenuIcon className="size-5" />
        </Button>
        <Logo href={ROUTES.company.dashboard} size="sm" />
        <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary shadow-[0_0_10px_var(--theme-glow)]">
          <BuildingIcon className="size-3" />
          Company Hub
        </span>
      </div>

      {/* Middle: Smart Search Bar with Real-time Dropdown */}
      <div ref={containerRef} className="relative hidden md:flex items-center flex-1 max-w-md mx-6">
        <form onSubmit={handleSearch} className="w-full">
          <div className="relative w-full">
            <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder="Search candidates, internships, applicants, analytics... (e.g. 'candidate', 'post')"
              value={searchQuery}
              onFocus={() => setIsOpen(true)}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsOpen(true);
              }}
              onKeyDown={(e) => {
                if (e.key === "Escape") setIsOpen(false);
              }}
              className="w-full h-9 pl-9 pr-8 rounded-xl border border-border/70 bg-card/60 text-xs font-medium text-foreground placeholder:text-muted-foreground/70 transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 dark:bg-white/[0.04] dark:border-white/10"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <XIcon className="size-3.5" />
              </button>
            )}
          </div>
        </form>

        {/* Real-time Search Suggestions Dropdown */}
        {isOpen && searchQuery.trim() && (
          <div className="absolute left-0 right-0 top-full mt-2 rounded-2xl border border-border/90 bg-popover dark:bg-[#0d1220] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.8)] dark:border-white/20 z-[99999] select-none animate-in fade-in-0 duration-150">
            <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground font-mono flex items-center justify-between border-b border-border/50 dark:border-white/10 pb-1 mb-1">
              <span>Corporate Search Results</span>
              <span className="text-[9px] text-primary">Press Enter ↵</span>
            </div>

            {filteredItems.length > 0 ? (
              <div className="space-y-1">
                {filteredItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.href}
                      type="button"
                      onClick={() => navigateTo(item.href)}
                      className="group flex w-full items-center justify-between rounded-xl p-2 text-left transition-all hover:bg-muted dark:hover:bg-white/[0.06] cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="size-8 rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                          <Icon className="size-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-foreground group-hover:text-primary transition-colors truncate">
                            {item.title}
                          </p>
                          <p className="text-[10px] text-muted-foreground truncate">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-muted/60 text-muted-foreground uppercase shrink-0 dark:bg-white/[0.04]">
                        {item.category}
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="p-3 text-center">
                <p className="text-xs text-muted-foreground">
                  No matching tools found for &quot;<span className="font-semibold text-foreground">{searchQuery}</span>&quot;
                </p>
                <button
                  type="button"
                  onClick={() => navigateTo(`${ROUTES.company.candidates}?q=${encodeURIComponent(searchQuery.trim())}`)}
                  className="mt-2 text-xs font-bold text-primary hover:underline"
                >
                  Search Candidates for &quot;{searchQuery}&quot; →
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right: Actions + Profile */}
      <div className="flex items-center gap-2">
        <ThemeToggle />

        <div className="relative">
          <Button variant="ghost" size="icon" aria-label="Notifications" className="rounded-lg">
            <Link href={ROUTES.company.notifications} className="flex items-center justify-center">
              <BellIcon className="size-4" />
            </Link>
          </Button>
          {unreadCount > 0 && (
            <span className="pointer-events-none absolute right-1.5 top-1.5 flex size-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground shadow-[0_0_8px_var(--theme-glow)]">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button
                className="flex size-9 items-center justify-center rounded-full outline-none ring-1 ring-border/80 hover:ring-primary/50 transition-all"
                aria-label="User menu"
              />
            }
          >
            <Avatar className="size-8 pointer-events-none">
              <AvatarFallback className="text-xs font-bold bg-primary/15 text-primary">
                {user ? initials(user.name) : "C"}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52 rounded-2xl border-border/80 bg-popover/95 p-1 backdrop-blur-xl">
            <div className="px-3 py-2.5">
              <p className="text-xs font-bold text-foreground truncate">{user?.name}</p>
              <p className="text-[11px] text-muted-foreground truncate">{user?.email}</p>
              <span className="mt-1 inline-block rounded-full bg-primary/10 px-2 py-0.2 text-[10px] font-bold text-primary">
                Company Partner
              </span>
            </div>
            <DropdownMenuSeparator className="bg-border/60" />
            <DropdownMenuItem render={<Link href={ROUTES.company.profile} className="flex items-center gap-2 text-xs" />}>
              <BuildingIcon className="size-4 text-primary" />Company Profile
            </DropdownMenuItem>
            <DropdownMenuItem render={<Link href={ROUTES.company.settings} className="flex items-center gap-2 text-xs" />}>
              <SettingsIcon className="size-4 text-primary" />Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border/60" />
            <DropdownMenuItem onClick={signOut} className="text-destructive focus:text-destructive flex items-center gap-2 text-xs font-semibold cursor-pointer">
              <LogOutIcon className="size-4" />Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
