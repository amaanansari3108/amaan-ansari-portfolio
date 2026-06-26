import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Download, X, Heart, ArrowUpRight } from 'lucide-react';
import { personalData } from '../../data/personal';
import { socialData } from '../../data/social';
import { Github, Linkedin } from './BrandIcons';

export default function ContactCardModal({ isOpen, onClose }) {
  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = personalData.resumeUrl;
    link.download = 'Amaan_Ansari_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getSocialUrl = (platform) => {
    const social = socialData.find(s => s.platform.toLowerCase() === platform.toLowerCase());
    return social ? social.url : '#';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            className="relative w-full max-w-md glass-card bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center shadow-2xl select-none"
            style={{ 
              boxShadow: '0 24px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)',
            }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {/* Avatar Ring */}
            <div className="relative h-24 w-24 rounded-full p-[1.5px] bg-gradient-to-tr from-cyan-400 via-purple-500 to-indigo-500 shadow-lg mb-4">
              <div className="h-full w-full rounded-full bg-[#080d1a] overflow-hidden flex items-center justify-center">
                <img
                  src={personalData.avatar}
                  alt={personalData.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full bg-green-500 border-2 border-[#080d1a] animate-pulse" />
            </div>

            {/* Identity */}
            <h2 className="text-2xl font-extrabold text-white tracking-tight mb-1">
              {personalData.name}
            </h2>
            <p className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-4">
              {personalData.role}
            </p>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs mb-6">
              ECE Graduate · Co-Inventor of Thermoelectric Cooling Patent · Computer Vision & AI Data Ops Specialist
            </p>

            {/* Contact quick actions */}
            <div className="w-full space-y-3 mb-6">
              <a
                href={`mailto:${personalData.email}`}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-cyan-500/30 text-gray-300 hover:text-white transition-all duration-300 group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
                    <Mail size={16} />
                  </div>
                  <span className="text-xs font-medium uppercase tracking-wider">Email Me</span>
                </div>
                <span className="text-xs text-gray-500 group-hover:text-cyan-400 flex items-center gap-0.5 font-mono">
                  {personalData.email} <ArrowUpRight size={12} />
                </span>
              </a>

              <a
                href={`tel:${personalData.phone}`}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-indigo-500/30 text-gray-300 hover:text-white transition-all duration-300 group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400">
                    <Phone size={16} />
                  </div>
                  <span className="text-xs font-medium uppercase tracking-wider">Call Me</span>
                </div>
                <span className="text-xs text-gray-500 group-hover:text-indigo-400 flex items-center gap-0.5 font-mono">
                  +{personalData.phone} <ArrowUpRight size={12} />
                </span>
              </a>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={getSocialUrl('linkedin')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-blue-500/30 text-gray-300 hover:text-white transition-all duration-300 font-medium text-xs uppercase tracking-wider"
                >
                  <Linkedin size={15} className="text-blue-400" /> LinkedIn
                </a>
                <a
                  href={getSocialUrl('github')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-gray-400/30 text-gray-300 hover:text-white transition-all duration-300 font-medium text-xs uppercase tracking-wider"
                >
                  <Github size={15} /> GitHub
                </a>
              </div>

              <button
                onClick={handleDownloadResume}
                className="w-full flex items-center justify-center gap-2.5 p-4 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs uppercase tracking-widest cursor-pointer hover:shadow-lg hover:shadow-cyan-500/20 transition-all btn-primary"
              >
                <Download size={15} /> Download Resume
              </button>
            </div>

            {/* Thank you card */}
            <div className="w-full p-4 rounded-2xl bg-white/[0.01] border border-white/5 flex gap-3 text-left">
              <div className="p-2 h-fit rounded-lg bg-pink-500/10 text-pink-400 shrink-0">
                <Heart size={15} className="fill-pink-400/20" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                  Thank you for scanning!
                </h4>
                <p className="text-[11px] text-gray-500 leading-normal">
                  I really appreciate your interest in my engineering work. Let's collaborate or catch up on IoT, embedded hardware, or AI!
                </p>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
