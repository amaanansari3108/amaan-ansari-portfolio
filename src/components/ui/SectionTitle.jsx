import { useState, useEffect } from 'react';

export default function SectionTitle({ title, subtitle, className = '' }) {
  const [isSwiss, setIsSwiss] = useState(false);

  useEffect(() => {
    const checkSwiss = () => {
      setIsSwiss(document.documentElement.classList.contains('swiss-theme'));
    };
    checkSwiss();
    const observer = new MutationObserver(checkSwiss);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const getSwissEyebrow = () => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('about')) return '— 01 / ABOUT ME';
    if (titleLower.includes('education')) return '— 02 / EDUCATION';
    if (titleLower.includes('experience')) return '— 03 / EXPERIENCE';
    if (titleLower.includes('achievement')) return '— 04 / ACHIEVEMENTS';
    if (titleLower.includes('patent')) return '— 05 / PATENT & INNOVATIONS';
    if (titleLower.includes('project')) return '— 06 / PROJECTS';
    if (titleLower.includes('skill')) return '— 07 / SKILLS';
    if (titleLower.includes('certif')) return '— 08 / CERTIFICATIONS';
    if (titleLower.includes('contact') || titleLower.includes('touch')) return '— 09 / CONTACT';
    return `— 00 / ${title.toUpperCase()}`;
  };

  return (
    <div className={`mb-12 md:mb-16 text-center md:text-left reveal ${className}`} data-reveal-direction="up">
      {(subtitle || isSwiss) && (
        <span className="text-xs md:text-sm font-semibold tracking-wider text-cyan-400 uppercase mb-2 block eyebrow">
          {isSwiss ? getSwissEyebrow() : subtitle}
        </span>
      )}
      <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight relative inline-block">
        {title}
        <span className="absolute -bottom-2 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 w-12 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full" />
      </h2>
    </div>
  );
}
