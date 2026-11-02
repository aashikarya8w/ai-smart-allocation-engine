"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EyeIcon,
  EyeOffIcon,
  Loader2Icon,
  ArrowRightIcon,
  GraduationCapIcon,
  BuildingIcon,
  SparklesIcon,
  CheckCircle2Icon,
  ShieldCheckIcon,
  TargetIcon,
  TrendingUpIcon,
  UserIcon,
  MailIcon,
  PhoneIcon,
  LockKeyholeIcon,
  ZapIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { Logo } from "@/components/common/Logo";
import { GoogleAuthButton } from "@/components/auth/GoogleAuthButton";

import { registerSchema, type RegisterFormData } from "@/lib/validations";
import { registerService } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";
import { ROLE_HOME } from "@/lib/permissions";
import { ROUTES, SCHEME_CODE } from "@/lib/constants";

export default function RegisterPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"student" | "company">("student");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "student",
      agreeTerms: true,
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const passwordVal = watch("password") || "";
  const hasMinLength = passwordVal.length >= 8;
  const hasUppercase = /[A-Z]/.test(passwordVal);
  const hasNumber = /[0-9]/.test(passwordVal);

  function handleRoleChange(r: "student" | "company") {
    setSelectedRole(r);
    setValue("role", r, { shouldValidate: true, shouldDirty: true });
    setServerError("");
  }

  function handleQuickFillDemo(r: "student" | "company") {
    handleRoleChange(r);
    if (r === "student") {
      setValue("name", "Aashik Kumar", { shouldValidate: true });
      setValue("email", `aashik.student${Date.now().toString().slice(-4)}@example.com`, { shouldValidate: true });
      setValue("phone", "9876543210", { shouldValidate: true });
      setValue("password", "InternAI@2026", { shouldValidate: true });
      setValue("confirmPassword", "InternAI@2026", { shouldValidate: true });
      setValue("agreeTerms", true, { shouldValidate: true });
    } else {
      setValue("name", "TechNova Solutions India", { shouldValidate: true });
      setValue("email", `hr.technova${Date.now().toString().slice(-4)}@technova.com`, { shouldValidate: true });
      setValue("phone", "9876543211", { shouldValidate: true });
      setValue("password", "Company@2026", { shouldValidate: true });
      setValue("confirmPassword", "Company@2026", { shouldValidate: true });
      setValue("agreeTerms", true, { shouldValidate: true });
    }
  }

  async function onSubmit(data: RegisterFormData) {
    setIsLoading(true);
    setServerError("");
    try {
      const user = await registerService({ ...data, role: selectedRole });
      login(user);
      router.push(ROLE_HOME[user.role]);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#07090e] overflow-hidden text-white">
      
      {/* Background Solar Amber Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -top-32 -left-32 h-[600px] w-[600px] rounded-full blur-[140px] opacity-25"
          style={{ background: "radial-gradient(circle, var(--theme-color, #f97316) 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-32 -right-32 h-[600px] w-[600px] rounded-full blur-[140px] opacity-20"
          style={{ background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)" }}
        />
        <div className="cyber-dots absolute inset-0 opacity-30" />
      </div>

      {/* Top Navigation Bar with Logo and Theme Studio Switcher */}
      <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-8 sm:right-8 flex items-center justify-between z-20">
        <Logo href="/" />
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href={ROUTES.login}
            className="rounded-xl border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-slate-200 backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/30"
          >
            Sign In
          </Link>
        </div>
      </div>

      {/* Main Split-Screen Container */}
      <div className="w-full max-w-5xl pt-16 pb-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        
        {/* Left Column: Platform Highlights & Trust Badges */}
        <div className="lg:col-span-5 space-y-6 hidden lg:block">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-400 backdrop-blur-md">
            <SparklesIcon className="size-3.5 text-orange-400 animate-pulse" />
            <span>{SCHEME_CODE} · National Onboarding</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Launch Your Career <br />
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
              With AI-Driven Precision
            </span>
          </h1>

          <p className="text-sm text-slate-300/90 leading-relaxed">
            Join thousands of undergraduates and corporate employers participating in the
            Prime Minister&rsquo;s Internship Scheme. Benefit from explainable match scores,
            automatic ATS diagnosis, and guaranteed stipend tracking.
          </p>

          {/* Feature Highlights */}
          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur-sm">
              <div className="rounded-xl bg-orange-500/10 p-2 text-orange-400">
                <TargetIcon className="size-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Smart Match Engine</p>
                <p className="text-[11px] text-slate-400">Multi-objective matching across 24 industry sectors with transparent compatibility breakdown.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur-sm">
              <div className="rounded-xl bg-blue-500/10 p-2 text-blue-400">
                <TrendingUpIcon className="size-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Autonomous Skill Gap Analyzer</p>
                <p className="text-[11px] text-slate-400">Turns rejection into learning with curated roadmaps, estimated completion time, and free courses.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur-sm">
              <div className="rounded-xl bg-emerald-500/10 p-2 text-emerald-400">
                <ShieldCheckIcon className="size-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">GPS-Verified Smart Check-In</p>
                <p className="text-[11px] text-slate-400">Anti-proxy joining verification enabling prompt Direct Benefit Transfer (DBT) stipend payments.</p>
              </div>
            </div>
          </div>

          {/* Quick Demo Pre-Fill Helper */}
          <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-3.5 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-300 font-semibold">
              <span className="flex items-center gap-1.5 text-orange-400">
                <ZapIcon className="size-3.5" />
                <span>Evaluation Quick-Fill</span>
              </span>
              <span className="text-[10px] text-slate-500">1-Click Test</span>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleQuickFillDemo("student")}
                className="flex-1 rounded-lg border border-white/10 bg-white/5 py-1.5 text-[11px] font-medium text-slate-300 hover:bg-orange-500/20 hover:border-orange-500/40 hover:text-white transition-all"
              >
                🎓 Fill Student
              </button>
              <button
                type="button"
                onClick={() => handleQuickFillDemo("company")}
                className="flex-1 rounded-lg border border-white/10 bg-white/5 py-1.5 text-[11px] font-medium text-slate-300 hover:bg-blue-500/20 hover:border-blue-500/40 hover:text-white transition-all"
              >
                🏢 Fill Company
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Modern Glassmorphic Form Card */}
        <div className="lg:col-span-7 w-full max-w-xl mx-auto">
          <div className="rounded-3xl border border-white/15 bg-[#0c101c]/85 p-6 sm:p-8 backdrop-blur-2xl shadow-[0_20px_70px_rgba(0,0,0,0.65)] relative overflow-hidden">
            
            {/* Top Glowing Ambient Edge */}
            <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-gradient-to-r from-orange-500/30 to-amber-500/30 blur-2xl rounded-full" />

            <div className="mb-6 text-center sm:text-left">
              <h2 className="text-2xl font-black tracking-tight text-white">
                Create Your Account
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                Select your role to get started with the InternAI Platform
              </p>
            </div>

            {/* Role Selection Tabs */}
            <div className="grid grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-white/5 p-1 mb-6">
              <button
                type="button"
                onClick={() => handleRoleChange("student")}
                className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition-all ${
                  selectedRole === "student"
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.4)]"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <GraduationCapIcon className="size-4" />
                <span>I&rsquo;m a Student</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange("company")}
                className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition-all ${
                  selectedRole === "company"
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <BuildingIcon className="size-4" />
                <span>I&rsquo;m a Company</span>
              </button>
            </div>

            {/* Google Registration Option */}
            <div className="mt-5">
              <GoogleAuthButton
                role={selectedRole}
                actionType="register"
                dividerText="Or register with email"
                onError={(err) => setServerError(err)}
              />
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input type="hidden" value={selectedRole} {...register("role")} />

              {/* Full Name / Company Name */}
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-xs font-medium text-slate-300">
                  {selectedRole === "company" ? "Company / Organization Name" : "Full Name (as per Academic Records)"}
                </Label>
                <div className="relative">
                  <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
                  <Input
                    id="name"
                    placeholder={selectedRole === "company" ? "TechNova Solutions Pvt Ltd" : "Aashik Kumar"}
                    className="pl-10 h-11 bg-white/5 border-white/10 text-white text-xs placeholder:text-slate-500 rounded-xl focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    {...register("name")}
                    aria-invalid={!!errors.name}
                  />
                </div>
                {errors.name && (
                  <p className="text-xs text-rose-400">{errors.name.message}</p>
                )}
              </div>

              {/* Email & Phone (Grid on sm screens) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Email */}
                <div className="space-y-1.5">
                  <Label htmlFor="reg-email" className="text-xs font-medium text-slate-300">
                    Official Email
                  </Label>
                  <div className="relative">
                    <MailIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
                    <Input
                      id="reg-email"
                      type="email"
                      placeholder={selectedRole === "company" ? "hr@technova.com" : "student@example.com"}
                      autoComplete="email"
                      className="pl-10 h-11 bg-white/5 border-white/10 text-white text-xs placeholder:text-slate-500 rounded-xl focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      {...register("email")}
                      aria-invalid={!!errors.email}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-rose-400">{errors.email.message}</p>
                  )}
                </div>

                {/* Mobile Phone */}
                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-xs font-medium text-slate-300">
                    Mobile Number (10 Digits)
                  </Label>
                  <div className="relative">
                    <PhoneIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="9876543210"
                      maxLength={10}
                      className="pl-10 h-11 bg-white/5 border-white/10 text-white text-xs placeholder:text-slate-500 rounded-xl focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      {...register("phone")}
                      aria-invalid={!!errors.phone}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-xs text-rose-400">{errors.phone.message}</p>
                  )}
                </div>

              </div>

              {/* Password & Confirm Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Password */}
                <div className="space-y-1.5">
                  <Label htmlFor="reg-password" className="text-xs font-medium text-slate-300">
                    Password
                  </Label>
                  <div className="relative">
                    <LockKeyholeIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
                    <Input
                      id="reg-password"
                      type={showPw ? "text" : "password"}
                      placeholder="Min 8 chars"
                      className="pl-10 pr-10 h-11 bg-white/5 border-white/10 text-white text-xs placeholder:text-slate-500 rounded-xl focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      {...register("password")}
                      aria-invalid={!!errors.password}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw(!showPw)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                      aria-label={showPw ? "Hide" : "Show"}
                    >
                      {showPw ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs text-rose-400">{errors.password.message}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-1.5">
                  <Label htmlFor="confirmPassword" className="text-xs font-medium text-slate-300">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <LockKeyholeIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
                    <Input
                      id="confirmPassword"
                      type={showConfirm ? "text" : "password"}
                      placeholder="Re-enter password"
                      className="pl-10 pr-10 h-11 bg-white/5 border-white/10 text-white text-xs placeholder:text-slate-500 rounded-xl focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      {...register("confirmPassword")}
                      aria-invalid={!!errors.confirmPassword}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                      aria-label={showConfirm ? "Hide" : "Show"}
                    >
                      {showConfirm ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-xs text-rose-400">{errors.confirmPassword.message}</p>
                  )}
                </div>

              </div>

              {/* Password Requirements Live Indicator */}
              <div className="flex flex-wrap items-center gap-3 py-1 text-[11px] text-slate-400">
                <span className={`inline-flex items-center gap-1 ${hasMinLength ? "text-emerald-400" : "text-slate-500"}`}>
                  <CheckCircle2Icon className="size-3" /> 8+ chars
                </span>
                <span className={`inline-flex items-center gap-1 ${hasUppercase ? "text-emerald-400" : "text-slate-500"}`}>
                  <CheckCircle2Icon className="size-3" /> 1 uppercase
                </span>
                <span className={`inline-flex items-center gap-1 ${hasNumber ? "text-emerald-400" : "text-slate-500"}`}>
                  <CheckCircle2Icon className="size-3" /> 1 number
                </span>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-2.5 pt-1">
                <Checkbox
                  id="terms"
                  defaultChecked
                  onCheckedChange={(checked) => setValue("agreeTerms", checked === true)}
                  className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                />
                <Label htmlFor="terms" className="text-xs text-slate-300 leading-snug cursor-pointer">
                  I agree to the{" "}
                  <Link href="#" className="text-orange-400 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="text-orange-400 hover:underline">
                    Privacy Policy
                  </Link>{" "}
                  under the PM Internship Scheme.
                </Label>
              </div>
              {errors.agreeTerms && (
                <p className="text-xs text-rose-400">{errors.agreeTerms.message}</p>
              )}

              {/* Server Error */}
              {serverError && (
                <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-400">
                  {serverError}
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 font-bold text-white shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] hover:scale-[1.01]"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2Icon className="size-4 animate-spin" />
                    <span>Creating your profile…</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <span>Complete Registration</span>
                    <ArrowRightIcon className="size-4" />
                  </span>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-xs text-slate-400">
              Already have an account?{" "}
              <Link href={ROUTES.login} className="font-bold text-orange-400 hover:underline">
                Sign In here
              </Link>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}