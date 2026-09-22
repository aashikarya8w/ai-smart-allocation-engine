import type { Metadata } from "next";
import { HeroSection } from "@/components/common/HeroSection";
import { StatsSection } from "@/components/common/StatsSection";
import { FeaturesSection } from "@/components/common/FeaturesSection";
import { HowItWorksSection } from "@/components/common/HowItWorksSection";
import { RoleCardsSection } from "@/components/common/RoleCardsSection";
import { CTASection } from "@/components/common/CTASection";

export const metadata: Metadata = {
  title: "InternAI – AI-Based Smart Allocation Engine for PM Internship Scheme",
  description:
    "Connecting students with the right internship opportunities through intelligent matching and smart allocation.",
};

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <RoleCardsSection />
      <CTASection />
    </>
  );
}
