import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Container from '../components/ui/Container';
import SectionTitle from '../components/ui/SectionTitle';
import GlassCard from '../components/ui/GlassCard';
import Badge from '../components/ui/Badge';
import { educationData } from '../data/education';
import { GraduationCap, Calendar, Award } from 'lucide-react';
import LinkPreviewTooltip from '../components/ui/LinkPreviewTooltip';

gsap.registerPlugin(ScrollTrigger);

export default function Education() {
  const containerRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(lineRef.current,
        { scaleY: 0, transformOrigin: 'top' },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            end: 'bottom 70%',
            scrub: true
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="education" className="pt-28 pb-20 md:pt-36 md:pb-28 relative overflow-hidden bg-gradient-to-b from-transparent to-[#030712]/50">
      <Container>
        <SectionTitle title="Education" subtitle="Academic Background" />

        <div ref={containerRef} className="relative pl-8 md:pl-10 ml-2 md:ml-6 space-y-12 reveal" data-reveal-direction="up">
          {/* Animated Timeline Vertical Line */}
          <div 
            ref={lineRef} 
            className="absolute left-[12px] md:left-[20px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-indigo-500 to-cyan-500 origin-top" 
          />

          {educationData.map((edu, idx) => {
            const cardUrl = edu.degreeUrl || edu.institutionUrl;
            const cardContent = (
              <GlassCard hoverEffect={true} className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                    {edu.degreeUrl ? (
                      <a href={edu.degreeUrl} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 hover:underline transition-all duration-300">
                        {edu.degree}
                      </a>
                    ) : (
                      edu.degree
                    )}
                  </h3>
                  <h4 className="text-base md:text-lg font-medium text-cyan-400 mb-3 font-mono eyebrow">
                    {edu.institutionUrl ? (
                      <a href={edu.institutionUrl} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 hover:underline transition-all duration-300">
                        {edu.institution}
                      </a>
                    ) : (
                      edu.institution
                    )}
                  </h4>
                  
                  {edu.details && (
                    <ul className="list-disc pl-4 space-y-1.5 text-sm md:text-base text-gray-400 mt-2">
                      {edu.details.map((detail, dIdx) => (
                        <li key={dIdx}>{detail}</li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="flex flex-row md:flex-col md:items-end gap-3 justify-between shrink-0">
                  <Badge variant="outline" className="flex items-center gap-1 date font-mono">
                    <Calendar size={12} />
                    {edu.duration}
                  </Badge>
                  
                  <Badge variant={edu.metricType === 'CGPA' ? 'gold' : 'cyan'} className="flex items-center gap-1 cgpa-tag font-mono">
                    <Award size={12} />
                    {edu.metricType}: {edu.metricValue}
                  </Badge>
                </div>
              </GlassCard>
            );

            return (
              <div key={idx} className="relative reveal-child">
                {/* Timeline Dot Indicator */}
                <div className="absolute -left-[22px] md:-left-[32px] top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#080d1a] border-2 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)] z-10">
                  <GraduationCap size={12} className="text-indigo-400" />
                </div>

                {cardContent}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
