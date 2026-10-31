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

  const cardContent = (
    <Card
      onClick={onClick}
      className={cn(
        "transition-all duration-200 hover:shadow-md",
        (href || onClick) && "cursor-pointer hover:border-primary/50 hover:bg-muted/10 active:scale-[0.99]",
        className
      )}
    >
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
              "flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors",
              (href || onClick) && "group-hover:bg-primary group-hover:text-primary-foreground",
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
      <Link href={href} className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
