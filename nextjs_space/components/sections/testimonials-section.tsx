'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useI18n } from '@/lib/i18n/context';
import { Star, Quote } from 'lucide-react';

export function TestimonialsSection() {
  const { t } = useI18n();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep via-purple-dark/30 to-navy-deep" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-violet-accent/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-gold-amber/10 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
            <span className="text-white">{t.testimonials.title} </span>
            <span className="text-gradient-purple">{t.testimonials.titleHighlight}</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto font-body">
            {t.testimonials.description}
          </p>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {t.testimonials.items.map((testimonial: { quote: string; name: string; role: string; guild: string }, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * index }}
              className="glass-card p-6 rounded-2xl relative"
            >
              {/* Quote icon */}
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-lg bg-gold-amber/20 flex items-center justify-center">
                <Quote className="w-4 h-4 text-gold-amber" />
              </div>
              
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold-amber text-gold-amber" />
                ))}
              </div>
              
              {/* Quote */}
              <p className="text-slate-300 font-body mb-6 italic">
                "{testimonial.quote}"
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-accent to-gold-amber flex items-center justify-center text-white font-display font-bold text-sm">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-slate-400 text-xs">{testimonial.role} • {testimonial.guild}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
