"use client";

import Link from "next/link";
import { GraduationCapIcon, BuildingIcon, ShieldIcon, SparklesIcon, BarChart3Icon, CpuIcon, ArrowUpRightIcon } from "lucide-react";
import { ROUTES } from "@/lib/constants";

export function HubsSection() {
  return (
    <section id="hubs" className="relative bg-[#07090e] py-24 sm:py-32 border-b border-white/[0.06] overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[650px] rounded-full bg-orange-600/10 blur-[150px]" />
        <div className="cyber-dots absolute inset-0 opacity-25" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Pill & Headline (Exact Match to Screenshot 4) */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-semibold text-orange-400 backdrop-blur-md mb-4 shadow-[0_0_15px_rgba(249,115,22,0.15)]">
            <span className="text-sm">🔥</span>
            <span>Powered by InternAI Engine</span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Grow easier with InternAI
          </h2>
        </div>

        {/* 6 Grid Cards Surrounding Central Radar Scanner (Exact Match to Screenshot 4) */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch">
          
          {/* Card 1: Student Hub (Blue) */}
          <div className="rounded-3xl border border-white/10 bg-[#0c101c]/80 p-7 backdrop-blur-xl transition-all duration-300 hover:border-blue-500/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.15)]">
            <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)] mb-5">
              <GraduationCapIcon className="size-6" />
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">Student Portal</h3>
            <ul className="mt-4 space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-blue-500 shadow-[0_0_6px_#3b82f6]" />
                <span>AI Match Score & personalized internship recommendations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-blue-500 shadow-[0_0_6px_#3b82f6]" />
                <span>Skill assessments, resume analyzer, and live application tracking</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Company Hub (Orange) */}
          <div className="rounded-3xl border border-white/10 bg-[#0c101c]/80 p-7 backdrop-blur-xl transition-all duration-300 hover:border-orange-500/50 hover:shadow-[0_0_25px_rgba(249,115,22,0.15)]">
            <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow-[0_0_15px_rgba(249,115,22,0.5)] mb-5">
              <BuildingIcon className="size-6" />
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">Company Hub</h3>
            <ul className="mt-4 space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-orange-500 shadow-[0_0_6px_#f97316]" />
                <span>Post verified internship opportunities and auto-rank applicants</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-orange-500 shadow-[0_0_6px_#f97316]" />
                <span>Automated candidate shortlisting and allocation pipeline management</span>
              </li>
            </ul>
          </div>

          {/* Card 3: Admin & Governance Hub (Purple) */}
          <div className="rounded-3xl border border-white/10 bg-[#0c101c]/80 p-7 backdrop-blur-xl transition-all duration-300 hover:border-purple-500/50 hover:shadow-[0_0_25px_rgba(168,85,247,0.15)]">
            <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)] mb-5">
              <ShieldIcon className="size-6" />
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">Admin & Governance</h3>
            <ul className="mt-4 space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-purple-500 shadow-[0_0_6px_#a855f7]" />
                <span>Enforce reservation quotas, rule engines, and seat constraints</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-purple-500 shadow-[0_0_6px_#a855f7]" />
                <span>Transparent audit logs and institutional oversight</span>
              </li>
            </ul>
          </div>

          {/* Card 4: Simulation & Twin Hub (Pink) */}
          <div className="rounded-3xl border border-white/10 bg-[#0c101c]/80 p-7 backdrop-blur-xl transition-all duration-300 hover:border-pink-500/50 hover:shadow-[0_0_25px_rgba(236,72,153,0.15)]">
            <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-[0_0_15px_rgba(236,72,153,0.5)] mb-5">
              <SparklesIcon className="size-6" />
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">Simulation & Twin Hub</h3>
            <ul className="mt-4 space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-pink-500 shadow-[0_0_6px_#ec4899]" />
                <span>What-If simulator to test hypothetical skill and score improvements</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-pink-500 shadow-[0_0_6px_#ec4899]" />
                <span>Dynamic readiness twin with projected career roadmap milestones</span>
              </li>
            </ul>
          </div>

          {/* Center Card: Interactive Circular Radar Scanner (Exact Match to Screenshot 4 Center) */}
          <div className="rounded-3xl border border-orange-500/40 bg-[#090d18]/90 p-6 backdrop-blur-2xl shadow-[0_0_40px_rgba(249,115,22,0.2)] flex flex-col items-center justify-center relative overflow-hidden group">
            
            {/* The Rotating Radar Circle */}
            <div className="relative size-44 sm:size-48 flex items-center justify-center">
              
              {/* Outer Ring */}
              <div className="absolute inset-0 rounded-full border border-slate-700/60" />
              {/* Middle Ring */}
              <div className="absolute inset-6 rounded-full border border-slate-700/60" />
              {/* Inner Ring */}
              <div className="absolute inset-12 rounded-full border border-slate-700/60" />
              
              {/* Center Glowing Hub */}
              <div className="size-10 rounded-full bg-gradient-to-br from-amber-600 to-orange-500 shadow-[0_0_25px_rgba(249,115,22,0.8)] flex items-center justify-center text-white z-20">
                <CpuIcon className="size-5" />
              </div>

              {/* Sweeping Radar Beam (Exact Match to Screenshot 4 Glowing Amber Beam) */}
              <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                <div
                  className="absolute inset-0 radar-sweep origin-center"
                  style={{
                    background: "conic-gradient(from 0deg, rgba(249, 115, 22, 0.45) 0deg, rgba(249, 115, 22, 0.1) 45deg, transparent 90deg, transparent 360deg)",
                  }}
                />
              </div>

              {/* Blip 1 */}
              <span className="absolute top-10 right-12 size-2 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24] animate-ping" />
              <span className="absolute top-10 right-12 size-2 rounded-full bg-amber-400" />
              
              {/* Blip 2 */}
              <span className="absolute bottom-12 left-10 size-1.5 rounded-full bg-orange-400 shadow-[0_0_6px_#f97316] animate-pulse" />

            </div>

            {/* Radar Try Demo Button */}
            <Link
              href={ROUTES.login}
              className="mt-4 inline-flex items-center gap-1.5 rounded-xl border border-orange-500/40 bg-orange-500/10 px-4 py-1.5 text-xs font-bold text-orange-400 transition-all hover:bg-orange-500 hover:text-white"
            >
              <span>Try Live Engine</span>
              <ArrowUpRightIcon className="size-3.5" />
            </Link>

          </div>

          {/* Card 6: Fairness & Analytics Hub (Cyan) */}
          <div className="rounded-3xl border border-white/10 bg-[#0c101c]/80 p-7 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)]">
            <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)] mb-5">
              <BarChart3Icon className="size-6" />
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">Fairness & Analytics Hub</h3>
            <ul className="mt-4 space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
                <span>Gini index disparity tracking and quota compliance verification</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
                <span>Explainable allocation letters and real-time placement reports</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
}
