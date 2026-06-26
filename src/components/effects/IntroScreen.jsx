import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroScreen({ onComplete }) {
  const [step, setStep] = useState(0); // 0: hello draw, 1: welcome text, 2: finished

  useEffect(() => {
    // Stage 1: hello draw plays for 3.2s, then step increases
    const timer1 = setTimeout(() => {
      setStep(1);
    }, 3200);

    // Stage 2: welcome text plays for 3.3s, then complete
    const timer2 = setTimeout(() => {
      setStep(2);
      onComplete();
    }, 6500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-[#0D0D0B] flex flex-col items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="svg-hello"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center w-full max-w-lg px-6"
          >
            <svg 
              viewBox="0 0 380 160" 
              className="w-full h-auto text-white"
              fill="none" 
              stroke="currentColor" 
              strokeWidth="4" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <motion.path
                d="M 25 100 C 50 100, 70 20, 85 20 C 95 20, 75 140, 75 140 C 75 140, 95 90, 115 90 C 135 90, 130 140, 150 140 C 165 140, 180 100, 170 100 C 155 100, 165 140, 190 140 C 205 140, 220 20, 230 20 C 240 20, 225 140, 225 140 C 225 140, 245 20, 255 20 C 265 20, 250 140, 250 140 C 250 140, 275 80, 290 80 C 315 80, 310 140, 295 140 C 275 140, 285 100, 305 100 C 320 100, 335 120, 355 120"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ 
                  duration: 2.5, 
                  ease: [0.65, 0, 0.35, 1], // premium cubic ease curve
                  delay: 0.3
                }}
              />
            </svg>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="welcome-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="text-center px-6"
          >
            <h1 className="text-xl sm:text-2xl md:text-3xl font-light tracking-[0.2em] text-[#F0EDE6] uppercase leading-relaxed font-mono">
              Welcome to portfolio
            </h1>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.1em] text-[#E8C547] uppercase mt-2 font-mono">
              Amaan Ansari
            </h2>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
