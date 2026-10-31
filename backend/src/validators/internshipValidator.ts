import { z } from "zod";

const internshipBase = z.object({
  title:               z.string().min(3).max(200),
  description:         z.string().min(20),
  sector:              z.string().min(1),
  requiredSkills:      z.array(z.string()).min(1),
  preferredSkills:     z.array(z.string()).optional().default([]),
  qualification:       z.string().min(1),
  eligibleBranches:    z.array(z.string()).optional().default([]),
  minimumCGPA:         z.number().min(0).max(10),
  state:               z.string().min(1),
  city:                z.string().min(1),
  workMode:            z.enum(["Remote","Hybrid","On-site"]),
  duration:            z.string().min(1),
  stipendMin:          z.number().min(0),
  stipendMax:          z.number().min(0),
  totalSeats:          z.number().min(1),
  startDate:           z.string(),
  endDate:             z.string(),
  applicationDeadline: z.string(),
});

export const createInternshipSchema = internshipBase.refine(
  d => d.stipendMax >= d.stipendMin,
  { message: "stipendMax must be >= stipendMin", path: ["stipendMax"] }
);

export const updateInternshipSchema = internshipBase.partial();
