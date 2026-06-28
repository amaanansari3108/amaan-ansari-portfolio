import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Container from '../components/ui/Container';
import SectionTitle from '../components/ui/SectionTitle';
import GlassCard from '../components/ui/GlassCard';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { experienceData } from '../data/experience';
import { Calendar, MapPin, CheckCircle, ArrowUpRight, Briefcase } from 'lucide-react';
import LinkPreviewTooltip from '../components/ui/LinkPreviewTooltip';

gsap.registerPlugin(ScrollTrigger);



export default function Experience() {
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
    <section id="experience" className="pt-28 pb-20 md:pt-36 md:pb-28 relative overflow-hidden bg-[#030712]/30">
      <Container>
        <SectionTitle title="Experience" subtitle="Work History" />

        <div ref={containerRef} className="relative pl-8 md:pl-10 ml-2 md:ml-6 space-y-12 reveal" data-reveal-direction="up">
          {/* Animated Timeline Vertical Line */}
          <div 
            ref={lineRef} 
            className="absolute left-[12px] md:left-[20px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-indigo-500 to-cyan-500 origin-top" 
          />

          {experienceData.map((exp, idx) => {
            const cardUrl = exp.certificateUrl || exp.companyUrl;
            const cardContent = (
              <GlassCard hoverEffect={true} className="flex flex-col justify-between h-full">
                <div>
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold text-cyan-400 font-mono eyebrow">
                          {exp.companyUrl ? (
                            <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-cyan-300 transition-all duration-300">
                              {exp.company}
                            </a>
                          ) : (
                            exp.company
                          )}
                        </span>
                        <span className="text-gray-600">•</span>
                        <span className="text-sm font-medium text-gray-400">
                          {exp.title}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <Badge variant="outline" className="flex items-center gap-1 date font-mono">
                        <Calendar size={12} />
                        {exp.duration}
                      </Badge>
                      <Badge variant="cyan" className="flex items-center gap-1 font-mono">
                        <MapPin size={12} />
                        {exp.location}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Key Contributions & Projects
                    </p>
                    <ul className="grid grid-cols-1 gap-3.5 pl-1">
                      {exp.highlights.map((highlight, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-3 text-gray-300">
                          <CheckCircle size={18} className="text-indigo-400 shrink-0 mt-0.5" />
                          <span className="text-sm md:text-base leading-relaxed">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom section with certificate */}
                {exp.certificateUrl && (
                  <div className="mt-8 pt-6 border-t border-white/5 flex justify-end">
                    <LinkPreviewTooltip url={exp.certificateUrl}>
                      <a href={exp.certificateUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="secondary" className="text-xs py-2.5 md:text-sm">
                          View Certificate <ArrowUpRight size={14} />
                        </Button>
                      </a>
                    </LinkPreviewTooltip>
                  </div>
                )}
              </GlassCard>
            );

            return (
              <div key={idx} className="relative reveal-child">
                {/* Timeline Dot Indicator */}
                <div className="absolute -left-[22px] md:-left-[32px] top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#080d1a] border-2 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)] z-10">
                  <Briefcase size={12} className="text-indigo-400" />
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
