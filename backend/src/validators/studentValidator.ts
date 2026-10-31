import { z } from "zod";

export const updateProfileSchema = z.object({
  fullName:           z.string().min(2).max(100).optional(),
  phone:              z.string().optional(),
  dateOfBirth:        z.string().optional(),
  gender:             z.enum(["Male","Female","Other","Prefer not to say"]).optional(),
  state:              z.string().optional(),
  city:               z.string().optional(),
  pincode:            z.string().optional(),
  university:         z.string().optional(),
  branch:             z.string().optional(),
  degree:             z.string().optional(),
  cgpa:               z.number().min(0).max(10).optional(),
  graduationYear:     z.number().min(2000).max(2035).optional(),
  linkedinUrl:        z.string().url().optional().or(z.literal("")),
  githubUrl:          z.string().url().optional().or(z.literal("")),
  preferredWorkMode:  z.enum(["Remote","Hybrid","On-site"]).optional(),
  preferredLocations: z.array(z.string()).optional(),
  preferredSectors:   z.array(z.string()).optional(),
  interests:          z.array(z.string()).optional(),
});

export const updateSkillsSchema = z.object({
  skills: z.array(z.object({
    name:              z.string().min(1),
    level:             z.enum(["Beginner","Intermediate","Advanced","Expert"]).default("Intermediate"),
    yearsOfExperience: z.number().min(0).default(0),
  })),
});

export const updateEducationSchema = z.object({
  education: z.array(z.object({
    degree:      z.string().min(1),
    branch:      z.string().min(1),
    institution: z.string().min(1),
    cgpa:        z.number().min(0).max(10),
    startYear:   z.number().min(1990).max(2035),
    endYear:     z.number().min(1990).max(2035).optional(),
    isCurrently: z.boolean().default(false),
  })),
});
