export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  demandScore: number; // 0-100
}

export type SkillCategory =
  | "Programming"
  | "Framework"
  | "Database"
  | "Cloud"
  | "DevOps"
  | "Design"
  | "Data Science"
  | "Soft Skills"
  | "Domain"
  | "Other";

export interface SkillGap {
  skillId: string;
  skillName: string;
  currentLevel: number; // 0-100
  requiredLevel: number; // 0-100
  gap: number; // requiredLevel - currentLevel
  resources: LearningResource[];
}

export interface LearningResource {
  title: string;
  type: "Course" | "Video" | "Article" | "Book" | "Project";
  url: string;
  duration?: string;
  isFree: boolean;
}
