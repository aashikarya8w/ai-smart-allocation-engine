import { type LucideIcon } from "lucide-react";
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
}

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  iconClassName,
  trend,
  className,
}: StatCardProps) {
  // Normalise trend to renderable data or null
  const trendEl = (() => {
    if (!trend) return null;
    if (typeof trend === "string") {
      if (trend === "up")
        return <p className="mt-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">↑ Increasing</p>;
      if (trend === "down")
        return <p className="mt-1 text-xs font-medium text-red-500 dark:text-red-400">↓ Decreasing</p>;
      return null; // neutral — no indicator
    }
    return (
      <p
        className={cn(
          "mt-1 text-xs font-medium",
          trend.positive !== false
            ? "text-emerald-600 dark:text-emerald-400"
            : "text-red-500 dark:text-red-400"
        )}
      >
        {trend.value > 0 ? "+" : ""}
        {trend.value}% {trend.label}
      </p>
    );
  })();

  return (
    <Card className={cn("transition-shadow hover:shadow-md", className)}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {title}
            </p>
            <p className="mt-1 text-2xl font-semibold tabular-nums text-foreground">
              {value}
            </p>
            {description && (
              <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
            )}
            {trendEl}
          </div>
          <div
            className={cn(
              "flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary",
              iconClassName
            )}
          >
            <Icon className="size-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
