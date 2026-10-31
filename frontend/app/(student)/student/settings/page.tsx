"use client";

import { useState } from "react";
import {
  SettingsIcon,
  ShieldCheckIcon,
  UserIcon,
  KeyRoundIcon,
  BellRingIcon,
  AlertTriangleIcon,
  SaveIcon,
  LogOutIcon
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useStudent } from "@/hooks/useStudent";
import { useAuth } from "@/hooks/useAuth";

export default function StudentSettingsPage() {
  const { student } = useStudent();
  const { signOut } = useAuth();
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [notifications, setNotifications] = useState({
    applications: true,
    recommendations: true,
    allocations: true,
    system: false,
  });

  if (!student) return null;

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <PageHeader
        title="Account & Security Settings"
        description="Manage your profile information, password security, and automated alert preferences."
      />

      {/* Cyber Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent p-6 shadow-xl shadow-primary/5 backdrop-blur-md">
        <div className="absolute -right-10 -top-10 size-48 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-md">
              <ShieldCheckIcon className="size-3.5 text-primary" />
              <span>Security & Profile Governance</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              User Profile & Notification Controls
            </h2>
            <p className="max-w-2xl text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Updates made here sync with your digital talent twin and ensure host company communications reach your preferred channels.
            </p>
          </div>
        </div>
      </div>

      {/* Personal Info Card */}
      <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2 border-b border-border/60 pb-3">
          <UserIcon className="size-4 text-primary" />
          <h3 className="text-sm font-bold text-foreground">Personal Information</h3>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="s-name" className="text-xs font-semibold text-muted-foreground">
              Full Name
            </Label>
            <Input id="s-name" defaultValue={student.fullName} className="rounded-xl bg-background/50 border-border/70" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="s-phone" className="text-xs font-semibold text-muted-foreground">
              Phone Number
            </Label>
            <Input id="s-phone" defaultValue={student.phone} className="rounded-xl bg-background/50 border-border/70" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="s-city" className="text-xs font-semibold text-muted-foreground">
              Current City
            </Label>
            <Input id="s-city" defaultValue={student.city} className="rounded-xl bg-background/50 border-border/70" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="s-state" className="text-xs font-semibold text-muted-foreground">
              State / Region
            </Label>
            <Input id="s-state" defaultValue={student.state} className="rounded-xl bg-background/50 border-border/70" />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <Button
            size="sm"
            onClick={handleSave}
            className="gap-2 rounded-xl font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20"
          >
            <SaveIcon className="size-3.5" />
            <span>Save Profile Changes</span>
          </Button>

          {savedSuccess && (
            <span className="text-xs font-semibold text-emerald-400">
              ✓ Changes saved successfully!
            </span>
          )}
        </div>
      </div>

      {/* Change Password */}
      <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2 border-b border-border/60 pb-3">
          <KeyRoundIcon className="size-4 text-primary" />
          <h3 className="text-sm font-bold text-foreground">Password & Credentials</h3>
        </div>

        <div className="space-y-3.5 max-w-md">
          <div className="space-y-1.5">
            <Label htmlFor="cur-pw" className="text-xs font-semibold text-muted-foreground">Current Password</Label>
            <Input id="cur-pw" type="password" placeholder="••••••••" className="rounded-xl bg-background/50 border-border/70" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="new-pw" className="text-xs font-semibold text-muted-foreground">New Password</Label>
            <Input id="new-pw" type="password" placeholder="••••••••" className="rounded-xl bg-background/50 border-border/70" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="conf-pw" className="text-xs font-semibold text-muted-foreground">Confirm New Password</Label>
            <Input id="conf-pw" type="password" placeholder="••••••••" className="rounded-xl bg-background/50 border-border/70" />
          </div>
        </div>

        <div className="pt-2">
          <Button variant="outline" size="sm" className="rounded-xl font-semibold border-border/80 hover:bg-muted/50">
            Update Password
          </Button>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#0e1322]/90 backdrop-blur-md p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2 border-b border-border/60 pb-3">
          <BellRingIcon className="size-4 text-primary" />
          <h3 className="text-sm font-bold text-foreground">Notification Preferences</h3>
        </div>

        <div className="space-y-3">
          {(Object.keys(notifications) as (keyof typeof notifications)[]).map((key) => (
            <div
              key={key}
              className="flex items-center justify-between rounded-xl border border-border/50 bg-muted/20 p-3.5"
            >
              <div>
                <Label className="capitalize text-xs sm:text-sm font-bold text-foreground block">
                  {key} Alerts
                </Label>
                <span className="text-[11px] text-muted-foreground">
                  Receive real-time push and email alerts for {key} status updates
                </span>
              </div>
              <Switch
                checked={notifications[key]}
                onCheckedChange={(val) =>
                  setNotifications((prev) => ({ ...prev, [key]: val }))
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 backdrop-blur-md p-6 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
          <AlertTriangleIcon className="size-4" />
          <span>Session & Account Management</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Sign out of your active student session or remove cached device tokens.
        </p>
        <div className="pt-2">
          <Button
            variant="destructive"
            size="sm"
            onClick={signOut}
            className="gap-2 rounded-xl font-semibold bg-rose-600 hover:bg-rose-500 text-white shadow-sm"
          >
            <LogOutIcon className="size-3.5" />
            <span>Sign Out of Student Account</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
