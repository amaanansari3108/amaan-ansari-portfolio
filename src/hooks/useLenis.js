import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function useLenis(active = true) {
  useEffect(() => {
    if (!active) return;

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Update ScrollTrigger on scroll
    lenis.on('scroll', ScrollTrigger.update);

    // Sync Lenis scroll with GSAP ticker
    const updateGsap = (time) => {
      lenis.raf(time * 1000);
    };
    
    gsap.ticker.add(updateGsap);

    // Turn off lag smoothing to prevent visual jitter
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateGsap);
    };
  }, [active]);
}
