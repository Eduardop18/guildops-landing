'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n/context';
import { Sparkles, Play, ChevronDown } from 'lucide-react';

export function HeroSection() {
  const { t } = useI18n();

  const scrollToSignup = () => {
    document.getElementById('beta-signup')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-mesh">
      {/* Gradient Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-violet-accent/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold-amber/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
            >
              <Sparkles className="w-4 h-4 text-gold-amber" />
              <span className="text-sm font-medium text-gold-amber">{t.hero.badge}</span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
              <span className="text-white">{t.hero.title.split(' ').slice(0, 2).join(' ')}</span>
              <br />
              <span className="text-gradient-gold glow-text-gold">{t.hero.title.split(' ').slice(2).join(' ')}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-xl mx-auto lg:mx-0 font-body">
              {t.hero.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToSignup}
                className="btn-primary flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                {t.hero.cta}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToFeatures}
                className="btn-secondary flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5" />
                {t.hero.ctaSecondary || 'See Features'}
              </motion.button>
            </div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-10 flex items-center gap-6 justify-center lg:justify-start text-slate-400 text-sm"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span>{t.hero.trustBadge1 || 'Free to start'}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span>{t.hero.trustBadge2 || 'No credit card'}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden glow-purple">
              {/* Glow effect behind image */}
              <div className="absolute inset-0 bg-gradient-to-r from-violet-accent/20 to-gold-amber/20 blur-2xl" />
              
              {/* Dashboard Image */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-violet-accent/30">
                <Image
                  src="/images/dashboard-mockup.png"
                  alt="GuildOPS Dashboard - Raid Calendar, Roster, and Performance Stats"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/60 via-transparent to-transparent" />
              </div>

              {/* Floating Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-4 -left-4 glass-card p-4 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-accent to-gold-amber flex items-center justify-center">
                    <span className="text-lg font-bold text-white">94%</span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">{t.hero.statLabel1 || 'Raid Attendance'}</p>
                    <p className="text-sm font-semibold text-white">{t.hero.statValue1 || '+12% this month'}</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Guild Card */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="absolute -top-4 -right-4 glass-card p-4 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gold-amber/20 flex items-center justify-center">
                    <span className="text-2xl">⚔️</span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">{t.hero.statLabel2 || 'Active Guilds'}</p>
                    <p className="text-sm font-semibold text-gold-amber">{t.hero.statValue2 || '2,500+'}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="cursor-pointer"
            onClick={() => document.getElementById('pain-points')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <ChevronDown className="w-8 h-8 text-slate-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
