"use client";

import { useI18n } from '@/lib/i18n/context';
import { Globe } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200"
      >
        <Globe className="w-4 h-4 text-purple-400" />
        <span className="text-sm font-medium text-white">
          {language === 'en' ? 'EN' : 'ES'}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-2 bg-zinc-900/95 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden shadow-xl"
          >
            <button
              onClick={() => {
                setLanguage('en');
                setIsOpen(false);
              }}
              className={`flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-white/10 transition-colors ${
                language === 'en' ? 'text-purple-400' : 'text-white'
              }`}
            >
              <span className="text-lg">🇺🇸</span>
              <span className="text-sm font-medium">{t.language.en}</span>
            </button>
            <button
              onClick={() => {
                setLanguage('es');
                setIsOpen(false);
              }}
              className={`flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-white/10 transition-colors ${
                language === 'es' ? 'text-purple-400' : 'text-white'
              }`}
            >
              <span className="text-lg">🇪🇸</span>
              <span className="text-sm font-medium">{t.language.es}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
