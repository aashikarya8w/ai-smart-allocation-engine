export interface Resume {
  id: string;
  studentId: string;
  fileUrl: string;
  fileName: string;
  fileSize: number;
  uploadedAt: string;
  isAnalyzed: boolean;

  analysis?: ResumeAnalysis;
}

export interface ResumeAnalysis {
  extractedSkills: string[];
  education: ExtractedEducation[];
  experience: ExtractedExperience[];
  projects: ExtractedProject[];
  certifications: ExtractedCertification[];
  summary: string;
  overallScore: number;
  suggestions: string[];
}

export interface ExtractedEducation {
  degree: string;
  institution: string;
  year: string;
  score?: string;
}

export interface ExtractedExperience {
  company: string;
  role: string;
  duration: string;
  description: string;
}

export interface ExtractedProject {
  title: string;
  description: string;
  technologies: string[];
  url?: string;
}

export interface ExtractedCertification {
  title: string;
  issuer: string;
  year: string;
  url?: string;
}
