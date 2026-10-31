"use client";

import { useState } from "react";
import { SaveIcon, ShieldIcon, BellIcon, SlidersIcon, GlobeIcon } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { APP_NAME, SCHEME_CODE, SCHEME_NAME } from "@/lib/constants";

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [notifications, setNotifications] = useState({
    newRegistrations: true,
    verificationRequests: true,
    allocationResults: true,
    systemAlerts: true,
    weeklyReport: false,
  });
  const [allocation, setAllocation] = useState({
    maxAllocationsPerStudent: 1,
    autoApproveThreshold: 90,
    enableWaitlist: true,
    waitlistSize: 20,
    enableReallocation: true,
    enableSwaps: true,
  });

  const save = async () => {
    await new Promise((r) => setTimeout(r, 600));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <PageHeader title="System Settings" description="Configure platform-wide settings and preferences.">
        <Button size="sm" onClick={save}>
          <SaveIcon className="mr-1.5 size-4" />
          {saved ? "Saved!" : "Save All Changes"}
        </Button>
      </PageHeader>

      <Tabs defaultValue="general">
        <TabsList className="flex-wrap h-auto gap-1.5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="allocation">Allocation</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* General */}
        <TabsContent value="general" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <GlobeIcon className="size-4 text-primary" />Platform Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label>Platform Name</Label>
                  <Input defaultValue={APP_NAME} />
                </div>
                <div className="space-y-1.5">
                  <Label>Scheme Code</Label>
                  <Input defaultValue={SCHEME_CODE} readOnly className="bg-muted cursor-not-allowed" />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label>Scheme Name</Label>
                  <Input defaultValue={SCHEME_NAME} />
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label>Default Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">Hindi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Timezone</Label>
                  <Select defaultValue="IST">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IST">IST (UTC+5:30)</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Feature Flags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "AI Matching",              desc: "Enable AI-based internship matching",                key: "aiMatching"   },
                { label: "Smart Allocation",         desc: "Enable automated seat-constrained allocation",       key: "smartAlloc"   },
                { label: "What-If Simulator",        desc: "Allow students to run profile simulations",          key: "whatIf"       },
                { label: "Readiness Twin",           desc: "Enable internship readiness analysis",               key: "readiness"    },
                { label: "Swap Engine",              desc: "Allow post-allocation internship swaps",             key: "swaps"        },
                { label: "Capacity Simulator",       desc: "Enable admin capacity planning simulation",          key: "capacity"     },
              ].map((f) => (
                <div key={f.key} className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">{f.label}</p>
                    <p className="text-xs text-muted-foreground">{f.desc}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Allocation Settings */}
        <TabsContent value="allocation" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <SlidersIcon className="size-4 text-primary" />Allocation Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label>Max Allocations per Student</Label>
                  <Input
                    type="number"
                    value={allocation.maxAllocationsPerStudent}
                    onChange={(e) => setAllocation(p => ({ ...p, maxAllocationsPerStudent: +e.target.value }))}
                    min={1} max={3}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Auto-Approve Threshold (%)</Label>
                  <Input
                    type="number"
                    value={allocation.autoApproveThreshold}
                    onChange={(e) => setAllocation(p => ({ ...p, autoApproveThreshold: +e.target.value }))}
                    min={0} max={100}
                  />
                  <p className="text-xs text-muted-foreground">Allocations above this score are auto-approved</p>
                </div>
                <div className="space-y-1.5">
                  <Label>Waitlist Size (per internship)</Label>
                  <Input
                    type="number"
                    value={allocation.waitlistSize}
                    onChange={(e) => setAllocation(p => ({ ...p, waitlistSize: +e.target.value }))}
                    min={0} max={100}
                  />
                </div>
              </div>
              <Separator />
              {[
                { label: "Enable Waitlist",      key: "enableWaitlist" as const,      desc: "Allow candidates to be placed on a waitlist" },
                { label: "Enable Reallocation",  key: "enableReallocation" as const,  desc: "Automatically trigger reallocation on vacated seats" },
                { label: "Enable Swap Requests", key: "enableSwaps" as const,         desc: "Allow students to request post-allocation swaps" },
              ].map((f) => (
                <div key={f.key} className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">{f.label}</p>
                    <p className="text-xs text-muted-foreground">{f.desc}</p>
                  </div>
                  <Switch
                    checked={allocation[f.key]}
                    onCheckedChange={(v) => setAllocation(p => ({ ...p, [f.key]: v }))}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <BellIcon className="size-4 text-primary" />Admin Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {(Object.entries(notifications) as [keyof typeof notifications, boolean][]).map(([key, val]) => (
                <div key={key} className="flex items-center justify-between gap-3">
                  <Label className="text-sm capitalize text-foreground">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </Label>
                  <Switch
                    checked={val}
                    onCheckedChange={(v) => setNotifications(p => ({ ...p, [key]: v }))}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <ShieldIcon className="size-4 text-primary" />Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Two-Factor Authentication",     desc: "Require 2FA for all admin logins",       on: true  },
                { label: "Audit Logging",                 desc: "Log all admin actions for compliance",    on: true  },
                { label: "Session Timeout (30 min)",      desc: "Auto-logout after inactivity",            on: true  },
                { label: "IP Allowlist",                  desc: "Restrict access to approved IP ranges",   on: false },
                { label: "Force Password Reset",          desc: "Require password change every 90 days",   on: false },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">{s.label}</p>
                    <p className="text-xs text-muted-foreground">{s.desc}</p>
                  </div>
                  <Switch defaultChecked={s.on} />
                </div>
              ))}
              <Separator />
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-foreground">Change Admin Password</p>
                  <p className="text-xs text-muted-foreground">Update your admin account password</p>
                </div>
                <Button size="sm" variant="outline">Change Password</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-sm text-destructive">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-foreground">Reset All Allocations</p>
                  <p className="text-xs text-muted-foreground">Permanently clears all allocation data. Irreversible.</p>
                </div>
                <Button size="sm" variant="destructive" onClick={() => alert("Mock — would require confirmation")}>
                  Reset
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-foreground">Export All Data</p>
                  <p className="text-xs text-muted-foreground">Download complete platform data as JSON.</p>
                </div>
                <Button size="sm" variant="outline" onClick={() => alert("Mock export triggered")}>
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
