"use client";

import Link from "next/link";
import { BellIcon, LogOutIcon, MenuIcon, UserIcon, SettingsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Logo } from "@/components/common/Logo";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { useAuth } from "@/hooks/useAuth";
import { useNotifications } from "@/hooks/useNotifications";
import { initials } from "@/lib/formatters";
import { ROUTES } from "@/lib/constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface StudentTopbarProps {
  onMenuClick?: () => void;
}

export function StudentTopbar({ onMenuClick }: StudentTopbarProps) {
  const { user, signOut } = useAuth();
  const { unreadCount } = useNotifications();

  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-background px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
          aria-label="Toggle sidebar"
        >
          <MenuIcon className="size-5" />
        </Button>
        <Logo href={ROUTES.student.dashboard} size="sm" />
      </div>

      <div className="flex items-center gap-1">
        <ThemeToggle />

        {/* Notifications bell */}
        <div className="relative">
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Link href={ROUTES.student.notifications} className="flex items-center justify-center">
              <BellIcon className="size-4" />
            </Link>
          </Button>
          {unreadCount > 0 && (
            <span className="pointer-events-none absolute right-1 top-1 flex size-3.5 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </div>

        {/* User dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button
                className="flex size-8 items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="User menu"
              />
            }
          >
            <Avatar className="size-7 pointer-events-none">
              <AvatarFallback className="text-xs bg-primary/10 text-primary">
                {user ? initials(user.name) : "?"}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48">
            <div className="px-3 py-2">
              <p className="text-sm font-medium truncate">{user?.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              render={<Link href={ROUTES.student.profile} className="flex items-center gap-1.5" />}
            >
              <UserIcon className="size-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              render={<Link href={ROUTES.student.settings} className="flex items-center gap-1.5" />}
            >
              <SettingsIcon className="size-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={signOut}
              className="text-destructive focus:text-destructive"
            >
              <LogOutIcon className="size-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
