"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRightIcon, BarChart2Icon } from "lucide-react";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "universities", label: "Universities" },
  { id: "corporates", label: "Corporate Partners" },
  { id: "government", label: "State Agencies" },
];

export function IntegrationsSection() {
  const [activeTab, setActiveTab] = useState("universities");

  return (
    <section id="integrations" className="relative bg-[#07090e] py-24 sm:py-32 border-b border-white/[0.06] overflow-hidden text-white">
      
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/3 h-[500px] w-[500px] rounded-full bg-orange-600/10 blur-[140px]" />
        <div className="cyber-dots absolute inset-0 opacity-20" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* Top Case Studies Showcase (Exact Match to Screenshot 5 Top) */}
        <div>
          {/* Badge & Top Action */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
            <span className="rounded-xl border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-bold text-white backdrop-blur-md">
              Case Studies
            </span>
            <Link
              href={ROUTES.register}
              className="rounded-xl border border-white/15 bg-white/5 px-5 py-2 text-xs font-bold text-slate-300 transition-all hover:bg-white/10 hover:text-white"
            >
              See all case studies
            </Link>
          </div>

          {/* Title & Tabs */}
          <div className="mt-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Remarkable results for <br />
                every size institution.
              </h2>
            </div>
            
            {/* Tabs (Enterprise / Mid-Sized / Small) */}
            <div className="flex items-center gap-3 border-b border-white/10 pb-2">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "pb-2 text-sm font-semibold transition-all relative",
                    activeTab === tab.id
                      ? "text-orange-400"
                      : "text-slate-400 hover:text-white"
                  )}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full shadow-[0_0_8px_#f97316]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Case Study Featured Card */}
          <div className="mt-12 grid grid-cols-1 items-center gap-8 lg:grid-cols-12 rounded-3xl border border-white/10 bg-[#0c101c]/80 p-8 sm:p-12 backdrop-blur-2xl shadow-[0_20px_70px_rgba(0,0,0,0.4)]">
            
            {/* Left Visual: AI Growth Simulation & Live Metrics */}
            <div className="lg:col-span-6 rounded-2xl border border-white/10 bg-[#07090e] p-6 shadow-inner relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <BarChart2Icon className="size-4 text-orange-400" />
                  <span className="font-mono text-xs uppercase tracking-wider text-slate-300">
                    Quarterly Placement Growth
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-emerald-400">+62.7% YoY</span>
              </div>

              {/* Graphic Mock Chart */}
              <div className="mt-6 flex items-end justify-between gap-3 h-40 pt-4 px-2">
                {[
                  { label: "Q1", height: "45%", color: "bg-slate-700" },
                  { label: "Q2", height: "60%", color: "bg-slate-600" },
                  { label: "Q3", height: "78%", color: "bg-amber-600" },
                  { label: "Q4", height: "98%", color: "bg-orange-500 shadow-[0_0_15px_#f97316]" },
                ].map((bar) => (
                  <div key={bar.label} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full rounded-t-lg bg-slate-800/80 h-32 flex items-end">
                      <div
                        className={cn("w-full rounded-t-lg transition-all", bar.color)}
                        style={{ height: bar.height }}
                      />
                    </div>
                    <span className="font-mono text-[11px] text-slate-400">{bar.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Testimonial Quote */}
            <div className="lg:col-span-6 space-y-4 lg:pl-6">
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed italic">
                &ldquo;InternAI took the time to understand our student skill variance fully. The pre-matching and subsequent smart allocation stood out from the start. They committed to engage with us deeply and delivered 100% seat utilization.&rdquo;
              </p>

              <div>
                <p className="text-base font-bold text-white">Dr. Arvind Sharma</p>
                <p className="text-xs text-orange-400">Dean of Corporate Relations & Placements</p>
              </div>

              <div className="pt-2">
                <Link
                  href={ROUTES.register}
                  className="inline-flex items-center gap-2 text-xs font-bold text-slate-200 underline underline-offset-4 hover:text-orange-400 transition-colors"
                >
                  <span>Read full case study</span>
                  <ArrowRightIcon className="size-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Section: 2,000+ Integrations with Glowing Circuit Traces (Exact Match to Screenshot 5 Bottom) */}
        <div className="text-center pt-10">
          
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            2,000+ integrations with your <br />
            <span className="bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              favorite tools
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base text-slate-400">
            Connect your favourite tools and enterprise platforms in one place.
          </p>

          {/* Interactive Circuit Network of Tools */}
          <div className="relative mt-16 max-w-4xl mx-auto rounded-3xl border border-white/10 bg-[#0c101c]/70 p-10 backdrop-blur-xl">
            
            {/* Glowing Circuit Connector Lines (Exact match to Image 5 glowing branches) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center">
              
              {[
                { name: "DigiLocker", role: "Govt ID & Documents", color: "border-blue-500/40 text-blue-400" },
                { name: "AICTE Portal", role: "Institution Accreditation", color: "border-orange-500/40 text-orange-400" },
                { name: "NATS / NAPS", role: "Stipend & Apprenticeship", color: "border-emerald-500/40 text-emerald-400" },
                { name: "LinkedIn", role: "Skill & Endorsement Sync", color: "border-cyan-500/40 text-cyan-400" },
                { name: "GitHub", role: "Code Repository Scoring", color: "border-purple-500/40 text-purple-400" },
                { name: "Google Cloud", role: "Cloud Storage & Gemini AI", color: "border-pink-500/40 text-pink-400" },
                { name: "Workday / HRMS", role: "Corporate Candidate Sync", color: "border-amber-500/40 text-amber-400" },
                { name: "PM Scheme API", role: "Central Quota Verification", color: "border-rose-500/40 text-rose-400" },
              ].map((tool) => (
                <div
                  key={tool.name}
                  className={cn(
                    "rounded-2xl border bg-[#07090e]/80 p-4 text-center transition-all duration-300 hover:scale-105 hover:bg-[#07090e]",
                    tool.color
                  )}
                >
                  <p className="text-sm font-bold text-white">{tool.name}</p>
                  <p className="mt-1 text-[10px] text-slate-400">{tool.role}</p>
                </div>
              ))}

            </div>

            {/* Glowing Integrations Pill Button (Exact Match to Screenshot 5) */}
            <div className="mt-8 flex justify-center">
              <Link
                href={ROUTES.register}
                className="inline-flex items-center gap-2 rounded-xl border border-orange-500/50 bg-orange-500/10 px-8 py-3 text-xs font-bold text-orange-400 backdrop-blur-md shadow-[0_0_20px_rgba(249,115,22,0.25)] transition-all hover:bg-orange-500 hover:text-white"
              >
                <span>See all integrations</span>
                <ArrowRightIcon className="size-3.5" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
