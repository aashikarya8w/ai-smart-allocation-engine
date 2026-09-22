"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon, Loader2Icon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema, type LoginFormData } from "@/lib/validations";
import { loginService } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";
import { ROLE_HOME } from "@/lib/permissions";
import { demoCredentials } from "@/data/users";
import { useRouter } from "next/navigation";
import type { UserRole } from "@/types/user";

const ROLES: { value: UserRole; label: string }[] = [
  { value: "student", label: "Student" },
  { value: "company", label: "Company" },
  { value: "admin",   label: "Admin"   },
];

export default function LoginPage() {
  const router = useRouter();
  const login  = useAuthStore((s) => s.login);
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError]   = useState("");
  const [isLoading, setIsLoading]       = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { role: "student" },
  });

  const selectedRole = watch("role");

  async function onSubmit(data: LoginFormData) {
    setIsLoading(true);
    setServerError("");
    try {
      const user = await loginService(data);
      login(user);
      router.push(ROLE_HOME[user.role]);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setIsLoading(false);
    }
  }

  function fillDemo(role: UserRole) {
    const cred = demoCredentials[role];
    setValue("email",    cred.email);
    setValue("password", cred.password);
    setValue("role",     cred.role);
  }

  return (
    <div className="w-full max-w-md space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>Sign in to your InternAI account</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Role tabs */}
          <div className="grid grid-cols-3 rounded-lg border border-border p-1 gap-1">
            {ROLES.map((r) => (
              <button
                key={r.value}
                type="button"
                onClick={() => setValue("role", r.value)}
                className={`rounded-md py-1.5 text-xs font-medium transition-colors ${
                  selectedRole === r.value
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                {...register("email")}
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="pr-9"
                  {...register("password")}
                  aria-invalid={!!errors.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOffIcon className="size-4" />
                  ) : (
                    <EyeIcon className="size-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-destructive">{errors.password.message}</p>
              )}
            </div>

            {serverError && (
              <p className="rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive">
                {serverError}
              </p>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading && <Loader2Icon className="size-4 animate-spin" />}
              {isLoading ? "Signing in…" : "Sign In"}
            </Button>
          </form>

          <p className="text-center text-xs text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Register
            </Link>
          </p>
        </CardContent>
      </Card>

      {/* Demo credentials */}
      <Card>
        <CardContent className="p-4">
          <p className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Demo Credentials
          </p>
          <div className="grid gap-2 sm:grid-cols-3">
            {(["student", "company", "admin"] as UserRole[]).map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => fillDemo(role)}
                className="rounded-lg border border-border p-2 text-left hover:bg-muted transition-colors"
              >
                <p className="text-xs font-semibold capitalize text-foreground">{role}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {demoCredentials[role].email}
                </p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
