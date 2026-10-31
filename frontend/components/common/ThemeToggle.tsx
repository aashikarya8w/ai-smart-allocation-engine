"use client";

import { SunIcon, MoonIcon, LaptopIcon, CheckIcon } from "lucide-react";
import { useThemeStore } from "@/store/themeStore";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle({ className }: { className?: string }) {
  const { mode, setMode } = useThemeStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            aria-label="Toggle Light or Dark Mode"
            title={mode === "dark" ? "Dark Mode Active" : mode === "light" ? "Light Mode Active" : "System Mode Active"}
            className={cn(
              "relative flex size-9 items-center justify-center rounded-xl border border-border/70 bg-background text-foreground transition-all duration-200 hover:border-primary/60 hover:bg-muted/40 hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none dark:border-white/10 dark:bg-white/[0.04] cursor-pointer",
              className
            )}
          />
        }
      >
        {mode === "dark" ? (
          <MoonIcon className="size-4 text-foreground/90 transition-transform hover:scale-110" />
        ) : mode === "light" ? (
          <SunIcon className="size-4 text-amber-500 transition-transform hover:scale-110" />
        ) : (
          <LaptopIcon className="size-4 text-foreground/90 transition-transform hover:scale-110" />
        )}
      </DropdownMenuTrigger>

      {/* Portaled Content - Rendered directly onto document.body so it is NEVER hidden or cut off */}
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-48 rounded-2xl border border-border/90 bg-popover dark:bg-[#0d1220] p-1.5 text-popover-foreground shadow-[0_20px_50px_rgba(0,0,0,0.8)] dark:border-white/20 select-none z-[99999]"
      >
        <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground font-mono">
          Display Mode
        </div>
        <DropdownMenuSeparator className="bg-border/60 dark:bg-white/10 mb-1" />

        {/* Light Mode */}
        <DropdownMenuItem
          onClick={() => setMode("light")}
          className={cn(
            "flex items-center justify-between rounded-xl px-2.5 py-2 text-xs font-semibold cursor-pointer transition-colors",
            mode === "light"
              ? "bg-primary/15 text-primary font-bold dark:bg-primary/20"
              : "text-foreground hover:bg-muted dark:hover:bg-white/[0.06]"
          )}
        >
          <span className="flex items-center gap-2">
            <SunIcon className="size-4 text-amber-500" />
            Light Mode
          </span>
          {mode === "light" && <CheckIcon className="size-3.5 stroke-[3] text-primary" />}
        </DropdownMenuItem>

        {/* Dark Mode */}
        <DropdownMenuItem
          onClick={() => setMode("dark")}
          className={cn(
            "flex items-center justify-between rounded-xl px-2.5 py-2 text-xs font-semibold cursor-pointer transition-colors",
            mode === "dark"
              ? "bg-primary/15 text-primary font-bold dark:bg-primary/20"
              : "text-foreground hover:bg-muted dark:hover:bg-white/[0.06]"
          )}
        >
          <span className="flex items-center gap-2">
            <MoonIcon className="size-4 text-blue-400" />
            Dark Mode
          </span>
          {mode === "dark" && <CheckIcon className="size-3.5 stroke-[3] text-primary" />}
        </DropdownMenuItem>

        {/* System Default */}
        <DropdownMenuItem
          onClick={() => setMode("system")}
          className={cn(
            "flex items-center justify-between rounded-xl px-2.5 py-2 text-xs font-semibold cursor-pointer transition-colors",
            mode === "system"
              ? "bg-primary/15 text-primary font-bold dark:bg-primary/20"
              : "text-foreground hover:bg-muted dark:hover:bg-white/[0.06]"
          )}
        >
          <span className="flex items-center gap-2">
            <LaptopIcon className="size-4 text-slate-400" />
            System Default
          </span>
          {mode === "system" && <CheckIcon className="size-3.5 stroke-[3] text-primary" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
