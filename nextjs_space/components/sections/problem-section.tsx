'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useI18n } from '@/lib/i18n/context';
import { AlertTriangle, MessageSquare, Database, Flame } from 'lucide-react';

const icons = [AlertTriangle, MessageSquare, Database, Flame];

export function ProblemSection() {
  const { t } = useI18n();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="pain-points" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep via-purple-dark/50 to-navy-deep" />
      
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
            <span className="text-white">{t.problem.title} </span>
            <span className="text-gradient-gold">{t.problem.titleHighlight}</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto font-body">
            {t.problem.description}
          </p>
        </motion.div>

        {/* Pain Point Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.problem.cards.map((card: { title: string; description: string }, index: number) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                className="glass-card p-6 rounded-xl group"
              >
                <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center mb-4 group-hover:bg-gold-amber/20 transition-colors">
                  <Icon className="w-6 h-6 text-red-400 group-hover:text-gold-amber transition-colors" />
                </div>
                <h3 className="text-xl font-display font-semibold text-white mb-3">
                  {card.title}
                </h3>
                <p className="text-slate-400 font-body">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
