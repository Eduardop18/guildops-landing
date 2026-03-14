import { HeroSection } from '@/components/sections/hero-section';
import { ProblemSection } from '@/components/sections/problem-section';
import { SolutionSection } from '@/components/sections/solution-section';
import { HowItWorksSection } from '@/components/sections/how-it-works-section';
import { FeaturesSection } from '@/components/sections/features-section';
import { StatsSection } from '@/components/sections/stats-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { PricingSection } from '@/components/sections/pricing-section';
import { FAQSection } from '@/components/sections/faq-section';
import { BetaSignupSection } from '@/components/sections/beta-signup-section';
import { FinalCTASection } from '@/components/sections/final-cta-section';
import { Footer } from '@/components/sections/footer';
import { ParticlesBackground } from '@/components/particles-background';

export default function Home() {
  return (
    <main className="min-h-screen bg-navy-deep relative">
      {/* Animated Particles Background */}
      <ParticlesBackground />
      
      {/* Page Sections */}
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <FeaturesSection />
      <StatsSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <BetaSignupSection />
      <FinalCTASection />
      <Footer />
    </main>
  );
}
