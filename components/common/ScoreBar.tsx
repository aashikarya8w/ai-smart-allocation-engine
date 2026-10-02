import { cn } from "@/lib/utils";

interface ScoreBarProps {
  label: string;
  score: number; // 0-100
  className?: string;
}

function getScoreColor(score: number): string {
  if (score >= 80) return "bg-emerald-500";
  if (score >= 60) return "bg-blue-500";
  if (score >= 40) return "bg-amber-500";
  return "bg-red-500";
}

export function ScoreBar({ label, score, className }: ScoreBarProps) {
  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="text-xs font-semibold tabular-nums text-foreground">
          {score}%
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={cn("h-full rounded-full transition-all", getScoreColor(score))}
          style={{ width: `${Math.min(100, Math.max(0, score))}%` }}
          role="progressbar"
          aria-valuenow={score}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}

interface ScoreCircleProps {
  score: number;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function ScoreCircle({ score, size = "md", className }: ScoreCircleProps) {
  const sizes = {
    sm: "size-10 text-xs",
    md: "size-14 text-sm",
    lg: "size-20 text-base",
    xl: "size-28 text-2xl",
  };

  const color =
    score >= 80
      ? "text-emerald-600 border-emerald-500"
      : score >= 60
        ? "text-blue-600 border-blue-500"
        : score >= 40
          ? "text-amber-600 border-amber-500"
          : "text-red-600 border-red-500";

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full border-2 font-semibold tabular-nums",
        sizes[size],
        color,
        className
      )}
    >
      {score}%
    </div>
  );
}
