export const USER_ROLES = ["student", "company", "admin"] as const;
export type UserRole = typeof USER_ROLES[number];

export const VERIFICATION_STATUS = ["Pending", "Verified", "Rejected"] as const;
export const ACCOUNT_STATUS      = ["Active", "Inactive", "Suspended"] as const;

export const INTERNSHIP_STATUS = [
  "Draft", "Pending", "Approved", "Rejected", "Active", "Closed",
] as const;

export const APPLICATION_STATUS = [
  "Applied", "Shortlisted", "Rejected", "Waitlisted", "Allocated", "Withdrawn",
] as const;

export const ALLOCATION_STATUS = [
  "Pending", "Recommended", "Approved", "Rejected", "Cancelled",
] as const;

export const NOTIFICATION_TYPES = [
  "APPLICATION", "SHORTLIST", "ALLOCATION", "INTERNSHIP", "SYSTEM", "VERIFICATION",
] as const;

export const WORK_MODES = ["Remote", "Hybrid", "On-site"] as const;

export const DEFAULT_WEIGHTS = {
  skillMatch:    40,
  qualification: 20,
  location:      15,
  interest:      15,
  experience:    10,
} as const;

export const AUDIT_ACTIONS = [
  "CREATE", "UPDATE", "DELETE",
  "APPROVE", "REJECT", "VERIFY", "SUSPEND",
  "LOGIN", "LOGOUT", "EXPORT",
  "RUN_MATCHING", "RUN_ALLOCATION",
  "CHANGE_STATUS",
] as const;
