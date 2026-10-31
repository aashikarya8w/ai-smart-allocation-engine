"use client";

import { SparklesIcon, CheckCircle2Icon, UsersIcon, BuildingIcon, CpuIcon } from "lucide-react";

export function FeaturesSection() {
  return (
    <section id="features" className="relative bg-[#07090e] py-24 sm:py-32 border-b border-white/[0.06] overflow-hidden">
      
      {/* Background radial ambient lights */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/4 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-blue-600/10 blur-[130px]" />
        <div className="absolute top-1/2 right-1/4 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-orange-600/10 blur-[130px]" />
        <div className="cyber-dots absolute inset-0 opacity-30" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Matching Screenshot 2 Typography) */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            All your internship data and tools <br />
            <span className="text-slate-200">connected in one platform.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            Connected data and intelligent tools help you run student placements and corporate allocations better.
          </p>
        </div>

        {/* 3 Neon Glow Cards (Exact Match to Screenshot 2) */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          
          {/* Card 01: Blue Neon Border (Smart CRM / Matching) */}
          <div className="group relative rounded-3xl bg-[#0c101c]/90 p-7 backdrop-blur-xl transition-all duration-300 neon-card-blue flex flex-col justify-between">
            
            {/* Top Mockup Preview Window */}
            <div className="mb-8 rounded-2xl border border-white/10 bg-[#07090e] p-5 shadow-inner">
              {/* Window dots */}
              <div className="flex items-center gap-1.5 pb-4 border-b border-white/10">
                <span className="size-2 rounded-full bg-slate-600" />
                <span className="size-2 rounded-full bg-slate-600" />
                <span className="size-2 rounded-full bg-slate-600" />
                <span className="ml-2 font-mono text-[11px] text-slate-400">Smart Matching CRM</span>
              </div>

              {/* Mock candidate card */}
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between rounded-xl bg-white/[0.04] p-3 border border-white/[0.06]">
                  <div className="flex items-center gap-2.5">
                    <div className="size-7 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                      AI
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">Fullstack Developer</p>
                      <p className="text-[10px] text-slate-400">TechNova Solutions</p>
                    </div>
                  </div>
                  <span className="size-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
                  <span>Match Score</span>
                  <span className="font-mono font-bold text-blue-400">96.8%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full rounded-full bg-blue-500 w-[96%]" />
                </div>
              </div>
            </div>

            {/* Bottom Content with Step 01 */}
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="flex size-7 items-center justify-center rounded-lg bg-blue-500 text-white font-mono text-xs font-bold shadow-[0_0_12px_rgba(59,130,246,0.6)]">
                  01
                </span>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-blue-500/40 to-transparent" />
              </div>

              <h3 className="text-xl font-bold text-white tracking-tight">
                An Engine that&apos;s really smart
              </h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                InternAI&apos;s multi-factor matching engine is the single source of truth that connects student qualifications, skills, and corporate vacancies.
              </p>
            </div>

          </div>

          {/* Card 02: Orange Neon Border (Products that connect all) */}
          <div className="group relative rounded-3xl bg-[#0c101c]/90 p-7 backdrop-blur-xl transition-all duration-300 neon-card-orange flex flex-col justify-between">
            
            {/* Top Mockup Preview Window: Connected Nodes */}
            <div className="mb-8 rounded-2xl border border-white/10 bg-[#07090e] p-5 shadow-inner">
              {/* Window dots */}
              <div className="flex items-center gap-1.5 pb-4 border-b border-white/10">
                <span className="size-2 rounded-full bg-slate-600" />
                <span className="size-2 rounded-full bg-slate-600" />
                <span className="size-2 rounded-full bg-slate-600" />
                <span className="ml-2 font-mono text-[11px] text-slate-400">Allocation Pipeline</span>
              </div>

              {/* Node connection diagram matching image 2 center */}
              <div className="relative my-4 flex h-24 items-center justify-between px-2">
                {/* Left Node */}
                <div className="flex flex-col items-center gap-1 z-10">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/40 shadow-[0_0_12px_rgba(249,115,22,0.3)]">
                    <UsersIcon className="size-4" />
                  </div>
                  <span className="text-[10px] text-slate-400">Students</span>
                </div>

                {/* Center Core Node */}
                <div className="flex flex-col items-center gap-1 z-10">
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-orange-500 text-white font-bold shadow-[0_0_20px_rgba(249,115,22,0.8)] animate-pulse">
                    <CpuIcon className="size-5" />
                  </div>
                  <span className="text-[10px] text-orange-300 font-semibold">AI Engine</span>
                </div>

                {/* Right Node */}
                <div className="flex flex-col items-center gap-1 z-10">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.3)]">
                    <BuildingIcon className="size-4" />
                  </div>
                  <span className="text-[10px] text-slate-400">Companies</span>
                </div>

                {/* Connecting Neon Line */}
                <div className="absolute left-6 right-6 top-[22px] h-[1px] bg-gradient-to-r from-orange-500/60 via-amber-400 to-orange-500/60" />
              </div>
            </div>

            {/* Bottom Content with Step 02 */}
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="flex size-7 items-center justify-center rounded-lg bg-orange-500 text-white font-mono text-xs font-bold shadow-[0_0_12px_rgba(249,115,22,0.6)]">
                  02
                </span>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-orange-500/40 to-transparent" />
              </div>

              <h3 className="text-xl font-bold text-white tracking-tight">
                Products that connect all.
              </h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Unify students, corporate HR teams, and administrators to create content, find verified talent, close seats, and monitor outcomes.
              </p>
            </div>

          </div>

          {/* Card 03: Purple Neon Border (AI that gets your work done) */}
          <div className="group relative rounded-3xl bg-[#0c101c]/90 p-7 backdrop-blur-xl transition-all duration-300 neon-card-purple flex flex-col justify-between">
            
            {/* Top Mockup Preview Window */}
            <div className="mb-8 rounded-2xl border border-white/10 bg-[#07090e] p-5 shadow-inner">
              {/* Window dots */}
              <div className="flex items-center gap-1.5 pb-4 border-b border-white/10">
                <span className="size-2 rounded-full bg-slate-600" />
                <span className="size-2 rounded-full bg-slate-600" />
                <span className="size-2 rounded-full bg-slate-600" />
                <span className="ml-2 font-mono text-[11px] text-slate-400">Breeze Autonomous Tasks</span>
              </div>

              {/* Automated AI Task items */}
              <div className="mt-4 space-y-2.5">
                <div className="flex items-center justify-between rounded-lg bg-white/[0.04] px-3 py-2 text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2Icon className="size-3.5 text-purple-400" />
                    <span className="text-slate-300">Resume Parser</span>
                  </div>
                  <span className="font-mono text-[10px] text-purple-400">Completed</span>
                </div>

                <div className="flex items-center justify-between rounded-lg bg-white/[0.04] px-3 py-2 text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2Icon className="size-3.5 text-purple-400" />
                    <span className="text-slate-300">Quota Fairness Run</span>
                  </div>
                  <span className="font-mono text-[10px] text-purple-400">100% OK</span>
                </div>

                <div className="flex items-center justify-between rounded-lg bg-white/[0.04] px-3 py-2 text-xs">
                  <div className="flex items-center gap-2">
                    <SparklesIcon className="size-3.5 text-pink-400 animate-spin" />
                    <span className="text-slate-300">What-If Simulator</span>
                  </div>
                  <span className="font-mono text-[10px] text-pink-400">Active</span>
                </div>
              </div>
            </div>

            {/* Bottom Content with Step 03 */}
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="flex size-7 items-center justify-center rounded-lg bg-purple-500 text-white font-mono text-xs font-bold shadow-[0_0_12px_rgba(168,85,247,0.6)]">
                  03
                </span>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-purple-500/40 to-transparent" />
              </div>

              <h3 className="text-xl font-bold text-white tracking-tight">
                AI that gets your work done.
              </h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Built-in AI models boost allocation velocity, scale institutional growth, eliminate allocation bias, and unlock deep career insights.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
