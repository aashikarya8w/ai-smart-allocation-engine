"use client";

import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/button";
import { useAdmin } from "@/hooks/useAdmin";
import { BrainCircuitIcon, UsersIcon, BriefcaseIcon, PlayIcon } from "lucide-react";
import { ROUTES } from "@/lib/constants";

export default function AIMatchingPage() {
  const { stats } = useAdmin();

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Matching Engine"
        description="Run AI-powered skill and preference matching for all eligible students."
      >
        <LinkButton href={ROUTES.admin.aiMatchingRun} size="sm" className="gap-2">
          <PlayIcon className="size-4" /> Run Matching
        </LinkButton>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard title="Total Candidates"  value={stats.totalStudents}           icon={UsersIcon}       />
        <StatCard title="Active Internships" value={stats.activeInternships}      icon={BriefcaseIcon}   />
        <StatCard title="Avg Match Score"   value={`${stats.averageMatchScore}%`} icon={BrainCircuitIcon}/>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-5 text-center">
            <BrainCircuitIcon className="mx-auto mb-3 size-8 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Run AI Matching</h3>
            <p className="mt-1 text-xs text-muted-foreground">Match students to internships using AI scoring engine.</p>
            <LinkButton href={ROUTES.admin.aiMatchingRun} size="sm" className="mt-3 w-full gap-2">
              <PlayIcon className="size-3.5" /> Start Run
            </LinkButton>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-5 text-center">
            <UsersIcon className="mx-auto mb-3 size-8 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">View Results</h3>
            <p className="mt-1 text-xs text-muted-foreground">Browse the latest AI matching results and scores.</p>
            <LinkButton href={ROUTES.admin.aiMatchingResults} variant="outline" size="sm" className="mt-3 w-full">
              View Results
            </LinkButton>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-5 text-center">
            <BriefcaseIcon className="mx-auto mb-3 size-8 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Matching Rules</h3>
            <p className="mt-1 text-xs text-muted-foreground">Configure weights and constraints for the matching engine.</p>
            <LinkButton href={ROUTES.admin.rulesMatching} variant="outline" size="sm" className="mt-3 w-full">
              Configure
            </LinkButton>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
