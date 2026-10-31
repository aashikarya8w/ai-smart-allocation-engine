"use client";

import Link from "next/link";
import { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  BellIcon,
  LogOutIcon,
  MenuIcon,
  UserIcon,
  SettingsIcon,
  GraduationCapIcon,
  SearchIcon,
  ChevronDownIcon,
  TrendingUpIcon,
  TargetIcon,
  FlaskConicalIcon,
  ZapIcon,
  MapIcon,
  FileTextIcon,
  LayoutDashboardIcon,
  BriefcaseIcon,
  SparklesIcon,
  BookmarkIcon,
  ClipboardListIcon,
  AwardIcon,
  ClipboardCheckIcon,
  QrCodeIcon,
  StarIcon,
  BarChart3Icon,
  ArrowRightIcon,
  XIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Logo } from "@/components/common/Logo";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { useAuth } from "@/hooks/useAuth";
import { useNotifications } from "@/hooks/useNotifications";
import { initials } from "@/lib/formatters";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
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
  category: "Tools" | "Overview" | "Internships" | "Activities" | "Account";
  icon: React.ElementType;
}

const SEARCH_ITEMS: SearchItem[] = [
  // Analysis & Tools
  {
    title: "Skill Gap Analysis",
    description: "Identify missing skills & course roadmap",
    href: ROUTES.student.skillGap,
    keywords: ["skill", "gap", "skills", "skill gap", "course", "learn"],
    category: "Tools",
    icon: TrendingUpIcon,
  },
  {
    title: "Job Suitability Evaluator",
    description: "Placement probability & eligibility match",
    href: ROUTES.student.suitability,
    keywords: ["suitability", "fit", "match", "score", "eligible", "job"],
    category: "Tools",
    icon: TargetIcon,
  },
  {
    title: "Readiness Digital Twin",
    description: "Multi-dimensional candidate profile",
    href: ROUTES.student.readiness,
    keywords: ["readiness", "twin", "digital twin", "progress", "twin hub"],
    category: "Tools",
    icon: FlaskConicalIcon,
  },
  {
    title: "What-If Scenario Simulator",
    description: "Simulate score improvements before courses",
    href: ROUTES.student.whatIf,
    keywords: ["what if", "simulator", "whatif", "simulate", "forecast"],
    category: "Tools",
    icon: ZapIcon,
  },
  {
    title: "AI Career Roadmap",
    description: "Step-by-step career milestones & badges",
    href: ROUTES.student.careerRoadmap,
    keywords: ["roadmap", "career", "path", "pathway", "milestones"],
    category: "Tools",
    icon: MapIcon,
  },

  // Overview & Documents
  {
    title: "Resume & ATS Builder",
    description: "View and edit your resume, projects & certifications",
    href: ROUTES.student.resume,
    keywords: ["resume", "cv", "ats", "bio", "experience"],
    category: "Overview",
    icon: FileTextIcon,
  },
  {
    title: "Student Profile",
    description: "Personal details, CGPA & preferences",
    href: ROUTES.student.profile,
    keywords: ["profile", "account", "details", "contact", "cgpa"],
    category: "Overview",
    icon: UserIcon,
  },
  {
    title: "Student Dashboard",
    description: "Overview of your application pipeline & scores",
    href: ROUTES.student.dashboard,
    keywords: ["dashboard", "home", "overview", "stats"],
    category: "Overview",
    icon: LayoutDashboardIcon,
  },

  // Internships & Applications
  {
    title: "Browse Internships",
    description: "Explore all corporate & government postings",
    href: ROUTES.student.internships,
    keywords: ["internship", "internships", "jobs", "openings", "browse"],
    category: "Internships",
    icon: BriefcaseIcon,
  },
  {
    title: "AI Recommendations",
    description: "Personalized openings ranked by match score",
    href: ROUTES.student.recommendations,
    keywords: ["recommendation", "recommendations", "recommended", "ai match"],
    category: "Internships",
    icon: SparklesIcon,
  },
  {
    title: "Saved Internships",
    description: "Bookmarked opportunities to apply to",
    href: ROUTES.student.saved,
    keywords: ["saved", "bookmark", "bookmarks", "favorites", "wishlist"],
    category: "Internships",
    icon: BookmarkIcon,
  },
  {
    title: "My Applications",
    description: "Track status of submitted applications",
    href: ROUTES.student.applications,
    keywords: ["application", "applications", "applied", "status", "shortlisted"],
    category: "Internships",
    icon: ClipboardListIcon,
  },
  {
    title: "My Allocation",
    description: "View allocated internship & reporting offer",
    href: ROUTES.student.allocations,
    keywords: ["allocation", "allocations", "allocated", "offer", "letter"],
    category: "Internships",
    icon: AwardIcon,
  },

  // Activities
  {
    title: "Assessments & Tests",
    description: "Take skill tests & certification quizzes",
    href: ROUTES.student.assessments,
    keywords: ["assessment", "assessments", "test", "tests", "exam", "quiz"],
    category: "Activities",
    icon: ClipboardCheckIcon,
  },
  {
    title: "Smart Check-In (QR)",
    description: "GPS & QR verification for attendance",
    href: ROUTES.student.checkIn,
    keywords: ["check-in", "check in", "checkin", "qr", "attendance", "gps"],
    category: "Activities",
    icon: QrCodeIcon,
  },
  {
    title: "Feedback & Reviews",
    description: "Submit feedback and view company ratings",
    href: ROUTES.student.feedback,
    keywords: ["feedback", "review", "rating", "survey"],
    category: "Activities",
    icon: StarIcon,
  },
  {
    title: "Internship Outcomes",
    description: "Performance metrics & certificate",
    href: ROUTES.student.outcomes,
    keywords: ["performance", "outcome", "outcomes", "certificate"],
    category: "Activities",
    icon: BarChart3Icon,
  },

  // Account
  {
    title: "Notifications",
    description: "Shortlist alerts & match updates",
    href: ROUTES.student.notifications,
    keywords: ["notification", "notifications", "alerts", "bell"],
    category: "Account",
    icon: BellIcon,
  },
  {
    title: "Account Settings",
    description: "Password & notification preferences",
    href: ROUTES.student.settings,
    keywords: ["settings", "setting", "password", "security"],
    category: "Account",
    icon: SettingsIcon,
  },
];

interface StudentTopbarProps {
  onMenuClick?: () => void;
}

export function StudentTopbar({ onMenuClick }: StudentTopbarProps) {
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

    // 3. Otherwise, search internships database
    navigateTo(`${ROUTES.student.internships}?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <header className="relative z-30 flex h-16 items-center justify-between border-b border-border/80 bg-background/85 px-4 sm:px-6 backdrop-blur-xl">
      {/* Left: Hamburger + Logo + Badge */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
          aria-label="Toggle sidebar"
        >
          <MenuIcon className="size-5" />
        </Button>
        <Logo href={ROUTES.student.dashboard} size="sm" />
        <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary shadow-[0_0_10px_var(--theme-glow)]">
          <GraduationCapIcon className="size-3" />
          Student Portal
        </span>
      </div>

      {/* Middle: Intelligent Smart Search Bar with Real-time Dropdown */}
      <div ref={containerRef} className="relative hidden md:flex items-center flex-1 max-w-md mx-6">
        <form onSubmit={handleSearch} className="w-full">
          <div className="relative w-full">
            <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder="Search tools, skills, resume, internships... (e.g. 'skill', 'resume')"
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
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
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
              <span>Smart Search Results</span>
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

                {/* Option to search internships directly */}
                <button
                  type="button"
                  onClick={() => navigateTo(`${ROUTES.student.internships}?q=${encodeURIComponent(searchQuery.trim())}`)}
                  className="flex w-full items-center justify-between rounded-xl border border-dashed border-border/70 p-2 text-left hover:border-primary/50 hover:bg-primary/5 transition-all text-xs text-primary font-semibold cursor-pointer mt-1"
                >
                  <span className="flex items-center gap-2">
                    <BriefcaseIcon className="size-4" />
                    <span>Search all internships matching &quot;{searchQuery}&quot;</span>
                  </span>
                  <ArrowRightIcon className="size-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => navigateTo(`${ROUTES.student.internships}?q=${encodeURIComponent(searchQuery.trim())}`)}
                className="flex w-full items-center justify-between rounded-xl p-2.5 text-left hover:bg-muted dark:hover:bg-white/[0.06] transition-all text-xs text-foreground cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <BriefcaseIcon className="size-4 text-primary" />
                  <span>Search internships for &quot;{searchQuery}&quot;</span>
                </div>
                <ArrowRightIcon className="size-3.5 text-muted-foreground" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Right: Theme Toggle + Bell + User Info Card */}
      <div className="flex items-center gap-2.5">
        <ThemeToggle />

        {/* Notifications bell */}
        <div className="relative">
          <Button variant="ghost" size="icon" aria-label="Notifications" className="rounded-xl border border-border/60 dark:border-white/10 dark:bg-white/[0.03]">
            <Link href={ROUTES.student.notifications} className="flex items-center justify-center">
              <BellIcon className="size-4" />
            </Link>
          </Button>
          {unreadCount > 0 && (
            <span className="pointer-events-none absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground shadow-[0_0_8px_var(--theme-glow)]">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </div>

        {/* User profile dropdown (Matching Reference Image 2 with name + role) */}
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button
                className="flex items-center gap-2.5 rounded-xl border border-border/70 bg-card/60 py-1 px-2 text-left outline-none hover:border-primary/50 transition-all dark:bg-white/[0.04] dark:border-white/10 cursor-pointer"
                aria-label="User menu"
              />
            }
          >
            <Avatar className="size-8 pointer-events-none ring-1 ring-primary/30">
              <AvatarFallback className="text-xs font-bold bg-gradient-to-br from-primary to-orange-500 text-white shadow-sm">
                {user ? initials(user.name) : "A"}
              </AvatarFallback>
            </Avatar>
            <div className="hidden xl:block min-w-0 pr-1">
              <p className="text-xs font-bold text-foreground leading-tight truncate">
                {user?.name || "Aarav Sharma"}
              </p>
              <p className="text-[10px] text-muted-foreground font-medium uppercase font-mono">
                Student
              </p>
            </div>
            <ChevronDownIcon className="size-3 text-muted-foreground hidden xl:block" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-2xl border-border/80 bg-popover dark:bg-[#0d1220] p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.7)] dark:border-white/20 z-[99999]">
            <div className="px-3 py-2.5">
              <p className="text-xs font-bold text-foreground truncate">{user?.name || "Aarav Sharma"}</p>
              <p className="text-[11px] text-muted-foreground truncate">{user?.email || "student@internai.gov.in"}</p>
              <span className="mt-1 inline-block rounded-full bg-primary/10 border border-primary/25 px-2 py-0.5 text-[10px] font-bold text-primary">
                Student Candidate
              </span>
            </div>
            <DropdownMenuSeparator className="bg-border/60 dark:bg-white/10" />
            <DropdownMenuItem render={<Link href={ROUTES.student.profile} className="flex items-center gap-2 text-xs" />}>
              <UserIcon className="size-4 text-primary" />
              My Profile
            </DropdownMenuItem>
            <DropdownMenuItem render={<Link href={ROUTES.student.settings} className="flex items-center gap-2 text-xs" />}>
              <SettingsIcon className="size-4 text-primary" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border/60 dark:bg-white/10" />
            <DropdownMenuItem
              onClick={signOut}
              className="text-destructive focus:text-destructive flex items-center gap-2 text-xs font-semibold cursor-pointer"
            >
              <LogOutIcon className="size-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
