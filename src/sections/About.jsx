import Container from '../components/ui/Container';
import SectionTitle from '../components/ui/SectionTitle';
import GlassCard from '../components/ui/GlassCard';
import { personalData } from '../data/personal';
import { Cpu, Brain, Lightbulb, Eye, Settings, Database } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="pt-28 pb-20 md:pt-36 md:pb-28 relative overflow-hidden">
      <Container>
        <SectionTitle title="About Me" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 items-stretch">
          {/* Summary / Profile Features */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6 reveal" data-reveal-direction="left">
            <GlassCard className="flex flex-col justify-center h-full">
              <h3 className="text-2xl font-bold text-white mb-4">
                Bridging Hardware & AI
              </h3>
              <p className="text-gray-300 leading-relaxed">
                As an Electronics & Communication Engineering graduate, I have spent the last four years refining my skills in designing hardware architectures and training intelligent algorithms. I believe true innovation happens when physical hardware is seamlessly integrated with state-of-the-art software logic.
              </p>
            </GlassCard>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <GlassCard className="flex flex-col items-center justify-center text-center p-4" hoverEffect={true}>
                <Cpu className="text-indigo-400 mb-2" size={24} />
                <span className="text-[10px] sm:text-xs text-gray-400 font-semibold uppercase tracking-wider">IoT</span>
              </GlassCard>
              <GlassCard className="flex flex-col items-center justify-center text-center p-4" hoverEffect={true}>
                <Brain className="text-purple-400 mb-2" size={24} />
                <span className="text-[10px] sm:text-xs text-gray-400 font-semibold uppercase tracking-wider">AI Analyst</span>
              </GlassCard>
              <GlassCard className="flex flex-col items-center justify-center text-center p-4" hoverEffect={true}>
                <Lightbulb className="text-cyan-400 mb-2" size={24} />
                <span className="text-[10px] sm:text-xs text-gray-400 font-semibold uppercase tracking-wider">Patent</span>
              </GlassCard>
              <GlassCard className="flex flex-col items-center justify-center text-center p-4" hoverEffect={true}>
                <Eye className="text-pink-400 mb-2" size={24} />
                <span className="text-[10px] sm:text-xs text-gray-400 font-semibold uppercase tracking-wider flex-shrink-0">Computer Vision</span>
              </GlassCard>
              <GlassCard className="flex flex-col items-center justify-center text-center p-4" hoverEffect={true}>
                <Settings className="text-orange-400 mb-2" size={24} />
                <span className="text-[10px] sm:text-xs text-gray-400 font-semibold uppercase tracking-wider flex-shrink-0">Embedded Systems</span>
              </GlassCard>
              <GlassCard className="flex flex-col items-center justify-center text-center p-4" hoverEffect={true}>
                <Database className="text-emerald-400 mb-2" size={24} />
                <span className="text-[10px] sm:text-xs text-gray-400 font-semibold uppercase tracking-wider flex-shrink-0">AI Data Ops</span>
              </GlassCard>
            </div>
          </div>

          {/* Details / Text description */}
          <div className="lg:col-span-7 reveal" data-reveal-direction="right" data-reveal-delay="0.1">
            <GlassCard className="h-full flex flex-col justify-between">
              <div>
                <h4 className="text-xl font-bold text-white mb-4">Professional Biography</h4>
                <p className="text-gray-300 leading-relaxed mb-6">
                  {personalData.about}
                </p>
                <p className="text-gray-300 leading-relaxed mb-6">
                  During my academic years, I co-invented a published Indian patent for an enhanced Peltier-based thermoelectric cooling system. I also worked on complex AI workflows as a Computer Vision and AI Analyst Intern at ArcticTern Solutions, labeling and validating over 20,000 image frames.
                </p>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/5">
                <div>
                  <span className="text-xs text-gray-500 uppercase tracking-wider block">Full Name</span>
                  <span className="text-white font-medium">{personalData.name}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-500 uppercase tracking-wider block">Location</span>
                  <span className="text-white font-medium">{personalData.location}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-500 uppercase tracking-wider block">Email Address</span>
                  <a href={`mailto:${personalData.email}`} className="text-cyan-400 hover:underline font-medium">{personalData.email}</a>
                </div>
                <div>
                  <span className="text-xs text-gray-500 uppercase tracking-wider block">Phone Contact</span>
                  <a href={`tel:${personalData.phone}`} className="text-indigo-400 hover:underline font-medium">+{personalData.phone}</a>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </Container>
    </section>
  );
}
