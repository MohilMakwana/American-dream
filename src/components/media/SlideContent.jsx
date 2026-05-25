
/**
 * Fixed viewport slide body — no vertical scroll (Digideck-style full-screen panels).
 */
export function SlideContent({ children, center = false, className = '' }) {
  return (
    <div className={`slide-content ${center ? 'slide-content--center' : ''} ${className}`}>
      <div className={`slide-content__inner ${center ? 'slide-content__inner--center' : ''}`}>
        {children}
      </div>
    </div>
  );
}

export default SlideContent;
