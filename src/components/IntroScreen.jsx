import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VIDEO_URLS } from '../config/videoUrls';

// Ken Burns effect variations - each frame gets a unique zoom/pan direction
const KEN_BURNS_VARIANTS = [
  { scaleStart: 1, scaleEnd: 1.15, xStart: 0, xEnd: 20, yStart: 0, yEnd: -15, easing: [0.25, 0.46, 0.45, 0.94] },
  { scaleStart: 1, scaleEnd: 1.12, xStart: 0, xEnd: -20, yStart: 0, yEnd: 15, easing: [0.17, 0.67, 0.83, 0.67] },
  { scaleStart: 1, scaleEnd: 1.18, xStart: 0, xEnd: 15, yStart: 0, yEnd: 10, easing: [0.34, 1.56, 0.64, 1] },
  { scaleStart: 1, scaleEnd: 1.14, xStart: 0, xEnd: -15, yStart: 0, yEnd: -20, easing: [0.33, 0, 0.67, 1] },
  { scaleStart: 1, scaleEnd: 1.16, xStart: 0, xEnd: 25, yStart: 0, yEnd: 5, easing: [0.43, 0.13, 0.23, 0.96] },
  { scaleStart: 1, scaleEnd: 1.13, xStart: 0, xEnd: -10, yStart: 0, yEnd: 25, easing: [0.55, 0.055, 0.675, 0.19] },
];

const MONTAGE_FRAMES = [
  { type: 'image', url: '/hero_mall_night.png', duration: 250, kennBurnsIdx: 0, text: 'LUXURY' },
  { type: 'image', url: '/reach_aerial.png', duration: 250, kennBurnsIdx: 1, text: 'AVENUE' },
  { type: 'image', url: '/atrium.png', duration: 250, kennBurnsIdx: 2, text: 'COUTURE' },
  { type: 'image', url: '/big_snow.png', duration: 250, kennBurnsIdx: 3, text: 'PRESTIGE' },
  { type: 'image', url: '/dining.png', duration: 250, kennBurnsIdx: 4, text: 'CULTURE' },
  { type: 'image', url: '/luxury_avenue.png', duration: 250, kennBurnsIdx: 5, text: 'ENERGY' },
  { type: 'video', url: VIDEO_URLS.montage1, duration: 800, text: 'SCALE' },
  { type: 'image', url: '/saks_anchor_entrance.png', duration: 250, kennBurnsIdx: 0, text: 'EXCLUSIVE' },
  { type: 'image', url: '/waterpark.png', duration: 250, kennBurnsIdx: 1, text: 'ENTERTAIN' },
  { type: 'image', url: '/nick_universe.png', duration: 250, kennBurnsIdx: 2, text: 'EXPERIENCE' },
  { type: 'image', url: '/events_rink.png', duration: 250, kennBurnsIdx: 3, text: 'STADIUM' },
  { type: 'image', url: '/obs_wheel.png', duration: 250, kennBurnsIdx: 4, text: 'INNOVATION' },
  { type: 'image', url: '/flagship_storefront.png', duration: 250, kennBurnsIdx: 5, text: 'PARTNER' },
  { type: 'video', url: VIDEO_URLS.montage2, duration: 800, text: 'AMERICAN DREAM' },
];

const HOTSPOTS = [
  { id: 'saks', label: 'THE AVENUE', title: 'Saks Fifth Avenue', desc: '110,000 SQ FT anchor for global fashion brands.', top: '38%', left: '72%', start: 1.0, end: 3.5 },
  { id: 'waterpark', label: 'ENTERTAINMENT', title: 'DreamWorks Water Park', desc: 'North America\'s largest indoor water park, open year-round.', top: '48%', left: '28%', start: 3.8, end: 6.2 },
  { id: 'parks', label: 'THEME PARK', title: 'Nickelodeon Theme Park', desc: '13 Acres of world-class rides and commercial activations.', top: '58%', left: '76%', start: 6.5, end: 9.0 }
];

export function IntroScreen({ onComplete }) {
  const [phase, setPhase] = useState('montage'); // 'montage', 'main', or 'outro'
  const [frameIdx, setFrameIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showSkipHint, setShowSkipHint] = useState(true);
  const [mainVideoLoaded, setMainVideoLoaded] = useState(false);
  const [videoTime, setVideoTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(10);

  const mainVideoRef = useRef(null);
  const outroVideoRef = useRef(null);
  const frameVideoRef1 = useRef(null);
  const frameVideoRef2 = useRef(null);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (phase === 'main' || phase === 'outro') {
        if (e.key === ' ') {
          e.preventDefault();
          const activeVideo = phase === 'main' ? mainVideoRef.current : outroVideoRef.current;
          if (activeVideo) {
            if (isPlaying) {
              activeVideo.pause();
              setIsPlaying(false);
            } else {
              activeVideo.play().catch(() => { });
              setIsPlaying(true);
            }
          }
        }
      }
      // Skip actions
      if (e.key === 'Enter' || e.key === 'Escape' || e.key === 'ArrowRight') {
        e.preventDefault();
        onComplete();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, isPlaying, onComplete]);

  // Montage sequencing timer
  useEffect(() => {
    if (phase !== 'montage') return;

    // Start playing video frames slightly in advance so cuts are instant
    if (frameIdx === 5 && frameVideoRef1.current) {
      frameVideoRef1.current.play().catch(() => { });
    }
    if (frameIdx === 12 && frameVideoRef2.current) {
      frameVideoRef2.current.play().catch(() => { });
    }
    
    // Warm-up and pre-play main video at frame 10 (hidden under montage) so it's fully running when montage ends
    if (frameIdx === 10 && mainVideoRef.current) {
      mainVideoRef.current.play().catch(() => { });
    }

    const currentFrame = MONTAGE_FRAMES[frameIdx];
    const timer = setTimeout(() => {
      if (frameIdx < MONTAGE_FRAMES.length - 1) {
        setFrameIdx((prev) => prev + 1);
      } else {
        setPhase('main');
        setIsPlaying(true);
      }
    }, currentFrame.duration);

    return () => clearTimeout(timer);
  }, [frameIdx, phase]);

  // Play active video when phase changes (fallback check)
  useEffect(() => {
    if (phase === 'main' && mainVideoRef.current) {
      mainVideoRef.current.play().catch(() => { });
    }
    if (phase === 'outro' && outroVideoRef.current) {
      outroVideoRef.current.play().catch(() => { });
    }
  }, [phase]);

  // Hide keyboard hint after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkipHint(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const currentFrame = MONTAGE_FRAMES[frameIdx];
  
  // Detect reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Get Ken Burns animation for current frame (if image)
  const kbVariant = currentFrame.type === 'image' && currentFrame.kennBurnsIdx !== undefined
    ? KEN_BURNS_VARIANTS[currentFrame.kennBurnsIdx]
    : null;

  // Generate a fake cinematic frame code
  const pad = (n) => String(n).padStart(2, '0');
  const getCinematicTimecode = () => {
    const frame = frameIdx * 4 + Math.floor(Math.random() * 4);
    return `00:00:${pad(Math.floor(frameIdx / 3))}:${pad(frame % 24)}`;
  };

  const getMainVideoCaption = () => {
    if (videoTime < 2.5) return { tag: "LOCATION", title: "10 MINUTES FROM MANHATTAN", desc: "Epicenter of the NYC metro region connected directly by transit rail." };
    if (videoTime < 5.5) return { tag: "SCALE", title: "3,000,000 SQ FT CAMPUS", desc: "Combining 450+ retail flagships and 5 massive entertainment anchors." };
    if (videoTime < 8.0) return { tag: "CATCHMENT", title: "40,000,000+ ANNUAL VISITS", desc: "Capturing the highest-spending demographic catchment in North America." };
    return { tag: "WELCOME", title: "ENTER THE PREVIEW DECK", desc: "Explore retail leasing, corporate sponsorships, and venue RFPs." };
  };
  const caption = getMainVideoCaption();

  return (
    <div className="intro-screen">
      {/* Background Cache & Preloader for videos and images to eliminate decoding lag */}
      <div style={{ position: 'absolute', width: 0, height: 0, opacity: 0, overflow: 'hidden' }}>
        <video ref={frameVideoRef1} src={VIDEO_URLS.montage1} muted loop playsInline preload="auto" />
        <video ref={frameVideoRef2} src={VIDEO_URLS.montage2} muted loop playsInline preload="auto" />
        {MONTAGE_FRAMES.filter(f => f.type === 'image').map(f => (
          <img key={f.url} src={f.url} alt="" />
        ))}
      </div>

      {/* Visual Skip Intro Button */}
      <button
        type="button"
        className="intro-skip-btn"
        onClick={onComplete}
        aria-label="Skip Intro"
      >
        <span>Skip Intro</span>
        <span className="intro-skip-btn__arrow">→</span>
      </button>

      {/* LAYER 1: Montage Player */}
      <div
        className="intro-montage-frame"
        style={{
          opacity: phase === 'montage' ? 1 : 0,
          pointerEvents: phase === 'montage' ? 'auto' : 'none',
          transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          zIndex: 10
        }}
      >
        {/* Viewfinder Grid Crop & Info Overlay */}
        <div className="intro-viewfinder">
          <div className="viewfinder-corner viewfinder-corner-tl" />
          <div className="viewfinder-corner viewfinder-corner-tr" />
          <div className="viewfinder-corner viewfinder-corner-bl" />
          <div className="viewfinder-corner viewfinder-corner-br" />
          <div className="viewfinder-crosshair" />
          
          <div className="viewfinder-metadata viewfinder-meta-tl">RAW_PRVW_1080P</div>
          <div className="viewfinder-metadata viewfinder-meta-tr flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <span>REC {getCinematicTimecode()}</span>
          </div>
          <div className="viewfinder-metadata viewfinder-meta-bl">FRAME_{frameIdx + 1}/14</div>
          <div className="viewfinder-metadata viewfinder-meta-br">
            <div className="soundwave-indicator">
              {[...Array(6)].map((_, i) => (
                <div 
                  key={i} 
                  className="soundwave-bar" 
                  style={{ 
                    animationDelay: `${i * 0.12}s`,
                    height: `${8 + Math.floor(Math.random() * 16)}px`
                  }} 
                />
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Typography Flash Text */}
        <div className="cinematic-flash-text">
          <AnimatePresence mode="popLayout">
            {phase === 'montage' && (
              <motion.div
                key={`word-container-${frameIdx}`}
                className="relative py-5 px-16 flex flex-col items-center justify-center"
              >
                {/* Elegant top line wipe */}
                <motion.div 
                  className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  exit={{ scaleX: 0 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                />
                
                 {/* Expanding letter-spacing text container */}
                 <motion.div
                   className="cinematic-flash-word"
                   initial={{ letterSpacing: '0.15em', opacity: 0, scale: 0.9 }}
                   animate={{ letterSpacing: '0.3em', opacity: 1, scale: 1 }}
                   exit={{ letterSpacing: '0.45em', opacity: 0, scale: 1.05, filter: 'blur(6px)' }}
                   transition={{ duration: 0.18, ease: 'easeOut' }}
                 >
                   {currentFrame.text}
                 </motion.div>

                {/* Elegant bottom line wipe */}
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  exit={{ scaleX: 0 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* White flash overlay that re-mounts on every frame change to trigger flash cut */}
        <AnimatePresence mode="popLayout">
          {phase === 'montage' && (
            <motion.div
              key={`flash-${frameIdx}`}
              className="intro-flash-overlay"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>

        {currentFrame.type === 'image' ? (
          <motion.div
            className="intro-media-container"
            initial={{ scale: kbVariant?.scaleStart || 1, x: kbVariant?.xStart || 0, y: kbVariant?.yStart || 0 }}
            animate={{
              scale: kbVariant?.scaleEnd || 1,
              x: kbVariant?.xEnd || 0,
              y: kbVariant?.yEnd || 0,
            }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: Math.max(currentFrame.duration / 1000, 0.18), ease: kbVariant?.easing || [0.25,0.46,0.45,0.94] }}
          >
            <img
              key={currentFrame.url}
              src={currentFrame.url}
              alt=""
              className="intro-media"
            />
          </motion.div>
        ) : (
          <video
            key={currentFrame.url}
            src={currentFrame.url}
            autoPlay
            loop
            muted
            playsInline
            className="intro-media"
            style={{ objectFit: 'cover' }}
          />
        )}
      </div>

      {/* LAYER 2: Main Video Player (always mounted to prevent layout jumps/loading flags) */}
      <div
        className="intro-main-video"
        style={{
          opacity: phase === 'main' ? 1 : 0,
          pointerEvents: phase === 'main' ? 'auto' : 'none',
          transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          zIndex: 8
        }}
      >
        <video
          ref={mainVideoRef}
          src={VIDEO_URLS.mainIntro}
          muted
          playsInline
          className="intro-media"
          style={{ objectFit: 'cover' }}
          onPlaying={() => setMainVideoLoaded(true)}
          onCanPlay={() => setMainVideoLoaded(true)}
          onTimeUpdate={(e) => {
            const v = e.target;
            setVideoTime(v.currentTime);
            if (v.duration) setVideoDuration(v.duration);
            // Warm-up outro video 1.2 seconds before the main video concludes
            if (v.duration && v.currentTime > v.duration - 1.2 && outroVideoRef.current) {
              outroVideoRef.current.play().catch(() => {});
            }
          }}
          onEnded={() => {
            setPhase('outro');
            setIsPlaying(true);
          }}
        />

        {/* Cinematic HUD Overlay during Main Video */}
        {phase === 'main' && (
          <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-6 md:p-10 font-inter">
            {/* Top HUD Row */}
            <div className="flex justify-between items-center w-full text-[10px] tracking-widest text-white/50 font-bold border-b border-white/10 pb-4">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span>ONLINE PRESENTATION MODE</span>
              </span>
              <span>METROPOLITAN NYC REGION</span>
              <span>00:{pad(Math.floor(videoTime))}:{pad(Math.floor((videoTime % 1) * 30))}</span>
            </div>

            {/* B2B Insight Overlay Card */}
            <div className="flex flex-col gap-3.5 w-full max-w-sm md:max-w-md bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-5 mb-14 self-start pointer-events-auto shadow-2xl transition-all duration-300">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-extrabold tracking-widest text-[#c9a96e] bg-[#c9a96e]/10 border border-[#c9a96e]/20 px-2 py-0.5 rounded uppercase">
                  {caption.tag}
                </span>
                <span className="text-[9px] text-white/40 font-mono">
                  {Math.floor((videoTime / videoDuration) * 100)}% COMPLETE
                </span>
              </div>
              
              <div className="flex flex-col gap-1">
                <h3 className="font-playfair text-base font-bold text-white tracking-wide uppercase">
                  {caption.title}
                </h3>
                <p className="text-[11px] text-white/60 leading-relaxed">
                  {caption.desc}
                </p>
              </div>

              {/* Progress timeline bar */}
              <div className="w-full h-1 bg-white/15 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white transition-all duration-100 ease-linear" 
                  style={{ width: `${(videoTime / videoDuration) * 100}%` }} 
                />
              </div>
            </div>
          </div>
        )}

        {/* Interactive Hotspots during main video */}
        {phase === 'main' && HOTSPOTS.map((spot) => {
          const isVisible = videoTime >= spot.start && videoTime <= spot.end;
          return (
            <div
              key={spot.id}
              className="video-hotspot"
              style={{
                top: spot.top,
                left: spot.left,
                opacity: isVisible ? 1 : 0,
                pointerEvents: isVisible ? 'auto' : 'none',
                transform: `translate(-50%, -50%) scale(${isVisible ? 1 : 0.7})`,
              }}
            >
              <div className="hotspot-pulse" />
              <div className="hotspot-tooltip">
                <span className="hotspot-tooltip__tag">{spot.label}</span>
                <h4 className="hotspot-tooltip__title">{spot.title}</h4>
                <p className="hotspot-tooltip__desc">{spot.desc}</p>
              </div>
            </div>
          );
        })}

        {/* Play/Pause state clean indicator overlay */}
        <AnimatePresence>
          {phase === 'main' && !isPlaying && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="intro-pause-indicator"
            >
              <span className="intro-pause-icon">Ⅱ</span>
              <span>PAUSED</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* LAYER 3: Outro Video Player (always mounted to prevent unmount lag) */}
      <div
        className="intro-main-video"
        style={{
          opacity: phase === 'outro' ? 1 : 0,
          pointerEvents: phase === 'outro' ? 'auto' : 'none',
          transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          zIndex: 6
        }}
      >
        <video
          ref={outroVideoRef}
          src={VIDEO_URLS.montage2}
          muted
          playsInline
          className="intro-media"
          style={{ objectFit: 'cover' }}
          onEnded={onComplete}
        />

        {/* Play/Pause state clean indicator overlay */}
        <AnimatePresence>
          {phase === 'outro' && !isPlaying && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="intro-pause-indicator"
            >
              <span className="intro-pause-icon">Ⅱ</span>
              <span>PAUSED</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Skip Hint */}
      <AnimatePresence>
        {showSkipHint && (
          <motion.div
            className="intro-skip-hint"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <span className="intro-skip-hint__text">Press <kbd className="intro-kbd">ENTER</kbd> or <kbd className="intro-kbd">ESC</kbd> to skip tour</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default IntroScreen;
