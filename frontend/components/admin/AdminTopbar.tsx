"use client";

import Link from "next/link";
import { BellIcon, LogOutIcon, MenuIcon, SettingsIcon, ShieldIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Logo } from "@/components/common/Logo";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { useAuth } from "@/hooks/useAuth";
import { initials } from "@/lib/formatters";
import { ROUTES } from "@/lib/constants";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AdminTopbarProps {
  onMenuClick?: () => void;
}

export function AdminTopbar({ onMenuClick }: AdminTopbarProps) {
  const { user, signOut } = useAuth();

  return (
    <header className="relative z-30 flex h-16 items-center justify-between border-b border-border/80 bg-background/85 px-4 sm:px-6 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuClick} aria-label="Menu">
          <MenuIcon className="size-5" />
        </Button>
        <Logo href={ROUTES.admin.dashboard} size="sm" />
        <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary shadow-[0_0_10px_var(--theme-glow)]">
          <ShieldIcon className="size-3" />
          Admin Governance
        </span>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button variant="ghost" size="icon" aria-label="Notifications" className="rounded-lg">
          <Link href={ROUTES.admin.notifications} className="flex items-center justify-center">
            <BellIcon className="size-4" />
          </Link>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button
                className="flex size-9 items-center justify-center rounded-full outline-none ring-1 ring-border/80 hover:ring-primary/50 transition-all"
                aria-label="User menu"
              />
            }
          >
            <Avatar className="size-8 pointer-events-none">
              <AvatarFallback className="text-xs font-bold bg-primary/15 text-primary">
                {user ? initials(user.name) : "A"}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52 rounded-2xl border-border/80 bg-popover/95 p-1 backdrop-blur-xl">
            <div className="px-3 py-2.5">
              <p className="text-xs font-bold text-foreground truncate">{user?.name}</p>
              <p className="text-[11px] text-muted-foreground truncate">{user?.email}</p>
              <span className="mt-1 inline-block rounded-full bg-primary/10 px-2 py-0.2 text-[10px] font-bold text-primary">
                System Administrator
              </span>
            </div>
            <DropdownMenuSeparator className="bg-border/60" />
            <DropdownMenuItem render={<Link href={ROUTES.admin.settings} className="flex items-center gap-2 text-xs" />}>
              <SettingsIcon className="size-4 text-primary" />Settings
            </DropdownMenuItem>
            <DropdownMenuItem render={<Link href={ROUTES.admin.administrators} className="flex items-center gap-2 text-xs" />}>
              <ShieldIcon className="size-4 text-primary" />Admins Management
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border/60" />
            <DropdownMenuItem onClick={signOut} className="text-destructive focus:text-destructive flex items-center gap-2 text-xs font-semibold cursor-pointer">
              <LogOutIcon className="size-4" />Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
