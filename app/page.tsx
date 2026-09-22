import { redirect } from "next/navigation";

// Root "/" redirects to the public landing page rendered at (public)/page.tsx
// This file is the catch-all; the route group handles the actual render.
export default function RootPage() {
  redirect("/login");
}
