import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
import { Menu, X, ArrowUpRight, Sun, Moon, LayoutGrid, Cpu, Gem, Snowflake } from 'lucide-react';
import QrCode from '../ui/QrCode';

const NAV_LINKS = [
  { label: 'About',          href: '#about' },
  { label: 'Education',      href: '#education' },
  { label: 'Experience',     href: '#experience' },
  { label: 'Achievements',   href: '#achievements' },
  { label: 'Patent',         href: '#patent' },
  { label: 'Projects',       href: '#projects' },
  { label: 'Skills',         href: '#skills' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact',        href: '#contact' },
];

const THEME_ICON = {
  dark:    <Sun size={17} />,
  light:   <LayoutGrid size={17} />,
  swiss:   <Cpu size={17} />,
  nothing: <Moon size={17} />,
  luxe:    <Gem size={17} />,
  ice:     <Snowflake size={17} />,
};

export default function Navbar() {
  const [isOpen,        setIsOpen]        = useState(false);
  const [scrolled,      setScrolled]      = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [theme,         setTheme]         = useState(
    () => localStorage.getItem('theme') || 'dark'
  );
  const drawerRef  = useRef(null);
  const toggleRef  = useRef(null);

  /* ── Apply theme class ── */
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light-theme', 'swiss-theme', 'nothing-theme', 'luxe-theme', 'ice-theme');
    if (theme === 'light')   root.classList.add('light-theme');
    if (theme === 'swiss')   root.classList.add('swiss-theme');
    if (theme === 'nothing') root.classList.add('nothing-theme');
    if (theme === 'luxe')    root.classList.add('luxe-theme');
    if (theme === 'ice')     root.classList.add('ice-theme');
    localStorage.setItem('theme', theme);
  }, [theme]);

  /* ── Cycle themes ── */
  const toggleTheme = () =>
    setTheme(prev => {
      const order = ['dark', 'light', 'swiss', 'nothing', 'luxe', 'ice'];
      return order[(order.indexOf(prev) + 1) % order.length];
    });

  /* ── Scroll + scrollspy ── */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const scrollPos = window.scrollY + 120;
      for (const link of NAV_LINKS) {
        const el = document.querySelector(link.href);
        if (el && scrollPos >= el.offsetTop && scrollPos < el.offsetTop + el.offsetHeight) {
          setActiveSection(link.href);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Click outside drawer → close ── */
  useEffect(() => {
    if (!isOpen) return;
    const handleOutsideClick = (e) => {
      // If click is outside the drawer AND outside the toggle button → close
      if (
        drawerRef.current && !drawerRef.current.contains(e.target) &&
        toggleRef.current && !toggleRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    // Small delay so the open-click itself doesn't trigger immediately
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('touchstart', handleOutsideClick, { passive: true });
    }, 50);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [isOpen]);

  /* ── Smooth scroll helper ── */
  const handleClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) window.scrollTo({ top: target.offsetTop - 100, behavior: 'smooth' });
    }, 50);
  };

  return (
    <>
      {/* ── Top navbar bar ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#030712]/85 backdrop-blur-md border-b border-white/5 py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 w-full flex items-center justify-between gap-3">

          {/* Logo */}
          <a
            href="#"
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="text-xl md:text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-gray-300 to-indigo-400 bg-clip-text text-transparent whitespace-nowrap flex-shrink-0"
          >
            Amaan Ansari<span className="text-cyan-400">.dev</span>
          </a>

          {/* Desktop links */}
          <div className="hidden xl:flex items-center gap-1 xl:gap-1.5 2xl:gap-2.5 whitespace-nowrap">
            {NAV_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={e => handleClick(e, link.href)}
                className={`text-[11px] xl:text-xs 2xl:text-sm font-medium px-2 py-0.5 xl:px-2.5 xl:py-1 rounded-full transition-all duration-300 nav-item-link ${
                  activeSection === link.href
                    ? 'active-nav-link font-semibold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300 cursor-pointer flex items-center justify-center ml-1"
              aria-label="Toggle theme"
            >
              {THEME_ICON[theme]}
            </button>

            {/* Contact CTA */}
            <Button
              variant="primary"
              onClick={e => handleClick(e, '#contact')}
              className="px-4 py-2 text-xs xl:px-5 xl:py-2.5 xl:text-sm ml-1"
            >
              Contact Me <ArrowUpRight size={16} />
            </Button>
          </div>

          {/* Mobile right-side controls */}
          <div className="xl:hidden flex items-center gap-2">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-white/10 bg-white/5 text-gray-300 hover:text-white transition-all duration-200 cursor-pointer flex items-center justify-center"
              aria-label="Toggle theme"
            >
              {THEME_ICON[theme]}
            </button>

            {/* Hamburger / close — ref attached so outside-click ignores this */}
            <button
              ref={toggleRef}
              className="p-2 rounded-full border border-white/10 bg-white/5 text-white cursor-pointer hover:bg-white/10 transition-all duration-200 flex items-center justify-center"
              onClick={() => setIsOpen(v => !v)}
              aria-label="Toggle navigation menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen
                  ? <motion.span key="x"    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X size={20} /></motion.span>
                  : <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }}  animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu size={20} /></motion.span>
                }
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile: Compact floating dropdown (no backdrop — content visible + scrollable) ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={drawerRef}
            key="nav-drawer"
            className="fixed z-[60] xl:hidden"
            style={{
              top: '68px',
              right: '12px',
              width: '210px',
              borderRadius: '18px',
              background: 'rgba(7, 9, 20, 0.97)',
              border: '1px solid rgba(255,255,255,0.09)',
              boxShadow: '0 12px 48px rgba(0,0,0,0.65), 0 0 0 1px rgba(99,102,241,0.1)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              overflow: 'hidden',
            }}
            initial={{ opacity: 0, scale: 0.9, y: -12, transformOrigin: 'top right' }}
            animate={{ opacity: 1, scale: 1,   y: 0                                 }}
            exit={{    opacity: 0, scale: 0.9, y: -12                               }}
            transition={{ type: 'spring', stiffness: 400, damping: 32 }}
          >
            {/* Accent top bar */}
            <div className="h-[2px] w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500" />

            {/* Nav links */}
            <nav className="px-1.5 pt-1.5 pb-1">
              <ul className="flex flex-col gap-0.5">
                {NAV_LINKS.map((link, idx) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.025 + 0.03, duration: 0.16 }}
                  >
                    <a
                      href={link.href}
                      onClick={e => handleClick(e, link.href)}
                      className={`flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-150 select-none nav-item-link ${
                        activeSection === link.href
                          ? 'active-nav-link'
                          : 'text-gray-400 hover:text-white hover:bg-white/[0.06]'
                      }`}
                    >
                      <span>{link.label}</span>
                      {activeSection === link.href && (
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                      )}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Divider + Contact CTA */}
            <div className="px-2 py-2 border-t border-white/[0.06] pb-1.5">
              <Button
                variant="primary"
                onClick={e => handleClick(e, '#contact')}
                className="w-full justify-center text-xs py-2"
              >
                Contact Me <ArrowUpRight size={13} />
              </Button>
            </div>

            {/* QR Code Section */}
            <div className="px-3 pb-3.5 pt-1.5 border-t border-white/[0.06] flex flex-col items-center gap-2 bg-black/25">
              <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-gray-500">Scan Digital Card</span>
              <QrCode value={typeof window !== 'undefined' ? window.location.origin + '#contact-card' : 'https://amaanansari.dev/#contact-card'} size={110} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
