import { Logo } from "@/components/common/Logo";
import { ThemeToggle } from "@/components/common/ThemeToggle";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      {/* Top bar */}
      <header className="flex h-14 items-center justify-between border-b border-border/50 bg-background px-4 sm:px-6">
        <Logo href="/" />
        <ThemeToggle />
      </header>

      {/* Content */}
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        {children}
      </main>

      {/* Footer note */}
      <footer className="py-4 text-center text-xs text-muted-foreground">
        PM Internship Scheme · Government of India · SIH25033
      </footer>
    </div>
  );
}
