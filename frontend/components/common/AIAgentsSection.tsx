"use client";

import Link from "next/link";
import { ROUTES } from "@/lib/constants";

export function AIAgentsSection() {
  return (
    <section id="agents" className="relative bg-[#07090e] py-24 sm:py-32 border-b border-white/[0.06] overflow-hidden">
      
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/3 right-1/4 h-[450px] w-[450px] rounded-full bg-orange-500/10 blur-[130px]" />
        <div className="cyber-dots absolute inset-0 opacity-25" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Container Card (Exact Match to Screenshot 3 Dark Glass Container) */}
        <div className="rounded-3xl border border-white/10 bg-[#0c101c]/80 p-8 sm:p-12 lg:p-16 backdrop-blur-2xl shadow-[0_20px_70px_rgba(0,0,0,0.5)]">
          
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            
            {/* Left Column: Text, Glowing Bullets, White Pill Button */}
            <div className="lg:col-span-6 space-y-6">
              
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl leading-tight">
                Built-in AI agents that <br />
                work for you 24/7.
              </h2>

              <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
                InternAI Agents are your always-on teammates. They resolve over 95% of allocation decisions, eligibility screening, and skill verifications automatically.
              </p>

              {/* Glowing Bullets (Exact Match to Screenshot 3) */}
              <div className="space-y-5 pt-3">
                
                {/* Bullet 1: Blue */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
                    <h4 className="text-base font-bold text-blue-400">
                      Candidate Matching Agent
                    </h4>
                  </div>
                  <p className="pl-4 text-sm text-slate-400">
                    Get instant semantic scoring and multi-factor evaluation of every applicant in real time.
                  </p>
                </div>

                {/* Bullet 2: Orange */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-orange-500 shadow-[0_0_10px_#f97316]" />
                    <h4 className="text-base font-bold text-orange-400">
                      Smart Allocation Agent
                    </h4>
                  </div>
                  <p className="pl-4 text-sm text-slate-400">
                    Rule-based seat allocation enforcing reservation quotas, merit tie-breaking, and zero manual bias.
                  </p>
                </div>

                {/* Bullet 3: Magenta */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-pink-500 shadow-[0_0_10px_#ec4899]" />
                    <h4 className="text-base font-bold text-pink-400">
                      Readiness & Career Roadmap Agent
                    </h4>
                  </div>
                  <p className="pl-4 text-sm text-slate-400">
                    Personalized skill gap milestones, &apos;What-If&apos; profile simulation, and automated learning pathways.
                  </p>
                </div>

              </div>

              {/* White Pill Button (Exact Match to Screenshot 3 "Content Agent" button) */}
              <div className="pt-4">
                <Link
                  href={ROUTES.register}
                  className="inline-flex items-center justify-center rounded-xl bg-white px-7 py-3 text-sm font-bold text-slate-950 shadow-[0_0_25px_rgba(255,255,255,0.35)] transition-all hover:bg-slate-100 hover:scale-105 active:scale-95"
                >
                  Explore AI Agents
                </Link>
              </div>

            </div>

            {/* Right Column: Multi-Column Particle Stream Visualization (Matching Screenshot 3) */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              
              <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-[#07090e]/90 p-8 shadow-inner overflow-hidden">
                
                {/* Horizontal Guide Lines */}
                <div className="absolute top-[42%] left-0 right-0 h-[1px] bg-slate-800/80" />
                <div className="absolute top-[68%] left-0 right-0 h-[1px] bg-slate-800/80" />

                <div className="grid grid-cols-3 gap-6 items-center text-center relative z-10">
                  
                  {/* Column 1: Blue Particle Stream (Data Agent) */}
                  <div className="flex flex-col items-center">
                    <div className="relative h-60 w-12 flex flex-col items-center justify-between py-2">
                      {/* Floating glowing blue dots */}
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                        <span
                          key={i}
                          className="size-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6] particle-float"
                          style={{
                            animationDelay: `${i * 0.25}s`,
                            opacity: (i % 3 === 0 ? 0.9 : 0.4),
                            transform: `translateX(${(i % 2 === 0 ? 4 : -4)}px)`,
                          }}
                        />
                      ))}
                    </div>
                    <p className="mt-3 text-xs font-mono font-medium text-slate-400">
                      Data Agent
                    </p>
                  </div>

                  {/* Column 2: Orange Particle Stream (Customer / Allocation Agent) */}
                  <div className="flex flex-col items-center">
                    <div className="relative h-60 w-12 flex flex-col items-center justify-between py-2">
                      {/* Floating glowing orange dots */}
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                        <span
                          key={i}
                          className="size-2 rounded-full bg-orange-500 shadow-[0_0_8px_#f97316] particle-float"
                          style={{
                            animationDelay: `${i * 0.3}s`,
                            opacity: (i % 2 === 0 ? 0.95 : 0.45),
                            transform: `translateX(${(i % 3 === 0 ? -5 : 5)}px)`,
                          }}
                        />
                      ))}
                    </div>
                    <p className="mt-3 text-xs font-mono font-medium text-orange-400 font-semibold">
                      Allocation Agent
                    </p>
                  </div>

                  {/* Column 3: Magenta Particle Stream (Career Agent) */}
                  <div className="flex flex-col items-center">
                    <div className="relative h-60 w-12 flex flex-col items-center justify-between py-2">
                      {/* Floating glowing magenta dots */}
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                        <span
                          key={i}
                          className="size-2 rounded-full bg-pink-500 shadow-[0_0_8px_#ec4899] particle-float"
                          style={{
                            animationDelay: `${i * 0.2}s`,
                            opacity: (i % 2 === 0 ? 0.9 : 0.35),
                            transform: `translateX(${(i % 2 === 0 ? 3 : -3)}px)`,
                          }}
                        />
                      ))}
                    </div>
                    <p className="mt-3 text-xs font-mono font-medium text-slate-400">
                      Career Agent
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
