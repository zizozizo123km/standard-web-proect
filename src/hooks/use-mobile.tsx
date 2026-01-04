import { useState, useEffect } from 'react';

// Define the standard mobile breakpoint (e.g., typical tablet/mobile cutoff)
const MOBILE_BREAKPOINT = 768; // Based on CSS standard width (e.g., sm: or md: equivalent)

/**
 * Custom hook to determine if the current viewport size corresponds to a mobile device.
 * It uses the `window.innerWidth` and responds to resize events.
 *
 * @returns {boolean} True if the screen width is less than the defined breakpoint.
 */
export function useMobile(): boolean {
  // Initialize state. We check window.innerWidth safely for hydration,
  // defaulting to false (desktop view) if window object is unavailable (SSR).
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < MOBILE_BREAKPOINT;
    }
    return false;
  });

  useEffect(() => {
    const checkIsMobile = () => {
      // Debouncing could be added here for performance if necessary,
      // but modern browsers handle window resize events efficiently.
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Attach event listener
    window.addEventListener('resize', checkIsMobile);

    // Initial check (useful for ensuring the state is correct immediately upon mount)
    checkIsMobile();

    // Cleanup function
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []); // Run effect only once on mount

  return isMobile;
}

// Optional helper constant if you want to export the breakpoint definition
export const FACEBOOK_MOBILE_BREAKPOINT = MOBILE_BREAKPOINT;