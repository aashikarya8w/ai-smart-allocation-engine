"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon, MapPinIcon, ClockIcon, IndianRupeeIcon, UsersIcon } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { EmptyState } from "@/components/common/EmptyState";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { mockInternships } from "@/data/internships";
import { mockApplications } from "@/data/applications";
import { formatDate, formatStipendRange } from "@/lib/formatters";
import { StatusBadge as SB } from "@/components/common/StatusBadge";

interface PageProps { params: Promise<{ id: string }> }

export default function AdminInternshipDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const internship = mockInternships.find((i) => i.id === id);
  const apps = mockApplications.filter((a) => a.internshipId === id);

  if (!internship) return <EmptyState title="Internship not found" />;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon-sm" onClick={() => router.back()}><ArrowLeftIcon className="size-4" /></Button>
        <PageHeader title={internship.title} description={internship.companyName} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <CardTitle className="text-sm">{internship.title}</CardTitle>
                <StatusBadge status={internship.status} />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { icon: MapPinIcon,      label: "Location", value: `${internship.city}, ${internship.state}` },
                  { icon: ClockIcon,       label: "Duration", value: internship.duration },
                  { icon: IndianRupeeIcon, label: "Stipend",  value: `${formatStipendRange(internship.stipendMin, internship.stipendMax)}/mo` },
                  { icon: UsersIcon,       label: "Seats",    value: `${internship.availableSeats}/${internship.seats} available` },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-2">
                    <Icon className="size-4 text-muted-foreground shrink-0" />
                    <div><p className="text-xs text-muted-foreground">{label}</p><p className="text-sm font-medium">{value}</p></div>
                  </div>
                ))}
              </div>
              <Separator />
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Description</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{internship.description}</p>
              </div>
              <Separator />
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Required Skills</p>
                <div className="flex flex-wrap gap-1.5">{internship.requiredSkills.map((s) => <Badge key={s} variant="secondary">{s}</Badge>)}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-sm">Applications ({apps.length})</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {apps.length === 0 ? <p className="text-xs text-muted-foreground">No applications yet.</p> : apps.map((a) => (
                <div key={a.id} className="flex items-center justify-between rounded-lg border border-border/50 p-2.5">
                  <div><p className="text-sm font-medium">{a.studentName}</p><p className="text-xs text-muted-foreground">{formatDate(a.appliedAt)}</p></div>
                  <div className="flex items-center gap-2"><span className="text-xs">{a.matchScore}%</span><SB status={a.status} /></div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-sm">Actions</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {internship.status === "Pending" && <>
                <Button className="w-full" size="sm">Approve</Button>
                <Button variant="destructive" size="sm" className="w-full">Reject</Button>
              </>}
              {internship.status === "Active" && <Button variant="destructive" size="sm" className="w-full">Close Internship</Button>}
              <Button variant="outline" size="sm" className="w-full" onClick={() => router.back()}>Back</Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-xs space-y-1 text-muted-foreground">
              <p>Eligibility: {internship.qualification}</p>
              <p>Min CGPA: {internship.minimumCGPA}</p>
              <p>Sector: {internship.sector}</p>
              <p>Mode: {internship.workMode}</p>
              <p>Start: {formatDate(internship.startDate)}</p>
              <p>End: {formatDate(internship.endDate)}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
