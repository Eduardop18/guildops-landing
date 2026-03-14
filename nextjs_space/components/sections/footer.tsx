'use client';

import { useI18n } from '@/lib/i18n/context';
import { Gamepad2 } from 'lucide-react';

export function Footer() {
  const { t } = useI18n();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative py-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-navy-deep border-t border-slate-800" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-accent to-gold-amber flex items-center justify-center">
                <Gamepad2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-display font-bold text-white">GuildOps</span>
            </div>
            <p className="text-slate-400 font-body max-w-sm">
              {t.footer.description}
            </p>
          </div>
          
          {/* Product Links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">{t.footer.sections.product}</h4>
            <ul className="space-y-3">
              <li>
                <button onClick={() => scrollToSection('features')} className="text-slate-400 hover:text-gold-amber transition-colors font-body text-sm">
                  {t.footer.links.features}
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('pricing')} className="text-slate-400 hover:text-gold-amber transition-colors font-body text-sm">
                  {t.footer.links.pricing}
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('beta-signup')} className="text-slate-400 hover:text-gold-amber transition-colors font-body text-sm">
                  {t.footer.links.beta}
                </button>
              </li>
            </ul>
          </div>
          
          {/* Company Links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">{t.footer.sections.company}</h4>
            <ul className="space-y-3">
              <li>
                <span className="text-slate-400 font-body text-sm">
                  {t.footer.links.about}
                </span>
              </li>
              <li>
                <span className="text-slate-400 font-body text-sm">
                  {t.footer.links.contact}
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 font-body text-sm">
            {t.footer.copyright}
          </p>
          <div className="flex items-center gap-6">
            <span className="text-slate-500 font-body text-xs">Made for Mythic raiders, by Mythic raiders</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
