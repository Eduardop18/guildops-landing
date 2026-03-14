'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useI18n } from '@/lib/i18n/context';
import { Check, Sparkles } from 'lucide-react';

export function PricingSection() {
  const { t } = useI18n();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const scrollToSignup = () => {
    document.getElementById('beta-signup')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-mesh" />
      
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
            <span className="text-white">{t.pricing.title} </span>
            <span className="text-gradient-gold">{t.pricing.titleHighlight}</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto font-body">
            {t.pricing.description}
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {t.pricing.tiers.map((tier: { name: string; price: string; description: string; features: string[] }, index: number) => {
            const isPopular = index === 1;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 * index }}
                className={`relative rounded-2xl p-8 ${
                  isPopular 
                    ? 'glass-card border-gold-amber/50 scale-105 shadow-2xl shadow-gold-amber/10' 
                    : 'glass-card'
                }`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1 px-4 py-1 rounded-full bg-gold-amber text-navy-deep text-sm font-display font-semibold">
                      <Sparkles className="w-4 h-4" />
                      {t.pricing.popular}
                    </div>
                  </div>
                )}

                {/* Tier Name */}
                <h3 className="text-xl font-display font-bold text-white mb-2">
                  {tier.name}
                </h3>
                <p className="text-slate-400 font-body text-sm mb-6">
                  {tier.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <span className={`text-4xl font-display font-bold ${isPopular ? 'text-gradient-gold' : 'text-white'}`}>
                    {tier.price}
                  </span>
                  {tier.price !== '$0' && (
                    <span className="text-slate-400 font-body">{t.pricing.monthly}</span>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isPopular ? 'bg-gold-amber/20' : 'bg-violet-accent/20'
                      }`}>
                        <Check className={`w-3 h-3 ${isPopular ? 'text-gold-amber' : 'text-violet-accent'}`} />
                      </div>
                      <span className="text-slate-300 font-body text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={scrollToSignup}
                  className={`w-full py-3 rounded-lg font-display font-semibold text-sm uppercase tracking-wide transition-all ${
                    isPopular 
                      ? 'btn-primary' 
                      : 'btn-secondary'
                  }`}
                >
                  {t.pricing.cta}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
