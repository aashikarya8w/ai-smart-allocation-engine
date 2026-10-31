import { z } from "zod";

export const createApplicationSchema = z.object({
  internshipId: z.string().min(1),
  resumeId:     z.string().optional(),
});

export const updateStatusSchema = z.object({
  status: z.enum(["Applied","Shortlisted","Rejected","Waitlisted","Allocated","Withdrawn"]),
  notes:  z.string().optional(),
});
