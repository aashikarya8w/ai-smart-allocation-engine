"use client";

import { MapPinIcon, GlobeIcon, PhoneIcon, MailIcon, BuildingIcon } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useCompany } from "@/hooks/useCompany";
import { EmptyState } from "@/components/common/EmptyState";
import { LinkButton } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";
import { initials } from "@/lib/formatters";

export default function CompanyProfilePage() {
  const { company, stats } = useCompany();

  if (!company) return <EmptyState title="Company profile not found" />;

  return (
    <div className="space-y-6">
      <PageHeader title="Company Profile" description="Your public company information.">
        <LinkButton href={ROUTES.company.settings} variant="outline" size="sm">Edit Profile</LinkButton>
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6 text-center">
              <Avatar className="mx-auto size-20">
                <AvatarFallback className="text-xl bg-primary/10 text-primary">
                  {initials(company.companyName)}
                </AvatarFallback>
              </Avatar>
              <h2 className="mt-3 text-base font-semibold text-foreground">{company.companyName}</h2>
              <p className="text-sm text-muted-foreground">{company.sector}</p>
              <div className="mt-2 flex justify-center">
                <StatusBadge status={company.verificationStatus} />
              </div>

              <Separator className="my-4" />

              <div className="space-y-2 text-left text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPinIcon className="size-3.5 shrink-0" />
                  {company.city}, {company.state}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <PhoneIcon className="size-3.5 shrink-0" />
                  {company.phone}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MailIcon className="size-3.5 shrink-0" />
                  {company.email}
                </div>
                {company.website && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <GlobeIcon className="size-3.5 shrink-0" />
                    <a href={company.website} target="_blank" rel="noopener noreferrer"
                      className="text-primary hover:underline truncate">{company.website}</a>
                  </div>
                )}
                <div className="flex items-center gap-2 text-muted-foreground">
                  <BuildingIcon className="size-3.5 shrink-0" />
                  Est. {company.establishedYear}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card>
            <CardContent className="p-4 space-y-3">
              {[
                { label: "Total Internships",  value: company.totalInternships  },
                { label: "Active Internships",  value: company.activeInternships  },
                { label: "Total Seats",         value: company.totalSeats         },
                { label: "Allocated Seats",     value: company.allocatedSeats     },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-semibold text-foreground">{value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right */}
        <div className="space-y-4 lg:col-span-2">
          <Card>
            <CardHeader><CardTitle className="text-sm">About</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">{company.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-sm">Details</CardTitle></CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-3 text-sm">
              {[
                { label: "Employee Count",  value: company.employeeCount            },
                { label: "Headquarters",    value: `${company.city}, ${company.state}` },
                { label: "Address",         value: company.address                  },
                { label: "Sector",          value: company.sector                   },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="font-medium text-foreground">{value}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
