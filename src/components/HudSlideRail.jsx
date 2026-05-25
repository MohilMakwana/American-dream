import { Fragment } from 'react';

/**
 * Segmented slide progress rail — replaces plain dots with section-aware ticks.
 */
export function HudSlideRail({ slides, idx, onSelect }) {
  return (
    <div className="hud-rail" role="tablist" aria-label="Slide progress">
      {slides.map((slide, i) => {
        const isActive = i === idx;
        const inSection = slide.section === slides[idx].section;
        const sectionBreak = i > 0 && slide.section !== slides[i - 1].section;

        return (
          <Fragment key={slide.id || i}>
            {sectionBreak && <span className="hud-rail__divider" aria-hidden="true" />}
            <button
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`${slide.title || slide.section}, slide ${i + 1} of ${slides.length}`}
              title={slide.title || slide.section}
              className={[
                'hud-rail__seg',
                isActive && 'hud-rail__seg--active',
                inSection && !isActive && 'hud-rail__seg--near',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => onSelect(i)}
            />
          </Fragment>
        );
      })}
    </div>
  );
}

export default HudSlideRail;
