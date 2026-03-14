'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useI18n } from '@/lib/i18n/context';
import { Sparkles, ArrowRight } from 'lucide-react';

export function FinalCTASection() {
  const { t } = useI18n();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const scrollToSignup = () => {
    document.getElementById('beta-signup')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background with intense glow */}
      <div className="absolute inset-0 bg-navy-deep" />
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-accent/20 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gold-amber/15 rounded-full blur-[100px]" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-accent to-gold-amber mb-8 glow-gold"
          >
            <Sparkles className="w-10 h-10 text-white" />
          </motion.div>
          
          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
            <span className="text-white">{t.finalCta.title} </span>
            <br className="hidden md:block" />
            <span className="text-gradient-purple-gold">{t.finalCta.titleHighlight}</span>
          </h2>
          
          {/* Description */}
          <p className="text-xl text-slate-300 font-body mb-10">
            {t.finalCta.description}
          </p>
          
          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={scrollToSignup}
            className="btn-primary text-lg px-10 py-4 inline-flex items-center gap-3"
          >
            {t.finalCta.cta}
            <ArrowRight className="w-5 h-5" />
          </motion.button>
          
          {/* Note */}
          <p className="text-sm text-slate-500 font-body mt-6">
            {t.finalCta.note}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
