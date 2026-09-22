"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { ScoreBar, ScoreCircle } from "@/components/common/ScoreBar";
import { EmptyState } from "@/components/common/EmptyState";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { mockApplications } from "@/data/applications";
import { mockStudents } from "@/data/students";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatCGPA } from "@/lib/formatters";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CompanyApplicationDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const router  = useRouter();
  const app     = mockApplications.find((a) => a.id === id);
  const student = app ? mockStudents.find((s) => s.id === app.studentId) : null;

  if (!app) return <EmptyState title="Application not found" />;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon-sm" onClick={() => router.back()}>
          <ArrowLeftIcon className="size-4" />
        </Button>
        <PageHeader title="Application Review" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {/* Application header */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <CardTitle>{app.studentName}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-0.5">Applied for: {app.internshipTitle}</p>
                  <p className="text-xs text-muted-foreground">Applied {formatDate(app.appliedAt)}</p>
                </div>
                <StatusBadge status={app.status} />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Separator />
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Score Breakdown</p>
                <div className="space-y-2.5">
                  <ScoreBar label="Skill Match"   score={app.scoreBreakdown.skillMatch}    />
                  <ScoreBar label="Qualification" score={app.scoreBreakdown.qualification} />
                  <ScoreBar label="Location"      score={app.scoreBreakdown.location}      />
                  <ScoreBar label="Interest"      score={app.scoreBreakdown.interest}      />
                  <ScoreBar label="Experience"    score={app.scoreBreakdown.experience}    />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Candidate profile */}
          {student && (
            <Card>
              <CardHeader><CardTitle className="text-sm">Candidate Profile</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div><p className="text-xs text-muted-foreground">University</p><p className="font-medium">{student.university}</p></div>
                  <div><p className="text-xs text-muted-foreground">Branch</p><p className="font-medium">{student.branch}</p></div>
                  <div><p className="text-xs text-muted-foreground">CGPA</p><p className="font-medium">{formatCGPA(student.cgpa)}</p></div>
                  <div><p className="text-xs text-muted-foreground">Graduation</p><p className="font-medium">{student.graduationYear}</p></div>
                  <div><p className="text-xs text-muted-foreground">Location</p><p className="font-medium">{student.city}, {student.state}</p></div>
                  <div><p className="text-xs text-muted-foreground">Work Mode</p><p className="font-medium">{student.workMode}</p></div>
                </div>
                <Separator />
                <div>
                  <p className="mb-2 text-xs text-muted-foreground">Skills</p>
                  <div className="flex flex-wrap gap-1.5">
                    {student.skills.map((s) => <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>)}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-5 flex flex-col items-center gap-2">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Match Score</p>
              <ScoreCircle score={app.matchScore} size="lg" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 space-y-2">
              <Button className="w-full" size="sm" disabled={app.status !== "Applied"}>
                Shortlist
              </Button>
              <Button variant="destructive" size="sm" className="w-full" disabled={app.status === "Rejected"}>
                Reject
              </Button>
              <Button variant="outline" size="sm" className="w-full" onClick={() => router.back()}>
                Back
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
