'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useI18n } from '@/lib/i18n/context';
import { LayoutDashboard, Calendar, BarChart3, Bell, Check } from 'lucide-react';

const featureIcons = [LayoutDashboard, Calendar, BarChart3, Bell];
const featureColors = [
  { bg: 'from-green-500/20 to-emerald-500/20', border: 'border-green-500/30', icon: 'text-green-400' },
  { bg: 'from-violet-500/20 to-purple-500/20', border: 'border-violet-500/30', icon: 'text-violet-400' },
  { bg: 'from-orange-500/20 to-amber-500/20', border: 'border-orange-500/30', icon: 'text-orange-400' },
  { bg: 'from-blue-500/20 to-cyan-500/20', border: 'border-blue-500/30', icon: 'text-blue-400' },
];

export function FeaturesSection() {
  const { t } = useI18n();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="features" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-navy-deep" />
      
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
            <span className="text-white">{t.features.title} </span>
            <span className="text-gradient-gold">{t.features.titleHighlight}</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto font-body">
            {t.features.description}
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {t.features.items.map((feature: { title: string; description: string; highlights: string[] }, index: number) => {
            const Icon = featureIcons[index];
            const colors = featureColors[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 * index }}
                className={`glass-card p-8 rounded-2xl group hover:border-gold-amber/50 transition-all duration-300`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colors.bg} border ${colors.border} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-7 h-7 ${colors.icon}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-display font-bold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-slate-400 font-body mb-4">
                      {feature.description}
                    </p>
                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2">
                      {feature.highlights.map((highlight: string, i: number) => (
                        <span 
                          key={i}
                          className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-slate-800/50 text-slate-300"
                        >
                          <Check className="w-3 h-3 text-green-400" />
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
