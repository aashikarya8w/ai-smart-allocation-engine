"use client";

import {
  ShieldIcon, PlusIcon, MailIcon, PhoneIcon, ShieldCheckIcon,
  UserCheckIcon, KeyIcon, LockIcon, AlertTriangleIcon, CheckCircle2Icon,
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { mockUsers } from "@/data/users";
import { initials } from "@/lib/formatters";

const admins = mockUsers.filter((u) => u.role === "admin");

export default function AdministratorsPage() {
  return (
    <div className="space-y-8 pb-12">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-br from-[#0c1222] via-[#0f172a] to-[#1e1338] p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl">
        <div className="absolute -top-32 -right-24 h-96 w-96 rounded-full bg-gradient-to-br from-primary/20 via-purple-500/15 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-gradient-to-tr from-cyan-500/15 via-blue-500/10 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
              <ShieldCheckIcon className="h-3.5 w-3.5" />
              Role-Based Access Governance (RBAC)
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Platform <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Administrators</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed font-normal">
              Manage authorized ministerial officers, data security stewards, and system administrators with high-privilege access to nationwide allocation operations.
            </p>
          </div>

          <div>
            <Button
              size="sm"
              onClick={() => alert("Add Admin — Mock action")}
              className="bg-gradient-to-r from-primary via-indigo-600 to-purple-600 hover:from-primary/90 hover:to-purple-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-primary/25 active:scale-95 transition-all gap-2"
            >
              <PlusIcon className="size-4" />
              Provision Administrator
            </Button>
          </div>
        </div>
      </div>

      {/* Admin Cards Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {admins.map((admin) => (
          <div
            key={admin.id}
            className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-5 shadow-xl backdrop-blur-md space-y-4 hover:border-primary/50 transition-all"
          >
            <div className="flex items-start gap-3.5">
              <div className="size-12 rounded-2xl bg-gradient-to-br from-primary/30 to-purple-600/40 border border-primary/30 flex items-center justify-center text-primary font-black text-sm shrink-0 shadow-md">
                {initials(admin.name)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-foreground text-base truncate">{admin.name}</p>
                <div className="flex flex-wrap items-center gap-1.5 mt-1">
                  <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10 text-[10px]">
                    Super Admin
                  </Badge>
                  {admin.isVerified && (
                    <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 bg-emerald-500/10 text-[10px]">
                      eKYC Cleared
                    </Badge>
                  )}
                  <Badge
                    variant="outline"
                    className={`text-[10px] ${
                      admin.isActive
                        ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10"
                        : "border-rose-500/30 text-rose-400 bg-rose-500/10"
                    }`}
                  >
                    {admin.isActive ? "Active Session" : "Suspended"}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-muted/40 dark:bg-white/[0.02] border border-border/40 dark:border-white/5 space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <MailIcon className="size-3.5 text-primary shrink-0" />
                <span className="truncate text-foreground font-mono">{admin.email}</span>
              </div>
              {admin.phone && (
                <div className="flex items-center gap-2">
                  <PhoneIcon className="size-3.5 text-primary shrink-0" />
                  <span className="text-foreground">{admin.phone}</span>
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-1">
              <Button size="sm" variant="outline" className="flex-1 text-xs border-white/10 hover:bg-white/5">
                Edit Privileges
              </Button>
              <Button
                size="sm"
                variant="outline"
                className={`flex-1 text-xs border-white/10 ${
                  admin.isActive ? "text-destructive hover:bg-destructive/10" : "text-emerald-400 hover:bg-emerald-500/10"
                }`}
              >
                {admin.isActive ? "Revoke Access" : "Re-activate"}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* RBAC Capabilities Matrix */}
      <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 p-6 shadow-xl backdrop-blur-md space-y-4">
        <div className="flex items-center gap-2 border-b border-border/50 dark:border-white/5 pb-3">
          <KeyIcon className="size-5 text-primary" />
          <h3 className="text-base font-bold text-foreground">Enforced Administrative Privileges & Authorizations</h3>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 text-xs">
          {[
            "National Student & Corporate Verification",
            "Trigger Gale-Shapley AI Matching Engine",
            "Execute Deterministic Smart Allocation Batch",
            "Configure Allocation Policy Weights & Tie-Breakers",
            "Approve & Reject Institutional Quotas",
            "Manage Cross-Institutional Seat Reallocations",
            "Aadhaar Identity & MCA Compliance Verification",
            "Continuous Geofence Check-In Surveillance",
            "Generate Exportable Ministry Analytics Reports",
            "Inspect SHA-256 Cryptographic Audit Logs",
            "Manage Multi-Factor Auth & Platform Config",
            "Execute Capacity Stress Simulations",
          ].map((perm) => (
            <div
              key={perm}
              className="flex items-center gap-2.5 p-3 rounded-xl bg-muted/30 dark:bg-white/[0.01] border border-border/40 dark:border-white/5 text-foreground"
            >
              <CheckCircle2Icon className="size-4 text-emerald-400 shrink-0" />
              <span className="font-medium">{perm}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
