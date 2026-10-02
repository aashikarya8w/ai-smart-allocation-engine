"use client";

import { ShieldIcon, PlusIcon, MailIcon, PhoneIcon } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { mockUsers } from "@/data/users";
import { initials, formatDate } from "@/lib/formatters";

const admins = mockUsers.filter((u) => u.role === "admin");

export default function AdministratorsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Administrators"
        description="Manage admin accounts with platform access."
      >
        <Button size="sm" onClick={() => alert("Add Admin — Mock action")}>
          <PlusIcon className="mr-1.5 size-4" />Add Admin
        </Button>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {admins.map((admin) => (
          <Card key={admin.id}>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start gap-3">
                <Avatar className="size-10 shrink-0">
                  <AvatarFallback className="bg-primary/10 text-primary text-sm">
                    {initials(admin.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="font-medium text-foreground truncate">{admin.name}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Badge variant="default" className="text-xs">Admin</Badge>
                    {admin.isVerified && (
                      <Badge variant="secondary" className="text-xs">Verified</Badge>
                    )}
                    <Badge
                      variant={admin.isActive ? "default" : "destructive"}
                      className="text-xs"
                    >
                      {admin.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MailIcon className="size-3.5 shrink-0" />
                  <span className="truncate">{admin.email}</span>
                </div>
                {admin.phone && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <PhoneIcon className="size-3.5 shrink-0" />
                    <span>{admin.phone}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-1">
                <Button size="sm" variant="outline" className="flex-1 text-xs">Edit</Button>
                <Button size="sm" variant="outline" className="flex-1 text-xs text-destructive">
                  {admin.isActive ? "Deactivate" : "Activate"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Roles info */}
      <Card className="border-dashed">
        <CardContent className="p-4 space-y-3">
          <p className="text-sm font-semibold text-foreground flex items-center gap-2">
            <ShieldIcon className="size-4 text-primary" />
            Admin Role Permissions
          </p>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 text-xs">
            {[
              "Manage Students & Companies",
              "Run AI Matching",
              "Run Smart Allocation",
              "Configure Allocation Rules",
              "Approve / Reject Allocations",
              "Manage Reallocations & Swaps",
              "Identity Verification",
              "Monitor Check-Ins",
              "View Analytics & Reports",
              "Access Audit Logs",
              "Manage System Settings",
              "Capacity Stress Simulation",
            ].map((perm) => (
              <div key={perm} className="flex items-center gap-2 text-foreground">
                <span className="size-1.5 rounded-full bg-green-500 shrink-0" />
                {perm}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
