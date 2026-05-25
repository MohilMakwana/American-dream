import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCountUp } from './useCountUp';
import { LeasingCalculator, SponsorshipEstimator, VenueRFPBuilder } from './InteractiveHub';

// --- 1. HERO PAGE ---
export function HeroPage({ onExplore }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative px-6 text-center select-none pt-24 pb-16">
      <div className="max-w-5xl flex flex-col items-center justify-center relative z-10">
        
        {/* Glow ambient lights */}
        <div className="ambient-glow-gold -top-20 -left-20" />
        <div className="ambient-glow-blue -bottom-20 -right-20" />

        {/* Small gold indicator */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-space text-xs md:text-sm font-bold tracking-[0.3em] text-brand-gold uppercase mb-6"
        >
          GLOBAL B2B OPPORTUNITY PLATFORM
        </motion.div>

        {/* Grand Title */}
        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-playfair text-5xl sm:text-7xl md:text-[90px] font-bold text-white tracking-[0.12em] leading-none mb-6 text-gold-gradient"
        >
          AMERICAN DREAM
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 'min(350px, 80vw)' }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="h-[1px] bg-brand-gold/40 mb-8"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="font-inter text-sm md:text-lg text-brand-gold-light/90 max-w-[620px] leading-relaxed mb-12 tracking-wide"
        >
          The Western Hemisphere's most ambitious retail, luxury, and entertainment destination. Located 10 minutes from Manhattan.
        </motion.p>

        {/* Video loop showcase visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="w-full max-w-4xl h-64 sm:h-96 rounded-2xl overflow-hidden luxury-card border-white/5 relative flex items-center justify-center shadow-2xl mb-12 group cursor-pointer"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {!isPlaying ? (
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-4 transition-all group-hover:bg-black/50 select-none">
              {/* Play symbol */}
              <div className="w-16 h-16 rounded-full border border-brand-gold bg-brand-gold/10 flex items-center justify-center text-brand-gold text-2xl transition-transform duration-300 group-hover:scale-110">
                ▶
              </div>
              <span className="font-space text-xs font-bold tracking-widest text-brand-gold-light uppercase">
                PLAY IMMERSIVE BRAND REEL
              </span>
            </div>
          ) : (
            <iframe
              src="https://player.vimeo.com/video/510343759?autoplay=1&loop=1&background=1&muted=1"
              className="absolute inset-0 w-full h-full object-cover scale-110"
              frameBorder="0"
              allow="autoplay; fullscreen"
              title="American Dream Reel"
            />
          )}
          {/* Animated pulsing scanlines */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
        </motion.div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
          <button onClick={onExplore} className="btn-luxury-gold text-xs font-bold">
            LAUNCH SALES HUB →
          </button>
          <a
            href="#calc"
            className="btn-luxury-outline text-xs font-bold"
          >
            SPACE SIZE ESTIMATOR
          </a>
        </div>

      </div>
    </div>
  );
}

// --- 2. SCALE / WHY THIS PROPERTY PAGE ---
export function ScalePage() {
  const count1 = useCountUp("8.2 MILLION", 1500, true);
  const count2 = useCountUp("19.4 MILLION", 1500, true);
  const count3 = useCountUp("36.8 MILLION", 1500, true);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative px-8 md:px-24 pt-24 pb-16 select-none">
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left Column Description */}
        <div className="flex flex-col relative z-10">
          <span className="font-space text-xs font-bold tracking-widest text-brand-gold uppercase mb-3">
            MARKET PENETRATION
          </span>
          <h2 className="font-playfair text-4xl md:text-[56px] font-bold text-white leading-tight mb-6">
            Unmatched Scale.<br />
            <span className="text-brand-gold">Unbeatable Reach.</span>
          </h2>
          <p className="font-inter text-sm md:text-base text-brand-gold-light/80 leading-relaxed mb-8 max-w-lg">
            Located just 10 miles from Midtown Manhattan, American Dream sits at the commercial epicenter of the most densely populated, high-income metropolitan market in North America.
          </p>

          <div className="flex flex-col gap-5 border-t border-white/5 pt-6">
            {[
              { label: 'MetLife Stadium Access', desc: 'Direct adjacent footpaths linking to the 82,500 capacity mega-stadium.' },
              { label: 'NJ Transit Direct Link', desc: 'Dedicated direct train service from NY Penn Station directly into the mall lobby.' },
              { label: 'Tax-Free shopping advantages', desc: '0% sales tax on clothing and apparel throughout New Jersey.' }
            ].map((bullet, idx) => (
              <div key={idx} className="flex gap-4">
                <span className="text-brand-gold font-bold">✦</span>
                <div className="flex flex-col">
                  <span className="font-inter text-xs font-bold text-white">{bullet.label}</span>
                  <span className="font-inter text-[11px] text-white/50">{bullet.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column Catchment dashboard */}
        <div className="luxury-card p-8 flex flex-col gap-6 relative z-10 w-full">
          <div className="font-space text-xs font-bold tracking-widest text-brand-gold uppercase border-b border-white/5 pb-4">
            NYC METROPOLITAN DRIVE CATCHMENT
          </div>

          <div className="flex flex-col gap-6">
            {[
              { label: '30-MINUTE DRIVE TIME', val: count1, pct: 'w-1/3' },
              { label: '60-MINUTE DRIVE TIME', val: count2, pct: 'w-2/3' },
              { label: '90-MINUTE DRIVE TIME', val: count3, pct: 'w-full' }
            ].map((row, rIdx) => (
              <div key={rIdx} className="flex flex-col">
                <div className="flex justify-between items-end mb-1.5">
                  <span className="font-inter text-xs tracking-wider text-brand-gold-light/80">{row.label}</span>
                  <span className="font-space text-xl md:text-2xl font-bold text-white">{row.val}</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: rIdx === 0 ? '33%' : rIdx === 1 ? '66%' : '100%' }}
                    transition={{ delay: 0.4 + rIdx * 0.2, duration: 1.0, ease: 'easeOut' }}
                    className="h-full bg-brand-gold rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-white/5 pt-6 mt-2">
            <p className="font-inter text-xs text-brand-gold-light/65 italic leading-relaxed text-center">
              "Adjacent highways I-95, Route 3, and Garden State Parkway pull over 20 million consumers within a 90-minute radius daily."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 3. RETAIL & LUXURY WING PAGE ---
export function RetailPage() {
  const brands = [
    'Hermès', 'Saks Fifth Avenue', 'Gucci',
    'Saint Laurent', 'Balenciaga', 'Rolex',
    'Tiffany & Co.', 'Prada', 'Watches of Switzerland',
    'Lululemon', 'Zara Flagship', 'Apple'
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative px-8 md:px-24 pt-24 pb-16 select-none">
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left Column Saks showcase */}
        <div className="luxury-card p-10 flex flex-col justify-between border-t-2 border-brand-gold min-h-[420px] relative z-10">
          <div className="flex flex-col gap-4">
            <span className="font-space text-xs font-bold tracking-widest text-brand-gold uppercase">
              THE LUXURY ANCHOR
            </span>
            <h3 className="font-playfair text-3xl md:text-4xl font-bold text-white leading-none">
              Saks Fifth Avenue
            </h3>
            <div className="font-space text-5xl font-bold text-white/95 my-2">
              110,000 <span className="text-sm font-inter text-brand-gold tracking-widest uppercase">SQ FT</span>
            </div>
            <p className="font-inter text-xs md:text-sm text-brand-gold-light/80 leading-relaxed">
              The crown jewel of The Avenue, American Dream's curated luxury corridor. Features full-floor designer RTW, the premier shoe department in New Jersey, and dedicated Louis Vuitton and Gucci shop-in-shops inside.
            </p>
          </div>
          
          <div className="border-t border-white/5 pt-6 mt-6 flex justify-between items-center">
            <span className="font-inter text-[10px] text-white/40 tracking-wider">EXCLUSIVE LEASING UNIT PATHWAY</span>
            <span className="text-brand-gold text-lg">✦</span>
          </div>
        </div>

        {/* Right Column Brand Grid */}
        <div className="flex flex-col relative z-10 w-full">
          <span className="font-space text-xs font-bold tracking-widest text-brand-gold uppercase mb-3">
            WORLD-CLASS BRAND ROSTER
          </span>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-6">
            Joined by the World's Best
          </h2>
          
          <div className="grid grid-cols-2 gap-y-4 gap-x-8 border-t border-white/5 pt-6">
            {brands.map((brand, bIdx) => (
              <div
                key={bIdx}
                className="flex items-center justify-between border-b border-white/3 pb-3 hover-underline cursor-pointer select-none"
              >
                <span className="font-playfair text-base md:text-lg text-white/90">{brand}</span>
                <span className="text-[10px] text-brand-gold/60">✦</span>
              </div>
            ))}
          </div>

          <p className="font-inter text-[11px] text-white/45 leading-relaxed mt-6">
            Over 450+ retail, dining, beauty, and premium entertainment concepts operate flagships side by side.
          </p>
        </div>
      </div>
    </div>
  );
}

// --- 4. ATTRACTIONS & ENTERTAINMENT PAGE ---
export function EntertainmentPage() {
  const [expandedCard, setExpandedCard] = useState(null);

  const attractionList = [
    {
      id: 'nick',
      title: 'Nickelodeon Universe',
      subtitle: 'Largest indoor theme park in the Western Hemisphere',
      cap: 'Capacity: 5,000 guests',
      details: 'Nickelodeon Universe covers 13 acres indoors. Open year-round. It features over 35 rides including extreme coasters like The Shellraiser (world record vertical drop) and Skyline Scream. Perfect for full buyouts, concerts, and branded corporate takeovers.',
      grad: 'from-brand-blue/15 to-transparent'
    },
    {
      id: 'water',
      title: 'DreamWorks Water Park',
      subtitle: 'Largest indoor water park in North America',
      cap: 'Capacity: 3,000 guests',
      details: 'North America\'s largest indoor water park, open year-round at a constant 81°F. Features the world\'s tallest indoor body slide, a massive indoor wave pool, and exclusive private team activations / after-hour buyout plans.',
      grad: 'from-brand-purple/10 to-transparent'
    },
    {
      id: 'snow',
      title: 'Big SNOW Resort',
      subtitle: "North America's only year-round indoor ski resort",
      cap: 'Capacity: 800 guests',
      details: 'North America\'s only indoor real-snow ski slope. Open 365 days a year regardless of outside weather conditions. Ideal for winter product launches, private ski days, and snow activation zones.',
      grad: 'from-white/5 to-transparent'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative px-8 md:px-24 pt-24 pb-16 select-none">
      <div className="max-w-6xl w-full mx-auto flex flex-col relative z-10 gap-10">
        
        <div className="text-center max-w-3xl mx-auto">
          <span className="font-space text-xs font-bold tracking-widest text-brand-gold uppercase mb-3 block">
            MAJOR BUSINESS DIFFERENTIATOR
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
            An Entertainment Universe
          </h2>
          <p className="font-inter text-xs md:text-sm text-brand-gold-light/75 leading-relaxed">
            Over 55% of American Dream's total footprint is dedicated to premier attractions and interactive lifestyle environments, drawing high-intent tri-state families year-round.
          </p>
        </div>

        {/* 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          <AnimatePresence>
            {attractionList.map((att) => (
              <motion.div
                key={att.id}
                layoutId={`att-${att.id}`}
                onClick={() => setExpandedCard(att)}
                className={`glass-card p-8 border-t-2 border-brand-gold bg-gradient-to-b ${att.grad} flex flex-col justify-between h-72 cursor-pointer hover:translate-y-[-6px] select-none`}
              >
                <div className="flex flex-col gap-3">
                  <h3 className="font-playfair text-xl md:text-2xl font-bold text-white leading-tight">
                    {att.title}
                  </h3>
                  <p className="font-inter text-xs text-brand-gold-light/80 leading-relaxed">
                    {att.subtitle}
                  </p>
                </div>
                
                <div className="flex flex-col gap-2">
                  <span className="font-space text-[10px] text-white/50 tracking-wider">
                    {att.cap}
                  </span>
                  <span className="font-inter text-xs text-brand-gold font-bold self-start mt-2">
                    EXPLORE SPECTACULARS →
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* Expanded spec sheet details takeover */}
      <AnimatePresence>
        {expandedCard && (
          <div className="fixed inset-0 bg-black/75 backdrop-blur-md flex items-center justify-center z-50 p-6 select-none">
            <motion.div
              layoutId={`att-${expandedCard.id}`}
              className="glass-card w-full max-w-2xl p-10 border-t-2 border-brand-gold relative flex flex-col gap-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setExpandedCard(null)}
                className="absolute top-6 right-6 text-white/50 hover:text-white text-2xl font-space w-8 h-8 flex items-center justify-center bg-white/5 rounded-full"
              >
                ×
              </button>

              <span className="font-space text-xs font-bold text-brand-gold tracking-widest uppercase">
                ATTRACTION SPEC SHEET
              </span>
              
              <h3 className="font-playfair text-3xl font-bold text-white leading-none">
                {expandedCard.title}
              </h3>
              
              <p className="font-inter text-xs md:text-sm text-brand-gold-light/90 leading-relaxed border-t border-white/5 pt-4">
                {expandedCard.details}
              </p>

              <div className="flex items-center gap-4 mt-6 border-t border-white/5 pt-6">
                <a
                  href="#calc"
                  onClick={() => setExpandedCard(null)}
                  className="btn-luxury-gold text-[10px] py-2.5 px-6 font-bold"
                >
                  DISCUSS SPONSORSHIP ROI
                </a>
                <button
                  onClick={() => setExpandedCard(null)}
                  className="btn-luxury-outline text-[10px] py-2.5 px-6 hover:bg-white/5 text-white/80 border-white/20"
                >
                  CLOSE
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

// --- 5. INTERACTIVE SALES HUB PORTAL (THE WORKHORSE) ---
export function SubModulesPage() {
  const [activeTab, setActiveTab] = useState('leasing'); // leasing, sponsorship, venues

  return (
    <div id="calc" className="min-h-screen flex flex-col items-center justify-center relative px-8 md:px-24 pt-28 pb-16 select-none">
      <div className="max-w-6xl w-full mx-auto flex flex-col relative z-10 gap-10">
        
        {/* Module Title */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="font-space text-xs font-bold tracking-widest text-brand-gold uppercase mb-3 block">
            INTERACTIVE SUITE
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
            B2B Commercial Suite
          </h2>
          <p className="font-inter text-xs md:text-sm text-brand-gold-light/75 leading-relaxed">
            Run real-time space sizing simulations, calculate estimated sponsorship impressions, and build venue booking proposals instantly.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex justify-center border-b border-white/10 pb-2">
          <div className="flex gap-2 font-inter text-xs font-bold">
            {[
              { id: 'leasing', label: 'LEASING CALCULATOR' },
              { id: 'sponsorship', label: 'SPONSORSHIP ESTIMATOR' },
              { id: 'venues', label: 'VENUE RFP BUILDER' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-2 transition-all select-none ${activeTab === tab.id ? 'text-brand-gold' : 'text-white/45 hover:text-white/80'}`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="hubActiveTab"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-gold"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Render Interactive Submodule */}
        <div className="mt-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              {activeTab === 'leasing' && <LeasingCalculator />}
              {activeTab === 'sponsorship' && <SponsorshipEstimator />}
              {activeTab === 'venues' && <VenueRFPBuilder />}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
