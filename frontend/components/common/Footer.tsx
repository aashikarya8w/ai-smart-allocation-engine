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
    { label: "AI Matching", href: "/#features" },
    { label: "AI Agents",   href: "/#agents"   },
    { label: "Radar Hubs",  href: "/#hubs"     },
    { label: "Integrations", href: "/#integrations" },
    { label: "Portals",     href: "/#portals"  },
  ],
  Legal: [
    { label: "Privacy Policy",   href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy",    href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#05070c] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo href="/" />
            <p className="mt-3 text-xs text-slate-400 leading-relaxed max-w-xs">
              {APP_DESCRIPTION}
            </p>
            <p className="mt-2 text-[11px] text-orange-400 font-mono">
              {SCHEME_NAME} · {SCHEME_CODE}
            </p>
          </div>

          {/* Link groups */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-200">
                {group}
              </p>
              <ul className="mt-3 space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs text-slate-400 transition-colors hover:text-orange-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8 bg-white/10" />

        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} InternAI. Built for Smart India Hackathon 2025.
          </p>
          <p className="text-orange-400 font-medium">
            Government of India – PM Internship Scheme (SIH25033)
          </p>
        </div>
      </div>
    </footer>
  );
}
