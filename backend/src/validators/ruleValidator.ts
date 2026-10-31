import { z } from "zod";

export const updateWeightsSchema = z.object({
  skillMatch:    z.number().min(0).max(100),
  qualification: z.number().min(0).max(100),
  location:      z.number().min(0).max(100),
  interest:      z.number().min(0).max(100),
  experience:    z.number().min(0).max(100),
}).refine(d => {
  const sum = d.skillMatch + d.qualification + d.location + d.interest + d.experience;
  return sum === 100;
}, { message: "Weights must sum to 100" });

export const updateEligibilitySchema = z.object({
  minimumCGPA:         z.number().min(0).max(10),
  minimumSkills:       z.number().min(0),
  requireResume:       z.boolean(),
  requireVerification: z.boolean(),
  allowedBranches:     z.array(z.string()),
});
