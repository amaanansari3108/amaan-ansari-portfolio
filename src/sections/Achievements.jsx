import Container from '../components/ui/Container';
import SectionTitle from '../components/ui/SectionTitle';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { Brain, Lightbulb, GraduationCap, Trophy, ArrowUpRight } from 'lucide-react';
import LinkPreviewTooltip from '../components/ui/LinkPreviewTooltip';

const ACHIEVEMENTS = [
  {
    title: "Computer Vision & AI Analyst Intern",
    description: "Advanced Computer Vision and AI Data Analyst with a proven track record of processing 20,000+ vehicle image frames to train high-accuracy machine learning models.",
    icon: Brain,
    accent: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    link: "https://www.linkedin.com/posts/amaanansari31_internship-traineeengineer-computervision-share-7468325688178196480-3hKA/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEssXdEBJP0oHMipkw_pCIginPF3Hy9IiKk",
    linkText: "View Internship Post"
  },
  {
    title: "Published Indian Patent",
    description: "Co-inventor and publisher of an Indian patent for a Peltier-based thermoelectric cooling and temperature stabilization system.",
    icon: Lightbulb,
    accent: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    link: "https://www.linkedin.com/posts/amaanansari31_patentpublication-innovation-linkedin-ugcPost-7470056195953864705-Lwv9/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEssXdEBJP0oHMipkw_pCIginPF3Hy9IiKk",
    linkText: "View Patent Publication"
  },
  {
    title: "COMEDKARE Innovation Hub Showcase",
    description: "Selected to present and showcase the Peltier-based liquid cooling prototype at the prestigious COMEDKARES Innovation Hub Launch in Hubballi.",
    icon: Trophy,
    accent: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7329008927424106496/",
    linkText: "View Innovation Showcase"
  },
  {
    title: "Academic Excellence",
    description: "Graduated with a CGPA of 7.66 from KLS Vishwanathrao Deshpande Institute of Technology (VTU) in Electronics & Communication Engineering.",
    icon: GraduationCap,
    accent: "text-[#E8C547] bg-[#E8C547]/10 border-[#E8C547]/20",
    link: "https://klsvdit.edu.in/",
    linkText: "Visit Institution"
  }
];

export default function Achievements() {
  return (
    <section id="achievements" className="py-20 md:py-28 relative overflow-hidden bg-[#030712]/30">
      {/* Background decoration orbs */}
      <div className="absolute right-[10%] top-[20%] -z-10 h-64 w-64 rounded-full bg-purple-600/5 blur-[80px] pointer-events-none" />
      <div className="absolute left-[10%] bottom-[20%] -z-10 h-64 w-64 rounded-full bg-cyan-600/5 blur-[80px] pointer-events-none" />

      <Container>
        <SectionTitle title="Achievements" subtitle="Key Milestones" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 items-stretch reveal" data-reveal-direction="up">
          {ACHIEVEMENTS.map((ach, idx) => {
            const Icon = ach.icon;
            const cardContent = (
              <GlassCard hoverEffect={true} className="flex flex-col h-full p-6 md:p-8 justify-between">
                <div>
                  {/* Icon Badge */}
                  <div className={`p-3 rounded-xl border w-fit mb-6 ${ach.accent} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={24} />
                  </div>

                  {/* Achievement Title */}
                  <h3 className="text-lg font-bold text-white mb-4 tracking-tight leading-snug min-h-[48px]">
                    {ach.title}
                  </h3>

                  {/* Achievement Description */}
                  <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
                    {ach.description}
                  </p>
                </div>
                
                <div>
                  {ach.link && (
                    <div className="pt-4 mt-6 border-t border-white/5">
                      <a href={ach.link} target="_blank" rel="noopener noreferrer" className="block w-full">
                        <Button variant="secondary" className="w-full text-xs py-2 flex items-center justify-center gap-1.5">
                          {ach.linkText} <ArrowUpRight size={12} />
                        </Button>
                      </a>
                    </div>
                  )}
                  
                  {/* Subtle decorative serial index */}
                  <div className="mt-4 flex items-center justify-between text-[10px] font-mono text-gray-600 uppercase tracking-widest leading-none">
                    <span>Milestone / 0{idx + 1}</span>
                  </div>
                </div>
              </GlassCard>
            );

            return (
              <div key={idx} className="reveal-child h-full">
                {cardContent}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
