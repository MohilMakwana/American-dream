import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LeasingCalculator, SponsorshipEstimator, VenueRFPBuilder } from './InteractiveHub';
import { MEDIA } from '../data/media';
import { MediaImage } from './media/MediaImage';
import { SlideContent } from './media/SlideContent';

const TABS = [
  { id: 'leasing', label: 'Leasing Paths', sub: 'Luxury · flagship · F&B · pop-up' },
  { id: 'sponsorship', label: 'Sponsorship', sub: 'Tiers · impressions · activations' },
  { id: 'venues', label: 'Venue RFP', sub: 'Rink · water park · theme park' },
];

/**
 * Phase 2 expandable modules — working leasing, sponsorship, and venue tools.
 */
export function InteractiveSuiteSlide({ isActive }) {
  const [tab, setTab] = useState('leasing');

  return (
    <div className="w-full h-full overflow-hidden relative">
      <MediaImage
        src={MEDIA.mall_interior_2}
        alt=""
        className="full-img"
        style={{ opacity: 0.2 }}
      />
      <div className="overlay-dark" style={{ background: 'rgba(0,0,0,0.9)' }} />

      <SlideContent>
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-3 min-h-0">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_160px] gap-4 items-end flex-shrink-0">
            <div>
              <span className="section-tag" style={{ color: 'var(--white)' }}>
                Phase 2 · Interactive Modules
              </span>
              <h2 className="t-display text-gradient-silver" style={{ marginTop: 4, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)' }}>
                B2B Commercial Suite
              </h2>
              <p className="t-body" style={{ maxWidth: 520, marginTop: 6, fontSize: '.88rem' }}>
                Tailor leasing, sponsorship reach, and venue buyouts — self-serve depth without a presenter.
              </p>
            </div>
            <div className="hidden lg:grid grid-cols-2 gap-2 rounded-xl overflow-hidden border border-white/10 h-[88px]">
              <img src={MEDIA.retail_corridor} alt="" className="w-full h-full object-cover" loading="lazy" />
              <img src={MEDIA.events_rink} alt="" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 border-b border-white/10 pb-2 flex-shrink-0">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`suite-tab ${tab === t.id ? 'active' : ''}`}
              >
                <span className="suite-tab__label">{t.label}</span>
                <span className="suite-tab__sub">{t.sub}</span>
              </button>
            ))}
          </div>

          <div className="interactive-suite-content flex-1 min-h-0 overflow-y-auto pr-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 8 }}
                animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0.7, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
              >
                {tab === 'leasing' && <LeasingCalculator />}
                {tab === 'sponsorship' && <SponsorshipEstimator />}
                {tab === 'venues' && <VenueRFPBuilder />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </SlideContent>
    </div>
  );
}

export default InteractiveSuiteSlide;