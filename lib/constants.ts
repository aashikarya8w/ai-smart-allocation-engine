export const APP_NAME = "InternAI";
export const APP_TAGLINE = "AI-Based Smart Allocation Engine";
export const APP_DESCRIPTION =
  "PM Internship Scheme – Connecting students with the right internship opportunities through intelligent matching.";

export const SCHEME_NAME = "PM Internship Scheme";
export const SCHEME_CODE = "SIH25033";

/* ── Routes ─────────────────────────────────────────────── */
export const ROUTES = {
  home: "/",
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  verifyEmail: "/verify-email",
  onboarding: "/onboarding",

  student: {
    dashboard: "/student/dashboard",
    profile: "/student/profile",
    resume: "/student/resume",
    internships: "/student/internships",
    recommendations: "/student/recommendations",
    applications: "/student/applications",
    allocations: "/student/allocations",
    notifications: "/student/notifications",
    saved: "/student/saved",
    skillGap: "/student/skill-gap",
    suitability: "/student/suitability",
    readiness: "/student/readiness",
    whatIf: "/student/what-if",
    careerRoadmap: "/student/career-roadmap",
    assessments: "/student/assessments",
    checkIn: "/student/check-in",
    feedback: "/student/feedback",
    outcomes: "/student/outcomes",
    settings: "/student/settings",
  },

  company: {
    dashboard: "/company/dashboard",
    profile: "/company/profile",
    internships: "/company/internships",
    createInternship: "/company/internships/create",
    drafts: "/company/internships/drafts",
    applications: "/company/applications",
    candidates: "/company/candidates",
    allocations: "/company/allocations",
    evaluations: "/company/evaluations",
    analytics: "/company/analytics",
    notifications: "/company/notifications",
    settings: "/company/settings",
  },

  admin: {
    dashboard: "/admin/dashboard",
    students: "/admin/students",
    studentVerification: "/admin/students/verification",
    companies: "/admin/companies",
    companyVerification: "/admin/companies/verification",
    internships: "/admin/internships",
    internshipsPending: "/admin/internships/pending",
    internshipsCategories: "/admin/internships/categories",
    applications: "/admin/applications",
    applicationsBulk: "/admin/applications/bulk",
    aiMatching: "/admin/ai-matching",
    aiMatchingRun: "/admin/ai-matching/run",
    aiMatchingResults: "/admin/ai-matching/results",
    allocations: "/admin/allocations",
    allocationsReview: "/admin/allocations/review",
    allocationsPending: "/admin/allocations/pending",
    allocationsApproved: "/admin/allocations/approved",
    allocationsHistory: "/admin/allocations/history",
    fairness: "/admin/fairness",
    reallocation: "/admin/reallocation",
    swaps: "/admin/swaps",
    capacity: "/admin/capacity",
    verification: "/admin/verification",
    checkIn: "/admin/check-in",
    feedback: "/admin/feedback",
    outcomes: "/admin/outcomes",
    rules: "/admin/rules",
    rulesMatching: "/admin/rules/matching",
    rulesAllocation: "/admin/rules/allocation",
    rulesEligibility: "/admin/rules/eligibility",
    skills: "/admin/skills",
    skillsCategories: "/admin/skills/categories",
    sectors: "/admin/sectors",
    locations: "/admin/locations",
    analytics: "/admin/analytics",
    notifications: "/admin/notifications",
    auditLogs: "/admin/audit-logs",
    reports: "/admin/reports",
    administrators: "/admin/administrators",
    settings: "/admin/settings",
  },
} as const;

/* ── Work modes ──────────────────────────────────────────── */
export const WORK_MODES = ["Remote", "Hybrid", "On-site"] as const;

/* ── Duration options ────────────────────────────────────── */
export const DURATION_OPTIONS = [
  "1 Month",
  "2 Months",
  "3 Months",
  "4 Months",
  "6 Months",
  "12 Months",
] as const;

/* ── Stipend ranges ──────────────────────────────────────── */
export const STIPEND_RANGES = [
  { label: "Any", min: 0, max: Infinity },
  { label: "Under ₹5,000", min: 0, max: 5000 },
  { label: "₹5,000 – ₹10,000", min: 5000, max: 10000 },
  { label: "₹10,000 – ₹20,000", min: 10000, max: 20000 },
  { label: "₹20,000 – ₹30,000", min: 20000, max: 30000 },
  { label: "Above ₹30,000", min: 30000, max: Infinity },
] as const;

/* ── Indian states ───────────────────────────────────────── */
export const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
] as const;

/* ── Application status ──────────────────────────────────── */
export const APPLICATION_STATUS = [
  "Applied",
  "Shortlisted",
  "Rejected",
  "Waitlisted",
  "Allocated",
  "Withdrawn",
] as const;

/* ── Allocation status ───────────────────────────────────── */
export const ALLOCATION_STATUS = [
  "Pending",
  "Approved",
  "Rejected",
  "Completed",
] as const;

/* ── User roles ──────────────────────────────────────────── */
export const USER_ROLES = ["student", "company", "admin"] as const;

/* ── Pagination ──────────────────────────────────────────── */
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100] as const;

/* ── Score weights (default) ─────────────────────────────── */
export const DEFAULT_SCORE_WEIGHTS = {
  skillMatch: 40,
  qualification: 20,
  location: 15,
  interest: 15,
  experience: 10,
} as const;

/* ── Chart colors ────────────────────────────────────────── */
export const CHART_COLORS = [
  "#6366f1",
  "#3b82f6",
  "#22c55e",
  "#f59e0b",
  "#ec4899",
  "#14b8a6",
  "#8b5cf6",
  "#f97316",
] as const;
