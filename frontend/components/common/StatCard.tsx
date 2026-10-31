import { type LucideIcon } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type TrendShorthand = "up" | "down" | "neutral";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  iconClassName?: string;
  trend?: TrendShorthand | { value: number; label: string; positive?: boolean };
  className?: string;
  href?: string;
  onClick?: () => void;
}

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  iconClassName,
  trend,
  className,
  href,
  onClick,
}: StatCardProps) {
  const trendEl = (() => {
    if (!trend) return null;
    if (typeof trend === "string") {
      if (trend === "up")
        return <p className="mt-1 text-xs font-semibold text-emerald-500 dark:text-emerald-400">↑ Increasing</p>;
      if (trend === "down")
        return <p className="mt-1 text-xs font-semibold text-rose-500 dark:text-rose-400">↓ Decreasing</p>;
      return null;
    }
    return (
      <p
        className={cn(
          "mt-1 text-xs font-semibold",
          trend.positive !== false
            ? "text-emerald-500 dark:text-emerald-400"
            : "text-rose-500 dark:text-rose-400"
        )}
      >
        {trend.value > 0 ? "+" : ""}
        {trend.value}% {trend.label}
      </p>
    );
  })();

  const cardContent = (
    <Card
      onClick={onClick}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border/80 bg-card/85 p-0 backdrop-blur-xl transition-all duration-300 shadow-sm",
        (href || onClick) &&
          "cursor-pointer hover:border-primary/60 hover:shadow-[0_8px_30px_var(--theme-glow)] hover:-translate-y-0.5 active:scale-[0.99]",
        className
      )}
    >
      {/* Top micro-line accent matching theme glow */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground font-mono">
              {title}
            </p>
            <p className="mt-1.5 text-2xl font-black tabular-nums tracking-tight text-foreground">
              {value}
            </p>
            {description && (
              <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
            )}
            {trendEl}
          </div>
          <div
            className={cn(
              "flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_var(--theme-glow)] transition-all duration-300",
              (href || onClick) && "group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-105",
              iconClassName
            )}
          >
            <Icon className="size-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (href) {
    return (
      <Link href={href} className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
