"use client";

import Link from "next/link";
import { ArrowRightIcon, SparklesIcon, ShieldCheckIcon, CpuIcon } from "lucide-react";
import { ROUTES, SCHEME_CODE } from "@/lib/constants";

export function HeroSection() {
  return (
    <section id="top" className="relative overflow-hidden bg-[#07090e] text-white pt-16 pb-24 lg:pt-20 lg:pb-32 border-b border-white/[0.06]">
      {/* Radiant Solar Amber Aura Background (Matching Screenshot 1) */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* Large Warm Amber Glow on the Right Side */}
        <div
          className="absolute -top-32 right-0 lg:right-[-100px] h-[720px] w-[720px] rounded-full blur-[120px] opacity-25"
          style={{
            background: "radial-gradient(circle, #f97316 0%, #ea580c 40%, transparent 70%)",
          }}
        />
        {/* Subtle Purple / Magenta Backlight */}
        <div
          className="absolute top-20 right-[15%] h-[400px] w-[400px] rounded-full blur-[100px] opacity-20"
          style={{
            background: "radial-gradient(circle, #a855f7 0%, transparent 70%)",
          }}
        />
        {/* Ambient Top Glow */}
        <div
          className="absolute top-0 left-1/4 h-[350px] w-[600px] rounded-full blur-[140px] opacity-15"
          style={{
            background: "radial-gradient(circle, var(--theme-color, #f97316) 0%, transparent 70%)",
          }}
        />
        {/* Cyber micro-dot overlay */}
        <div className="cyber-dots absolute inset-0 opacity-40" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column: Headline, Subtitle, CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1.5 text-xs font-semibold text-orange-400 backdrop-blur-md shadow-[0_0_15px_rgba(249,115,22,0.15)]">
              <SparklesIcon className="size-3.5 text-orange-400 animate-pulse" />
              <span>{SCHEME_CODE} · AI Smart Allocation Engine</span>
            </div>

            {/* Main Headline (Matching Screenshot 1 Typography) */}
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-[68px] leading-[1.08]">
              Where future leaders <br />
              <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
                go to grow
              </span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-xl text-base sm:text-lg text-slate-300/90 leading-relaxed font-normal">
              Unite students, companies, and institutions on one AI-powered customer platform that
              delivers intelligent matching, transparent quotas, and results fast.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href={ROUTES.register}
                className="group relative inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-7 py-3.5 text-sm font-bold text-white shadow-[0_0_28px_rgba(249,115,22,0.5)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(249,115,22,0.7)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Try InternAI for free</span>
                <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href={ROUTES.login}
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-slate-200 backdrop-blur-md transition-all hover:border-white/30 hover:bg-white/10 hover:text-white"
              >
                Sign In to Portal
              </Link>
            </div>

            {/* Quick Trust Highlights */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-white/10 max-w-lg">
              <div>
                <p className="text-2xl font-black text-white tracking-tight">10,000+</p>
                <p className="text-xs text-slate-400">Students Matched</p>
              </div>
              <div>
                <p className="text-2xl font-black text-orange-400 tracking-tight">95%+</p>
                <p className="text-xs text-slate-400">Allocation Accuracy</p>
              </div>
              <div>
                <p className="text-2xl font-black text-white tracking-tight">500+</p>
                <p className="text-xs text-slate-400">Partner Companies</p>
              </div>
            </div>

          </div>

          {/* Right Column: Glowing Cybernetic AI Head & Interactive Mesh (Matching Screenshot 1) */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            
            {/* Golden Solar Halo Orb behind Head */}
            <div
              className="absolute -top-12 right-0 sm:right-6 size-[380px] sm:size-[460px] rounded-full opacity-60 blur-[60px] -z-10"
              style={{
                background: "conic-gradient(from 180deg at 50% 50%, #f97316 0deg, #ea580c 120deg, #fbbf24 240deg, #f97316 360deg)",
              }}
            />

            {/* Cyber AI Head Graphic Card Container */}
            <div className="relative w-full max-w-[420px] rounded-3xl border border-white/10 bg-[#0c101a]/70 p-6 backdrop-blur-2xl shadow-[0_25px_70px_rgba(0,0,0,0.65)] overflow-hidden group">
              
              {/* Inner glowing corner flare */}
              <div className="pointer-events-none absolute -top-10 -right-10 size-40 rounded-full bg-orange-500/30 blur-2xl" />
              
              {/* Top Card Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="size-2 rounded-full bg-emerald-400 -ml-4" />
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-300">
                    Live Neural Engine
                  </span>
                </div>
                <span className="rounded-full bg-orange-500/20 px-2 py-0.5 text-[10px] font-bold text-orange-400 border border-orange-500/30">
                  SIH25033
                </span>
              </div>

              {/* Glowing 3D Cybernetic Head Illustration */}
              <div className="relative flex items-center justify-center py-6">
                
                {/* SVG Cybernetic AI Head with glowing orange-gold wireframe lattice */}
                <div className="relative size-[260px] flex items-center justify-center">
                  
                  {/* Concentric Halo Rings */}
                  <div className="absolute inset-0 rounded-full border border-orange-500/20 animate-[spin_24s_linear_infinite]" />
                  <div className="absolute inset-4 rounded-full border border-dashed border-amber-400/25 animate-[spin_18s_linear_infinite_reverse]" />
                  
                  {/* High-Tech Glowing Head SVG */}
                  <svg
                    viewBox="0 0 200 240"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-56 filter drop-shadow-[0_0_25px_rgba(249,115,22,0.8)]"
                  >
                    {/* Head Silhouette Lattice */}
                    <path
                      d="M100 20 C60 20, 35 55, 35 105 C35 155, 60 195, 80 220 L120 220 C140 195, 165 155, 165 105 C165 55, 140 20, 100 20 Z"
                      stroke="#ea580c"
                      strokeWidth="1.5"
                      strokeDasharray="4 2"
                      fill="url(#headGradient)"
                    />

                    {/* Facial Wireframe Lines */}
                    <line x1="100" y1="20" x2="100" y2="220" stroke="#f97316" strokeWidth="1" strokeOpacity="0.4" />
                    <line x1="50" y1="90" x2="150" y2="90" stroke="#f97316" strokeWidth="1" strokeOpacity="0.5" />
                    <line x1="60" y1="125" x2="140" y2="125" stroke="#f97316" strokeWidth="1" strokeOpacity="0.6" />
                    <line x1="75" y1="170" x2="125" y2="170" stroke="#f97316" strokeWidth="1" strokeOpacity="0.5" />

                    {/* Polygon Lattice Contours */}
                    <polygon points="100,20 60,70 100,80 140,70" stroke="#fbbf24" strokeWidth="1" fill="#f97316" fillOpacity="0.1" />
                    <polygon points="60,70 40,110 80,120 100,80" stroke="#fb923c" strokeWidth="0.8" fill="#f97316" fillOpacity="0.08" />
                    <polygon points="140,70 160,110 120,120 100,80" stroke="#fb923c" strokeWidth="0.8" fill="#f97316" fillOpacity="0.08" />
                    <polygon points="80,120 100,150 120,120 100,80" stroke="#fbbf24" strokeWidth="1.2" fill="#fbbf24" fillOpacity="0.15" />
                    <polygon points="80,120 70,170 100,185 100,150" stroke="#f97316" strokeWidth="0.8" fill="#ea580c" fillOpacity="0.1" />
                    <polygon points="120,120 130,170 100,185 100,150" stroke="#f97316" strokeWidth="0.8" fill="#ea580c" fillOpacity="0.1" />
                    <polygon points="70,170 85,215 100,218 100,185" stroke="#f97316" strokeWidth="0.8" fill="#f97316" fillOpacity="0.08" />
                    <polygon points="130,170 115,215 100,218 100,185" stroke="#f97316" strokeWidth="0.8" fill="#f97316" fillOpacity="0.08" />

                    {/* The Bold Glowing Forehead "AI" Inscription (Exact Match to Image 1) */}
                    <text
                      x="100"
                      y="70"
                      textAnchor="middle"
                      fill="#fef08a"
                      fontSize="24"
                      fontWeight="900"
                      fontFamily="sans-serif"
                      letterSpacing="2"
                      filter="drop-shadow(0 0 10px #f59e0b)"
                    >
                      AI
                    </text>

                    {/* Glowing Eyes */}
                    <ellipse cx="78" cy="115" rx="9" ry="4" fill="#fde047" filter="drop-shadow(0 0 8px #f59e0b)" />
                    <ellipse cx="122" cy="115" rx="9" ry="4" fill="#fde047" filter="drop-shadow(0 0 8px #f59e0b)" />
                    <circle cx="78" cy="115" r="2.5" fill="#ffffff" />
                    <circle cx="122" cy="115" r="2.5" fill="#ffffff" />

                    {/* Gradients */}
                    <defs>
                      <linearGradient id="headGradient" x1="100" y1="20" x2="100" y2="220" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#f97316" stopOpacity="0.3" />
                        <stop offset="50%" stopColor="#ea580c" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#07090e" stopOpacity="0.6" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              {/* Floating Badges inside Card */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <CpuIcon className="size-3.5 text-orange-400" />
                    <span className="text-slate-300">Smart Allocation Engine</span>
                  </div>
                  <span className="font-mono font-bold text-orange-400">98.4% Matched</span>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <ShieldCheckIcon className="size-3.5 text-emerald-400" />
                    <span className="text-slate-300">Bias & Quota Constraints</span>
                  </div>
                  <span className="font-mono font-bold text-emerald-400">100% Fair</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
