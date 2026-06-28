import Container from '../components/ui/Container';
import SectionTitle from '../components/ui/SectionTitle';
import GlassCard from '../components/ui/GlassCard';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { patentData } from '../data/patent';
import { FileText, Calendar, Users, Award, ShieldCheck, ArrowUpRight, Shield } from 'lucide-react';
import LinkPreviewTooltip from '../components/ui/LinkPreviewTooltip';

export default function Patent() {
  return (
    <section id="patent" className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-transparent to-[#030712]/40">
      {/* Background glowing circle */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 -z-10 h-80 w-80 rounded-full bg-purple-500/5 blur-[70px] pointer-events-none" />

      <Container>
        <SectionTitle title="Patents & Innovations" subtitle="Intellectual Property" />

        <div className="reveal" data-reveal-direction="up">
          <GlassCard className="relative overflow-hidden border-indigo-500/20 shadow-[0_0_30px_rgba(99,102,241,0.05)]">
            {/* Top glowing bar */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500" />
            
            {/* Shield SVG watermark */}
            <div className="absolute -right-8 -bottom-8 opacity-[0.04] text-white pointer-events-none z-0">
              <Shield size={220} strokeWidth={1} />
            </div>
            
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start relative z-10">
              
              {/* Left Column: Patent ID Cards */}
              <div className="w-full lg:w-1/3 flex flex-col gap-4">
                <div className="flex items-center gap-3 mb-2">
                  <ShieldCheck className="text-cyan-400" size={32} />
                  <div>
                    <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold block">Official Status</span>
                    <Badge variant="gold" className="text-xs font-bold uppercase mt-0.5">Published Indian Patent</Badge>
                  </div>
                </div>

                <div className="space-y-3.5 mt-2">
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 relative group">
                    <span className="text-xs text-gray-500 uppercase tracking-wider block">Application Number</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-base font-semibold text-white font-mono cursor-help border-b border-dashed border-white/20 pb-0.5">{patentData.appNo}</span>
                      <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] font-bold font-mono tracking-wider uppercase">Published</span>
                    </div>
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max p-2.5 rounded bg-gray-950 text-white text-[10px] sm:text-xs border border-white/10 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-20 shadow-xl font-mono">
                      Indian Patent · Journal No. {patentData.journalNo} · {patentData.pubDate}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-xs text-gray-500 uppercase tracking-wider block">Publication Journal</span>
                    <span className="text-base font-semibold text-white font-mono">No. {patentData.journalNo}</span>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-xs text-gray-500 uppercase tracking-wider block">Publication Date</span>
                    <span className="text-base font-semibold text-white flex items-center gap-1.5 mt-0.5">
                      <Calendar size={16} className="text-indigo-400" />
                      {patentData.pubDate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Patent Title & Details */}
              <div className="w-full lg:w-2/3">
                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight mb-4">
                  {patentData.title}
                </h3>
                
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <Badge variant="cyan" className="flex items-center gap-1">
                    <Users size={12} />
                    Co-Inventor (Team of {patentData.coInventors})
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <FileText size={12} />
                    Patent Architecture
                  </Badge>
                </div>

                <div className="space-y-4">
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    Innovation Overview
                  </p>
                  <ul className="space-y-3.5">
                    {patentData.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-300">
                        <Award size={18} className="text-indigo-400 shrink-0 mt-1" />
                        <span className="text-sm md:text-base leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {patentData.patentUrl && (
                    <div className="mt-8 pt-6 border-t border-white/5 flex justify-start">
                      <LinkPreviewTooltip url={patentData.patentUrl}>
                        <a href={patentData.patentUrl} target="_blank" rel="noopener noreferrer">
                          <Button variant="primary" className="text-xs py-2.5 md:text-sm">
                            VIEW PATENT <ArrowUpRight size={14} />
                          </Button>
                        </a>
                      </LinkPreviewTooltip>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </GlassCard>

        </div>
      </Container>
    </section>
  );
}
