import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const TEAM = [
  { name: 'Alex', color: '#6366F1', role: 'Product', x: '50%', y: '50%' },
  { name: 'Sam', color: '#22C55E', role: 'Frontend', x: '25%', y: '38%' },
  { name: 'Jordan', color: '#F97316', role: 'Backend', x: '75%', y: '38%' },
  { name: 'Maya', color: '#EC4899', role: 'Design', x: '35%', y: '65%' },
  { name: 'Chris', color: '#06B6D4', role: 'Mobile', x: '65%', y: '65%' },
];

const STATS = [
  { value: '14', label: 'sprints shipped' },
  { value: '98%', label: 'on-time delivery' },
  { value: '5x', label: 'faster reviews' },
];

export function Scene5() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 700),
      setTimeout(() => setPhase(3), 1400),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(12px)' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative w-full max-w-3xl flex flex-col items-center">
        <div className="relative w-full h-56 mb-8">
          {TEAM.map((member, i) => (
            <motion.div
              key={i}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: member.x, top: member.y }}
              initial={{ opacity: 0, scale: 0 }}
              animate={phase >= 1 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ type: 'spring', stiffness: 350, damping: 22, delay: 0.1 + i * 0.12 }}
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 rounded-full blur-lg opacity-40"
                  style={{ background: member.color }}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
                />
                <div
                  className="relative w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold text-white border-2"
                  style={{ background: member.color, borderColor: 'rgba(255,255,255,0.2)' }}
                >
                  {member.name[0]}
                </div>
                <motion.div
                  className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-center"
                  initial={{ opacity: 0 }}
                  animate={phase >= 2 ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <p className="text-xs font-semibold text-white" style={{ fontFamily: 'var(--font-body)' }}>{member.name}</p>
                  <p className="text-xs" style={{ color: '#6366A0' }}>{member.role}</p>
                </motion.div>

                {i > 0 && (
                  <motion.svg
                    className="absolute top-7 left-7 pointer-events-none"
                    style={{ overflow: 'visible' }}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={phase >= 1 ? { pathLength: 1, opacity: 0.2 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                  >
                    <motion.line
                      x1="0"
                      y1="0"
                      x2={`${(50 - parseFloat(member.x)) * 2.8}px`}
                      y2={`${(50 - parseFloat(member.y)) * 2.24}px`}
                      stroke={member.color}
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                    />
                  </motion.svg>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2
            className="text-[5vw] font-extrabold text-white leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            One team.
            <span style={{ color: '#5B5BD6' }}> One workspace.</span>
          </h2>
          <p className="text-[1.6vw] mt-2" style={{ color: '#A5A6C8', fontFamily: 'var(--font-body)' }}>
            Collab brings your entire team into sync — from first draft to final ship.
          </p>
        </motion.div>

        <motion.div
          className="flex items-center gap-10"
          initial={{ opacity: 0, y: 20 }}
          animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={phase >= 3 ? { opacity: 1, scale: 1 } : {}}
              transition={{ type: 'spring', stiffness: 350, damping: 22, delay: i * 0.1 }}
            >
              <div
                className="text-3xl font-extrabold"
                style={{ fontFamily: 'var(--font-display)', color: '#5B5BD6' }}
              >
                {stat.value}
              </div>
              <div className="text-xs mt-1" style={{ color: '#6366A0', fontFamily: 'var(--font-body)' }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
