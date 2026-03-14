'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useI18n } from '@/lib/i18n/context';
import { useEffect, useState } from 'react';

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
  inView: boolean;
}

function AnimatedCounter({ end, suffix = '', duration = 2, inView }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, inView]);

  return (
    <span className="counter text-4xl md:text-5xl lg:text-6xl text-gradient-gold">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export function StatsSection() {
  const { t } = useI18n();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  const stats = [
    { value: 2500, suffix: '+', label: t.stats.guilds },
    { value: 75000, suffix: '+', label: t.stats.members },
    { value: 12000, suffix: '+', label: t.stats.raids },
    { value: 10, suffix: 'h', label: t.stats.hours },
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep via-purple-dark/30 to-navy-deep" />
      
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl">
        <div className="absolute inset-0 bg-gold-amber/5 blur-[100px] rounded-full" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="text-center"
            >
              <AnimatedCounter 
                end={stat.value} 
                suffix={stat.suffix} 
                inView={inView}
                duration={2}
              />
              <p className="text-slate-400 font-body mt-2 text-sm md:text-base">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
