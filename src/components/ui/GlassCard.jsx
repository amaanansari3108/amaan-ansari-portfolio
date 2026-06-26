import { useState, useRef } from 'react';

export default function GlassCard({ children, className = '', hoverEffect = true, ...props }) {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // 3D tilt calculations: max 4 degrees (gentle tilt)
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    setCoords({ x, y });
    setTilt({ x: rotateX, y: rotateY });
  };

  const cardStyle = {
    '--mouse-x': `${coords.x}px`,
    '--mouse-y': `${coords.y}px`,
    transform: hoverEffect && isHovered 
      ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-3px)` 
      : `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`,
    transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out'
  };

  const cardContent = (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setTilt({ x: 0, y: 0 });
      }}
      style={cardStyle}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8 backdrop-blur-xl transition-all duration-300 ${className}`} 
      {...props}
    >
      {/* Spotlight Glow Follower */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10"
        style={{
          background: `radial-gradient(300px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(99, 102, 241, 0.08), transparent 80%)`
        }}
      />
      
      {/* Subtle interior gradient glowing spots */}
      <div className="absolute -right-20 -top-20 -z-10 h-40 w-40 rounded-full bg-indigo-500/5 blur-[50px] pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 -z-10 h-40 w-40 rounded-full bg-cyan-500/5 blur-[50px] pointer-events-none" />
      {children}
    </div>
  );

  return cardContent;
}
