"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { ScoreCircle } from "@/components/common/ScoreBar";
import { EmptyState } from "@/components/common/EmptyState";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/button";
import { mockApplications } from "@/data/applications";
import { mockInternships } from "@/data/internships";
import { formatRelativeTime } from "@/lib/formatters";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function InternshipApplicantsPage({ params }: PageProps) {
  const { id } = use(params);
  const router  = useRouter();
  const internship = mockInternships.find((i) => i.id === id);
  const applicants = mockApplications.filter((a) => a.internshipId === id);

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon-sm" onClick={() => router.back()}>
          <ArrowLeftIcon className="size-4" />
        </Button>
        <PageHeader
          title={internship ? `Applicants – ${internship.title}` : "Applicants"}
          description={`${applicants.length} application${applicants.length !== 1 ? "s" : ""}`}
        />
      </div>

      {applicants.length === 0 ? (
        <EmptyState title="No applicants yet" description="Applications will appear here once students apply." />
      ) : (
        <div className="space-y-3">
          {[...applicants].sort((a, b) => b.matchScore - a.matchScore).map((app) => (
            <Card key={app.id} className="hover:shadow-sm transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground">{app.studentName}</p>
                    <p className="text-xs text-muted-foreground">Applied {formatRelativeTime(app.appliedAt)}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <ScoreCircle score={app.matchScore} size="sm" />
                    <StatusBadge status={app.status} />
                    <LinkButton href={`/company/applications/${app.id}`} variant="outline" size="sm">
                      Review
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
