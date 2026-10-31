"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon, CheckIcon } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { ScoreBar, ScoreCircle } from "@/components/common/ScoreBar";
import { EmptyState } from "@/components/common/EmptyState";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { mockAllocations } from "@/data/allocations";
import { formatDate, formatStipend } from "@/lib/formatters";

interface PageProps { params: Promise<{ id: string }> }

export default function AdminAllocationDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const al = mockAllocations.find((a) => a.id === id);

  if (!al) return <EmptyState title="Allocation not found" />;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon-sm" onClick={() => router.back()}><ArrowLeftIcon className="size-4" /></Button>
        <PageHeader title="Allocation Review" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <CardTitle className="text-sm">{al.studentName}</CardTitle>
                  <p className="text-xs text-muted-foreground">{al.internshipTitle} · {al.companyName}</p>
                </div>
                <StatusBadge status={al.status} />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                {[
                  ["Location",  al.location],
                  ["Work Mode", al.workMode],
                  ["Start",     formatDate(al.startDate)],
                  ["End",       formatDate(al.endDate)],
                  ["Stipend",   `${formatStipend(al.stipend)}/mo`],
                ].map(([label, val]) => (
                  <div key={String(label)}><p className="text-xs text-muted-foreground">{label}</p><p className="font-medium">{val}</p></div>
                ))}
              </div>
              <Separator />
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Score Breakdown</p>
                <div className="space-y-2.5">
                  <ScoreBar label="Skill Match"   score={al.scoreBreakdown.skillMatch}    />
                  <ScoreBar label="Qualification" score={al.scoreBreakdown.qualification} />
                  <ScoreBar label="Location"      score={al.scoreBreakdown.location}      />
                  <ScoreBar label="Interest"      score={al.scoreBreakdown.interest}      />
                  <ScoreBar label="Experience"    score={al.scoreBreakdown.experience}    />
                </div>
              </div>
              <Separator />
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Selection Reasons</p>
                <ul className="space-y-1.5">
                  {al.selectionReasons.map((r) => (
                    <li key={r} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckIcon className="size-3.5 shrink-0 text-green-500" />{r}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardContent className="p-5 flex flex-col items-center gap-2">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Match Score</p>
              <ScoreCircle score={al.matchScore} size="lg" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 space-y-2">
              {(al.status === "Recommended" || al.status === "Pending") && (
                <>
                  <Button className="w-full" size="sm">Approve Allocation</Button>
                  <Button variant="destructive" size="sm" className="w-full">Reject Allocation</Button>
                </>
              )}
              <Button variant="outline" size="sm" className="w-full" onClick={() => router.back()}>Back</Button>
            </CardContent>
          </Card>
          {al.reviewedBy && (
            <Card>
              <CardContent className="p-4 text-xs text-muted-foreground space-y-1">
                <p>Reviewed by: <strong className="text-foreground">{al.reviewedBy}</strong></p>
                {al.reviewedAt && <p>{formatDate(al.reviewedAt)}</p>}
                {al.reviewNotes && <p className="mt-1">{al.reviewNotes}</p>}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
