import { Navbar } from "@/components/landing/navbar";
import { cn } from "../lib/utils";
import { HeroSection } from "@/components/landing/hero-section";
import { TerminalDemo } from "@/components/landing/terminal-demo";
import { FeaturesSection } from "@/components/landing/features-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { UseCasesSection } from "@/components/landing/use-cases-section";
import { InstallationSection } from "@/components/landing/installation-section";
import { CTASection } from "@/components/landing/cta-section";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <main className={cn('min-h-screen', 'bg-background')}>
      <Navbar />

      <HeroSection />

      <TerminalDemo />

      <FeaturesSection />

      <HowItWorksSection />

      <UseCasesSection />

      <InstallationSection />

      <CTASection />

      <Footer />

    </main>
  );
}