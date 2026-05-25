import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as S from './Screens';
import { InteractiveSuiteSlide } from './InteractiveSuiteSlide';
import { ChapterHub } from './ChapterHub';
import { NavSectionMenu } from './NavSectionMenu';
import { HudSlideRail } from './HudSlideRail';

/* ─── All 18 screens ─── */
// eslint-disable-next-line react-refresh/only-export-components
export const SLIDES = [
  { id:'1.1', section:'Hero',          Component: S.S1_1, title: 'Opening Hero' },
  { id:'1.2', section:'Hero',          Component: S.S1_2, title: 'The Story & Atrium' },
  { id:'2.1', section:'Scale',         Component: S.S2_1, title: 'Scale & Catchment' },
  { id:'2.2', section:'Scale',         Component: S.S2_2, title: 'By the Numbers' },
  { id:'2.3', section:'Scale',         Component: S.S2_3, title: 'Location & Transit' },
  { id:'3.1', section:'Retail',        Component: S.S3_1, title: 'Leasing Formats' },
  { id:'3.2', section:'Retail',        Component: S.S3_2, title: 'Brand Roster' },
  { id:'3.3', section:'Retail',        Component: S.S3_3, title: 'Pop-Up Program' },
  { id:'3.4', section:'Retail',        Component: S.S3_4, title: 'Dining Bistro' },
  { id:'4.1', section:'Luxury',        Component: S.S4_1, title: 'The Avenue' },
  { id:'4.2', section:'Luxury',        Component: S.S4_2, title: 'Saks Anchor' },
  { id:'5.1', section:'Entertainment', Component: S.S5_1, title: 'Amusement Universe' },
  { id:'5.2', section:'Entertainment', Component: S.S5_2, title: 'Attraction Specs' },
  { id:'5.3', section:'Entertainment', Component: S.S5_3, title: 'Demographics' },
  { id:'6.1', section:'Events',        Component: S.S6_1, title: 'Event Platform' },
  { id:'6.2', section:'Events',        Component: S.S6_2, title: 'Partnership Tiers' },
  { id:'6.3', section:'Events',        Component: S.S6_3, title: 'Case Studies' },
  { id:'7.0', section:'Suite',         Component: InteractiveSuiteSlide, title: 'B2B Interactive Suite' },
  { id:'7.1', section:'Venues',        Component: S.S7_1, title: 'Venue Spec Sheet' },
  { id:'7.2', section:'Venues',        Component: S.S7_2, title: 'Booking Inquiry' },
];

const SECTIONS = ['Hero','Scale','Retail','Luxury','Entertainment','Events','Suite','Venues'];

const SECTION_COLORS = {
  Hero: 'var(--white)',
  Scale: 'var(--white)',
  Retail: 'var(--white)',
  Luxury: 'var(--white)',
  Entertainment: 'var(--white)',
  Events: 'var(--white)',
  Suite: 'var(--white)',
  Venues: 'var(--white)'
};

/* ─── Page transition variants ─── */
const pageVariants = {
  enter: d => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
  center:    { opacity: 1, x: 0, transition: { duration: .5, ease: [.25,.95,.4,1] } },
  exit: d  => ({ opacity: 0, x: d > 0 ? -60 : 60, transition: { duration: .4, ease: [.25,.95,.4,1] } }),
};

export function Deck({ idx, setIdx }) {
  const [dir,  setDir]  = useState(1);
  const [hover,setHover]= useState(false);
  const [hubOpen, setHubOpen] = useState(false);
  const touchX = useRef(0);
  const touchY = useRef(0);
  const total  = SLIDES.length;

  const go = delta => {
    const n = idx + delta;
    if (n < 0 || n >= total) return;
    setDir(delta);
    setIdx(n);
  };

  const jumpTo = name => {
    const ti = SLIDES.findIndex(s => s.section === name);
    if (ti === -1) return;
    setDir(ti > idx ? 1 : -1);
    setIdx(ti);
    setHubOpen(false);
  };

  const jumpToIndex = (ti) => {
    if (ti < 0 || ti >= total) return;
    setDir(ti > idx ? 1 : -1);
    setIdx(ti);
    setHubOpen(false);
  };

  /* Keyboard */
  useEffect(() => {
    const fn = e => {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(1);  }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); go(-1); }
      if (e.key === 'Escape') { setHubOpen(false); }
      if (e.key === 'h' || e.key === 'H') setHubOpen((v) => !v);
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [idx]);

  /* Touch */
  const onTouchStart = e => { touchX.current = e.touches[0].clientX; touchY.current = e.touches[0].clientY; };
  const onTouchEnd   = e => {
    const dx = e.changedTouches[0].clientX - touchX.current;
    const dy = e.changedTouches[0].clientY - touchY.current;
    if (Math.abs(dx) > 52 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
  };

  const section = SLIDES[idx].section;
  const { Component } = SLIDES[idx];
  const pct = ((idx + 1) / total) * 100;
  const activeColor = SECTION_COLORS[section] || 'var(--blue)';

  return (
    <div
      className="fixed inset-0 z-10 flex flex-col overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >

      {/* ════ NAV BAR — centered section nav ════ */}
      <header className="nav-bar">
        <div className="nav-bar__inner">
          <div className="nav-bar__brand">
            <button type="button" className="nav-wordmark" onClick={() => { setDir(-1); setIdx(0); }}>
              AMERICAN DREAM
            </button>
          </div>

          <nav className="nav-bar__center hidden lg:flex" aria-label="Deck sections">
            {SECTIONS.map((sec) => {
              const sectionSlides = SLIDES.filter((s) => s.section === sec).map((s) => ({
                ...s,
                globalIndex: SLIDES.findIndex((item) => item.id === s.id),
              }));
              return (
                <NavSectionMenu
                  key={sec}
                  sec={sec}
                  section={section}
                  slides={sectionSlides}
                  currentIndex={idx}
                  onJumpToSection={jumpTo}
                  onJumpToSlide={(ti) => {
                    setDir(ti > idx ? 1 : -1);
                    setIdx(ti);
                  }}
                />
              );
            })}
          </nav>

          {/* Tablet: scrollable section strip */}
          <nav className="nav-bar__scroll hidden md:flex lg:hidden" aria-label="Quick sections">
            {SECTIONS.map((sec) => (
              <button
                key={sec}
                type="button"
                onClick={() => jumpTo(sec)}
                className={`nav-pill-btn ${sec === section ? 'active' : ''}`}
              >
                {sec}
              </button>
            ))}
          </nav>

          <div className="nav-bar__actions">
            <span className="nav-bar__section-mobile md:hidden">{section}</span>
            <button
              type="button"
              onClick={() => setHubOpen(true)}
              className="nav-chapters-btn hidden sm:inline-flex"
            >
              <span>Chapters</span>
              <span className="nav-chapters-btn__icon" aria-hidden="true">⊞</span>
            </button>
            <button type="button" onClick={() => setHubOpen(true)} className="nav-pill-btn sm:hidden" aria-label="Open chapters">
              ⊞
            </button>
          </div>
        </div>
      </header>

      {/* Digideck-style chapter hub overlay */}
      <AnimatePresence>
        {hubOpen && (
          <motion.div
            className="chapter-hub-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ChapterHub onSelect={jumpToIndex} onClose={() => setHubOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════ SLIDE AREA ════ */}
      <div className="slide-area">

        {/* Left / Right arrow buttons — show on hover */}
        {idx > 0 && (
          <motion.button
            initial={{opacity:0}} animate={{opacity:hover?1:0}} transition={{duration:.2}}
            onClick={() => go(-1)} className="edge-btn edge-btn-left"
            style={{opacity:hover?1:0,transition:'opacity .2s ease, background .2s ease'}}
          >
            ←
          </motion.button>
        )}
        {idx < total - 1 && (
          <motion.button
            initial={{opacity:0}} animate={{opacity:hover?1:0}} transition={{duration:.2}}
            onClick={() => go(1)} className="edge-btn edge-btn-right"
            style={{opacity:hover?1:0,transition:'opacity .2s ease, background .2s ease'}}
          >
            →
          </motion.button>
        )}

        {/* Slide transition */}
        <AnimatePresence initial={false} custom={dir} mode="wait">
          <motion.div
            key={idx}
            custom={dir}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            style={{position:'absolute',inset:0}}
          >
            <Component
              isActive
              prefetch={['1.2', '5.1'].includes(SLIDES[idx + 1]?.id)}
              onNext={() => go(1)}
              onPrev={() => go(-1)}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ════ PROGRESS BAR ════ */}
      <div className="progress-track">
        <motion.div className="progress-fill" animate={{width:`${pct}%`, background:activeColor}} transition={{duration:.35}} />
      </div>

      {/* ════ HUD BAR ════ */}
      <div className="hud-bar">
        <div className="hud-bar__inner">
          <span className="hud-bar__section">{section}</span>

          <div className="hud-bar__rail hidden md:flex">
            <HudSlideRail
              slides={SLIDES}
              idx={idx}
              onSelect={(i) => { setDir(i > idx ? 1 : -1); setIdx(i); }}
            />
          </div>

          <span className="hud-bar__counter">
            <span className="hud-bar__counter-current">{String(idx + 1).padStart(2, '0')}</span>
            <span className="hud-bar__counter-total"> / {total}</span>
          </span>
        </div>
      </div>

    </div>
  );
}

export default Deck;
