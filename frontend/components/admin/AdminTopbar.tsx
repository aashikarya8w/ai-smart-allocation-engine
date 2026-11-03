"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  SearchIcon,
  XIcon,
  SparklesIcon,
  TargetIcon,
  CheckCircle2Icon,
  RefreshCwIcon,
  ArrowLeftRightIcon,
  GraduationCapIcon,
  ShieldCheckIcon,
  BuildingIcon,
  BriefcaseIcon,
  ClockIcon,
  ScaleIcon,
  LayersIcon,
  MapPinIcon,
  Building2Icon,
  CpuIcon,
  ShieldAlertIcon,
  BarChart3Icon,
  TrendingUpIcon,
  QrCodeIcon,
  FileTextIcon,
  DownloadIcon,
  LayoutDashboardIcon,
  UserCogIcon,
  SettingsIcon,
  BellIcon,
  LogOutIcon,
  MenuIcon,
  ShieldIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Logo } from "@/components/common/Logo";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { useAuth } from "@/hooks/useAuth";
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
  category: "Allocation" | "Directory" | "Governance" | "Analytics" | "System";
  icon: React.ElementType;
}

const SEARCH_ITEMS: SearchItem[] = [
  // Allocation Engine
  {
    title: "Run AI Allocation Engine",
    description: "Execute Gale-Shapley matching with fairness constraints",
    href: ROUTES.admin.aiMatchingRun,
    keywords: ["ai", "matching", "engine", "run", "algorithm", "allocate", "match"],
    category: "Allocation",
    icon: SparklesIcon,
  },
  {
    title: "AI Matching Results",
    description: "Inspection matrix, score distributions & optimality",
    href: ROUTES.admin.aiMatchingResults,
    keywords: ["results", "matches", "scores", "matrix", "breakdown"],
    category: "Allocation",
    icon: TargetIcon,
  },
  {
    title: "Master Allocation Roster",
    description: "All assigned seats, corporate ties & student placements",
    href: ROUTES.admin.allocations,
    keywords: ["allocation", "allocations", "roster", "seats", "assigned", "placements"],
    category: "Allocation",
    icon: CheckCircle2Icon,
  },
  {
    title: "Reallocation Manager",
    description: "Handle unallocated candidates & vacant corporate seats",
    href: ROUTES.admin.reallocation,
    keywords: ["reallocation", "reassign", "transfer", "vacant", "unallocated"],
    category: "Allocation",
    icon: RefreshCwIcon,
  },
  {
    title: "Mutual Student Swaps",
    description: "Approve or audit mutual exchange requests between students",
    href: ROUTES.admin.swaps,
    keywords: ["swap", "swaps", "exchange", "mutual", "switch"],
    category: "Allocation",
    icon: ArrowLeftRightIcon,
  },

  // Directory & Verification
  {
    title: "Students Directory",
    description: "National database of registered student applicants",
    href: ROUTES.admin.students,
    keywords: ["student", "students", "candidates", "directory", "records"],
    category: "Directory",
    icon: GraduationCapIcon,
  },
  {
    title: "Student Verification Queue",
    description: "Academic & identity documents verification",
    href: ROUTES.admin.studentVerification,
    keywords: ["verify student", "student verification", "documents", "kyc student"],
    category: "Directory",
    icon: ShieldCheckIcon,
  },
  {
    title: "Corporate Directory",
    description: "Partner companies, corporate intake & industry records",
    href: ROUTES.admin.companies,
    keywords: ["company", "companies", "corporate", "partners", "firms"],
    category: "Directory",
    icon: BuildingIcon,
  },
  {
    title: "Corporate Verification Queue",
    description: "Verify GSTIN, CIN & corporate eligibility under PM scheme",
    href: ROUTES.admin.companyVerification,
    keywords: ["verify company", "company verification", "kyc company", "gstin"],
    category: "Directory",
    icon: ShieldCheckIcon,
  },
  {
    title: "All Internships Catalog",
    description: "Active, pending & completed internship openings",
    href: ROUTES.admin.internships,
    keywords: ["internships", "openings", "postings", "jobs", "catalog"],
    category: "Directory",
    icon: BriefcaseIcon,
  },
  {
    title: "Pending Internships Approval",
    description: "Corporate listings awaiting ministry/admin approval",
    href: ROUTES.admin.internshipsPending,
    keywords: ["pending", "approval", "approve internships", "review job"],
    category: "Directory",
    icon: ClockIcon,
  },

  // Governance & Rules
  {
    title: "Quota & Fairness Rules",
    description: "Reservation quotas, regional caps & equity constraints",
    href: ROUTES.admin.rules,
    keywords: ["rules", "quota", "reservation", "fairness", "policy", "constraints"],
    category: "Governance",
    icon: ScaleIcon,
  },
  {
    title: "Seat Capacity & Caps",
    description: "Corporate intake caps, min-max thresholds per sector",
    href: ROUTES.admin.capacity,
    keywords: ["capacity", "seats", "intake", "limits", "caps"],
    category: "Governance",
    icon: LayersIcon,
  },
  {
    title: "Geographic Locations",
    description: "State-wise and tier-wise hub allocations",
    href: ROUTES.admin.locations,
    keywords: ["locations", "states", "cities", "geography", "zones"],
    category: "Governance",
    icon: MapPinIcon,
  },
  {
    title: "Industry Sectors",
    description: "24 industry sectors under PM Internship Scheme",
    href: ROUTES.admin.sectors,
    keywords: ["sectors", "industry", "domains", "categories"],
    category: "Governance",
    icon: Building2Icon,
  },
  {
    title: "Skill Taxonomy & Ontology",
    description: "Standardized technical & soft skills framework",
    href: ROUTES.admin.skills,
    keywords: ["skills", "taxonomy", "ontology", "skill matrix"],
    category: "Governance",
    icon: CpuIcon,
  },

  // Analytics & Audits
  {
    title: "Fairness & Bias Radar",
    description: "Real-time diversity metrics & bias detection score",
    href: ROUTES.admin.fairness,
    keywords: ["fairness", "bias", "diversity", "equity", "audit"],
    category: "Analytics",
    icon: ShieldAlertIcon,
  },
  {
    title: "Governance Analytics",
    description: "National placement rate, absorption KPIs & charts",
    href: ROUTES.admin.analytics,
    keywords: ["analytics", "metrics", "stats", "kpi", "charts"],
    category: "Analytics",
    icon: BarChart3Icon,
  },
  {
    title: "Outcomes & Impact",
    description: "Post-internship placement rates & stipend disbursals",
    href: ROUTES.admin.outcomes,
    keywords: ["outcomes", "impact", "stipend", "dbt", "results"],
    category: "Analytics",
    icon: TrendingUpIcon,
  },
  {
    title: "GPS-Verified Check-In Monitor",
    description: "Real-time attendance & stipend unlock verification",
    href: ROUTES.admin.checkIn,
    keywords: ["check-in", "checkin", "gps", "attendance", "stipend", "dbt"],
    category: "Analytics",
    icon: QrCodeIcon,
  },
  {
    title: "System Audit Logs",
    description: "Immutable transaction logs & security audits",
    href: ROUTES.admin.auditLogs,
    keywords: ["audit", "logs", "security", "history", "immutable"],
    category: "System",
    icon: FileTextIcon,
  },
  {
    title: "Export Compliance Reports",
    description: "Download ministry audit reports in PDF & Excel",
    href: ROUTES.admin.reports,
    keywords: ["reports", "export", "pdf", "excel", "download"],
    category: "System",
    icon: DownloadIcon,
  },
  {
    title: "Admin Dashboard",
    description: "National PM Internship Scheme Governance HQ",
    href: ROUTES.admin.dashboard,
    keywords: ["dashboard", "home", "overview"],
    category: "System",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Administrators Management",
    description: "Manage admin users, roles & system privileges",
    href: ROUTES.admin.administrators,
    keywords: ["admin", "administrators", "staff", "permissions", "roles"],
    category: "System",
    icon: UserCogIcon,
  },
  {
    title: "System Settings",
    description: "Global engine parameters, API keys & maintenance",
    href: ROUTES.admin.settings,
    keywords: ["settings", "system", "config", "parameters"],
    category: "System",
    icon: SettingsIcon,
  },
];

interface AdminTopbarProps {
  onMenuClick?: () => void;
}

export function AdminTopbar({ onMenuClick }: AdminTopbarProps) {
  const { user, signOut } = useAuth();
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

    // 3. Otherwise, search allocations roster
    navigateTo(`${ROUTES.admin.allocations}?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <header className="relative z-30 flex h-16 items-center justify-between border-b border-border/80 bg-background/85 px-4 sm:px-6 backdrop-blur-xl">
      {/* Left: Menu + Logo + Admin Badge */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuClick} aria-label="Menu">
          <MenuIcon className="size-5" />
        </Button>
        <Logo href={ROUTES.admin.dashboard} size="sm" />
        <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary shadow-[0_0_10px_var(--theme-glow)]">
          <ShieldIcon className="size-3" />
          Admin Governance
        </span>
      </div>

      {/* Middle: Smart Search Bar with Real-time Dropdown */}
      <div ref={containerRef} className="relative hidden md:flex items-center flex-1 max-w-md mx-6">
        <form onSubmit={handleSearch} className="w-full">
          <div className="relative w-full">
            <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder="Search students, companies, allocations, rules, analytics... (e.g. 'allocation', 'rules')"
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
              <span>National Governance Search</span>
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
                  No governance tools found for &quot;<span className="font-semibold text-foreground">{searchQuery}</span>&quot;
                </p>
                <button
                  type="button"
                  onClick={() => navigateTo(`${ROUTES.admin.allocations}?q=${encodeURIComponent(searchQuery.trim())}`)}
                  className="mt-2 text-xs font-bold text-primary hover:underline"
                >
                  Search Allocations for &quot;{searchQuery}&quot; →
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right: Actions + Profile */}
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button variant="ghost" size="icon" aria-label="Notifications" className="rounded-lg">
          <Link href={ROUTES.admin.notifications} className="flex items-center justify-center">
            <BellIcon className="size-4" />
          </Link>
        </Button>

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
                {user ? initials(user.name) : "A"}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52 rounded-2xl border-border/80 bg-popover/95 p-1 backdrop-blur-xl">
            <div className="px-3 py-2.5">
              <p className="text-xs font-bold text-foreground truncate">{user?.name}</p>
              <p className="text-[11px] text-muted-foreground truncate">{user?.email}</p>
              <span className="mt-1 inline-block rounded-full bg-primary/10 px-2 py-0.2 text-[10px] font-bold text-primary">
                System Administrator
              </span>
            </div>
            <DropdownMenuSeparator className="bg-border/60" />
            <DropdownMenuItem render={<Link href={ROUTES.admin.settings} className="flex items-center gap-2 text-xs" />}>
              <SettingsIcon className="size-4 text-primary" />Settings
            </DropdownMenuItem>
            <DropdownMenuItem render={<Link href={ROUTES.admin.administrators} className="flex items-center gap-2 text-xs" />}>
              <ShieldIcon className="size-4 text-primary" />Admins Management
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
