"use client";

import { useState } from "react";
import Link from "next/link";
import { MenuIcon, XIcon, ArrowRightIcon } from "lucide-react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { ROUTES } from "@/lib/constants";

const NAV_LINKS = [
  { label: "Overview",     href: "/#top"          },
  { label: "AI Matching",  href: "/#features"     },
  { label: "AI Agents",    href: "/#agents"       },
  { label: "Radar Hubs",   href: "/#hubs"         },
  { label: "Integrations", href: "/#integrations" },
  { label: "Portals",      href: "/#portals"      },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#07090e]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left: Logo */}
        <div className="flex items-center gap-8">
          <Logo href="/" />
          
          {/* Desktop Nav Links */}
          <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs font-semibold tracking-wide text-slate-300 transition-colors hover:text-orange-400"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right: Theme Toggle & Sign in Buttons (Exact Match to Screenshot 1 "Log in" pill) */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />

          <Link
            href={ROUTES.login}
            className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold text-white backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/30"
          >
            Log in
          </Link>

          <Link
            href={ROUTES.register}
            className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-2 text-xs font-bold text-white shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all hover:shadow-[0_0_28px_rgba(249,115,22,0.6)] hover:scale-105"
          >
            <span>Get Started</span>
            <ArrowRightIcon className="size-3.5" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="rounded-lg p-2 text-slate-300 hover:bg-white/10 hover:text-white"
          >
            {open ? <XIcon className="size-5" /> : <MenuIcon className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="border-t border-white/10 bg-[#07090e]/95 px-4 py-4 md:hidden backdrop-blur-2xl">
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-2 border-t border-white/10 pt-3">
              <Link
                href={ROUTES.login}
                onClick={() => setOpen(false)}
                className="rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-center text-sm font-bold text-white"
              >
                Log in
              </Link>
              <Link
                href={ROUTES.register}
                onClick={() => setOpen(false)}
                className="rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-2.5 text-center text-sm font-bold text-white"
              >
                Get Started Free
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
