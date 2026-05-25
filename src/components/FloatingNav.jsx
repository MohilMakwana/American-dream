import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function FloatingNav({ activeSection, onLinkClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'OVERVIEW' },
    { id: 'scale', label: 'REACH' },
    { id: 'retail', label: 'BRANDS' },
    { id: 'entertainment', label: 'ATTRACTIONS' },
    { id: 'suite', label: 'INTERACTIVE SUITE' }
  ];

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${scrolled ? 'py-3 bg-black/75 border-b border-white/5 backdrop-blur-md' : 'py-6 bg-transparent'}`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo brand wordmark */}
          <div
            onClick={() => onLinkClick('hero')}
            className="font-playfair text-lg md:text-xl font-bold tracking-[0.1em] text-brand-gold cursor-pointer select-none"
          >
            AMERICAN DREAM
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 font-inter text-[10px] md:text-xs font-semibold tracking-wider">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onLinkClick(item.id);
                    setMobileOpen(false);
                  }}
                  className={`relative py-1.5 transition-colors select-none nav-link-underline ${isActive ? 'text-brand-gold nav-link-active' : 'text-white/60 hover:text-brand-gold-light'}`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile hamburger menu */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-white hover:text-brand-gold text-sm font-space py-1 px-3 border border-white/10 rounded-full bg-white/3 backdrop-blur"
            >
              {mobileOpen ? 'CLOSE' : 'MENU'}
            </button>
          </div>

        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-16 bg-black/95 border-b border-white/10 backdrop-blur-xl z-30 flex flex-col items-center gap-4 py-8 font-inter text-xs font-bold tracking-widest md:hidden"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onLinkClick(item.id);
                    setMobileOpen(false);
                  }}
                  className={`py-2 transition-colors select-none ${isActive ? 'text-brand-gold' : 'text-white/60 hover:text-white'}`}
                >
                  {item.label}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default FloatingNav;
