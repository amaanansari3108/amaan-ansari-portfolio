import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function useGsapReveal(active = true) {
  useEffect(() => {
    if (!active) return;

    // Wait a brief moment to ensure React has fully rendered and reflowed
    const ctx = gsap.context(() => {
      const revealElements = document.querySelectorAll('.reveal');

      revealElements.forEach((el) => {
        const direction = el.dataset.revealDirection || 'up';
        const delay = parseFloat(el.dataset.revealDelay) || 0;
        const duration = parseFloat(el.dataset.revealDuration) || 0.8;
        const stagger = parseFloat(el.dataset.revealStagger) || 0.15;

        let startX = 0;
        let startY = 0;

        if (direction === 'up') startY = 30;
        if (direction === 'down') startY = -30;
        if (direction === 'left') startX = 30;
        if (direction === 'right') startX = -30;

        const children = el.querySelectorAll('.reveal-child');

        if (children.length > 0) {
          gsap.set(el, { opacity: 1 });
          gsap.fromTo(children,
            {
              opacity: 0,
              x: startX,
              y: startY
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              duration: duration,
              delay: delay,
              stagger: stagger,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none',
              }
            }
          );
        } else {
          gsap.fromTo(el,
            {
              opacity: 0,
              x: startX,
              y: startY
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              duration: duration,
              delay: delay,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none',
              }
            }
          );
        }
      });
    });

    // Refresh ScrollTrigger to ensure all trigger heights are correct after components render
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, [active]);
}
