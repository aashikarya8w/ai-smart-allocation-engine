"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon, MapPinIcon, CalendarIcon, IndianRupeeIcon, CheckIcon, DownloadIcon } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { ScoreBar, ScoreCircle } from "@/components/common/ScoreBar";
import { EmptyState } from "@/components/common/EmptyState";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { mockAllocations } from "@/data/allocations";
import { formatDate, formatStipend } from "@/lib/formatters";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function AllocationDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const router  = useRouter();
  const al      = mockAllocations.find((a) => a.id === id);

  if (!al) return <EmptyState title="Allocation not found" />;

  const isApproved = al.status === "Approved";

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon-sm" onClick={() => router.back()}>
          <ArrowLeftIcon className="size-4" />
        </Button>
        <PageHeader title="Allocation Details" />
      </div>

      {/* Congratulations banner */}
      {isApproved && (
        <div className="rounded-xl border border-green-200 bg-green-50 p-5 dark:border-green-800/30 dark:bg-green-900/10">
          <p className="text-base font-semibold text-green-800 dark:text-green-300">
            🎉 Congratulations! You&apos;ve been allocated an internship.
          </p>
          <p className="mt-1 text-sm text-green-700 dark:text-green-400">
            Your allocation has been approved. Please review the details below and prepare accordingly.
          </p>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {/* Internship details */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <CardTitle>{al.internshipTitle}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-0.5">{al.companyName}</p>
                </div>
                <StatusBadge status={al.status} />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { icon: MapPinIcon,      label: "Location",  value: al.location                          },
                  { icon: MapPinIcon,      label: "Work Mode", value: al.workMode                          },
                  { icon: CalendarIcon,    label: "Start",     value: formatDate(al.startDate)             },
                  { icon: CalendarIcon,    label: "End",       value: formatDate(al.endDate)               },
                  { icon: IndianRupeeIcon, label: "Stipend",   value: `${formatStipend(al.stipend)}/month` },
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

              {/* Score breakdown */}
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Score Breakdown
                </p>
                <div className="space-y-2.5">
                  <ScoreBar label="Skill Match"   score={al.scoreBreakdown.skillMatch}    />
                  <ScoreBar label="Qualification" score={al.scoreBreakdown.qualification} />
                  <ScoreBar label="Location"      score={al.scoreBreakdown.location}      />
                  <ScoreBar label="Interest"      score={al.scoreBreakdown.interest}      />
                  <ScoreBar label="Experience"    score={al.scoreBreakdown.experience}    />
                </div>
              </div>

              <Separator />

              {/* Selection reasons */}
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Why You Were Selected
                </p>
                <ul className="space-y-1.5">
                  {al.selectionReasons.map((reason) => (
                    <li key={reason} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckIcon className="size-3.5 shrink-0 text-green-500" />
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Next steps */}
          {isApproved && (
            <Card>
              <CardHeader><CardTitle className="text-sm">Next Steps</CardTitle></CardHeader>
              <CardContent>
                <ol className="space-y-3">
                  {[
                    "Download your allocation letter below",
                    "Contact the company HR to confirm your joining",
                    "Complete any required documentation",
                    "Report to the internship location on the start date",
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-5 flex flex-col items-center gap-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Match Score</p>
              <ScoreCircle score={al.matchScore} size="lg" />
            </CardContent>
          </Card>

          {isApproved && (
            <Card>
              <CardContent className="p-4 space-y-2">
                <Button className="w-full gap-2" size="sm">
                  <DownloadIcon className="size-4" />
                  Download Allocation Letter
                </Button>
                <Button variant="outline" size="sm" className="w-full" onClick={() => router.back()}>
                  Back
                </Button>
              </CardContent>
            </Card>
          )}

          {al.reviewedBy && (
            <Card>
              <CardContent className="p-4 text-xs text-muted-foreground space-y-1">
                <p>Reviewed by: <strong className="text-foreground">{al.reviewedBy}</strong></p>
                {al.reviewedAt && <p>On: {formatDate(al.reviewedAt)}</p>}
                {al.reviewNotes && <p className="mt-1">{al.reviewNotes}</p>}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
