import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toast";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/providers/ThemeProvider";

export const metadata: Metadata = {
  title: {
    default: "InternAI – AI-Based Smart Allocation Engine",
    template: "%s | InternAI",
  },
  description:
    "AI-Based Smart Allocation Engine for PM Internship Scheme (SIH25033). Connecting students with the right internship opportunities through intelligent matching.",
  keywords: [
    "internship",
    "PM Internship Scheme",
    "AI allocation",
    "SIH 2025",
    "smart matching",
    "smart allocation engine",
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="h-full dark" data-theme="amber" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var mode = localStorage.getItem('internai_theme_mode') || 'dark';
                  var color = localStorage.getItem('internai_theme_color') || 'amber';
                  var root = document.documentElement;
                  if (mode === 'light') {
                    root.classList.remove('dark');
                    root.classList.add('light');
                  } else {
                    root.classList.add('dark');
                    root.classList.remove('light');
                  }
                  root.setAttribute('data-theme', color);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full bg-background text-foreground antialiased selection:bg-primary/30 selection:text-foreground">
        <ThemeProvider>
          <TooltipProvider>
            <Toaster>{children}</Toaster>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
