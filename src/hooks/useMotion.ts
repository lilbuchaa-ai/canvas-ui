import { useState, useEffect } from 'react';

interface MotionPreferences {
  reduced: boolean;
}

export const useMotion = (): MotionPreferences => {
  const [reduced, setReduced] = useState<boolean>(false);

  useEffect(() => {
    // Check for prefers-reduced-motion media query
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Set initial value
    setReduced(mediaQuery.matches);
    
    // Listen for changes
    const handleChange = (e: MediaQueryListEvent) => {
      setReduced(e.matches);
    };
    
    mediaQuery.addListener(handleChange);
    
    // Cleanup
    return () => {
      mediaQuery.removeListener(handleChange);
    };
  }, []);

  return { reduced };
};

export default useMotion;