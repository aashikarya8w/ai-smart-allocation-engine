"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { EmptyState } from "@/components/common/EmptyState";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { mockStudents } from "@/data/students";
import { mockApplications } from "@/data/applications";
import { mockAllocations } from "@/data/allocations";
import { formatDate, formatCGPA, initials } from "@/lib/formatters";

interface PageProps { params: Promise<{ id: string }> }

export default function AdminStudentDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const student = mockStudents.find((s) => s.id === id);
  const apps = mockApplications.filter((a) => a.studentId === id);
  const allocs = mockAllocations.filter((a) => a.studentId === id);

  if (!student) return <EmptyState title="Student not found" />;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon-sm" onClick={() => router.back()}><ArrowLeftIcon className="size-4" /></Button>
        <PageHeader title={student.fullName} description="Student profile and history" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6 text-center">
              <Avatar className="mx-auto size-16"><AvatarFallback className="text-lg bg-primary/10 text-primary">{initials(student.fullName)}</AvatarFallback></Avatar>
              <h2 className="mt-3 text-sm font-semibold">{student.fullName}</h2>
              <p className="text-xs text-muted-foreground">{student.email}</p>
              <div className="mt-2 flex justify-center gap-2">
                <StatusBadge status={student.verificationStatus} />
                {!student.isActive && <StatusBadge status="Inactive" />}
              </div>
              <Separator className="my-3" />
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  ["University",  student.university],
                  ["Branch",      student.branch],
                  ["CGPA",        formatCGPA(student.cgpa)],
                  ["Grad Year",   student.graduationYear.toString()],
                  ["City",        student.city],
                  ["State",       student.state],
                ].map(([label, val]) => (
                  <div key={label} className="text-left">
                    <p className="text-muted-foreground">{label}</p>
                    <p className="font-medium text-foreground">{val}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 space-y-2">
              <Button variant="outline" size="sm" className="w-full">Verify Student</Button>
              <Button variant="destructive" size="sm" className="w-full">Deactivate</Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4 lg:col-span-2">
          <Card>
            <CardHeader><CardTitle className="text-sm">Skills</CardTitle></CardHeader>
            <CardContent><div className="flex flex-wrap gap-2">{student.skills.map((s) => <Badge key={s} variant="secondary">{s}</Badge>)}</div></CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-sm">Applications ({apps.length})</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {apps.length === 0 ? <p className="text-xs text-muted-foreground">No applications.</p> : apps.map((a) => (
                <div key={a.id} className="flex items-center justify-between rounded-lg border border-border/50 p-2.5">
                  <div><p className="text-sm font-medium">{a.internshipTitle}</p><p className="text-xs text-muted-foreground">{a.companyName} · {formatDate(a.appliedAt)}</p></div>
                  <div className="flex items-center gap-2"><span className="text-xs">{a.matchScore}%</span><StatusBadge status={a.status} /></div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-sm">Allocations ({allocs.length})</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {allocs.length === 0 ? <p className="text-xs text-muted-foreground">No allocations.</p> : allocs.map((a) => (
                <div key={a.id} className="flex items-center justify-between rounded-lg border border-border/50 p-2.5">
                  <div><p className="text-sm font-medium">{a.internshipTitle}</p><p className="text-xs text-muted-foreground">{a.companyName}</p></div>
                  <div className="flex items-center gap-2"><span className="text-xs">{a.matchScore}%</span><StatusBadge status={a.status} /></div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
