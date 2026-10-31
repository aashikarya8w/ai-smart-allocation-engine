export interface Education {
  id: string;
  degree: string;
  institution: string;
  branch: string;
  cgpa: number;
  startYear: number;
  endYear: number | null; // null if currently enrolled
  isCurrently: boolean;
}
