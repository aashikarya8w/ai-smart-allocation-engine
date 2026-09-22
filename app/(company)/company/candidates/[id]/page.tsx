"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon, MapPinIcon, GraduationCapIcon, LinkIcon } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { ScoreBar, ScoreCircle } from "@/components/common/ScoreBar";
import { EmptyState } from "@/components/common/EmptyState";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { mockStudents } from "@/data/students";
import { mockApplications } from "@/data/applications";
import { formatCGPA, initials } from "@/lib/formatters";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CandidateDetailPage({ params }: PageProps) {
  const { id }   = use(params);
  const router   = useRouter();
  const student  = mockStudents.find((s) => s.id === id);
  const apps     = mockApplications.filter((a) => a.studentId === id);
  const bestApp  = apps.sort((a, b) => b.matchScore - a.matchScore)[0];

  if (!student) return <EmptyState title="Candidate not found" />;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon-sm" onClick={() => router.back()}>
          <ArrowLeftIcon className="size-4" />
        </Button>
        <PageHeader title="Candidate Profile" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6 text-center">
              <Avatar className="mx-auto size-16">
                <AvatarFallback className="text-lg bg-primary/10 text-primary">
                  {initials(student.fullName)}
                </AvatarFallback>
              </Avatar>
              <h2 className="mt-3 text-sm font-semibold text-foreground">{student.fullName}</h2>
              <p className="text-xs text-muted-foreground">{student.email}</p>
              <div className="mt-2 flex justify-center">
                <StatusBadge status={student.verificationStatus} />
              </div>
              <Separator className="my-3" />
              <div className="space-y-1.5 text-left text-xs">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPinIcon className="size-3.5" />{student.city}, {student.state}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <GraduationCapIcon className="size-3.5" />{student.degree} – {student.branch}
                </div>
              </div>
              {student.linkedinUrl && (
                <>
                  <Separator className="my-3" />
                  <a href={student.linkedinUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 text-xs text-primary hover:underline">
                    <LinkIcon className="size-3" /> LinkedIn
                  </a>
                </>
              )}
            </CardContent>
          </Card>

          {bestApp && (
            <Card>
              <CardContent className="p-4 flex flex-col items-center gap-2">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Best Match Score</p>
                <ScoreCircle score={bestApp.matchScore} size="md" />
                <p className="text-xs text-muted-foreground text-center">{bestApp.internshipTitle}</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right */}
        <div className="space-y-4 lg:col-span-2">
          {/* Education */}
          <Card>
            <CardHeader><CardTitle className="text-sm">Education</CardTitle></CardHeader>
            <CardContent>
              {student.education.map((edu) => (
                <div key={edu.id} className="rounded-lg border border-border/50 p-3">
                  <p className="text-sm font-medium text-foreground">{edu.degree}</p>
                  <p className="text-xs text-muted-foreground">{edu.institution}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    CGPA: <strong className="text-foreground">{formatCGPA(edu.cgpa)}</strong> · {edu.startYear} – {edu.isCurrently ? "Present" : edu.endYear}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader><CardTitle className="text-sm">Skills</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {student.skills.map((s) => <Badge key={s} variant="secondary">{s}</Badge>)}
              </div>
            </CardContent>
          </Card>

          {/* Score breakdown if available */}
          {bestApp && (
            <Card>
              <CardHeader><CardTitle className="text-sm">Match Score Breakdown</CardTitle></CardHeader>
              <CardContent className="space-y-2.5">
                <ScoreBar label="Skill Match"   score={bestApp.scoreBreakdown.skillMatch}    />
                <ScoreBar label="Qualification" score={bestApp.scoreBreakdown.qualification} />
                <ScoreBar label="Location"      score={bestApp.scoreBreakdown.location}      />
                <ScoreBar label="Interest"      score={bestApp.scoreBreakdown.interest}      />
                <ScoreBar label="Experience"    score={bestApp.scoreBreakdown.experience}    />
              </CardContent>
            </Card>
          )}

          {/* Applications */}
          <Card>
            <CardHeader><CardTitle className="text-sm">Applications</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {apps.map((app) => (
                <div key={app.id} className="flex items-center justify-between rounded-lg border border-border/50 p-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">{app.internshipTitle}</p>
                    <p className="text-xs text-muted-foreground">Match: {app.matchScore}%</p>
                  </div>
                  <StatusBadge status={app.status} />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
