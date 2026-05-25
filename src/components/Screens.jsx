import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MEDIA, LUXURY_TENANTS } from '../data/media';
import { MediaImage } from './media/MediaImage';
import { SlideContent } from './media/SlideContent';
import { DeckModal } from './DeckModal';
import { ImageGallery } from './media/ImageGallery';
import { SplitMedia } from './media/SplitMedia';
import { MediaMosaic } from './media/MediaMosaic';
import { MagneticCard } from './MagneticCard';

/* ─── shared motion helpers ─── */
const up = (d = 0) => ({ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { delay: d, duration: .6, ease: [.15, 1, .3, 1] } } });
const fade = (d = 0) => ({ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: d, duration: .5 } } });
const stagger = (s = .08, d = 0) => ({ show: { transition: { delayChildren: d, staggerChildren: s } } });

/* useCount hook for numerical roll-ups */
function useCount(target, ms = 1400, run = true) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) { const t = setTimeout(() => setV(0), 0); return () => clearTimeout(t); }
    let st = null;
    const anim = ts => {
      if (!st) st = ts;
      const p = Math.min((ts - st) / ms, 1);
      setV(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(anim);
      else setV(target);
    };
    const id = requestAnimationFrame(anim);
    return () => cancelAnimationFrame(id);
  }, [target, ms, run]);
  return v;
}

/* Slide container wrapper */
function Slide({ children, className = '' }) {
  return (
    <div className={`w-full h-full min-h-0 flex flex-col overflow-hidden justify-center relative ${className}`}>
      {children}
    </div>
  );
}

/* Interactive visual slats component for Hero opening */
function VisualPillarsSlat() {
  const [hoveredSlat, setHoveredSlat] = useState(null);
  const slats = [
    { id: 'retail', title: 'Retail Flagships', img: MEDIA.retail_corridor, tag: '3M SQ FT', desc: 'World-class flagships in the NYC metro.' },
    { id: 'luxury', title: 'The Avenue', img: MEDIA.luxury_avenue, tag: 'LUXURY WING', desc: "The tri-state area's most elevated address." },
    { id: 'entertainment', title: 'Theme Parks', img: MEDIA.nick_universe, tag: 'ENTERTAINMENT', desc: 'Year-round indoor skiing, theme and water parks.' },
  ];

  return (
    <motion.div
      variants={fade(0.24)}
      className="flex gap-3 w-full h-[360px] md:h-[400px] items-stretch mt-8 lg:mt-0"
    >
      {slats.map((slat) => {
        const isHovered = hoveredSlat === slat.id;
        const isAnyHovered = hoveredSlat !== null;
        const flexVal = isHovered ? '2.4' : isAnyHovered ? '0.7' : '1';

        return (
          <motion.div
            key={slat.id}
            onMouseEnter={() => setHoveredSlat(slat.id)}
            onMouseLeave={() => setHoveredSlat(null)}
            layout
            transition={{ type: 'spring', stiffness: 220, damping: 25 }}
            className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl cursor-pointer flex-grow flex-shrink-0"
            style={{ flex: flexVal }}
          >
            <MediaImage
              src={slat.img}
              alt={slat.title}
              className="full-img"
              style={{
                filter: isHovered
                  ? 'none'
                  : isAnyHovered
                    ? 'grayscale(100%) brightness(0.35)'
                    : 'grayscale(25%) brightness(0.7)',
                transition: 'filter 0.4s ease'
              }}
            />

            {/* Dark glassmorphic gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0e]/95 via-black/30 to-transparent transition-opacity duration-300 pointer-events-none" />

            {/* Glowing top border on hover */}
            <div className={`absolute top-0 inset-x-0 h-[3px] bg-white transition-opacity duration-300 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

            {/* Slat info container */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-1 z-10 pointer-events-none">
              <span className="text-[9px] tracking-widest font-extrabold text-white/50 uppercase">
                {slat.tag}
              </span>
              <h3 className="text-white font-extrabold text-xs md:text-sm tracking-tight leading-none uppercase">
                {slat.title}
              </h3>
              <AnimatePresence>
                {isHovered && (
                  <motion.p
                    initial={{ opacity: 0, height: 0, y: 5 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: 5 }}
                    transition={{ duration: 0.25 }}
                    className="text-[10px] text-white/70 leading-normal mt-1"
                  >
                    {slat.desc}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 1 — HERO
══════════════════════════════════════════════════════ */

/* 1.1 ─ Opening — single cinematic still (instant load, no poster/video swap) */
/* 1.1 ─ Opening — single cinematic still (instant load, no poster/video swap) */
export function S1_1({ onNext }) {
  return (
    <Slide className="relative">
      <div className="overlay-left" />

      <SlideContent>
        <motion.div
          variants={stagger(0.07)}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full max-w-6xl mx-auto"
        >
          {/* Left Column: Elegant typography */}
          <div className="flex flex-col gap-4 min-w-0">
            <motion.span variants={up(0)} className="section-tag w-fit" style={{ color: 'var(--white)' }}>
              East Rutherford, NJ · 10 Minutes from Manhattan
            </motion.span>

            <motion.h1
              variants={up(0.05)}
              className="t-hero hero-title-glow text-gradient-silver mb-0 text-left"
              style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', lineHeight: 1.1 }}
            >
              AMERICAN
              <br />
              DREAM
            </motion.h1>

            <motion.div variants={fade(0.12)} className="divider mb-0" style={{ width: 120 }} />

            <motion.p
              variants={up(0.1)}
              style={{
                fontFamily: 'Inter',
                fontSize: 'clamp(0.78rem, 1vw, 0.9rem)',
                letterSpacing: '.18em',
                textTransform: 'uppercase',
                color: 'var(--theme-color)',
                fontWeight: 600,
                maxWidth: 480,
                lineHeight: 1.5
              }}
            >
              A world-class destination combining Retail, Luxury fashion, World-class Entertainment, and Premier events in one campus.
            </motion.p>

            {/* Horizontal Stats */}
            <motion.div variants={up(0.14)} className="hero-cinematic__stats mt-2 !justify-start flex-wrap gap-2">
              {['3M SQ FT', '450+ BRANDS', '#2 IN USA', '10 MIN TO NYC'].map((p, i) => (
                <span key={p} className="hero-cinematic__stat"
                  style={{ animationDelay: `${i * 0.15}s` }}>
                  {p}
                </span>
              ))}
            </motion.div>

            <motion.div variants={up(0.18)} className="flex gap-4 items-center mt-2 z-10">
              <button onClick={onNext} className="btn btn-outline btn-pill px-6 py-2.5">
                Enter the Deck →
              </button>
            </motion.div>
          </div>

          {/* Right Column: Visual Pillars Slat Layout */}
          <VisualPillarsSlat />
        </motion.div>
      </SlideContent>

      <motion.div variants={fade(0.28)} className="hero-advance-hint" initial="hidden" animate="show">
        <span>Use arrow keys</span>
        <span className="hero-advance-hint__arrow">→</span>
      </motion.div>
    </Slide>
  );
}

/* 1.2 ─ The Story (cinematic reel + compact split, no scroll) */
export function S1_2({ onNext }) {
  return (
    <Slide className="relative">
      <MediaImage src={MEDIA.atrium} alt="American Dream atrium" className="full-img" style={{ opacity: 0.85 }} />
      <div className="overlay-left" />

      <SlideContent>
        <motion.div
          variants={stagger(0.06)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center w-full max-w-6xl mx-auto"
        >
          <motion.div className="flex flex-col gap-3 min-w-0">
            <motion.span variants={up(0)} className="section-tag">
              Why American Dream
            </motion.span>
            <motion.h2 variants={up(0.04)} className="t-headline mb-0" style={{ color: 'var(--white)', lineHeight: 1.25, fontSize: 'clamp(1.1rem, 2vw, 1.55rem)' }}>
              More than a mall — a cultural destination and the tri-state&apos;s most powerful retail platform.
            </motion.h2>
            <motion.div variants={up(0.1)} className="grid grid-cols-3 gap-3">
              {[
                { v: '$5B', l: 'Development' },
                { v: '3M', l: 'Sq Ft' },
                { v: '#2', l: 'In the USA' },
              ].map((s) => (
                <div key={s.l} className="glass rounded-xl p-3 text-center" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}>
                  <span className="t-num text-gradient-silver" style={{ fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', display: 'block' }}>
                    {s.v}
                  </span>
                  <span style={{ fontSize: '.65rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                    {s.l}
                  </span>
                </div>
              ))}
            </motion.div>
            <motion.div variants={up(0.16)} className="flex gap-4 items-center">
              <button onClick={onNext} className="btn btn-outline btn-pill">
                See the Numbers →
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fade(0.2)}
            className="block mt-6 lg:mt-0 w-full"
          >
            <MagneticCard intensity={10} scale={1.03} className="w-full">
              <div className="premium-card premium-card-hover card-glow-silver rounded-2xl overflow-hidden border border-white/10 aspect-4/3 max-h-[min(380px,52vh)] shadow-2xl relative w-full">
                <MediaImage src={MEDIA.atrium} alt="American Dream atrium" className="full-img" />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(0,0,0,.5), transparent 40%)' }} />
              </div>
            </MagneticCard>
          </motion.div>
        </motion.div>
      </SlideContent>
    </Slide>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 2 — SCALE
══════════════════════════════════════════════════════ */

/* 2.1 ─ Reach */
export function S2_1({ isActive, onNext }) {
  const a = useCount(8, 1200, isActive), b = useCount(19, 1400, isActive), c = useCount(36, 1600, isActive);
  return (
    <Slide className="relative">
      {/* Unique image: reach_aerial */}
      <MediaImage src={MEDIA.reach_aerial} alt="American Dream and MetLife Stadium aerial view" className="full-img" />
      <div className="overlay-dark" />

      <SlideContent>
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
            {/* Left */}
            <motion.div variants={stagger(.08)} initial="hidden" animate="show" className="flex flex-col gap-4">
              <motion.span variants={up(0)} className="section-tag" style={{ color: 'var(--white)' }}>Scale & Reach</motion.span>
              <motion.h2 variants={up(.04)} className="t-display text-gradient-blue-cyan mb-0">
                Unmatched Scale.<br />
                <span style={{ color: 'var(--white)' }}>Unbeatable Reach.</span>
              </motion.h2>
              <motion.p variants={up(.08)} className="t-body mb-2" style={{ maxWidth: 400 }}>
                Located 10 miles from Midtown Manhattan — at the epicenter of the most densely populated metro area in North America. Direct transit connections and 0% sales tax on clothes.
              </motion.p>

              <motion.div variants={up(.12)} className="flex flex-col gap-2.5">
                {['Adjacent to MetLife Stadium — NFL, Concerts, World Cup', 'NJ Transit Direct — Midtown Manhattan to Mall Entry', '0% Sales Tax on Clothing & Footwear in New Jersey'].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 bullet-hover-item">
                    <span className="bullet-star" style={{ color: 'var(--white)', marginTop: 2, fontSize: '.9rem' }}>✦</span>
                    <span style={{ fontFamily: 'Inter', fontSize: '.88rem', color: 'var(--white)', lineHeight: 1.4 }}>{item}</span>
                  </div>
                ))}
              </motion.div>

              <motion.button variants={up(.18)} onClick={onNext} className="btn btn-outline btn-pill self-start mt-2">
                Check Demographics →
              </motion.button>
            </motion.div>

            {/* Right — Catchment card */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1, duration: .6 }}
              className="flex items-center justify-center w-full relative">
              <div className="ambient-glow glow-blue -top-10 -right-10 opacity-15" />
              <MagneticCard className="w-full max-w-sm relative z-10" intensity={8} scale={1.02}>
                <div className="premium-card premium-card-hover card-glow-blue border-t-2 border-t-blue w-full flex flex-col gap-4">
                  <span style={{ fontFamily: 'inherit', fontSize: '.82rem', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--white)', borderBottom: '1px solid rgba(255,255,255,.05)', paddingBottom: '.5rem' }}>
                    NYC Metro Drive-Time Catchment
                  </span>
                  {[
                    { l: '30-Minute Drive', n: `${a}.2 Million`, pct: 33, del: .2 },
                    { l: '60-Minute Drive', n: `${b}.4 Million`, pct: 66, del: .4 },
                    { l: '90-Minute Drive', n: `${c}.8 Million`, pct: 100, del: .6 },
                  ].map((row, i) => (
                    <div key={i} className="flex flex-col gap-1.5">
                      <div className="flex justify-between items-baseline">
                        <span style={{ fontFamily: 'Inter', fontSize: '.8rem', fontWeight: 500, letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--muted)' }}>{row.l}</span>
                        <span className="t-num text-gradient-blue-cyan" style={{ fontSize: '1.45rem' }}>{row.n}</span>
                      </div>
                      <div className="bar-track">
                        <motion.div className="bar-fill" initial={{ width: 0 }} animate={isActive ? { width: `${row.pct}%` } : { width: 0 }} transition={{ delay: row.del, duration: 1.0, ease: 'easeOut' }} style={{ background: 'var(--white)' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </MagneticCard>
            </motion.div>
          </div>
        </div>
      </SlideContent>
    </Slide>
  );
}

/* 2.2 ─ The Numbers (full-screen stat wall) */
export function S2_2({ isActive, onNext }) {
  const v1 = useCount(450, 1300, isActive), v2 = useCount(5, 1300, isActive), v3 = useCount(40, 1500, isActive), v4 = useCount(55, 1500, isActive);
  const stats = [
    { n: v1, sx: '+', l: 'Retail & Dining Brands' },
    { n: v2, px: '$', sx: 'B', l: 'Total Development Value' },
    { n: v3, sx: 'M+', l: 'Annual Visitors' },
    { n: v4, sx: '%', l: 'Dedicated to Entertainment' },
  ];
  return (
    <Slide className="relative">
      <MediaImage src={MEDIA.hero_mall_night} alt="" className="full-img" style={{ opacity: 0.12 }} />
      <div className="overlay-dark" style={{ background: 'linear-gradient(180deg,rgba(0,0,0,0.92) 0%,rgba(0,0,0,0.75) 50%,rgba(0,0,0,0.92) 100%)' }} />
      <div className="ambient-glow glow-blue -top-24 -left-24 opacity-10" />

      <SlideContent>
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
            {/* Left — Stats */}
            <div className="flex flex-col gap-4">
              <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }} className="section-tag mb-0" style={{ color: 'var(--white)' }}>
                By the Numbers
              </motion.span>

              <div className="grid grid-cols-2 gap-x-8 gap-y-4 w-full max-w-md">
                {stats.map((s, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .08, duration: .5 }} className="stat-item" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <span className="t-num text-gradient-blue-cyan" style={{ fontSize: 'clamp(1.6rem,4vw,2.8rem)', lineHeight: 1.1 }}>
                      {s.px || ''}{s.n.toLocaleString()}{s.sx}
                    </span>
                    <span style={{ fontFamily: 'Inter', fontSize: '.8rem', fontWeight: 500, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>{s.l}</span>
                  </motion.div>
                ))}
              </div>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: isActive ? .5 : 0 }} transition={{ delay: 1 }} style={{ fontFamily: 'Inter', fontSize: '.88rem', fontStyle: 'italic', color: 'var(--muted)', marginTop: '1rem' }}>
                "These are not projections. This is American Dream today."
              </motion.p>

              <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} onClick={onNext} className="btn btn-outline btn-pill mt-4 self-start">
                Location & Infrastructure →
              </motion.button>
            </div>

            {/* Right — Image: obs_wheel inside glass card */}
            <MagneticCard intensity={6} scale={1.02} className="relative block mt-6 lg:mt-0 overflow-hidden rounded-2xl aspect-4/3 max-h-[420px] border border-white/5 shadow-2xl">
              <MediaImage src={MEDIA.obs_wheel} alt="American Dream observation wheel" className="full-img" />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(270deg,transparent 50%,rgba(0,0,0,.65) 100%)' }} />
            </MagneticCard>
          </div>
        </div>
      </SlideContent>
    </Slide>
  );
}

/* 2.3 ─ Location */
export function S2_3({ onNext }) {
  return (
    <Slide className="relative">
      <MediaImage src={MEDIA.meadowlands_aerial} alt="Meadowlands campus and transit access" className="full-img" />
      <div className="overlay-dark" />
      <div className="ambient-glow glow-blue -bottom-20 -left-20 opacity-15" />

      <SlideContent>
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-center w-full">
            {/* Column 1 — Map & Transit details */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .6 }}
              className="flex flex-col items-center justify-center gap-6 w-full">

              <div className="relative flex items-center justify-center" style={{ width: 160, height: 160 }}>
                <div className="absolute rounded-full border border-[rgba(255,255,255,0.06)]" style={{ width: 160, height: 160 }} />
                <div className="absolute rounded-full border border-[rgba(255,255,255,0.12)]" style={{ width: 110, height: 110 }} />
                <div className="absolute rounded-full border border-[rgba(255,255,255,0.18)]" style={{ width: 60, height: 60 }} />
                {[0, 1].map(i => (
                  <div key={i} className={`absolute rounded-full border pulse-ring`} style={{ width: 20, height: 20, animationDelay: `${i * 1.5}s`, borderColor: 'var(--white)' }} />
                ))}
                <div className="relative z-10 w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
                <span className="absolute" style={{ top: 8, fontFamily: 'inherit', fontSize: '10px', fontWeight: 700, letterSpacing: '.12em', color: 'var(--white)' }}>AMERICAN DREAM</span>
                <span className="absolute right-2 top-1/2" style={{ fontFamily: 'inherit', fontSize: '10px', color: 'var(--white)', letterSpacing: '.08em' }}>NYC →</span>
              </div>

              <div className="flex flex-col gap-3.5 w-full max-w-sm">
                {[
                  { icon: '🏟️', t: 'Adjacent to MetLife Stadium', d: 'NFL Giants/Jets host stadiums · Direct connection' },
                  { icon: '🚆', t: 'NJ Transit Penn Station Direct', d: 'Direct rail link from Midtown Manhattan to the property' },
                  { icon: '🛣️', t: 'Highly Connected Corridor', d: 'Immediate hub access to I-95, Route 3, and Parkway' },
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2 + i * .08 }}
                    className="flex gap-2.5 items-start">
                    <span style={{ fontSize: 14 }}>{item.icon}</span>
                    <div>
                      <p style={{ fontFamily: 'Inter', fontSize: '.9rem', fontWeight: 600, color: 'var(--white)', lineHeight: 1.2 }}>{item.t}</p>
                      <p style={{ fontFamily: 'Inter', fontSize: '.82rem', color: 'var(--muted)', marginTop: 2, lineHeight: 1.35 }}>{item.d}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Column 2 — Location Mosaic */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .15, duration: .6 }}
              className="w-full relative">
              <MediaMosaic
                items={[
                  { src: MEDIA.meadowlands_aerial, caption: 'Meadowlands sports complex', featured: true },
                  { src: MEDIA.parking_gateway, caption: 'Arrival infrastructure' },
                  { src: MEDIA.transit_station, caption: 'Interior concourse' },
                ]}
              />
            </motion.div>

            {/* Column 3 — Leasing Card */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .22, duration: .6 }}
              className="w-full relative z-10">
              <div className="ambient-glow glow-blue -bottom-10 -right-10 opacity-15" />
              <MagneticCard intensity={9} scale={1.025} className="w-full">
                <div className="premium-card premium-card-hover card-glow-blue border-t-2 border-t-blue rounded-2xl p-6 flex flex-col gap-4 w-full">
                  <span className="section-tag" style={{ color: 'var(--white)' }}>Why Location Matters</span>
                  <p className="t-body" style={{ fontSize: '.9rem', lineHeight: 1.5 }}>
                    The wealthiest consumer market in the United States is concentrated within a 90-minute radius. Direct transportation infra ensures constant, friction-free footfall.
                  </p>
                  <div className="divider" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }} />
                  <div>
                    <p style={{ fontFamily: 'Inter', fontSize: '.8rem', fontWeight: 500, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 2 }}>New York City Metro Area</p>
                    <p className="t-num text-gradient-blue-cyan" style={{ fontSize: '1.8rem' }}>20 million people</p>
                  </div>
                  <button onClick={onNext} className="btn btn-outline btn-pill mt-1">Explore Retail Opportunities →</button>
                </div>
              </MagneticCard>
            </motion.div>
          </div>
        </div>
      </SlideContent>
    </Slide>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 3 — RETAIL
══════════════════════════════════════════════════════ */

/* 3.1 ─ The Retail Opportunity */
export function S3_1({ isActive, onNext }) {
  return (
    <Slide className="relative">
      <MediaImage src={MEDIA.retail_corridor} alt="Retail Corridor" className="full-img" />
      <div className="overlay-dark" />
      <div className="ambient-glow glow-blue -bottom-24 -left-24 opacity-15" />

      <SlideContent>
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-4">
          <motion.div variants={stagger(.08)} initial="hidden" animate="show" className="flex flex-col gap-2 w-full text-center items-center">
            <motion.span variants={up(0)} className="section-tag" style={{ color: 'var(--white)' }}>Retail Leasing</motion.span>
            <motion.h2 variants={up(.04)} className="t-display text-gradient-blue-cyan mb-0">YOUR STAGE.</motion.h2>
            <motion.p variants={up(.08)} className="t-body mb-0" style={{ fontSize: '.92rem', maxWidth: 600 }}>
              3 million square feet of world-class retail spaces under one climate-controlled roof. Launch flagship opportunities in the core market of high-earning tri-state consumers.
            </motion.p>
          </motion.div>

          {/* Generous spacing, padding, and gaps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full pb-4">
            {[
              { tag: 'FLAGSHIP', col: 'var(--white)', size: '5,000 – 20,000 SQ FT', desc: 'Premier visual fronts on high-traffic nodes. Build brand legacy.', img: MEDIA.flagship_storefront },
              { tag: 'BOUTIQUE', col: 'var(--white)', size: '1,000 – 5,000 SQ FT', desc: 'Premium space adjoining global brand retailers. Curated placement.', img: MEDIA.mall_interior_1 },
              { tag: 'POP-UP', col: 'var(--white)', size: '500 – 2,000 SQ FT', desc: 'Agile testing, high-impact experiential placement. Flexible terms.', img: MEDIA.popup_kiosk },
            ].map((t, i) => (
              <motion.div key={t.tag} initial={{ opacity: 0, y: 20 }} animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ delay: .15 + i * .08, duration: .5 }}>
                <MagneticCard intensity={10} scale={1.03} className="h-full">
                  <div className="premium-card premium-card-hover card-glow-blue border-t-2 border-t-blue p-6 md:p-7 flex flex-col justify-between h-full overflow-hidden">

                    {/* Card Image Header */}
                    <div style={{ height: 120, position: 'relative', overflow: 'hidden', borderRadius: '12px 12px 0 0', margin: '-24px -24px 16px -24px' }} className="card-image-header">
                      <MediaImage src={t.img} alt={t.tag} className="full-img" />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, rgba(12, 12, 16, 0.95))' }} />
                    </div>

                    <div className="flex flex-col gap-1">
                      <span style={{ fontFamily: 'inherit', fontSize: '.7rem', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: t.col }}>{t.tag}</span>
                      <span className="t-num text-gradient-blue-cyan mb-2" style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: 4 }}>{t.size}</span>
                      <p style={{ fontFamily: 'Inter', fontSize: '.9rem', lineHeight: 1.5, color: 'var(--muted)' }}>{t.desc}</p>
                    </div>
                    <button onClick={onNext} className="btn btn-outline btn-pill-sm self-start" style={
                      {
                        marginTop: '16px',
                      }
                    }>Inquire →</button>
                  </div>
                </MagneticCard>
              </motion.div>
            ))}
          </div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: isActive ? .6 : 0 }} transition={{ delay: .8 }}
            style={{ fontFamily: 'inherit', fontSize: '.72rem', fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--white)', width: '100%' }}>
            Currently 90% Leased · Premium Anchors Available
            <span className="float-right cursor-pointer hover:underline" onClick={onNext}>Next: Key Tenants →</span>
          </motion.p>
        </div>
      </SlideContent>
    </Slide>
  );
}

/* 3.2 ─ Key Tenants */
export function S3_2({ isActive, onNext }) {
  const brands = ['Saks Fifth Avenue', 'H&M', 'Uniqlo', 'Primark', 'Lululemon', 'Sephora', 'Aritzia', 'Zara', 'Apple', 'Toys "R" Us', 'Nike', 'Forever 21'];
  return (
    <Slide className="relative">
      <div className="ambient-glow glow-blue -top-24 -left-24 opacity-10" />

      <SlideContent>
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
            {/* Left — brands list */}
            <div className="flex flex-col gap-4 w-full">
              <motion.div variants={stagger(.08)} initial="hidden" animate="show" className="flex flex-col gap-2">
                <motion.span variants={up(0)} className="section-tag" style={{ color: 'var(--white)' }}>Anchor Tenants</motion.span>
                <motion.h2 variants={up(.04)} className="t-display text-gradient-blue-cyan mb-0">Joined by the<br />World's Best.</motion.h2>
                <motion.p variants={up(.08)} className="t-body mb-0" style={{ maxWidth: 400 }}>
                  American Dream's tenant roster lists the most influential global brands. From luxury standard-setters to high-street apparel flagships.
                </motion.p>
              </motion.div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-1 w-full" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '12px 0' }}>
                {brands.map((b, i) => (
                  <motion.div key={b} initial={{ opacity: 0 }} animate={isActive ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: .1 + i * .03 }}
                    className="brand-list-item flex items-center justify-between py-1.5" style={{ borderBottom: '1px solid rgba(255,255,255,.03)' }}>
                    <span style={{ fontFamily: 'Inter', fontSize: 'clamp(0.92rem,1.2vw,1.05rem)', fontWeight: 500, color: 'rgba(245,245,247,.8)' }}>{b}</span>
                    <span style={{ color: 'var(--white)', opacity: .6, fontSize: '.6rem' }}>✦</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 mt-2">
                <p style={{ fontFamily: 'Inter', fontSize: '.85rem', color: 'var(--muted)' }}>450+ global brands across retail.</p>
                <div className="flex gap-2">
                  <button onClick={onNext} className="btn btn-outline btn-pill">Dining Options →</button>
                  <button className="btn btn-outline btn-pill">Lease Inquiry →</button>
                </div>
              </div>
            </div>

            {/* Right — ImageGallery showing retail corridors */}
            <motion.div initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8 }} className="block mt-6 lg:mt-0 w-full">
              <ImageGallery
                title="Retail Concourse Gallery"
                items={[
                  { src: MEDIA.flagship_storefront, caption: 'Flagship Storefronts' },
                  { src: MEDIA.retail_corridor, caption: 'Premium Retail Corridor' },
                  { src: MEDIA.popup_kiosk, caption: 'High-Traffic Kiosk Nodes' },
                  { src: MEDIA.atrium, caption: 'Grand Center Court Atrium' }
                ]}
              />
            </motion.div>
          </div>
        </div>
      </SlideContent>
    </Slide>
  );
}

/* 3.3 ─ Pop-Up Program */
export function S3_3({ onNext }) {
  return (
    <Slide className="relative">
      {/* Background Image: popup_kiosk */}
      <MediaImage src={MEDIA.popup_kiosk} alt="Luxury retail pop-up booth" className="full-img" />
      <div className="overlay-dark" />
      <div className="ambient-glow glow-blue -top-24 -right-24 opacity-15" />

      <SlideContent>
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
            {/* Left */}
            <motion.div variants={stagger(.08)} initial="hidden" animate="show" className="flex flex-col gap-4">
              <motion.span variants={up(0)} className="section-tag" style={{ color: 'var(--white)' }}>Pop-Up Program</motion.span>
              <motion.h2 variants={up(.04)} className="t-display text-gradient-blue-cyan">Test the Market.<br /><span style={{ color: 'var(--white)' }}>Before You Commit.</span></motion.h2>
              <motion.p variants={up(.08)} className="t-body" style={{ fontSize: '.92rem', maxWidth: 380 }}>
                Launch and scale with minimal risk. Secure premium, high-footfall activations to interface with the East Coast's highest-spending consumer pool on flexible terms.
              </motion.p>
              <motion.button variants={up(.15)} onClick={onNext} className="btn btn-outline btn-pill self-start mt-2">
                Explore Pop-Ups →
              </motion.button>
            </motion.div>

            {/* Right — Generous card padding and spacing with gap-6 */}
            <div className="flex flex-col gap-6 relative pb-4 w-full">
              <div className="ambient-glow glow-blue -bottom-16 -left-16 opacity-10" />
              {[
                { t: 'Flexible Leasing Scales', d: '500 to 2,000 SQ FT. Seasonal & weekend schedules available.' },
                { t: 'High Visibility Fronts', d: 'Immediate exposure in the busiest transit corridors and courtyards.' },
                { t: 'Low Exposure Risk', d: 'Evaluate tri-state consumer interest before committing to long-term leases.' },
              ].map((c, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .15 + i * .08 }} className="relative z-10">
                  <MagneticCard intensity={8} scale={1.02}>
                    <div className="premium-card premium-card-hover card-glow-blue border-t-2 border-t-blue p-5 md:p-6 flex flex-row justify-between items-center gap-4">
                      <div>
                        <p style={{ fontFamily: 'Inter', fontSize: '1.05rem', fontWeight: 700, color: 'var(--white)', marginBottom: 4 }}>{c.t}</p>
                        <p style={{ fontFamily: 'Inter', fontSize: '.9rem', color: 'var(--muted)', lineHeight: 1.45 }}>{c.d}</p>
                      </div>
                      <span style={{ color: 'var(--white)', fontSize: '.95rem', flexShrink: 0, marginTop: 2, fontWeight: 'bold' }}>→</span>
                    </div>
                  </MagneticCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </SlideContent>
    </Slide>
  );
}

/* 3.4 ─ Dining & F&B */
export function S3_4({ onNext }) {
  return (
    <Slide className="relative">
      <MediaImage src={MEDIA.dining_hall} alt="Dining at American Dream" className="full-img" style={{ opacity: 0.35 }} />
      <div className="overlay-dark" />
      <div className="ambient-glow glow-blue -bottom-24 -left-24 opacity-12" />

      <SlideContent>
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
            {/* Left — copy */}
            <motion.div variants={stagger(.08)} initial="hidden" animate="show" className="flex flex-col gap-4 w-full">
              <motion.span variants={up(0)} className="section-tag" style={{ color: 'var(--white)' }}>Dining & F&B Bistro</motion.span>
              <motion.h2 variants={up(.04)} className="t-display text-gradient-blue-cyan mb-0">
                A Culinary<br />
                <span style={{ color: 'var(--white)' }}>Destination.</span>
              </motion.h2>
              <motion.p variants={up(.08)} className="t-body mb-2" style={{ maxWidth: 380 }}>
                From chef-driven concepts to quick eats, American Dream hosts over 100 food & beverage destinations, serving as a huge anchor for tri-state families and gourmands.
              </motion.p>

              <motion.div variants={up(.14)} className="flex flex-col gap-2.5 mb-2" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1rem' }}>
                {[
                  { t: 'Marcus Live! by Chef Marcus Samuelsson', d: 'High-energy dining with custom craft cocktails' },
                  { t: 'Carpaccio Ristorante', d: 'Chic award-winning white-tablecloth Italian on The Avenue' },
                  { t: 'Yard House Flagship', d: '100+ beers on tap with an extensive upscale menu' },
                  { t: 'Coca-Cola Eats Food Hall', d: '800+ seats featuring diverse regional and global concepts' },
                ].map((d, i) => (
                  <div key={i} className="flex gap-2.5 items-start bullet-hover-item">
                    <span className="bullet-star" style={{ color: 'var(--white)', marginTop: 2, fontSize: '.8rem' }}>✦</span>
                    <div>
                      <p style={{ fontFamily: 'Inter', fontSize: '.92rem', fontWeight: 600, color: 'var(--white)' }}>{d.t}</p>
                      <p style={{ fontFamily: 'Inter', fontSize: '.82rem', color: 'var(--muted)' }}>{d.d}</p>
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.button variants={up(.2)} onClick={onNext} className="btn btn-outline btn-pill self-start mt-2">
                Explore Luxury Wing →
              </motion.button>
            </motion.div>

            {/* Right — MediaMosaic showing culinary highlights */}
            <motion.div initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8 }} className="block mt-6 lg:mt-0 w-full">
              <MediaMosaic
                items={[
                  { src: MEDIA.dining, caption: 'Oreo Café Experience', featured: true },
                  { src: MEDIA.dining_hall, caption: 'Lively Dining Hall Concourse' },
                  { src: MEDIA.food_experience, caption: 'Celebrity Food Concepts' }
                ]}
              />
            </motion.div>
          </div>
        </div>
      </SlideContent>
    </Slide>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 4 — LUXURY
══════════════════════════════════════════════════════ */

/* 4.1 ─ The Avenue */
export function S4_1({ isActive, onNext }) {
  return (
    <Slide className="relative">
      <MediaImage src={MEDIA.luxury_avenue} alt="The Avenue" className="full-img" style={{ objectPosition: 'center 30%' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.97) 0%, rgba(0, 0, 0, 0.88) 45%, rgba(0, 0, 0, 0.45) 100%)' }} />
      <div className="ambient-glow glow-silver -bottom-24 -left-24 opacity-10" />

      <SlideContent>
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-col gap-3">
              <span className="section-tag" style={{ color: 'var(--white)' }}>Luxury Wing · The Avenue</span>
              <h2 className="text-gradient-gold" style={{ fontSize: 'clamp(2rem,4.5vw,3.4rem)', fontWeight: 900, letterSpacing: '-0.035em', lineHeight: 1.05 }}>
                THE AVENUE.
              </h2>
              <p className="t-body" style={{ maxWidth: 440 }}>
                A 300,000 sq ft luxury corridor anchored by Saks Fifth Avenue (110,000 sq ft). Designer boutiques, private client services, and Manhattan skyline sight-lines — positioned as the tri-state&apos;s elevated retail address.
              </p>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1rem' }}>
                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                  {LUXURY_TENANTS.map((n, i) => (
                    <motion.div key={n} initial={{ opacity: 0 }} animate={isActive ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: .12 + i * .04 }}>
                      <span className="lux-name" style={{ color: 'rgba(245,245,247,.85)', fontSize: '.82rem' }}>{n}</span>
                    </motion.div>
                  ))}
                </div>
                <p style={{ fontSize: '.72rem', color: 'var(--muted)', marginTop: '12px', lineHeight: 1.45 }}>
                  Representative Avenue portfolio from public opening announcements. Availability varies — contact leasing for current roster.
                </p>
              </div>
              <button onClick={onNext} className="btn btn-gold btn-pill self-start" style={{ background: 'var(--white)', color: 'var(--black)' }}>
                Saks Anchor Story →
              </button>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .7 }} className="flex flex-col gap-4">
              <MediaMosaic
                items={[
                  { src: MEDIA.saks_anchor_entrance, caption: 'Saks Fifth Avenue', featured: true },
                  { src: MEDIA.luxury_avenue, caption: 'The Avenue corridor' },
                  { src: MEDIA.mall_interior_4, caption: 'Luxury interior finishes' },
                ]}
              />
            </motion.div>
          </div>
        </div>
      </SlideContent>
    </Slide>
  );
}

/* 4.2 ─ Saks Anchor */
export function S4_2({ onNext }) {
  return (
    <Slide className="relative">
      <MediaImage src={MEDIA.mall_interior_4} alt="" className="full-img" style={{ opacity: 0.18, objectPosition: 'center 40%' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(0,0,0,.92) 0%,rgba(0,0,0,.7) 45%,rgba(0,0,0,.94) 100%)' }} />
      <div className="ambient-glow glow-silver -bottom-24 -left-24 opacity-10" />

      <SlideContent>
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
            {/* Left */}
            <motion.div variants={stagger(.1)} initial="hidden" animate="show" className="flex flex-col gap-4">
              <motion.span variants={up(0)} className="section-tag" style={{ color: 'var(--white)' }}>The Luxury Anchor</motion.span>
              <motion.div variants={up(.04)}>
                <span className="t-num text-gradient-gold" style={{ fontSize: 'clamp(2.5rem,5.5vw,4.5rem)', display: 'block', lineHeight: 1 }}>110,000</span>
                <span style={{ fontSize: '.85rem', fontWeight: 800, letterSpacing: '.18em', color: 'var(--white)', textTransform: 'uppercase', display: 'block', marginTop: 2 }}>Square Feet</span>
              </motion.div>

              <motion.div variants={fade(.12)} className="divider" style={{ margin: '12px 0', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }} />

              <motion.div variants={stagger(.06, .15)} className="flex flex-col gap-2.5">
                {[
                  'The exclusive crown jewel of The Avenue.',
                  'Features full designer RTW, accessories, and a dedicated luxury bridal space.',
                  'Houses private shopping chambers and dedicated concierge teams.',
                  'Gucci and Louis Vuitton flags integrated inside.',
                ].map((l, i) => (
                  <motion.p key={i} variants={up(0)} className="bullet-hover-item t-body" style={{ fontSize: '.92rem', lineHeight: 1.45, paddingLeft: 0 }}>{l}</motion.p>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — Image and card */}
            <motion.div initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
              className="relative flex mt-6 lg:mt-0 img-card-hover overflow-hidden rounded-2xl aspect-4/3 max-h-[420px] items-center justify-center border border-white/5 shadow-2xl">
              <MediaImage src={MEDIA.saks_anchor_entrance} alt="Saks Fifth Avenue at American Dream" className="full-img" />
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} />

              <MagneticCard intensity={10} scale={1.03} className="relative z-10 w-[90%] max-w-xs">
                <div className="premium-card premium-card-hover card-glow-silver border-t-2 border-t-silver rounded-2xl p-6 flex flex-col gap-4">
                  <span className="section-tag" style={{ color: 'var(--white)', marginBottom: 0 }}>Luxury Leasing</span>
                  <p className="t-body" style={{ fontSize: '.92rem', lineHeight: 1.45, color: 'var(--white)' }}>
                    Bespoke spaces at The Avenue are available for high-end fashion, jewelry, and lifestyle brands seeking to capture a premium demographic.
                  </p>
                  <button className="btn btn-gold btn-pill" style={{ background: 'var(--white)', color: 'var(--black)' }}>Lease Proposal Request →</button>
                  <p style={{ fontSize: '.75rem', textAlign: 'center', color: 'var(--muted)' }}>Direct access to leasing VP within 24 hours.</p>
                  <button onClick={onNext} className="btn btn-outline btn-pill-sm self-center mt-1">Next: Entertainment →</button>
                </div>
              </MagneticCard>
            </motion.div>
          </div>
        </div>
      </SlideContent>
    </Slide>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 5 — ENTERTAINMENT
══════════════════════════════════════════════════════ */

/* 5.1 ─ Statement */
export function S5_1({ onNext }) {
  return (
    <Slide className="relative">
      <MediaImage src={MEDIA.nick_universe} alt="Entertainment" className="full-img" style={{ opacity: 0.85 }} />
      <div className="overlay-dark" />

      <SlideContent center>
        <motion.div
          variants={stagger(0.06)}
          initial="hidden"
          animate="show"
          className="slide-content__inner slide-content__inner--center"
        >
          <motion.span variants={up(0)} className="section-tag mb-0" style={{ color: 'var(--white)' }}>Entertainment Universe</motion.span>
          <motion.h2 variants={up(0.04)} className="t-hero text-center text-gradient-silver" style={{ fontSize: 'clamp(2rem, 5vw, 3.8rem)' }}>
            NOT A MALL.
            <br />
            <span style={{ color: 'var(--white)' }}>A UNIVERSE.</span>
          </motion.h2>
          <motion.p variants={up(0.1)} className="t-body" style={{ maxWidth: 440, textAlign: 'center' }}>
            Over 55% of the property is dedicated to interactive entertainment — indoor skiing, theme parks, and water parks under one roof.
          </motion.p>
          <motion.div variants={up(0.14)} className="hero-cinematic__stats">
            {['35+ RIDES', '4 MAJOR PARKS', '365 DAYS', 'INDOOR ONLY'].map((t, i) => (
              <span key={t} className="hero-cinematic__stat" style={{ animationDelay: `${i * 0.1}s` }}>{t}</span>
            ))}
          </motion.div>
          <motion.div variants={up(0.2)} className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-2 z-10">
            <button onClick={onNext} className="btn btn-outline btn-pill px-6 py-2.5">
              Explore Attractions →
            </button>
          </motion.div>
        </motion.div>
      </SlideContent>
    </Slide>
  );
}

export function S5_2({ isActive, onNext }) {
  const [expanded, setExpanded] = useState(null);
  const cards = [
    { id: 'nick', img: MEDIA.nick_universe, tag: 'Theme Park', title: 'Nickelodeon Universe', sub: 'Western Hemisphere’s largest indoor theme park', quick: '13 acres · 35+ rides · Skyline Scream', border: 'border-theme', detail: 'Spanning 13 fully enclosed acres, Nickelodeon Universe contains custom high-thrill rollercoasters with stunning views of the Manhattan skyline. Full-park brand takeovers and buyouts available.', btn: 'Sponsorship Inquiry →' },
    { id: 'snow', img: MEDIA.big_snow, tag: 'Ski Resort', title: 'Big SNOW', sub: "North America's only year-round indoor ski resort", quick: 'Real snow · 365 days · Tubing park', border: 'border-silver', detail: 'A unique, temperature-controlled environment featuring real snow. Hosts corporate ski days, ski school lessons, and unique snow-slope brand activations regardless of the weather outside.', btn: 'Book Event →' },
    { id: 'water', img: MEDIA.waterpark_2, tag: 'Water Park', title: 'DreamWorks Water Park', sub: 'Largest indoor water park in North America', quick: "8.5 acres · Wave pool · Body slides", border: 'border-blue', detail: 'Maintained at a summer-warm 81°F year-round, this water park features massive wave pools and private luxury cabanas. Perfect for massive after-hours buyouts of up to 3,000 guests.', btn: 'RFP Buyout →' },
    { id: 'more', img: MEDIA.big_snow_exterior, tag: 'Entertainment Hub', title: 'More Attractions', sub: 'LEGOLAND · SEA LIFE · Observation Wheel', quick: 'NHL Ice Rink · Angry Birds Golf · Mirror Maze', border: 'border-purple', detail: 'American Dream includes an array of premium secondary anchors: a 300-foot observation wheel, a full-scale NHL regulation ice rink, and extensive family-friendly gaming centers.', btn: 'All Venues →' },
  ];

  return (
    <Slide className="relative">
      <MediaImage src={MEDIA.waterpark_3} alt="" className="full-img" style={{ opacity: 0.2 }} />
      <div className="overlay-dark" />
      <div className="ambient-glow glow-silver -top-24 -left-24 opacity-10" />

      <SlideContent>
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-4">
          <div className="flex justify-between items-center mb-2">
            <span className="section-tag" style={{ margin: 0, color: 'var(--white)' }}>Attractions & Entertainment</span>
            <button onClick={onNext} className="btn btn-outline btn-pill-sm">Next: Brand Reach →</button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 w-full">
            {cards.map((c, i) => (
              <motion.div
                key={c.id}
                layoutId={`att-${c.id}`}
                initial={{ opacity: 0, y: 18 }}
                animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                transition={{ delay: .06 + i * .07, duration: .5, ease: [.15, 1, .3, 1] }}
                onClick={() => setExpanded(c)}
                className="cursor-pointer group"
              >
                <MagneticCard
                  intensity={10}
                  scale={1.03}
                  glare={true}
                  className="h-full"
                >
                  {/* Card shell */}
                  <div
                    className="relative flex flex-col overflow-hidden rounded-2xl h-full"
                    style={{
                      background: 'rgba(10,10,14,0.95)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      backdropFilter: 'blur(20px)',
                      transition: 'border-color 0.3s ease',
                      minHeight: 280,
                    }}
                  >
                    {/* Hero image — generous height */}
                    <div className="relative overflow-hidden flex-shrink-0" style={{ height: 'clamp(110px, 16vh, 160px)' }}>
                      <MediaImage src={c.img} alt={c.title} className="full-img" style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }} />
                      {/* Darkening gradient */}
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(10,10,14,0.85) 100%)' }} />
                      {/* Tag badge */}
                      <span style={{
                        position: 'absolute', top: 10, left: 12,
                        fontSize: '.6rem', fontWeight: 800, letterSpacing: '.14em',
                        textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)',
                        background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)',
                        padding: '3px 8px', borderRadius: 20,
                        border: '1px solid rgba(255,255,255,0.12)',
                      }}>{c.tag}</span>
                    </div>

                    {/* Content body */}
                    <div className="flex flex-col flex-1 gap-3" style={{ padding: 'clamp(14px, 2vw, 20px)' }}>
                      {/* Title */}
                      <div className="flex flex-col gap-1">
                        <h3 style={{ fontSize: 'clamp(.9rem,1.2vw,1.05rem)', fontWeight: 900, color: 'var(--white)', lineHeight: 1.2, letterSpacing: '-.01em' }}>
                          {c.title}
                        </h3>
                        <p style={{ fontSize: '.75rem', color: 'rgba(245,245,247,.55)', lineHeight: 1.4 }}>
                          {c.sub}
                        </p>
                      </div>

                      {/* Quick-specs chip */}
                      <div style={{
                        fontSize: '.65rem', fontWeight: 700, letterSpacing: '.06em',
                        color: 'rgba(255,255,255,0.5)',
                        borderTop: '1px solid rgba(255,255,255,0.07)',
                        paddingTop: '10px',
                        lineHeight: 1.6,
                      }}>
                        {c.quick}
                      </div>

                      {/* CTA strip */}
                      <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: "10px" }}>
                        <span style={{ fontSize: '.68rem', fontWeight: 800, color: 'var(--white)', letterSpacing: '.08em', textTransform: 'uppercase' }}>
                          View Details
                        </span>
                        <span style={{
                          width: 26, height: 26, borderRadius: '50%',
                          border: '1px solid rgba(255,255,255,0.18)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '.7rem', color: 'var(--white)',
                          transition: 'background 0.2s ease, border-color 0.2s ease',
                        }}
                          className="group-hover:bg-white/10"
                        >→</span>
                      </div>
                    </div>

                    {/* Hover top-glow line */}
                    <div style={{
                      position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                      background: 'rgba(255,255,255,0.7)',
                      opacity: 0, transition: 'opacity 0.3s ease',
                    }} className="group-hover:opacity-100" />
                  </div>
                </MagneticCard>
              </motion.div>
            ))}
          </div>
        </div>
      </SlideContent>

      <DeckModal open={!!expanded} onClose={() => setExpanded(null)} className="deck-modal--attraction">
        {expanded && (
          <motion.div layoutId={`att-${expanded.id}`} transition={{ type: 'spring', damping: 26, stiffness: 180 }} className="deck-modal__panel !p-0">
            <div className="deck-modal__hero">
              <MediaImage src={expanded.img} alt="" className="full-img" />
              <div className="deck-modal__hero-fade" />
              <button type="button" onClick={() => setExpanded(null)} className="deck-modal__close" aria-label="Close">×</button>
            </div>
            <div className="deck-modal__body">
              <div className="deck-modal__header">
                <span className="section-tag deck-modal__label">Attraction Detail</span>
                <h3 className="deck-modal__title">{expanded.title}</h3>
              </div>
              <p className="deck-modal__spec-line">
                Quick Specs: <span>{expanded.quick}</span>
              </p>
              <p className="deck-modal__text">{expanded.detail}</p>
            </div>
            <div className="deck-modal__footer">
              <button type="button" className="btn btn-gold btn-pill" style={{ background: 'var(--white)', color: 'var(--black)' }}>{expanded.btn}</button>
              <button type="button" onClick={() => setExpanded(null)} className="btn btn-outline btn-pill">Close</button>
            </div>
          </motion.div>
        )}
      </DeckModal>
    </Slide>
  );
}

/* 5.3 ─ Audience & partnership reach */
export function S5_3({ onNext }) {
  const [hoveredStat, setHoveredStat] = useState(null);

  const stats = [
    { n: '40M+', l: 'Annual visitor target (campus-wide)', icon: '◎', accent: 'rgba(255,255,255,.12)' },
    { n: '55%', l: '% of footprint dedicated to entertainment', icon: '◈', accent: 'rgba(255,255,255,.10)' },
    { n: '365', l: 'Days / year — weather-proof indoor volume', icon: '◆', accent: 'rgba(255,255,255,.08)' },
  ];

  return (
    <Slide className="relative">
      <MediaImage src={MEDIA.nick_ride} alt="Families at Nickelodeon Universe" className="full-img" style={{ opacity: 0.28 }} />
      <div className="overlay-dark" />
      <div className="ambient-glow glow-silver -bottom-24 -left-24 opacity-10" />

      <SlideContent>
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-4">
          <SplitMedia
            reverse
            visualClassName="img-card-hover demo-visual-hover"
            visualWrapper={
              <MagneticCard
                intensity={10}
                scale={1.03}
                glare={true}
              />
            }
            visual={
              <>
                <MediaImage src={MEDIA.family_fun} alt="Family entertainment" className="full-img" />
                {/* Base gradient — always visible */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg,rgba(0,0,0,.65) 0%,rgba(0,0,0,.15) 60%,transparent 100%)', transition: 'opacity 0.4s ease' }} />
                {/* Hover overlay tint */}
                <div className="demo-visual-hover__tint" />
                {/* Caption badge — slides up on hover */}
                <div className="demo-visual-hover__caption">
                  <span style={{ fontSize: '.65rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '0.2rem', display: 'block' }}>Entertainment</span>
                  <span style={{ fontSize: '.9rem', fontWeight: 700, color: 'var(--white)', lineHeight: 1.25 }}>Family &amp; Tourist Footfall</span>
                  <span style={{ fontSize: '.75rem', color: 'rgba(255,255,255,0.55)', marginTop: '0.2rem', display: 'block' }}>55% of campus dedicated to entertainment</span>
                </div>
                {/* Corner shine badge */}
                <div className="demo-visual-hover__badge">
                  <span style={{ fontSize: '.72rem', fontWeight: 800, letterSpacing: '.06em', color: 'var(--white)' }}>40M+</span>
                  <span style={{ fontSize: '.6rem', color: 'rgba(255,255,255,.6)', marginTop: 1, display: 'block' }}>Visitors / yr</span>
                </div>
              </>
            }
          >
            <motion.span variants={up(0)} initial="hidden" animate="show" className="section-tag" style={{ color: 'var(--white)' }}>Audience & Partnerships</motion.span>
            <motion.h2 variants={up(.04)} initial="hidden" animate="show" className="t-display text-gradient-silver">
              Your customers<br /><span style={{ color: 'var(--white)' }}>are already here.</span>
            </motion.h2>
            <motion.p variants={up(.08)} initial="hidden" animate="show" className="t-body" style={{ fontSize: '.92rem', maxWidth: 400 }}>
              Families, tourists, and luxury shoppers converge on one campus. Sponsorship and activations tap entertainment foot traffic — not just mall walk-through.
            </motion.p>

            {/* Stat cards with hover effects */}
            <div className="flex flex-col gap-2.5">
              {stats.map((s, i) => {
                const isHov = hoveredStat === i;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: .15 + i * .06 }}
                    onMouseEnter={() => setHoveredStat(i)}
                    onMouseLeave={() => setHoveredStat(null)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.875rem',
                      border: `1px solid ${isHov ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.06)'}`,
                      background: isHov
                        ? 'linear-gradient(135deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.04) 100%)'
                        : 'rgba(255,255,255,0.02)',
                      boxShadow: isHov
                        ? '0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.1)'
                        : '0 2px 8px rgba(0,0,0,0.2)',
                      transform: isHov ? 'translateY(-2px) scale(1.01)' : 'translateY(0) scale(1)',
                      transition: 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
                      cursor: 'default',
                      backdropFilter: isHov ? 'blur(12px)' : 'none',
                      WebkitBackdropFilter: isHov ? 'blur(12px)' : 'none',
                    }}
                  >
                    {/* Icon badge */}
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: '0.625rem',
                      background: isHov ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.05rem',
                      color: 'rgba(255,255,255,0.7)',
                      flexShrink: 0,
                      transition: 'all 0.28s ease',
                    }}>
                      {s.icon}
                    </div>

                    {/* Number + label */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem', flex: 1 }}>
                      <span
                        className="t-num text-gradient-silver"
                        style={{
                          fontSize: 'clamp(1.2rem,2.2vw,1.7rem)',
                          lineHeight: 1,
                          transition: 'all 0.28s ease',
                          filter: isHov ? 'brightness(1.15)' : 'brightness(1)',
                        }}
                      >
                        {s.n}
                      </span>
                      <span style={{
                        fontSize: '.75rem',
                        fontWeight: 500,
                        letterSpacing: '.05em',
                        textTransform: 'uppercase',
                        color: isHov ? 'rgba(245,245,247,0.65)' : 'var(--muted)',
                        transition: 'color 0.28s ease',
                        lineHeight: 1.3,
                      }}>
                        {s.l}
                      </span>
                    </div>

                    {/* Hover arrow */}
                    <span style={{
                      fontSize: '.85rem',
                      color: 'rgba(255,255,255,0.4)',
                      opacity: isHov ? 1 : 0,
                      transform: isHov ? 'translateX(0)' : 'translateX(-6px)',
                      transition: 'all 0.25s ease',
                      flexShrink: 0,
                    }}>→</span>
                  </motion.div>
                );
              })}
            </div>

            <motion.button variants={up(.15)} initial="hidden" animate="show" onClick={onNext} className="btn btn-gold btn-pill self-start" style={{ background: 'var(--white)', color: 'var(--black)' }}>
              Event Platform →
            </motion.button>
          </SplitMedia>
        </div>
      </SlideContent>
    </Slide>
  );
}


/* ══════════════════════════════════════════════════════
   SECTION 6 — EVENTS
══════════════════════════════════════════════════════ */

/* 6.1 ─ Platform */
export function S6_1({ onNext }) {
  const evts = ['Concerts & Live Performances', 'Brand Activations & Launches', 'Corporate Galas & Executive Summits', 'Fan Conventions — JonasCon 2025', 'Sports Leagues & Broadcasts', 'Film & Television Productions'];
  return (
    <Slide className="relative">
      <MediaImage src={MEDIA.launch_event} alt="Event Launch" className="full-img" style={{ opacity: 0.25 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(0,0,0,.92) 0%,rgba(0,0,0,.72) 50%,rgba(0,0,0,.92) 100%)' }} />
      <div className="ambient-glow glow-silver -bottom-24 -left-24 opacity-10" />

      <SlideContent>
        <motion.div
          initial="hidden"
          animate="show"
          className="w-full max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
            {/* Left */}
            <motion.div variants={stagger(.1)} className="flex flex-col gap-4">
              <motion.span variants={up(0)} className="section-tag" style={{ color: 'var(--white)' }}>Event Platform</motion.span>
              <motion.h2 variants={up(.04)} className="t-display text-gradient-silver">American Dream<br />is a Platform.</motion.h2>
              <motion.p variants={up(.08)} className="t-body" style={{ fontSize: '.92rem', maxWidth: 380 }}>
                An active stage. We host high-impact fan experiences, national television broadcasts, and major corporate events every week.
              </motion.p>
              <motion.div variants={up(.12)} className="relative pl-5 flex flex-col gap-2 mt-1">
                <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: 'rgba(255,255,255,.08)' }}>
                  <motion.div initial={{ height: 0 }} animate={{ height: '100%' }} transition={{ delay: .4, duration: 1 }} style={{ width: '100%', background: 'var(--white)' }} />
                </div>
                {evts.map((e, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .5 + i * .04 }} className="event-list-item flex items-center gap-2">
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.4)', flexShrink: 0 }} />
                    <span style={{ fontSize: '.85rem', color: 'rgba(245,245,247,.7)', lineHeight: 1.3 }}>{e}</span>
                  </motion.div>
                ))}
              </motion.div>
              <motion.div variants={up(.16)} className="flex gap-4 items-center mt-2 z-10">
                <button onClick={onNext} className="btn btn-outline btn-pill px-6 py-2.5">
                  Sponsorship Tiers →
                </button>
              </motion.div>
            </motion.div>

            {/* Right — rink + activation imagery */}
            <motion.div initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
              className="relative flex flex-col gap-4 w-full mt-6 lg:mt-0">
              <div className="overflow-hidden rounded-2xl aspect-video max-h-[min(200px,28vh)] border border-white/5 shadow-2xl relative">
                <MediaImage src={MEDIA.events_rink} alt="The Rink" className="full-img" />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg,rgba(0,0,0,.55),transparent)' }} />
              </div>
              <MediaMosaic
                items={[
                  { src: MEDIA.launch_event, caption: 'Seasonal activations', featured: true },
                  { src: MEDIA.events_rink, caption: 'The Rink events' },
                ]}
              />
              <MagneticCard intensity={8} scale={1.02} className="w-full">
                <div className="premium-card premium-card-hover card-glow-silver border-t-2 border-t-silver rounded-2xl p-5 flex flex-col gap-3">
                  <span className="t-num text-gradient-silver" style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', lineHeight: 1 }}>40M+</span>
                  <p className="t-body" style={{ fontSize: '.88rem', lineHeight: 1.45 }}>
                    Annual visitors across retail, dining, and entertainment — your brand on a campus built for spectacle.
                  </p>
                </div>
              </MagneticCard>
            </motion.div>
          </div>
        </motion.div>
      </SlideContent>
    </Slide>
  );
}

/* 6.2 ─ Sponsorship Tiers (Fixed Card Padding & Spacing) */
export function S6_2({ onNext }) {
  const tiers = [
    { title: 'Presenting Partner', desc: 'Full property naming integration. Every major physical and digital touchpoint across the campus.', reach: '40M+ annual touchpoints', img: MEDIA.drone_aerial },
    { title: 'Category Exclusive', desc: 'Own your market segment across the entire property. Zero competitor presence or advertising.', reach: 'Exclusive category dominance', img: MEDIA.luxury_avenue },
    { title: 'Activation Partner', desc: 'Interactive physical pop-ups and sampling zones located in premium high-traffic areas.', reach: 'Direct consumer engagement', img: MEDIA.launch_event },
    { title: 'Media Partner', desc: 'Dominance across 120+ digital billboard displays and the custom campus-wide audio grid.', reach: 'Omnichannel media network', img: MEDIA.sponsorship_display },
  ];
  return (
    <Slide className="relative">
      <MediaImage src={MEDIA.sponsorship_display} alt="Sleek billboard atrium display" className="full-img" />
      <div className="overlay-dark" />
      <div className="ambient-glow glow-silver -bottom-24 -left-24 opacity-10" />

      <SlideContent>
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-4">
          <div className="flex justify-between items-center mb-2">
            <div className="flex flex-col">
              <span className="section-tag" style={{ marginBottom: 2, color: 'var(--white)' }}>Partnership Opportunities</span>
              <h2 className="t-headline text-gradient-silver">Sponsorship Tiers</h2>
            </div>
            <button onClick={onNext} className="btn btn-outline btn-pill-sm">Proven Record →</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 w-full relative pb-4">
            {tiers.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .05 + i * .05, duration: .5 }}>
                <MagneticCard intensity={9} scale={1.025} className="h-full">
                  <div className="premium-card premium-card-hover card-glow-silver border-t-2 border-t-silver p-6 md:p-8 flex flex-col justify-between h-full overflow-hidden">

                    {/* Card Image Header */}
                    <div style={{ height: 100, position: 'relative', overflow: 'hidden', borderRadius: '12px 12px 0 0', margin: '-24px -24px 16px -24px' }} className="card-image-header">
                      <MediaImage src={t.img} alt={t.title} className="full-img" />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, rgba(12, 12, 16, 0.95))' }} />
                    </div>

                    <div className="flex flex-col gap-3">
                      <span style={{ fontSize: '.7rem', fontWeight: 800, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--muted)' }}>SPONSORSHIP TIER</span>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--white)', lineHeight: 1.2 }}>{t.title}</h3>
                      <p className="t-body" style={{ fontSize: '.9rem', lineHeight: 1.5, color: 'var(--muted)' }}>{t.desc}</p>
                    </div>
                    <div className="flex items-center justify-between pt-3 mt-3" style={{ flexDirection: "column", alignItems: "start", gap: "10px", marginTop: "10px", paddingTop: "10px", borderTop: '1px solid rgba(255,255,255,.05)' }}>
                      <span style={{ fontSize: '.8rem', fontWeight: 800, color: 'var(--white)' }}>{t.reach}</span>
                      <button onClick={onNext} className="btn btn-outline btn-pill-sm">
                        Discuss →
                      </button>
                    </div>
                  </div>
                </MagneticCard>
              </motion.div>
            ))}
          </div>
        </div>
      </SlideContent>
    </Slide >
  );
}

/* 6.3 ─ Track Record (Fixed Card Padding & Spacing) */
export function S6_3({ isActive, onNext }) {
  return (
    <Slide className="relative">
      <MediaImage src={MEDIA.events_rink} alt="Events at The Rink" className="full-img" />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(0,0,0,.85) 0%,rgba(0,0,0,.4) 40%,rgba(0,0,0,.9) 100%)' }} />
      <div className="ambient-glow glow-silver -bottom-24 -left-24 opacity-10" />

      <SlideContent>
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-4">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-1">
            <span className="section-tag" style={{ color: 'var(--white)' }}>Proven Track Record</span>
            <h2 className="t-display text-gradient-silver" style={{ lineHeight: 1 }}>It Happens Here.</h2>
            <p className="t-body">Real activations. Scale audiences. Certified metrics.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            {[
              { title: 'JonasCon — Fan Convention', body: 'The Jonas Brothers hosted their 20th anniversary convention at American Dream. Live performances at The Rink drew a capacity crowd of thousands.', foot: 'CBS Sports · Live Nation', img: MEDIA.launch_event },
              { title: 'ArenaBowl XXXIII Championship', body: 'The AFL championship final was hosted live at The Rink, broadcast to a national primetime audience on CBS Sports Network.', foot: 'Prime-time cable integration', img: MEDIA.events_rink },
              { title: 'Your Brand Event', body: "This premium activation space is available. Let\u2019s co-create a landmark cultural moment for your brand.", foot: null, cta: 'Discuss Booking \u2192', img: MEDIA.sponsorship_display },
            ].map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ delay: .15 + i * .08 }}>
                <MagneticCard intensity={10} scale={1.03} className="h-full">
                  <div className="premium-card premium-card-hover card-glow-silver border-t-2 border-t-silver p-6 md:p-8 flex flex-col justify-between h-full overflow-hidden" style={{ minHeight: 180 }}>

                    {/* Card Image Header */}
                    <div style={{ height: 100, position: 'relative', overflow: 'hidden', borderRadius: '12px 12px 0 0', margin: '-24px -24px 16px -24px' }} className="card-image-header">
                      <MediaImage src={c.img} alt={c.title} className="full-img" />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, rgba(12, 12, 16, 0.95))' }} />
                    </div>

                    <div className="flex flex-col gap-2">
                      <span style={{ fontSize: '.7rem', fontWeight: 800, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--muted)' }}>CASE STUDY</span>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--white)', lineHeight: 1.2, marginTop: '4px' }}>{c.title}</h3>
                      <p style={{ fontSize: '.9rem', lineHeight: 1.5, color: c.cta ? 'var(--white)' : 'var(--muted)', marginTop: '4px' }}>{c.body}</p>
                    </div>
                    {c.cta ? <button onClick={onNext} className="btn btn-gold btn-pill-sm self-start mt-4" style={{ background: 'var(--white)', color: 'var(--black)' }}>{c.cta}</button>
                      : <p style={{ fontSize: '.8rem', color: 'rgba(245,245,247,.3)', lineHeight: 1.3, marginTop: '.5rem', borderTop: '1px solid rgba(255,255,255,.04)', paddingTop: '.5rem' }}>{c.foot}</p>}
                  </div>
                </MagneticCard>
              </motion.div>
            ))}
          </div>
        </div>
      </SlideContent>
    </Slide>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 7 — VENUES
══════════════════════════════════════════════════════ */

/* 7.1 ─ Venues */
export function S7_1({ isActive, onNext }) {
  const [exp, setExp] = useState(null);
  const venues = [
    { id: 'rink', img: MEDIA.events_rink, border: 'border-theme', tag: 'NHL-Regulation Ice Surface', title: 'The Rink', desc: 'Full scale rink hosting up to 1,200 standing guests.', sub: 'ArenaBowl XXXIII (2024) · JonasCon', specs: [{ k: 'Surface Area', v: '200 × 85 ft' }, { k: 'Standing Capacity', v: '1,200' }, { k: 'Seated Setup', v: '800' }, { k: 'Configurations', v: 'Concerts · Sports · Galas' }, { k: 'Availability', v: 'Full Buyouts' }], detail: 'A premium ice surface designed for sports, concert stages, and buyouts. Fully customizable rigging and lighting systems available.', btn: 'Rink RFP Request →' },
    { id: 'water', img: MEDIA.waterpark, border: 'border-blue', tag: '8.5-Acre Indoor Water Destination', title: 'DreamWorks Water Park', desc: 'Tropical climate-controlled buyout for up to 3,000.', sub: '81°F Constant · Private After-Hours', specs: [{ k: 'Total Footprint', v: '8.5 Acres' }, { k: 'Constant Temp', v: '81°F Climate-Control' }, { k: 'Main Attraction', v: "World's Tallest Body Slide" }, { k: 'Group Capacity', v: '3,000 guests' }, { k: 'Activation Type', v: 'Exclusive buyout' }], detail: 'North America’s largest indoor water facility. Complete layout buyouts, custom branding options, and full catering options available.', btn: 'Water Park RFP →' },
    { id: 'nick', img: MEDIA.nick_universe, border: 'border-purple', tag: '13-Acre Indoor Amusement Park', title: 'Nickelodeon Universe', desc: 'Exclusive theme park buyouts for 5,000+ guests.', sub: '35+ Rides operating · Catering option', specs: [{ k: 'Total Area', v: '13 Acres enclosed' }, { k: 'Attractions', v: '35+ theme park rides' }, { k: 'Max Occupancy', v: '5,000+ attendees' }, { k: 'F&B Packages', v: 'Custom full-catering' }, { k: 'Rental Hours', v: 'After-hours buyouts' }], detail: 'Book the entirety of Nickelodeon Universe for an unforgettable corporate gala. Features custom lighting setups and coaster-specific brand wraps.', btn: 'Theme Park RFP →' },
  ];

  return (
    <Slide className="relative">
      <MediaImage src={MEDIA.transit_station} alt="" className="full-img" style={{ opacity: 0.25 }} />
      <div className="overlay-dark" />
      <div className="ambient-glow glow-silver -bottom-24 -left-24 opacity-10" />

      <SlideContent>
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-3 md:gap-5 min-h-0">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-3 shrink-0">
            <div className="flex flex-col gap-1 min-w-0">
              <span className="section-tag" style={{ marginBottom: 0, color: 'var(--white)' }}>Venue Booking</span>
              <h2 className="t-headline text-gradient-silver mb-0" style={{ fontSize: 'clamp(1.35rem, 3.5vw, 2.2rem)', lineHeight: 1.15 }}>
                World-Class Venues.<br /><span style={{ color: 'var(--white)' }}>One Destination.</span>
              </h2>
            </div>
            <button onClick={onNext} className="btn btn-outline btn-pill-sm self-start sm:self-auto shrink-0">Connect Team →</button>
          </div>

          <div className="venue-grid">
            <AnimatePresence>
              {venues.map((v, i) => (
                <motion.article
                  key={v.id}
                  layoutId={`v-${v.id}`}
                  initial={{ opacity: 0, scale: .96 }} animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: .96 }} transition={{ delay: .05 + i * .05 }}
                  onClick={() => setExp(v)}
                  className="venue-card premium-card-hover card-glow-silver"
                >
                  <div className="venue-card__media">
                    <MediaImage src={v.img} alt={v.title} className="full-img" />
                    <div />
                  </div>
                  <div className="venue-card__body">
                    <span className="venue-card__tag">{v.tag}</span>
                    <h3 className="venue-card__title">{v.title}</h3>
                    <p className="venue-card__desc">{v.desc}</p>
                    <span className="venue-card__cta">VIEW SPECS →</span>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </SlideContent>

      <DeckModal open={!!exp} onClose={() => setExp(null)} className="deck-modal--venue">
        {exp && (
          <motion.div layoutId={`v-${exp.id}`} transition={{ type: 'spring', damping: 26, stiffness: 180 }} className="deck-modal__panel !p-0">
            <div className="deck-modal__hero">
              <MediaImage src={exp.img} alt="" className="full-img" />
              <div className="deck-modal__hero-fade" />
              <button type="button" onClick={() => setExp(null)} className="deck-modal__close" aria-label="Close">×</button>
            </div>
            <div className="deck-modal__body">
              <div className="deck-modal__header">
                <span className="section-tag deck-modal__label">Venue Spec Sheet</span>
                <h3 className="deck-modal__title">{exp.title}</h3>
                <p className="deck-modal__sub">{exp.sub}</p>
              </div>
              <div className="deck-modal__grid">
                <div>
                  <p className="deck-modal__details-label">Details</p>
                  <p className="deck-modal__text">{exp.detail}</p>
                </div>
                <div className="venue-spec-table glass">
                  <p className="venue-spec-table__title">Specifications</p>
                  <table className="venue-spec-table__grid">
                    <tbody>
                      {exp.specs.map((s, si) => (
                        <tr key={si}>
                          <th scope="row">{s.k}</th>
                          <td>{s.v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="deck-modal__footer">
              <button type="button" className="btn btn-gold btn-pill" style={{ background: 'var(--white)', color: 'var(--black)' }}>{exp.btn}</button>
              <button type="button" onClick={() => setExp(null)} className="btn btn-outline btn-pill">Close</button>
            </div>
          </motion.div>
        )}
      </DeckModal>
    </Slide>
  );
}

/* 7.2 ─ Close / Contact */
export function S7_2({ isActive }) {
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: '', company: '', email: '', interest: 'Retail Leasing', message: '' });

  return (
    <Slide className="relative justify-center">
      <MediaImage src={MEDIA.hero_mall_night} alt="" className="full-img" style={{ opacity: .45 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.78)' }} />
      <div className="ambient-glow glow-silver -bottom-24 -left-24 opacity-10" />

      <SlideContent center>
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-4">
          {/* Grand headline */}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }} className="flex flex-col items-center text-center gap-2">
            <span className="section-tag" style={{ color: 'var(--white)' }}>Begin the Conversation</span>
            <h2 style={{ fontSize: 'clamp(1.8rem,4vw,3.2rem)', fontWeight: 900, lineHeight: 1.1, color: 'var(--white)', letterSpacing: '-0.03em' }}>
              Your Brand
            </h2>
            <h2 className="text-gradient-silver" style={{ fontSize: 'clamp(1.8rem,4vw,3.2rem)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em' }}>
              Belongs Here.
            </h2>
          </motion.div>

          {/* Contact Form inside a premium-card */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: isActive ? 1 : 0, y: 0 }} transition={{ delay: .2 }} className="w-full max-w-md relative">
            <AnimatePresence mode="wait">
              {!done ? (
                <motion.form key="form" exit={{ opacity: 0, y: -10 }} onSubmit={e => { e.preventDefault(); setDone(true); }}
                  className="premium-card premium-card-hover card-glow-silver border-t-2 border-t-silver rounded-xl p-5 md:p-6 flex flex-col gap-3 relative z-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input required placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="inp" />
                    <input required placeholder="Company" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} className="inp" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input required type="email" placeholder="Business Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="inp" />
                    <select value={form.interest} onChange={e => setForm({ ...form, interest: e.target.value })} className="inp" style={{ background: '#08080c', cursor: 'pointer' }}>
                      {['Retail Leasing', 'Luxury Leasing', 'Pop-Up', 'Sponsorship', 'Events', 'General'].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <textarea required rows={2} placeholder="Tell us about your project" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="inp" style={{ resize: 'none' }} />
                  <button type="submit" className="btn btn-gold btn-pill mt-1" style={{ padding: '10px 24px', background: 'var(--white)', color: 'var(--black)' }}>Send Inquiry →</button>
                </motion.form>
              ) : (
                <motion.div key="ok" initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }}
                  className="premium-card premium-card-hover card-glow-silver border-t-2 border-t-silver rounded-xl p-8 flex flex-col items-center gap-4 text-center relative z-10">
                  <svg width="48" height="48" viewBox="0 0 60 60">
                    <motion.circle cx="30" cy="30" r="26" fill="none" stroke="#ffffff" strokeWidth="2" initial={{ strokeDasharray: 163, strokeDashoffset: 163 }} animate={{ strokeDashoffset: 0 }} transition={{ duration: .7 }} />
                    <motion.path d="M18 32 L26 40 L42 22" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" initial={{ strokeDasharray: 48, strokeDashoffset: 48 }} animate={{ strokeDashoffset: 0 }} transition={{ delay: .4, duration: .4 }} />
                  </svg>
                  <div>
                    <p style={{ fontSize: '.95rem', fontWeight: 800, color: 'var(--white)', marginBottom: 4 }}>Inquiry Sent</p>
                    <p style={{ fontSize: '.78rem', color: 'var(--muted)' }}>Our leasing and activation teams will follow up within 24 hours.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <p style={{ fontSize: '.82rem', color: 'rgba(245,245,247,.25)', textAlign: 'center' }}>
            American Dream · 1 American Dream Way, East Rutherford, NJ 07073 · americandream.com
          </p>
        </div>
      </SlideContent>
    </Slide>
  );
}
