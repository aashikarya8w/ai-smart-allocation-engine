"use client";

import { PlusIcon, UsersIcon, MapPinIcon, ClockIcon } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { EmptyState } from "@/components/common/EmptyState";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/button";
import { useCompany } from "@/hooks/useCompany";
import { formatStipendRange, formatDate } from "@/lib/formatters";
import { ROUTES } from "@/lib/constants";

export default function CompanyInternshipsPage() {
  const { internships } = useCompany();

  return (
    <div className="space-y-5">
      <PageHeader
        title="Internship Listings"
        description={`${internships.length} total listing${internships.length !== 1 ? "s" : ""}`}
      >
        <LinkButton href={ROUTES.company.createInternship} size="sm" className="gap-2">
          <PlusIcon className="size-4" /> Post Internship
        </LinkButton>
      </PageHeader>

      {internships.length === 0 ? (
        <EmptyState
          title="No internships yet"
          description="Post your first internship to start receiving applications."
        />
      ) : (
        <div className="space-y-3">
          {internships.map((i) => (
            <Card key={i.id} className="hover:shadow-sm transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold text-foreground">{i.title}</p>
                      <StatusBadge status={i.status} />
                      <Badge variant="secondary" className="text-xs">{i.workMode}</Badge>
                    </div>
                    <div className="mt-1.5 flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPinIcon className="size-3" />{i.city}, {i.state}
                      </span>
                      <span className="flex items-center gap-1">
                        <ClockIcon className="size-3" />{i.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <UsersIcon className="size-3" />
                        {i.totalApplications} applied · {i.availableSeats}/{i.seats} seats
                      </span>
                      <span>{formatStipendRange(i.stipendMin, i.stipendMax)}/mo</span>
                      <span>{formatDate(i.startDate)} – {formatDate(i.endDate)}</span>
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <LinkButton href={`/company/internships/${i.id}/applicants`} variant="outline" size="sm">
                      Applicants
                    </LinkButton>
                    <LinkButton href={`/company/internships/${i.id}`} variant="ghost" size="sm">
                      View
                    </LinkButton>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
