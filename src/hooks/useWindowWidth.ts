import { useState, useEffect, useCallback } from 'react';

interface UseWindowWidthReturn {
  width: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export const useWindowWidth = (
  mobileBreakpoint = 768,
  tabletBreakpoint = 1024
): UseWindowWidthReturn => {
  const [width, setWidth] = useState<number>(window.innerWidth);

  const updateWidth = useCallback(() => {
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', updateWidth);

    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, [updateWidth]);

  const isMobile = width <= mobileBreakpoint;
  const isTablet = width > mobileBreakpoint && width <= tabletBreakpoint;
  const isDesktop = width > tabletBreakpoint;

  return {
    width,
    isMobile,
    isTablet,
    isDesktop,
  };
};
