import Link from "next/link";
import { cn } from "@/lib/utils";
import { APP_NAME } from "@/lib/constants";
import { GraduationCapIcon } from "lucide-react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  href?: string;
}

export function Logo({ className, size = "md", href = "/" }: LogoProps) {
  const sizes = {
    sm: "text-base font-extrabold",
    md: "text-lg font-extrabold",
    lg: "text-2xl font-black",
  };

  return (
    <Link
      href={href}
      className={cn("flex items-center gap-2.5 tracking-tight group", className)}
    >
      <div className="flex size-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-orange-500 to-amber-500 text-white text-xs font-black shadow-[0_0_16px_var(--theme-glow)] transition-transform group-hover:scale-105">
        <GraduationCapIcon className="size-4 text-white" />
      </div>
      <span className={cn(sizes[size], "text-foreground tracking-tight")}>
        Intern<span className="text-primary transition-colors">AI</span>
      </span>
    </Link>
  );
}
