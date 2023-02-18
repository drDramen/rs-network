import { useEffect, useState } from 'react';
import { Breakpoint } from '../types/media';

export const useMediaQuery = (breakpoint: Breakpoint) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const query = `(min-width: ${breakpoint})`;
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const resizeHandler = () => setMatches(media.matches);
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, [matches, breakpoint]);

  return matches;
};
