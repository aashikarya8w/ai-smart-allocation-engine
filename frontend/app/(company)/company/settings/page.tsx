"use client";

import { useState } from "react";
import {
  SettingsIcon,
  ShieldCheckIcon,
  Building2Icon,
  KeyRoundIcon,
  AlertTriangleIcon,
  SaveIcon,
  LogOutIcon
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCompany } from "@/hooks/useCompany";
import { useAuth } from "@/hooks/useAuth";

export default function CompanySettingsPage() {
  const { company } = useCompany();
  const { signOut } = useAuth();
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!company) return null;

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <PageHeader
        title="Enterprise Settings & Governance"
        description="Manage company details, recruiter credentials, and security settings."
      />

      {/* Cyber Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent p-6 shadow-xl shadow-primary/5 backdrop-blur-md">
        <div className="absolute -right-10 -top-10 size-48 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-md">
              <ShieldCheckIcon className="size-3.5 text-primary" />
              <span>Corporate Employer Registry</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Organization Controls & Security
            </h2>
            <p className="max-w-2xl text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Updates to your company profile are reflected immediately across all published internship listings and candidate offer letters.
            </p>
          </div>
        </div>
      </div>

      {/* Company Info */}
      <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2 border-b border-border/60 pb-3">
          <Building2Icon className="size-4 text-primary" />
          <h3 className="text-sm font-bold text-foreground">Organization Details</h3>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-muted-foreground">Corporate Name</Label>
            <Input defaultValue={company.companyName} className="rounded-xl bg-background/50 border-border/70" />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-muted-foreground">Contact Phone</Label>
            <Input defaultValue={company.phone} className="rounded-xl bg-background/50 border-border/70" />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-muted-foreground">Corporate Website</Label>
            <Input defaultValue={company.website ?? ""} placeholder="https://yourcompany.com" className="rounded-xl bg-background/50 border-border/70" />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-muted-foreground">Headquarters City</Label>
            <Input defaultValue={company.city} className="rounded-xl bg-background/50 border-border/70" />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs font-semibold text-muted-foreground">Company Narrative / Description</Label>
          <Textarea defaultValue={company.description} rows={4} className="rounded-xl bg-background/50 border-border/70 min-h-[90px]" />
        </div>

        <div className="flex items-center justify-between pt-2">
          <Button
            size="sm"
            onClick={handleSave}
            className="gap-2 rounded-xl font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20"
          >
            <SaveIcon className="size-3.5" />
            <span>Save Company Information</span>
          </Button>

          {savedSuccess && (
            <span className="text-xs font-semibold text-emerald-400">
              ✓ Information updated successfully!
            </span>
          )}
        </div>
      </div>

      {/* Password Management */}
      <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2 border-b border-border/60 pb-3">
          <KeyRoundIcon className="size-4 text-primary" />
          <h3 className="text-sm font-bold text-foreground">Password & Access Controls</h3>
        </div>

        <div className="space-y-3 max-w-md">
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-muted-foreground">Current Password</Label>
            <Input type="password" placeholder="••••••••" className="rounded-xl bg-background/50 border-border/70" />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-muted-foreground">New Password</Label>
            <Input type="password" placeholder="••••••••" className="rounded-xl bg-background/50 border-border/70" />
          </div>
        </div>

        <div className="pt-2">
          <Button variant="outline" size="sm" className="rounded-xl font-semibold border-border/80 hover:bg-muted/50">
            Update Recruiter Password
          </Button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 backdrop-blur-md p-6 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
          <AlertTriangleIcon className="size-4" />
          <span>Active Recruiter Session</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Sign out of your employer portal session across active devices.
        </p>
        <div className="pt-2">
          <Button
            variant="destructive"
            size="sm"
            onClick={signOut}
            className="gap-2 rounded-xl font-semibold bg-rose-600 hover:bg-rose-500 text-white shadow-sm"
          >
            <LogOutIcon className="size-3.5" />
            <span>Sign Out of Company Portal</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
