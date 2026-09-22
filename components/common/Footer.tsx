import Link from "next/link";
import { Logo } from "./Logo";
import { APP_DESCRIPTION, SCHEME_CODE, SCHEME_NAME } from "@/lib/constants";
import { Separator } from "@/components/ui/separator";

const FOOTER_LINKS = {
  Platform: [
    { label: "For Students",  href: "/register" },
    { label: "For Companies", href: "/register" },
    { label: "Admin Portal",  href: "/login"    },
  ],
  Resources: [
    { label: "How it Works", href: "/#how-it-works" },
    { label: "Features",     href: "/#features"     },
    { label: "About",        href: "/#about"        },
  ],
  Legal: [
    { label: "Privacy Policy",    href: "#" },
    { label: "Terms of Service",  href: "#" },
    { label: "Cookie Policy",     href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo />
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xs">
              {APP_DESCRIPTION}
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              {SCHEME_NAME} · {SCHEME_CODE}
            </p>
          </div>

          {/* Link groups */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <p className="text-xs font-semibold uppercase tracking-wider text-foreground">
                {group}
              </p>
              <ul className="mt-3 space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} InternAI. Built for Smart India Hackathon 2025.
          </p>
          <p className="text-xs text-muted-foreground">
            Government of India – PM Internship Scheme
          </p>
        </div>
      </div>
    </footer>
  );
}
