import Container from '../ui/Container';
import { personalData } from '../../data/personal';
import { socialData } from '../../data/social';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import * as BrandIcons from '../ui/BrandIcons';
import QrCode from '../ui/QrCode';

const ICON_MAP = {
  Mail,
  Phone,
  Github: BrandIcons.Github,
  Linkedin: BrandIcons.Linkedin
};

const NAV_SECTIONS = [
  { label: 'About',          href: '#about' },
  { label: 'Education',      href: '#education' },
  { label: 'Experience',     href: '#experience' },
  { label: 'Projects',       href: '#projects' },
  { label: 'Skills',         href: '#skills' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact',        href: '#contact' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const qrUrl = typeof window !== 'undefined' ? window.location.origin + '#contact-card' : 'https://amaanansari.dev/#contact-card';

  const handleNav = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/5 bg-[#030712] relative overflow-hidden">
      {/* Soft radial glow */}
      <div className="absolute left-1/2 bottom-0 -z-10 h-64 w-[120%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_bottom,rgba(99,102,241,0.06)_0%,transparent_70%)] blur-[60px] pointer-events-none" />

      {/* ── Top section ── */}
      <Container className="pt-12 pb-8 md:pt-16 md:pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-8">

          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-4 flex flex-col gap-4 max-w-sm">
            <a
              href="#"
              className="text-xl md:text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-gray-300 to-indigo-400 bg-clip-text text-transparent w-fit"
            >
              {personalData.name}<span className="text-cyan-400">.</span>
            </a>

            {/* Updated tagline — reflects actual profile accurately */}
            <p className="text-sm text-gray-500 leading-relaxed">
              ECE Graduate · Patent Co-Inventor · Computer Vision & AI Data Ops Specialist ·
              Building at the intersection of <span className="text-gray-400 font-medium">Embedded Hardware</span> and <span className="text-gray-400 font-medium">Deep Learning</span>.
            </p>

            {/* Contact details */}
            <div className="flex flex-col gap-2 mt-1">
              <a
                href={`mailto:${personalData.email}`}
                className="flex items-center gap-2 text-xs text-gray-500 hover:text-cyan-400 transition-colors group w-fit"
              >
                <Mail size={13} className="shrink-0" />
                <span className="group-hover:underline underline-offset-2">{personalData.email}</span>
              </a>
              <a
                href={`tel:${personalData.phone}`}
                className="flex items-center gap-2 text-xs text-gray-500 hover:text-indigo-400 transition-colors group w-fit"
              >
                <Phone size={13} className="shrink-0" />
                <span className="group-hover:underline underline-offset-2">+{personalData.phone}</span>
              </a>
              <span className="flex items-center gap-2 text-xs text-gray-600">
                <MapPin size={13} className="shrink-0" />
                {personalData.location}
              </span>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-1">
              {socialData.map((social) => {
                const IconComponent = ICON_MAP[social.iconName];
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full border border-white/5 bg-white/[0.02] text-gray-400 hover:text-white hover:border-white/15 hover:bg-white/5 transition-all duration-300 hover:scale-110"
                    aria-label={social.platform}
                  >
                    {IconComponent && <IconComponent size={16} />}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick nav column */}
          <div className="flex flex-col gap-3 col-span-1 lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-gray-500 mb-1">Navigate</h4>
            {NAV_SECTIONS.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                className="text-sm text-gray-500 hover:text-white transition-colors duration-200 w-fit hover:translate-x-0.5 inline-block"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Key highlights column */}
          <div className="flex flex-col gap-3 col-span-1 lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-gray-500 mb-1">Highlights</h4>
            {[
              { label: 'Indian Patent Co-Inventor', sub: 'Published 2024' },
              { label: 'Computer Vision Intern', sub: 'ArcticTern Solutions' },
              { label: '20,000+ Frames Labeled', sub: 'AI Data Pipeline' },
              { label: 'ECE — 7.66 CGPA', sub: 'KLE Tech University' },
              { label: 'Open to Opportunities', sub: 'Hardware · AI · CV' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-sm text-gray-400 font-medium leading-snug">{item.label}</span>
                <span className="text-[11px] text-gray-600">{item.sub}</span>
              </div>
            ))}
          </div>

          {/* QR Code column */}
          <div className="flex flex-col gap-3 col-span-1 lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-gray-500 mb-1">Scan Digital Card</h4>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col items-center gap-3">
              <QrCode value={qrUrl} size={110} />
              <p className="text-[10px] text-gray-500 text-center leading-relaxed">
                Scan with your phone to view my interactive digital contact card instantly.
              </p>
            </div>
          </div>

        </div>
      </Container>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/[0.04]">
        <Container className="py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-gray-600 text-center sm:text-left">
            © {currentYear} {personalData.name}. All rights reserved.
          </p>
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-1.5 text-[11px] text-gray-600 hover:text-white transition-colors group"
          >
            Back to top
            <ArrowUpRight size={11} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </Container>
      </div>
    </footer>
  );
}
