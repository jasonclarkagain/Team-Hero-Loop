import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const TASKS = [
  { id: 1, title: 'Design system tokens', col: 'todo', assignee: 'M', color: '#EC4899', tag: 'Design', tagColor: '#EC489930' },
  { id: 2, title: 'API rate limiting', col: 'todo', assignee: 'C', color: '#06B6D4', tag: 'Backend', tagColor: '#06B6D430' },
  { id: 3, title: 'User onboarding flow', col: 'in-progress', assignee: 'A', color: '#6366F1', tag: 'Product', tagColor: '#6366F130' },
  { id: 4, title: 'Auth migration', col: 'in-progress', assignee: 'J', color: '#F97316', tag: 'Backend', tagColor: '#F9731630' },
  { id: 5, title: 'Analytics dashboard', col: 'review', assignee: 'S', color: '#22C55E', tag: 'Frontend', tagColor: '#22C55E30' },
  { id: 6, title: 'Mobile push notifications', col: 'review', assignee: 'M', color: '#EC4899', tag: 'Mobile', tagColor: '#EC489930' },
];

const COLUMNS = [
  { id: 'todo', label: 'To Do', count: 2 },
  { id: 'in-progress', label: 'In Progress', count: 2 },
  { id: 'review', label: 'Review', count: 2 },
];

function TaskCard({ task, delay }: { task: typeof TASKS[0]; delay: number }) {
  return (
    <motion.div
      className="rounded-xl p-4 mb-3"
      style={{ background: '#1A1D33', border: '1px solid rgba(255,255,255,0.06)' }}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22, delay }}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <p className="text-sm font-medium text-white leading-tight" style={{ fontFamily: 'var(--font-body)' }}>
          {task.title}
        </p>
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
          style={{ background: task.color }}
        >
          {task.assignee}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span
          className="text-xs px-2 py-0.5 rounded-full font-medium"
          style={{ background: task.tagColor, color: task.color, fontFamily: 'var(--font-body)' }}
        >
          {task.tag}
        </span>
      </div>
    </motion.div>
  );
}

export function Scene2() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => setPhase(2), 600),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center px-8"
      initial={{ clipPath: 'inset(0 0 100% 0)' }}
      animate={{ clipPath: 'inset(0 0 0% 0)' }}
      exit={{ clipPath: 'inset(100% 0 0% 0)' }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
    >
      <motion.div
        className="w-full max-w-5xl"
        initial={{ opacity: 0 }}
        animate={phase >= 1 ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={phase >= 1 ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
            Sprint 12
          </h2>
          <span className="text-sm px-3 py-1 rounded-full font-medium" style={{ background: '#5B5BD620', color: '#5B5BD6' }}>
            6 tasks
          </span>
          <div className="flex items-center gap-2 ml-auto">
            {['#6366F1', '#22C55E', '#F97316', '#EC4899', '#06B6D4'].map((color, i) => (
              <motion.div
                key={i}
                className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold text-white"
                style={{ background: color, borderColor: '#0C0E1A' }}
                initial={{ scale: 0, opacity: 0 }}
                animate={phase >= 1 ? { scale: 1, opacity: 1 } : {}}
                transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.3 + i * 0.07 }}
              >
                {['A', 'S', 'J', 'M', 'C'][i]}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-3 gap-4">
          {COLUMNS.map((col, ci) => (
            <div key={col.id}>
              <motion.div
                className="flex items-center gap-2 mb-4"
                initial={{ opacity: 0, y: -10 }}
                animate={phase >= 1 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: ci * 0.1 }}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: ['#6366F1', '#F97316', '#22C55E'][ci] }}
                />
                <span className="text-sm font-semibold" style={{ color: '#A5A6C8', fontFamily: 'var(--font-body)' }}>
                  {col.label}
                </span>
                <span className="text-xs px-1.5 py-0.5 rounded-full ml-auto" style={{ background: '#1A1D33', color: '#6366A0' }}>
                  {col.count}
                </span>
              </motion.div>
              <div>
                {TASKS.filter(t => t.col === col.id).map((task, ti) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    delay={phase >= 2 ? 0.1 + ci * 0.15 + ti * 0.1 : 9999}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
