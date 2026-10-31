import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/lib/constants";

export function CTASection() {
  return (
    <section className="relative bg-[#07090e] py-24 sm:py-32 text-white overflow-hidden">
      
      {/* Background ambient solar glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="size-[550px] rounded-full bg-orange-600/15 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl border border-orange-500/30 bg-[#0c101c]/90 px-8 py-16 sm:py-20 text-center backdrop-blur-2xl shadow-[0_0_50px_rgba(249,115,22,0.15)] overflow-hidden">
          
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Ready to find your perfect internship?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base text-slate-300">
            Join thousands of students and corporate leaders already on the PM
            Internship Scheme. Let AI connect you with the right opportunity.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={ROUTES.register}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-3.5 text-sm font-bold text-white shadow-[0_0_25px_rgba(249,115,22,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_35px_rgba(249,115,22,0.6)]"
            >
              <span>Get Started Free</span>
              <ArrowRightIcon className="size-4" />
            </Link>

            <Link
              href={ROUTES.login}
              className="inline-flex items-center rounded-xl border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/40"
            >
              Sign In to Portal
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
