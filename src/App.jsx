import { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollProgress from './components/effects/ScrollProgress';
import CursorGlow from './components/effects/CursorGlow';
import IntroScreen from './components/effects/IntroScreen';
import BackToTop from './components/effects/BackToTop';
import AmaanBot from './components/chat/AmaanBot';
import ContactCardModal from './components/ui/ContactCardModal';
import useLenis from './hooks/useLenis';
import useGsapReveal from './hooks/useGsapReveal';

// Sections
import Hero from './sections/Hero';
import About from './sections/About';
import Education from './sections/Education';
import Experience from './sections/Experience';
import Achievements from './sections/Achievements';
import Patent from './sections/Patent';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Certifications from './sections/Certifications';
import Contact from './sections/Contact';

export default function App() {
  const [introFinished, setIntroFinished] = useState(false);
  const [showContactCardModal, setShowContactCardModal] = useState(false);

  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#contact-card') {
        setShowContactCardModal(true);
      } else {
        setShowContactCardModal(false);
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const handleCloseModal = () => {
    setShowContactCardModal(false);
    window.history.pushState("", document.title, window.location.pathname + window.location.search);
  };

  // Activate Lenis smooth scrolling and GSAP scroll reveals only after intro finishes
  useLenis(introFinished);
  useGsapReveal(introFinished);

  useEffect(() => {
    if (!introFinished) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [introFinished]);

  // Active scroll-over section tracking
  useEffect(() => {
    if (!introFinished) return;

    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          section.classList.add('active-scroll-section');
        } else {
          section.classList.remove('active-scroll-section');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [introFinished]);

  return (
    <div className="relative min-h-screen bg-[#030712] text-gray-100 selection:bg-indigo-500/30 selection:text-white overflow-hidden">
      {!introFinished && <IntroScreen onComplete={() => setIntroFinished(true)} />}

      {introFinished && (
        <>
          {/* Scroll Progress, Cursor Glow & Back To Top Effects */}
          <ScrollProgress />
          <CursorGlow />
          <BackToTop />
          <AmaanBot />
          <ContactCardModal isOpen={showContactCardModal} onClose={handleCloseModal} />

          {/* Floating Ambient Background Orbs */}
          <div className="absolute top-[15%] left-[5%] -z-20 h-[300px] w-[300px] md:h-[500px] md:w-[500px] rounded-full bg-indigo-600/10 blur-[100px] pointer-events-none animate-pulse-glow" />
          <div className="absolute top-[45%] right-[5%] -z-20 h-[350px] w-[350px] md:h-[600px] md:w-[600px] rounded-full bg-cyan-600/5 blur-[120px] pointer-events-none animate-pulse-glow" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-[20%] left-[10%] -z-20 h-[400px] w-[400px] md:h-[550px] md:w-[550px] rounded-full bg-purple-600/5 blur-[110px] pointer-events-none animate-pulse-glow" style={{ animationDelay: '4s' }} />

          {/* Navigation Header */}
          <Navbar />

          {/* Page Content Layout */}
          <main className="relative z-10">
            <Hero />
            <About />
            <Education />
            <Experience />
            <Achievements />
            <Patent />
            <Projects />
            <Skills />
            <Certifications />
            <Contact />
          </main>

          {/* Footer */}
          <Footer />
        </>
      )}
    </div>
  );
}
