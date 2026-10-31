"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/store/themeStore";
import { FloatingThemeButton } from "@/components/common/FloatingThemeButton";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const initTheme = useThemeStore((s) => s.initTheme);

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  return (
    <>
      {children}
      <FloatingThemeButton />
    </>
  );
}
