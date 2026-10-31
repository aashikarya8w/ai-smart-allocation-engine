"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon, MapPinIcon, GlobeIcon, PhoneIcon } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { EmptyState } from "@/components/common/EmptyState";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { mockCompanies } from "@/data/companies";
import { mockInternships } from "@/data/internships";
import { formatDate, initials } from "@/lib/formatters";
import { StatusBadge as SB } from "@/components/common/StatusBadge";

interface PageProps { params: Promise<{ id: string }> }

export default function AdminCompanyDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const company = mockCompanies.find((c) => c.id === id);
  const companyInternships = mockInternships.filter((i) => i.companyId === id);

  if (!company) return <EmptyState title="Company not found" />;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon-sm" onClick={() => router.back()}><ArrowLeftIcon className="size-4" /></Button>
        <PageHeader title={company.companyName} description="Company details and internship listings" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6 text-center">
              <Avatar className="mx-auto size-16"><AvatarFallback className="text-lg bg-primary/10 text-primary">{initials(company.companyName)}</AvatarFallback></Avatar>
              <h2 className="mt-3 text-sm font-semibold">{company.companyName}</h2>
              <p className="text-xs text-muted-foreground">{company.sector}</p>
              <div className="mt-2 flex justify-center"><StatusBadge status={company.verificationStatus} /></div>
              <Separator className="my-3" />
              <div className="space-y-1.5 text-left text-xs">
                <div className="flex items-center gap-2 text-muted-foreground"><MapPinIcon className="size-3.5" />{company.city}, {company.state}</div>
                <div className="flex items-center gap-2 text-muted-foreground"><PhoneIcon className="size-3.5" />{company.phone}</div>
                {company.website && <div className="flex items-center gap-2 text-muted-foreground"><GlobeIcon className="size-3.5" /><a href={company.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline truncate">{company.website}</a></div>}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 space-y-2">
              <Button variant="outline" size="sm" className="w-full" disabled={company.verificationStatus === "Verified"}>Approve</Button>
              <Button variant="destructive" size="sm" className="w-full" disabled={company.verificationStatus === "Rejected"}>Reject</Button>
              <Button variant="outline" size="sm" className="w-full">Suspend</Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4 lg:col-span-2">
          <Card>
            <CardHeader><CardTitle className="text-sm">About</CardTitle></CardHeader>
            <CardContent><p className="text-sm text-muted-foreground leading-relaxed">{company.description}</p></CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-sm">Stats</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              {[
                ["Total Internships", company.totalInternships],
                ["Active Internships", company.activeInternships],
                ["Total Seats", company.totalSeats],
                ["Allocated Seats", company.allocatedSeats],
                ["Employees", company.employeeCount],
                ["Est. Year", company.establishedYear],
              ].map(([label, val]) => (
                <div key={String(label)}>
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="text-sm font-semibold text-foreground">{val}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-sm">Internships ({companyInternships.length})</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {companyInternships.map((i) => (
                <div key={i.id} className="flex items-center justify-between rounded-lg border border-border/50 p-2.5">
                  <div><p className="text-sm font-medium">{i.title}</p><p className="text-xs text-muted-foreground">{i.seats} seats · {i.duration}</p></div>
                  <SB status={i.status} />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
