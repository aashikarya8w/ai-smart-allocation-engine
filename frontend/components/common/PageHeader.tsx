import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  badge?: string;
}

export function PageHeader({
  title,
  description,
  children,
  className,
  badge,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 pb-4 border-b border-white/[0.06] sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <div>
        {badge && (
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-primary uppercase font-mono shadow-[0_0_12px_var(--theme-glow)]">
            <span className="size-1.5 rounded-full bg-primary animate-pulse" />
            {badge}
          </div>
        )}
        <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground bg-clip-text">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground/90 font-medium">
            {description}
          </p>
        )}
      </div>
      {children && (
        <div className="flex shrink-0 items-center gap-2.5">{children}</div>
      )}
    </div>
  );
}
