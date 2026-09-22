"use client";

import { use } from "react";
import { ArrowLeftIcon, MapPinIcon, ClockIcon, IndianRupeeIcon, UsersIcon, CalendarIcon, GraduationCapIcon } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { EmptyState } from "@/components/common/EmptyState";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/button";
import { useInternship } from "@/hooks/useInternships";
import { formatDate, formatStipendRange } from "@/lib/formatters";
import { ROUTES } from "@/lib/constants";
import { useRouter } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function InternshipDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const router  = useRouter();
  const internship = useInternship(id);

  if (!internship) return <EmptyState title="Internship not found" />;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon-sm" onClick={() => router.back()} aria-label="Go back">
          <ArrowLeftIcon className="size-4" />
        </Button>
        <PageHeader title={internship.title} description={internship.companyName} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main */}
        <div className="space-y-4 lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <CardTitle>{internship.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-0.5">{internship.companyName}</p>
                </div>
                <StatusBadge status={internship.status} />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { icon: MapPinIcon,      label: "Location",   value: `${internship.city}, ${internship.state}` },
                  { icon: ClockIcon,       label: "Duration",   value: internship.duration                        },
                  { icon: IndianRupeeIcon, label: "Stipend",    value: `${formatStipendRange(internship.stipendMin, internship.stipendMax)}/mo` },
                  { icon: UsersIcon,       label: "Seats",      value: `${internship.availableSeats} of ${internship.seats} available` },
                  { icon: CalendarIcon,    label: "Start",      value: formatDate(internship.startDate)           },
                  { icon: CalendarIcon,    label: "End",        value: formatDate(internship.endDate)             },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-2.5">
                    <Icon className="size-4 shrink-0 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">{label}</p>
                      <p className="text-sm font-medium text-foreground">{value}</p>
                    </div>
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
                <div className="flex flex-wrap gap-2">
                  {internship.requiredSkills.map((s) => (
                    <Badge key={s} variant="secondary">{s}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-sm">Eligibility</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <GraduationCapIcon className="size-4 text-muted-foreground" />
                <span className="text-muted-foreground">{internship.qualification}</span>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Eligible Branches</p>
                <div className="flex flex-wrap gap-1">
                  {internship.eligibleBranches.map((b) => (
                    <Badge key={b} variant="outline" className="text-xs">{b}</Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Minimum CGPA</span>
                <span className="text-sm font-semibold text-foreground">{internship.minimumCGPA}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Work Mode</span>
                <Badge variant="secondary">{internship.workMode}</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 space-y-2">
              <Button className="w-full" size="sm">Apply Now</Button>
              <LinkButton href={ROUTES.student.internships} variant="outline" size="sm" className="w-full">
                Back to Listings
              </LinkButton>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-xs text-muted-foreground space-y-1">
              <p>{internship.totalApplications} applications received</p>
              <p>{internship.shortlistedCount} shortlisted</p>
              <p>Sector: {internship.sector}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
