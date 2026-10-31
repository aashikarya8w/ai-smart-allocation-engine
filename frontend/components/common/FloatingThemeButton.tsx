"use client";

import { useState, useRef, useEffect } from "react";
import { PaletteIcon, SunIcon, MoonIcon, LaptopIcon, CheckIcon, XIcon } from "lucide-react";
import { useThemeStore, THEME_OPTIONS } from "@/store/themeStore";
import { cn } from "@/lib/utils";

export function FloatingThemeButton() {
  const { mode, themeColor, setMode, setThemeColor } = useThemeStore();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const activeTheme = THEME_OPTIONS.find((t) => t.id === themeColor) || THEME_OPTIONS[0];

  return (
    <div
      ref={containerRef}
      className="fixed bottom-5 right-5 z-[9999] flex flex-col items-end print:hidden select-none"
    >
      {/* Expanded Palette Card - Crisp solid background with NO backdrop-blur to prevent browser blur bug */}
      {open && (
        <div className="mb-3 w-72 rounded-2xl border border-border/90 bg-card dark:bg-[#0d1220] p-4 text-card-foreground shadow-[0_20px_60px_rgba(0,0,0,0.7)] dark:border-white/20">
          <div className="flex items-center justify-between border-b border-border/60 pb-2.5 dark:border-white/10">
            <div className="flex items-center gap-2">
              <span
                className="size-3 rounded-full shadow-[0_0_10px_var(--theme-glow)]"
                style={{ backgroundColor: activeTheme.colorHex }}
              />
              <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                Page Theme Studio
              </span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <XIcon className="size-4" />
            </button>
          </div>

          {/* Mode Switcher */}
          <div className="mt-3 flex items-center justify-between rounded-xl border border-border/60 bg-muted/40 p-1.5 dark:border-white/10 dark:bg-white/[0.04]">
            <span className="text-xs font-medium text-foreground ml-1">Mode</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setMode("dark")}
                className={cn(
                  "flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all",
                  mode === "dark"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted dark:hover:bg-white/[0.08]"
                )}
              >
                <MoonIcon className="size-3.5" />
                Dark
              </button>
              <button
                type="button"
                onClick={() => setMode("light")}
                className={cn(
                  "flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all",
                  mode === "light"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted dark:hover:bg-white/[0.08]"
                )}
              >
                <SunIcon className="size-3.5" />
                Light
              </button>
              <button
                type="button"
                onClick={() => setMode("system")}
                className={cn(
                  "flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold transition-all",
                  mode === "system"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted dark:hover:bg-white/[0.08]"
                )}
                title="System default"
              >
                <LaptopIcon className="size-3.5" />
                Auto
              </button>
            </div>
          </div>

          {/* Color Palettes */}
          <div className="mt-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block mb-2 font-mono">
              Pick Accent Color
            </span>
            <div className="grid grid-cols-3 gap-2">
              {THEME_OPTIONS.map((theme) => {
                const isSelected = themeColor === theme.id;
                return (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => setThemeColor(theme.id)}
                    className={cn(
                      "flex flex-col items-center gap-1.5 rounded-xl border p-2 text-center transition-all cursor-pointer",
                      isSelected
                        ? "border-primary bg-primary/10 shadow-[0_0_12px_var(--theme-glow)] dark:border-primary"
                        : "border-border/60 bg-muted/20 hover:border-border hover:bg-muted/50 dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.08]"
                    )}
                  >
                    <span
                      className="size-5 rounded-full shadow-sm flex items-center justify-center text-white"
                      style={{ backgroundColor: theme.colorHex }}
                    >
                      {isSelected && <CheckIcon className="size-3 stroke-[3]" />}
                    </span>
                    <span className="text-[10px] font-medium leading-none text-foreground truncate w-full">
                      {theme.name.split(" ")[1] || theme.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Floating Pill Trigger */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="Customize Theme & Color"
        className="group flex items-center gap-2 rounded-full border border-border/80 bg-card dark:bg-[#0d1220] px-3.5 py-2 text-xs font-semibold text-foreground shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-primary hover:shadow-[0_0_25px_var(--theme-glow)] active:scale-95 dark:border-white/15"
      >
        <span
          className="size-2.5 rounded-full shadow-[0_0_8px_var(--theme-glow)] group-hover:scale-125 transition-transform"
          style={{ backgroundColor: activeTheme.colorHex }}
        />
        <span className="hidden sm:inline font-mono tracking-tight">Theme</span>
        <PaletteIcon className="size-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
      </button>
    </div>
  );
}
