import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!glowRef.current) return;
      const { clientX, clientY } = e;
      // Using translate3d for hardware acceleration and layout performance
      glowRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0) translate(-50%, -50%)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={glowRef}
      className="pointer-events-none fixed left-0 top-0 z-30 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1)_0%,rgba(6,182,212,0.03)_50%,transparent_100%)] opacity-0 transition-opacity duration-500 md:opacity-100 blur-[80px]"
      style={{ transform: 'translate3d(-999px, -999px, 0)' }}
    />
  );
}
