import Container from '../components/ui/Container';
import SectionTitle from '../components/ui/SectionTitle';
import GlassCard from '../components/ui/GlassCard';
import Badge from '../components/ui/Badge';
import { skillsData } from '../data/skills';
import { Terminal, Brain, Cpu, Wrench, Users } from 'lucide-react';

const CATEGORY_ICONS = {
  "Programming": Terminal,
  "AI & Data": Brain,
  "Embedded & IoT": Cpu,
  "Tools": Wrench,
  "Soft Skills": Users
};

export default function Skills() {
  return (
    <section id="skills" className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-transparent to-[#030712]/50">
      {/* Background glow orb */}
      <div className="absolute left-1/3 bottom-10 -z-10 h-72 w-72 rounded-full bg-indigo-500/5 blur-[60px] pointer-events-none" />

      <Container>
        <SectionTitle title="Skills & Expertises" subtitle="Technical Arsenal" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch reveal" data-reveal-direction="up">
          {skillsData.map((categoryData, idx) => {
            const Icon = CATEGORY_ICONS[categoryData.category] || Terminal;
            
            return (
              <div key={idx} className="reveal-child h-full">
                <GlassCard hoverEffect={true} className="flex flex-col h-full justify-between">
                  <div className="flex items-center gap-3.5 mb-6">
                    <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      <Icon size={20} />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">
                      {categoryData.category}
                    </h3>
                  </div>

                  {/* Flex wrap tag chips */}
                  <div className="flex flex-wrap gap-2.5 mt-6">
                    {categoryData.skills.map((skill, sIdx) => (
                      <Badge key={sIdx} variant="outline" className="skill-tag font-mono text-xs py-1.5 px-3">
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </GlassCard>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
