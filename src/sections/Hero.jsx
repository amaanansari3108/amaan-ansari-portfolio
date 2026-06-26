import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import { personalData } from '../data/personal';
import { ArrowDown, ArrowUpRight, Download, Mail, Phone, Users, X } from 'lucide-react';
import { Linkedin, Github } from '../components/ui/BrandIcons';

gsap.registerPlugin(ScrollTrigger);

const PHRASES = [
  "Electronics & Communication Engineering Graduate",
  "AI Data Operations",
  "Computer Vision",
  "IoT & Embedded Systems"
];

const DAYS   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

// ─── Visitor counter helpers (localStorage) ───────────────────────────────────
function getVisitorCount() {
  try {
    const stored = localStorage.getItem('aa_visitor_count');
    return stored ? parseInt(stored, 10) : 0;
  } catch { return 0; }
}
function incrementVisitorCount() {
  try {
    const next = getVisitorCount() + 1;
    localStorage.setItem('aa_visitor_count', String(next));
    return next;
  } catch { return 1; }
}

export default function Hero() {
  const containerRef     = useRef(null);
  const titleRef         = useRef(null);
  const subtitleRef      = useRef(null);
  const badgeRef         = useRef(null);
  const ctaRef           = useRef(null);
  const quickContactsRef = useRef(null);
  const imgWrapperRef    = useRef(null);
  const hrAboveRef       = useRef(null);
  const hrBelowRef       = useRef(null);

  // Typewriter state
  const [currentPhraseIdx, setCurrentPhraseIdx] = useState(0);
  const [currentText,      setCurrentText]       = useState('');
  const [isDeleting,       setIsDeleting]        = useState(false);
  const [typingSpeed,      setTypingSpeed]        = useState(80);

  // Live clock state
  const [now, setNow] = useState(new Date());

  // Visitor counter state
  const [visitorCount,      setVisitorCount]      = useState(0);
  const [showVisitorModal,  setShowVisitorModal]  = useState(false);
  const [photoClickCount,   setPhotoClickCount]   = useState(0);
  const clickResetTimer = useRef(null);

  // ─── Live clock — tick every second ──────────────────────────────────────
  useEffect(() => {
    const tick = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(tick);
  }, []);

  // ─── Increment visitor on first mount ────────────────────────────────────
  useEffect(() => {
    const count = incrementVisitorCount();
    setVisitorCount(count);
  }, []);

  // ─── Typewriter ───────────────────────────────────────────────────────────
  useEffect(() => {
    let timer;
    const activePhrase = PHRASES[currentPhraseIdx];

    const handleType = () => {
      if (!isDeleting) {
        setCurrentText(activePhrase.substring(0, currentText.length + 1));
        setTypingSpeed(80);
        if (currentText === activePhrase) {
          timer = setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      } else {
        setCurrentText(activePhrase.substring(0, currentText.length - 1));
        setTypingSpeed(40);
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentPhraseIdx((prev) => (prev + 1) % PHRASES.length);
          timer = setTimeout(() => {}, 500);
          return;
        }
      }
      timer = setTimeout(handleType, typingSpeed);
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentPhraseIdx, typingSpeed]);

  // ─── GSAP entrance animations ─────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo(badgeRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
      );
      tl.fromTo(hrAboveRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.8, ease: 'power2.out' },
        "-=0.6"
      );
      tl.fromTo(titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1 },
        "-=0.6"
      );
      tl.fromTo(subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.6"
      );
      tl.fromTo(hrBelowRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.8, ease: 'power2.out' },
        "-=0.6"
      );
      tl.fromTo(ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.6"
      );
      tl.fromTo(quickContactsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.6"
      );
      tl.fromTo(imgWrapperRef.current,
        { opacity: 0, scale: 0.9, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1.2 },
        "-=1.2"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToSection = (id) => {
    const target = document.querySelector(id);
    if (target) {
      window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    }
  };

  // ─── Double-click photo handler ───────────────────────────────────────────
  const handlePhotoClick = () => {
    setPhotoClickCount(prev => {
      const next = prev + 1;
      if (next >= 2) {
        setShowVisitorModal(true);
        clearTimeout(clickResetTimer.current);
        return 0;
      }
      clearTimeout(clickResetTimer.current);
      clickResetTimer.current = setTimeout(() => setPhotoClickCount(0), 500);
      return next;
    });
  };

  // ─── Clock formatters ─────────────────────────────────────────────────────
  const hours   = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const ampm    = hours >= 12 ? 'PM' : 'AM';
  const h12     = (hours % 12 || 12).toString().padStart(2, '0');
  const dayName = DAYS[now.getDay()];
  const dateStr = `${now.getDate()} ${MONTHS[now.getMonth()]} ${now.getFullYear()}`;

  const nameParts = personalData.name.split(' ');
  const firstName = nameParts[0];
  const lastName  = nameParts.slice(1).join(' ');

  return (
    <section
      ref={containerRef}
      id="hero"
      className="min-h-screen flex items-center justify-center pt-32 pb-16 md:pt-40 md:pb-32 relative overflow-hidden"
    >
      {/* Background orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 -z-10 h-72 w-72 md:h-96 md:w-96 rounded-full bg-indigo-500/10 blur-[80px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 -z-10 h-72 w-72 md:h-96 md:w-96 rounded-full bg-cyan-500/10 blur-[80px] pointer-events-none animate-pulse" />

      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">

        {/* ── Text Area ── */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Badge */}
          <div ref={badgeRef} className="mb-6 opacity-0">
            <span className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 uppercase inline-flex items-center gap-1.5 badge">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              Available for Opportunities
            </span>
          </div>

          {/* Top HR */}
          <div className="w-full border-t border-white/10 mb-6 swiss-hr-above opacity-0" ref={hrAboveRef} />

          {/* Name */}
          <h1
            ref={titleRef}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-none mb-6 opacity-0 hero-title whitespace-nowrap"
          >
            {firstName} <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">{lastName}</span>
          </h1>

          {/* Subtitle */}
          <div ref={subtitleRef} className="space-y-4 mb-6 opacity-0 min-h-[90px] md:min-h-[110px]">
            <p className="text-xl sm:text-2xl font-bold text-gray-300 flex flex-wrap items-center gap-x-2">
              <span>Specializing in</span>
              <span className="text-cyan-400 border-r-2 border-cyan-400 pr-1 inline-block animate-[pulse_1s_infinite] min-h-[1.5em] md:min-h-0">
                {currentText}
              </span>
            </p>
            <p className="text-base sm:text-lg text-gray-400 max-w-xl">
              Engineering smart physical systems. Specializing in bridging the gap between hardware sensors and intelligent AI applications.
            </p>
          </div>

          {/* Bottom HR */}
          <div className="w-full border-t border-white/10 mt-2 mb-6 swiss-hr-below opacity-0" ref={hrBelowRef} />

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-wrap justify-center lg:justify-start gap-4 opacity-0">
            <a
              href="https://www.linkedin.com/posts/amaanansari31_patentpublication-innovation-linkedin-ugcPost-7470056195953864705-Lwv9/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEssXdEBJP0oHMipkw_pCIginPF3Hy9IiKk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button variant="primary">
                VIEW PATENT <ArrowUpRight size={18} />
              </Button>
            </a>
            <a
              href="/Amaan_Ansari_Resume.pdf"
              download="Amaan_Ansari_Resume.pdf"
              className="inline-block"
            >
              <Button variant="secondary">
                DOWNLOAD RESUME <Download size={18} />
              </Button>
            </a>
          </div>

          {/* Quick Contact Links */}
          <div ref={quickContactsRef} className="mt-8 flex flex-wrap gap-4 items-center justify-center lg:justify-start opacity-0">
            <a href="https://github.com/amaanansari3108/" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-gray-400/40 text-gray-300 hover:text-white transition-all duration-300 group text-xs md:text-sm font-medium">
              <Github size={16} className="text-gray-300 group-hover:scale-110 transition-transform" />
              <span>GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/amaanansari31/" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-indigo-500/30 text-gray-300 hover:text-white transition-all duration-300 group text-xs md:text-sm font-medium">
              <Linkedin size={16} className="text-indigo-400 group-hover:scale-110 transition-transform" />
              <span>LinkedIn</span>
            </a>
            <a href="mailto:amaanansari3108@gmail.com"
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-cyan-500/30 text-gray-300 hover:text-white transition-all duration-300 group text-xs md:text-sm font-medium">
              <Mail size={16} className="text-cyan-400 group-hover:scale-110 transition-transform" />
              <span>Gmail</span>
            </a>
            <a href={`tel:+${personalData.phone}`}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-pink-500/30 text-gray-300 hover:text-white transition-all duration-300 group text-xs md:text-sm font-medium">
              <Phone size={16} className="text-pink-400 group-hover:scale-110 transition-transform" />
              <span>Phone</span>
            </a>
          </div>
        </div>

        {/* ── Visual / Image Area ── */}
        <div className="lg:col-span-5 flex flex-col justify-center items-center gap-4">

          {/* ── Live Time / Day / Date Card ── */}
          <div
            className="hero-clock-card w-full max-w-[256px] sm:max-w-[320px] md:max-w-[384px] glass-card rounded-2xl px-5 py-3.5 flex items-center justify-between gap-4 border border-white/10 bg-white/[0.03] backdrop-blur-md"
            style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)' }}
          >
            {/* Left — Day + Date */}
            <div className="flex flex-col leading-tight">
              <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-gray-500 mb-0.5">
                {dayName}
              </span>
              <span className="text-sm font-semibold text-gray-300 tabular-nums">
                {dateStr}
              </span>
            </div>

            {/* Divider */}
            <div className="h-8 w-px bg-white/10 flex-shrink-0" />

            {/* Right — Live Clock */}
            <div className="flex items-baseline gap-1.5 ml-auto">
              <span
                className="hero-clock-time text-2xl sm:text-3xl font-extrabold tabular-nums tracking-tight text-cyan-400"
                style={{ fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}
              >
                {h12}:{minutes}
                <span className="text-base sm:text-lg font-bold text-gray-500 ml-0.5">:{seconds}</span>
              </span>
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest pb-0.5">
                {ampm}
              </span>
            </div>
          </div>

          {/* ── Photo wrapper ── */}
          <div
            ref={imgWrapperRef}
            className="relative opacity-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 animate-float cursor-pointer"
            onClick={handlePhotoClick}
            title="Double-click to see visitor count"
          >
            {/* Outer glowing border */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-500 p-[1.5px] shadow-[0_0_50px_rgba(99,102,241,0.15)] overflow-hidden">
              <div className="h-full w-full bg-[#080d1a] rounded-3xl overflow-hidden flex items-center justify-center">
                <img
                  src={personalData.avatar}
                  alt={personalData.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 select-none"
                  draggable={false}
                />
              </div>
            </div>

            {/* Glowing halo */}
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-tr from-indigo-600 to-cyan-400 blur-xl opacity-20 pointer-events-none animate-pulse" />


          </div>
        </div>
      </Container>

      {/* ── Visitor Count Modal ── */}
      <AnimatePresence>
        {showVisitorModal && (
          <motion.div
            key="visitor-modal"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setShowVisitorModal(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Card */}
            <motion.div
              className="relative z-10 max-w-xs w-full rounded-3xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(15,20,40,0.95) 0%, rgba(8,13,26,0.98) 100%)',
                border: '1px solid rgba(99,102,241,0.25)',
                boxShadow: '0 0 0 1px rgba(99,102,241,0.1), 0 30px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)',
              }}
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1,    opacity: 1, y: 0  }}
              exit={{    scale: 0.9,  opacity: 0, y: 10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Top accent bar */}
              <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500" />

              <div className="px-7 py-7 flex flex-col items-center text-center gap-4">
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                  <Users size={26} className="text-indigo-400" />
                </div>

                {/* Label */}
                <div>
                  <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-500 mb-1">Portfolio Visitors</p>
                  <p className="text-xs text-gray-600">(tracked on this device)</p>
                </div>

                {/* Counter */}
                <motion.div
                  key={visitorCount}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1,   opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
                  className="flex items-baseline gap-2"
                >
                  <span
                    className="font-extrabold tabular-nums"
                    style={{
                      fontSize: 'clamp(3.5rem, 15vw, 5rem)',
                      lineHeight: 1,
                      background: 'linear-gradient(135deg, #818cf8, #a5b4fc, #67e8f9)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {visitorCount.toLocaleString()}
                  </span>
                  <span className="text-gray-500 text-lg mb-1">visits</span>
                </motion.div>

                {/* Sub-text */}
                <p className="text-gray-500 text-xs leading-relaxed max-w-[200px]">
                  Each page load counts as one visit. Stored locally in your browser.
                </p>

                {/* Close button */}
                <button
                  onClick={() => setShowVisitorModal(false)}
                  className="mt-1 w-full py-2.5 rounded-xl text-sm font-semibold text-gray-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <X size={14} /> Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 cursor-pointer text-gray-500 hover:text-white transition-colors"
        onClick={() => handleScrollToSection('#about')}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ArrowDown size={24} />
        </motion.div>
      </div>
    </section>
  );
}
