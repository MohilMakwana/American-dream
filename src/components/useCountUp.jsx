import { useState, useEffect } from 'react';

export function useCountUp(endValue, duration = 1500, trigger = false) {
  const [count, setCount] = useState(endValue);

  useEffect(() => {
    if (!trigger) {
      const t = setTimeout(() => setCount('0'), 0);
      return () => clearTimeout(t);
    }

    const isString = typeof endValue === 'string';
    const match = isString ? endValue.match(/[\d.,]+/) : null;
    if (!match) {
      const t = setTimeout(() => setCount(endValue), 0);
      return () => clearTimeout(t);
    }

    // Strip commas for calculation
    const rawNumStr = match[0].replace(/,/g, '');
    const targetNum = parseFloat(rawNumStr);
    
    // Determine suffix and prefix
    const numIndex = endValue.indexOf(match[0]);
    const prefix = endValue.slice(0, numIndex);
    const suffix = endValue.slice(numIndex + match[0].length);

    let startTime = null;

    function animate(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing out cubic: 1 - Math.pow(1 - progress, 3)
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = easeProgress * targetNum;
      
      let currentFormatted;
      if (Number.isInteger(targetNum)) {
        currentFormatted = Math.floor(current).toLocaleString();
      } else {
        // Keep decimals (e.g. 8.2)
        currentFormatted = current.toFixed(1);
      }

      setCount(`${prefix}${currentFormatted}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(endValue); // Exact match at end
      }
    }

    const frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [endValue, duration, trigger]);

  return count;
}
export default useCountUp;
