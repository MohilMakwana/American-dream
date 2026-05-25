import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MEDIA } from '../data/media';

// --- SUB-MODULE A: INTERACTIVE LEASING SUITE ---
export function LeasingCalculator() {
  const [category, setCategory] = useState('luxury'); // luxury, flagship, fb, popup
  const [size, setSize] = useState(2500);
  const [proposalSubmitted, setProposalSubmitted] = useState(false);
  const [proposalData, setProposalData] = useState({ name: '', brand: '', email: '' });

  // Dynamic calculations based on size & category
  const getCalculatedImpressions = () => {
    const mult = category === 'luxury' ? 42 : category === 'flagship' ? 65 : category === 'fb' ? 52 : 88;
    return Math.floor(size * mult * 1.8).toLocaleString();
  };

  const getRecommendedZone = () => {
    if (category === 'luxury') return 'The Avenue — Curated Luxury Wing';
    if (category === 'flagship') return 'Level 1 — Central Court Atrium';
    if (category === 'fb') return 'Level 3 — Gourmet Dining Promenade';
    return 'Main Corridor — High Traffic Kiosk Zone';
  };

  const getRecommendedZoneImage = () => {
    if (category === 'luxury') return MEDIA.luxury_avenue;
    if (category === 'flagship') return MEDIA.atrium;
    if (category === 'fb') return MEDIA.dining_hall;
    return MEDIA.popup_kiosk;
  };

  const getEstFootfall = () => {
    const rate = category === 'luxury' ? 22000 : category === 'flagship' ? 45000 : category === 'fb' ? 32000 : 60000;
    return Math.floor(rate * (size / 1500 + 0.5)).toLocaleString();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start select-none">
      {/* Calculator Controls */}
      <div className="luxury-card p-6 md:p-8 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="font-space text-xs font-bold tracking-widest text-brand-gold uppercase">
            LEASING MATRIX
          </span>
          <h3 className="font-playfair text-2xl md:text-3xl font-bold text-white">
            Custom Space Sizer
          </h3>
        </div>

        {/* Category Toggles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-b border-white/5 pb-6">
          {[
            { id: 'luxury', label: 'LUXURY' },
            { id: 'flagship', label: 'FLAGSHIP' },
            { id: 'fb', label: 'DINING' },
            { id: 'popup', label: 'POP-UP' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setCategory(cat.id);
                if (cat.id === 'popup') setSize(800);
                else setSize(2500);
              }}
              className={`font-inter text-[10px] font-bold py-2.5 px-2 rounded-lg border tracking-wider transition-all select-none ${category === cat.id ? 'bg-brand-gold border-brand-gold text-black' : 'border-white/10 text-white/60 hover:text-white/90 hover:border-white/20'}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Square Footage Slider */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between font-space text-sm font-semibold">
            <span className="text-white/60">DESIRED AREA:</span>
            <span className="text-brand-gold">{size.toLocaleString()} SQ FT</span>
          </div>
          <input
            type="range"
            min={category === 'popup' ? 100 : 1000}
            max={category === 'popup' ? 3000 : 50000}
            step={category === 'popup' ? 50 : 250}
            value={size}
            onChange={(e) => setSize(parseInt(e.target.value))}
            className="w-full cursor-pointer"
          />
          <div className="flex justify-between font-inter text-[10px] text-white/40 tracking-wider">
            <span>{category === 'popup' ? '100 SQ FT' : '1,000 SQ FT'}</span>
            <span>{category === 'popup' ? '3,000 SQ FT' : '50,000 SQ FT'}</span>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/5 pt-6">
          <div className="bg-white/1 border border-white/5 rounded-xl p-4">
            <div className="font-inter text-[10px] text-white/50 tracking-widest mb-1">
              EST. WEEKLY VISITS
            </div>
            <div className="font-space text-xl font-bold text-white">
              {getEstFootfall()}
            </div>
          </div>
          <div className="bg-white/1 border border-white/5 rounded-xl p-4">
            <div className="font-inter text-[10px] text-white/50 tracking-widest mb-1">
              DAILY IMPRESSIONS
            </div>
            <div className="font-space text-xl font-bold text-brand-gold">
              {getCalculatedImpressions()}
            </div>
          </div>
        </div>

        {/* Dynamic Zone Suggestion */}
        <div className="bg-brand-gold/5 border border-brand-gold/15 rounded-xl p-4 flex flex-col gap-1">
          <span className="font-inter text-[10px] text-brand-gold-light/60 font-semibold tracking-wider uppercase">
            RECOMMENDED LOCATION ZONE:
          </span>
          <span className="font-inter text-sm text-white font-semibold mb-2">
            {getRecommendedZone()}
          </span>
          <div className="w-full h-[120px] rounded-lg overflow-hidden border border-white/10 relative">
            <img src={getRecommendedZoneImage()} alt="Zone Preview" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* proposal drawer / lead capture */}
      <div className="luxury-card p-6 md:p-8 flex flex-col justify-center min-h-[420px]">
        <AnimatePresence mode="wait">
          {!proposalSubmitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={(e) => {
                e.preventDefault();
                setProposalSubmitted(true);
              }}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-2 mb-4">
                <span className="font-space text-xs font-bold tracking-widest text-brand-gold uppercase">
                  LEASING PROPOSAL BUILDER
                </span>
                <p className="font-inter text-xs text-white/60 leading-relaxed">
                  Enter your company details below to compile a customized leasing summary based on your sizer specifications.
                </p>
              </div>

              <input
                type="text"
                required
                placeholder="Company Name"
                value={proposalData.name}
                onChange={(e) => setProposalData({ ...proposalData, name: e.target.value })}
                className="luxury-input text-xs"
              />
              <input
                type="text"
                required
                placeholder="Brand / Retail Category"
                value={proposalData.brand}
                onChange={(e) => setProposalData({ ...proposalData, brand: e.target.value })}
                className="luxury-input text-xs"
              />
              <input
                type="email"
                required
                placeholder="Business Email"
                value={proposalData.email}
                onChange={(e) => setProposalData({ ...proposalData, email: e.target.value })}
                className="luxury-input text-xs"
              />

              <button type="submit" className="btn-luxury-gold text-xs font-bold mt-2">
                DRAFT LEASE PROPOSAL →
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col gap-6 text-left border-l-2 border-brand-gold pl-6"
            >
              <div className="flex flex-col gap-1">
                <span className="font-space text-xs font-bold text-brand-gold uppercase tracking-widest">
                  PROPOSAL COMPILED SUCCESSFULLY
                </span>
                <h4 className="font-playfair text-2xl font-bold text-white">
                  {proposalData.name || 'Your Brand'} Spec Sheet
                </h4>
              </div>

              <table className="w-full font-inter text-xs border-t border-white/10 pt-4">
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="py-2.5 text-white/50 font-semibold pr-4">SPACE SIZING:</td>
                    <td className="py-2.5 text-white font-medium text-right">{size.toLocaleString()} SQ FT</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2.5 text-white/50 font-semibold pr-4">LEASING PATH:</td>
                    <td className="py-2.5 text-white font-medium text-right uppercase">{category} Flagship</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2.5 text-white/50 font-semibold pr-4">RECOMMENDED ZONE:</td>
                    <td className="py-2.5 text-brand-gold font-medium text-right">{getRecommendedZone()}</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2.5 text-white/50 font-semibold pr-4">PROJECTED DAILY REACH:</td>
                    <td className="py-2.5 text-white font-medium text-right">{getCalculatedImpressions()} impressions</td>
                  </tr>
                </tbody>
              </table>

              <p className="font-inter text-xs text-brand-gold-light/75 italic leading-relaxed">
                Thank you, {proposalData.brand || 'Leasing Director'}. A leasing representative will email you at {proposalData.email} within 24 hours with exact layout drawings and base rate plans.
              </p>

              <button
                onClick={() => setProposalSubmitted(false)}
                className="btn-luxury-outline text-[10px] py-2 px-4 self-start mt-2"
              >
                EDIT PROPOSAL SPEC
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// --- SUB-MODULE B: SPONSORSHIP TIER CONFIGURATOR ---
export function SponsorshipEstimator() {
  const [channels, setChannels] = useState({
    screens: true,
    audio: false,
    experiential: true,
    naming: false
  });

  const toggleChannel = (key) => {
    setChannels({ ...channels, [key]: !channels[key] });
  };

  // Live ROI Math
  const getCalculatedImpressions = () => {
    let base = 25000000;
    if (channels.screens) base += 35000000;
    if (channels.audio) base += 18000000;
    if (channels.experiential) base += 22000000;
    if (channels.naming) base += 45000000;
    return base.toLocaleString();
  };

  const getSynergyScore = () => {
    let score = 55;
    if (channels.screens) score += 15;
    if (channels.audio) score += 10;
    if (channels.experiential) score += 12;
    if (channels.naming) score += 8;
    return Math.min(score, 100);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start select-none">
      {/* Checklist Channels */}
      <div className="luxury-card p-6 md:p-8 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="font-space text-xs font-bold tracking-widest text-brand-gold uppercase">
            BRAND ROI ESTIMATOR
          </span>
          <h3 className="font-playfair text-2xl md:text-3xl font-bold text-white">
            Select Activation Channels
          </h3>
        </div>

        <div className="flex flex-col gap-4">
          {[
            { id: 'screens', title: 'Digital Screen Network', desc: 'Over 120 premium large-format LED displays property-wide' },
            { id: 'audio', title: 'Spatial Audio Takeover', desc: 'Curated promotional announcements and high-end auditory cues' },
            { id: 'experiential', title: 'Experiential Activation Zones', desc: 'High-density physical floor space for active consumer sampling' },
            { id: 'naming', title: 'Property Naming Rights Integration', desc: 'Full marquee integration across main entrances and digital maps' }
          ].map((item) => (
            <div
              key={item.id}
              onClick={() => toggleChannel(item.id)}
              className={`p-4 border rounded-xl flex items-center justify-between cursor-pointer transition-all ${channels[item.id] ? 'bg-brand-blue/5 border-brand-blue shadow-lg' : 'bg-white/1 border-white/5 hover:border-white/15'}`}
            >
              <div className="flex flex-col gap-1 pr-6">
                <span className={`font-inter text-xs font-bold ${channels[item.id] ? 'text-brand-blue' : 'text-white'}`}>
                  {item.title}
                </span>
                <span className="font-inter text-[10px] text-white/50 leading-relaxed">
                  {item.desc}
                </span>
              </div>
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 ${channels[item.id] ? 'border-brand-blue bg-brand-blue text-black' : 'border-white/20'}`}>
                {channels[item.id] && <span className="text-[10px] font-bold">✓</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ROI Display and Tiers */}
      <div className="luxury-card p-6 md:p-8 flex flex-col gap-6 justify-between min-h-[420px]">
        <div className="flex flex-col gap-4">
          <span className="font-space text-xs font-bold tracking-widest text-brand-gold uppercase">
            ROI PROJECTIONS
          </span>
          
          <div className="grid grid-cols-2 gap-4 border-b border-white/5 pb-6">
            <div className="flex flex-col">
              <span className="font-inter text-[10px] text-white/40 tracking-wider">ANNUAL IMPRESSIONS:</span>
              <span className="font-space text-3xl font-bold text-white mt-1">{getCalculatedImpressions()}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-inter text-[10px] text-white/40 tracking-wider">BRAND SYNERGY MATCH:</span>
              <span className="font-space text-3xl font-bold text-brand-gold mt-1">{getSynergyScore()}%</span>
            </div>
          </div>
        </div>

        {/* Tiers List */}
        <div className="flex flex-col gap-3">
          <span className="font-inter text-[10px] font-bold text-brand-gold-light/60 tracking-wider uppercase mb-1">
            AVAILABLE PARTNERSHIP TIERS:
          </span>
          {[
            { name: 'PRESENTING PARTNER', reach: 'Property-wide naming rights, absolute category control' },
            { name: 'ACTIVATION PARTNER', reach: 'Experiential sampling zones, direct product deployment' },
            { name: 'MEDIA NETWORK PARTNER', reach: 'Full large-format screen takeovers, spatial audio network' }
          ].map((tier, tIdx) => (
            <div key={tIdx} className="bg-white/1 border border-white/5 rounded-xl p-3 flex justify-between items-center hover:border-white/10">
              <div className="flex flex-col gap-0.5">
                <span className="font-space text-[11px] font-bold text-white">{tier.name}</span>
                <span className="font-inter text-[9px] text-white/50 leading-none">{tier.reach}</span>
              </div>
              <span className="text-[10px] text-brand-gold font-bold pr-2">✦</span>
            </div>
          ))}
        </div>

        {/* Billboard Preview Banner */}
        <div className="w-full h-[100px] rounded-lg overflow-hidden border border-white/10 relative">
          <img src={MEDIA.sponsorship_display} alt="Sponsorship Billboard Display" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex items-end p-2.5">
            <span className="font-space text-[9px] font-bold text-white uppercase tracking-widest">Live Digital Atrium Billboard</span>
          </div>
        </div>

        <button className="btn-luxury-gold text-xs font-bold w-full mt-4">
          DISCUSS PARTNERSHIP ROI →
        </button>
      </div>
    </div>
  );
}

// --- SUB-MODULE C: VENUE RFP SPEC-SHEET BUILDER ---
export function VenueRFPBuilder() {
  const [activeVenue, setActiveVenue] = useState('rink'); // rink, nick, water
  const [guests, setGuests] = useState(500);
  const [rfpSubmitted, setRfpSubmitted] = useState(false);
  const [rfpData, setRfpData] = useState({ date: '', name: '', email: '' });

  const venueSpecs = {
    rink: {
      name: 'THE RINK (NHL ICE)',
      surface: '200 × 85 FT (NHL regulation)',
      maxCap: 1500,
      sitting: 800,
      gala: 600,
      desc: 'One of the only private full-size ice event venues in the NYC metro area. Buyout packages available year-round for concerts, expos, and product launches.'
    },
    nick: {
      name: 'NICKELODEON UNIVERSE',
      surface: '13 Acres fully enclosed',
      maxCap: 5000,
      sitting: 1200,
      gala: 1000,
      desc: 'Hire the entire indoor theme park with all 35+ rides operating. Perfect for massive executive summits, concerts, and branded corporate festivals.'
    },
    water: {
      name: 'DREAMWORKS WATER PARK',
      surface: '8.5 Acres climate-controlled',
      maxCap: 3000,
      sitting: 800,
      gala: 700,
      desc: 'North America\'s largest indoor water park, open year-round at 81°F. Full private after-hours buyouts, corporate team buyouts, and customized wave pool stages.'
    }
  };

  const currentSpec = venueSpecs[activeVenue];

  // Dynamic capacity verification
  const checkCapacity = () => {
    if (guests > currentSpec.maxCap) return { status: 'Exceeds Limits', style: 'text-red-400 bg-red-400/5 border-red-400/20' };
    if (guests > currentSpec.maxCap * 0.8) return { status: 'Optimal Capacity Peak', style: 'text-amber-400 bg-amber-400/5 border-amber-400/20' };
    return { status: 'Fits Comfortably (Optimal Setup)', style: 'text-emerald-400 bg-emerald-400/5 border-emerald-400/20' };
  };

  const capCheck = checkCapacity();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start select-none">
      {/* Specs switch & controls */}
      <div className="luxury-card p-6 md:p-8 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="font-space text-xs font-bold tracking-widest text-brand-gold uppercase">
            VENUE SELECTOR
          </span>
          <h3 className="font-playfair text-2xl md:text-3xl font-bold text-white">
            Immersive Event Spec Sheet
          </h3>
        </div>

        {/* Venue tabs */}
        <div className="grid grid-cols-3 gap-2 border-b border-white/5 pb-6">
          {[
            { id: 'rink', label: 'THE RINK' },
            { id: 'nick', label: 'THEME PARK' },
            { id: 'water', label: 'WATER PARK' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveVenue(tab.id);
                setGuests(500);
              }}
              className={`font-inter text-[10px] font-bold py-2.5 px-1 rounded-lg border tracking-wider transition-all select-none ${activeVenue === tab.id ? 'bg-brand-gold border-brand-gold text-black' : 'border-white/10 text-white/60 hover:text-white/90 hover:border-white/20'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Venue Specs Details */}
        <div className="flex flex-col gap-4">
          <h4 className="font-space text-base font-bold text-white tracking-wide uppercase">
            {currentSpec.name} Specs
          </h4>
          
          {/* Venue dynamic image preview */}
          <div className="w-full h-[140px] rounded-lg overflow-hidden border border-white/10 relative">
            <img src={activeVenue === 'rink' ? MEDIA.events_rink : activeVenue === 'nick' ? MEDIA.nick_universe : MEDIA.waterpark_2} alt={currentSpec.name} className="w-full h-full object-cover" />
          </div>

          <p className="font-inter text-xs text-white/70 leading-relaxed border-b border-white/5 pb-4">
            {currentSpec.desc}
          </p>

          <table className="w-full text-xs font-inter">
            <tbody>
              <tr className="border-b border-white/5">
                <td className="py-2.5 text-white/50 font-semibold pr-4">SURFACE AREA:</td>
                <td className="py-2.5 text-white font-medium text-right">{currentSpec.surface}</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-2.5 text-white/50 font-semibold pr-4">MAX STANDING CAPACITY:</td>
                <td className="py-2.5 text-white font-medium text-right">{currentSpec.maxCap.toLocaleString()} guests</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-2.5 text-white/50 font-semibold pr-4">MAX SEATED CONFIG:</td>
                <td className="py-2.5 text-white font-medium text-right">{currentSpec.sitting.toLocaleString()} guests</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Dynamic RFP compiler */}
      <div className="luxury-card p-6 md:p-8 flex flex-col justify-center min-h-[420px]">
        <AnimatePresence mode="wait">
          {!rfpSubmitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={(e) => {
                e.preventDefault();
                setRfpSubmitted(true);
              }}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-2 mb-2">
                <span className="font-space text-xs font-bold tracking-widest text-brand-gold uppercase">
                  VENUE RFP BUILDER
                </span>
                <p className="font-inter text-xs text-white/60 leading-relaxed">
                  Adjust your expected guest count and enter dates to compile a live venue proposal.
                </p>
              </div>

              {/* Guest Slider */}
              <div className="flex flex-col gap-2 pb-4">
                <div className="flex justify-between font-space text-xs font-semibold">
                  <span className="text-white/60">EXPECTED GUEST COUNT:</span>
                  <span className="text-brand-gold">{guests.toLocaleString()} GUESTS</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={currentSpec.maxCap + 500}
                  step={50}
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value))}
                  className="w-full cursor-pointer"
                />
                
                {/* Dynamic Status meter */}
                <div className={`mt-2 p-2 border rounded-lg text-center font-inter text-[10px] font-bold uppercase tracking-wider ${capCheck.style}`}>
                  STATUS: {capCheck.status}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Organizer Name"
                  value={rfpData.name}
                  onChange={(e) => setRfpData({ ...rfpData, name: e.target.value })}
                  className="luxury-input text-xs"
                />
                <input
                  type="date"
                  required
                  value={rfpData.date}
                  onChange={(e) => setRfpData({ ...rfpData, date: e.target.value })}
                  className="luxury-input text-xs bg-[#030307]"
                />
              </div>

              <input
                type="email"
                required
                placeholder="Organizer Email Address"
                value={rfpData.email}
                onChange={(e) => setRfpData({ ...rfpData, email: e.target.value })}
                className="luxury-input text-xs"
              />

              <button
                type="submit"
                disabled={guests > currentSpec.maxCap}
                className={`btn-luxury-gold text-xs font-bold mt-2 ${guests > currentSpec.maxCap ? 'opacity-40 cursor-not-allowed' : ''}`}
              >
                {guests > currentSpec.maxCap ? 'EXCEEDS MARQUEE LIMITS' : 'BUILD VENUE PROPOSAL →'}
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col gap-6 text-left border-l-2 border-brand-gold pl-6"
            >
              <div className="flex flex-col gap-1">
                <span className="font-space text-xs font-bold text-brand-gold uppercase tracking-widest">
                  VENUE PROPOSAL COMPILED
                </span>
                <h4 className="font-playfair text-2xl font-bold text-white">
                  Event RFP Summary
                </h4>
              </div>

              <table className="w-full font-inter text-xs border-t border-white/10 pt-4">
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="py-2.5 text-white/50 font-semibold pr-4">VENUE NAME:</td>
                    <td className="py-2.5 text-white font-medium text-right uppercase">{currentSpec.name}</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2.5 text-white/50 font-semibold pr-4">EVENT DATE:</td>
                    <td className="py-2.5 text-white font-medium text-right">{rfpData.date}</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2.5 text-white/50 font-semibold pr-4">GUEST COUNT:</td>
                    <td className="py-2.5 text-white font-medium text-right">{guests.toLocaleString()} GUESTS</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2.5 text-white/50 font-semibold pr-4">STATUS CHECK:</td>
                    <td className="py-2.5 text-emerald-400 font-medium text-right uppercase">VERIFIED & APPROVED</td>
                  </tr>
                </tbody>
              </table>

              <p className="font-inter text-xs text-brand-gold-light/75 italic leading-relaxed">
                Thank you, {rfpData.name}. A corporate booking manager will email you at {rfpData.email} with exact buyout pricing packages and layout floor charts within 24 hours.
              </p>

              <button
                onClick={() => setRfpSubmitted(false)}
                className="btn-luxury-outline text-[10px] py-2 px-4 self-start mt-2"
              >
                EDIT EVENT SPEC
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
