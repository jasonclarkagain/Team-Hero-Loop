import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const TASKS = [
  { title: 'Design system tokens', assignee: 'M', color: '#EC4899', done: false },
  { title: 'User onboarding flow', assignee: 'A', color: '#6366F1', done: false },
  { title: 'Auth migration', assignee: 'J', color: '#F97316', done: false },
  { title: 'Analytics dashboard', assignee: 'S', color: '#22C55E', done: false },
  { title: 'API rate limiting', assignee: 'C', color: '#06B6D4', done: false },
  { title: 'Mobile push notifications', assignee: 'M', color: '#EC4899', done: false },
];

function CheckIcon({ visible }: { visible: boolean }) {
  return (
    <motion.svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      initial={{ scale: 0, rotate: -30 }}
      animate={visible ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -30 }}
      transition={{ type: 'spring', stiffness: 500, damping: 20 }}
    >
      <motion.path
        d="M3 8L6.5 11.5L13 5"
        stroke="#22C55E"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={visible ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      />
    </motion.svg>
  );
}

export function Scene4() {
  const [phase, setPhase] = useState(0);
  const [checked, setChecked] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 200),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  useEffect(() => {
    if (phase < 1) return;
    const checkTask = (index: number, delay: number) => {
      setTimeout(() => {
        setChecked(prev => {
          const next = [...prev, index];
          setProgress((next.length / TASKS.length) * 100);
          return next;
        });
      }, delay);
    };

    TASKS.forEach((_, i) => {
      checkTask(i, 300 + i * 450);
    });
  }, [phase]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-8"
      initial={{ clipPath: 'inset(0 100% 0 0)' }}
      animate={{ clipPath: 'inset(0 0% 0 0)' }}
      exit={{ clipPath: 'inset(0 0 0 100%)' }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="w-full max-w-lg">
        <motion.div
          className="flex items-center justify-between mb-6"
          initial={{ opacity: 0, y: -15 }}
          animate={phase >= 1 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
              Sprint 12
            </h2>
            <p className="text-sm mt-0.5" style={{ color: '#A5A6C8' }}>
              {checked.length} of {TASKS.length} tasks complete
            </p>
          </div>
          <motion.div
            className="text-4xl font-extrabold"
            style={{ fontFamily: 'var(--font-display)', color: '#22C55E' }}
          >
            {Math.round(progress)}%
          </motion.div>
        </motion.div>

        <motion.div
          className="w-full h-2 rounded-full mb-8 overflow-hidden"
          style={{ background: '#1A1D33' }}
          initial={{ opacity: 0 }}
          animate={phase >= 1 ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #5B5BD6, #22C55E)' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>

        <div className="space-y-3">
          {TASKS.map((task, i) => {
            const isDone = checked.includes(i);
            return (
              <motion.div
                key={i}
                className="flex items-center gap-4 p-4 rounded-xl"
                style={{
                  background: isDone ? '#0F2A1A' : '#1A1D33',
                  border: `1px solid ${isDone ? '#22C55E30' : 'rgba(255,255,255,0.06)'}`,
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22, delay: 0.1 + i * 0.08 }}
              >
                <div
                  className="w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0"
                  style={{
                    borderColor: isDone ? '#22C55E' : 'rgba(255,255,255,0.15)',
                    background: isDone ? '#22C55E15' : 'transparent',
                  }}
                >
                  <CheckIcon visible={isDone} />
                </div>
                <div className="flex-1">
                  <p
                    className="text-sm font-medium"
                    style={{
                      color: isDone ? '#A5A6C8' : '#FFFFFF',
                      textDecoration: isDone ? 'line-through' : 'none',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    {task.title}
                  </p>
                </div>
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                  style={{ background: task.color }}
                >
                  {task.assignee}
                </div>
              </motion.div>
            );
          })}
        </div>

        {checked.length === TASKS.length && (
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
          >
            <p className="text-lg font-semibold text-green-400" style={{ fontFamily: 'var(--font-display)' }}>
              Sprint complete!
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
