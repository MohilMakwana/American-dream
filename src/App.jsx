import { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Deck, SLIDES } from './components/Deck';
import { usePerformanceProfile } from './hooks/usePerformanceProfile';
import { IntroScreen } from './components/IntroScreen';
import { CursorGlow } from './components/CursorGlow';

const BackgroundCanvas = lazy(() =>
  import('./components/BackgroundCanvas').then((m) => ({ default: m.BackgroundCanvas }))
);

export default function App() {
  const [idx, setIdx] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const activeSection = SLIDES[idx]?.section || 'Hero';
  const perf = usePerformanceProfile();

  return (
    <div className="w-full h-full overflow-hidden relative bg-black">
      <AnimatePresence mode="wait">
        {showIntro ? (
          <motion.div
            key="intro-screen-wrapper"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute inset-0 z-50"
          >
            <IntroScreen onComplete={() => setShowIntro(false)} />
          </motion.div>
        ) : (
          <motion.div
            key="main-deck-wrapper"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full relative"
          >
            <CursorGlow />
            {perf.enable3d ? (
              <Suspense fallback={<div className="bg-canvas-fallback" aria-hidden="true" />}>
                <BackgroundCanvas
                  activeIndex={idx}
                  activeSection={activeSection}
                  quality={perf.isMobile ? 'low' : 'high'}
                />
              </Suspense>
            ) : (
              <div className="bg-canvas-fallback" aria-hidden="true" />
            )}
            <div className="deck-atmosphere" aria-hidden="true" />
            <div className="deck-vignette" aria-hidden="true" />
            <Deck idx={idx} setIdx={setIdx} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
