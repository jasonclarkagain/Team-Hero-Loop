import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { useVideoPlayer } from '@/lib/video';
import { Scene1 } from './video_scenes/Scene1';
import { Scene2 } from './video_scenes/Scene2';
import { Scene3 } from './video_scenes/Scene3';
import { Scene4 } from './video_scenes/Scene4';
import { Scene5 } from './video_scenes/Scene5';

export const SCENE_DURATIONS: Record<string, number> = {
  intro: 4000,
  board: 5000,
  collab: 5000,
  completion: 5500,
  outro: 4500,
};

const SCENE_COMPONENTS: Record<string, React.ComponentType> = {
  intro: Scene1,
  board: Scene2,
  collab: Scene3,
  completion: Scene4,
  outro: Scene5,
};

const BG_POSITIONS = [
  { x: '60vw', y: '30vh', scale: 2.2, opacity: 0.5 },
  { x: '15vw', y: '20vh', scale: 1.6, opacity: 0.45 },
  { x: '70vw', y: '60vh', scale: 1.8, opacity: 0.4 },
  { x: '30vw', y: '70vh', scale: 1.4, opacity: 0.5 },
  { x: '55vw', y: '15vh', scale: 2.0, opacity: 0.4 },
];

const ACCENT_LEFT = ['8%', '4%', '72%', '60%', '20%'];
const ACCENT_TOP = ['60%', '20%', '75%', '10%', '45%'];
const ACCENT_WIDTH = ['35%', '55%', '30%', '48%', '40%'];

export default function VideoTemplate({
  durations = SCENE_DURATIONS,
  loop = true,
  onSceneChange,
}: {
  durations?: Record<string, number>;
  loop?: boolean;
  onSceneChange?: (sceneKey: string) => void;
} = {}) {
  const { currentScene, currentSceneKey } = useVideoPlayer({ durations, loop });

  useEffect(() => {
    onSceneChange?.(currentSceneKey);
  }, [currentSceneKey, onSceneChange]);

  const baseSceneKey = currentSceneKey.replace(/_r[12]$/, '') as keyof typeof SCENE_DURATIONS;
  const sceneIndex = Object.keys(SCENE_DURATIONS).indexOf(baseSceneKey);
  const SceneComponent = SCENE_COMPONENTS[baseSceneKey];

  return (
    <div className="relative w-full h-screen overflow-hidden" style={{ background: '#0C0E1A' }}>
      {/* Persistent background: grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(91,91,214,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(91,91,214,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Persistent background: drifting blobs */}
      <motion.div
        className="absolute rounded-full blur-3xl pointer-events-none"
        style={{ width: '500px', height: '500px', background: 'radial-gradient(circle, #5B5BD6, transparent 70%)' }}
        animate={{
          left: BG_POSITIONS[sceneIndex]?.x,
          top: BG_POSITIONS[sceneIndex]?.y,
          scale: BG_POSITIONS[sceneIndex]?.scale ?? 1.5,
          opacity: BG_POSITIONS[sceneIndex]?.opacity ?? 0.4,
        }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        className="absolute rounded-full blur-3xl pointer-events-none"
        style={{ width: '350px', height: '350px', background: 'radial-gradient(circle, #7C3AED, transparent 70%)' }}
        animate={{
          left: sceneIndex % 2 === 0 ? '20vw' : '70vw',
          top: sceneIndex % 2 === 0 ? '70vh' : '15vh',
          scale: 1.2 + sceneIndex * 0.1,
          opacity: 0.3,
        }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Persistent accent line */}
      <motion.div
        className="absolute h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, #5B5BD6, transparent)' }}
        animate={{
          left: ACCENT_LEFT[sceneIndex] ?? '8%',
          top: ACCENT_TOP[sceneIndex] ?? '60%',
          width: ACCENT_WIDTH[sceneIndex] ?? '35%',
          opacity: 0.6,
        }}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Persistent floating dot */}
      <motion.div
        className="absolute w-3 h-3 rounded-full pointer-events-none"
        style={{ background: '#F97316', boxShadow: '0 0 20px #F97316' }}
        animate={{
          left: ['80vw', '10vw', '65vw', '40vw', '90vw'][sceneIndex] ?? '80vw',
          top: ['15vh', '80vh', '45vh', '20vh', '70vh'][sceneIndex] ?? '15vh',
        }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Scenes inside AnimatePresence */}
      <AnimatePresence mode="popLayout">
        {SceneComponent && <SceneComponent key={currentSceneKey} />}
      </AnimatePresence>
    </div>
  );
}
