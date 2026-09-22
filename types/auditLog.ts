export type AuditAction =
  | "CREATE"
  | "UPDATE"
  | "DELETE"
  | "APPROVE"
  | "REJECT"
  | "VERIFY"
  | "SUSPEND"
  | "ACTIVATE"
  | "LOGIN"
  | "LOGOUT"
  | "EXPORT"
  | "RUN_MATCHING"
  | "RUN_ALLOCATION";

export type AuditEntity =
  | "Student"
  | "Company"
  | "Internship"
  | "Application"
  | "Allocation"
  | "Rule"
  | "User"
  | "Report";

export interface AuditLog {
  id: string;
  actorId: string;
  actorName: string;
  actorRole: string;
  action: AuditAction;
  entity: AuditEntity;
  entityId: string;
  entityLabel: string;
  status: "Success" | "Failed";
  description: string;
  previousValue?: Record<string, unknown>;
  newValue?: Record<string, unknown>;
  ipAddress?: string;
  createdAt: string;
}
