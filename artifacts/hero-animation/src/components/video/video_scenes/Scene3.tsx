import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const CURSORS = [
  { name: 'Alex', color: '#6366F1', startX: 20, startY: 30, endX: 55, endY: 45 },
  { name: 'Sam', color: '#22C55E', startX: 60, startY: 20, endX: 35, endY: 60 },
  { name: 'Jordan', color: '#F97316', startX: 75, startY: 55, endX: 65, endY: 35 },
  { name: 'Maya', color: '#EC4899', startX: 15, startY: 65, endX: 40, endY: 25 },
];

const DOC_LINES = [
  { text: 'Q3 Product Roadmap', bold: true, width: '55%' },
  { text: '', width: '0%' },
  { text: 'Goals & Objectives', bold: true, width: '40%' },
  { text: 'Deliver the new onboarding flow by end of August', width: '72%' },
  { text: 'Reduce time-to-value from 7 days to 2 days', width: '66%' },
  { text: 'Launch mobile app beta for iOS and Android', width: '68%' },
  { text: '', width: '0%' },
  { text: 'Key Milestones', bold: true, width: '35%' },
  { text: 'Week 1-2: Research and wireframes', width: '52%' },
  { text: 'Week 3-4: Design handoff and review', width: '56%' },
];

function Cursor({ name, color, startX, startY, endX, endY, delay }: {
  name: string; color: string; startX: number; startY: number; endX: number; endY: number; delay: number;
}) {
  return (
    <motion.div
      className="absolute z-20 pointer-events-none"
      style={{ left: `${startX}%`, top: `${startY}%` }}
      animate={{
        left: [`${startX}%`, `${endX}%`, `${startX + 10}%`],
        top: [`${startY}%`, `${endY}%`, `${startY + 8}%`],
      }}
      transition={{
        duration: 3.5,
        ease: 'easeInOut',
        delay,
        repeat: Infinity,
        repeatType: 'reverse',
      }}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 2L16 10L10 11L8 17L4 2Z" fill={color} />
        <path d="M4 2L16 10L10 11L8 17L4 2Z" stroke="white" strokeWidth="1" />
      </svg>
      <motion.div
        className="absolute left-5 top-0 px-2 py-0.5 rounded-full text-xs font-semibold text-white whitespace-nowrap"
        style={{ background: color, fontFamily: 'var(--font-body)' }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: delay + 0.3, duration: 0.4 }}
      >
        {name}
      </motion.div>
    </motion.div>
  );
}

export function Scene3() {
  const [phase, setPhase] = useState(0);
  const [typedLines, setTypedLines] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => setPhase(2), 700),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  useEffect(() => {
    if (phase < 2) return;
    let i = 0;
    const advance = () => {
      if (i < DOC_LINES.length) {
        i++;
        setTypedLines(i);
        setTimeout(advance, 180 + Math.random() * 120);
      }
    };
    setTimeout(advance, 300);
  }, [phase]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-8"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: 'blur(8px)' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="w-full max-w-4xl relative">
        <motion.div
          className="flex items-center gap-3 mb-5"
          initial={{ opacity: 0, y: -15 }}
          animate={phase >= 1 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="flex gap-2">
            {['#FF5F57', '#FFBD2E', '#28CA42'].map((c, i) => (
              <div key={i} className="w-3 h-3 rounded-full" style={{ background: c }} />
            ))}
          </div>
          <span className="text-sm font-medium ml-2" style={{ color: '#A5A6C8', fontFamily: 'var(--font-body)' }}>
            Q3 Roadmap.doc
          </span>
          <div className="flex items-center gap-1 ml-auto">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs" style={{ color: '#A5A6C8' }}>4 editing now</span>
          </div>
        </motion.div>

        <motion.div
          className="relative rounded-2xl overflow-hidden p-8"
          style={{ background: '#13152A', border: '1px solid rgba(255,255,255,0.08)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={phase >= 1 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          {CURSORS.map((cursor, i) => (
            <Cursor key={i} {...cursor} delay={0.3 + i * 0.2} />
          ))}

          <div className="space-y-2 relative z-10">
            {DOC_LINES.map((line, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-3"
                initial={{ opacity: 0 }}
                animate={i < typedLines ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {line.text === '' ? (
                  <div className="h-4" />
                ) : (
                  <>
                    <div
                      className={`h-${line.bold ? '5' : '4'} rounded-full`}
                      style={{
                        width: line.width,
                        background: line.bold
                          ? 'rgba(255,255,255,0.85)'
                          : 'rgba(255,255,255,0.35)',
                        height: line.bold ? '18px' : '13px',
                      }}
                    />
                    {i === typedLines - 1 && (
                      <motion.div
                        className="w-0.5 h-4 bg-white"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      />
                    )}
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="flex items-center gap-4 mt-4 justify-center"
          initial={{ opacity: 0 }}
          animate={phase >= 2 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          {CURSORS.map((c, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: c.color }} />
              <span className="text-xs" style={{ color: '#A5A6C8', fontFamily: 'var(--font-body)' }}>{c.name} is typing</span>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
