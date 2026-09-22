"use client";

import { MapPinIcon, GraduationCapIcon, BriefcaseIcon, LinkIcon } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useStudent } from "@/hooks/useStudent";
import { EmptyState } from "@/components/common/EmptyState";
import { LinkButton } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";
import { initials, formatCGPA } from "@/lib/formatters";

export default function StudentProfilePage() {
  const { student } = useStudent();

  if (!student) return <EmptyState title="Profile not found" />;

  return (
    <div className="space-y-6">
      <PageHeader title="My Profile" description="Manage your personal and academic information.">
        <LinkButton href={ROUTES.student.settings} variant="outline" size="sm">
          Edit Profile
        </LinkButton>
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left — identity */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6 text-center">
              <Avatar className="mx-auto size-20">
                <AvatarFallback className="text-xl bg-primary/10 text-primary">
                  {initials(student.fullName)}
                </AvatarFallback>
              </Avatar>
              <h2 className="mt-3 text-base font-semibold text-foreground">{student.fullName}</h2>
              <p className="text-sm text-muted-foreground">{student.email}</p>
              <p className="text-xs text-muted-foreground">{student.phone}</p>
              <div className="mt-2 flex justify-center">
                <StatusBadge status={student.verificationStatus} />
              </div>

              <Separator className="my-4" />

              <div className="space-y-2 text-left text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPinIcon className="size-3.5 shrink-0" />
                  {student.city}, {student.state}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <GraduationCapIcon className="size-3.5 shrink-0" />
                  {student.degree} — {student.branch}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <BriefcaseIcon className="size-3.5 shrink-0" />
                  Class of {student.graduationYear}
                </div>
              </div>

              {(student.linkedinUrl || student.githubUrl) && (
                <>
                  <Separator className="my-4" />
                  <div className="space-y-2">
                    {student.linkedinUrl && (
                      <a href={student.linkedinUrl} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs text-primary hover:underline">
                        <LinkIcon className="size-3" /> LinkedIn
                      </a>
                    )}
                    {student.githubUrl && (
                      <a href={student.githubUrl} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs text-primary hover:underline">
                        <LinkIcon className="size-3" /> GitHub
                      </a>
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Profile completion */}
          <Card>
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-foreground">Profile Completion</span>
                <span className="text-primary font-semibold">{student.profileCompletion}%</span>
              </div>
              <Progress value={student.profileCompletion} className="h-2" />
            </CardContent>
          </Card>
        </div>

        {/* Right — details */}
        <div className="space-y-4 lg:col-span-2">
          {/* Education */}
          <Card>
            <CardHeader><CardTitle className="text-sm">Education</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {student.education.map((edu) => (
                <div key={edu.id} className="rounded-lg border border-border/50 p-3">
                  <p className="text-sm font-medium text-foreground">{edu.degree}</p>
                  <p className="text-xs text-muted-foreground">{edu.institution}</p>
                  <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                    <span>CGPA: <strong className="text-foreground">{formatCGPA(edu.cgpa)}</strong></span>
                    <span>{edu.startYear} – {edu.isCurrently ? "Present" : edu.endYear}</span>
                    {edu.isCurrently && (
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        Current
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader><CardTitle className="text-sm">Skills</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {student.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Interests */}
          <Card>
            <CardHeader><CardTitle className="text-sm">Interests</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {student.interests.map((interest) => (
                  <Badge key={interest} variant="outline">{interest}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card>
            <CardHeader><CardTitle className="text-sm">Preferences</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-1.5">Preferred Locations</p>
                <div className="flex flex-wrap gap-2">
                  {student.preferredLocations.map((loc) => (
                    <Badge key={loc} variant="secondary">{loc}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-1.5">Preferred Sectors</p>
                <div className="flex flex-wrap gap-2">
                  {student.preferredSectors.map((sec) => (
                    <Badge key={sec} variant="secondary">{sec}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-1">Work Mode</p>
                <Badge variant="outline">{student.workMode}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Previous Internships */}
          {student.previousInternships.length > 0 && (
            <Card>
              <CardHeader><CardTitle className="text-sm">Previous Internships</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {student.previousInternships.map((exp) => (
                  <div key={exp.id} className="rounded-lg border border-border/50 p-3">
                    <p className="text-sm font-medium text-foreground">{exp.role}</p>
                    <p className="text-xs text-muted-foreground">{exp.company} · {exp.duration} · {exp.year}</p>
                    {exp.description && (
                      <p className="mt-1 text-xs text-muted-foreground">{exp.description}</p>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
