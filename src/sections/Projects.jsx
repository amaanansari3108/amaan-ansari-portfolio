
import { motion, AnimatePresence } from 'framer-motion';
import Container from '../components/ui/Container';
import SectionTitle from '../components/ui/SectionTitle';
import GlassCard from '../components/ui/GlassCard';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { projectsData } from '../data/projects';
import { Cpu, Check, ArrowUpRight } from 'lucide-react';
import LinkPreviewTooltip from '../components/ui/LinkPreviewTooltip';

export default function Projects() {

  return (
    <section id="projects" className="py-20 md:py-28 relative overflow-hidden">
      <Container>
        <SectionTitle title="Projects" subtitle="My Engineering Portfolios" />



        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch"
        >
          <AnimatePresence mode="popLayout">
            {projectsData.map((project, idx) => {
              const hasImg = !!project.image;
              const cardContent = (
                <GlassCard hoverEffect={true} className={`flex flex-col justify-between h-full relative overflow-hidden ${hasImg ? '!p-0' : ''}`}>
                  {hasImg && (
                    <div className="w-full h-48 sm:h-52 md:h-56 overflow-hidden relative border-b border-white/5">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        draggable={false}
                      />
                    </div>
                  )}
                  <div className={`flex-1 flex flex-col justify-between ${hasImg ? 'p-6 md:p-8' : ''}`}>
                    <div>
                      {/* Top Bar inside Card */}
                      <div className="flex items-center justify-between mb-4">
                        {/* Monospace Project Label */}
                        <span className="text-[10px] md:text-xs font-mono text-gray-500 uppercase tracking-widest leading-none">
                          PROJECT / 0{idx + 1}
                        </span>

                        <div className="flex items-center gap-2">
                          {project.featured && (
                            <Badge variant="gold" className="font-semibold text-xs tracking-wider uppercase font-mono">
                              Featured
                            </Badge>
                          )}
                          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                            <Cpu size={18} />
                          </div>
                        </div>
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight">
                        {project.title}
                      </h3>
                      <p className="text-sm md:text-base text-gray-400 mb-6 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Tech Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map((tag, tIdx) => (
                          <Badge key={tIdx} variant="outline" className="skill-tag font-mono text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Highlights Bullet List */}
                      <div className="space-y-2.5 mb-8">
                        {project.highlights.map((highlight, hIdx) => (
                          <div key={hIdx} className="flex items-start gap-2.5 text-xs md:text-sm text-gray-400">
                            <Check size={14} className="text-cyan-400 mt-1 shrink-0" />
                            <span className="leading-relaxed">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer Buttons */}
                    {project.links && project.links.length > 0 && (
                      <div className="flex items-center gap-4 pt-4 border-t border-white/5 mt-auto">
                        {project.links.map((link, lIdx) => (
                          <LinkPreviewTooltip key={lIdx} url={link.url} className="flex-1 block">
                            <a 
                              href={link.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="block"
                            >
                              <Button variant={link.primary ? "primary" : "secondary"} className="w-full text-xs py-2.5 md:text-sm flex items-center justify-center gap-1.5">
                                {link.text} <ArrowUpRight size={16} />
                              </Button>
                            </a>
                          </LinkPreviewTooltip>
                        ))}
                      </div>
                    )}
                  </div>
                </GlassCard>
              );

              return (
                <motion.div 
                  key={project.title}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="h-full"
                >
                  {cardContent}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}
