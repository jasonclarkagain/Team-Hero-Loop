import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function Scene1() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 600),
      setTimeout(() => setPhase(3), 1200),
      setTimeout(() => setPhase(4), 2000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  const headline = "Ship together.";
  const chars = headline.split('');

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center"
      initial={{ clipPath: 'circle(0% at 50% 50%)' }}
      animate={{ clipPath: 'circle(100% at 50% 50%)' }}
      exit={{ clipPath: 'circle(0% at 50% 50%)' }}
      transition={{ duration: 1.0, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="relative z-10 flex flex-col items-center gap-8 px-12">
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, y: -30 }}
          animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #5B5BD6, #7C3AED)' }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <circle cx="7" cy="7" r="3" fill="white" fillOpacity="0.9" />
              <circle cx="15" cy="7" r="3" fill="white" fillOpacity="0.6" />
              <circle cx="11" cy="15" r="3" fill="white" fillOpacity="0.8" />
              <line x1="7" y1="7" x2="11" y2="15" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" />
              <line x1="15" y1="7" x2="11" y2="15" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" />
              <line x1="7" y1="7" x2="15" y2="7" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" />
            </svg>
          </div>
          <span className="text-lg font-semibold tracking-wide" style={{ fontFamily: 'var(--font-display)', color: '#A5A6C8' }}>
            Collab
          </span>
        </motion.div>

        <h1
          className="text-[8vw] font-extrabold tracking-tight leading-none text-white text-center"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {chars.map((char, i) => (
            <motion.span
              key={i}
              style={{ display: 'inline-block', whiteSpace: 'pre' }}
              initial={{ opacity: 0, y: 60, rotateX: -40, transformPerspective: 800 }}
              animate={phase >= 2 ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 60, rotateX: -40 }}
              transition={{
                type: 'spring',
                stiffness: 380,
                damping: 24,
                delay: phase >= 2 ? i * 0.04 : 0,
              }}
            >
              {char}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="text-[1.8vw] text-center max-w-xl"
          style={{ color: '#A5A6C8', fontFamily: 'var(--font-body)' }}
          initial={{ opacity: 0, filter: 'blur(12px)', y: 20 }}
          animate={phase >= 3 ? { opacity: 1, filter: 'blur(0px)', y: 0 } : { opacity: 0, filter: 'blur(12px)', y: 20 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Real-time tasks, shared progress, and a team that moves as one.
        </motion.p>

        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={phase >= 4 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 400, damping: 22 }}
        >
          {['#6366F1', '#22C55E', '#F97316', '#EC4899', '#06B6D4'].map((color, i) => (
            <motion.div
              key={i}
              className="w-9 h-9 rounded-full border-2 border-[#0C0E1A] flex items-center justify-center text-xs font-bold text-white"
              style={{ background: color, marginLeft: i > 0 ? '-10px' : 0, zIndex: 5 - i }}
              initial={{ x: -20, opacity: 0 }}
              animate={phase >= 4 ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 350, damping: 22, delay: i * 0.08 }}
            >
              {['A', 'S', 'J', 'M', 'C'][i]}
            </motion.div>
          ))}
          <motion.span
            className="ml-4 text-sm font-medium"
            style={{ color: '#A5A6C8', fontFamily: 'var(--font-body)' }}
            initial={{ opacity: 0 }}
            animate={phase >= 4 ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            5 members online
          </motion.span>
        </motion.div>
      </div>
    </motion.div>
  );
}
