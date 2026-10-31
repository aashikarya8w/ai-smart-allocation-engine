import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ApplicationStatus } from "@/types/application";
import type { AllocationStatus } from "@/types/allocation";
import type { InternshipStatus } from "@/types/internship";
import type { CompanyVerificationStatus } from "@/types/company";
import type { VerificationStatus } from "@/types/student";

type AnyStatus =
  | ApplicationStatus
  | AllocationStatus
  | InternshipStatus
  | CompanyVerificationStatus
  | VerificationStatus
  | string;

const STATUS_STYLES: Record<string, string> = {
  // Application
  Applied: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Shortlisted:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  Rejected: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  Waitlisted:
    "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  Allocated:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Withdrawn: "bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400",

  // Allocation
  Recommended:
    "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
  Pending:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  Approved:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Completed:
    "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",

  // Internship
  Draft: "bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400",
  Active:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Closed: "bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400",

  // Verification
  Verified:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Suspended:
    "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
};

interface StatusBadgeProps {
  status: AnyStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const style = STATUS_STYLES[status] ?? "bg-muted text-muted-foreground";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        style,
        className
      )}
    >
      {status}
    </span>
  );
}
