'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useI18n } from '@/lib/i18n/context';
import { Clock, Activity, Brain, Check } from 'lucide-react';

const benefitIcons = [Clock, Activity, Brain];

export function SolutionSection() {
  const { t } = useI18n();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-dark/50 via-navy-deep to-purple-dark/30" />
      
      {/* Decorative orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-violet-accent/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gold-amber/10 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
              <span className="text-white">{t.solution.title} </span>
              <br />
              <span className="text-gradient-purple-gold">{t.solution.titleHighlight}</span>
            </h2>
            <p className="text-lg text-slate-400 mb-8 font-body">
              {t.solution.description}
            </p>
            
            {/* Benefits List */}
            <div className="space-y-4">
              {t.solution.benefits.map((benefit: { title: string; description: string }, index: number) => {
                const Icon = benefitIcons[index];
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.2 + 0.1 * index }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-lg bg-violet-accent/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-violet-accent" />
                    </div>
                    <div>
                      <h3 className="text-lg font-display font-semibold text-white">
                        {benefit.title}
                      </h3>
                      <p className="text-slate-400 font-body text-sm">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right - Feature Preview */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="glass-card p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-auto text-sm text-slate-500 font-mono">dashboard.guildops.gg</span>
              </div>
              
              {/* Mock Dashboard Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-navy-deep/50 rounded-lg p-4">
                  <p className="text-xs text-slate-500 mb-1">Roster Health</p>
                  <p className="text-2xl font-display font-bold text-green-400">94%</p>
                  <div className="w-full h-1 bg-slate-700 rounded-full mt-2">
                    <div className="w-[94%] h-full bg-green-400 rounded-full" />
                  </div>
                </div>
                <div className="bg-navy-deep/50 rounded-lg p-4">
                  <p className="text-xs text-slate-500 mb-1">Attendance</p>
                  <p className="text-2xl font-display font-bold text-gold-amber">87%</p>
                  <div className="w-full h-1 bg-slate-700 rounded-full mt-2">
                    <div className="w-[87%] h-full bg-gold-amber rounded-full" />
                  </div>
                </div>
              </div>
              
              {/* Mock Activity List */}
              <div className="space-y-3">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex items-center gap-3 bg-navy-deep/30 rounded-lg p-3">
                    <div className="w-8 h-8 rounded-full bg-violet-accent/20 flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <div className="h-2 bg-slate-700 rounded w-3/4" />
                      <div className="h-2 bg-slate-800 rounded w-1/2 mt-1" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Floating notification */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="absolute -bottom-4 -right-4 glass p-4 rounded-xl max-w-[200px]"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-slate-400">Real-time sync</span>
              </div>
              <p className="text-sm text-white mt-1 font-medium">Raid signup confirmed</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
