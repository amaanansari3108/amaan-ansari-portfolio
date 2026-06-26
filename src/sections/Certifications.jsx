import Container from '../components/ui/Container';
import SectionTitle from '../components/ui/SectionTitle';
import GlassCard from '../components/ui/GlassCard';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { certificationsData } from '../data/certifications';
import { Award, ExternalLink } from 'lucide-react';
import LinkPreviewTooltip from '../components/ui/LinkPreviewTooltip';

export default function Certifications() {
  return (
    <section id="certifications" className="py-20 md:py-28 relative overflow-hidden bg-[#030712]/30">
      <Container>
        <SectionTitle title="Certifications" subtitle="Professional Credentials" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch reveal" data-reveal-direction="up">
          {certificationsData.map((cert, idx) => {
            const cardContent = (
              <GlassCard hoverEffect={true} className="cert-card flex flex-col justify-between h-full p-7 md:p-8">
                <div>
                  {/* Badge & Icon */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      <Award size={18} />
                    </div>
                    <Badge variant="outline" className="text-[10px] px-2 py-0.5 font-semibold">
                      {cert.date}
                    </Badge>
                  </div>

                  {/* Title & Issuer */}
                  <h3 className="text-sm font-bold text-white mb-2 leading-snug line-clamp-2 min-h-[40px]">
                    {cert.title}
                  </h3>
                  <div className="mt-2.5">
                    <Badge variant="cyan" className="cert-issuer-badge text-[10px] px-2.5 py-0.5 font-semibold font-mono tracking-wider uppercase">
                      {cert.issuer}
                    </Badge>
                  </div>
                </div>

                {/* View Link */}
                <div className="pt-4 mt-4 border-t border-white/5">
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full"
                  >
                    <Button variant="secondary" className="w-full text-xs py-2 flex items-center justify-center gap-1.5">
                      Verify <ExternalLink size={12} />
                    </Button>
                  </a>
                </div>
              </GlassCard>
            );

            return (
              <div key={idx} className="reveal-child h-full">
                {cert.link && cert.link !== '#' ? (
                  <LinkPreviewTooltip url={cert.link} className="h-full block">
                    {cardContent}
                  </LinkPreviewTooltip>
                ) : (
                  cardContent
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
