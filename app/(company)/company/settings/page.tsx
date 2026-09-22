"use client";

import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useCompany } from "@/hooks/useCompany";
import { useAuth } from "@/hooks/useAuth";

export default function CompanySettingsPage() {
  const { company } = useCompany();
  const { signOut } = useAuth();

  if (!company) return null;

  return (
    <div className="space-y-6 max-w-2xl">
      <PageHeader title="Settings" description="Manage your company account and preferences." />

      {/* Company Info */}
      <Card>
        <CardHeader><CardTitle className="text-sm">Company Information</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Company Name</Label>
              <Input defaultValue={company.companyName} />
            </div>
            <div className="space-y-1.5">
              <Label>Phone</Label>
              <Input defaultValue={company.phone} />
            </div>
            <div className="space-y-1.5">
              <Label>Website</Label>
              <Input defaultValue={company.website ?? ""} placeholder="https://yourcompany.com" />
            </div>
            <div className="space-y-1.5">
              <Label>City</Label>
              <Input defaultValue={company.city} />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Description</Label>
            <Textarea defaultValue={company.description} rows={4} />
          </div>
          <Button size="sm">Save Changes</Button>
        </CardContent>
      </Card>

      {/* Password */}
      <Card>
        <CardHeader><CardTitle className="text-sm">Change Password</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-1.5">
            <Label>Current Password</Label>
            <Input type="password" placeholder="••••••••" />
          </div>
          <div className="space-y-1.5">
            <Label>New Password</Label>
            <Input type="password" placeholder="••••••••" />
          </div>
          <Button size="sm" variant="outline">Update Password</Button>
        </CardContent>
      </Card>

      {/* Danger zone */}
      <Card>
        <CardHeader><CardTitle className="text-sm text-destructive">Danger Zone</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Sign out</p>
              <p className="text-xs text-muted-foreground">Sign out of your account.</p>
            </div>
            <Button variant="outline" size="sm" onClick={signOut}>Sign Out</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
