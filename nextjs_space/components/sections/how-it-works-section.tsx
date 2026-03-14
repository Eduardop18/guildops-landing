'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useI18n } from '@/lib/i18n/context';
import { Link2, Settings, Trophy } from 'lucide-react';

const stepIcons = [Link2, Settings, Trophy];

export function HowItWorksSection() {
  const { t } = useI18n();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="relative py-24 overflow-hidden">
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
            <span className="text-white">{t.howItWorks.title} </span>
            <span className="text-gradient-purple">{t.howItWorks.titleHighlight}</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto font-body">
            {t.howItWorks.description}
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection Lines */}
          <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-violet-accent via-gold-amber to-violet-accent opacity-30" style={{ transform: 'translateY(-50%)' }} />
          
          {t.howItWorks.steps.map((step: { number: string; title: string; description: string }, index: number) => {
            const Icon = stepIcons[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 * (index + 1) }}
                className="relative text-center"
              >
                {/* Step Number */}
                <div className="inline-flex items-center justify-center mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-accent to-gold-amber rounded-full blur-lg opacity-50" />
                    <div className="relative w-20 h-20 rounded-full glass border-2 border-violet-accent/50 flex items-center justify-center">
                      <Icon className="w-8 h-8 text-gold-amber" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gold-amber flex items-center justify-center text-navy-deep font-display font-bold text-sm">
                      {step.number}
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-display font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-400 font-body max-w-xs mx-auto">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
