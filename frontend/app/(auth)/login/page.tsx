"use client";

import { useState } from "react";
import type { ElementType } from "react";
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
  ShieldIcon,
  CopyIcon,
  CheckIcon,
  TargetIcon,
  UsersIcon,
  BarChart3Icon,
  MailIcon,
  LockKeyholeIcon,
  SparklesIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/common/ThemeToggle";

import {
  loginSchema,
  type LoginFormData,
} from "@/lib/validations";

import { loginService } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";
import { ROLE_HOME } from "@/lib/permissions";
import { demoCredentials } from "@/data/users";
import { ROUTES } from "@/lib/constants";

import type { UserRole } from "@/types/user";
import { GoogleAuthButton } from "@/components/auth/GoogleAuthButton";

const ROLES: {
  value: UserRole;
  label: string;
  icon: ElementType;
}[] = [
  {
    value: "student",
    label: "Student",
    icon: GraduationCapIcon,
  },
  {
    value: "company",
    label: "Company",
    icon: BuildingIcon,
  },
  {
    value: "admin",
    label: "Admin",
    icon: ShieldIcon,
  },
];

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  const [showPw, setShowPw] = useState(false);
  const [serverErr, setServerErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<UserRole | null>(null);
  const [selectedRole, setSelectedRole] = useState<UserRole>("company");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      role: "company",
      email: demoCredentials.company.email,
      password: demoCredentials.company.password,
    },
  });

  function handleRoleSelect(r: UserRole) {
    setSelectedRole(r);
    setValue("role", r, { shouldValidate: true, shouldDirty: true });
    const c = demoCredentials[r];
    if (c) {
      setValue("email", c.email, { shouldValidate: true });
      setValue("password", c.password, { shouldValidate: true });
    }
    setServerErr("");
  }

  async function onSubmit(data: LoginFormData) {
    setLoading(true);
    setServerErr("");

    try {
      const user = await loginService({
        ...data,
        role: selectedRole,
      });

      login(user);
      router.push(ROLE_HOME[user.role]);
    } catch (e) {
      setServerErr(
        e instanceof Error
          ? e.message
          : "Login failed."
      );
    } finally {
      setLoading(false);
    }
  }

  function fillDemo(r: UserRole) {
    handleRoleSelect(r);
    setCopied(r);

    setTimeout(() => {
      setCopied(null);
    }, 1500);
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-background px-4 py-8">
      
      {/* Background Glow Orbs */}
      <div className="pointer-events-none absolute -top-40 -right-40 size-[600px] rounded-full bg-primary/20 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 size-[600px] rounded-full bg-orange-600/15 blur-[140px]" />
      <div className="cyber-dots pointer-events-none absolute inset-0 opacity-25" />

      {/* Floating Theme Controller in Top Right */}
      <div className="absolute top-5 right-6 z-20 flex items-center gap-3">
        <ThemeToggle />
      </div>

      {/* Main Container */}
      <div className="relative z-10 flex w-full max-w-[1300px] items-center justify-center gap-12 mx-auto">
        
        {/* Left Content (Desktop) */}
        <section className="hidden lg:flex w-[320px] shrink-0 flex-col justify-center space-y-6">
          <h1 className="text-4xl font-black leading-tight tracking-tight text-foreground">
            Find the <br />
            <span className="bg-gradient-to-r from-primary via-orange-400 to-amber-400 bg-clip-text text-transparent">
              Right Internship
            </span> <br />
            for Your Future
          </h1>

          <p className="text-sm leading-relaxed text-muted-foreground">
            AI-powered matching, fair quota allocation and verified corporate opportunities — all in one centralized platform.
          </p>

          <div className="space-y-4 pt-2">
            <Feature
              icon={TargetIcon}
              title="Smart Matching"
              description="Personalized opportunity scoring"
            />
            <Feature
              icon={UsersIcon}
              title="Fair Allocation"
              description="Transparent & rule-constrained placement"
            />
            <Feature
              icon={BarChart3Icon}
              title="Better Opportunities"
              description="Connect with verified partner companies"
            />
          </div>
        </section>

        {/* Center Login Card */}
        <section className="relative w-full max-w-[580px] shrink-0">
          <div className="rounded-3xl border border-border/80 bg-card/90 p-8 sm:p-9 shadow-[0_25px_70px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
            
            {/* Brand Header */}
            <div className="mb-6 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-orange-500 to-amber-500 text-white shadow-[0_0_20px_var(--theme-glow)]">
                  <GraduationCapIcon size={26} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-black tracking-tight text-foreground">
                    Intern<span className="text-primary">AI</span>
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    PM Internship Scheme · SIH25033
                  </p>
                </div>
              </div>

              <div className="hidden sm:block text-right text-xs text-muted-foreground leading-4 font-mono">
                <p>Your Skills Today</p>
                <p className="font-bold text-foreground">Better Tomorrow</p>
              </div>
            </div>

            <h1 className="text-2xl font-black tracking-tight text-foreground">
              Welcome back 👋
            </h1>
            <p className="mt-1 text-xs text-muted-foreground">
              Sign in to your InternAI account and continue your journey
            </p>

            {/* Role Switcher Tabs */}
            <div className="mt-5 flex rounded-xl border border-border/80 bg-muted/40 p-1">
              {ROLES.map((r) => {
                const isSelected = selectedRole === r.value;
                return (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => handleRoleSelect(r.value)}
                    className={`
                      flex-1
                      h-11
                      rounded-lg
                      flex
                      items-center
                      justify-center
                      gap-2
                      text-xs
                      font-bold
                      transition-all
                      cursor-pointer
                      ${
                        isSelected
                          ? "bg-gradient-to-r from-primary to-orange-500 text-white shadow-[0_0_15px_var(--theme-glow)]"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                      }
                    `}
                  >
                    <r.icon size={16} />
                    {r.label}
                  </button>
                );
              })}
            </div>

            {/* Google Authentication */}
            <div className="mt-5">
              <GoogleAuthButton
                role={selectedRole}
                actionType="login"
                dividerText="Or sign in with email"
                onError={(err) => setServerErr(err)}
              />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input type="hidden" value={selectedRole} {...register("role")} />

              {/* Email */}
              <div>
                <Label className="mb-1.5 block text-xs font-bold text-foreground">
                  Email Address
                </Label>
                <div className="relative">
                  <MailIcon
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="h-11 rounded-xl border-border/80 bg-background/80 pl-10 text-xs shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20"
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-rose-500">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <Label className="text-xs font-bold text-foreground">
                    Password
                  </Label>
                  <Link
                    href={ROUTES.forgotPassword}
                    className="text-xs font-semibold text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <LockKeyholeIcon
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    type={showPw ? "text" : "password"}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="h-11 rounded-xl border-border/80 bg-background/80 pl-10 pr-10 text-xs shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPw ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-rose-500">{errors.password.message}</p>
                )}
              </div>

              {serverErr && (
                <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-400">
                  {serverErr}
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 rounded-xl bg-gradient-to-r from-primary to-orange-500 text-white font-bold text-xs shadow-[0_0_20px_var(--theme-glow)] hover:shadow-[0_0_28px_var(--theme-glow)] hover:scale-[1.01] transition-all cursor-pointer"
              >
                {loading ? (
                  <Loader2Icon className="size-4 animate-spin" />
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRightIcon className="size-4 ml-1" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-4 text-center text-xs text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href={ROUTES.register} className="font-bold text-primary hover:underline">
                Register now
              </Link>
            </div>

            {/* Demo Credentials Box */}
            <div className="mt-5 rounded-2xl border border-border/60 bg-muted/20 p-3.5">
              <div className="mb-2.5 flex items-center gap-2">
                <CopyIcon size={13} className="text-primary" />
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground font-mono">
                  Quick Demo Credentials (Click to Autofill)
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <DemoCard
                  title="Student"
                  email={demoCredentials.student.email}
                  icon={GraduationCapIcon}
                  copied={copied === "student"}
                  active={selectedRole === "student"}
                  onClick={() => fillDemo("student")}
                />
                <DemoCard
                  title="Company"
                  email={demoCredentials.company.email}
                  icon={BuildingIcon}
                  copied={copied === "company"}
                  active={selectedRole === "company"}
                  onClick={() => fillDemo("company")}
                />
                <DemoCard
                  title="Admin"
                  email={demoCredentials.admin.email}
                  icon={ShieldIcon}
                  copied={copied === "admin"}
                  active={selectedRole === "admin"}
                  onClick={() => fillDemo("admin")}
                />
              </div>
            </div>

          </div>
        </section>

      </div>
    </main>
  );
}

function Feature({
  icon: Icon,
  title,
  description,
}: {
  icon: ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border/80 bg-card text-primary shadow-sm">
        <Icon size={18} />
      </div>
      <div>
        <h3 className="text-xs font-bold text-foreground">{title}</h3>
        <p className="text-[11px] text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function DemoCard({
  title,
  email,
  icon: Icon,
  copied,
  active,
  onClick,
}: {
  title: string;
  email: string;
  icon: ElementType;
  copied: boolean;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        rounded-xl border p-2 text-left transition-all hover:scale-[1.02] cursor-pointer
        ${
          active
            ? "border-primary bg-primary/10 shadow-[0_0_12px_var(--theme-glow)]"
            : "border-border/60 bg-card/60 hover:border-border hover:bg-card"
        }
      `}
    >
      <div className="mb-1 flex items-center justify-between">
        <Icon size={15} className={active ? "text-primary" : "text-muted-foreground"} />
        {copied ? (
          <CheckIcon size={12} className="text-emerald-500" />
        ) : (
          <CopyIcon size={12} className="text-muted-foreground/60" />
        )}
      </div>
      <p className="text-[11px] font-bold text-foreground">{title}</p>
      <p className="truncate text-[9px] text-muted-foreground font-mono">{email}</p>
    </button>
  );
}
