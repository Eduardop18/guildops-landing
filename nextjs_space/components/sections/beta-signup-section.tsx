'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useI18n } from '@/lib/i18n/context';
import { Sparkles, Check, Loader2, Mail, Users, Globe, UserCircle } from 'lucide-react';

export function BetaSignupSection() {
  const { t } = useI18n();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    guildName: '',
    realm: '',
    role: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/beta-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Submission failed');
      setIsSuccess(true);
    } catch {
      setError(t.betaSignup.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <section id="beta-signup" className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-dark/30 via-navy-deep to-navy-deep" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto text-center glass-card p-12 rounded-2xl"
          >
            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-400" />
            </div>
            <h3 className="text-2xl font-display font-bold text-white mb-4">
              {t.betaSignup.success.title}
            </h3>
            <p className="text-slate-400 font-body">
              {t.betaSignup.success.message}
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="beta-signup" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-dark/30 via-navy-deep to-navy-deep" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-accent/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold-amber/10 rounded-full blur-[150px]" />
      
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <Sparkles className="w-4 h-4 text-gold-amber" />
              <span className="text-sm font-medium text-gold-amber">Limited Beta Access</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
              <span className="text-white">{t.betaSignup.title} </span>
              <span className="text-gradient-gold">{t.betaSignup.titleHighlight}</span>
            </h2>
            
            <p className="text-lg text-slate-400 font-body mb-8">
              {t.betaSignup.description}
            </p>
            
            {/* Benefits */}
            <div className="space-y-3">
              {['Early access to all features', 'Direct line to the dev team', 'Shape the product roadmap', 'Locked-in founder pricing'].map((benefit, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Check className="w-3 h-3 text-green-400" />
                  </div>
                  <span className="text-slate-300 font-body text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="glass-card p-8 rounded-2xl space-y-6">
              {/* Email */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                  <Mail className="w-4 h-4 text-violet-accent" />
                  {t.betaSignup.form.email}
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={t.betaSignup.form.emailPlaceholder}
                  className="w-full px-4 py-3 rounded-lg bg-navy-deep/50 border border-slate-700 text-white placeholder-slate-500 focus:border-violet-accent focus:outline-none focus:ring-1 focus:ring-violet-accent transition-colors font-body"
                />
              </div>

              {/* Guild Name */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                  <Users className="w-4 h-4 text-violet-accent" />
                  {t.betaSignup.form.guildName}
                </label>
                <input
                  type="text"
                  required
                  value={formData.guildName}
                  onChange={(e) => setFormData({ ...formData, guildName: e.target.value })}
                  placeholder={t.betaSignup.form.guildNamePlaceholder}
                  className="w-full px-4 py-3 rounded-lg bg-navy-deep/50 border border-slate-700 text-white placeholder-slate-500 focus:border-violet-accent focus:outline-none focus:ring-1 focus:ring-violet-accent transition-colors font-body"
                />
              </div>

              {/* Realm */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                  <Globe className="w-4 h-4 text-violet-accent" />
                  {t.betaSignup.form.realm}
                </label>
                <select
                  required
                  value={formData.realm}
                  onChange={(e) => setFormData({ ...formData, realm: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-navy-deep/50 border border-slate-700 text-white focus:border-violet-accent focus:outline-none focus:ring-1 focus:ring-violet-accent transition-colors font-body appearance-none cursor-pointer"
                >
                  <option value="" disabled>{t.betaSignup.form.realmPlaceholder}</option>
                  {t.betaSignup.realms.map((realm: string) => (
                    <option key={realm} value={realm}>{realm}</option>
                  ))}
                </select>
              </div>

              {/* Role */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                  <UserCircle className="w-4 h-4 text-violet-accent" />
                  {t.betaSignup.form.role}
                </label>
                <select
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-navy-deep/50 border border-slate-700 text-white focus:border-violet-accent focus:outline-none focus:ring-1 focus:ring-violet-accent transition-colors font-body appearance-none cursor-pointer"
                >
                  <option value="" disabled>{t.betaSignup.form.rolePlaceholder}</option>
                  {t.betaSignup.roles.map((role: string) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>

              {/* Error Message */}
              {error && (
                <p className="text-red-400 text-sm font-body">{error}</p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary py-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {t.betaSignup.form.submitting}
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    {t.betaSignup.form.submit}
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
