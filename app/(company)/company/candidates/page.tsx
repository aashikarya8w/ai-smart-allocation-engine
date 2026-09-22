"use client";

import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { SearchInput } from "@/components/common/SearchInput";
import { ScoreCircle } from "@/components/common/ScoreBar";
import { StatusBadge } from "@/components/common/StatusBadge";
import { EmptyState } from "@/components/common/EmptyState";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { useCompany } from "@/hooks/useCompany";
import { mockStudents } from "@/data/students";

export default function CandidatesPage() {
  const { applications } = useCompany();
  const [search, setSearch] = useState("");

  const candidates = applications
    .map((app) => {
      const student = mockStudents.find((s) => s.id === app.studentId);
      return { app, student };
    })
    .filter(({ student, app }) => {
      if (!student) return false;
      if (!search) return true;
      return (
        student.fullName.toLowerCase().includes(search.toLowerCase()) ||
        student.branch.toLowerCase().includes(search.toLowerCase()) ||
        app.internshipTitle.toLowerCase().includes(search.toLowerCase())
      );
    });

  return (
    <div className="space-y-5">
      <PageHeader
        title="Candidates"
        description={`${candidates.length} candidate${candidates.length !== 1 ? "s" : ""}`}
      />

      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder="Search by name, branch, or role…"
        className="max-w-sm"
      />

      {candidates.length === 0 ? (
        <EmptyState title="No candidates found" description="Candidates who apply to your internships will appear here." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {candidates.map(({ app, student }) => {
            if (!student) return null;
            return (
              <Card key={app.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{student.fullName}</p>
                      <p className="text-xs text-muted-foreground">{student.degree} – {student.branch}</p>
                      <p className="text-xs text-muted-foreground">{student.university}</p>
                    </div>
                    <ScoreCircle score={app.matchScore} size="sm" />
                  </div>

                  <div className="space-y-1.5 mb-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">CGPA</span>
                      <span className="font-semibold text-foreground">{student.cgpa.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Location</span>
                      <span className="text-foreground">{student.city}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Applied for</span>
                      <span className="text-foreground truncate max-w-[120px]">{app.internshipTitle}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {student.skills.slice(0, 3).map((s) => (
                      <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-3 border-t border-border/50">
                    <StatusBadge status={app.status} />
                    <LinkButton href={`/company/candidates/${student.id}`} variant="outline" size="sm">
                      Profile
                    </LinkButton>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
