import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { linkPreviewsData } from '../../data/linkPreviews';
import { ExternalLink, Award, Globe, Building } from 'lucide-react';
import { Linkedin } from './BrandIcons';
import { personalData } from '../../data/personal';

export default function LinkPreviewTooltip({ url, children, className = "inline-block w-full" }) {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const getPreviewData = (targetUrl) => {
    if (!targetUrl) return null;
    const urlLower = targetUrl.toLowerCase();
    return linkPreviewsData.find(item => 
      item.keywords.some(keyword => urlLower.includes(keyword.toLowerCase()))
    );
  };

  const preview = getPreviewData(url);

  // If there is no preview metadata, just render the child as-is
  if (!preview) {
    return children;
  }

  const updatePosition = (e) => {
    const offset = 15;
    let x = e.pageX + offset;
    let y = e.pageY + offset;

    // Viewport-aware boundary checks
    const tooltipWidth = 320;
    const tooltipHeight = 220;

    if (e.clientX + tooltipWidth > window.innerWidth) {
      x = e.pageX - tooltipWidth - offset;
    }
    if (e.clientY + tooltipHeight > window.innerHeight) {
      y = e.pageY - tooltipHeight - offset;
    }

    setPosition({ x, y });
  };

  const handleMouseEnter = (e) => {
    updatePosition(e);
    setVisible(true);
  };

  const handleMouseMove = (e) => {
    updatePosition(e);
  };

  const handleMouseLeave = () => {
    setVisible(false);
  };

  const renderIcon = (type) => {
    switch (type) {
      case 'linkedin_post':
        return <Linkedin size={14} className="text-[#0a66c2]" />;
      case 'coursera_cert':
        return <Award size={14} className="text-cyan-400" />;
      case 'company_web':
        return <Building size={14} className="text-indigo-400" />;
      default:
        return <Globe size={14} className="text-gray-400" />;
    }
  };

  return (
    <>
      <div 
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={className}
      >
        {children}
      </div>

      {createPortal(
        <AnimatePresence>
          {visible && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                left: `${position.x}px`,
                top: `${position.y}px`,
                zIndex: 9999,
                pointerEvents: 'none'
              }}
              className="w-[320px] rounded-2xl border border-white/10 bg-[#0d0d0b]/95 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl font-sans select-none text-left"
            >
              {/* Header: User Profile Details */}
              <div className="flex items-start justify-between gap-3 mb-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-full border border-white/10 overflow-hidden bg-gray-800">
                    <img 
                      src={personalData.avatar} 
                      alt={personalData.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold text-white leading-tight">
                        {preview.author}
                      </span>
                      <span className="text-[10px] text-gray-500 font-semibold">• 1st</span>
                    </div>
                    <span className="text-[9px] text-gray-400 block leading-tight mt-0.5 max-w-[170px] truncate">
                      {preview.authorRole}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/5 border border-white/10">
                  {renderIcon(preview.type)}
                  <span className="text-[9px] font-mono text-gray-400 uppercase tracking-wider">
                    {preview.tag}
                  </span>
                </div>
              </div>

              {/* Body Content */}
              <p className="text-xs text-gray-300 leading-relaxed mb-3 line-clamp-3">
                {preview.description}
              </p>

              {/* Link Box Footer */}
              <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <span className="text-[9px] text-[#0a66c2] font-semibold uppercase tracking-wider block font-mono">
                    {preview.siteName}
                  </span>
                  <span className="text-xs font-semibold text-white truncate block mt-0.5">
                    {preview.title}
                  </span>
                </div>
                <div className="p-1.5 rounded bg-white/5 text-gray-400 shrink-0">
                  <ExternalLink size={12} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
