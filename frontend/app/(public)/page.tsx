import type { Metadata } from "next";
import { HeroSection } from "@/components/common/HeroSection";
import { FeaturesSection } from "@/components/common/FeaturesSection";
import { AIAgentsSection } from "@/components/common/AIAgentsSection";
import { HubsSection } from "@/components/common/HubsSection";
import { IntegrationsSection } from "@/components/common/IntegrationsSection";
import { RoleCardsSection } from "@/components/common/RoleCardsSection";
import { CTASection } from "@/components/common/CTASection";

export const metadata: Metadata = {
  title: "InternAI – AI-Based Smart Allocation Engine",
  description:
    "AI-Based Smart Allocation Engine for PM Internship Scheme (SIH25033). Connecting students with the right internship opportunities through intelligent matching.",
};

export default function LandingPage() {
  return (
    <div className="bg-[#07090e] min-h-screen">
      {/* 1. Hero with Glowing Cybernetic AI Head (Reference Image 1) */}
      <HeroSection />

      {/* 2. Connected Platform - 3 Neon Cards (Reference Image 2) */}
      <FeaturesSection />

      {/* 3. 24/7 AI Agents with Particle Streams (Reference Image 3) */}
      <AIAgentsSection />

      {/* 4. Multi-Hub Ecosystem & Central Radar Scanner (Reference Image 4) */}
      <HubsSection />

      {/* 5. Case Studies & 2,000+ Integrations with Glowing Circuits (Reference Image 5) */}
      <IntegrationsSection />

      {/* 6. Portals for Student, Company & Admin */}
      <RoleCardsSection />

      {/* 7. High-Conversion CTA */}
      <CTASection />
    </div>
  );
}
