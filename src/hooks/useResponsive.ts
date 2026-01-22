'use client';

import { useState, useEffect } from 'react';
import { BREAKPOINTS } from '@/lib/constants';

interface ResponsiveState {
  isDesktop: boolean;
  isHydrated: boolean;
  questCollapsed: boolean;
  setQuestCollapsed: (collapsed: boolean) => void;
}

export const useResponsive = (): ResponsiveState => {
  const [state, setState] = useState({ isDesktop: false, isHydrated: false });
  const [questCollapsed, setQuestCollapsed] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setState(s => ({ ...s, isDesktop: width >= BREAKPOINTS.desktop }));
      if (width < BREAKPOINTS.wideDesktop) setQuestCollapsed(true);
    };

    const width = window.innerWidth;
    const isDesktop = width >= BREAKPOINTS.desktop;
    setState({ isDesktop, isHydrated: true });

    if (width >= BREAKPOINTS.wideDesktop) {
      const timer = setTimeout(() => setQuestCollapsed(false), 500);
      window.addEventListener('resize', handleResize);
      return () => { clearTimeout(timer); window.removeEventListener('resize', handleResize); };
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { ...state, questCollapsed, setQuestCollapsed };
};
