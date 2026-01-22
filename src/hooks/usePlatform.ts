'use client';

import { useState, useEffect } from 'react';
import type { Platform } from '@/lib/constants';

export const usePlatform = (): Platform => {
  const [platform, setPlatform] = useState<Platform>('other');

  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor;
    if (/iPad|iPhone|iPod/.test(ua)) setPlatform('ios');
    else if (/android/i.test(ua)) setPlatform('android');
  }, []);

  return platform;
};
