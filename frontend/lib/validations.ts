import { z } from "zod";

/* ── Auth ───────────────────────────────────────────────── */
export const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["student", "company", "admin"]),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Enter a valid email address"),
    phone: z
      .string()
      .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[0-9]/, "Must contain at least one number"),
    confirmPassword: z.string(),
    role: z.enum(["student", "company"]),
    agreeTerms: z.boolean().refine((v) => v, "You must agree to the terms"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[0-9]/, "Must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

/* ── Student Profile ────────────────────────────────────── */
export const studentProfileSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["Male", "Female", "Other", "Prefer not to say"]),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  university: z.string().min(2, "University is required"),
  branch: z.string().min(2, "Branch is required"),
  degree: z.string().min(2, "Degree is required"),
  cgpa: z
    .number()
    .min(0, "CGPA must be between 0 and 10")
    .max(10, "CGPA must be between 0 and 10"),
  graduationYear: z
    .number()
    .min(2020, "Invalid year")
    .max(2030, "Invalid year"),
  skills: z.array(z.string()).min(1, "Add at least one skill"),
  preferredLocations: z
    .array(z.string())
    .min(1, "Select at least one preferred location"),
  preferredSectors: z
    .array(z.string())
    .min(1, "Select at least one preferred sector"),
  workMode: z.enum(["Remote", "Hybrid", "On-site", "Any"]),
});

/* ── Company Profile ────────────────────────────────────── */
export const companyProfileSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  website: z.string().url("Enter a valid URL").optional().or(z.literal("")),
  sector: z.string().min(1, "Sector is required"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  address: z.string().min(5, "Address is required"),
  employeeCount: z.string().min(1, "Employee count is required"),
  establishedYear: z
    .number()
    .min(1900, "Invalid year")
    .max(new Date().getFullYear(), "Invalid year"),
});

/* ── Internship ─────────────────────────────────────────── */
export const internshipSchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z
    .string()
    .min(50, "Description must be at least 50 characters"),
  sector: z.string().min(1, "Sector is required"),
  requiredSkills: z
    .array(z.string())
    .min(1, "At least one skill is required"),
  qualification: z.string().min(1, "Qualification is required"),
  eligibleBranches: z.array(z.string()).min(1, "Select at least one branch"),
  minimumCGPA: z.number().min(0).max(10),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  workMode: z.enum(["Remote", "Hybrid", "On-site"]),
  duration: z.string().min(1, "Duration is required"),
  stipendMin: z.number().min(0),
  stipendMax: z.number().min(0),
  seats: z.number().min(1, "At least 1 seat is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type StudentProfileFormData = z.infer<typeof studentProfileSchema>;
export type CompanyProfileFormData = z.infer<typeof companyProfileSchema>;
export type InternshipFormData = z.infer<typeof internshipSchema>;
