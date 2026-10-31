"use client";

import { create } from "zustand";

export type ThemeMode = "dark" | "light" | "system";
export type ThemeColor = "amber" | "blue" | "violet" | "emerald" | "crimson" | "indigo";

export interface ThemeOption {
  id: ThemeColor;
  name: string;
  colorHex: string;
  gradient: string;
  description: string;
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: "amber",
    name: "Cyber Amber",
    colorHex: "#f97316",
    gradient: "from-amber-500 to-orange-600",
    description: "Futuristic solar amber & warm AI glow (Reference Theme)",
  },
  {
    id: "blue",
    name: "Electric Cyan",
    colorHex: "#3b82f6",
    gradient: "from-blue-500 to-cyan-500",
    description: "High-tech neon azure & digital intelligence",
  },
  {
    id: "violet",
    name: "Neon Violet",
    colorHex: "#a855f7",
    gradient: "from-purple-500 to-pink-500",
    description: "Cyberpunk deep violet & luminous magenta",
  },
  {
    id: "emerald",
    name: "Matrix Emerald",
    colorHex: "#10b981",
    gradient: "from-emerald-500 to-teal-500",
    description: "Cutting-edge neural green & clean cyber aesthetic",
  },
  {
    id: "crimson",
    name: "Sunset Crimson",
    colorHex: "#f43f5e",
    gradient: "from-rose-500 to-red-600",
    description: "Bold fiery ruby & vibrant coral energy",
  },
  {
    id: "indigo",
    name: "Cosmic Indigo",
    colorHex: "#6366f1",
    gradient: "from-indigo-500 to-violet-600",
    description: "Deep space galactic cobalt & sovereign royal indigo",
  },
];

interface ThemeState {
  mode: ThemeMode;
  themeColor: ThemeColor;
  setMode: (mode: ThemeMode) => void;
  setThemeColor: (color: ThemeColor) => void;
  toggleMode: () => void;
  initTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  mode: "dark",
  themeColor: "amber",

  setMode: (mode: ThemeMode) => {
    set({ mode });
    if (typeof window !== "undefined") {
      localStorage.setItem("internai_theme_mode", mode);
      applyDOMTheme(mode, get().themeColor);
    }
  },

  setThemeColor: (themeColor: ThemeColor) => {
    set({ themeColor });
    if (typeof window !== "undefined") {
      localStorage.setItem("internai_theme_color", themeColor);
      applyDOMTheme(get().mode, themeColor);
    }
  },

  toggleMode: () => {
    const nextMode: ThemeMode = get().mode === "dark" ? "light" : "dark";
    get().setMode(nextMode);
  },

  initTheme: () => {
    if (typeof window === "undefined") return;
    const savedMode = (localStorage.getItem("internai_theme_mode") as ThemeMode) || "dark";
    const savedColor = (localStorage.getItem("internai_theme_color") as ThemeColor) || "amber";
    set({ mode: savedMode, themeColor: savedColor });
    applyDOMTheme(savedMode, savedColor);
  },
}));

function applyDOMTheme(mode: ThemeMode, color: ThemeColor) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;

  const isDark =
    mode === "dark" ||
    (mode === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  if (isDark) {
    root.classList.add("dark");
    root.classList.remove("light");
  } else {
    root.classList.remove("dark");
    root.classList.add("light");
  }

  root.setAttribute("data-theme", color);
}
