"use client";

import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useStudent } from "@/hooks/useStudent";
import { useAuth } from "@/hooks/useAuth";

export default function StudentSettingsPage() {
  const { student } = useStudent();
  const { signOut }  = useAuth();

  const [notifications, setNotifications] = useState({
    applications: true,
    recommendations: true,
    allocations: true,
    system: false,
  });

  if (!student) return null;

  return (
    <div className="space-y-6 max-w-2xl">
      <PageHeader title="Settings" description="Manage your account and preferences." />

      {/* Personal Info */}
      <Card>
        <CardHeader><CardTitle className="text-sm">Personal Information</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="s-name">Full Name</Label>
              <Input id="s-name" defaultValue={student.fullName} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="s-phone">Phone</Label>
              <Input id="s-phone" defaultValue={student.phone} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="s-city">City</Label>
              <Input id="s-city" defaultValue={student.city} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="s-state">State</Label>
              <Input id="s-state" defaultValue={student.state} />
            </div>
          </div>
          <Button size="sm">Save Changes</Button>
        </CardContent>
      </Card>

      {/* Change password */}
      <Card>
        <CardHeader><CardTitle className="text-sm">Change Password</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="cur-pw">Current Password</Label>
            <Input id="cur-pw" type="password" placeholder="••••••••" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="new-pw">New Password</Label>
            <Input id="new-pw" type="password" placeholder="••••••••" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="conf-pw">Confirm New Password</Label>
            <Input id="conf-pw" type="password" placeholder="••••••••" />
          </div>
          <Button size="sm" variant="outline">Update Password</Button>
        </CardContent>
      </Card>

      {/* Notification preferences */}
      <Card>
        <CardHeader><CardTitle className="text-sm">Notification Preferences</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {(Object.keys(notifications) as (keyof typeof notifications)[]).map((key) => (
            <div key={key} className="flex items-center justify-between">
              <Label className="capitalize text-sm text-foreground">{key} notifications</Label>
              <Switch
                checked={notifications[key]}
                onCheckedChange={(val) =>
                  setNotifications((prev) => ({ ...prev, [key]: val }))
                }
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Danger zone */}
      <Card>
        <CardHeader><CardTitle className="text-sm text-destructive">Danger Zone</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Sign out</p>
              <p className="text-xs text-muted-foreground">Sign out of your account on this device.</p>
            </div>
            <Button variant="outline" size="sm" onClick={signOut}>Sign Out</Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-destructive">Delete Account</p>
              <p className="text-xs text-muted-foreground">Permanently delete your account and all data.</p>
            </div>
            <Button variant="destructive" size="sm">Delete</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
