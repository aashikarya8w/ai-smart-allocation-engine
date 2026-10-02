export interface ReadinessBreakdown {
  skillReadiness: number;
  assessmentReadiness: number;
  projectReadiness: number;
  qualificationReadiness: number;
  experienceReadiness: number;
  overallReadiness: number;
}

export interface ReadinessAction {
  id: string;
  action: string;
  category: "Skill" | "Assessment" | "Project" | "Experience" | "Qualification";
  currentImpact: number; // current readiness %
  projectedImpact: number; // readiness after this action
  improvementDelta: number;
  effort: "Low" | "Medium" | "High";
  priority: number; // 1 = highest
}

export interface ReadinessProfile {
  id: string;
  studentId: string;
  internshipId: string;
  internshipTitle: string;
  companyName: string;
  currentReadiness: number;
  breakdown: ReadinessBreakdown;
  actions: ReadinessAction[];
  calculatedAt: string;
}

export interface WhatIfSimulation {
  id: string;
  studentId: string;
  // changes applied
  addedSkills: string[];
  removedSkills: string[];
  newCgpa?: number;
  newLocation?: string;
  newWorkMode?: string;
  simulatedAssessmentScore?: number;
  addedProjects?: number;

  // results
  currentMatchScore: number;
  simulatedMatchScore: number;
  currentSuitability: number;
  simulatedSuitability: number;
  currentReadiness: number;
  simulatedReadiness: number;
  currentEligibleCount: number;
  simulatedEligibleCount: number;
  currentStrongMatches: number;
  simulatedStrongMatches: number;
  simulatedAt: string;
}
