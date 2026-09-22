import Link from "next/link";
import { cn } from "@/lib/utils";
import { APP_NAME } from "@/lib/constants";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  href?: string;
}

export function Logo({ className, size = "md", href = "/" }: LogoProps) {
  const sizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <Link
      href={href}
      className={cn("flex items-center gap-2 font-bold tracking-tight", className)}
    >
      <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">
        AI
      </div>
      <span className={cn(sizes[size], "text-foreground")}>
        {APP_NAME}
      </span>
    </Link>
  );
}
