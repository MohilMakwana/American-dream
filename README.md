# American Dream — Immersive B2B Sales Platform

> A cinematic, interactive sales platform designed for **American Dream** — the premier retail, dining, and entertainment destination in North America. This self-contained web application replaces static presentation slide decks with a high-impact, non-linear, and data-rich brand experience.

---

## The Vision: Presentation-as-a-Product

Traditional commercial real estate pitches require sales representatives to navigate multiple video files, static PDFs, and Excel models. This platform removes all friction, serving as a unified B2B sales tool that:
1. **Tells the property's story autonomously** — designed for both guided screen-shares on live calls and independent exploration by prospects.
2. **Creates immediate emotional buy-in** — leveraging cinematic video backgrounds, fluid transitions, and a premium luxury aesthetic.
3. **Drives targeted business actions** — funneling retail brands, corporate sponsors, and event organizers toward direct commercial actions via interactive tools.

---

## Commercial Journey & Story Beats

The platform is structured as a non-linear narrative, allowing prospects to explore the beats that matter most to their business:

### 1. Cinematic Intro
An high-energy, animated entrance sequence that establishes the scale, ambition, and global stature of American Dream.

### 2. Market Dynamics & Scale (Why American Dream)
Data-driven visualizations showcasing the regional reach, visitor demographics (40M+ annual visitors), and unmatched regional connectivity.

### 3. Retail & Flagship Environments
An overview of the retail landscape, demonstrating the footprint for flagship, inline, and pop-up concepts.

### 4. The Avenue (Luxury Experience)
An elevated, high-fashion showcase highlighting premium brand placement, curated architecture, and luxury consumer demographics.

### 5. Dining & Gastronomy
Positioning food and beverage concepts as a primary lifestyle draw rather than a secondary amenity.

### 6. Attractions & Entertainment
Showcasing the world-class entertainment anchors (e.g., DreamWorks Water Park, Nickelodeon Universe) that differentiate American Dream from traditional commercial centers.

### 7. Global Event Platform
Positioning the complex as a global stage for concerts, celebrity appearances, and high-impact brand activations.

---

## Interactive B2B Commercial Suite

Built to convert interest into commercial dialogue, the platform includes a fully functional, client-side transactional suite:

*   **Leasing Calculator**: Computes estimated commercial spaces, allowing retail prospects to estimate space layouts, square footage needs, and request tailored quotes.
*   **Sponsorship Estimator**: Enables corporate partners to project audience reach and impressions across digital and physical signage networks.
*   **Venue RFP Builder**: An interactive planner for event organizers to specify guest capacity, venue types, and print or export a customized Request for Proposal (RFP) summary.

---

## Creative Direction & UI Design

Inspired by the design languages of premium brands such as **Apple**, **Hermès**, and **Tesla**, the user interface focuses on maximum content impact with minimal chrome:

*   **Monochromatic Palette**: Built on a sophisticated dark mode scheme (`#050507`) with high-contrast typography and precise silver metallic accents.
*   **Fluid Motion System**: Transitions and interactions utilize a custom easing curve (`cubic-bezier(0.15, 1, 0.3, 1)`) for a luxurious, responsive feel.
*   **Glassmorphic Design**: Cards and controls feature backdrop blurs (`backdrop-filter: blur()`) to seamlessly blend content layers.
*   **Custom 3D Elements**: Incorporates interactive 3D perspective tilting, magnetic cursor tracking, and dynamic glare overlays to enhance tactile feedback.

---

## Technical Architecture & Performance

Engineered to meet the highest performance and responsiveness standards:

*   **Adaptive Performance Profiling**: The custom `usePerformanceProfile` hook detects client device capabilities upon loading. High-end systems render a fully interactive Three.js particle background, while mobile and low-end devices automatically fall back to static CSS gradients, keeping payload size and CPU usage optimized.
*   **Asset Loading & Optimization**: Employs lazy-loading and asynchronous decoding for high-resolution images. Video elements feature high-performance background looping with instant poster frame fallbacks.
*   **Modular Code Splitting**: Configured through Vite to split vendor dependencies (Three.js, Framer Motion, GSAP, React) into distinct chunks, preventing bundle bloat and ensuring quick initial page loads.
*   **Non-Linear Navigation Engine**: Managed via `Deck.jsx`, supporting fluid slide switching, HUD progress indicators, section navigation menus, keyboard hotkeys, and swipe gestures.

---

## Repository Structure

```
antigravity - slider/
├── index.html                   # Entry page, SEO metadata
├── vite.config.js               # Vite build configuration & code-splitting rules
├── tailwind.config.js           # Tailwind v4 configuration
├── postcss.config.js            # CSS post-processing configuration
│
└── src/
    ├── main.jsx                 # Application entry point
    ├── App.jsx                  # Root component (performance checks, loading gate)
    ├── index.css                # Design system tokens, custom CSS components
    │
    ├── components/
    │   ├── Deck.jsx             # Slide engine, gesture, and navigation coordinator
    │   ├── Screens.jsx          # Individual narrative slide components
    │   ├── InteractiveHub.jsx   # Leasing, sponsorship, and RFP interactive tools
    │   ├── InteractivePages.jsx # Detailed secondary overlay pages
    │   ├── IntroScreen.jsx      # Animated loading and intro screen
    │   ├── BackgroundCanvas.jsx # Lazy-loaded WebGL particle system
    │   ├── ThreeCanvas.jsx      # WebGL scene and renderer setup
    │   ├── LiquidThreeCanvas.jsx# Liquid shader effects
    │   ├── MagneticCard.jsx     # Tactile 3D tilt and mouse-tracking component
    │   ├── DeckModal.jsx        # Unified overlay modal system
    │   ├── FloatingNav.jsx      # Non-linear category navigation bar
    │   ├── HudSlideRail.jsx     # Visual progress track and HUD controls
    │   ├── NavSectionMenu.jsx   # Expanded slide navigator
    │   └── media/
    │       ├── MediaImage.jsx   # Lazy-loaded image wrapper
    │       ├── MediaMosaic.jsx  # Interactive spotlight grid
    │       ├── VideoBackground.jsx # Performance-tuned video loop component
    │       └── SlideContent.jsx # Layout grid for slide elements
    │
    ├── data/
    │   └── media.js             # Asset registry for media fallbacks and links
    │
    └── hooks/
        └── usePerformanceProfile.js # Device-level performance profiling hook
```

---

## Setup & Local Development

### Prerequisites
*   **Node.js**: Version 18 or higher
*   **npm**: Version 9 or higher

### Installation

1. Clone the repository to your local directory.
2. Install all required dependencies:
   ```bash
   npm install
   ```
3. Launch the local development server:
   ```bash
   npm run dev
   ```
   The application will be served locally at `http://localhost:5173`.

### Production Build

Generate an optimized, minified production build:
```bash
npm run build
```
The compiled assets will be placed in the `/dist` directory, ready to be deployed to static web hosts (GitHub Pages, Vercel, Netlify, etc.).

Preview the production build locally:
```bash
npm run preview
```

---

## License

Private and confidential. Designed exclusively for B2B commercial presentations and leasing representations.
